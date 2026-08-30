# @dchighs/dc-tools-cli

A powerful, modular Command Line Interface (CLI) for downloading **Dragon City** game assets, searching localizations/translations, parsing asset metadata from URLs, and fetching game configurations.

```
╭──────────────────────────────────────────────────────────────────────╮
│                                                                      │
│   ██████╗   ██████╗  ████████╗ ██████╗  ██████╗ ██╗     ███████╗     │
│   ██╔══██╗ ██╔════╝  ╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝     │
│   ██║  ██║ ██║          ██║   ██║   ██║██║   ██║██║     ███████╗     │
│   ██║  ██║ ██║          ██║   ██║   ██║██║   ██║██║     ╚════██║     │
│   ██████╔╝ ╚██████╗     ██║   ╚██████╔╝╚██████╔╝███████╗███████║     │
│   ╚═════╝   ╚═════╝     ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝     │
│                                                                      │
│   by DC HIGHS v0.1.0 • @dchighs/dc-tools-cli                         │
│                                                                      │
╰──────────────────────────────────────────────────────────────────────╯
```

---

## ⚡ Features

- 📦 **Asset Downloader**: Download dragon sprites, thumbnails, SWF Flash animations, Spine 2D animations, building sprites, habitat sprites, decorations, chests, island packages, and background music.
- 🐉 **All-In-One Dragon Downloader**: Download all assets across every dragon growth phase (`phase0` through `phase3`) with a single command.
- 🌐 **Localization & Translation Engine**: Query translations across 10 supported languages (`en`, `pt`, `es`, `fr`, `de`, `it`, `ja`, `ru`, `ko`, `tr`), lookup keys/values, fetch dragon names/descriptions by ID, and run interactive paginated searches in the terminal.
- 🔍 **URL Metadata Extractor**: Instantly parse asset URLs (`dragon:sprite`, `dragon:thumbnail`, `dragon-animation:flash`, `dragon-animation:spine`) to extract dragon ID, image name, phase, quality, skin, and platform prefix (`dci`, `dca`, `dcm`).
- ⚙️ **Game Configuration Manager**: Retrieve authenticated or raw game configuration data directly from Dragon City servers.

---

## 📦 Installation

```bash
npm install -g @dchighs/dc-tools-cli
```

Or execute directly using `npx`:

```bash
npx @dchighs/dc-tools-cli --help
```

---

## 🚀 Usage Guide

Run the root command to display the interactive help screen and CLI banner:

```bash
dc-tools-cli
```

---

### 📥 1. Downloading Game Assets (`download`)

#### Download All Dragon Assets (`dragon:all`)
Downloads all sprites, thumbnails, Flash animations, and Spine 2D animations across all growth phases (`phase0` to `phase3`) for a dragon:

```bash
# Using positional argument
dc-tools-cli download dragon:all 1000_dragon_nature

# Using flags and specifying platform/output directory
dc-tools-cli download dragon:all -i 1000_dragon_nature --platform dci -o ./my-dragons
```

#### Individual Dragon Assets
Supports positional arguments or `-i, --image-name` flags, along with platform filtering (`--platform <dci|dca|dcm>`):

```bash
# Dragon Sprite
dc-tools-cli download dragon:sprite 1000_dragon_nature --phase 3 --platform dci

# Dragon Thumbnail
dc-tools-cli download dragon:thumbnail 1000_dragon_nature --phase 3

# Dragon Flash Animation (.swf)
dc-tools-cli download dragon-animation:flash 1000_dragon_nature --phase 3

# Dragon Spine 2D Animation (.zip)
dc-tools-cli download dragon-animation:spine 1000_dragon_nature --phase 3
```

#### Buildings, Habitats, Decorations & Chests

```bash
# Building Sprite
dc-tools-cli download building:sprite -i building_hatching_boost

# Habitat Sprite
dc-tools-cli download habitat:sprite -i habitat_nature_1

# Decoration Sprite
dc-tools-cli download decoration:sprite -i deco_flower_red

# Chest Sprite
dc-tools-cli download chest:sprite -i chest_gold_01

# Island Content Package (.zip)
dc-tools-cli download island-package -f heroicraces_islands_package -t heroicraces_islands

# Game Music (.mp3)
dc-tools-cli download music -k music_main_theme -o ./music.mp3
```

---

### 🌐 2. Localization & Translations (`localization`)

Fetch and search Dragon City translation strings across 10 supported languages.

#### Fetch Dragon Info by ID
```bash
dc-tools-cli localization get --dragon-id 1000 -l br
```
**Terminal Output:**
```text
  📌 Dragon Localization Details (ID: 1000)
     ID          : 1000
     Name        : Dragão Natureza
     Description : Este dragão gosta de viver na floresta tropical...
```

#### Lookup Translation Key / Value
```bash
# Lookup value by key
dc-tools-cli localization get --key tid_new_expansionevent2_button -l br

# Lookup key by translation text
dc-tools-cli localization get --value "Dragão Natureza" -l br
```

#### Interactive Paginated Search (`-s, --search`)
Search translation keys and text strings with interactive terminal pagination:

```bash
dc-tools-cli localization get -l br -s natureza
```
- Press `Enter` or `n`: Next Page
- Press `p`: Previous Page
- Press `q`: Quit search

#### Export Full Localization to JSON
```bash
dc-tools-cli localization get -l en -o localization_en.json
```

---

### 🔍 3. Extract Metadata from Asset URLs (`extract`)

Parse static asset URLs to extract structured dragon metadata (ID, Image Name, Phase, Skin, Platform, Quality):

#### Extract Dragon Sprite Metadata
```bash
dc-tools-cli extract dragon:sprite "https://dci-static-s1.socialpointgames.com/static/dragoncity/mobile/ui/dragons/ui_1000_dragon_nature_3@2x.png"
```
**Terminal Output:**
```text
  📌 Extracted Dragon Sprite Metadata
     platformPrefix : dci (iOS)
     id             : 1000
     imageName      : 1000_dragon_nature
     phase          : 3 (Adult)
     skin           : (none)
     imageQuality   : @2x (large)
```

#### Extract Dragon Thumbnail, Flash & Spine
```bash
dc-tools-cli extract dragon:thumbnail <url>
dc-tools-cli extract dragon-animation:flash <url>
dc-tools-cli extract dragon-animation:spine <url>
```

---

### ⚙️ 4. Fetch Game Configuration (`config`)

#### Raw Configuration
Retrieve raw configuration JSON from a public/raw URL:

```bash
dc-tools-cli config raw -u "https://example.com/data.json" -o config.json
```

#### Authenticated Game Configuration
Retrieve configuration using active user credentials:

```bash
dc-tools-cli config fetch \
  --url "https://game-config.dragoncity.com/api" \
  --user-id "12345678" \
  --auth-token "your_auth_token" \
  -o game_config.json
```

---

## 🛠️ Development & Testing

```bash
# Clone the repository
git clone https://github.com/dc-highs/dc-tools-cli.git
cd dc-tools-cli

# Install dependencies
npm install

# Run in development mode
npm run dev -- download dragon:all 1000_dragon_nature

# Run unit tests
npm run test

# Build TypeScript output
npm run build

# Format codebase
npm run format
```

---

## 📜 License

Distributed under the [MIT License](LICENSE).