import { Command } from "commander"

import dcAssets from "@dchighs/dc-assets"
import { DragonPhase } from "@dchighs/dc-core"

import { ensureDirectory } from "../../helpers/fs.js"
import { logError, logSuccess } from "../../helpers/logger.js"

export const dragonThumbnailCommand = new Command("dragon-thumbnail")
    .description("Download dragon thumbnail")
    .argument("[imageName]", "Dragon image name (e.g. 1000_dragon_nature)")
    .option("-i, --image-name <name>", "Dragon image name")
    .option("-p, --phase <phase>", "Dragon phase (0: Egg, 1: Baby, 2: Young, 3: Adult)", "3")
    .option("-s, --skin <skin>", "Dragon skin (e.g. _1)")
    .option("--platform <platform>", "Platform prefix (e.g. dci | dca | dcm)")
    .option("-o, --output <file>", "Output file path")
    .action(async (argImageName, options) => {
        try {
            const imageName = argImageName || options.imageName
            if (!imageName) {
                logError(
                    "Missing required dragon image name. Provide as positional argument or --image-name / -i flag.",
                )
                return
            }

            const phase = Number(options.phase) as DragonPhase
            const outputFile = options.output || `${imageName}_phase${phase}_thumb.png`

            await ensureDirectory(outputFile)
            const downloader = dcAssets.dragons.thumbnail({
                imageName,
                phase,
                skin: options.skin,
                platformPrefix: options.platform,
            })
            await downloader.download(outputFile)
            logSuccess(`Dragon thumbnail saved to ${outputFile}`)
        } catch (error) {
            logError("Failed to download dragon thumbnail", error)
        }
    })
