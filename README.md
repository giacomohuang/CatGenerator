# 🐱 Pixel Cat Generator

A fun, interactive web application that procedurally generates unique, animated pixel art cats with matching synthesized meow sounds. Built entirely with web standard APIs (Canvas & Web Audio) without any external image or audio assets.

## 📸 Screenshots

<div align="center">
  <img src="https://placehold.co/800x500/171717/white?text=Main+Application+UI" alt="Main UI" width="100%" />
</div>

<br/>

<div align="center">
  <img src="https://placehold.co/400x400/fbcfe8/1f2937?text=Calico+Cat" alt="Generated Calico Cat" width="48%" />
  <img src="https://placehold.co/400x400/bfdbfe/1f2937?text=Sphynx+Cat" alt="Generated Sphynx Cat" width="48%" />
</div>

<div align="center">
  <img src="https://placehold.co/400x400/bbf7d0/1f2937?text=Bengal+Cat" alt="Generated Bengal Cat" width="48%" />
  <img src="https://placehold.co/400x400/fef08a/1f2937?text=Tuxedo+Cat" alt="Generated Tuxedo Cat" width="48%" />
</div>

*(Note: These are placeholder images. To add your own screenshots, take a screenshot of the running app, save them to your project folder, and update the image paths in this README.)*

## ✨ Features

### 🎨 Procedural Pixel Art (Canvas API)
Every time you click "Generate", a brand new cat is drawn pixel-by-pixel on an HTML5 Canvas.
* **9 Unique Patterns/Breeds**: Solid, Tuxedo, Tabby, Calico, Siamese, Tortoiseshell, Bengal, Sphynx, and Bicolor.
* **Physical Traits**: Random variations in body type (chunky or slim), ear shapes (pointy, round, folded), and tail shapes (long, short, pointing up).
* **Colors**: Random base colors, accent colors, eye colors, and pastel background colors.

### 🎵 Synthesized Audio (Web Audio API)
Each cat gets its own unique voice, synthesized in real-time using oscillators and filters.
* **5 Voice Types**: 
  * *Classic*: Standard meow.
  * *Kitten*: High-pitched and short.
  * *Trill*: A happy, rolling purr-meow with LFO modulation.
  * *Yowl*: A long, dramatic, low-pitched vocalization.
  * *Chirp*: A short, bird-like sound cats make when watching prey.

### 🎬 Real-time Animations
The cats aren't just static images; they come to life using a `requestAnimationFrame` loop.
* **Breathing**: Smooth, subtle up-and-down body movement.
* **Blinking**: Occasional, natural-looking eye blinks.
* **Tail Wagging**: Physics-inspired pendulum motion for long and upright tails.

### 🛠️ Interactivity
* **Download**: Save your favorite generated cats as `.png` files to your device.
* **Mute Toggle**: Easily turn the meow sounds on or off.

## 💻 Tech Stack

* **Frontend Framework**: React 19 + TypeScript
* **Styling**: Tailwind CSS v4
* **Animations (UI)**: Framer Motion (`motion/react`)
* **Icons**: Lucide React
* **Graphics**: HTML5 `<canvas>` API
* **Audio**: Web Audio API (`AudioContext`)
* **Build Tool**: Vite

## 📂 Project Structure

* `src/App.tsx`: The main React component containing the UI, animation loop, and state management.
* `src/utils/CatGenerator.ts`: The core rendering engine. Contains the logic for generating random cat parameters and drawing the pixel grid onto the canvas.
* `src/utils/AudioSynth.ts`: The audio engine. Uses the Web Audio API to synthesize various types of cat meows procedurally.

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:3000` or `http://localhost:5173`).

## 📜 License

SPDX-License-Identifier: Apache-2.0
