# GeniusKids - Educational iPad App Project Plan (v2)

## 1. Goal & Vision
- **Target Audience:** Your 8-year-old gifted son (initial user), scaling to the iOS App Store (Kids Category).
- **Core Experience:** A "Duolingo / Seterra" style interactive learning app. It will feature high-quality interactive diagrams (using SVGs) and integrated quizzes to reinforce learning, complete with audio narration.
- **Content Scope:** Multi-disciplinary. Starting with "The Cell", expanding to "The Periodic Table", "Geography/Maps", "How Things Work", and "Math".

## 2. Technology Stack Recommendation

**Decision:** We will proceed with **React Native with Expo**, with a specific focus on **SVG-based interactive diagrams**.

- **Why React Native + Expo?** Extremely fast iteration, great ecosystem, and easy to deploy. We will use Expo EAS for building and deploying to TestFlight/App Store.
- **Why not Flutter?** Claude rightly pointed out Flutter's custom rendering engine. However, by strictly using SVG (Scalable Vector Graphics) in React Native, we completely solve the "clickable hotspot" scaling problem. SVG paths scale perfectly on any iPad size, making custom rendering less critical here while keeping the web-like rapid development of React Native.

## 3. App Flow & Features

1. **Dashboard (The Path):** A playful home screen showing progress. Topics are locked until previous ones are completed (Progression System).
2. **Interactive Lesson Phase (SVG Diagrams):**
   - High-quality SVG diagrams instead of standard images.
   - Parts of the image are SVG `<path>` elements that act as flawless, perfectly-shaped hotspots.
   - Tapping the "Mitochondria" highlights the SVG path and opens a bottom-sheet.
   - **Audio Narration:** Tapping the card plays a recorded audio clip reading the fact (highly engaging for kids and helps with complex scientific words).
3. **Quiz Phase:**
   - Testing knowledge (e.g., "Tap the Nucleus", Multiple Choice).
4. **Progress Persistence:** We will start with local device storage (`AsyncStorage`) to remember his progress. Later, we can migrate to a backend (like Firebase/Supabase) to sync across devices.
5. **Parent Dashboard & App Store Compliance:** To launch in the App Store's Kids Category, we will include a "Parental Gate" (e.g., "Swipe with three fingers" or "Solve 12 x 4") to access settings or external links. We will disable third-party tracking/analytics to comply with COPPA rules.

## 4. Scalable Data Structure & Remote Content

As Claude suggested, we will design the app to eventually fetch data remotely (e.g., from a cloud server). This means you can add "The Solar System" later without having to submit an app update to Apple!

**Updated Data Schema (v1.0):**
```json
{
  "schema_version": "1.0",
  "module": "Biology",
  "topic": "The Cell",
  "thumbnail": "assets/thumbnails/cell_thumb.png",
  "difficulty": 1,
  "unlocks_after": null,
  "diagram": {
    "type": "svg",
    "url": "https://your-server.com/assets/human_cell.svg"
  },
  "interactive_parts": [
    {
      "svg_path_id": "mitochondria",
      "name": "Mitochondria",
      "fact_kid": "Mitochondria are like tiny power plants inside the cell. They give you energy!",
      "fact_genius": "They produce ATP and actually have their own DNA separate from the cell's nucleus.",
      "audio_url": "https://your-server.com/audio/mitochondria.mp3"
    }
  ],
  "quizzes": [
    {
      "type": "find_on_image",
      "question": "Where is the Nucleus?",
      "target_svg_id": "nucleus"
    }
  ]
}
```

## 5. Blind Spots & Content Strategy

1. **App Store Kids Category:** We will ensure no third-party behavioral analytics are used and strict privacy measures are in place from Day 1.
2. **Image Sourcing:** Instead of PNGs, we will strictly source or commission SVG files. SVGs are resolution-independent.
3. **Content Authoring:** By using SVGs, our workflow is incredibly simple: We just open the SVG in a text editor, find the ID of the organelle (e.g., `id="nucleus"`), and put that exact ID into our JSON. **No coordinate mapping or math required!**

## 6. Next Steps for Execution

If this updated v2 plan looks perfect, we can begin:
1. **Initialize Project:** I will create the React Native Expo app in your workspace.
2. **Install Core Dependencies:** I will install `react-native-svg` and `expo-av` (for audio).
3. **Build the Cell Prototype:** I will set up the first screen using a sample SVG cell diagram to test the clicking and bottom-sheet flow.

## 7. Project Status & Repository

The project has officially started!
- **GitHub Repository:** [https://github.com/mehtaabshaikh-oss/geniuskidsapp](https://github.com/mehtaabshaikh-oss/geniuskidsapp)
- **What's Done (Phase 1 & 2):**
  - Initialized the React Native Expo project.
  - Installed `react-native-svg` and `expo-av`.
  - Created the scalable JSON schema mock data (`assets/data/topics.json`).
  - Created the first interactive SVG component placeholder (`components/PlaceholderCell.tsx`).
