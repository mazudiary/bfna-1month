# Butterfly Never Fly Along — Setup & Customization Guide

Welcome to the private romantic first-month marriage anniversary website created for **Premiii (Lopa)** by **Basharul**.

---

## 📁 Project Structure

```text
/
├── index.html                 # Main website entry point
├── css/
│   └── style.css              # Custom romantic design system
├── js/
│   ├── config.js              # Central content & configuration file (EASY EDITS!)
│   └── app.js                 # Smooth animations, lightbox, particles & audio
└── public/
    ├── images/
    │   ├── first-day/         # Drop your 14 February 2020 photographs here
    │   ├── friendship/        # Drop friendship photographs here
    │   ├── special-moments/   # Drop memorable moments photographs here
    │   ├── wedding/           # Drop your real wedding photographs here
    │   └── anniversary/       # Drop first month marriage photographs here
    ├── videos/
    │   └── anniversary-film.mp4 # Place your Google Flow anniversary video here
    └── audio/
        └── romantic-instrumental.mp3 # Place your background music here (optional)
```

---

## 📸 How to Replace with Your Real Photographs

Simply add your actual photographs into the folders in `public/images/`.

Then open [js/config.js](file:///d:/Basharul/Lopa/One%20Month%20Ani/js/config.js) and point to your file names:

```javascript
// Example in js/config.js
galleryItems: [
    {
        id: 1,
        category: "first-day",
        title: "14 February 2020",
        caption: "Where our friendship began",
        image: "public/images/first-day/our_first_day.jpg", // <--- your real photo
        aspect: "vertical"
    },
    ...
]
```

---

## 🎬 How to Add Your Anniversary Video

1. Copy your Google Flow anniversary video into:
   `public/videos/anniversary-film.mp4`
2. It will automatically load in Section 5 with full playback controls.

---

## 🎵 How to Change Background Music

1. Add your audio file to `public/audio/romantic-instrumental.mp3`.
2. In [js/config.js](file:///d:/Basharul/Lopa/One%20Month%20Ani/js/config.js), update:
   ```javascript
   audioSource: "public/audio/romantic-instrumental.mp3"
   ```
   *(By default, an ambient romantic piano stream is already pre-configured!)*

---

## 🌐 Running Locally

The progressive streaming server is running! You can view it in your browser:
👉 **[http://localhost:3000](http://localhost:3000)**

To run anytime in terminal with full progressive video streaming (HTTP 206 range requests):
```bash
python server.py 3000
```
or double-click [index.html](file:///d:/Basharul/Lopa/One%20Month%20Ani/index.html) to open directly in any browser.
