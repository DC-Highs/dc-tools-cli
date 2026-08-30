import { Command } from "commander"

import dcAssets from "@dchighs/dc-assets"
import { BuildingSpriteQuality } from "@dchighs/dc-core"

import { ensureDirectory } from "../../helpers/fs.js"
import { logError, logSuccess } from "../../helpers/logger.js"

export const buildingSpriteCommand = new Command("building-sprite")
    .description("Download building sprite")
    .requiredOption("-i, --image-name <name>", "Building image name (e.g. 10552_hatchery6reskinart_building)")
    .option("-q, --quality <quality>", "Sprite quality (normal | large)", "normal")
    .option("-o, --output <file>", "Output file path")
    .action(async (options) => {
        try {
            const quality = options.quality === "large" ? BuildingSpriteQuality.Large : BuildingSpriteQuality.Normal
            const outputFile = options.output || `${options.imageName}_sprite.png`

            await ensureDirectory(outputFile)
            const downloader = dcAssets.buildings.sprite({
                imageName: options.imageName,
                imageQuality: quality,
            })
            await downloader.download(outputFile)
            logSuccess(`Building sprite saved to ${outputFile}`)
        } catch (error) {
            logError("Failed to download building sprite", error)
        }
    })
