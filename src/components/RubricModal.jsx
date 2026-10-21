import React from 'react';
import { X, Award, CheckCircle2, ArrowUpRight, GraduationCap } from 'lucide-react';
import { rubricCriteria } from '../data/slidesData';

export default function RubricModal({ isOpen, onClose, onSelectSlide, currentSlideId }) {
  if (!isOpen) return null;

  const totalMarks = rubricCriteria.reduce((sum, item) => sum + item.marks, 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="rubric-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-3">
            <div className="rubric-icon-wrap">
              <GraduationCap className="w-6 h-6 text-primary-flame" />
            </div>
            <div>
              <h2 className="modal-title">Official Evaluation Rubric (100 Marks)</h2>
              <p className="modal-subtitle">
                BSM 12012 — Principles of Marketing • KDU Faculty of Management
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="rubric-summary-banner">
          <div className="banner-text">
            <strong>Target: High Distinction (A+)</strong> — Every slide directly addresses specific rubric benchmarks. Note that <strong>STP (20m)</strong> and <strong>Marketing Mix 4Ps (20m)</strong> constitute 40% of the total score.
          </div>
          <div className="banner-score">
            <span className="score-num">100</span>
            <span className="score-total">Total Marks</span>
          </div>
        </div>

        <div className="rubric-grid-list">
          {rubricCriteria.map((item) => {
            const isCoveredInCurrent = item.slides.includes(currentSlideId);
            return (
              <div 
                key={item.id} 
                className={`rubric-criterion-card ${isCoveredInCurrent ? 'current-active' : ''}`}
              >
                <div className="criterion-top">
                  <div className="criterion-id-badge">Criterion {item.id}</div>
                  <div className="criterion-marks-badge">
                    <Award className="w-3.5 h-3.5 mr-1 text-orange-accent" />
                    <strong>{item.marks}</strong> Marks
                  </div>
                </div>

                <h4 className="criterion-title">{item.title}</h4>
                <p className="criterion-desc">{item.desc}</p>

                <div className="criterion-slides-row">
                  <span className="slides-label">Mapped Slides:</span>
                  <div className="slides-chips">
                    {item.slides.map((slideNum) => (
                      <button
                        key={slideNum}
                        className={`slide-chip-btn ${slideNum === currentSlideId ? 'active-slide' : ''}`}
                        onClick={() => {
                          onSelectSlide(slideNum - 1);
                          onClose();
                        }}
                        title={`Jump to Slide ${slideNum}`}
                      >
                        Slide {String(slideNum).padStart(2, '0')}
                        <ArrowUpRight className="w-3 h-3 ml-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="modal-footer">
          <span className="text-sm text-slate-400">
            Click any slide button above to jump directly to that presentation segment.
          </span>
          <button className="done-btn" onClick={onClose}>
            Close Rubric
          </button>
        </div>
      </div>
    </div>
  );
}
