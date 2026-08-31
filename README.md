# @dchighs/dc-tools-cli

A powerful, modular Command Line Interface (CLI) for downloading **Dragon City** game assets, searching localizations/translations, managing local client state & cached assets, parsing asset metadata from URLs, and fetching game configurations.

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
│   by DC HIGHS v0.2.0 • @dchighs/dc-tools-cli                         │
│                                                                      │
╰──────────────────────────────────────────────────────────────────────╯
```

---

## ⚡ Features

- 📦 **Asset Downloader**: Download dragon sprites, thumbnails, SWF Flash animations, Spine 2D animations, building sprites, habitat sprites, decorations, chests, island packages, and background music.
- 🐉 **All-In-One Dragon Downloader**: Download all assets across every dragon growth phase (`phase0` through `phase3`) with a single command.
- 🎮 **Local Client & Asset Manager (`dc-client`)**: Discover client data directory paths, list/filter/substitute cached assets with interactive terminal pagination, and manage type-safe game preferences (or raw `UserDefault.xml`).
- 🌐 **Localization & Translation Engine**: Query translations across 10 supported languages (`en`, `pt`, `es`, `fr`, `de`, `it`, `ja`, `ru`, `ko`, `tr`), lookup keys/values, fetch dragon names/descriptions by ID, and run interactive paginated searches in the terminal.
- 🔍 **URL Metadata Extractor**: Instantly parse asset URLs (`dragon:sprite`, `dragon:thumbnail`, `dragon-animation:flash`, `dragon-animation:spine`) to extract dragon ID, image name, phase, quality, skin, and platform prefix (`dci`, `dca`, `dcm`).
- ⚙️ **Game Configuration Manager**: Retrieve authenticated or raw game configuration data directly from Dragon City servers.

---

## 📦 Installation & Execution Methods

Choose the execution method that best fits your workflow:

### 🚀 Option 1: Execute via `npx` (No Installation Needed)
Run commands instantly using `npx` without installing any global packages:

```bash
npx @dchighs/dc-tools-cli download dragon:all 1000_dragon_nature
```

---

### 💻 Option 2: Install Globally via `npm`
Install `@dchighs/dc-tools-cli` globally on your machine to use the `dc-tools-cli` binary command anywhere:

```bash
npm install -g @dchighs/dc-tools-cli

# Run anywhere in your terminal:
dc-tools-cli --help
```

---

### 💾 Option 3: Standalone Executable Release (No Node.js Required)
Download standalone compiled executables for Windows, Linux, or macOS directly from the [GitHub Releases](https://github.com/DC-Highs/dc-tools-cli/releases) page:

- **Windows**: Download `index-win.exe` (or `dc-tools-cli-win.exe`)
- **Linux**: Download `index-linux`
- **macOS**: Download `index-macos`

Run directly in your command line:

```powershell
# Windows PowerShell example
.\index-win.exe download dragon:all 1000_dragon_nature
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

### 🎮 5. Local Dragon City Client Management (`dc-client`)

Manage local client data directories, cached assets, and preferences for the installed Dragon City Windows client.

#### Get Client Data Directory Path
Get the absolute path to the local Dragon City client storage directory:
```bash
dc-tools-cli dc-client get-dir-path
```

#### List Cached Assets (`dc-client assets list`)
List files in the local cache with support for asset type filtering (`-t, --type image audio texture mask binary`), pagination (`-p, --page`, `-l, --limit`), unpaginated view (`-a, --all`), and interactive prompt navigation:

```bash
# Interactive paginated list
dc-tools-cli dc-client assets list

# Filter by type (image, audio, texture, mask, binary)
dc-tools-cli dc-client assets list -t image audio

# Specific page and custom limit
dc-tools-cli dc-client assets list -p 2 -l 15

# View all files without pagination
dc-tools-cli dc-client assets list --all
```

#### Manage Local Assets (`dc-client assets`)
```bash
# Substitute a cached asset with a custom local file
dc-tools-cli dc-client assets set -k "ui_1000_dragon_nature_3@2x.png" -i "./my_custom_sprite.png"

# Get absolute path of a cached file
dc-tools-cli dc-client assets get-file-path -f "ui_1000_dragon_nature_3@2x.png"

# Delete a specific cached asset file
dc-tools-cli dc-client assets delete -f "ui_1000_dragon_nature_3@2x.png"

# Clear all files in the assets cache
dc-tools-cli dc-client assets clear
```

#### Manage Game Preferences (`dc-client preferences` & `dc-client user-default`)
```bash
# High-level preference helpers
dc-tools-cli dc-client preferences disable-music
dc-tools-cli dc-client preferences get-user-id
dc-tools-cli dc-client preferences set-farm-crops --plant-id 1

# Low-level UserDefault.xml access
dc-tools-cli dc-client user-default get -k "MUSIC_OFF"
dc-tools-cli dc-client user-default set -k "MUSIC_OFF" -v "1"
dc-tools-cli dc-client user-default delete -k "SOME_KEY"
```

---


## 🛠️ Development & Building Standalone Executables

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

# Build standalone executables for Windows, Linux, and macOS (outputs to ./release/)
npm run build:exe

# Format codebase
npm run format
```

---

## 📜 License

Distributed under the [MIT License](LICENSE).