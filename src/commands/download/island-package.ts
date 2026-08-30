import { Command } from "commander"

import dcAssets from "@dchighs/dc-assets"
import { IslandType } from "@dchighs/dc-core"

import { ensureDirectory } from "../../helpers/fs.js"
import { logError, logSuccess } from "../../helpers/logger.js"

export const islandPackageCommand = new Command("island-package")
    .description("Download island content package (.zip)")
    .requiredOption("-f, --file-name <name>", "Island content file name (e.g. 1000_dragon_nature)")
    .option(
        "-t, --island-type <type>",
        "Island type (e.g. heroicraces_islands, maze_island, etc.)",
        "heroicraces_islands",
    )
    .option("-o, --output <file>", "Output file path")
    .action(async (options) => {
        try {
            const outputFile = options.output || `${options.fileName}_island.zip`

            await ensureDirectory(outputFile)
            const downloader = dcAssets.islands.package({
                fileName: options.fileName,
                islandType: options.islandType as IslandType,
            })
            await downloader.download(outputFile)
            logSuccess(`Island package saved to ${outputFile}`)
        } catch (error) {
            logError("Failed to download island package", error)
        }
    })
