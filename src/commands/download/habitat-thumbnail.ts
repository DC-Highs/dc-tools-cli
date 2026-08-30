import { Command } from "commander"

import dcAssets from "@dchighs/dc-assets"

import { ensureDirectory } from "../../helpers/fs.js"
import { logError, logSuccess } from "../../helpers/logger.js"

export const habitatThumbnailCommand = new Command("habitat-thumbnail")
    .description("Download habitat thumbnail")
    .requiredOption("-i, --image-name <name>", "Habitat image name")
    .option("-o, --output <file>", "Output file path")
    .action(async (options) => {
        try {
            const outputFile = options.output || `${options.imageName}_habitat_thumb.png`

            await ensureDirectory(outputFile)
            const downloader = dcAssets.habitats.thumbnail({
                imageName: options.imageName,
            })
            await downloader.download(outputFile)
            logSuccess(`Habitat thumbnail saved to ${outputFile}`)
        } catch (error) {
            logError("Failed to download habitat thumbnail", error)
        }
    })
