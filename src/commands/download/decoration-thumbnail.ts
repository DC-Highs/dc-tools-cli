import { Command } from "commander"

import dcAssets from "@dchighs/dc-assets"

import { ensureDirectory } from "../../helpers/fs.js"
import { logError, logSuccess } from "../../helpers/logger.js"

export const decorationThumbnailCommand = new Command("decoration-thumbnail")
    .description("Download decoration thumbnail")
    .requiredOption("-i, --image-name <name>", "Decoration image name")
    .option("-o, --output <file>", "Output file path")
    .action(async (options) => {
        try {
            const outputFile = options.output || `${options.imageName}_deco_thumb.png`

            await ensureDirectory(outputFile)
            const downloader = dcAssets.decorations.thumbnail({
                imageName: options.imageName,
            })
            await downloader.download(outputFile)
            logSuccess(`Decoration thumbnail saved to ${outputFile}`)
        } catch (error) {
            logError("Failed to download decoration thumbnail", error)
        }
    })
