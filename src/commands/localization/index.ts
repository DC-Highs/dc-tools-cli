import { Command } from "commander"

import { localizationFetchCommand } from "./fetch.js"

export const localizationCommand = new Command("localization").description(
    "Access and manage Dragon City localization data",
)

localizationCommand.addCommand(localizationFetchCommand)
