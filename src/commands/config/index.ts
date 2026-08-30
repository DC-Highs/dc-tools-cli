import { Command } from "commander"

import { configFetchCommand } from "./fetch.js"
import { configRawCommand } from "./raw.js"

export const configCommand = new Command("config").description("Access and manage Dragon City configuration data")

configCommand.addCommand(configFetchCommand)
configCommand.addCommand(configRawCommand)
