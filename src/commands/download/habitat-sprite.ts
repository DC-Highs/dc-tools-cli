import { Command } from "commander"

import dcAssets from "@dchighs/dc-assets"
import { HabitatSpriteQuality } from "@dchighs/dc-core"

import { ensureDirectory } from "../../helpers/fs.js"
import { logError, logSuccess } from "../../helpers/logger.js"

export const habitatSpriteCommand = new Command("habitat-sprite")
    .description("Download habitat sprite")
    .requiredOption("-i, --image-name <name>", "Habitat image name")
    .option("-q, --quality <quality>", "Sprite quality (normal | large)", "normal")
    .option("-o, --output <file>", "Output file path")
    .action(async (options) => {
        try {
            const quality = options.quality === "large" ? HabitatSpriteQuality.Large : HabitatSpriteQuality.Normal
            const outputFile = options.output || `${options.imageName}_habitat.png`

            await ensureDirectory(outputFile)
            const downloader = dcAssets.habitats.sprite({
                imageName: options.imageName,
                imageQuality: quality,
            })
            await downloader.download(outputFile)
            logSuccess(`Habitat sprite saved to ${outputFile}`)
        } catch (error) {
            logError("Failed to download habitat sprite", error)
        }
    })
