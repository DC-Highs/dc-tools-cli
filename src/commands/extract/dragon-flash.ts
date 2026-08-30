import { Command } from "commander"

import { DragonStaticFileUrlParser } from "@dchighs/dc-core"

import { formatExtractedMetadata, logCard, logError } from "../../helpers/logger.js"

export const extractDragonFlashCommand = new Command("dragon-flash")
    .description("Extract data from a dragon flash animation URL")
    .argument("<url>", "Dragon flash animation URL")
    .action((url: string) => {
        try {
            const data = DragonStaticFileUrlParser.parseFromFlashAnimation(url)
            logCard("Extracted Dragon Flash Metadata", formatExtractedMetadata(data as Record<string, unknown>))
        } catch (error) {
            logError("Failed to extract data from dragon flash animation URL", error)
        }
    })
