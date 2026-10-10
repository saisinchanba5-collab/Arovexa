import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Carousel.css';

/**
 * Enhanced Reusable Responsive Carousel Component
 * Requirements:
 * - Automatic slide every approximately 4–5 seconds
 * - Manual previous button
 * - Manual next button
 * - Swipe left/right on touch devices
 * - Pagination dots (showing position)
 * - Infinite loop (seamless wrap-around)
 * - Pause on hover
 * - Pause/reset on user interaction
 * - Smooth sliding animation, no jumping, no layout overflow
 * - MOBILE: Show ~1 card at a time with swipe, dots, arrows
 * - DESKTOP: Show multiple cards at once, functioning carousel that slides smoothly
 */
export default function Carousel({
  items = [],
  renderItem,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  autoSlide = true,
  autoSlideInterval = 4500,
  className = '',
  title,
  subtitle,
  badge,
  ariaLabel = 'Interactive Healthcare Carousel'
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const timerRef = useRef(null);

  const totalItems = items.length;

  // Dynamically compute visible cards per view based on viewport width
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 680) {
        setVisibleCount(itemsPerView.mobile || 1);
      } else if (width < 1024) {
        setVisibleCount(itemsPerView.tablet || 2);
      } else {
        setVisibleCount(itemsPerView.desktop || 3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [itemsPerView]);

  // Duplicate items for seamless infinite sliding track
  // We duplicate enough copies so any index from 0 to totalItems has full visibleCount cards
  const displayItems = totalItems > 1 ? [...items, ...items, ...items] : items;

  const handleNext = useCallback(() => {
    if (totalItems <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [totalItems]);

  const handlePrev = useCallback(() => {
    if (totalItems <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [totalItems]);

  const handleGoTo = (index) => {
    if (totalItems <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  // Seamless infinite loop wrap-around on transition end
  const handleTransitionEnd = () => {
    if (totalItems <= 1) return;

    if (currentIndex >= totalItems) {
      // Wrapped forward beyond first full set
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev % totalItems);
    } else if (currentIndex < 0) {
      // Wrapped backward behind start
      setIsTransitioning(false);
      setCurrentIndex((prev) => (prev % totalItems + totalItems) % totalItems);
    }
  };

  // Re-enable transition smoothly after instant jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Auto-slide effect with pause on hover/touch
  useEffect(() => {
    if (!autoSlide || isPaused || totalItems <= 1) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, autoSlideInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoSlide, isPaused, totalItems, autoSlideInterval, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 40) {
      handleNext();
    } else if (deltaX < -40) {
      handlePrev();
    }
  };

  // Keyboard navigation when focused
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  // Width percentage per item in the track
  const itemWidthPercentage = 100 / visibleCount;
  
  // Track translation percentage
  const translatePercentage = currentIndex * (100 / visibleCount);

  // Active dot index normalized to 0 .. totalItems - 1
  const activeDotIndex = ((currentIndex % totalItems) + totalItems) % totalItems;

  return (
    <section 
      className={`arovexa-carousel-section ${className}`}
      aria-label={ariaLabel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Carousel Header (Title, Subtitle, Desktop Arrows) */}
      <div className="carousel-header-row">
        <div className="carousel-titles">
          {badge && <span className="carousel-badge">{badge}</span>}
          {title && <h2 className="carousel-title">{title}</h2>}
          {subtitle && <p className="carousel-subtitle">{subtitle}</p>}
        </div>

        {totalItems > 1 && (
          <div className="carousel-nav-arrows desktop-only-arrows">
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={handlePrev}
              aria-label="Previous slide"
              title="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={handleNext}
              aria-label="Next slide"
              title="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Viewport and Track */}
      <div 
        className="carousel-viewport"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${translatePercentage}%)`,
            transition: isTransitioning
              ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
              : 'none'
          }}
        >
          {displayItems.map((item, index) => (
            <div
              key={`${item.id || 'slide'}-${index}`}
              className="carousel-slide"
              style={{ 
                flex: `0 0 ${itemWidthPercentage}%`, 
                maxWidth: `${itemWidthPercentage}%` 
              }}
            >
              <div className="carousel-slide-inner">
                {renderItem ? renderItem(item, index % totalItems) : item}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Controls (Pagination Dots + Mobile Arrows) */}
      {totalItems > 1 && (
        <div className="carousel-footer-controls">
          <button
            type="button"
            className="carousel-arrow-btn mobile-arrow"
            onClick={handlePrev}
            aria-label="Previous item"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="carousel-pagination-dots" role="tablist" aria-label="Slide indicators">
            {Array.from({ length: totalItems }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                role="tab"
                className={`carousel-dot ${dotIdx === activeDotIndex ? 'active' : ''}`}
                onClick={() => handleGoTo(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                aria-selected={dotIdx === activeDotIndex}
              />
            ))}
          </div>

          <button
            type="button"
            className="carousel-arrow-btn mobile-arrow"
            onClick={handleNext}
            aria-label="Next item"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
