import React, { useState } from 'react';
import { 
  Compass, MapPin, Search, Tag, Users, Zap, Clock, ShieldCheck, 
  ArrowRight, ExternalLink, CheckCircle2, AlertTriangle, Layers, 
  BookOpen, Target, Crosshair, BarChart3, HelpCircle, Eye, Phone,
  FileCheck, HeartHandshake, Sparkles, AlertCircle, Quote, Smartphone,
  Globe, QrCode, Store, Scale, Lock, TrendingUp, Navigation2, Info,
  ShoppingBag, Flame, Star, Award, Check, Play, EyeOff, Radio, Activity,
  DollarSign, LayoutGrid, ChevronLeft, ChevronRight, MessageSquare, Trophy, BarChart2,
  Megaphone, Workflow, CheckCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

import VideoSlidePlaceholder from './VideoSlidePlaceholder';
import InteractivePrototype from './InteractivePrototype';
import { teamMembers } from '../data/slidesData';

// Reusable point-wise presentation list component with staggered build animations
function PointList({ points, color = "orange", className = "" }) {
  if (!points || !points.length) return null;
  return (
    <ul className={`presentation-point-list ${className}`}>
      {points.map((pt, i) => (
        <li key={i} className={`presentation-point-item stagger-${(i % 5) + 1}`}>
          <span className={`point-marker-dot ${color}`}></span>
          <span className="point-item-text">{pt}</span>
        </li>
      ))}
    </ul>
  );
}

// Reusable sub-card navigation tabs for zero-scroll presentation slides
function SubCardNav({ activeIndex, onSelect, tabs }) {
  return (
    <div className="subtabs-row">
      <div className="subtabs-pills">
        {tabs.map((tab, idx) => (
          <button 
            key={idx}
            className={`subtab-pill-btn ${tab.proposed ? 'proposed-pill' : ''} ${activeIndex === idx ? 'active' : ''}`}
            onClick={() => onSelect(idx)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="subtabs-nav-arrows">
        <button 
          className="subtab-arrow-btn"
          onClick={() => onSelect(activeIndex > 0 ? activeIndex - 1 : tabs.length - 1)}
          title="Previous Card"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev Card</span>
        </button>
        <span className="subtab-indicator-counter">{activeIndex + 1} / {tabs.length}</span>
        <button 
          className="subtab-arrow-btn primary"
          onClick={() => onSelect(activeIndex < tabs.length - 1 ? activeIndex + 1 : 0)}
          title="Next Card"
        >
          <span>Next Card</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function SlideRenderer({ slide, direction = 'next', spotlightMode = false, onJumpToSlide }) {
  // State for interactive features on specific slides
  const [problemPhoto, setProblemPhoto] = useState('alley'); // 'alley' or 'traffic'
  const [activeStep, setActiveStep] = useState(0); // For Slide 6 concept step
  const [theoryView, setTheoryView] = useState('cards'); // 'cards' or 'table' for Slide 8
  const [activePersona, setActivePersona] = useState(0); // For Slide 9 persona toggle
  const [positioningView, setPositioningView] = useState('map'); // 'map' or 'bullseye' for Slide 10
  const [selectedStreet, setSelectedStreet] = useState('1st'); // For Slide 13 street explorer
  
  // Sub-card navigation states for slides to eliminate vertical scrolling
  const [subCard2, setSubCard2] = useState(0); // Slide 2: 0: Pillars, 1: Metrics & Purpose
  const [subCard3, setSubCard3] = useState(0); // Slide 3: 0: Dilemmas, 1: Field Evidence & Photos
  const [subCard5, setSubCard5] = useState(0); // Slide 5: 0: Shopper Evolution, 1: Commercial Clustering & Insights
  const [subCard7, setSubCard7] = useState(0); // Slide 7: 0: Value Prop & Pillars, 1: Strategy Curve & Benchmarks
  const [subCard8, setSubCard8] = useState(0); // Slide 8: 0: Needs/Wants/Demand, 1: Value/Satisfaction/Orientation
  const [subCard9, setSubCard9] = useState(0); // Slide 9: 0: 4 Segmentation Variables, 1: Customer Archetypes
  const [subCard10, setSubCard10] = useState(0); // Slide 10: 0: Target Cohorts Bullseye, 1: Positioning Map & Statement
  const [subCard11, setSubCard11] = useState(0); // Slide 11: 0: Competitor Matrix Table, 1: Fit Scores & Strengths
  const [subCard12, setSubCard12] = useState(0); // Slide 12: 0: Prototype, 1: Proposed Roadmap
  const [subCard13, setSubCard13] = useState(0); // Slide 13: 0: Price Strategy, 1: Place Strategy
  const [subCard14, setSubCard14] = useState(0); // Slide 14: 0: Promotion Strategy, 1: People Strategy
  const [subCard15, setSubCard15] = useState(0); // Slide 15: 0: Process Strategy, 1: Physical Evidence
  const [activeProcessStep, setActiveProcessStep] = useState(0); // 0-4 for Process Flow
  const [subCard18, setSubCard18] = useState(0); // Slide 18: 0: Pillars 1-3, 1: Pillars 4-6 & Trust
  const [activeEthic, setActiveEthic] = useState(null); // For Slide 18 ethics cards
  const [subCard19, setSubCard19] = useState(0); // Slide 19: 0: Executive Scorecard, 1: Strategic Recap & Brand Mission
  const [subCard20, setSubCard20] = useState(0); // Slide 20: 0: Q&A Closing, 1: 10 Presenters Roster, 2: Academic References

  const animClass = direction === 'prev' ? 'slide-anim-prev' : 'slide-anim-next';
  const spotlightClass = spotlightMode ? 'spotlight-on' : '';

  // Confetti celebration trigger for Slide 19
  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF5500', '#F59E0B', '#10B981', '#38BDF8', '#EC4899']
    });
  };

  // If it's a dedicated video slide (Slide 4 or Slide 16)
  if (slide.isVideoSlide) {
    return (
      <div className={`slide-content video-slide-container ${animClass} ${spotlightClass}`}>
        <VideoSlidePlaceholder 
          slideNumber={slide.slideNumber}
          heading={slide.videoHeading}
          label={slide.videoLabel}
          caption={slide.videoCaption}
          presenter={slide.presenter}
          context={slide.videoContext}
          disclaimer={slide.disclaimer}
          videoSrc={slide.videoSrc}
          keyTakeaways={slide.keyTakeaways}
        />
      </div>
    );
  }

  // Slide 1: Executive Cover Page & Brand Introduction
  if (slide.id === 1) {
    return (
      <div className={`slide-content cover-page-minimal ${animClass} ${spotlightClass}`}>
        {/* LEFT COLUMN: Brand Name & Presenters */}
        <div className="cover-left-column">
          {/* Main Website Name - Extra Large */}
          <div className="cover-brand-header">
            <h1 className="cover-main-brand-title">
              PETTAH <span className="brand-accent-text">BAZAAR</span>
            </h1>
            <p className="cover-main-tagline">
              "Find the Shop. Save Your Time."
            </p>
          </div>

          {/* Presenters / Team Member Names */}
          <div className="cover-presenters-section">
            <div className="cover-presenters-title">
              <Users className="w-4 h-4 text-primary-flame mr-2" />
              <span>PRESENTERS</span>
            </div>
            <div className="cover-names-grid">
              {teamMembers.map((member, idx) => (
                <div key={member.id} className="cover-name-badge">
                  <span className="member-num">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  <span className="member-name">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Large Hero Image (dakunu paththe) */}
        <div className="cover-right-image-column">
          <div className="cover-hero-image-wrapper">
            <img
              src={slide.heroImage}
              alt="Pettah Commercial Epicenter"
              className="cover-hero-image"
            />
            <div className="cover-image-overlay-glow" />
            <div className="cover-image-caption">
              <MapPin className="w-3.5 h-3.5 text-primary-flame mr-1.5 flex-shrink-0" />
              <span>Pettah Commercial District • Colombo 11</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 2: Introduction & Brand Identity
  if (slide.id === 2) {
    const tabs2 = [
      { label: "Card 1: 01 & 02 — Platform Concept & Colombo 11 Geographic Focus", icon: <Target className="w-3.5 h-3.5 mr-1 text-teal-300" /> },
      { label: "Card 2: 03 & 04 — Identity, Mission & Live Operational Metrics", icon: <Store className="w-3.5 h-3.5 mr-1 text-orange-400" />, proposed: true }
    ];

    const pillars1to2 = slide.brandPillars.slice(0, 2);
    const pillars3to4 = slide.brandPillars.slice(2, 4);

    return (
      <div className={`slide-content slide-two-column ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <SubCardNav activeIndex={subCard2} onSelect={setSubCard2} tabs={tabs2} />

        {subCard2 === 0 && (
          <div className="slide-subcard-container animate-fade-in flex flex-col justify-between">
            <div className="pillars-grid-2col flex-1 min-h-0">
              {pillars1to2.map((p, idx) => (
                <div key={idx} className="brand-pillar-large-card">
                  <div>
                    <div className="pillar-header">
                      <div className="pillar-num-badge">0{idx + 1}</div>
                      <div className="flex-1">
                        <h4 className="pillar-title">{p.title}</h4>
                        <span className="pillar-micro-tag">{p.tag}</span>
                      </div>
                    </div>
                    
                    <PointList 
                      points={p.points || [p.desc]} 
                      color={idx === 0 ? "orange" : "cyan"} 
                    />
                  </div>
                  
                  <div className="pillar-progress-track mt-3">
                    <div className="pillar-progress-fill" style={{ width: `${85 + idx * 8}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-teal-500/30 flex items-center mt-2 flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-teal-300 mr-2 flex-shrink-0" />
              <span className="text-slate-300 text-xs">Pettah Bazaar bridges the gap between chaotic street shopping and digital efficiency, specifically tailored to Colombo 11's commercial density.</span>
            </div>
          </div>
        )}

        {subCard2 === 1 && (
          <div className="slide-subcard-container animate-fade-in flex flex-col justify-between">
            <div className="pillars-grid-2col flex-1 min-h-0">
              {pillars3to4.map((p, idx) => (
                <div key={idx} className="brand-pillar-large-card">
                  <div>
                    <div className="pillar-header">
                      <div className="pillar-num-badge">0{idx + 3}</div>
                      <div className="flex-1">
                        <h4 className="pillar-title">{p.title}</h4>
                        <span className="pillar-micro-tag">{p.tag}</span>
                      </div>
                    </div>
                    
                    <PointList 
                      points={p.points || [p.desc]} 
                      color={idx === 0 ? "gold" : "emerald"} 
                    />
                  </div>
                  
                  <div className="pillar-progress-track mt-3">
                    <div className="pillar-progress-fill" style={{ width: `${90 + idx * 5}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Commercial Metrics Strip */}
            <div className="commercial-metrics-strip mt-2 flex-shrink-0">
              <div className="metric-pod">
                <MapPin className="w-4 h-4 text-primary-flame mb-1" />
                <div className="pod-number">11</div>
                <div className="pod-label">Micro-Streets Mapped</div>
              </div>
              <div className="metric-pod">
                <Store className="w-4 h-4 text-gold-400 mb-1" />
                <div className="pod-number">28+</div>
                <div className="pod-label">Verified Stalls Active</div>
              </div>
              <div className="metric-pod">
                <DollarSign className="w-4 h-4 text-emerald-400 mb-1" />
                <div className="pod-number">0 LKR</div>
                <div className="pod-label">Merchant Listing Fee</div>
              </div>
              <div className="metric-pod">
                <Clock className="w-4 h-4 text-cyan-400 mb-1" />
                <div className="pod-number">&lt; 3 Min</div>
                <div className="pod-label">Avg Discovery Time</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slide 3: Market Problem
  if (slide.id === 3) {
    const tabs3 = [
      { label: "Card 1: 4 Core Shopping Dilemmas (Status Quo vs Solution Meter)", icon: <AlertTriangle className="w-3.5 h-3.5 mr-1 text-red-400" /> },
      { label: "Card 2: Field Ground Reality & Photography (Alley & Traffic Evidence)", icon: <Eye className="w-3.5 h-3.5 mr-1 text-teal-300" /> }
    ];

    return (
      <div className={`slide-content slide-problem ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag problem">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <SubCardNav activeIndex={subCard3} onSelect={setSubCard3} tabs={tabs3} />

        {subCard3 === 0 && (
          <div className="slide-subcard-container animate-fade-in">
            {/* Visual Friction Comparison Meter */}
            <div className="friction-meter-card">
              <div className="friction-side old">
                <div className="friction-label">
                  <AlertTriangle className="w-4 h-4 text-red-400 mr-1.5" />
                  <span>Current Status Quo (Random Walking & Asking Directions)</span>
                </div>
                <div className="friction-meter-wrap">
                  <div className="meter-bar red" style={{ width: '85%' }}>
                    <span>~150 mins searching time • Severe exhaustion</span>
                  </div>
                </div>
              </div>

              <div className="friction-vs-badge">VS</div>

              <div className="friction-side new">
                <div className="friction-label">
                  <Flame className="w-4 h-4 text-primary-flame mr-1.5" />
                  <span>With Pettah Bazaar Platform (Product-First Match)</span>
                </div>
                <div className="friction-meter-wrap">
                  <div className="meter-bar green" style={{ width: '20%' }}>
                    <span>&lt; 3 mins discovery • Direct navigation</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="problem-dilemmas-4col mt-1 flex-1 min-h-0">
              {slide.problemPoints.map((pt, idx) => (
                <div key={idx} className="problem-dilemma-card">
                  <div className="problem-item-header">
                    <span className="problem-tag">{pt.tag}</span>
                    <h4 className="problem-item-title text-white font-bold text-xs mt-1">{pt.title}</h4>
                  </div>
                  <PointList points={pt.points || [pt.desc]} color="red" />
                </div>
              ))}
            </div>
          </div>
        )}

        {subCard3 === 1 && (
          <div className="slide-subcard-container animate-fade-in">
            <div className="card-detail-two-col flex-1 min-h-0">
              <div className="detail-col-features flex flex-col justify-between">
                <div>
                  <div className="photo-switcher-tabs mb-2">
                    <button 
                      className={`photo-tab-btn ${problemPhoto === 'alley' ? 'active' : ''}`}
                      onClick={() => setProblemPhoto('alley')}
                    >
                      Photo 1: Congested Interior Alleys
                    </button>
                    <button 
                      className={`photo-tab-btn ${problemPhoto === 'traffic' ? 'active' : ''}`}
                      onClick={() => setProblemPhoto('traffic')}
                    >
                      Photo 2: Street Traffic Gridlock
                    </button>
                  </div>

                  <div className="spacious-strategy-card p-3">
                    <h4 className="text-white text-sm font-bold mb-1.5 flex items-center">
                      <AlertCircle className="w-4 h-4 text-orange-400 mr-2" />
                      Field Observation & Shopper Psychology:
                    </h4>
                    <p className="text-slate-200 text-xs leading-relaxed mb-2">
                      {slide.observationNote}
                    </p>
                    <div className="p-2.5 rounded-lg bg-slate-900/70 border border-teal-500/30">
                      <strong className="text-teal-300 text-[11px] uppercase tracking-wider block mb-0.5">Key Field Takeaway:</strong>
                      <span className="text-slate-300 text-xs leading-relaxed">
                        Pettah's dense cross-streets (1st to 5th Cross St) have massive item diversity, but shoppers waste hours due to lack of digital visibility.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Problem Severity Indicators placed cleanly on Card 2 */}
                <div className="severity-indicators-row mt-2 flex-shrink-0">
                  <div className="severity-pill">
                    <span className="pill-dot red"></span>
                    <span>Walking Fatigue: <strong>89% High</strong></span>
                  </div>
                  <div className="severity-pill">
                    <span className="pill-dot red"></span>
                    <span>Directory Coverage: <strong>0% Unmapped</strong></span>
                  </div>
                  <div className="severity-pill">
                    <span className="pill-dot gold"></span>
                    <span>Heat & Fatigue: <strong>Extreme</strong></span>
                  </div>
                </div>
              </div>

              <div className="detail-col-media">
                <div className="problem-photo-card h-full flex flex-col">
                  <img 
                    src={problemPhoto === 'alley' ? slide.image : slide.trafficImage} 
                    alt="Pettah field study photograph" 
                    className="problem-photo flex-1 object-cover"
                  />
                  <div className="photo-caption-bar">
                    <span>
                      {problemPhoto === 'alley' 
                        ? "Field Photo: Narrow interior cross-streets with heavy cart and pedestrian congestion"
                        : "Field Photo: Vehicle gridlock and bustling commerce along Pettah entrance routes"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slide 5: Market Opportunity & Research Insights
  if (slide.id === 5) {
    const tabs5 = [
      { label: "Card 1: 3-Stage Shopper Evolution (Pre-Visit, In-Transit & Physical)", icon: <Workflow className="w-3.5 h-3.5 mr-1 text-teal-300" /> },
      { label: "Card 2: Commercial Clustering & Key Research Insights", icon: <TrendingUp className="w-3.5 h-3.5 mr-1 text-orange-400" /> }
    ];

    return (
      <div className={`slide-content ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag opportunity">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <SubCardNav activeIndex={subCard5} onSelect={setSubCard5} tabs={tabs5} />

        {subCard5 === 0 && (
          <div className="slide-subcard-container animate-fade-in">
            {/* 3-Step Journey Flow Infographic with Animated Connectors */}
            <div className="opportunity-flow-row flex-1 min-h-0">
              {slide.journey.map((j, idx) => (
                <React.Fragment key={idx}>
                  <div className="journey-node-card visual-node flex-1">
                    <div className="node-icon-header">
                      <div className="journey-step-badge">Stage {j.step}</div>
                      {idx === 0 && <AlertTriangle className="w-5 h-5 text-red-400" />}
                      {idx === 1 && <Radio className="w-5 h-5 text-gold-400 animate-pulse" />}
                      {idx === 2 && <ShoppingBag className="w-5 h-5 text-primary-flame" />}
                    </div>
                    <h4 className="journey-stage-title text-base mt-2">{j.stage}</h4>
                    <PointList points={j.points || [j.desc]} color={idx === 0 ? "red" : idx === 1 ? "gold" : "emerald"} />
                  </div>
                  {idx < slide.journey.length - 1 && (
                    <div className="journey-arrow">
                      <ArrowRight className="w-6 h-6 text-primary-flame animate-pulse" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {subCard5 === 1 && (
          <div className="slide-subcard-container animate-fade-in">
            {/* Visual Sector Density Meters */}
            <div className="density-meters-banner">
              <div className="density-header">
                <span className="density-title">Field Observation: Natural Pettah Commercial Clustering</span>
                <span className="density-sub">High natural sector specialization makes digital indexing intuitive</span>
              </div>
              <div className="density-bars-grid">
                <div className="density-bar-item">
                  <div className="density-bar-info">
                    <span>2nd Cross St: Textiles & Sarees</span>
                    <strong className="text-pink-400">94% Concentration</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill pink" style={{ width: '94%' }}></div>
                  </div>
                </div>

                <div className="density-bar-item">
                  <div className="density-bar-info">
                    <span>1st Cross St: Electronics & Tech</span>
                    <strong className="text-cyan-400">91% Concentration</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill cyan" style={{ width: '91%' }}></div>
                  </div>
                </div>

                <div className="density-bar-item">
                  <div className="density-bar-info">
                    <span>Bankshall St: Pure Spices & Herbs</span>
                    <strong className="text-amber-400">96% Concentration</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill amber" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Key Research Insights Cards */}
            <div className="insights-tri-grid mt-2 flex-1 min-h-0">
              {slide.insights.map((ins, idx) => (
                <div key={idx} className="insight-card visual-card">
                  <div className="insight-metric">{ins.metric}</div>
                  <h5 className="insight-label">{ins.label}</h5>
                  <p className="insight-detail text-xs">{ins.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slide 6: Product Concept (Interactive Showroom)
  if (slide.id === 6) {
    return (
      <div className={`slide-content ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag solution">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <div className="concept-showroom-split">
          {/* Left: 3-step interactive journey */}
          <div className="concept-steps-col">
            <div className="interactive-step-selector">
              {slide.steps.map((st, idx) => (
                <div 
                  key={idx} 
                  className={`concept-step-card interactive-step ${activeStep === idx ? 'step-selected' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="concept-step-top">
                    <div className="concept-num-badge">{st.num}</div>
                    <span className="status-badge-active">{st.badge}</span>
                  </div>
                  <h3 className="concept-title">{st.title}</h3>
                  <div className="concept-subtitle">{st.subtitle}</div>
                  
                  {/* Point-wise presentation bullet items */}
                  <PointList points={st.points || [st.desc]} color="orange" />
                  
                  {activeStep === idx && (
                    <div className="active-step-cue animate-fade-in">
                      <Sparkles className="w-3.5 h-3.5 mr-1 text-primary-flame" />
                      Inspecting Step {idx + 1}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="academic-integrity-callout mt-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
              <span>{slide.clarityNote}</span>
            </div>
          </div>

          {/* Right: Real mobile prototype in hand with interactive hotspots */}
          <div className="concept-mockup-col">
            <div className="concept-mockup-frame">
              <img 
                src="/assets/pettah_real_app_mockup_hand.png" 
                alt="Pettah Bazaar mobile app prototype in hand" 
                className="concept-mockup-img"
              />

              {/* Animated Floating Hotspots with Active Focus */}
              <div className={`mockup-hotspot hs-search ${activeStep === 0 ? 'active-pulse' : ''}`} onClick={() => setActiveStep(0)}>
                <div className="hotspot-pulse"></div>
                <div className="hotspot-tooltip">
                  <Search className="w-3 h-3 mr-1 text-primary-flame" />
                  <span>1. Product Search Bar</span>
                </div>
              </div>

              <div className={`mockup-hotspot hs-categories ${activeStep === 1 ? 'active-pulse' : ''}`} onClick={() => setActiveStep(1)}>
                <div className="hotspot-pulse"></div>
                <div className="hotspot-tooltip">
                  <Tag className="w-3 h-3 mr-1 text-cyan-400" />
                  <span>2. Curated Sector Categories</span>
                </div>
              </div>

              <div className={`mockup-hotspot hs-map ${activeStep === 2 ? 'active-pulse' : ''}`} onClick={() => setActiveStep(2)}>
                <div className="hotspot-pulse"></div>
                <div className="hotspot-tooltip">
                  <MapPin className="w-3 h-3 mr-1 text-emerald-400" />
                  <span>3. Micro-Street Walking Map</span>
                </div>
              </div>

              <div className="mockup-footer-badge">
                <Globe className="w-3.5 h-3.5 mr-1 text-primary-flame" />
                Live Application: pettah-bazaar.vercel.app
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 7: Innovation, Customer Benefits & Value Proposition
  if (slide.id === 7) {
    const tabs7 = [
      { label: "Card 1: Value Proposition & 4 Innovation Pillars", icon: <Sparkles className="w-3.5 h-3.5 mr-1 text-teal-300" /> },
      { label: "Card 2: Value Innovation Curve & Strategic Benchmarks", icon: <BarChart2 className="w-3.5 h-3.5 mr-1 text-orange-400" /> }
    ];

    return (
      <div className={`slide-content ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <SubCardNav activeIndex={subCard7} onSelect={setSubCard7} tabs={tabs7} />

        {subCard7 === 0 && (
          <div className="slide-subcard-container animate-fade-in">
            <div className="value-prop-hero-box">
              <div className="prop-tag">PROPOSED VALUE PROPOSITION</div>
              <blockquote className="prop-quote">
                {slide.valueProposition}
              </blockquote>
            </div>

            <div className="innovation-quad-grid flex-1 min-h-0 mt-2">
              {slide.pillars.map((pil, idx) => (
                <div key={idx} className="innovation-card visual-card">
                  <div className="card-top-tag">{pil.tag}</div>
                  <h4 className="card-heading">{pil.title}</h4>
                  <PointList points={pil.points || [pil.desc]} color="orange" />
                </div>
              ))}
            </div>
          </div>
        )}

        {subCard7 === 1 && (
          <div className="slide-subcard-container animate-fade-in">
            {/* Visual Benchmark Stats */}
            <div className="innovation-benchmarks-strip">
              <div className="benchmark-stat">
                <div className="benchmark-number text-primary-flame">85%</div>
                <div className="benchmark-label">Search Effort Reduction</div>
              </div>
              <div className="benchmark-stat">
                <div className="benchmark-number text-cyan-400">&lt; 1.5s</div>
                <div className="benchmark-label">Low-Bandwidth PWA Load</div>
              </div>
              <div className="benchmark-stat">
                <div className="benchmark-number text-gold-400">100%</div>
                <div className="benchmark-label">Pettah Hyper-Local Focus</div>
              </div>
              <div className="benchmark-stat">
                <div className="benchmark-number text-emerald-400">Zero Cost</div>
                <div className="benchmark-label">Free Onboarding for Stalls</div>
              </div>
            </div>

            {/* Strategy Canvas / Value Curve Mini-Visual */}
            <div className="strategy-canvas-banner flex-1 min-h-0 mt-2">
              <div className="canvas-header">
                <BarChart2 className="w-4 h-4 text-primary-flame mr-1.5" />
                <span>Value Innovation Curve: Pettah Bazaar vs Alternatives</span>
              </div>
              <div className="canvas-bars-row">
                <div className="canvas-col">
                  <span className="canvas-col-title">Hyper-Local Detail</span>
                  <div className="canvas-bar-track">
                    <div className="canvas-bar-fill orange" style={{ height: '95%' }} title="Pettah Bazaar: 95%"></div>
                    <div className="canvas-bar-fill gray" style={{ height: '35%' }} title="Google Maps: 35%"></div>
                  </div>
                  <span className="canvas-col-label">PB (95%) vs GM (35%)</span>
                </div>

                <div className="canvas-col">
                  <span className="canvas-col-title">3G Data Lightness</span>
                  <div className="canvas-bar-track">
                    <div className="canvas-bar-fill orange" style={{ height: '90%' }} title="Pettah Bazaar: 90%"></div>
                    <div className="canvas-bar-fill gray" style={{ height: '40%' }} title="Social Apps: 40%"></div>
                  </div>
                  <span className="canvas-col-label">PB (90%) vs Apps (40%)</span>
                </div>

                <div className="canvas-col">
                  <span className="canvas-col-title">Merchant Verification</span>
                  <div className="canvas-bar-track">
                    <div className="canvas-bar-fill orange" style={{ height: '92%' }} title="Pettah Bazaar: 92%"></div>
                    <div className="canvas-bar-fill gray" style={{ height: '20%' }} title="Asking Walkers: 20%"></div>
                  </div>
                  <span className="canvas-col-label">PB (92%) vs Walk (20%)</span>
                </div>

                <div className="canvas-col">
                  <span className="canvas-col-title">Time Savings</span>
                  <div className="canvas-bar-track">
                    <div className="canvas-bar-fill orange" style={{ height: '96%' }} title="Pettah Bazaar: 96%"></div>
                    <div className="canvas-bar-fill gray" style={{ height: '15%' }} title="Traditional: 15%"></div>
                  </div>
                  <span className="canvas-col-label">PB (96%) vs Trad (15%)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slide 8: Application of Marketing Concepts (Dashboard + Table Toggle)
  if (slide.id === 8) {
    const tabs8 = [
      { label: "Card 1: Concepts 1–3: Needs, Wants & Demand (Human Drivers)", icon: <Target className="w-3.5 h-3.5 mr-1 text-teal-300" /> },
      { label: "Card 2: Concepts 4–6: Value, Satisfaction & Orientation", icon: <Star className="w-3.5 h-3.5 mr-1 text-orange-400" /> }
    ];

    const currentConceptItems = subCard8 === 0 ? slide.table.slice(0, 3) : slide.table.slice(3, 6);
    const startIdxOffset = subCard8 === 0 ? 0 : 3;

    return (
      <div className={`slide-content ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag theory">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* View Switcher: Visual Cards vs Academic Table */}
            <div className="view-mode-toggle">
              <button 
                className={`toggle-view-btn ${theoryView === 'cards' ? 'active' : ''}`}
                onClick={() => setTheoryView('cards')}
              >
                <LayoutGrid className="w-3.5 h-3.5 mr-1" />
                Visual Cards
              </button>
              <button 
                className={`toggle-view-btn ${theoryView === 'table' ? 'active' : ''}`}
                onClick={() => setTheoryView('table')}
              >
                <Layers className="w-3.5 h-3.5 mr-1" />
                Theory Table
              </button>
            </div>
            <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
          </div>
        </div>

        <SubCardNav activeIndex={subCard8} onSelect={setSubCard8} tabs={tabs8} />

        {/* Kotler 5-Stage Customer Value Flow Banner */}
        <div className="kotler-value-flow-strip mb-2">
          <div className={`flow-step ${subCard8 === 0 ? 'highlight' : ''}`}>1. Needs & Chaos</div>
          <ArrowRight className="w-3.5 h-3.5 text-primary-flame" />
          <div className={`flow-step ${subCard8 === 0 ? 'highlight' : ''}`}>2. Value Proposition</div>
          <ArrowRight className="w-3.5 h-3.5 text-primary-flame" />
          <div className={`flow-step ${subCard8 === 0 ? 'highlight' : ''}`}>3. Integrated 4Ps</div>
          <ArrowRight className="w-3.5 h-3.5 text-primary-flame" />
          <div className={`flow-step ${subCard8 === 1 ? 'highlight-orange' : ''}`}>4. Merchant Trust</div>
          <ArrowRight className="w-3.5 h-3.5 text-primary-flame" />
          <div className={`flow-step ${subCard8 === 1 ? 'highlight-orange' : ''}`}>5. Value Capture</div>
        </div>

        {theoryView === 'cards' ? (
          <div className="slide-subcard-container animate-fade-in">
            <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
              {currentConceptItems.map((row, i) => {
                const idx = startIdxOffset + i;
                return (
                  <div key={idx} className="theory-card visual-card flex flex-col justify-between">
                    <div>
                      <div className="theory-card-header">
                        <div className="theory-icon-wrap">
                          {idx === 0 && <Target className="w-4 h-4 text-primary-flame" />}
                          {idx === 1 && <ShoppingBag className="w-4 h-4 text-gold-400" />}
                          {idx === 2 && <TrendingUp className="w-4 h-4 text-cyan-400" />}
                          {idx === 3 && <Sparkles className="w-4 h-4 text-emerald-400" />}
                          {idx === 4 && <Star className="w-4 h-4 text-pink-400" />}
                          {idx === 5 && <Compass className="w-4 h-4 text-primary-flame" />}
                        </div>
                        <div>
                          <h4 className="theory-concept-name text-sm font-bold">{row.concept}</h4>
                          <span className="theory-author-pill">Kotler & Armstrong</span>
                        </div>
                      </div>

                      <div className="theory-def-box mt-2">
                        <span className="def-label">Academic Definition:</span>
                        <p className="def-text text-xs leading-relaxed">{row.academicDefinition}</p>
                      </div>
                    </div>

                    <div className="theory-app-box mt-2">
                      <span className="app-label">Pettah Bazaar Application:</span>
                      <PointList points={row.points || [row.application]} color="gold" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="slide-subcard-container animate-fade-in">
            <div className="marketing-concepts-table-container flex-1 min-h-0 overflow-hidden">
              <table className="marketing-theory-table w-full">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>Core Marketing Concept</th>
                    <th style={{ width: '38%' }}>Academic Theoretical Definition (Kotler & Armstrong)</th>
                    <th style={{ width: '40%' }}>Practical Application to Pettah Bazaar</th>
                  </tr>
                </thead>
                <tbody>
                  {currentConceptItems.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                      <td className="concept-cell">
                        <strong>{row.concept}</strong>
                      </td>
                      <td className="academic-cell">{row.academicDefinition}</td>
                      <td className="application-cell">
                        <PointList points={row.points || [row.application]} color="gold" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slide 9: Market Segmentation Framework
  if (slide.id === 9) {
    const personas = [
      {
        name: "Kasun — 22",
        role: "Robotics Student @ KDU",
        target: "1st Cross Street (Electronics)",
        goal: "Find Arduino sensors & breadboards at lowest wholesale price without walking for 2 hours.",
        badge: "Tech Enthusiast"
      },
      {
        name: "Fathima — 34",
        role: "Wedding Dress Shopper",
        target: "2nd Cross Street (Textiles)",
        goal: "Locate specific imported silk fabrics among 40+ stalls without getting lost in the heat.",
        badge: "High-Value Buyer"
      },
      {
        name: "Ramesh — 45",
        role: "Outstation Grocery Retailer",
        target: "Bankshall Street (Spices)",
        goal: "Purchase pure grade-A cinnamon & cardamom sacks directly from verified wholesalers.",
        badge: "Commercial Buyer"
      }
    ];

    const tabs9 = [
      { label: "Card 1: 4 Segmentation Variables (Geographic, Demographic, Psychographic, Behavioural)", icon: <Users className="w-3.5 h-3.5 mr-1 text-teal-300" /> },
      { label: "Card 2: 3 Target Customer Archetypes & Academic Context", icon: <Target className="w-3.5 h-3.5 mr-1 text-orange-400" /> }
    ];

    return (
      <div className={`slide-content ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag stp">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <SubCardNav activeIndex={subCard9} onSelect={setSubCard9} tabs={tabs9} />

        {subCard9 === 0 && (
          <div className="slide-subcard-container animate-fade-in">
            <div className="segmentation-quad-grid flex-1 min-h-0">
              {slide.segments.map((seg, idx) => (
                <div key={idx} className="segment-card visual-interactive-card flex flex-col justify-between">
                  <div>
                    <div className="segment-header">
                      <div className="segment-icon-wrap">
                        {seg.variable === 'Geographic' && <MapPin className="w-5 h-5 text-cyan-400" />}
                        {seg.variable === 'Demographic' && <Users className="w-5 h-5 text-primary-flame" />}
                        {seg.variable === 'Psychographic' && <Zap className="w-5 h-5 text-gold-400" />}
                        {seg.variable === 'Behavioural' && <Smartphone className="w-5 h-5 text-pink-400" />}
                      </div>
                      <div>
                        <h4 className="segment-var-title font-bold text-sm">{seg.variable}</h4>
                        <span className="segment-focus-tag text-xs">{seg.focus}</span>
                      </div>
                    </div>
                    
                    {/* Point-wise presentation bullet items */}
                    <PointList 
                      points={seg.points || [seg.details]} 
                      color={idx === 0 ? "cyan" : idx === 1 ? "orange" : idx === 2 ? "gold" : "pink"} 
                    />
                  </div>

                  {/* Visual Persona Chips */}
                  <div className="segment-persona-chips mt-2">
                    {idx === 0 && (
                      <>
                        <span className="persona-chip">Colombo 11 Stalls</span>
                        <span className="persona-chip">Outstation Wholesale Buyers</span>
                      </>
                    )}
                    {idx === 1 && (
                      <>
                        <span className="persona-chip">Age 18–35</span>
                        <span className="persona-chip">Tech Students & Tailors</span>
                      </>
                    )}
                    {idx === 2 && (
                      <>
                        <span className="persona-chip">Efficiency Focused</span>
                        <span className="persona-chip">Smart Budget Shoppers</span>
                      </>
                    )}
                    {idx === 3 && (
                      <>
                        <span className="persona-chip">Specific Item Searchers</span>
                        <span className="persona-chip">First-Time Visitors</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {subCard9 === 1 && (
          <div className="slide-subcard-container animate-fade-in">
            {/* Interactive Target Persona Cards Bar */}
            <div className="interactive-personas-bar flex-1 min-h-0 flex flex-col justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-700/60">
              <div className="personas-header">
                <span className="font-bold text-white text-base">Select Customer Archetype Profile:</span>
                <div className="persona-tabs">
                  {personas.map((p, idx) => (
                    <button 
                      key={idx}
                      className={`persona-tab-btn ${activePersona === idx ? 'active' : ''}`}
                      onClick={() => setActivePersona(idx)}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="persona-details-card animate-fade-in my-3 p-4 bg-slate-800/80 rounded-xl border border-teal-500/30">
                <div className="persona-left">
                  <div className="persona-avatar-wrap">
                    <Users className="w-8 h-8 text-primary-flame" />
                  </div>
                  <div>
                    <h5 className="persona-title text-lg font-bold text-white">{personas[activePersona].name}</h5>
                    <span className="persona-role-tag text-xs text-teal-300 font-semibold">{personas[activePersona].role}</span>
                  </div>
                </div>
                <div className="persona-center">
                  <div className="persona-item mb-2 text-sm">
                    <MapPin className="w-4 h-4 text-cyan-400 mr-2" />
                    <span>Target Street: <strong className="text-white">{personas[activePersona].target}</strong></span>
                  </div>
                  <div className="persona-item text-sm">
                    <Target className="w-4 h-4 text-gold-400 mr-2" />
                    <span>Primary Goal: <em className="text-slate-200">"{personas[activePersona].goal}"</em></span>
                  </div>
                </div>
                <div className="persona-right">
                  <span className="persona-badge-tag text-xs font-bold px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full">{personas[activePersona].badge}</span>
                </div>
              </div>

              <div className="academic-summary-note p-3 rounded-lg bg-slate-900/80 border border-slate-700/80 flex items-center">
                <Info className="w-5 h-5 text-primary-flame mr-2 flex-shrink-0" />
                <span className="text-slate-300 text-xs leading-relaxed">{slide.summaryNote}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slide 10: Targeting & Positioning Strategy
  if (slide.id === 10) {
    const tabs10 = [
      { label: "Card 1: Target Market Prioritization (Bullseye & Cohorts)", icon: <Target className="w-3.5 h-3.5 mr-1 text-teal-300" /> },
      { label: "Card 2: Strategic Positioning Map & Formal Statement", icon: <Crosshair className="w-3.5 h-3.5 mr-1 text-orange-400" /> }
    ];

    return (
      <div className={`slide-content ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag stp">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <SubCardNav activeIndex={subCard10} onSelect={setSubCard10} tabs={tabs10} />

        {subCard10 === 0 && (
          <div className="slide-subcard-container animate-fade-in">
            <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
              <div className="bullseye-diagram-card flex flex-col justify-between">
                <div>
                  <div className="bullseye-header">
                    <Target className="w-4 h-4 text-primary-flame mr-1.5" />
                    <span>Target Market Prioritization (Bullseye Analysis)</span>
                  </div>
                  
                  <div className="bullseye-rings-visual mt-2">
                    <div className="ring outer-ring">
                      <span className="ring-label">Broad Colombo Retail Visitors</span>
                      <div className="ring middle-ring">
                        <span className="ring-label">Secondary: Outstation Buyers & Tech Students</span>
                        <div className="ring inner-ring">
                          <span className="ring-label active-bullseye">🎯 Primary Target: Shoppers Seeking Specific Items</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="primary-cohort-box mt-2 p-2.5 bg-slate-900/80 rounded-lg border border-primary-flame/40">
                  <div className="font-bold text-primary-flame text-xs mb-1">{slide.targetGroups.primary.title}</div>
                  <div className="text-white text-[11px] font-semibold mb-1">{slide.targetGroups.primary.cohort}</div>
                  <PointList points={slide.targetGroups.primary.points} color="orange" />
                </div>
              </div>

              <div className="secondary-targets-list flex flex-col justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/60">
                <div className="secondary-header font-bold text-white text-xs mb-1.5">Secondary Market Cohorts (Specialized Audiences):</div>
                <div className="grid grid-cols-1 gap-1.5 flex-1">
                  {slide.targetGroups.secondary.map((sec, idx) => (
                    <div key={idx} className="secondary-item p-2 rounded-lg bg-slate-800/80 border border-slate-700/80">
                      <div className="font-bold text-cyan-300 text-xs mb-1">{sec.name}</div>
                      <PointList points={sec.points} color="cyan" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {subCard10 === 1 && (
          <div className="slide-subcard-container animate-fade-in">
            <div className="targeting-positioning-grid flex-1 min-h-0">
              {/* Left: Perceptual Positioning Map */}
              <div className="target-col">
                <div className="perceptual-map-card h-full flex flex-col">
                  <div className="map-title-bar">
                    <Crosshair className="w-4 h-4 text-primary-flame mr-1.5" />
                    <span>Strategic Perceptual Positioning Map (2x2 Matrix)</span>
                  </div>
                  
                  <div className="perceptual-matrix flex-1">
                    <div className="matrix-axis y-top">⚡ Lightweight Instant PWA</div>
                    <div className="matrix-axis y-bottom">📱 Heavy / Complex App</div>
                    <div className="matrix-axis x-left">🌐 Generic National Directory</div>
                    <div className="matrix-axis x-right">📍 Hyper-Local Pettah Specialty</div>

                    {/* Competitor Plot Points */}
                    <div className="plot-point comp-google" title="Google Maps: Heavy & Generic">
                      <span className="point-dot gray"></span>
                      <span className="point-label">Google Maps</span>
                    </div>

                    <div className="plot-point comp-ikman" title="Ikman.lk: Generic Classifieds">
                      <span className="point-dot gray"></span>
                      <span className="point-label">Ikman.lk</span>
                    </div>

                    <div className="plot-point comp-social" title="Facebook / TikTok: Unorganized Content">
                      <span className="point-dot gray"></span>
                      <span className="point-label">Social Media</span>
                    </div>

                    {/* Pettah Bazaar in Golden Top Right */}
                    <div className="plot-point us-pettah animate-pulse" title="Pettah Bazaar: Hyper-Local + Lightweight">
                      <span className="point-dot orange"></span>
                      <span className="point-label-us">🔥 PETTAH BAZAAR (Uncontested Niche)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Positioning Statement & Tagline */}
              <div className="positioning-col">
                <div className="formal-positioning-card visual-glow-card h-full flex flex-col justify-between">
                  <div>
                    <div className="card-top-tag">FORMAL POSITIONING STATEMENT</div>
                    <blockquote className="positioning-statement text-sm leading-relaxed my-2">
                      {slide.positioningStatement}
                    </blockquote>

                    <div className="positioning-breakdown mt-2">
                      <div className="breakdown-item">
                        <span className="item-label text-xs">Target Customer:</span>
                        <span className="item-val text-xs">Shoppers visiting Pettah seeking specific items</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="item-label text-xs">Core Benefit:</span>
                        <span className="item-val text-xs">Frictionless product-to-shop discovery & time savings</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="item-label text-xs">Competitive Edge:</span>
                        <span className="item-val text-xs">Hyper-local Pettah street precision (not broad generic pins)</span>
                      </div>
                    </div>
                  </div>

                  <div className="tagline-callout-box mt-3">
                    <span className="tagline-label">OFFICIAL BRAND TAGLINE:</span>
                    <span className="tagline-big">“{slide.taglineEmphasis}”</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slide 11: Competitor Analysis Matrix
  if (slide.id === 11) {
    const tabs11 = [
      { label: "Card 1: Competitor Comparison Matrix Table (Cross-Channel Benchmarks)", icon: <LayoutGrid className="w-3.5 h-3.5 mr-1 text-teal-300" /> },
      { label: "Card 2: Competitor Fit Scores & Key Strategic Advantages", icon: <TrendingUp className="w-3.5 h-3.5 mr-1 text-orange-400" /> }
    ];

    return (
      <div className={`slide-content ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag competitor">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <SubCardNav activeIndex={subCard11} onSelect={setSubCard11} tabs={tabs11} />

        {subCard11 === 0 && (
          <div className="slide-subcard-container animate-fade-in">
            <div className="competitor-matrix-wrap flex-1 min-h-0 overflow-hidden">
              <table className="competitor-table w-full">
                <thead>
                  <tr>
                    <th style={{ width: '18%' }}>Alternative / Channel</th>
                    <th style={{ width: '20%' }}>Product-Level Discovery</th>
                    <th style={{ width: '18%' }}>Shop-Location Info</th>
                    <th style={{ width: '14%' }}>Convenience</th>
                    <th style={{ width: '30%' }}>Strengths & Key Limitations</th>
                  </tr>
                </thead>
                <tbody>
                  {slide.competitors.map((comp, idx) => {
                    const isUs = comp.channel.includes('Pettah Bazaar');
                    return (
                      <tr key={idx} className={isUs ? 'highlight-row' : ''}>
                        <td className="channel-cell">
                          <strong>{comp.channel}</strong>
                          {isUs && <span className="our-badge">Our Solution</span>}
                        </td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <span className={`status-dot ${isUs ? 'green' : idx === 0 ? 'amber' : 'red'}`}></span>
                            <span>{comp.discovery}</span>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <span className={`status-dot ${isUs ? 'green' : idx === 0 ? 'green' : 'amber'}`}></span>
                            <span>{comp.location}</span>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <span className={`status-dot ${isUs ? 'green' : 'red'}`}></span>
                            <span>{comp.convenience}</span>
                          </div>
                        </td>
                        <td>
                          <div className="strengths-limits-box">
                            <div><strong className="text-emerald-400">✓ Strength:</strong> {comp.strengths}</div>
                            <div><strong className="text-orange-400">✗ Limitation:</strong> {comp.limitations}</div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {subCard11 === 1 && (
          <div className="slide-subcard-container animate-fade-in">
            {/* Competitor Match Scorecard Bars */}
            <div className="competitor-score-strip">
              <div className="comp-score-item pb">
                <div className="comp-score-top">
                  <span className="comp-name">Pettah Bazaar</span>
                  <span className="comp-percent text-primary-flame">96% Fit</span>
                </div>
                <div className="comp-score-track">
                  <div className="comp-score-fill orange" style={{ width: '96%' }}></div>
                </div>
              </div>

              <div className="comp-score-item">
                <div className="comp-score-top">
                  <span className="comp-name">Google Maps</span>
                  <span className="comp-percent text-slate-400">42% Fit</span>
                </div>
                <div className="comp-score-track">
                  <div className="comp-score-fill gray" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div className="comp-score-item">
                <div className="comp-score-top">
                  <span className="comp-name">Social Media Posts</span>
                  <span className="comp-percent text-slate-400">35% Fit</span>
                </div>
                <div className="comp-score-track">
                  <div className="comp-score-fill gray" style={{ width: '35%' }}></div>
                </div>
              </div>

              <div className="comp-score-item">
                <div className="comp-score-top">
                  <span className="comp-name">Physical Inquiry</span>
                  <span className="comp-percent text-slate-400">18% Fit</span>
                </div>
                <div className="comp-score-track">
                  <div className="comp-score-fill gray" style={{ width: '18%' }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-1 min-h-0 mt-2">
              {slide.competitors.map((comp, idx) => {
                const isUs = comp.channel.includes('Pettah Bazaar');
                return (
                  <div key={idx} className={`spacious-strategy-card ${isUs ? 'border-primary-flame/60 bg-slate-900/90' : 'bg-slate-900/60'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <strong className={`text-sm font-bold ${isUs ? 'text-primary-flame' : 'text-white'}`}>{comp.channel}</strong>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${isUs ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' : 'bg-slate-800 text-slate-300'}`}>
                        {isUs ? '96% Fit' : idx === 0 ? '42% Fit' : idx === 1 ? '35% Fit' : '18% Fit'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 space-y-1.5 flex-1">
                      <div><strong className="text-emerald-400">✓ Core Advantage:</strong> {comp.strengths}</div>
                      <div><strong className="text-orange-400">✗ Strategic Limitation:</strong> {comp.limitations}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="academic-competitor-note mt-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/80 flex items-center">
              <Scale className="w-4 h-4 text-primary-flame mr-2 flex-shrink-0" />
              <span className="text-slate-300 text-xs leading-relaxed">{slide.keyTakeaway}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slide 12: 1. Product Strategy (Marketing Mix 7Ps — Part 1: Slidable Cards)
  if (slide.id === 12) {
    return (
      <div className={`slide-content seven-ps-slide ${animClass} ${spotlightClass}`}>
        {/* Compact Header Bar */}
        <div className="slide-header-bar compact-7ps">
          <div>
            <span className="section-tag mix">MARKETING MIX (7Ps) • SLIDE 1 OF 4</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="seven-ps-tagline-chip">“{slide.tagline}”</span>
            <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
          </div>
        </div>

        {/* Slidable Card Sub-Tabs Switcher */}
        <div className="seven-ps-subtabs-row">
          <div className="subtabs-pills">
            <button 
              className={`subtab-pill-btn proto-pill ${subCard12 === 0 ? 'active' : ''}`}
              onClick={() => setSubCard12(0)}
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-teal-300" />
              <span>Card 1: Available in Our Prototype (Operational Now)</span>
            </button>
            <button 
              className={`subtab-pill-btn proposed-pill ${subCard12 === 1 ? 'active' : ''}`}
              onClick={() => setSubCard12(1)}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-orange-400" />
              <span>Card 2: Proposed Future Roadmap (Strategic Enhancements)</span>
            </button>
          </div>

          <div className="subtabs-nav-arrows">
            <button 
              className="subtab-arrow-btn"
              onClick={() => setSubCard12(prev => prev > 0 ? prev - 1 : 1)}
              title="Previous Card"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Card</span>
            </button>
            <span className="subtab-indicator-counter">{subCard12 + 1} / 2</span>
            <button 
              className="subtab-arrow-btn primary"
              onClick={() => setSubCard12(prev => prev < 1 ? prev + 1 : 0)}
              title="Next Card"
            >
              <span>Next Card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 1: Available in Our Prototype (Operational Now) */}
        {subCard12 === 0 && (
          <div className="seven-ps-active-card-container animate-fade-in">
            {/* Customer Value & Benefit Highlight Banner */}
            <div className="seven-ps-benefit-banner">
              <div className="benefit-icon-wrap product">
                <ShoppingBag className="w-5 h-5 text-teal-300" />
              </div>
              <div className="benefit-text-wrap">
                <div className="benefit-label-row">
                  <span className="benefit-badge">1. Product</span>
                  <span className="benefit-title">Customer Value & Benefit:</span>
                  <span className="benefit-pill">Time Savings & Direct Convenience</span>
                </div>
                <p className="benefit-description">{slide.customerBenefit}</p>
              </div>
            </div>

            {/* Split Content: 4 Operational Features + Large Prototype Screenshot */}
            <div className="card-detail-two-col mt-2">
              <div className="detail-col-features">
                <div className="col-top-badge proto mb-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mr-1.5" />
                  <strong className="text-teal-300 text-sm">4 Operational Features Built in Working Prototype:</strong>
                </div>
                <div className="features-spacious-grid">
                  {slide.features.prototype.items.map((item, idx) => (
                    <div key={idx} className="spacious-feature-card proto">
                      <div className="feature-top-header">
                        <span className="feature-dot-badge teal">{idx + 1}</span>
                        <h4 className="feature-head text-white text-sm font-bold">{item.title}</h4>
                      </div>
                      <p className="feature-body-text text-slate-200 text-xs mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Live Prototype Screen Showcase */}
              <div className="detail-col-media">
                <div className="media-large-frame proto-frame">
                  <div className="frame-header-strip">
                    <span className="text-xs font-bold text-teal-300 flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 mr-1 text-teal-400" />
                      Live Working Prototype Interface
                    </span>
                    <span className="verified-chip text-[10px]">pettah-bazaar.vercel.app</span>
                  </div>
                  <div className="frame-image-wrap">
                    <img 
                      src={slide.prototypeImage} 
                      alt="Pettah Bazaar Prototype Screenshot" 
                      className="frame-full-img"
                    />
                  </div>
                  <div className="frame-footer-caption">
                    <span className="text-slate-300 text-xs">
                      Clean mobile-first UI with product query matching & sector filters.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card 2: Proposed Future Roadmap (Strategic Enhancements) */}
        {subCard12 === 1 && (
          <div className="seven-ps-active-card-container animate-fade-in">
            {/* Customer Value & Benefit Highlight Banner */}
            <div className="seven-ps-benefit-banner proposed-banner">
              <div className="benefit-icon-wrap proposed-icon">
                <Sparkles className="w-5 h-5 text-orange-400" />
              </div>
              <div className="benefit-text-wrap">
                <div className="benefit-label-row">
                  <span className="benefit-badge orange">Proposed Strategy</span>
                  <span className="benefit-title">Long-Term Customer Value:</span>
                  <span className="benefit-pill">Verified Stalls & Foot Guidance</span>
                </div>
                <p className="benefit-description">
                  Expanding shop verification, direct merchant WhatsApp inquiries, and indoor alleyway guidance to further streamline the shopper journey.
                </p>
              </div>
            </div>

            {/* Split Content: 4 Proposed Roadmap Features + Pettah Alley Context Image */}
            <div className="card-detail-two-col mt-2">
              <div className="detail-col-features">
                <div className="col-top-badge proposed mb-2">
                  <Sparkles className="w-4 h-4 text-orange-400 mr-1.5" />
                  <strong className="text-orange-300 text-sm">4 Proposed Features in Strategic Roadmap:</strong>
                </div>
                <div className="features-spacious-grid">
                  {slide.features.proposed.items.map((item, idx) => (
                    <div key={idx} className="spacious-feature-card proposed">
                      <div className="feature-top-header">
                        <span className="feature-dot-badge orange">{idx + 1}</span>
                        <h4 className="feature-head text-white text-sm font-bold">{item.title}</h4>
                      </div>
                      <p className="feature-body-text text-slate-200 text-xs mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Pettah Alleys Context Image */}
              <div className="detail-col-media">
                <div className="media-large-frame proposed-frame">
                  <div className="frame-header-strip orange-strip">
                    <span className="text-xs font-bold text-orange-300 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-orange-400" />
                      Colombo 11 Micro-Alleys Context
                    </span>
                    <span className="verified-chip text-[10px]">Future Target</span>
                  </div>
                  <div className="frame-image-wrap">
                    <img 
                      src={slide.marketImage} 
                      alt="Pettah Cross Street Alley" 
                      className="frame-full-img"
                    />
                  </div>
                  <div className="frame-footer-caption">
                    <span className="text-slate-300 text-xs">
                      Dense pedestrian corridors where future indoor foot directions will be applied.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Academic Note */}
        <div className="seven-ps-academic-note compact-note">
          <AlertCircle className="w-4 h-4 text-teal-400 mr-2 flex-shrink-0" />
          <span>
            <strong>Academic Distinction:</strong> Prototype features (Card 1) are operational in our live prototype; roadmap features (Card 2) represent proposed enhancements for capstone grading.
          </span>
        </div>
      </div>
    );
  }

  // Slide 13: 2. Price & 3. Place Strategy (Marketing Mix 7Ps — Part 2: Slidable Cards)
  if (slide.id === 13) {
    const streets = {
      '1st': { name: "1st Cross Street", specialty: "Electronics, Microcontrollers, Audio & Mobile Tech", shops: "8 Verified Tech Stalls" },
      '2nd': { name: "2nd Cross Street", specialty: "Textiles, Silk Sarees, Center Point & Wholesale Fabric", shops: "12 Verified Saree Stalls" },
      'bankshall': { name: "Bankshall Street", specialty: "Pure Ceylon Spices, Cinnamon, Cardamom & Ayurvedic Herbs", shops: "6 Spice Wholesalers" },
      'keyzer': { name: "Keyzer Street", specialty: "Hardware, Electrical Tools & Raw Manufacturing Supplies", shops: "9 Hardware Emporiums" }
    };

    return (
      <div className={`slide-content seven-ps-slide ${animClass} ${spotlightClass}`}>
        {/* Compact Header Bar */}
        <div className="slide-header-bar compact-7ps">
          <div>
            <span className="section-tag mix">MARKETING MIX (7Ps) • SLIDE 2 OF 4</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="seven-ps-tagline-chip">“{slide.tagline}”</span>
            <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
          </div>
        </div>

        {/* Slidable Card Sub-Tabs Switcher */}
        <div className="seven-ps-subtabs-row">
          <div className="subtabs-pills">
            <button 
              className={`subtab-pill-btn ${subCard13 === 0 ? 'active' : ''}`}
              onClick={() => setSubCard13(0)}
            >
              <DollarSign className="w-3.5 h-3.5 mr-1 text-teal-300" />
              <span>Card 1: 2. Price Strategy (Zero-Barrier Customer Adoption)</span>
            </button>
            <button 
              className={`subtab-pill-btn ${subCard13 === 1 ? 'active' : ''}`}
              onClick={() => setSubCard13(1)}
            >
              <MapPin className="w-3.5 h-3.5 mr-1 text-teal-300" />
              <span>Card 2: 3. Place Strategy (Digital Distribution & Streets)</span>
            </button>
          </div>

          <div className="subtabs-nav-arrows">
            <button 
              className="subtab-arrow-btn"
              onClick={() => setSubCard13(prev => prev > 0 ? prev - 1 : 1)}
              title="Previous Card"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Card</span>
            </button>
            <span className="subtab-indicator-counter">{subCard13 + 1} / 2</span>
            <button 
              className="subtab-arrow-btn primary"
              onClick={() => setSubCard13(prev => prev < 1 ? prev + 1 : 0)}
              title="Next Card"
            >
              <span>Next Card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 1: Price Strategy */}
        {subCard13 === 0 && (
          <div className="seven-ps-active-card-container animate-fade-in">
            {/* Customer Benefit Banner for Price */}
            <div className="seven-ps-benefit-banner">
              <div className="benefit-icon-wrap product">
                <DollarSign className="w-5 h-5 text-teal-300" />
              </div>
              <div className="benefit-text-wrap">
                <div className="benefit-label-row">
                  <span className="benefit-badge">2. Price</span>
                  <span className="benefit-title">Customer Value & Benefit:</span>
                  <span className="benefit-pill">Zero Cost Barrier & Fair Merchant Access</span>
                </div>
                <p className="benefit-description">{slide.priceStrategy.customerBenefit}</p>
              </div>
            </div>

            {/* 4 Spacious Price Strategy Cards in 2x2 Grid */}
            <div className="spacious-four-grid mt-2">
              {slide.priceStrategy.points.map((pt, idx) => (
                <div key={idx} className="spacious-strategy-card">
                  <div className="strategy-card-header">
                    <span className="strategy-pill-badge teal">{pt.badge}</span>
                    <strong className="strategy-card-heading text-white text-sm">{pt.title}</strong>
                  </div>
                  <p className="strategy-card-text text-slate-200 text-xs mt-2 leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </div>

            {/* Price Summary Bar */}
            <div className="pricing-summary-bar mt-2.5">
              <Scale className="w-4 h-4 text-teal-300 mr-1.5 flex-shrink-0" />
              <span className="text-xs text-slate-200">
                <strong>Platform Affordability & Transparency:</strong> Ensures basic inclusion is free for traditional shopkeepers, while any future paid promotions will be explicitly labeled.
              </span>
            </div>
          </div>
        )}

        {/* Card 2: Place Strategy */}
        {subCard13 === 1 && (
          <div className="seven-ps-active-card-container animate-fade-in">
            {/* Customer Benefit Banner for Place */}
            <div className="seven-ps-benefit-banner">
              <div className="benefit-icon-wrap product">
                <MapPin className="w-5 h-5 text-teal-300" />
              </div>
              <div className="benefit-text-wrap">
                <div className="benefit-label-row">
                  <span className="benefit-badge">3. Place</span>
                  <span className="benefit-title">Customer Value & Benefit:</span>
                  <span className="benefit-pill">Omnichannel On-The-Go Discovery</span>
                </div>
                <p className="benefit-description">{slide.placeStrategy.customerBenefit}</p>
              </div>
            </div>

            <div className="card-detail-two-col mt-2">
              {/* Left: 4 Place Strategy Cards */}
              <div className="detail-col-features">
                <div className="features-spacious-grid">
                  {slide.placeStrategy.points.map((pt, idx) => (
                    <div key={idx} className="spacious-strategy-card">
                      <div className="strategy-card-header">
                        <span className="strategy-pill-badge teal">{pt.badge}</span>
                        <strong className="strategy-card-heading text-white text-sm">{pt.title}</strong>
                      </div>
                      <p className="strategy-card-text text-slate-200 text-xs mt-1.5 leading-relaxed">{pt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Interactive Street Specialty Explorer & Traffic Context */}
              <div className="detail-col-media">
                <div className="street-micro-selector">
                  <div className="text-xs font-semibold text-slate-200 mb-1.5 flex items-center">
                    <Compass className="w-3.5 h-3.5 text-teal-300 mr-1.5" />
                    Interactive Pettah Micro-District Specialty Explorer:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.keys(streets).map((key) => (
                      <button
                        key={key}
                        className={`micro-street-btn ${selectedStreet === key ? 'active' : ''}`}
                        onClick={() => setSelectedStreet(key)}
                      >
                        {streets[key].name}
                      </button>
                    ))}
                  </div>
                  <div className="micro-street-details mt-2 p-2.5 rounded bg-slate-900/90 border border-teal-500/35">
                    <div className="font-bold text-teal-300 text-sm">{streets[selectedStreet]?.name}:</div>
                    <div className="text-slate-200 text-xs mt-1">{streets[selectedStreet]?.specialty}</div>
                    <span className="shops-count-badge mt-1.5 inline-block text-[11px] text-orange-300 font-semibold">
                      {streets[selectedStreet]?.shops}
                    </span>
                  </div>
                </div>

                <div className="media-large-frame mt-2" style={{ maxHeight: '115px' }}>
                  <img 
                    src={slide.marketImage} 
                    alt="Colombo Traffic & Lotus Tower" 
                    className="frame-full-img"
                    style={{ maxHeight: '115px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slide 14: 4. Promotion & 5. People Strategy (Marketing Mix 7Ps — Part 3: Slidable Cards)
  if (slide.id === 14) {
    return (
      <div className={`slide-content seven-ps-slide ${animClass} ${spotlightClass}`}>
        {/* Compact Header Bar */}
        <div className="slide-header-bar compact-7ps">
          <div>
            <span className="section-tag mix">MARKETING MIX (7Ps) • SLIDE 3 OF 4</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="seven-ps-tagline-chip">“{slide.tagline}”</span>
            <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
          </div>
        </div>

        {/* Slidable Card Sub-Tabs Switcher */}
        <div className="seven-ps-subtabs-row">
          <div className="subtabs-pills">
            <button 
              className={`subtab-pill-btn ${subCard14 === 0 ? 'active' : ''}`}
              onClick={() => setSubCard14(0)}
            >
              <Megaphone className="w-3.5 h-3.5 mr-1 text-teal-300" />
              <span>Card 1: 4. Promotion Strategy (Digital & Transit Outreach)</span>
            </button>
            <button 
              className={`subtab-pill-btn ${subCard14 === 1 ? 'active' : ''}`}
              onClick={() => setSubCard14(1)}
            >
              <Users className="w-3.5 h-3.5 mr-1 text-teal-300" />
              <span>Card 2: 5. People Strategy (Human Collaboration & Trust)</span>
            </button>
          </div>

          <div className="subtabs-nav-arrows">
            <button 
              className="subtab-arrow-btn"
              onClick={() => setSubCard14(prev => prev > 0 ? prev - 1 : 1)}
              title="Previous Card"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Card</span>
            </button>
            <span className="subtab-indicator-counter">{subCard14 + 1} / 2</span>
            <button 
              className="subtab-arrow-btn primary"
              onClick={() => setSubCard14(prev => prev < 1 ? prev + 1 : 0)}
              title="Next Card"
            >
              <span>Next Card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 1: Promotion Strategy */}
        {subCard14 === 0 && (
          <div className="seven-ps-active-card-container animate-fade-in">
            {/* Customer Benefit Banner for Promotion */}
            <div className="seven-ps-benefit-banner">
              <div className="benefit-icon-wrap product">
                <Megaphone className="w-5 h-5 text-teal-300" />
              </div>
              <div className="benefit-text-wrap">
                <div className="benefit-label-row">
                  <span className="benefit-badge">4. Promotion</span>
                  <span className="benefit-title">Customer Value & Benefit:</span>
                  <span className="benefit-pill">“Find the Shop. Save Your Time.”</span>
                </div>
                <p className="benefit-description">{slide.promotionStrategy.customerBenefit}</p>
              </div>
            </div>

            <div className="card-detail-two-col mt-2">
              {/* Left: 5 Promotional Strategy Points */}
              <div className="detail-col-features">
                <div className="features-spacious-grid">
                  {slide.promotionStrategy.points.map((pt, idx) => (
                    <div key={idx} className="spacious-strategy-card">
                      <div className="strategy-card-header">
                        <span className="strategy-pill-badge teal">{pt.channel}</span>
                        <strong className="strategy-card-heading text-white text-sm">{pt.title}</strong>
                      </div>
                      <p className="strategy-card-text text-slate-200 text-xs mt-1.5 leading-relaxed">{pt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Short Video Reel Simulation Card + Mobile Prototype Hand Mockup */}
              <div className="detail-col-media">
                <div className="viral-reel-card">
                  <div className="reel-header">
                    <Flame className="w-4 h-4 text-orange-400 mr-1.5 animate-pulse" />
                    <span className="text-xs font-semibold text-white">Social Video Campaign (TikTok / Reels)</span>
                    <span className="live-pill text-[10px]">Active Concept</span>
                  </div>
                  <div className="reel-body">
                    <p className="text-xs text-slate-200 italic mb-2">
                      "POV: Finding wholesale electronics in Pettah under 60 seconds with Pettah Bazaar ⚡ #ColomboHacks #PettahBazaar"
                    </p>
                    <div className="reel-metrics">
                      <span>❤️ 4.8K Likes</span>
                      <span>💬 382 Comments</span>
                      <span>↗️ 1.2K Shares</span>
                      <span>👀 48.5K Views</span>
                    </div>
                  </div>
                </div>

                <div className="media-large-frame mt-2" style={{ maxHeight: '140px' }}>
                  <img 
                    src={slide.appMockup} 
                    alt="Pettah Bazaar Mobile Mockup" 
                    className="frame-full-img"
                    style={{ maxHeight: '140px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card 2: People Strategy */}
        {subCard14 === 1 && (
          <div className="seven-ps-active-card-container animate-fade-in">
            {/* Customer Benefit Banner for People */}
            <div className="seven-ps-benefit-banner">
              <div className="benefit-icon-wrap product">
                <Users className="w-5 h-5 text-teal-300" />
              </div>
              <div className="benefit-text-wrap">
                <div className="benefit-label-row">
                  <span className="benefit-badge">5. People</span>
                  <span className="benefit-title">Customer Value & Benefit:</span>
                  <span className="benefit-pill">Human Collaboration & Authentic Data</span>
                </div>
                <p className="benefit-description">{slide.peopleStrategy.customerBenefit}</p>
              </div>
            </div>

            {/* 4 Core Stakeholders Grid */}
            <div className="spacious-four-grid mt-2">
              {slide.peopleStrategy.stakeholders.map((stk, idx) => (
                <div key={idx} className="spacious-strategy-card stakeholder-card-box">
                  <div className="strategy-card-header">
                    <span className="strategy-pill-badge teal">{stk.badge}</span>
                    <strong className="strategy-card-heading text-white text-sm">{stk.role}</strong>
                  </div>
                  <p className="strategy-card-text text-slate-200 text-xs mt-2 leading-relaxed">{stk.desc}</p>
                </div>
              ))}
            </div>

            {/* Why Human Cooperation is Crucial Callout */}
            <div className="people-crucial-callout mt-2.5">
              <div className="flex items-start gap-2.5">
                <HeartHandshake className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-teal-300 text-xs block mb-1">Why Cooperation with Shop Owners Matters in Pettah:</strong>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    {slide.peopleStrategy.importanceStatement}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slide 15: 6. Process & 7. Physical Evidence (Marketing Mix 7Ps — Part 4: Slidable Cards)
  if (slide.id === 15) {
    return (
      <div className={`slide-content seven-ps-slide ${animClass} ${spotlightClass}`}>
        {/* Compact Header Bar */}
        <div className="slide-header-bar compact-7ps">
          <div>
            <span className="section-tag mix">MARKETING MIX (7Ps) • SLIDE 4 OF 4</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="seven-ps-tagline-chip">“{slide.tagline}”</span>
            <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
          </div>
        </div>

        {/* Slidable Card Sub-Tabs Switcher */}
        <div className="seven-ps-subtabs-row">
          <div className="subtabs-pills">
            <button 
              className={`subtab-pill-btn ${subCard15 === 0 ? 'active' : ''}`}
              onClick={() => setSubCard15(0)}
            >
              <Workflow className="w-3.5 h-3.5 mr-1 text-teal-300" />
              <span>Card 1: 6. Process Strategy (5-Step Customer Flow Diagram)</span>
            </button>
            <button 
              className={`subtab-pill-btn ${subCard15 === 1 ? 'active' : ''}`}
              onClick={() => setSubCard15(1)}
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-teal-300" />
              <span>Card 2: 7. Physical Evidence Strategy (Tangible Proof)</span>
            </button>
          </div>

          <div className="subtabs-nav-arrows">
            <button 
              className="subtab-arrow-btn"
              onClick={() => setSubCard15(prev => prev > 0 ? prev - 1 : 1)}
              title="Previous Card"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Card</span>
            </button>
            <span className="subtab-indicator-counter">{subCard15 + 1} / 2</span>
            <button 
              className="subtab-arrow-btn primary"
              onClick={() => setSubCard15(prev => prev < 1 ? prev + 1 : 0)}
              title="Next Card"
            >
              <span>Next Card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 1: Process Strategy (5-Step Flow Diagram) */}
        {subCard15 === 0 && (
          <div className="seven-ps-active-card-container animate-fade-in">
            {/* Customer Benefit Banner for Process */}
            <div className="seven-ps-benefit-banner">
              <div className="benefit-icon-wrap product">
                <Workflow className="w-5 h-5 text-teal-300" />
              </div>
              <div className="benefit-text-wrap">
                <div className="benefit-label-row">
                  <span className="benefit-badge">6. Process</span>
                  <span className="benefit-title">Customer Value & Benefit:</span>
                  <span className="benefit-pill">Transparent 5-Step Shopping Journey</span>
                </div>
                <p className="benefit-description">{slide.processStrategy.customerBenefit}</p>
              </div>
            </div>

            {/* 5-Step Simple Flow Diagram */}
            <div className="process-flow-diagram spacious-flow mt-2.5">
              {slide.processStrategy.steps.map((st, idx) => (
                <React.Fragment key={st.step}>
                  <div 
                    className={`flow-step-card ${activeProcessStep === idx ? 'step-selected-highlight' : ''}`}
                    onClick={() => setActiveProcessStep(idx)}
                    title="Click to view details"
                  >
                    <div className="step-badge-circle">
                      <span className="step-num">{st.step}</span>
                    </div>
                    <div className="step-content">
                      <span className="step-sub-tag">{st.sub}</span>
                      <strong className="step-title-text">{st.name}</strong>
                      <p className="step-desc-text mt-1">{st.desc}</p>
                    </div>
                  </div>
                  {idx < slide.processStrategy.steps.length - 1 && (
                    <div className="flow-arrow-divider">
                      <ArrowRight className="w-5 h-5 text-teal-400 animate-pulse" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Active Step Highlight Card */}
            <div className="active-step-spotlight-bar mt-2.5">
              <span className="text-teal-300 font-bold text-xs uppercase tracking-wider mr-2">
                Active Step {slide.processStrategy.steps[activeProcessStep].step}:
              </span>
              <span className="text-white font-semibold text-xs mr-2">
                {slide.processStrategy.steps[activeProcessStep].name} —
              </span>
              <span className="text-slate-200 text-xs">
                {slide.processStrategy.steps[activeProcessStep].desc}
              </span>
            </div>
          </div>
        )}

        {/* Card 2: Physical Evidence Strategy */}
        {subCard15 === 1 && (
          <div className="seven-ps-active-card-container animate-fade-in">
            {/* Customer Benefit Banner for Physical Evidence */}
            <div className="seven-ps-benefit-banner">
              <div className="benefit-icon-wrap product">
                <ShieldCheck className="w-5 h-5 text-teal-300" />
              </div>
              <div className="benefit-text-wrap">
                <div className="benefit-label-row">
                  <span className="benefit-badge">7. Physical Evidence</span>
                  <span className="benefit-title">Customer Value & Benefit:</span>
                  <span className="benefit-pill">Tangible Trust & Verified Proof</span>
                </div>
                <p className="benefit-description">{slide.physicalEvidenceStrategy.customerBenefit}</p>
              </div>
            </div>

            <div className="card-detail-two-col mt-2">
              {/* Left: 5 Physical Evidence Elements */}
              <div className="detail-col-features">
                <div className="evidence-spacious-list">
                  {slide.physicalEvidenceStrategy.elements.map((ev, idx) => (
                    <div key={idx} className="spacious-evidence-item">
                      <div className="evidence-header-row">
                        <span className="evidence-pill-tag teal">{ev.tag}</span>
                        <CheckCircle className="w-4 h-4 text-teal-400 ml-auto" />
                      </div>
                      <h4 className="evidence-item-title text-white text-sm font-bold mt-1">{ev.title}</h4>
                      <p className="evidence-item-desc text-slate-200 text-xs mt-1 leading-relaxed">{ev.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: High-Res Prototype Screenshots Showcase */}
              <div className="detail-col-media">
                <div className="evidence-dual-showcase">
                  <div className="showcase-card">
                    <div className="showcase-header">
                      <span className="text-xs font-bold text-teal-300">Live Prototype Interface</span>
                      <span className="text-[10px] text-slate-400">Functional</span>
                    </div>
                    <img 
                      src={slide.prototypeImage} 
                      alt="Prototype Screen" 
                      className="showcase-img"
                    />
                    <div className="showcase-caption">
                      <span className="text-[11px] text-slate-200">Readable shop listings & location landmarks</span>
                    </div>
                  </div>

                  <div className="showcase-card">
                    <div className="showcase-header">
                      <span className="text-xs font-bold text-orange-300">Mobile On-Street Usability</span>
                      <span className="text-[10px] text-slate-400">Responsive PWA</span>
                    </div>
                    <img 
                      src={slide.handMockup} 
                      alt="Mobile Hand Mockup" 
                      className="showcase-img"
                    />
                    <div className="showcase-caption">
                      <span className="text-[11px] text-slate-200">High contrast for outdoor daylight viewing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slide 17: Prototype Demonstration (Interactive Prototype)
  if (slide.id === 17) {
    return (
      <div className={`slide-content proto-slide ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag prototype">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        {/* Live Interactive Prototype */}
        <InteractivePrototype />
      </div>
    );
  }

  // Slide 18: Ethics & Responsible Marketing
  if (slide.id === 18) {
    const tabs18 = [
      { label: "Card 1: Ethical Pillars 1–3 (Privacy, Transparent Pricing & Neutrality)", icon: <ShieldCheck className="w-3.5 h-3.5 mr-1 text-teal-300" /> },
      { label: "Card 2: Ethical Pillars 4–6 & Trust Commitment", icon: <HeartHandshake className="w-3.5 h-3.5 mr-1 text-orange-400" /> }
    ];

    const currentPillars = subCard18 === 0 ? slide.pillars.slice(0, 3) : slide.pillars.slice(3, 6);

    return (
      <div className={`slide-content ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag ethics">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <SubCardNav activeIndex={subCard18} onSelect={setSubCard18} tabs={tabs18} />

        {subCard18 === 0 && (
          <div className="slide-subcard-container animate-fade-in">
            <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
              {currentPillars.map((eth, idx) => (
                <div 
                  key={idx} 
                  className="ethics-card visual-interactive-card flex flex-col justify-between"
                >
                  <div>
                    <div className="ethics-header">
                      <div className="ethics-code-badge">{eth.code}</div>
                      <h4 className="ethics-title text-sm font-bold">{eth.title}</h4>
                    </div>
                    <PointList points={eth.points || [eth.desc]} color="emerald" />
                  </div>
                  
                  <div className="ethics-badge-tag mt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                    Verified Ethical Standard
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {subCard18 === 1 && (
          <div className="slide-subcard-container animate-fade-in">
            <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
              {currentPillars.map((eth, idx) => (
                <div 
                  key={idx} 
                  className="ethics-card visual-interactive-card flex flex-col justify-between"
                >
                  <div>
                    <div className="ethics-header">
                      <div className="ethics-code-badge">{eth.code}</div>
                      <h4 className="ethics-title text-sm font-bold">{eth.title}</h4>
                    </div>
                    <PointList points={eth.points || [eth.desc]} color="emerald" />
                  </div>
                  
                  <div className="ethics-badge-tag mt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                    Verified Ethical Standard
                  </div>
                </div>
              ))}
            </div>

            <div className="ethics-trust-statement visual-glow-banner mt-2">
              <ShieldCheck className="w-5 h-5 text-primary-flame mr-2 flex-shrink-0 animate-pulse" />
              <span className="text-xs leading-relaxed text-slate-200">
                <strong>Our Commitment to Trust:</strong> Responsible marketing requires that consumer and merchant trust is treated as the venture's most valuable asset. We maintain strict academic integrity, full price transparency, and verified data veracity.
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slide 19: Conclusion & Strategic Summary
  if (slide.id === 19) {
    const tabs19 = [
      { label: "Card 1: Executive Scorecard & Launch Celebration", icon: <Trophy className="w-3.5 h-3.5 mr-1 text-teal-300" /> },
      { label: "Card 2: 4 Strategic Recap Takeaways & Final Brand Mission", icon: <Sparkles className="w-3.5 h-3.5 mr-1 text-orange-400" /> }
    ];

    return (
      <div className={`slide-content ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag conclusion">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="celebrate-btn animate-pulse" onClick={triggerCelebration}>
              <Sparkles className="w-4 h-4 mr-1 text-gold-400" />
              Celebrate Launch 🎉
            </button>
            <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
          </div>
        </div>

        <SubCardNav activeIndex={subCard19} onSelect={setSubCard19} tabs={tabs19} />

        {subCard19 === 0 && (
          <div className="slide-subcard-container animate-fade-in">
            {/* 4-Pillar Executive Summary Scorecard */}
            <div className="executive-scorecard-strip">
              <div className="scorecard-item">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-1" />
                <div className="scorecard-val text-lg">Validated</div>
                <div className="scorecard-lbl">Real Market Problem</div>
              </div>
              <div className="scorecard-item">
                <Globe className="w-5 h-5 text-cyan-400 mb-1" />
                <div className="scorecard-val text-lg">Live Deployed</div>
                <div className="scorecard-lbl">Working PWA Prototype</div>
              </div>
              <div className="scorecard-item">
                <Scale className="w-5 h-5 text-gold-400 mb-1" />
                <div className="scorecard-val text-lg">Ethical & Free</div>
                <div className="scorecard-lbl">Vendor Empowerment</div>
              </div>
              <div className="scorecard-item">
                <Users className="w-5 h-5 text-primary-flame mb-1" />
                <div className="scorecard-val text-lg">10 Presenters</div>
                <div className="scorecard-lbl">KDU Intake 43 Team</div>
              </div>
            </div>

            <div className="spacious-strategy-card flex-1 min-h-0 mt-3 p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-white text-base font-bold mb-2 flex items-center">
                  <Award className="w-5 h-5 text-gold-400 mr-2" />
                  Key Strategic Milestones Delivered:
                </h4>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-teal-500/30">
                    <strong className="text-teal-300 text-xs block mb-1">1. Academic Rigor</strong>
                    <span className="text-slate-300 text-xs">Mapped to Kotler 7Ps, STP Segmentation, Perceptual Map, and ethical compliance standards.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-teal-500/30">
                    <strong className="text-teal-300 text-xs block mb-1">2. Market Viability</strong>
                    <span className="text-slate-300 text-xs">Verified high foot traffic in Pettah with genuine shopkeeper needs for digital discovery.</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-3">
                <button className="celebrate-btn text-sm px-6 py-2.5 animate-pulse" onClick={triggerCelebration}>
                  <Sparkles className="w-4 h-4 mr-2 text-gold-400" />
                  Click to Celebrate Project Launch 🎉
                </button>
              </div>
            </div>
          </div>
        )}

        {subCard19 === 1 && (
          <div className="slide-subcard-container animate-fade-in">
            <div className="recap-cards-grid flex-1 min-h-0">
              {slide.recapCards.map((rc, idx) => (
                <div key={idx} className="recap-card visual-interactive-card">
                  <div className="recap-num">0{idx + 1}</div>
                  <h4 className="recap-title">{rc.title}</h4>
                  <PointList points={rc.points || [rc.desc]} color="orange" />
                </div>
              ))}
            </div>

            <div className="closing-brand-hero visual-glow-banner mt-2">
              <div className="closing-brand-name">
                Pettah<span className="brand-name-orange">Bazaar</span>
              </div>
              <div className="closing-brand-tagline">{slide.closingStatement.tagline}</div>
              <p className="closing-brand-ack text-xs">{slide.closingStatement.acknowledgement}</p>
              <div className="mt-2 flex justify-center">
                <button 
                  className="proceed-qa-btn" 
                  onClick={() => onJumpToSlide(19)}
                >
                  <HelpCircle className="w-4 h-4 mr-1.5 text-gold-400" />
                  Open Final Q&A & Thank You Slide (Slide 20) →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slide 20: Thank You & Any Questions (Grand Finale Q&A + Academic Literature)
  if (slide.id === 20) {
    const tabs20 = [
      { label: "Card 1: Executive Closing, Grand Finale Q&A & Live Access", icon: <HelpCircle className="w-3.5 h-3.5 mr-1 text-teal-300" /> },
      { label: "Card 2: Group 10 Presentation Team (All 10 Presenters)", icon: <Users className="w-3.5 h-3.5 mr-1 text-gold-400" /> },
      { label: "Card 3: Academic Literature (APA 7th) & Syllabus Assessment Matrix", icon: <BookOpen className="w-3.5 h-3.5 mr-1 text-orange-400" /> }
    ];

    return (
      <div className={`slide-content slide-thank-you-layout ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag theory">
              {subCard20 === 2 ? 'Academic Rigour & References' : subCard20 === 1 ? 'Intake 43 • Presentation Team' : 'BSM 12012 • Presentation Finale'}
            </span>
            <h2 className="slide-heading">
              {subCard20 === 2 ? 'Academic Literature & Syllabus Alignment' : subCard20 === 1 ? 'Group 10 Presentation Team Roster' : 'Grand Finale, Q&A & Presenter Credits'}
            </h2>
            <p className="slide-subheading">
              {subCard20 === 2 
                ? 'Theoretical Grounding (APA 7th) & Comprehensive Assessment Criteria Matrix' 
                : subCard20 === 1 
                ? 'All 10 Dedicated Presenters & Academic Contributions (BSc in Management, Intake 43)' 
                : 'The floor is now open for evaluation feedback, panel questions, and academic discussion.'}
            </p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <SubCardNav 
          activeIndex={subCard20} 
          onSelect={setSubCard20} 
          tabs={tabs20} 
        />

        {subCard20 === 0 && (
          <div className="slide-subcard-container animate-fade-in flex flex-col justify-between">
            {/* Main Hero Card */}
            <div className="thank-you-hero-card">
              <div className="thank-you-top-meta">
                <span className="meta-badge-intake">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400 mr-1.5" />
                  KDU Faculty of Management • Intake 43 • BSM 12012
                </span>
                <span className="meta-badge-venture">Pettah Bazaar Digital Platform</span>
              </div>

              <h1 className="thank-you-main-title">
                THANK <span className="brand-name-orange">YOU!</span>
              </h1>

              <div className="any-questions-banner">
                <div className="questions-icon-wrap">
                  <HelpCircle className="w-6 h-6 text-gold-400 animate-bounce" />
                </div>
                <div className="questions-text-block">
                  <h3 className="questions-headline">ANY QUESTIONS?</h3>
                  <p className="questions-caption">
                    The floor is now open for evaluation feedback, panel questions, and academic discussion.
                  </p>
                </div>
                <div className="questions-status-chip">
                  <MessageSquare className="w-3.5 h-3.5 mr-1 text-primary-flame" />
                  Open Q&A Session
                </div>
              </div>
            </div>

            {/* Bottom Interactive Toolbar */}
            <div className="thank-you-toolbar mt-2 flex-shrink-0">
              <button className="celebrate-action-btn" onClick={triggerCelebration}>
                <Sparkles className="w-4 h-4 mr-1.5 text-gold-400" />
                Celebrate Completion 🎉
              </button>

              <button 
                className="view-academic-btn"
                onClick={() => setSubCard20(1)}
              >
                <Users className="w-4 h-4 mr-1.5 text-gold-400" />
                View 10 Presenters Roster →
              </button>

              <div className="live-url-pill">
                <Globe className="w-3.5 h-3.5 mr-1.5 text-primary-flame" />
                pettah-bazaar.vercel.app
              </div>
            </div>
          </div>
        )}

        {subCard20 === 1 && (
          <div className="slide-subcard-container animate-fade-in flex flex-col justify-between">
            <div className="thank-you-roster-box flex-1 flex flex-col justify-between">
              <div className="roster-header-bar">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-flame" />
                  <span className="roster-heading text-sm">Group 10 Presentation Team (All 10 Presenters):</span>
                </div>
                <span className="roster-intake-tag">BSc (Hons) in Management • Intake 43 • General Sir John Kotelawala Defence University</span>
              </div>

              <div className="thank-you-roster-grid flex-1 items-center">
                {teamMembers.map((m) => (
                  <div key={m.id} className="roster-member-card p-2.5">
                    <div className="member-avatar-chip">
                      {m.id}
                    </div>
                    <div className="member-info">
                      <span className="member-name text-sm">{m.name}</span>
                      <span className="member-focus text-xs text-slate-300">{m.focus}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-teal-500/30 flex items-center justify-between mt-2 flex-shrink-0">
                <div className="flex items-center text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-300 mr-2 flex-shrink-0" />
                  <span>Each presenter has delivered dedicated marketing strategy components aligned with the BSM 12012 capstone syllabus.</span>
                </div>
                <button 
                  className="view-academic-btn"
                  onClick={() => setSubCard20(2)}
                >
                  <BookOpen className="w-4 h-4 mr-1.5 text-primary-flame" />
                  View Academic References & Syllabus Alignment →
                </button>
              </div>
            </div>
          </div>
        )}

        {subCard20 === 2 && (
          <div className="slide-subcard-container animate-fade-in">
            {/* Syllabus Alignment & Core Academic Coverage Visual Banner */}
            <div className="rubric-score-visual-banner mt-1">
              <div className="target-score-badge">
                <Trophy className="w-5 h-5 text-gold-400 mr-2 animate-pulse" />
                <span>Academic Scope: <strong>Complete Syllabus Alignment</strong></span>
              </div>
              <div className="criteria-mini-bars">
                <div className="mini-bar-item" title="Problem: Field Validated">
                  <span>Problem</span>
                  <div className="mini-track"><div className="mini-fill" style={{ width: '100%' }}></div></div>
                  <strong className="text-emerald-400">Validated</strong>
                </div>
                <div className="mini-bar-item" title="Marketing Mix: 7Ps Complete">
                  <span>Mix (7Ps)</span>
                  <div className="mini-track"><div className="mini-fill" style={{ width: '100%' }}></div></div>
                  <strong className="text-emerald-400">Applied</strong>
                </div>
                <div className="mini-bar-item" title="STP: 4 Variables Mapped">
                  <span>STP</span>
                  <div className="mini-track"><div className="mini-fill" style={{ width: '100%' }}></div></div>
                  <strong className="text-emerald-400">Defined</strong>
                </div>
                <div className="mini-bar-item" title="Prototype: Interactive Search Engine">
                  <span>Prototype</span>
                  <div className="mini-track"><div className="mini-fill" style={{ width: '100%' }}></div></div>
                  <strong className="text-emerald-400">Functional</strong>
                </div>
                <div className="mini-bar-item" title="Delivery: 10 Presenters">
                  <span>Delivery</span>
                  <div className="mini-track"><div className="mini-fill" style={{ width: '100%' }}></div></div>
                  <strong className="text-emerald-400">10 Speakers</strong>
                </div>
              </div>
            </div>

            {/* Academic References & Rubric Evidence */}
            <div className="references-rubric-split flex-1 min-h-0 mt-2">
              {/* Left: APA 7th References */}
              <div className="references-col overflow-hidden">
                <h4 className="col-subheading">
                  <BookOpen className="w-4 h-4 text-primary-flame mr-1.5" />
                  Genuine Academic Literature (APA 7th Edition)
                </h4>
                <div className="references-list">
                  {slide.references.map((ref, idx) => (
                    <div key={idx} className="reference-item visual-card">
                      <div className="ref-citation text-xs font-semibold">{ref.citation}</div>
                      <div className="ref-note text-[11px] text-slate-300">{ref.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Rubric Alignment Checklist */}
              <div className="rubric-checklist-col overflow-hidden">
                <h4 className="col-subheading">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5" />
                  Syllabus Benchmark Coverage Matrix
                </h4>
                <div className="rubric-summary-table-wrap">
                  <table className="rubric-summary-table w-full">
                    <thead>
                      <tr>
                        <th>Criteria Benchmark</th>
                        <th>Scope Status</th>
                        <th>Demonstrated Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slide.rubricHighlights.map((rh, idx) => (
                        <tr key={idx}>
                          <td className="font-semibold text-white text-xs">{rh.criterion}</td>
                          <td className="text-emerald-400 font-semibold text-xs whitespace-nowrap">{rh.status}</td>
                          <td className="text-slate-300 text-xs">{rh.evidence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div>Slide {slide.id} Content</div>;
}
