import { Command } from "commander"

import { buildingSpriteCommand } from "./building-sprite.js"
import { buildingThumbnailCommand } from "./building-thumbnail.js"
import { chestSpriteCommand } from "./chest-sprite.js"
import { decorationSpriteCommand } from "./decoration-sprite.js"
import { decorationThumbnailCommand } from "./decoration-thumbnail.js"
import { dragonAllCommand } from "./dragon-all.js"
import { dragonFlashCommand } from "./dragon-flash.js"
import { dragonSpineCommand } from "./dragon-spine.js"
import { dragonSpriteCommand } from "./dragon-sprite.js"
import { dragonThumbnailCommand } from "./dragon-thumbnail.js"
import { habitatSpriteCommand } from "./habitat-sprite.js"
import { habitatThumbnailCommand } from "./habitat-thumbnail.js"
import { islandPackageCommand } from "./island-package.js"
import { musicCommand } from "./music.js"

export const downloadCommand = new Command("download").description("Download various Dragon City assets")

// 1. Direct / Flat hyphenated subcommands: download dragon-sprite, download dragon-flash, etc.
downloadCommand.addCommand(dragonSpriteCommand)
downloadCommand.addCommand(dragonFlashCommand)
downloadCommand.addCommand(dragonSpineCommand)
downloadCommand.addCommand(dragonThumbnailCommand)
downloadCommand.addCommand(dragonAllCommand)
downloadCommand.addCommand(buildingSpriteCommand)
downloadCommand.addCommand(buildingThumbnailCommand)
downloadCommand.addCommand(habitatSpriteCommand)
downloadCommand.addCommand(habitatThumbnailCommand)
downloadCommand.addCommand(decorationSpriteCommand)
downloadCommand.addCommand(decorationThumbnailCommand)
downloadCommand.addCommand(chestSpriteCommand)
downloadCommand.addCommand(islandPackageCommand)
downloadCommand.addCommand(musicCommand)
