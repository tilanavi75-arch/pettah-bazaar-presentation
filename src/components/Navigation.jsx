import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, Maximize, Minimize, 
  FileText, Award, Grid, ChevronLeft, ChevronRight, 
  Clock, User, ShoppingBag, Sparkles 
} from 'lucide-react';

export default function Navigation({ 
  currentSlide, 
  totalSlides, 
  onNext, 
  onPrev, 
  onJumpToSlide, 
  slideData, 
  toggleNotes, 
  showNotes, 
  toggleRubric, 
  toggleGrid,
  isFullscreen,
  toggleFullscreen,
  spotlightMode,
  toggleSpotlight
}) {
  // 20-minute presentation timer (20 * 60 = 1200 seconds)
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPacingColor = () => {
    // 20 min presentation
    if (seconds > 19 * 60) return '#EF4444'; // Red (urgent)
    if (seconds > 16 * 60) return '#F59E0B'; // Amber warning
    return '#FF5500'; // App Primary Flame Orange
  };

  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <header className="pitch-navbar">
      {/* Top progress bar in fiery flame orange */}
      <div className="navbar-progress-track">
        <div 
          className="navbar-progress-fill" 
          style={{ width: `${progressPercent}%`, backgroundColor: getPacingColor() }}
        />
      </div>

      <div className="navbar-container">
        {/* Left: Brand with exact PettahBazaar app shopping bag logo styling */}
        <div className="navbar-brand-group">
          <div className="brand-badge-icon">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="brand-title-wrap">
              <span className="brand-name">
                Pettah<span className="brand-name-orange">Bazaar</span>
              </span>
              <span className="brand-tag">KDU Intake 43</span>
            </div>
            <div className="brand-subtitle">
              Principles of Marketing • BSM 12012
            </div>
          </div>
        </div>

        {/* Center: Slide indicator & Presenter badge */}
        <div className="navbar-center-group">
          <div 
            className="slide-counter-badge cursor-pointer hover:border-orange-500 transition-all"
            onClick={toggleGrid}
            title="Click to view full 20 slides deck grid (Shortcut: G)"
          >
            <span className="current-num">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="divider">/</span>
            <span className="total-num">{String(totalSlides).padStart(2, '0')}</span>
          </div>

          <div className="presenter-chip">
            <User className="w-3.5 h-3.5 text-primary-flame mr-1.5" />
            <span className="presenter-name">{slideData.presenter}</span>
            <span className="time-allocation">• {slideData.allocatedTime}</span>
          </div>

          {slideData.rubricRef && (
            <div className="rubric-mini-tag" onClick={toggleRubric} title="Click to view Rubric details">
              <Award className="w-3.5 h-3.5 text-gold-accent mr-1" />
              <span>{slideData.rubricRef.split('(')[0]}</span>
            </div>
          )}
        </div>

        {/* Right: Timer & Interactive Controls */}
        <div className="navbar-controls-group">
          {/* 20-min Presentation Timer */}
          <div className="timer-widget" style={{ borderColor: getPacingColor() }}>
            <Clock className="w-4 h-4 mr-1.5" style={{ color: getPacingColor() }} />
            <span className="timer-digits" style={{ color: getPacingColor() }}>
              {formatTime(seconds)}
            </span>
            <span className="timer-target">/ 20:00</span>
            <button 
              className="timer-btn" 
              onClick={() => setIsRunning(!isRunning)} 
              title={isRunning ? "Pause presentation timer" : "Start presentation timer"}
            >
              {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button 
              className="timer-btn" 
              onClick={() => { setIsRunning(false); setSeconds(0); }} 
              title="Reset presentation timer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Quick Action Buttons */}
          <button 
            className={`action-btn ${showNotes ? 'active' : ''}`} 
            onClick={toggleNotes}
            title="Toggle Presenter Speaker Notes (Shortcut: N)"
          >
            <FileText className="w-4 h-4 mr-1" />
            <span className="btn-text">Notes</span>
          </button>

          <button 
            className="action-btn" 
            onClick={toggleRubric}
            title="View 100-Mark Rubric Assessment Matrix"
          >
            <Award className="w-4 h-4 mr-1 text-gold-accent" />
            <span className="btn-text">Rubric</span>
          </button>

          <button 
            className="action-btn" 
            onClick={toggleGrid}
            title="Overview of all 20 Slides (Shortcut: G)"
          >
            <Grid className="w-4 h-4 mr-1" />
            <span className="btn-text">Slides</span>
          </button>

          <button 
            className={`action-btn ${spotlightMode ? 'active' : ''}`}
            onClick={toggleSpotlight}
            title="Toggle Presenter Spotlight Mode (Shortcut: B)"
          >
            <Sparkles className="w-4 h-4 mr-1 text-gold-accent" />
            <span className="btn-text">Spotlight</span>
          </button>

          <button 
            className="action-btn icon-only" 
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen (Shortcut: F)"}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Nav Chevrons */}
          <div className="nav-chevron-group">
            <button 
              className="nav-arrow-btn" 
              onClick={onPrev} 
              disabled={currentSlide === 0}
              title="Previous Slide (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              className="nav-arrow-btn primary" 
              onClick={onNext} 
              disabled={currentSlide === totalSlides - 1}
              title="Next Slide (Right Arrow / Spacebar)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
