import { Command } from "commander"

import { DragonStaticFileUrlParser } from "@dchighs/dc-core"

import { formatExtractedMetadata, logCard, logError } from "../../helpers/logger.js"

export const extractDragonSpineCommand = new Command("dragon-animation:spine")
    .description("Extract data from a dragon spine animation URL")
    .argument("<url>", "Dragon spine animation URL")
    .action((url: string) => {
        try {
            const data = DragonStaticFileUrlParser.parseFromSpineAnimation(url)
            logCard("Extracted Dragon Spine Metadata", formatExtractedMetadata(data as Record<string, unknown>))
        } catch (error) {
            logError("Failed to extract data from dragon spine animation URL", error)
        }
    })
