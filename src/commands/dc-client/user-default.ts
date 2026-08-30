import { ClientState } from "@dchighs/dc-client-state"
import { Command } from "commander"

import { logError, logInfo, logSuccess } from "../../helpers/logger.js"

export const userDefaultCommand = new Command("user-default").description(
    "Manage low-level UserDefault.xml game preferences",
)

userDefaultCommand
    .command("set")
    .description("Set a key-value pair in UserDefault.xml")
    .requiredOption("-k, --key <key>", "Key to set")
    .requiredOption("-v, --value <value>", "Value to set")
    .action(async (options) => {
        try {
            const client = new ClientState()
            let val: any = options.value
            if (val === "true") val = true
            else if (val === "false") val = false
            else if (!isNaN(Number(val)) && val.trim() !== "") val = Number(val)

            await client.userDefault.set(options.key, val)
            logSuccess(`Successfully set '${options.key}' in UserDefault.xml`)
        } catch (error) {
            logError("Failed to set UserDefault key", error)
        }
    })

userDefaultCommand
    .command("get")
    .description("Get a value from UserDefault.xml by key")
    .requiredOption("-k, --key <key>", "Key to retrieve")
    .action(async (options) => {
        try {
            const client = new ClientState()
            const value = await client.userDefault.get(options.key)
            if (value === undefined) {
                logInfo(`Key '${options.key}' not found in UserDefault.xml`)
            } else {
                logSuccess(`Key '${options.key}': ${value}`)
            }
        } catch (error) {
            logError("Failed to get UserDefault key", error)
        }
    })
