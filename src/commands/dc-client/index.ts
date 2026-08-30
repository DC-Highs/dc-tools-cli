import { Command } from "commander"

import { assetsCommand } from "./assets.js"
import { preferencesCommand } from "./preferences.js"
import { userDefaultCommand } from "./user-default.js"

export const dcClientCommand = new Command("dc-client").description(
    "Access and manage local Dragon City client state, preferences, and cached assets",
)

dcClientCommand.addCommand(userDefaultCommand)
dcClientCommand.addCommand(preferencesCommand)
dcClientCommand.addCommand(assetsCommand)
