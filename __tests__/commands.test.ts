import { describe, expect, it } from "vitest"

import { DragonStaticFileUrlParser } from "@dchighs/dc-core"

import { createProgram } from "../src/index.js"

describe("CLI Commands Structure", () => {
    it("should initialize program with subcommands", () => {
        const program = createProgram()
        const commands = program.commands.map((cmd) => cmd.name())
        expect(commands).toContain("download")
        expect(commands).toContain("extract")
        expect(commands).toContain("localization")
        expect(commands).toContain("config")
        expect(commands).toContain("dc-client")
    })

    it("should include get-dir-path subcommand under dc-client", () => {
        const program = createProgram()
        const dcClientCmd = program.commands.find((cmd) => cmd.name() === "dc-client")
        const dcClientSubcommands = dcClientCmd?.commands.map((cmd) => cmd.name()) || []
        expect(dcClientSubcommands).toContain("get-dir-path")
        expect(dcClientSubcommands).toContain("user-default")
        expect(dcClientSubcommands).toContain("preferences")
        expect(dcClientSubcommands).toContain("assets")
    })

    it("should include assets list subcommand under dc-client", () => {

        const program = createProgram()
        const dcClientCmd = program.commands.find((cmd) => cmd.name() === "dc-client")
        const assetsCmd = dcClientCmd?.commands.find((cmd) => cmd.name() === "assets")
        const assetSubcommands = assetsCmd?.commands.map((cmd) => cmd.name()) || []
        expect(assetSubcommands).toContain("list")
        expect(assetSubcommands).toContain("set")
        expect(assetSubcommands).toContain("get-file-path")
        expect(assetSubcommands).toContain("delete")
        expect(assetSubcommands).toContain("clear")
    })

    it("should extract dragon sprite URL correctly", () => {
        const url = "https://d2jzh4ly5l24e7.cloudfront.net/static/img/dragons/1000_dragon_nature/sprite_HD.png"
        const parsed = DragonStaticFileUrlParser.parseFromSprite(url)
        expect(parsed.id).toBe(1000)
        expect(parsed.imageName).toBe("1000_dragon_nature")
    })
})

