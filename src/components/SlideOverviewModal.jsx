import React from 'react';
import { X, Play, Eye, User } from 'lucide-react';
import { slidesData } from '../data/slidesData';

export default function SlideOverviewModal({ isOpen, onClose, currentSlide, onSelectSlide }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="overview-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Presentation Slide Navigator</h2>
            <p className="modal-subtitle">Full deck sequence: 20 Slides • 20 Minutes • 10 Presenters</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="slides-grid-container">
          {slidesData.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div 
                key={slide.id} 
                className={`slide-grid-thumb ${isActive ? 'active-thumb' : ''}`}
                onClick={() => {
                  onSelectSlide(index);
                  onClose();
                }}
              >
                <div className="thumb-header">
                  <span className="thumb-num">Slide {slide.slideNumber}</span>
                  {slide.isVideoSlide ? (
                    <span className="thumb-tag video"><Play className="w-2.5 h-2.5 mr-0.5" /> Video</span>
                  ) : (
                    <span className="thumb-tag">{slide.section}</span>
                  )}
                </div>

                <h4 className="thumb-title">{slide.title || slide.videoHeading}</h4>

                <div className="thumb-footer">
                  <div className="thumb-presenter">
                    <User className="w-3 h-3 mr-1 text-orange-accent" />
                    <span>{slide.presenter.split('(')[0]}</span>
                  </div>
                  <span className="thumb-time">{slide.allocatedTime}</span>
                </div>

                {isActive && (
                  <div className="current-indicator-badge">
                    <Eye className="w-3 h-3 mr-1" />
                    Viewing Now
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
