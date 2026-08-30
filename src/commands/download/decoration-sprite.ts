import { Command } from "commander"

import dcAssets from "@dchighs/dc-assets"
import { DecorationSpriteQuality } from "@dchighs/dc-core"

import { ensureDirectory } from "../../helpers/fs.js"
import { logError, logSuccess } from "../../helpers/logger.js"

export const decorationSpriteCommand = new Command("decoration-sprite")
    .description("Download decoration sprite")
    .requiredOption("-i, --image-name <name>", "Decoration image name")
    .option("-q, --quality <quality>", "Sprite quality (normal | large)", "normal")
    .option("-o, --output <file>", "Output file path")
    .action(async (options) => {
        try {
            const quality = options.quality === "large" ? DecorationSpriteQuality.Large : DecorationSpriteQuality.Normal
            const outputFile = options.output || `${options.imageName}_deco.png`

            await ensureDirectory(outputFile)
            const downloader = dcAssets.decorations.sprite({
                imageName: options.imageName,
                imageQuality: quality,
            })
            await downloader.download(outputFile)
            logSuccess(`Decoration sprite saved to ${outputFile}`)
        } catch (error) {
            logError("Failed to download decoration sprite", error)
        }
    })
