"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface ListingCarouselProps {
  images: string[];
  title: string;
}

export default function ListingCarousel({
  images,
  title,
}: ListingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Touch state for mobile swiping
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imgSources, setImgSources] = useState([...images]);

  // safe fallback image (a generic nice house)
  const fallbackImage =
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";

  // Minimum distance (in pixels) required to trigger a swipe
  const minSwipeDistance = 30;

  const handlePrev = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents the click from routing to the details page
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleFavorite = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Favorited!");
  };

  // --- TOUCH HANDLERS FOR MOBILE SWIPE ---
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext(e);
    }
    if (isRightSwipe) {
      handlePrev(e);
    }
  };

  const handleInteraction = () => {
    if (!hasInteracted) setHasInteracted(true);
  };

  return (
    <div
      className="aspect-square w-full relative overflow-hidden rounded-xl group"
      // Unlock the rest of the images on hover or touch
      onMouseEnter={handleInteraction}
      onTouchStart={(e) => {
        handleInteraction();
        onTouchStart(e); // keep your existing touch logic
      }}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* The Images */}
      {images.map((img, index) => {
        // ULTIMATE OPTIMIZATION: If it's not the first image, and they haven't hovered, do not render it!
        if (index !== 0 && !hasInteracted) return null;

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              fill
              className="object-cover w-full h-full"
              src={img}
              alt={`${title} - Image ${index + 1}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              // Priority is ONLY needed for the very first image on the screen
              priority={index === 0}
            />
          </div>
        );
      })}

      {/* Favorite Button */}
      <div className="absolute top-3 right-3 z-20">
        <Heart
          onClick={toggleFavorite}
          onTouchEnd={(e) => {
            // Prevent swipe from accidentally triggering favorite
            e.stopPropagation();
            toggleFavorite(e);
          }}
          size={24}
          className="text-white drop-shadow-md hover:fill-rose-500 hover:text-rose-500 transition cursor-pointer"
        />
      </div>

      {/* Navigation Arrows - UPDATED: Hidden on mobile (md:flex) */}
      {images.length > 1 && (
        <>
          <div className="hidden md:flex absolute inset-y-0 left-0 items-center pl-2 z-20 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={handlePrev}
              className="bg-white/90 p-1.5 rounded-full cursor-pointer shadow-sm hover:bg-white hover:scale-105 transition"
            >
              <ChevronLeft size={18} className="text-neutral-800" />
            </button>
          </div>
          <div className="hidden md:flex absolute inset-y-0 right-0 items-center pr-2 z-20 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={handleNext}
              className="bg-white/90 p-1.5 rounded-full cursor-pointer shadow-sm hover:bg-white hover:scale-105 transition"
            >
              <ChevronRight size={18} className="text-neutral-800" />
            </button>
          </div>
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-20">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex ? "w-1.5 bg-white" : "w-1.5 bg-white/60"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
