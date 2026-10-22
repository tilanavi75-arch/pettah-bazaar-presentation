import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Play, Pause, RotateCcw, 
  Maximize, Minimize, FileText, Award, Grid, Sparkles, Clock, User 
} from 'lucide-react';
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
  const [slideDirection, setSlideDirection] = useState('next');
  const [showNotes, setShowNotes] = useState(false);
  const [showRubric, setShowRubric] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [spotlightMode, setSpotlightMode] = useState(false);

  // 20-minute presentation timer
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPacingColor = () => {
    if (seconds > 19 * 60) return '#EF4444';
    if (seconds > 16 * 60) return '#F59E0B';
    return '#FF5500';
  };

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
        setSlideDirection(parsed - 1 > currentSlideIndex ? 'next' : 'prev');
        setCurrentSlideIndex(parsed - 1);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [totalSlides, currentSlideIndex]);

  const nextSlideHandler = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setSlideDirection('next');
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlideHandler = () => {
    if (currentSlideIndex > 0) {
      setSlideDirection('prev');
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const jumpToSlideHandler = (index) => {
    if (index >= 0 && index < totalSlides) {
      setSlideDirection(index >= currentSlideIndex ? 'next' : 'prev');
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
      } else if (e.key === 'b' || e.key === 'B') {
        setSpotlightMode(prev => !prev);
      } else if (e.key === 'Escape') {
        setShowNotes(false);
        setShowRubric(false);
        setShowGrid(false);
        setSpotlightMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, totalSlides]);

  return (
    <div className={`presentation-app ${isFullscreen ? 'is-fullscreen' : ''} ${spotlightMode ? 'spotlight-active' : ''}`}>
      {/* Sleek 3px Pacing Progress Bar at the absolute top edge (zero height impact) */}
      <div className="presentation-top-progress-bar">
        <div 
          className="presentation-progress-fill" 
          style={{ 
            width: `${((currentSlideIndex + 1) / totalSlides) * 100}%`, 
            backgroundColor: getPacingColor() 
          }}
        />
      </div>

      {/* Main Slide Presentation Stage - Pure Full-Height Keynote */}
      <main className="presentation-stage">
        <div className="slide-card-container">
          <SlideRenderer 
            key={`${currentSlide.id}-${slideDirection}`}
            slide={currentSlide} 
            direction={slideDirection}
            spotlightMode={spotlightMode}
            onJumpToSlide={jumpToSlideHandler}
          />
        </div>

        {/* Unified Bottom Control HUD (Compact & Unobtrusive) */}
        <div className="presentation-bottom-hud">
          {/* Left: Nav chevrons & Slide indicator */}
          <div className="hud-left-group">
            <button 
              className="hud-nav-arrow" 
              onClick={prevSlideHandler} 
              disabled={currentSlideIndex === 0}
              title="Previous Slide (← / Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              className="hud-nav-arrow primary" 
              onClick={nextSlideHandler} 
              disabled={currentSlideIndex === totalSlides - 1}
              title="Next Slide (→ / Right Arrow / Space)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div 
              className="hud-slide-counter cursor-pointer"
              onClick={() => setShowGrid(true)}
              title="Click to view all 20 slides grid (Shortcut: G)"
            >
              <span className="current-num">{String(currentSlideIndex + 1).padStart(2, '0')}</span>
              <span className="divider">/</span>
              <span className="total-num">{String(totalSlides).padStart(2, '0')}</span>
            </div>
            {currentSlide.presenter && (
              <div className="hud-presenter-badge">
                <User className="w-3 h-3 text-primary-flame mr-1" />
                <span>{currentSlide.presenter.split('(')[0].trim()}</span>
              </div>
            )}
          </div>

          {/* Center: 20 Scrubber Dots */}
          <div className="scrubber-dots-row">
            {slidesData.map((s, idx) => (
              <button
                key={s.id}
                className={`scrubber-dot ${idx === currentSlideIndex ? 'active' : ''} ${idx < currentSlideIndex ? 'visited' : ''}`}
                onClick={() => jumpToSlideHandler(idx)}
                title={`Slide ${s.slideNumber}: ${s.title}`}
              >
                <span className="dot-tooltip">{s.slideNumber}: {s.section}</span>
              </button>
            ))}
          </div>

          {/* Right: Timer & Interactive Controls */}
          <div className="hud-right-group">
            {/* 20-min Timer */}
            <div className="hud-timer" style={{ borderColor: getPacingColor() }}>
              <Clock className="w-3.5 h-3.5 mr-1" style={{ color: getPacingColor() }} />
              <span className="hud-timer-text" style={{ color: getPacingColor() }}>
                {formatTime(seconds)}
              </span>
              <button 
                className="hud-timer-btn" 
                onClick={() => setIsTimerRunning(!isTimerRunning)} 
                title={isTimerRunning ? "Pause timer" : "Start timer"}
              >
                {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button 
                className="hud-timer-btn" 
                onClick={() => { setIsTimerRunning(false); setSeconds(0); }} 
                title="Reset timer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Notes Button */}
            <button 
              className={`hud-icon-btn ${showNotes ? 'active' : ''}`}
              onClick={() => setShowNotes(!showNotes)}
              title="Presenter Notes (Shortcut: N)"
            >
              <FileText className="w-3.5 h-3.5 mr-1" />
              <span className="hud-btn-lbl">Notes</span>
            </button>

            {/* Rubric Button */}
            <button 
              className="hud-icon-btn"
              onClick={() => setShowRubric(true)}
              title="100-Mark Rubric Assessment Matrix (Shortcut: R)"
            >
              <Award className="w-3.5 h-3.5 mr-1 text-gold-accent" />
              <span className="hud-btn-lbl">Rubric</span>
            </button>

            {/* Deck Grid Button */}
            <button 
              className="hud-icon-btn"
              onClick={() => setShowGrid(true)}
              title="Deck Grid (Shortcut: G)"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>

            {/* Spotlight Button */}
            <button 
              className={`hud-icon-btn ${spotlightMode ? 'active' : ''}`}
              onClick={() => setSpotlightMode(!spotlightMode)}
              title="Spotlight Focus (Shortcut: B)"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
            </button>

            {/* Fullscreen Button */}
            <button 
              className="hud-icon-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen (Shortcut: F)"}
            >
              {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
            </button>
          </div>
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
