import { Command } from "commander"

import dcAssets from "@dchighs/dc-assets"

import { ensureDirectory } from "../../helpers/fs.js"
import { logError, logSuccess } from "../../helpers/logger.js"

export const musicCommand = new Command("music")
    .description("Download music audio (.mp3)")
    .requiredOption("-k, --key-name <key>", "Music key name (e.g. 531_dc_party_planning_island)")
    .option("-o, --output <file>", "Output file path")
    .action(async (options) => {
        try {
            const outputFile = options.output || `${options.keyName}.mp3`

            await ensureDirectory(outputFile)
            const downloader = dcAssets.sounds.music({
                keyName: options.keyName,
            })
            await downloader.download(outputFile)
            logSuccess(`Music saved to ${outputFile}`)
        } catch (error) {
            logError("Failed to download music", error)
        }
    })
