

# 💖 Buba & Bubibu's Pixel Valentine Adventure

A mobile-first, story-driven pixel-art Valentine's Day interactive game — one continuous vertical world that tells the story of Buba and Bubibu finding their way to each other.

---

## 🗺️ The World Map (One Continuous Vertical Scroll)

### Area 1 — Bubibu's Bedroom at Night
- Cozy pixel bedroom with rain animation outside the window and floating heart particles
- Narrative: *"Another rainy night... Bubibu stares at the ceiling, thinking of Buba."*
- **Interaction:** Tap floating hearts to light up a glowing path leading outside
- Unlocks the garden below

### Area 2 — The Pink Garden
- Pastel trees, drifting petals, glowing heart plants in soft pinks and lavenders
- Narrative: *"Every petal that falls reminds him of her laugh."*
- **Interaction:** Tap pink petals to collect them; collected petals grow glowing heart vines forming a bridge path
- Unlocks the heart bridge

### Area 3 — The Heart Bridge
- A broken bridge over a gap between two cliffs, with stars and soft clouds
- Narrative: *"The distance feels far... but never too far for Buba and Bubibu."*
- **Interaction:** Drag heart-shaped puzzle pieces to repair the bridge; bridge extends into Memory Town
- Unlocks Memory Town

### Area 4 — Memory Town (Image Gallery)
- Cozy pixel village with 12+ small houses lining a lantern-lit road
- Narrative: *"Each house holds a piece of us — same heart, different rooms."*
- **Interaction:** Tap each house to open a photo in a pixel-art frame with a romantic caption (e.g., "Memory unlocked 💕", "She smiled, and his world got brighter")
- Photos of Buba and Bubibu displayed in pixel-bordered modals
- Opening enough houses lights lanterns along the road to the temple
- Placeholder image slots ready for real photos to be uploaded

### Area 5 — Heart Sync Temple
- Glowing temple with ambient light and floating heart symbols
- Narrative: *"Two hearts, miles apart... beating for the same thing."*
- **Interaction:** Two pixel hearts beat at different rhythms; tap to sync them together
- When synced, temple gates open revealing the path to Valentine Hill

### Area 6 — Valentine Hill (Final Reward)
- Pink sunset sky, hilltop picnic setup with blanket, flowers, and a Valentine cake with flickering candles
- Narrative: *"Bubibu made a wish. And it was always the same — Buba, right here, next to him."*
- **Interaction:** Light heart lanterns leading to the picnic, then press "Make Our Wish 💫"
- **Reward:** Sparkle explosion, candle glow intensifies, floating hearts loop, final message: *"Wish saved. Next level: Buba & Bubibu, together. 💖"*

---

## 🎨 Visual Style
- Soft 16-bit pixel art, cozy indie game aesthetic
- Consistent pastel pink, lavender, and warm peach palette across all areas
- Glowing particles, flickering candles, drifting petals as ambient animations
- Rounded pixel UI elements, soft lighting, gentle idle animations
- All areas visually connected via glowing paths, bridges, and lantern trails — no hard scene breaks

---

## 🔊 Audio Experience
- **Background Music:** Bundled soft looping pixel-style ambient music with a sound on/off toggle on the start screen
- **Sound Effects:** Gentle SFX for heart taps, petal collection, bridge completion, lantern lighting, and final celebration (bundled audio files)
- **AI Narration (ElevenLabs):** Soft, warm AI voice reads the story text at each area — a cute voice narrating Bubibu's journey to Buba. Requires backend setup (Supabase/Cloud edge function + ElevenLabs API key). Voice narration toggle included so it can play with or without voice.

---

## 📱 Mobile-First UX
- Vertical scrolling layout, no horizontal scroll
- Large tap targets, one-thumb friendly interactions
- Readable text sizes with typewriter fade-in/fade-out effect
- Visual tap feedback (soft bounce/glow on interaction)
- Smooth scroll transitions between connected areas
- Fully responsive across phone screen sizes
- Start screen with title, "Begin Journey" button, and audio toggle

---

## ⚙️ Technical Approach
- Single-page React app with scroll-based area progression
- CSS pixel-art styling and canvas/SVG animations for particles and effects
- Lightweight assets optimized for mobile performance (smooth 60fps target)
- Supabase Cloud edge function for ElevenLabs TTS narration
- Placeholder image slots in Memory Town ready for photo uploads
- Progressive area unlocking — each puzzle gates the next section

