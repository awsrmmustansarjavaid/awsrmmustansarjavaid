# 🚀 Charlie MJ — My Niche Web Apps & Tools

> A collection of my **niche web apps and personal tools**, built to solve real problems I personally encountered in everyday work, learning, media management, content discovery, and productivity.

These projects are not generic demo applications. Each one started from a **specific problem I wanted to solve for myself** and was developed into a practical, focused tool.

The projects cover different areas including **time tracking, media downloading, article discovery, photo storytelling, and video management**.

---

## 📌 My Niche Projects

| **#** | **Project**                                 | **GitHub Repository**                                                                                          | **Purpose**                                                            |
| ----: | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
|     1 | **Charlie MJ Chrono Journey**               | [charlie-mj-chrono-journey](https://github.com/awsrmmustansarjavaid/charlie-mj-chrono-journey)                 | Track the exact time elapsed between important past or future moments  |
|     2 | **Charlie MJ Drive Media Downloader**       | [charlie-MJ-drive-media-downloader](https://github.com/awsrmmustansarjavaid/charlie-MJ-drive-media-downloader) | Simplify saving authorized Google Drive media streams                  |
|     3 | **Charlie MJ Instagram Post Editor**        | [charlie-mj-instagram-post-editor](https://github.com/awsrmmustansarjavaid/charlie-mj-instagram-post-editor)   | Prepare, resize, crop, and export photos for Instagram formats offline |
|     4 | **Charlie MJ Medium Article Search Engine** | [medium-article-search-engine](https://github.com/awsrmmustansarjavaid/medium-article-search-engine)           | Search and filter articles from any public Medium profile              |
|     5 | **Charlie MJ PhotoStory**                   | [CharlieMJ-PhotoStory](https://github.com/awsrmmustansarjavaid/CharlieMJ-PhotoStory)                           | Create photo grids and Instagram-style stories offline                 |
|     6 | **Charlie MJ Video Downloader**             | [charlie-mj-video-downloader](https://github.com/awsrmmustansarjavaid/charlie-mj-video-downloader)             | Download, convert, manage, and organize supported media                |
|     7 | **Charlie MJ YouTube Toolkit** | [charlie-mj-youtube-toolkit](https://github.com/awsrmmustansarjavaid/charlie-mj-youtube-toolkit) | A YouTube learning workspace for video analysis, subtitles, transcripts, vocabulary, notes, and study exports |
|     8 | **Charlie MJ Tool Archive** | [charlie-mj-tool-archive](https://github.com/awsrmmustansarjavaid/charlie-mj-tool-archive) | Organize, search, manage, and locally store useful tools, websites, AI services, resources, and bookmarks |
| 9     | **Charlie MJ Music** | [charlie-mj-music](https://github.com/awsrmmustansarjavaid/charlie-mj-music) | Turn feelings, relationships, and special moments into personalized song, poetry, quote, caption, and romantic-content discoveries |
| 10 | **Charlie MJ OCR & Language Studio** | [charliemj-ocr-studio](https://github.com/awsrmmustansarjavaid/charliemj-ocr-studio) | Extract text from screenshots, organize bilingual vocabulary, create language-learning notes, and process OCR locally with optional Ollama AI |
| 11 | **Charlie MJ Language** | [charlie-mj-language](https://github.com/awsrmmustansarjavaid/charlie-mj-language) | A YouTube language-learning Chrome extension for subtitles, bilingual transcripts, vocabulary extraction, translation, dictionaries, notes, bookmarks, and personalized study libraries |


---

# 🎯 About These Niche Projects

I enjoy building **small, focused applications around problems that I personally face**.

Instead of building another generic application, I prefer identifying a specific repetitive or inconvenient task and creating a lightweight tool around it.

This collection represents that approach:

**Personal Problem → Niche Idea → Focused Tool → Practical Solution**

Most of these projects are designed around:

- 🎯 One specific problem
- 🧩 A focused feature set
- 💻 Simple and practical interfaces
- ⚡ Lightweight architecture where possible
- 🔒 Local/offline processing where practical
- 🌐 Browser-based or Windows-based workflows
- 🛠️ Open-source development
- 📚 Learning through real projects

---

## ⭐ Explore the Projects

# 1. ⏳ Charlie MJ Chrono Journey

### 🔗 Repository

[**charlie-mj-chrono-journey**](https://github.com/awsrmmustansarjavaid/charlie-mj-chrono-journey)

### 💡 What Is It?

**Charlie MJ Chrono Journey** is a niche time-tracking web app that calculates the exact amount of time between a selected date/time and the current moment — or between a current moment and a future date.

Instead of displaying only a simple countdown, it presents the journey using:

**Years → Months → Days → Hours → Minutes → Seconds**

The application was created to make important personal dates and time periods easier to visualize.

### ✨ Main Features

- 🕐 Live current time
- 📅 Calendar interface
- 🌍 Timezone selection
- ⏳ Time since / time until calculations
- 📆 Calendar-accurate date calculations
- 🗓️ Leap-year and month-length awareness
- 🔢 Total days, hours, minutes and seconds
- 🌐 Internet-verified time
- ❤️ Multiple saved time journeys
- ⭐ Favorite journeys
- ✏️ Edit and duplicate journeys
- 💾 Local browser storage
- 📤 JSON import/export
- 🌙 Dark and light themes
- 📱 Responsive design

### 🛠️ Technologies

- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap 5
- Bootstrap Icons
- `Date`
- `Intl.DateTimeFormat`
- `localStorage`
- `fetch()`
- Public time API

### ⚙️ How It Works

The user creates a time journey by selecting a date, time, title, and timezone.

The application then:

```text
Selected Date/Time
       ↓
Timezone Processing
       ↓
Current Internet Time
       ↓
Calendar-Aware Calculation
       ↓
Years / Months / Days / Hours / Minutes / Seconds
       ↓
Live Updating Counter
```

Everything runs on the client side, with journeys stored locally in the browser.

---

# 2. 🎬 Charlie MJ Drive Media Downloader

### 🔗 Repository

[**charlie-MJ-drive-media-downloader**](https://github.com/awsrmmustansarjavaid/charlie-MJ-drive-media-downloader)

### 💡 What Is It?

**Charlie MJ Drive Media Downloader** is a Chrome/Chromium extension created to simplify a repetitive workflow for saving **Google Drive media that the user is already authorized to access**.

Instead of manually opening DevTools, searching network requests, identifying media streams, cleaning URLs, and opening them individually, the extension automatically detects relevant media requests and presents usable streams.

### ✨ Main Features

- 🎥 Automatic media detection
- 🎵 Video/audio stream detection
- 📊 File-size detection
- 🏷️ Quality/format labels
- 🧹 Automatic byte-range parameter cleanup
- ♻️ Automatic deduplication
- 📐 Sort streams by size
- ▶️ One-click stream opening
- 🪶 Lightweight extension
- 🔒 No external server
- 🔒 No analytics
- 💻 Runs directly inside the browser

### 🛠️ Technologies

- Chrome Extension Manifest V3
- Vanilla JavaScript
- HTML5
- CSS3
- `chrome.webRequest`
- `chrome.tabs`
- Manifest V3 Service Worker
- Chrome Runtime Messaging

### ⚙️ How It Works

```text
Google Drive Video
       ↓
Browser Plays Media
       ↓
videoplayback Requests
       ↓
chrome.webRequest
       ↓
Detect Video / Audio
       ↓
Read Media Metadata
       ↓
Remove Chunk Parameters
       ↓
Deduplicate Streams
       ↓
Popup Displays Results
       ↓
Open Stream
       ↓
Browser Native Player
```

The extension does **not** bypass authentication or access controls. It is intended for media the user's browser session is already authorized to access.

---

# 3. 🔎 Charlie MJ Medium Profile Article Search Engine

### 🔗 Repository

[**medium-article-search-engine**](https://github.com/awsrmmustansarjavaid/medium-article-search-engine)

### 💡 What Is It?

**Charlie MJ Medium Profile Article Search Engine** is a lightweight browser-based search tool for finding articles inside a **public Medium profile**.

The idea came from a simple problem: finding a particular topic or keyword across a Medium profile can require manually browsing through articles.

This tool turns that process into a focused search experience.

### ✨ Main Features

- 🔍 Search article titles and content
- 🏷️ Multiple additional keywords
- 🟨 Keyword highlighting
- 🖼️ Article cover images
- ↕️ Newest/oldest/title sorting
- 🔲 Grid view
- 📋 List view
- 🌙 Dark mode
- 💾 Remember last-used profile
- 📱 Responsive interface
- ⚡ No backend
- 🪶 No installation required

### 🛠️ Technologies

- HTML5
- CSS3
- Vanilla JavaScript ES6+
- Bootstrap 5
- Bootstrap Icons
- Medium RSS
- RSS2JSON API
- `fetch()`
- DOM API
- `localStorage`

### ⚙️ How It Works

```text
Medium Profile URL
       ↓
Public Medium RSS Feed
       ↓
RSS2JSON Bridge
       ↓
JSON Article Data
       ↓
Client-Side Search
       ↓
Keyword Filtering
       ↓
Keyword Highlighting
       ↓
Sorting / Grid / List
       ↓
Article Results
```

The application is intentionally client-side and has no database or custom backend. The RSS-to-JSON bridge handles the browser-side CORS limitation.

### 🎯 Why This Is a Niche Tool

It focuses on one very specific task:

> **Finding information inside public Medium profiles quickly.**

That makes it a good example of turning a small personal inconvenience into a dedicated utility.

---

# 4. 📸 Charlie MJ PhotoStory

### 🔗 Repository

[**CharlieMJ-PhotoStory**](https://github.com/awsrmmustansarjavaid/CharlieMJ-PhotoStory)

### 💡 What Is It?

**Charlie MJ PhotoStory** is an offline photo-grid and story creation tool designed around creating social-media-style photo stories.

It allows multiple photographs to be combined into layouts such as **2×2 and 2×3 grids**, edited individually, decorated with text, and exported as a high-quality **1080×1920 9:16 JPG**.

### ✨ Main Features

- 🖼️ 2×2 photo grid
- 🖼️ 2×3 photo grid
- ➕ Add photos
- 🔄 Replace photos
- 🗑️ Remove photos
- 🖱️ Drag & drop
- 🔍 Zoom
- ✋ Pan
- 🔄 Rotate
- ↔️ Flip
- ✍️ Text tool
- 🔤 Font customization
- 🎨 Text color and styling
- ☀️ Brightness
- 🌓 Contrast
- 🌈 Saturation
- ⚫ Grayscale
- ↩️ Undo/redo
- 💾 Save/reopen projects
- 📤 HD JPG export
- 🔒 Fully offline

### 🛠️ Technologies

The project has two main forms:

**Web Application**

- HTML
- CSS
- JavaScript

**Windows Application**

- Tauri
- Web frontend
- Native Windows packaging

The repository also uses GitHub Actions to build the Windows application.

### ⚙️ How It Works

```text
Select Photos
      ↓
Choose Grid Layout
      ↓
Position / Crop / Zoom / Rotate
      ↓
Apply Image Adjustments
      ↓
Add Text
      ↓
Preview Story
      ↓
Render Canvas
      ↓
Export 1080×1920 JPG
```

The application is designed around **privacy and offline usage**: photos do not need to be uploaded to a server.

---

# 5. 🎬 Charlie MJ Video Downloader

### 🔗 Repository

[**charlie-mj-video-downloader**](https://github.com/awsrmmustansarjavaid/charlie-mj-video-downloader)

### 💡 What Is It?

**Charlie MJ Video Downloader** is a Windows desktop media download manager with two major workflows:

1. **Direct/Web Download** using `yt-dlp`
2. **Browser Media Capture** using a Chrome/Edge extension and native messaging

It combines downloading, media processing, format selection, queue management, audio/video handling, and FFmpeg-based merging into one desktop application.

### ✨ Main Features

#### 🎥 Video & Audio

- Video downloads
- Multiple quality levels
- Best-quality profiles
- Video-only downloads
- Audio-only downloads
- MP4/WebM/MKV
- MP3/M4A/WAV/FLAC/OPUS
- Playlist/batch architecture
- Subtitle support
- Thumbnail support
- Chapter/metadata support
- Codec/FPS information

#### 🌐 Browser Capture

- Chrome Manifest V3
- Edge-compatible architecture
- Browser page capture
- Media stream detection
- Google Drive `videoplayback` detection
- Video/audio pairing
- Stream deduplication
- Download & Combine
- Watch Browser mode

#### 📥 Download Manager

- Queue
- Priority
- Pause/resume
- Cancellation
- Retry architecture
- Concurrent downloads
- Progress reporting
- Speed reporting
- Download history foundation
- SQLite foundation
- Temporary-file cleanup
- Download verification

### 🛠️ Technologies

- Tauri 2
- Rust
- React
- TypeScript
- SQLite
- FFmpeg
- ffprobe
- yt-dlp
- Chrome/Edge Manifest V3
- Native Messaging
- NSIS
- GitHub Actions

### ⚙️ How It Works

```text
                 ┌───────────────┐
                 │ Chrome / Edge │
                 └───────┬───────┘
                         ↓
                 Native Messaging
                         ↓
                  Native Host
                         ↓
        ┌─────────────────────────┐
        │ Charlie MJ Desktop App │
        │   Tauri + React + Rust  │
        └────────────┬────────────┘
                     ↓
              ┌──────┴──────┐
              ↓             ↓
            yt-dlp      Browser Capture
              ↓             ↓
              └──────┬──────┘
                     ↓
               Video / Audio
                     ↓
                  FFmpeg
                     ↓
                 ffprobe
                     ↓
                Final Media
```

The desktop application performs the heavy download and media-processing work, while the browser extension provides browser-side stream information when required.

---

# 6. 🖼️ Charlie MJ Instagram Post Editor

### 🔗 Repository

[**charlie-mj-instagram-post-editor**](https://github.com/awsrmmustansarjavaid/charlie-mj-instagram-post-editor)

### 💡 What Is It?

**Charlie MJ Instagram Post Editor** is a **portable Windows desktop image editor** designed to quickly convert photos and Instagram Stories into properly sized Instagram posts without unnecessary cropping, distortion, or quality loss.

It processes images **locally and offline**, keeping the user's original files unchanged.

### ✨ Main Features

* 🖼️ Instagram Post & Story conversion
* 📐 Portrait, Square, Landscape, Story & Reel formats
* ✂️ Smart Crop & manual positioning
* 🌫️ Blur, solid, gradient & mirror backgrounds
* 🔍 Zoom, crop, rotate & flip
* 🎨 Color adjustments & built-in filters
* ✍️ Text & stickers
* 👀 Instagram Feed & Profile Grid preview
* ↩️ Undo & Redo
* 📤 JPEG, PNG & WebP export
* 🧹 Automatic EXIF/GPS metadata removal
* 📦 Portable single `.exe`
* 🔒 Local & private image processing
* 🌐 Works completely offline

### 🛠️ Technologies

* Electron
* HTML5
* CSS3
* Vanilla JavaScript
* Canvas 2D API
* electron-builder

### 🎯 Problem → Solution

**Problem:** Converting images between Instagram formats can result in unwanted cropping, distortion, or unnecessary quality loss.

**Solution:** A lightweight, **Instagram-focused offline editor** that prepares images for different Instagram formats while giving the user control over cropping, positioning, backgrounds, and export quality.

---

# 7. 🎬 Charlie MJ YouTube Toolkit

### 🔗 Repository

[**charlie-mj-youtube-toolkit**](https://github.com/awsrmmustansarjavaid/charlie-mj-youtube-toolkit)

### 💡 What Is It?

**Charlie MJ YouTube Toolkit** is a niche, browser-based **YouTube learning workspace** designed especially for people who use YouTube for language learning, study, research, and personal note-taking.

Instead of using separate tools for YouTube URLs, thumbnails, subtitles, transcripts, vocabulary, notes, and exports, the project brings these activities together inside one lightweight web application.

The project is designed as a **static GitHub Pages application**, so it does not require a backend server, database, user account, or build pipeline.

### ✨ Main Features

* 🎬 YouTube URL analyzer for standard, Shorts, youtu.be, and embed URLs
* ▶️ Embedded YouTube video player
* 🖼️ YouTube thumbnail preview and download tools
* 📝 Subtitle and transcript loading
* 📄 SRT, VTT, TXT, CSV, and JSON text/subtitle support
* 🧹 Transcript cleanup and organization
* 🔎 Transcript search
* ⏱️ Timestamp-based transcript navigation
* 📋 One-click transcript copying
* 📚 Vocabulary extraction from transcript text
* 🌐 Source and target language organization
* 🗒️ Personal study notes
* 💾 Local browser session storage
* 📤 TXT, Markdown, JSON, and CSV exports
* 📖 Distraction-free Reading Mode
* 📊 Live session, vocabulary, and transcript counters
* 🌙 Light and dark themes
* 📱 Responsive Bootstrap 5 interface
* 🔐 No account or login required

### 🧠 Learning Workflow

The toolkit is designed around a simple learning workflow:

```text
YouTube Video
      ↓
Video / Thumbnail Analysis
      ↓
Subtitle / Transcript
      ↓
Transcript Cleanup
      ↓
Search & Timestamp Navigation
      ↓
Vocabulary Extraction
      ↓
Personal Notes
      ↓
Local Session Storage
      ↓
TXT / Markdown / JSON / CSV Export
```

This makes the project useful as a small **YouTube-based language-learning workspace** rather than just another YouTube utility.

### 🛠️ Technologies

* HTML5
* CSS3
* JavaScript ES Modules
* Bootstrap 5.3
* Bootstrap responsive grid and utilities
* YouTube IFrame Player API
* Browser Clipboard API
* File API
* Blob and download APIs
* `localStorage`
* SVG assets
* GitHub Pages

### ⚙️ How It Works

The user starts by providing a YouTube video URL or loading compatible subtitle/transcript content.

The application then processes the content directly in the browser:

```text
YouTube URL
     ↓
Video ID Detection
     ↓
Embedded YouTube Player
     ↓
Transcript / Subtitle Input
     ↓
Cleanup & Organization
     ↓
Vocabulary + Notes
     ↓
Save Study Session
     ↓
Export Learning Data
```

The application keeps personal study data inside the browser using `localStorage`, while exported files are generated locally.

### 🎯 Project Concept

The main idea behind **Charlie MJ YouTube Toolkit** is to turn ordinary YouTube videos into a more organized learning environment.

It combines several small learning utilities into one focused workspace where users can **watch → read → search → collect vocabulary → take notes → save → export** without constantly switching between different websites.


---

# 8. 🗂️ Charlie MJ Tool Archive

### 🔗 Repository

**charlie-mj-tool-archive**

### 💡 What Is It?

**Charlie MJ Tool Archive** is a local-first Chrome Extension designed to organize a large collection of online tools, websites, AI services, developer resources, learning resources, media tools, dictionaries, job sites, personal projects, and bookmarks in one searchable dashboard.

Instead of relying on a traditional browser bookmark structure, the extension provides a visual tool library with categories, search, favorites, recently used tools, filtering, detailed tool information, and personal management features.

The current release includes a bundled library of **290 unique tools** and is built with **Chrome Manifest V3**.

### ✨ Main Features

* 🗂️ Continuously expanding tool library
* 🔎 Search by name, URL, category, description, notes, and tags
* 📁 Category-based organization
* ⭐ Favorites
* 🕐 Recently used tools
* 🆕 Recently added sorting
* 🔖 Type filtering
* 🔗 Open tools in new Chrome tabs
* 🚀 Open all visible tools
* ℹ️ Detailed tool information
* ✏️ Edit and update tools
* ➕ Add new tools
* 📋 Duplicate URL protection
* 🗑️ Delete tools
* 📥 Import Chrome bookmarks HTML
* 📥 Import JSON
* 📤 Export JSON backups
* 📊 Export CSV
* ♻️ Restore the default tool library
* 🌙 Light / Dark / System themes
* 📐 Comfortable / Compact grid layouts
* 💾 Local-first browser storage
* 🖱️ Chrome context-menu integration
* ⌨️ Keyboard shortcut support
* 🌐 Responsive layout
* 🔄 Automatic default-library migration
* 🖼️ Favicon support with fallback initials

The repository documents that the extension stores its core library locally and does not require a backend or account.

### 🛠️ Technologies

* HTML5
* CSS3
* JavaScript
* Chrome Extension Manifest V3
* Chrome Extension APIs
* `chrome.storage.local`
* Chrome Context Menus API
* Chrome Commands API
* JSON
* CSV
* Browser Local Storage
* Responsive CSS

### ⚙️ How It Works

The extension maintains a default catalog of tools while allowing the user to create and manage their own local collection.

The basic workflow is:

```text
Online Tools / Websites / Resources

             ↓

      Default Tool Library

             ↓

     Chrome Extension

             ↓

   Category Organization

             ↓

 Search / Filter / Favorites

             ↓

 Add / Edit / Delete / Duplicate

             ↓

 Local Chrome Storage

             ↓

 JSON / CSV Export & Backup
```

The project separates the **version-controlled default tool collection** from the user's personal local additions. The bundled catalog is maintained through `default-tools.json`, while user-specific changes can be stored in `chrome.storage.local`.

### 📦 Project Structure

```text
charlie-mj-tool-archive/
├── manifest.json
├── README.md
├── LICENSE
├── data/
│   └── default-tools.json
├── docs/
│   └── DATA-FORMAT.md
├── icons/
│   ├── logo.svg
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── src/
    ├── background.js
    ├── dashboard.html
    ├── dashboard.js
    └── styles.css
```

### 🎯 Purpose

The main purpose of **Charlie MJ Tool Archive** is to turn a large and messy collection of useful websites and online resources into a personal, searchable, categorized digital tool library.

It is particularly useful for keeping frequently used **AI tools, developer tools, DevOps resources, media tools, learning websites, dictionaries, utilities, and other online resources** organized in one place.

---

# 9. 🎵 Charlie MJ Music

### 🔗 Repository

[**charlie-mj-music**](https://github.com/awsrmmustansarjavaid/charlie-mj-music)

### 💡 What Is It?

**Charlie MJ Music** is a niche romantic music-discovery web application designed for couples, lovers, married partners, and anyone who struggles to find the **right song, poetry, quote, or caption for a special moment**.

Instead of requiring users to already know the song or search keywords, the application allows them to describe:

* ❤️ What they are feeling
* 💑 Their relationship
* 📅 Their special occasion
* 📝 Their story or situation
* 📸 An optional photo
* 🎵 Their preferred music style

The application then transforms that emotional context into **music and romantic-content discovery searches**.

### ✨ Main Features

* ❤️ Create personalized love moments
* 🎵 Discover songs based on feelings and situations
* ▶️ YouTube music discovery
* 🟢 Spotify music discovery
* 📖 Romantic poetry discovery
* 💬 Wise love quote discovery
* 📱 Instagram/social caption discovery
* 💌 Romantic message and love-letter ideas
* 🧠 Feeling-to-search-keyword translation
* 💑 Couple and relationship-focused discovery
* 🎂 Birthday moments
* 💍 Marriage anniversaries
* 💒 Wedding and first-dance moments
* 💕 Proposal moments
* 🌹 First-love moments
* 🌍 Long-distance relationship moments
* 💔 Missing-someone moments
* 🤝 Relationship healing and reconnection
* 🥰 Gratitude and appreciation moments
* ♾️ Forever-love and soulmate themes
* 📸 Photo-based romantic moments
* 🎼 Music-style selection
* 🎙️ Browser-based song recognition support
* 💾 Local browser memory storage
* 📤 Export personal memories
* 🌙 Romantic dark/light themes
* ✨ Animated romantic UI
* 📱 Fully responsive design
* 🔒 Privacy-first client-side architecture
* 🚫 No backend required
* 🚫 No database required
* 🚫 No GitHub Actions required

### 🛠️ Technologies

* HTML5
* CSS3
* JavaScript ES6+
* Bootstrap 5
* Bootstrap Icons
* Web APIs
* `localStorage`
* `IndexedDB` where applicable
* Browser microphone APIs
* YouTube search
* Spotify browser integration
* Client-side search generation
* GitHub Pages

### ⚙️ How It Works

The user creates a **Moment** by describing their feelings, relationship, event, and situation.

The application then converts that information into meaningful discovery concepts.

```text
User's Feelings + Story
          ↓
      Love Moment
          ↓
   Feeling Analysis
          ↓
  Romantic Themes
          ↓
   Search Keywords
          ↓
 ┌────────┬─────────┬─────────┬─────────┐
 │ YouTube│ Spotify │ Poetry  │ Quotes  │
 └────────┴─────────┴─────────┴─────────┘
          ↓
     Discovery Pack
          ↓
 Songs + Poetry + Quotes + Captions
          ↓
      Save Your Moment
```

### 💕 Example

A user might write:

> *“I'm away from my wife because of work. I miss her every day and want a song that expresses how much I love her and how much I want to come home.”*

Instead of expecting the user to know what to search for, **Charlie MJ Music** can derive concepts such as:

```text
Long Distance Love
Missing You
Married Love
Coming Home
Deep Love
Reunion
Emotional Romantic Song
Hopeful Love
```

These concepts can then be used to discover:

```text
🎵 Songs
📖 Poetry
💬 Quotes
📱 Captions
💌 Romantic Messages
```

### 🔐 Privacy & Architecture

Charlie MJ Music is designed as a **static, client-side application**.

```text
Browser
   ↓
Charlie MJ Music
   ↓
Local Processing
   ↓
External Search Services
```

There is no application backend storing users' personal relationship information.

Personal moments, memories, and preferences can remain inside the user's browser.

The project is designed specifically for **GitHub Pages**, without requiring:

* Node.js backend
* Python backend
* Database server
* VPS
* GitHub Actions
* Private server API

### 🎯 Purpose

The main idea behind **Charlie MJ Music** is simple:

> **Sometimes people know exactly what they feel, but they don't know what song describes it.**

Charlie MJ Music tries to bridge that gap by turning **emotions and personal moments into meaningful music and romantic-content discovery**.

---

# 10. 🧠 Charlie MJ OCR & Language Studio

### 🔗 Repository

[**charliemj-ocr-studio**](https://github.com/awsrmmustansarjavaid/charliemj-ocr-studio)

### 💡 What Is It?

**Charlie MJ OCR & Language Studio** is a portable Windows desktop application designed for OCR extraction, multilingual text recognition, vocabulary organization, and language learning.

It transforms screenshots, flashcards, scanned learning materials, and images into structured, editable language-learning notes.

The application follows an important principle:

**Complete OCR Extraction First → Intelligent Organization Second.**

Instead of limiting extraction to an expected number of words or vocabulary entries, it processes the complete image first and then organizes the recognized content into structured text, bilingual vocabulary, headings, and learning materials.

It also provides optional local AI integration through Ollama, allowing users to organize vocabulary, improve extracted notes, and access AI-powered language-learning assistance without relying on cloud AI services.

### ✨ Main Features

- 🧠 **Three OCR Modes** — Smart, Raw, and AI Smart.
- 🔎 **Complete Image OCR** — Extract visible text without predefined vocabulary-count limits.
- 🌍 **Multilingual OCR** — English, Turkish, Urdu, Arabic, Persian, and additional installable languages.
- 🎚️ **Three Processing Levels** — Fast, Balanced, and Deep.
- ♾️ **Unlimited Image Queue** — Add, reorder, remove, undo, and reprocess multiple images.
- ✂️ **Advanced Select Area** — Zoom, fit, pan, rotate, crop, and select multiple OCR regions.
- 📚 **Bilingual Vocabulary Extraction** — Recognize and organize vocabulary from bilingual screenshots and tables.
- 📝 **Four-Panel Text Editor** — Organize extracted content into editable sections.
- 🔍 **Find & Replace** — Search and modify extracted text.
- 🔠 **Text Organization** — Headings, vocabulary bullets, sorting, and duplicate removal.
- 🤖 **Local AI Integration** — Optional Ollama-powered AI processing.
- 🧩 **Specialized Local AI Agents** — OCR Structure, Vocabulary, and Study Tutor.
- 🛡️ **AI Lossless Safety** — Preserve vocabulary pairs omitted during AI formatting.
- 📤 **Multiple Export Formats** — Markdown, TXT, HTML, DOCX, and CSV.
- 💾 **Local Processing** — OCR operates locally without requiring a cloud OCR API.
- 💻 **Portable Windows Application** — Run without a traditional installer or administrator privileges.
- 🔄 **Automatic Language Discovery** — Detect installed Tesseract language packs and install additional official language packs when needed.
- 🧪 **Automated Testing** — Regression tests, portable EXE startup checks, and build verification.
- 🔐 **Privacy-Focused Architecture** — Optional AI processing through local Ollama.

### 🛠️ Technologies

- Python
- Tesseract OCR
- Pillow
- CustomTkinter / Tkinter
- Ollama
- HTML / Markdown / CSV / DOCX export support
- PyInstaller
- GitHub Actions
- JSON
- Local File Storage

### ⚙️ How It Works

The application processes images through a complete OCR and organization pipeline:

```text
Screenshots / Flashcards / Images
              ↓
       Image Import System
              ↓
       OCR Mode Selection
        ↙      ↓       ↘
      Raw    Smart    AI Smart
        ↘      ↓       ↙
       Complete OCR Extraction
              ↓
    Structure & Vocabulary Detection
              ↓
       Bilingual Organization
              ↓
       Optional Local Ollama AI
              ↓
        Four-Panel Text Editor
              ↓
     Review / Edit / Organize Notes
              ↓
     Markdown / TXT / HTML / DOCX / CSV
```

### 🌐 Language Learning Workflow

The application is particularly useful for people learning languages through screenshots, online learning materials, vocabulary lists, bilingual dictionaries, and flashcards.

Users can extract vocabulary from images, organize original and translated words, edit the results, remove duplicates, and export everything into reusable study materials.

### 🤖 Optional Local AI Integration

The application supports optional local AI through **Ollama**.

Users can connect a locally installed Ollama model to access AI-powered formatting, vocabulary organization, OCR structure assistance, and study-tutor functionality.

AI integration is optional. The core OCR engine and text editor continue working independently without Ollama.

### 🔒 Privacy & Portability

- OCR processing runs locally.
- No cloud OCR API is required.
- Optional AI communicates with local Ollama.
- No administrator installation is required.
- No automatic startup entry is required.
- User settings are stored alongside the portable application.
- Additional OCR language packs can be installed when explicitly requested.

**Charlie MJ OCR & Language Studio** is designed to provide a lightweight, portable, privacy-focused environment for converting images into organized language-learning resources.

---

# 11. 🌍 Charlie MJ Language

### 🔗 Repository

[**charlie-mj-language**](https://github.com/awsrmmustansarjavaid/charlie-mj-language)

### 💡 What Is It?

**Charlie MJ Language** is a lightweight, local-first Chrome extension designed to transform YouTube into an interactive language-learning environment.

It helps users learn languages naturally while watching YouTube videos by combining subtitles, original and translated transcripts, vocabulary extraction, sentence translation, dictionary lookups, playback controls, personal notes, and learning-library management.

Instead of switching between multiple websites and applications, users can watch videos, understand unfamiliar words, save useful sentences, organize vocabulary, and review their learning materials directly within the YouTube experience.

The extension follows a complete learning workflow:

**Watch → Understand → Capture → Organize → Review → Continue**

### ✨ Main Features

- 🎬 **YouTube Learning Integration** — Interactive language-learning tools directly within YouTube.
- 📝 **Dual Subtitle Display** — Display original and translated subtitles together.
- 🌍 **Multilingual Caption Support** — Discover available manual and auto-generated YouTube caption tracks.
- ⚡ **Fast Transcript Extraction** — Quickly retrieve available YouTube transcripts using the existing transcript engine.
- 📜 **Timestamped Transcript Window** — View complete transcripts with video timeline synchronization.
- 🔄 **Real-Time Transcript Highlighting** — Highlight the currently spoken sentence during video playback.
- 🌐 **Caption Language Discovery** — Discover available caption languages when YouTube exposes them.
- 🔤 **Interactive Word Learning** — Select words to access translation and dictionary information.
- 📖 **Dictionary Integration** — Access word meanings, translations, and available language information.
- 🧩 **Part-of-Speech Highlighting** — Visually distinguish vocabulary and grammatical information where available.
- 💬 **Sentence Learning** — Save, translate, and study complete sentences.
- 🔁 **Sentence Replay** — Replay sentences, use looping, A/B replay, and playback-speed controls where available.
- 📚 **Vocabulary Library** — Save, organize, search, and review learned vocabulary.
- 📌 **Timeline Bookmarks** — Save important moments from YouTube videos.
- ❤️ **Watch Later** — Save videos for future learning sessions.
- 📝 **Note Lab** — Create and manage personal learning notes.
- 📂 **Learning Dashboard** — Manage vocabulary, sentences, bookmarks, notes, and saved learning materials.
- 🔍 **Search & Filtering** — Find saved learning materials using supported library filters.
- 📤 **Import & Export** — Export transcripts and supported learning data for external use.
- 🎯 **Focus Mode** — Customize the learning experience and reduce unnecessary distractions.
- 🛠️ **Customizable Learning Toolbar** — Configure toolbar position, dimensions, scale, arrangement, and visibility.
- 🖥️ **Resizable Transcript Window** — Drag, resize, dock, pin, minimize, maximize, and customize the transcript interface.
- 🎨 **Advanced Subtitle Customization** — Independently configure original and translated subtitle appearance, typography, dimensions, wrapping, and opacity.
- ⚙️ **Professional Settings Dashboard** — Organized settings with responsive grid layouts, grouped controls, and live previews.
- 🔔 **Custom Success Notifications** — Configure notification placement and interface feedback.
- 💾 **Local-First Storage** — Keep settings and saved learning materials in Chrome local storage.
- 🧩 **Modular Transcript Service Engine** — Separate transcript-service configuration designed to support future providers without replacing the existing stable fetching system.

### 🤖 Optional Local AI & Future Integrations

The project is designed to support additional language-learning capabilities without replacing its existing transcript and learning systems.

Potential extensions include:

- Local AI integration through Ollama.
- Word-by-word vocabulary translation.
- Sentence-by-sentence translation.
- AI-assisted vocabulary organization.
- Context-aware language explanations.
- Additional modular transcript providers.

These are planned expansion possibilities, not claims that every integration is already available in the current release.

### 🛠️ Technologies

- JavaScript (ES6+)
- HTML5
- CSS3
- Chrome Extension Manifest V3
- Chrome Extension APIs
- YouTube Player Integration
- Chrome Storage API
- JSON
- Local Browser Storage
- Modular JavaScript Architecture

### ⚙️ How It Works

Charlie MJ Language integrates its learning tools into the YouTube viewing experience.

```text
       YouTube Video
             ↓
     Video & Caption Detection
             ↓
    Original Caption Extraction
             ↓
   Available Caption Languages
             ↓
     Original + Translated
          Subtitles
             ↓
      Timestamped Transcript
             ↓
     Real-Time Synchronization
             ↓
       Interactive Learning
        ↙      ↓       ↘
    Vocabulary Sentence  Dictionary
        ↘      ↓       ↙
       Personal Learning Library
             ↓
    Notes / Bookmarks / Watch Later
             ↓
       Review & Export
```

### 📚 Personal Learning Library

The extension provides a centralized environment for managing language-learning materials.

Users can save and organize:

- Individual vocabulary words.
- Translated words and their meanings.
- Complete sentences.
- Video-linked learning records.
- Timestamped bookmarks.
- Personal notes.
- Videos saved for later.

Saved materials remain available through the extension's local learning-library workflows.

### 🎨 Customization & User Experience

Charlie MJ Language includes a customizable interface designed around individual learning preferences.

Users can configure:

- Toolbar position, size, scale, and visibility.
- Original and translated subtitle positions.
- Subtitle typography and line spacing.
- Subtitle background, opacity, and dimensions.
- Transcript window size and positioning.
- Live transcript highlighting styles.
- Automatic scrolling and synchronization behavior.
- Success notification positions.
- Learning-interface settings.

The settings dashboard uses a professional dark interface, responsive two-column layouts, grouped controls, and subtle hover effects.

### 🔒 Privacy & Storage

- Local-first extension architecture.
- Learning records and settings stored through Chrome local storage.
- No mandatory cloud OCR or AI service.
- Optional external translation and dictionary providers.
- Exportable learning data.
- Modular architecture for future integrations.

Some translation and dictionary features communicate with external providers when users request those services. Their availability depends on the configured provider.

### 📦 Installation

1. Download or clone the GitHub repository.
2. Open Google Chrome.
3. Navigate to `chrome://extensions`.
4. Enable Developer Mode.
5. Select **Load unpacked**.
6. Choose the extracted project folder containing `manifest.json`.
7. Open or refresh a YouTube video.

**Charlie MJ Language** turns everyday YouTube watching into a structured, interactive, and personalized language-learning experience.

---

# 🧩 What Connects These Projects?

Although these projects solve completely different problems, they share the same development philosophy.

### 🎯 Problem-Focused Development

Each project starts with a practical problem rather than trying to build a large platform.

### 🛠️ Build the Smallest Useful Tool

The goal is to create a focused application that solves the problem without unnecessary complexity.

### 💻 Different Technologies for Different Problems

I use the technology that fits the problem:

- **HTML/CSS/JavaScript** for lightweight browser applications
- **Bootstrap** for responsive interfaces
- **Chrome Manifest V3** for browser automation
- **RSS/API integration** for data-driven tools
- **Tauri + Rust** for lightweight Windows applications
- **React + TypeScript** for richer desktop interfaces
- **FFmpeg** for media processing
- **yt-dlp** for supported web media extraction
- **SQLite** for local application data
- **GitHub Actions** for automation and builds

### 🔐 Privacy & Local Processing

Where practical, these projects avoid unnecessary servers and accounts.

Several applications are designed to work directly in the browser or locally on the user's computer.

### 📚 Learning Through Real Problems

These projects also serve as practical learning projects where I can experiment with:

- Frontend development
- JavaScript
- Browser APIs
- Web extensions
- APIs and RSS
- Client-side storage
- Desktop application development
- Rust
- React
- TypeScript
- Media processing
- GitHub Actions
- Open-source development

---

# 🚀 My Niche Project Philosophy

> **I don't build projects only to demonstrate technology. I build small, focused tools around problems I actually experience.**

That makes each project a combination of:

**Personal Problem + Niche Idea + Technology + Practical Solution**

These projects are part of my ongoing **Charlie MJ Niche Projects** collection and represent my approach to learning, experimenting, and building useful software.

---

# 📂 Projects at a Glance

### ⏳ Time

**Charlie MJ Chrono Journey**  
A personal time-journey and countdown tool.

### 🎬 Drive Media

**Charlie MJ Drive Media Downloader**  
A browser extension for simplifying authorized Google Drive media workflows.

### 🔎 Articles

**Charlie MJ Medium Profile Article Search Engine**  
A focused search engine for public Medium profiles.

### 📸 Photos

**Charlie MJ PhotoStory**  
An offline photo-grid and story creation tool.

### 🎥 Video

**Charlie MJ Video Downloader**  
A Windows media downloader and management application.

---

# 👨‍💻 Author

**Raja Muhammad Mustansar Javaid**

- GitHub: [awsrmmustansarjavaid](https://github.com/awsrmmustansarjavaid)
- Focus: DevOps, Cloud, Automation, Web Applications, Desktop Tools & Open Source

---

# 📜 License

Each project has its own repository, license, documentation, and usage requirements. Please check the individual repository before using or redistributing a project.

---


> **Different problems. Different niche solutions. One philosophy: build tools that solve real problems I personally face.**
