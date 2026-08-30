import fs from "node:fs/promises"
import { Command } from "commander"

import { Config, ConfigFilter, ConfigLanguage, ConfigPlatform } from "@dchighs/dc-config"

import { ensureDirectory } from "../../helpers/fs.js"
import { logError, logInfo, logJson, logSuccess } from "../../helpers/logger.js"

export const configFetchCommand = new Command("fetch")
    .description("Fetch game configuration using user credentials")
    .option("-u, --url <url>", "Config URL (or set GAME_CONFIG_URL env)", process.env.GAME_CONFIG_URL)
    .option("--user-id <userId>", "User ID (or set GAME_USER_ID env)", process.env.GAME_USER_ID)
    .option("--auth-token <authToken>", "Auth token (or set GAME_AUTH_TOKEN env)", process.env.GAME_AUTH_TOKEN)
    .option("-l, --language <lang>", "Language code", "en")
    .option("-p, --platform <platform>", "Platform (android | ios)", "android")
    .option("-f, --filter <filter...>", "Config filter(s)")
    .option("-o, --output <file>", "Output file path to save JSON")
    .action(async (options) => {
        try {
            const url = options.url
            const userId = options.userId
            const authToken = options.authToken

            if (!url || !userId || !authToken) {
                logError(
                    "Missing required credentials. Please provide --url, --user-id, and --auth-token or set environment variables.",
                )
                return
            }

            logInfo("Fetching game configuration...")

            const config = await Config.create({
                url,
                userId,
                authToken,
                language: options.language as ConfigLanguage,
                platform: options.platform as ConfigPlatform,
                filter: options.filter as ConfigFilter[],
            })

            if (options.output) {
                await ensureDirectory(options.output)
                await fs.writeFile(options.output, JSON.stringify(config.data, null, 2), "utf-8")
                logSuccess(`Configuration saved to ${options.output}`)
            } else {
                logJson(config.data)
            }
        } catch (error) {
            logError("Failed to fetch game configuration", error)
        }
    })
