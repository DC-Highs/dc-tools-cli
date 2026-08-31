import { AssetType, ClientState } from "@dchighs/dc-client-state"
import { Command } from "commander"

import { logError, logPaginatedArray, logSuccess } from "../../helpers/logger.js"

export const assetsCommand = new Command("assets").description(
    "Manage local Dragon City cached assets",
)

assetsCommand
    .command("list")
    .description("List cached assets from local storage")
    .option(
        "-t, --type <types...>",
        "Filter assets by type (image, audio, texture, mask, binary)",
    )
    .option("-p, --page <page>", "Page number to view (1-indexed)", (val) => parseInt(val, 10))
    .option("-l, --limit <limit>", "Number of assets per page", (val) => parseInt(val, 10))
    .option("-a, --all", "Display all assets without pagination")
    .action(async (options) => {
        try {
            const client = new ClientState()
            const types = options.type as AssetType[] | undefined
            const assets = await client.assets.listAssets(types)

            await logPaginatedArray("Cached Assets", assets, {
                page: options.page,
                limit: options.limit,
                all: options.all,
            })
        } catch (error) {
            logError("Failed to list cached assets", error)
        }
    })


assetsCommand
    .command("set")
    .description("Replace a cached asset file with a substitute file")
    .requiredOption("-k, --key <key>", "Target cached asset file name")
    .requiredOption("-i, --input <input>", "Substitute file path")
    .action(async (options) => {
        try {
            const client = new ClientState()
            await client.assets.set(options.key, options.input)
            logSuccess(`Successfully replaced asset '${options.key}' with '${options.input}'`)
        } catch (error) {
            logError("Failed to set asset", error)
        }
    })

assetsCommand
    .command("get-file-path")
    .description("Get absolute file path of a cached asset")
    .requiredOption("-f, --file <file>", "Asset file name")
    .action(async (options) => {
        try {
            const client = new ClientState()
            const filePath = client.assets.getFilePath(options.file)
            logSuccess(`Asset file path: ${filePath}`)
        } catch (error) {
            logError("Failed to get asset file path", error)
        }
    })

assetsCommand
    .command("delete")
    .description("Delete a specific asset from local cache")
    .requiredOption("-f, --file <file>", "Asset file name to delete")
    .action(async (options) => {
        try {
            const client = new ClientState()
            await client.assets.delete(options.file)
            logSuccess(`Deleted asset '${options.file}' from local cache`)
        } catch (error) {
            logError("Failed to delete asset", error)
        }
    })

assetsCommand
    .command("clear")
    .description("Clear all files from the local assets cache directory")
    .action(async () => {
        try {
            const client = new ClientState()
            await client.assets.clearAssets()
            logSuccess("Cleared all assets from local cache")
        } catch (error) {
            logError("Failed to clear assets cache", error)
        }
    })

