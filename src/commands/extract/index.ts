import { Command } from "commander"

import { extractDragonFlashCommand } from "./dragon-flash.js"
import { extractDragonSpineCommand } from "./dragon-spine.js"
import { extractDragonSpriteCommand } from "./dragon-sprite.js"
import { extractDragonThumbnailCommand } from "./dragon-thumbnail.js"

export const extractCommand = new Command("extract").description("Extract metadata and information from asset URLs")

extractCommand.addCommand(extractDragonSpriteCommand)
extractCommand.addCommand(extractDragonThumbnailCommand)
extractCommand.addCommand(extractDragonFlashCommand)
extractCommand.addCommand(extractDragonSpineCommand)
