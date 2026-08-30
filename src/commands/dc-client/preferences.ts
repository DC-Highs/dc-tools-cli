import { ClientState, Preferences } from "@dchighs/dc-client-state"
import { Command } from "commander"

import { logError, logInfo, logSuccess } from "../../helpers/logger.js"

export const preferencesCommand = new Command("preferences").description(
    "High-level type-safe game preferences management",
)

preferencesCommand
    .command("disable-music")
    .description("Disable background music in preferences")
    .action(async () => {
        try {
            const client = new ClientState()
            const preferences = new Preferences(client.userDefault)
            await preferences.disableMusic()
            logSuccess("Disabled background music in game preferences")
        } catch (error) {
            logError("Failed to disable music", error)
        }
    })

preferencesCommand
    .command("get-user-id")
    .description("Get the game User ID from preferences")
    .action(async () => {
        try {
            const client = new ClientState()
            const preferences = new Preferences(client.userDefault)
            const userId = await preferences.getUserId()
            if (userId !== undefined) {
                logSuccess(`User ID: ${userId}`)
            } else {
                logInfo("User ID not found in preferences")
            }
        } catch (error) {
            logError("Failed to get User ID", error)
        }
    })

preferencesCommand
    .command("set-farm-crops")
    .description("Set crop plant ID for all farms")
    .requiredOption("--plant-id <plantId>", "Crop plant ID to set", parseInt)
    .action(async (options) => {
        try {
            const client = new ClientState()
            const preferences = new Preferences(client.userDefault)
            await preferences.setAllFarmCrops(options.plantId)
            logSuccess(`Successfully set crop plant ID to ${options.plantId} for all farms`)
        } catch (error) {
            logError("Failed to set farm crops", error)
        }
    })
