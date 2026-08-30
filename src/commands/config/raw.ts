import fs from "node:fs/promises"
import { Command } from "commander"

import { Config, ConfigFilter, ConfigLanguage, ConfigPlatform } from "@dchighs/dc-config"

import { ensureDirectory } from "../../helpers/fs.js"
import { logError, logInfo, logJson, logSuccess } from "../../helpers/logger.js"

export const configRawCommand = new Command("raw")
    .description("Fetch raw game configuration from a JSON URL")
    .requiredOption("-u, --url <url>", "Raw config URL")
    .option("-l, --language <lang>", "Language code", "en")
    .option("-p, --platform <platform>", "Platform (android | ios)", "android")
    .option("-f, --filter <filter...>", "Config filter(s)")
    .option("-o, --output <file>", "Output file path to save JSON")
    .action(async (options) => {
        try {
            logInfo(`Fetching raw configuration from ${options.url}...`)

            const config = await Config.createRaw({
                url: options.url,
                language: options.language as ConfigLanguage,
                platform: options.platform as ConfigPlatform,
                filter: options.filter as ConfigFilter[],
            })

            if (options.output) {
                await ensureDirectory(options.output)
                await fs.writeFile(options.output, JSON.stringify(config.data, null, 2), "utf-8")
                logSuccess(`Raw configuration saved to ${options.output}`)
            } else {
                logJson(config.data)
            }
        } catch (error) {
            logError("Failed to fetch raw game configuration", error)
        }
    })
