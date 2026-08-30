import { Command } from "commander"

import { DragonStaticFileUrlParser } from "@dchighs/dc-core"

import { formatExtractedMetadata, logCard, logError } from "../../helpers/logger.js"

export const extractDragonSpriteCommand = new Command("dragon:sprite")
    .description("Extract data from a dragon sprite URL")
    .argument("<url>", "Dragon sprite URL")
    .action((url: string) => {
        try {
            const data = DragonStaticFileUrlParser.parseFromSprite(url)
            logCard("Extracted Dragon Sprite Metadata", formatExtractedMetadata(data as Record<string, unknown>))
        } catch (error) {
            logError("Failed to extract data from dragon sprite URL", error)
        }
    })
