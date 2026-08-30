#!/usr/bin/env node
import { Command } from "commander"

import { description, name, version } from "../package.json"
import { configCommand } from "./commands/config/index.js"
import { dcClientCommand } from "./commands/dc-client/index.js"
import { downloadCommand } from "./commands/download/index.js"
import { extractCommand } from "./commands/extract/index.js"
import { localizationCommand } from "./commands/localization/index.js"
import { CLI_BANNER } from "./helpers/banner.js"

export function createProgram(): Command {
    const program = new Command()

    program.name(name).version(version).description(description).addHelpText("before", CLI_BANNER)

    program.addCommand(downloadCommand)
    program.addCommand(extractCommand)
    program.addCommand(localizationCommand)
    program.addCommand(configCommand)
    program.addCommand(dcClientCommand)

    return program
}

export function main(argv: string[] = process.argv): void {
    const program = createProgram()
    program.parse(argv)
}

if (process.env.NODE_ENV !== "test" && !process.env.VITEST) {
    main()
}
