import { ClientState } from "@dchighs/dc-client-state"
import { Command } from "commander"

import { logError, logSuccess } from "../../helpers/logger.js"
import { assetsCommand } from "./assets.js"
import { preferencesCommand } from "./preferences.js"
import { userDefaultCommand } from "./user-default.js"

export const dcClientCommand = new Command("dc-client").description(
    "Access and manage local Dragon City client state, preferences, and cached assets",
)

dcClientCommand
    .command("get-dir-path")
    .description("Get absolute directory path of local Dragon City client data")
    .action(async () => {
        try {
            const client = new ClientState()
            logSuccess(`Dragon City directory path: ${client.dragonCityDirPath}`)
        } catch (error) {
            logError("Failed to get Dragon City directory path", error)
        }
    })

dcClientCommand.addCommand(userDefaultCommand)
dcClientCommand.addCommand(preferencesCommand)
dcClientCommand.addCommand(assetsCommand)

