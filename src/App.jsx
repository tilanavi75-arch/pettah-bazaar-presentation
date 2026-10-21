import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import SlideRenderer from './components/SlideRenderer';
import PresenterNotesDrawer from './components/PresenterNotesDrawer';
import RubricModal from './components/RubricModal';
import SlideOverviewModal from './components/SlideOverviewModal';
import { slidesData } from './data/slidesData';
import './App.css';

export default function App() {
  const totalSlides = slidesData.length;

  const getInitialSlide = () => {
    try {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash) {
        const parsed = parseInt(hash.replace('slide-', '').replace('slide', ''), 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= totalSlides) {
          return parsed - 1;
        }
      }
      const saved = localStorage.getItem('pettah_presentation_slide');
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < totalSlides) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return 0;
  };

  const [currentSlideIndex, setCurrentSlideIndex] = useState(getInitialSlide);
  const [showNotes, setShowNotes] = useState(false);
  const [showRubric, setShowRubric] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSlide = slidesData[currentSlideIndex] || slidesData[0];
  const nextSlide = currentSlideIndex < totalSlides - 1 ? slidesData[currentSlideIndex + 1] : null;

  // Sync hash and localStorage whenever slide changes
  useEffect(() => {
    try {
      localStorage.setItem('pettah_presentation_slide', currentSlideIndex.toString());
      if (window.location.hash !== `#slide-${currentSlideIndex + 1}`) {
        window.history.replaceState(null, '', `#slide-${currentSlideIndex + 1}`);
      }
    } catch {
      // Ignore storage/history errors
    }
  }, [currentSlideIndex]);

  // Listen to hash changes (e.g. user manually changes hash or clicks link)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const parsed = parseInt(hash.replace('slide-', '').replace('slide', ''), 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= totalSlides) {
        setCurrentSlideIndex(parsed - 1);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [totalSlides]);

  const nextSlideHandler = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlideHandler = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const jumpToSlideHandler = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation & presentation remote support
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlideHandler();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlideHandler();
      } else if (e.key === 'Home') {
        e.preventDefault();
        jumpToSlideHandler(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        jumpToSlideHandler(totalSlides - 1);
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes(prev => !prev);
      } else if (e.key === 'r' || e.key === 'R') {
        setShowRubric(prev => !prev);
      } else if (e.key === 'g' || e.key === 'G') {
        setShowGrid(prev => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        setShowNotes(false);
        setShowRubric(false);
        setShowGrid(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, totalSlides]);

  return (
    <div className={`presentation-app ${isFullscreen ? 'is-fullscreen' : ''}`}>
      {/* Top Navigation Bar */}
      <Navigation
        currentSlide={currentSlideIndex}
        totalSlides={totalSlides}
        onNext={nextSlideHandler}
        onPrev={prevSlideHandler}
        onJumpToSlide={jumpToSlideHandler}
        slideData={currentSlide}
        toggleNotes={() => setShowNotes(!showNotes)}
        showNotes={showNotes}
        toggleRubric={() => setShowRubric(!showRubric)}
        toggleGrid={() => setShowGrid(!showGrid)}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />

      {/* Main Slide Presentation Stage */}
      <main className="presentation-stage">
        <div className="slide-card-container">
          <SlideRenderer 
            slide={currentSlide} 
            onJumpToSlide={jumpToSlideHandler}
          />
        </div>
      </main>

      {/* Modals & Drawers */}
      <PresenterNotesDrawer
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        slideData={currentSlide}
        nextSlideData={nextSlide}
      />

      <RubricModal
        isOpen={showRubric}
        onClose={() => setShowRubric(false)}
        onSelectSlide={jumpToSlideHandler}
        currentSlideId={currentSlide.id}
      />

      <SlideOverviewModal
        isOpen={showGrid}
        onClose={() => setShowGrid(false)}
        currentSlide={currentSlideIndex}
        onSelectSlide={jumpToSlideHandler}
      />
    </div>
  );
}
