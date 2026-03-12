/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { Download, Volume2, VolumeX, Wand2, Loader2 } from 'lucide-react';
import { CatParams, drawCat, generateRandomCatParams } from './utils/CatGenerator';
import { playRandomMeow } from './utils/AudioSynth';
import { motion } from 'motion/react';
import { GIFEncoder, quantize, applyPalette } from 'gifenc';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [muted, setMuted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [catParams, setCatParams] = useState<CatParams | null>(null);

  const generate = useCallback(() => {
    setIsGenerating(true);
    const newCat = generateRandomCatParams();
    setCatParams(newCat);
    playRandomMeow(muted, newCat.voice);
    setTimeout(() => setIsGenerating(false), 200);
  }, [muted]);

  useEffect(() => {
    // Generate initial cat on mount
    setCatParams(generateRandomCatParams());
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    
    const renderLoop = (time: number) => {
      if (canvasRef.current && catParams) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          drawCat(ctx, 320, catParams, time);
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    
    animationFrameId = requestAnimationFrame(renderLoop);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [catParams]);

  const downloadGif = async () => {
    if (!catParams) return;
    setIsDownloading(true);

    try {
      // Yield to the event loop so the UI updates to show the loading spinner
      await new Promise(resolve => setTimeout(resolve, 50));

      const gif = GIFEncoder();
      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 320;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) throw new Error('Could not get 2d context');

      const fps = 15;
      const durationMs = 4000; // 4 seconds to capture a full blink and breathing cycle
      const totalFrames = (durationMs / 1000) * fps;
      const delay = 1000 / fps;

      for (let i = 0; i < totalFrames; i++) {
        const time = i * delay;
        ctx.clearRect(0, 0, 320, 320);
        drawCat(ctx, 320, catParams, time);

        const { data, width, height } = ctx.getImageData(0, 0, 320, 320);
        const palette = quantize(data, 256, { format: 'rgba4444' });
        const index = applyPalette(data, palette);
        gif.writeFrame(index, width, height, { palette, delay });
      }

      gif.finish();
      const buffer = gif.bytes();
      const blob = new Blob([buffer], { type: 'image/gif' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.download = 'pixel-cat.gif';
      link.href = url;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate GIF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center gap-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">Pixel Cats</h1>
          <p className="text-neutral-500 text-sm">Generate your own unique pixel art cat!</p>
        </div>

        <div className="relative group flex flex-col items-center">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (Math.abs(info.offset.x) > 50) {
                generate();
              }
            }}
            animate={{ scale: isGenerating ? 0.9 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="touch-none cursor-grab active:cursor-grabbing"
          >
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              className="bg-neutral-100 rounded-2xl shadow-inner w-64 h-64 md:w-80 md:h-80 pointer-events-none"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
          
          <button 
            onClick={downloadGif}
            disabled={isDownloading}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white backdrop-blur-sm p-3 md:p-2 rounded-xl shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-neutral-700 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            title="Download GIF"
          >
            {isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
          </button>

          <p className="text-neutral-400 text-xs mt-4 md:hidden font-medium tracking-wide">
            ← Swipe to generate →
          </p>
        </div>

        <div className="flex gap-3 w-full">
          <button 
            onClick={generate} 
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <Wand2 size={20} />
            Generate Cat
          </button>
          
          <button 
            onClick={() => setMuted(!muted)} 
            className="bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-600 p-4 rounded-2xl shadow-sm flex items-center justify-center transition-colors duration-200"
            title={muted ? "Unmute Meow" : "Mute Meow"}
          >
            {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
