import fs from "node:fs/promises"
import { Command } from "commander"

import { ConfigLanguage } from "@dchighs/dc-core"
import { Localization } from "@dchighs/dc-localization"

import { ensureDirectory } from "../../helpers/fs.js"
import { logCard, logError, logInfo, logSearchResults, logSuccess } from "../../helpers/logger.js"

export const localizationFetchCommand = new Command("fetch")
    .alias("get")
    .description("Fetch localization / translation data from Dragon City")
    .option("-l, --language <lang>", "Language code (en, pt, es, fr, de, it, ja, ru, ko, tr)", "en")
    .option("-o, --output <file>", "Save localization JSON to specified file")
    .option("--dragon-id <id>", "Get dragon name and description by ID")
    .option("--key <key>", "Get translated value by key")
    .option("--value <val>", "Get key by translated value")
    .option("-s, --search <query>", "Search localization keys and values")
    .action(async (options) => {
        try {
            logInfo(`Fetching localization for language: ${options.language}...`)
            const lang = options.language as ConfigLanguage
            const localization = await Localization.create(lang)

            if (options.output) {
                await ensureDirectory(options.output)
                await fs.writeFile(options.output, JSON.stringify(localization.toObject(), null, 2), "utf-8")
                logSuccess(`Localization saved to ${options.output}`)
            }

            if (options.dragonId) {
                const id = Number(options.dragonId)
                const name = localization.getDragonName(id)
                const description = localization.getDragonDescription(id)
                logCard(`Dragon Localization Details (ID: ${id})`, {
                    ID: id,
                    Name: name || "(Not found)",
                    Description: description || "(Not found)",
                })
            }

            if (options.key) {
                const value = localization.getValueFromKey(options.key)
                logCard("Translation Result", {
                    Key: options.key,
                    Value: value || "(Key not found)",
                })
            }

            if (options.value) {
                const key = localization.getKeyFromValue(options.value)
                logCard("Key Lookup Result", {
                    SearchValue: options.value,
                    FoundKey: key || "(Value not found)",
                })
            }

            if (options.search) {
                const rawKeys = localization.searchKeys({ query: options.search })
                const rawValues = localization.searchValues({ query: options.search })

                const keyMatches = rawKeys.map((k) => ({
                    key: k,
                    value: localization.getValueFromKey(k),
                }))

                const valueMatches = rawValues.map((v) => ({
                    value: v,
                    key: localization.getKeyFromValue(v),
                }))

                await logSearchResults(options.search, keyMatches, valueMatches)
            }

            if (!options.output && !options.dragonId && !options.key && !options.value && !options.search) {
                logInfo(
                    `Localization fetched successfully (${Object.keys(localization.data).length} keys). Use --output or query flags to view data.`,
                )
            }
        } catch (error) {
            logError("Failed to fetch localization data", error)
        }
    })
