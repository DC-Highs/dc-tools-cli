import { Command } from "commander"

import { DragonStaticFileUrlParser } from "@dchighs/dc-core"

import { formatExtractedMetadata, logCard, logError } from "../../helpers/logger.js"

export const extractDragonThumbnailCommand = new Command("dragon-thumbnail")
    .alias("d-thumbnail")
    .description("Extract data from a dragon thumbnail URL")
    .argument("<url>", "Dragon thumbnail URL")
    .action((url: string) => {
        try {
            const data = DragonStaticFileUrlParser.parseFromThumbnail(url)
            logCard("Extracted Dragon Thumbnail Metadata", formatExtractedMetadata(data as Record<string, unknown>))
        } catch (error) {
            logError("Failed to extract data from dragon thumbnail URL", error)
        }
    })
