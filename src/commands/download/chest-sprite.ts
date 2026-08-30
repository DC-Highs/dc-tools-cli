import { Command } from "commander"

import dcAssets from "@dchighs/dc-assets"
import { ChestSpriteQuality } from "@dchighs/dc-core"

import { ensureDirectory } from "../../helpers/fs.js"
import { logError, logSuccess } from "../../helpers/logger.js"

export const chestSpriteCommand = new Command("chest-sprite")
    .description("Download chest sprite")
    .requiredOption("-i, --image-name <name>", "Chest image name")
    .option("-q, --quality <quality>", "Sprite quality (normal | large)", "normal")
    .option("-o, --output <file>", "Output file path")
    .action(async (options) => {
        try {
            const quality = options.quality === "large" ? ChestSpriteQuality.Large : ChestSpriteQuality.Normal
            const outputFile = options.output || `${options.imageName}_chest.png`

            await ensureDirectory(outputFile)
            const downloader = dcAssets.chests.sprite({
                imageName: options.imageName,
                imageQuality: quality,
            })
            await downloader.download(outputFile)
            logSuccess(`Chest sprite saved to ${outputFile}`)
        } catch (error) {
            logError("Failed to download chest sprite", error)
        }
    })
