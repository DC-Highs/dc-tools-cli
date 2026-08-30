import path from "node:path"
import { Command } from "commander"

import dcAssets from "@dchighs/dc-assets"
import { DragonPhase } from "@dchighs/dc-core"

import { ensureDirectory } from "../../helpers/fs.js"
import { logError, logInfo, logSuccess } from "../../helpers/logger.js"

export const dragonAllCommand = new Command("dragon:all")
    .description("Find and download all asset files (sprite, thumbnail, flash, spine) for a dragon")
    .argument("[imageName]", "Dragon image name (e.g. 1000_dragon_nature)")
    .option("-i, --image-name <name>", "Dragon image name")
    .option("-p, --phase <phase>", "Specific dragon phase (0: Egg, 1: Baby, 2: Young, 3: Adult)")
    .option("-s, --skin <skin>", "Dragon skin (e.g. _1)")
    .option("--platform <platform>", "Platform prefix (e.g. dci | dca | dcm)")
    .option("-o, --output-dir <dir>", "Output directory", "./downloads")
    .action(async (argImageName, options) => {
        try {
            const imageName = argImageName || options.imageName
            if (!imageName) {
                logError(
                    "Missing required dragon image name. Provide as positional argument or --image-name / -i flag.",
                )
                return
            }

            const outDir = options.outputDir || "./downloads"
            const phasesToDownload =
                options.phase !== undefined
                    ? [Number(options.phase) as DragonPhase]
                    : [DragonPhase.Egg, DragonPhase.Baby, DragonPhase.Young, DragonPhase.Adult]

            logInfo(`Downloading all assets for ${imageName}...`)

            for (const phase of phasesToDownload) {
                // Sprite
                try {
                    const spritePath = path.join(outDir, `${imageName}_phase${phase}_sprite.png`)
                    await ensureDirectory(spritePath)
                    const spriteDownloader = dcAssets.dragons.sprite({
                        imageName,
                        phase,
                        skin: options.skin,
                        platformPrefix: options.platform,
                    })
                    await spriteDownloader.download(spritePath)
                    logSuccess(`[Phase ${phase}] Sprite saved to ${spritePath}`)
                } catch {
                    logInfo(`[Phase ${phase}] Sprite not found or failed to download.`)
                }

                // Thumbnail
                try {
                    const thumbPath = path.join(outDir, `${imageName}_phase${phase}_thumb.png`)
                    await ensureDirectory(thumbPath)
                    const thumbDownloader = dcAssets.dragons.thumbnail({
                        imageName,
                        phase,
                        skin: options.skin,
                        platformPrefix: options.platform,
                    })
                    await thumbDownloader.download(thumbPath)
                    logSuccess(`[Phase ${phase}] Thumbnail saved to ${thumbPath}`)
                } catch {
                    logInfo(`[Phase ${phase}] Thumbnail not found or failed to download.`)
                }

                // Flash Animation
                try {
                    const flashPath = path.join(outDir, `${imageName}_phase${phase}_flash.swf`)
                    await ensureDirectory(flashPath)
                    const flashDownloader = dcAssets.dragons.animations.flash({
                        imageName,
                        phase,
                        skin: options.skin,
                        platformPrefix: options.platform,
                    })
                    await flashDownloader.download(flashPath)
                    logSuccess(`[Phase ${phase}] Flash animation saved to ${flashPath}`)
                } catch {
                    logInfo(`[Phase ${phase}] Flash animation not found or failed to download.`)
                }

                // Spine Animation
                try {
                    const spinePath = path.join(outDir, `${imageName}_phase${phase}_spine.zip`)
                    await ensureDirectory(spinePath)
                    const spineDownloader = dcAssets.dragons.animations.spine({
                        imageName,
                        phase,
                        skin: options.skin,
                        platformPrefix: options.platform,
                    })
                    await spineDownloader.download(spinePath)
                    logSuccess(`[Phase ${phase}] Spine animation saved to ${spinePath}`)
                } catch {
                    logInfo(`[Phase ${phase}] Spine animation not found or failed to download.`)
                }
            }
        } catch (error) {
            logError("Failed to download dragon assets", error)
        }
    })
