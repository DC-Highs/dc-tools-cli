import { Command } from "commander"

import dcAssets from "@dchighs/dc-assets"

import { ensureDirectory } from "../../helpers/fs.js"
import { logError, logSuccess } from "../../helpers/logger.js"

export const buildingThumbnailCommand = new Command("building-thumbnail")
    .description("Download building thumbnail")
    .requiredOption("-i, --image-name <name>", "Building image name (e.g. 10552_hatchery6reskinart_building)")
    .option("-o, --output <file>", "Output file path")
    .action(async (options) => {
        try {
            const outputFile = options.output || `${options.imageName}_thumb.jpg`

            await ensureDirectory(outputFile)
            const downloader = dcAssets.buildings.thumbnail({
                imageName: options.imageName,
            })
            await downloader.download(outputFile)
            logSuccess(`Building thumbnail saved to ${outputFile}`)
        } catch (error) {
            logError("Failed to download building thumbnail", error)
        }
    })
