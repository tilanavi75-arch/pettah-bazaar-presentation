import React from 'react';
import { X, Mic, Clock, ChevronRight, UserCheck, Sparkles, BookOpen } from 'lucide-react';

export default function PresenterNotesDrawer({ isOpen, onClose, slideData, nextSlideData }) {
  if (!isOpen) return null;

  return (
    <div className="notes-drawer-overlay" onClick={onClose}>
      <aside className="notes-drawer-card" onClick={(e) => e.stopPropagation()}>
        <div className="notes-drawer-header">
          <div className="flex items-center gap-2">
            <div className="notes-icon-wrap">
              <Mic className="w-5 h-5 text-primary-flame" />
            </div>
            <div>
              <h3 className="notes-title">Presenter Speaking Script & Cues</h3>
              <p className="notes-subtitle">Natural Sri Lankan Undergraduate Delivery Guide</p>
            </div>
          </div>
          <button className="close-drawer-btn" onClick={onClose} title="Close Notes (Esc / N)">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="notes-drawer-content">
          {/* Presenter Meta Info */}
          <div className="notes-meta-grid">
            <div className="meta-box">
              <div className="meta-label">Current Presenter</div>
              <div className="meta-val highlight">{slideData.presenter}</div>
            </div>
            <div className="meta-box">
              <div className="meta-label">Allocated Pacing</div>
              <div className="meta-val">{slideData.allocatedTime}</div>
            </div>
            <div className="meta-box">
              <div className="meta-label">Syllabus Focus</div>
              <div className="meta-val gold">{slideData.rubricRef}</div>
            </div>
          </div>

          {/* Primary Speaking Notes Script */}
          <div className="script-container">
            <div className="script-header">
              <BookOpen className="w-4 h-4 text-primary-flame mr-1.5" />
              <span>Recommended Spoken Script (Natural Tone)</span>
            </div>
            <p className="script-body">
              {slideData.speakerNotes}
            </p>
          </div>

          {/* Key Delivery Advice */}
          <div className="delivery-tips-box">
            <div className="tips-title">
              <Sparkles className="w-4 h-4 text-orange-accent mr-1" />
              <span>Academic Delivery Tips:</span>
            </div>
            <ul className="tips-list">
              <li>Make steady eye contact with the evaluators rather than reading directly off the screen.</li>
              <li>Emphasize that this is a <strong>student research prototype</strong>, clearly distinguishing working features from future proposals.</li>
              <li>Stay strictly within your {slideData.allocatedTime} window to ensure the group finishes inside 20 minutes.</li>
            </ul>
          </div>

          {/* Transition Cue to Next Presenter */}
          {nextSlideData && (
            <div className="transition-cue-box">
              <div className="transition-cue-label">Next Up in Sequence:</div>
              <div className="transition-cue-details">
                <span className="next-slide">Slide {nextSlideData.slideNumber}: {nextSlideData.title}</span>
                <span className="next-speaker">→ Hand over to: <strong>{nextSlideData.presenter}</strong></span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
