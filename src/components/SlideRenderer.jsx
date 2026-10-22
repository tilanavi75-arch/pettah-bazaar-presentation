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
  const [subCard6, setSubCard6] = useState(0); // Slide 6: 0: 3-Step Discovery Journey, 1: Mobile App Showroom
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
          presenter={slide.presenter}
          videoSrc={slide.videoSrc}
          driveUrl={slide.driveUrl}
          videoTitle={slide.videoTitle}
        />
      </div>
    );
  }

  // Slide 1: Next-Level Executive Cover Page (PettahBazaar Flame Brand Theme)
  if (slide.id === 1) {
    return (
      <div className={`slide-content cover-exact-ref-container ${animClass} ${spotlightClass}`}>
        {/* Full-bleed Pettah Street Background with Ambient Glow */}
        <div className="cover-ref-bg-wrap">
          <img 
            src="/assets/pettah_real_street_crowd.jpg" 
            alt="Pettah Commercial Epicenter" 
            className="cover-ref-bg-img"
          />
          <div className="cover-ref-bg-overlay" />
          <div className="cover-ref-ambient-glow" />
        </div>

        {/* Content Grid: Left Brand Column & Right Titanium Phone Chassis */}
        <div className="cover-ref-content-grid">
          {/* LEFT COLUMN: Brand, Tagline, Academic Meta, Button & Team */}
          <div className="cover-ref-left-col">
            {/* Logo Badge + Platform Scope Chip */}
            <div className="cover-nl-brand-badge-row">
              <div className="cover-nl-logo-box">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div className="cover-nl-scope-pill">
                <Flame className="w-3.5 h-3.5 text-primary-flame animate-pulse mr-1" />
                <span>COLOMBO 11 DIGITAL SHOP-DISCOVERY PLATFORM</span>
              </div>
            </div>

            {/* Brand Title: PETTAH (White) BAZAAR (Flame Gradient) */}
            <div className="cover-nl-brand-title">
              <span className="cover-nl-brand-white">PETTAH</span>{" "}
              <span className="cover-nl-brand-flame">BAZAAR</span>
            </div>

            {/* Main Tagline */}
            <h2 className="cover-nl-tagline">
              "Find the Shop. Save Your Time."
            </h2>

            {/* Subtitle Description */}
            <p className="cover-nl-subtitle">
              Proposed digital shop-discovery platform for Pettah, Colombo.
            </p>

            {/* Academic Credential Card (Glassmorphic & Credentialed) */}
            <div className="cover-nl-academic-card">
              <div className="academic-line-univ">
                <Award className="w-4 h-4 text-primary-flame mr-1.5 flex-shrink-0" />
                <span>General Sir John Kotelawala Defence University (KDU)</span>
              </div>
              <div className="academic-line-faculty">
                Faculty of Management, Social Sciences and Humanities
              </div>
              <div className="academic-line-meta">
                <span className="academic-pill">BSc (Hons) in Management</span>
                <span className="academic-dot">•</span>
                <span className="academic-pill">BSM 12012 — Principles of Marketing</span>
                <span className="academic-dot">•</span>
                <span className="academic-pill highlight">Intake 43</span>
              </div>
            </div>

            {/* Action Row: OPEN LIVE PROTOTYPE & Live Status Pill */}
            <div className="cover-nl-actions-row">
              <a
                href="https://pettah-bazaar.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="cover-nl-cta-flame"
                title="Launch Live Prototype Web App (pettah-bazaar.vercel.app)"
              >
                <Globe className="w-4 h-4 mr-2" />
                <span>OPEN LIVE PROTOTYPE</span>
                <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-80" />
              </a>

              <div className="cover-nl-live-badge">
                <span className="live-pulse-dot" />
                <span>Live Prototype Tested</span>
              </div>
            </div>

            {/* Presenters Strip (10 Team Members) */}
            <div className="cover-nl-presenters-box">
              <div className="cover-nl-presenters-head">
                <Users className="w-3.5 h-3.5 text-primary-flame mr-1.5" />
                <span>PRESENTERS • INTAKE 43</span>
              </div>
              <div className="cover-nl-names-line">
                Chenaya • Amandi • Tilan • Buddhini • Vishadani
              </div>
              <div className="cover-nl-names-line">
                Savinu • Vihanga • Devindi • Nethmi • Sanithu
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Modern Titanium Smartphone Mockup Frame (Clean, No Cutoff Hand) */}
          <div className="cover-ref-right-col">
            <div className="cover-device-presentation-stage">
              {/* Floating Top Pill */}
              <div className="cover-device-float-badge top">
                <MapPin className="w-3 h-3 text-primary-flame mr-1" />
                <span>Pettah Market • Colombo 11</span>
              </div>

              {/* Realistic Titanium Phone Chassis */}
              <div className="cover-phone-chassis">
                {/* Dynamic Island Pill */}
                <div className="cover-phone-island">
                  <div className="island-camera" />
                  <div className="island-sensor" />
                </div>

                {/* Actual Clean App Screen (Zero Awkward Hand) */}
                <img 
                  src="/assets/pettah_real_prototype_screen.png" 
                  alt="Pettah Bazaar Live Prototype User Interface"
                  className="cover-phone-screen-img" 
                />

                {/* Gloss reflection overlay */}
                <div className="cover-phone-glare" />
              </div>

              {/* Floating Bottom Pill */}
              <div className="cover-device-float-badge bottom">
                <Zap className="w-3 h-3 text-gold-400 mr-1" />
                <span>&lt; 3 Min Search-to-Stall</span>
              </div>
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
                <div key={idx} className={`brand-pillar-large-card pillar-theme-${idx + 1}`}>
                  <div className="pillar-card-body">
                    <div className="pillar-header">
                      <div className="pillar-badge-group">
                        <span className="pillar-num-badge">0{idx + 1}</span>
                        <div className="pillar-icon-box">
                          {idx === 0 ? <Compass className="w-5 h-5 text-orange-400" /> : <MapPin className="w-5 h-5 text-cyan-400" />}
                        </div>
                      </div>
                      <div className="pillar-header-titles">
                        <span className="pillar-micro-tag">{p.tag}</span>
                        <h4 className="pillar-title">{p.title}</h4>
                      </div>
                    </div>
                    
                    <PointList 
                      points={p.points || [p.desc]} 
                      color={idx === 0 ? "orange" : "cyan"} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-teal-500/40 flex items-center mt-2 flex-shrink-0 shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-teal-400 mr-2 flex-shrink-0" />
              <span className="text-slate-200 text-xs sm:text-sm font-medium">Pettah Bazaar bridges the gap between chaotic street shopping and digital efficiency, specifically tailored to Colombo 11's commercial density.</span>
            </div>
          </div>
        )}

        {subCard2 === 1 && (
          <div className="slide-subcard-container animate-fade-in flex flex-col justify-between">
            <div className="pillars-grid-2col flex-1 min-h-0">
              {pillars3to4.map((p, idx) => (
                <div key={idx} className={`brand-pillar-large-card pillar-theme-${idx + 3}`}>
                  <div className="pillar-card-body">
                    <div className="pillar-header">
                      <div className="pillar-badge-group">
                        <span className="pillar-num-badge">0{idx + 3}</span>
                        <div className="pillar-icon-box">
                          {idx === 0 ? <Tag className="w-5 h-5 text-amber-400" /> : <HeartHandshake className="w-5 h-5 text-emerald-400" />}
                        </div>
                      </div>
                      <div className="pillar-header-titles">
                        <span className="pillar-micro-tag">{p.tag}</span>
                        <h4 className="pillar-title">{p.title}</h4>
                      </div>
                    </div>
                    
                    <PointList 
                      points={p.points || [p.desc]} 
                      color={idx === 0 ? "gold" : "emerald"} 
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Live Commercial Metrics Strip */}
            <div className="commercial-metrics-strip mt-2 flex-shrink-0">
              <div className="metric-pod">
                <MapPin className="text-primary-flame flex-shrink-0" />
                <div>
                  <div className="pod-number">11</div>
                  <div className="pod-label">Micro-Streets Mapped</div>
                </div>
              </div>
              <div className="metric-pod">
                <Store className="text-gold-400 flex-shrink-0" />
                <div>
                  <div className="pod-number">28+</div>
                  <div className="pod-label">Verified Stalls Active</div>
                </div>
              </div>
              <div className="metric-pod">
                <DollarSign className="text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="pod-number">0 LKR</div>
                  <div className="pod-label">Merchant Listing Fee</div>
                </div>
              </div>
              <div className="metric-pod">
                <Clock className="text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="pod-number">&lt; 3 Min</div>
                  <div className="pod-label">Avg Discovery Time</div>
                </div>
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

            <div className="problem-dilemmas-4col mt-1.5 flex-1 min-h-0">
              {slide.problemPoints.map((pt, idx) => (
                <div key={idx} className="problem-dilemma-card">
                  <div className="problem-item-header">
                    <div className="problem-badge-row">
                      <span className="problem-num-pill">0{idx + 1}</span>
                      <span className="problem-tag">{pt.tag}</span>
                    </div>
                    <h4 className="problem-item-title">{pt.title}</h4>
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
    const tabs6 = [
      { label: "Card 1: 3-Step Discovery Journey (Search, Discover & Locate)", icon: <Compass className="w-3.5 h-3.5 mr-1 text-teal-300" /> },
      { label: "Card 2: Interactive Mobile Prototype Showroom (Handheld App Experience)", icon: <Smartphone className="w-3.5 h-3.5 mr-1 text-orange-400" /> }
    ];

    const hotspotDetails = [
      {
        step: "01",
        name: "1. Product Search Bar",
        subtitle: "Product-First Direct Matching Engine",
        icon: <Search className="w-5 h-5 text-primary-flame" />,
        highlightColor: "#FF5500",
        desc: "Buyers enter exact item keywords (e.g. 'Linen', 'Arduino', 'Cinnamon') to immediately filter through verified Pettah inventory without needing to know specific shop names upfront.",
        features: [
          "Instant predictive keyword suggestion engine",
          "Bypasses 2+ hours of wandering across 11 congested streets",
          "Direct match to specific micro-stall inventory"
        ]
      },
      {
        step: "02",
        name: "2. Curated Sector Categories",
        subtitle: "One-Tap Street Cluster Filtering",
        icon: <Tag className="w-5 h-5 text-cyan-400" />,
        highlightColor: "#06B6D4",
        desc: "Visual category pills categorize Pettah's natural street specializations (Textiles, Electronics, Hardware, Spices) for instant exploration.",
        features: [
          "Textiles on 2nd Cross, Tech on 1st Cross, Spices on Bankshall",
          "Verified stall badges with opening hours & floor locations",
          "One-tap direct WhatsApp merchant contact link"
        ]
      },
      {
        step: "03",
        name: "3. Micro-Street Walking Map",
        subtitle: "Landmark-Based Micro-Navigation",
        icon: <MapPin className="w-5 h-5 text-emerald-400" />,
        highlightColor: "#10B981",
        desc: "Unlike standard GPS that drops a pin in the middle of a crowded block, Pettah Bazaar pinpoints the exact cross-street alleyway and landmark cues.",
        features: [
          "Landmarks like Red Mosque, Khan Clock Tower & Old City Hall",
          "Precise stall numbers, floor levels, and alleyway coordinates",
          "100% offline-ready Progressive Web App (PWA) guidance"
        ]
      }
    ];

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

        <SubCardNav activeIndex={subCard6} onSelect={setSubCard6} tabs={tabs6} />

        {subCard6 === 0 && (
          <div className="slide-subcard-container animate-fade-in flex flex-col justify-between">
            {/* 3-Step Journey Grid across 3 columns */}
            <div className="concept-steps-grid-3col">
              {slide.steps.map((st, idx) => (
                <div 
                  key={idx} 
                  className={`concept-step-card-3col ${activeStep === idx ? 'step-highlighted' : ''}`}
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
                  
                  <div className="concept-step-footer-tag">
                    {idx === 0 && <Search className="w-3.5 h-3.5 mr-1.5 text-primary-flame flex-shrink-0" />}
                    {idx === 1 && <Tag className="w-3.5 h-3.5 mr-1.5 text-cyan-400 flex-shrink-0" />}
                    {idx === 2 && <MapPin className="w-3.5 h-3.5 mr-1.5 text-emerald-400 flex-shrink-0" />}
                    <span>{idx === 0 ? "Frictionless Input" : idx === 1 ? "Verified Store Match" : "Precision Foot-Navigation"}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="academic-integrity-callout mt-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
              <span>{slide.clarityNote}</span>
            </div>
          </div>
        )}

        {subCard6 === 1 && (
          <div className="slide-subcard-container animate-fade-in flex-1 min-h-0">
            <div className="prototype-showroom-showcase">
              {/* Left Column: Big Handheld Mockup with Hotspots */}
              <div className="prototype-showroom-mockup-wrap">
                <div className="concept-mockup-frame-large">
                  <img 
                    src="/assets/pettah_real_app_mockup_hand.png" 
                    alt="Pettah Bazaar mobile app prototype in hand" 
                    className="concept-mockup-img-large"
                  />

                  {/* Animated Hotspots on the phone */}
                  <div 
                    className={`mockup-hotspot hs-search ${activeStep === 0 ? 'active-pulse' : ''}`} 
                    onClick={() => setActiveStep(0)}
                    title="Click to inspect Search Bar"
                  >
                    <div className="hotspot-pulse"></div>
                    <div className="hotspot-tooltip">
                      <Search className="w-3 h-3 mr-1 text-primary-flame" />
                      <span>1. Product Search Bar</span>
                    </div>
                  </div>

                  <div 
                    className={`mockup-hotspot hs-categories ${activeStep === 1 ? 'active-pulse' : ''}`} 
                    onClick={() => setActiveStep(1)}
                    title="Click to inspect Sector Categories"
                  >
                    <div className="hotspot-pulse"></div>
                    <div className="hotspot-tooltip">
                      <Tag className="w-3 h-3 mr-1 text-cyan-400" />
                      <span>2. Curated Sector Categories</span>
                    </div>
                  </div>

                  <div 
                    className={`mockup-hotspot hs-map ${activeStep === 2 ? 'active-pulse' : ''}`} 
                    onClick={() => setActiveStep(2)}
                    title="Click to inspect Micro-Street Walking Map"
                  >
                    <div className="hotspot-pulse"></div>
                    <div className="hotspot-tooltip">
                      <MapPin className="w-3 h-3 mr-1 text-emerald-400" />
                      <span>3. Micro-Street Walking Map</span>
                    </div>
                  </div>
                </div>

                <a 
                  href="https://pettah-bazaar.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mockup-live-url-btn mt-2"
                >
                  <Globe className="w-3.5 h-3.5 mr-1.5 text-primary-flame" />
                  <span>Live App: pettah-bazaar.vercel.app</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
                </a>
              </div>

              {/* Right Column: Active Hotspot & Feature Inspector */}
              <div className="prototype-showroom-details-wrap">
                <div className="hotspot-selector-tabs">
                  {hotspotDetails.map((hd, hIdx) => (
                    <button 
                      key={hIdx}
                      className={`hotspot-tab-pill ${activeStep === hIdx ? 'active' : ''}`}
                      onClick={() => setActiveStep(hIdx)}
                    >
                      {hd.icon}
                      <span>{hd.name}</span>
                    </button>
                  ))}
                </div>

                {/* Detailed card of active feature */}
                <div className="active-feature-inspector-card">
                  <div className="inspector-card-header">
                    <div className="inspector-icon-box">
                      {hotspotDetails[activeStep].icon}
                    </div>
                    <div>
                      <span className="inspector-stage-tag">Step {hotspotDetails[activeStep].step} Live Feature Highlight</span>
                      <h3 className="inspector-title">{hotspotDetails[activeStep].name}</h3>
                      <p className="inspector-subtitle">{hotspotDetails[activeStep].subtitle}</p>
                    </div>
                  </div>

                  <p className="inspector-desc">{hotspotDetails[activeStep].desc}</p>

                  <div className="inspector-capabilities">
                    <span className="capabilities-label">Key Prototype & UX Capabilities:</span>
                    <ul className="capabilities-list">
                      {hotspotDetails[activeStep].features.map((feat, fIdx) => (
                        <li key={fIdx}>
                          <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="inspector-tech-badges">
                    <span className="tech-badge">PWA Ready</span>
                    <span className="tech-badge">Zero Install Barrier</span>
                    <span className="tech-badge">&lt; 1.5s Fast Load</span>
                    <span className="tech-badge">Colombo 11 Micro-Index</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
          <div className="slide-subcard-container animate-fade-in flex flex-col justify-between flex-1 min-h-0">
            {/* Strategy Canvas / Value Innovation Curve Full-Scale Visual */}
            <div className="strategy-canvas-banner flex-1 min-h-0 flex flex-col justify-between">
              <div className="canvas-header-bar">
                <div className="canvas-title-group">
                  <BarChart2 className="w-5 h-5 text-primary-flame mr-2 flex-shrink-0" />
                  <span className="canvas-main-title">Value Innovation Curve: Pettah Bazaar vs Alternatives</span>
                  <span className="canvas-sub-title">Chan Kim & Mauborgne Strategic Canvas Framework</span>
                </div>
                
                {/* Visual Legend */}
                <div className="canvas-legend">
                  <div className="legend-item">
                    <span className="legend-box pb-orange"></span>
                    <span className="legend-name">Pettah Bazaar (PWA)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-box alt-gray"></span>
                    <span className="legend-name">Traditional Alternatives</span>
                  </div>
                </div>
              </div>

              <div className="canvas-bars-row flex-1 min-h-0">
                <div className="canvas-col">
                  <div className="canvas-col-header">
                    <span className="col-benchmark-tag text-gold-400">100% Pettah Focus</span>
                    <span className="canvas-col-title">Hyper-Local Detail</span>
                    <span className="canvas-col-sub">Micro-street & stall-level</span>
                  </div>
                  
                  <div className="canvas-bar-track">
                    <div className="track-grid-lines">
                      <span className="grid-line" style={{ bottom: '75%' }}></span>
                      <span className="grid-line" style={{ bottom: '50%' }}></span>
                      <span className="grid-line" style={{ bottom: '25%' }}></span>
                    </div>

                    <div className="canvas-bar-group">
                      <div className="canvas-bar-fill orange" style={{ height: '95%' }} title="Pettah Bazaar: 95%">
                        <span className="bar-val-badge">95%</span>
                      </div>
                      <div className="canvas-bar-fill gray" style={{ height: '35%' }} title="Google Maps: 35%">
                        <span className="bar-val-badge">35%</span>
                      </div>
                    </div>
                  </div>

                  <div className="canvas-col-footer">
                    <div className="canvas-col-labels">
                      <span className="pb-label">PB: 95%</span>
                      <span className="alt-label">GM: 35%</span>
                    </div>
                    <span className="advantage-badge">+60% Local Depth</span>
                  </div>
                </div>

                <div className="canvas-col">
                  <div className="canvas-col-header">
                    <span className="col-benchmark-tag text-cyan-400">&lt; 1.5s Fast Load</span>
                    <span className="canvas-col-title">3G Data Lightness</span>
                    <span className="canvas-col-sub">PWA load under 1.5s</span>
                  </div>

                  <div className="canvas-bar-track">
                    <div className="track-grid-lines">
                      <span className="grid-line" style={{ bottom: '75%' }}></span>
                      <span className="grid-line" style={{ bottom: '50%' }}></span>
                      <span className="grid-line" style={{ bottom: '25%' }}></span>
                    </div>

                    <div className="canvas-bar-group">
                      <div className="canvas-bar-fill orange" style={{ height: '90%' }} title="Pettah Bazaar: 90%">
                        <span className="bar-val-badge">90%</span>
                      </div>
                      <div className="canvas-bar-fill gray" style={{ height: '40%' }} title="Social Apps: 40%">
                        <span className="bar-val-badge">40%</span>
                      </div>
                    </div>
                  </div>

                  <div className="canvas-col-footer">
                    <div className="canvas-col-labels">
                      <span className="pb-label">PB: 90%</span>
                      <span className="alt-label">Apps: 40%</span>
                    </div>
                    <span className="advantage-badge">2.3x Faster Access</span>
                  </div>
                </div>

                <div className="canvas-col">
                  <div className="canvas-col-header">
                    <span className="col-benchmark-tag text-emerald-400">Zero Cost Stall Entry</span>
                    <span className="canvas-col-title">Merchant Verification</span>
                    <span className="canvas-col-sub">Direct WhatsApp & badges</span>
                  </div>

                  <div className="canvas-bar-track">
                    <div className="track-grid-lines">
                      <span className="grid-line" style={{ bottom: '75%' }}></span>
                      <span className="grid-line" style={{ bottom: '50%' }}></span>
                      <span className="grid-line" style={{ bottom: '25%' }}></span>
                    </div>

                    <div className="canvas-bar-group">
                      <div className="canvas-bar-fill orange" style={{ height: '92%' }} title="Pettah Bazaar: 92%">
                        <span className="bar-val-badge">92%</span>
                      </div>
                      <div className="canvas-bar-fill gray" style={{ height: '20%' }} title="Asking Walkers: 20%">
                        <span className="bar-val-badge">20%</span>
                      </div>
                    </div>
                  </div>

                  <div className="canvas-col-footer">
                    <div className="canvas-col-labels">
                      <span className="pb-label">PB: 92%</span>
                      <span className="alt-label">Walk: 20%</span>
                    </div>
                    <span className="advantage-badge">+72% Trust Factor</span>
                  </div>
                </div>

                <div className="canvas-col">
                  <div className="canvas-col-header">
                    <span className="col-benchmark-tag text-primary-flame">85% Effort Saved</span>
                    <span className="canvas-col-title">Shopper Time Savings</span>
                    <span className="canvas-col-sub">Cuts hours to &lt; 3 mins</span>
                  </div>

                  <div className="canvas-bar-track">
                    <div className="track-grid-lines">
                      <span className="grid-line" style={{ bottom: '75%' }}></span>
                      <span className="grid-line" style={{ bottom: '50%' }}></span>
                      <span className="grid-line" style={{ bottom: '25%' }}></span>
                    </div>

                    <div className="canvas-bar-group">
                      <div className="canvas-bar-fill orange" style={{ height: '96%' }} title="Pettah Bazaar: 96%">
                        <span className="bar-val-badge">96%</span>
                      </div>
                      <div className="canvas-bar-fill gray" style={{ height: '15%' }} title="Traditional Walking: 15%">
                        <span className="bar-val-badge">15%</span>
                      </div>
                    </div>
                  </div>

                  <div className="canvas-col-footer">
                    <div className="canvas-col-labels">
                      <span className="pb-label">PB: 96%</span>
                      <span className="alt-label">Trad: 15%</span>
                    </div>
                    <span className="advantage-badge">&gt; 95% Time Saved</span>
                  </div>
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
      { label: "1. Customer Needs", icon: <Target className="w-3.5 h-3.5 mr-1 text-primary-flame" /> },
      { label: "2. Customer Wants", icon: <ShoppingBag className="w-3.5 h-3.5 mr-1 text-gold-400" /> },
      { label: "3. Market Demand", icon: <TrendingUp className="w-3.5 h-3.5 mr-1 text-cyan-400" /> },
      { label: "4. Customer Value", icon: <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-400" /> },
      { label: "5. Customer Satisfaction", icon: <Star className="w-3.5 h-3.5 mr-1 text-pink-400" /> }
    ];

    const currentConcept = slide.table[subCard8] || slide.table[0];

    return (
      <div className={`slide-content ${animClass} ${spotlightClass}`}>
        <div className="slide-header-bar">
          <div>
            <span className="section-tag theory">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <SubCardNav activeIndex={subCard8} onSelect={setSubCard8} tabs={tabs8} />

        {/* Kotler 5-Stage Customer Value Flow Banner */}
        <div className="kotler-value-flow-strip mb-2">
          <div className={`flow-step ${subCard8 === 0 ? 'highlight' : ''}`}>1. Needs & Chaos</div>
          <ArrowRight className="w-3.5 h-3.5 text-primary-flame" />
          <div className={`flow-step ${subCard8 === 1 ? 'highlight' : ''}`}>2. Customer Wants</div>
          <ArrowRight className="w-3.5 h-3.5 text-primary-flame" />
          <div className={`flow-step ${subCard8 === 2 ? 'highlight' : ''}`}>3. Market Demand</div>
          <ArrowRight className="w-3.5 h-3.5 text-primary-flame" />
          <div className={`flow-step ${subCard8 === 3 ? 'highlight-orange' : ''}`}>4. Customer Value</div>
          <ArrowRight className="w-3.5 h-3.5 text-primary-flame" />
          <div className={`flow-step ${subCard8 === 4 ? 'highlight-orange' : ''}`}>5. Satisfaction & Loyalty</div>
        </div>

        <div className="slide-subcard-container animate-fade-in flex-1 min-h-0">
          <div className="theory-two-col-layout">
            {/* Left Column: Photo (Photo eka wamen) */}
            <div className="theory-col-photo">
              <div className="theory-large-photo-frame">
                <div className="frame-header-strip">
                  <span className="text-xs font-bold text-teal-300 flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-primary-flame" />
                    Field Evidence #{subCard8 + 1} • Colombo 11
                  </span>
                  <span className="verified-chip text-[10px]">Empirical Study</span>
                </div>
                <div className="theory-photo-body">
                  <img 
                    src={currentConcept.image} 
                    alt={currentConcept.concept} 
                    className="theory-full-photo" 
                  />
                </div>
                <div className="frame-footer-caption">
                  <span className="text-slate-200 text-xs font-medium">
                    📸 {currentConcept.imageCaption}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Description (Description eka dakunen) */}
            <div className="theory-col-desc">
              <div className="theory-detail-panel">
                <div>
                  <div className="concept-header-bar flex items-center justify-between mb-2.5 pb-2 border-b border-slate-700/60">
                    <div className="flex items-center gap-2.5">
                      <div className="theory-icon-wrap large">
                        {subCard8 === 0 && <Target className="w-5 h-5 text-primary-flame" />}
                        {subCard8 === 1 && <ShoppingBag className="w-5 h-5 text-gold-400" />}
                        {subCard8 === 2 && <TrendingUp className="w-5 h-5 text-cyan-400" />}
                        {subCard8 === 3 && <Sparkles className="w-5 h-5 text-emerald-400" />}
                        {subCard8 === 4 && <Star className="w-5 h-5 text-pink-400" />}
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-primary-flame tracking-wider">
                          Kotler & Armstrong Framework • Concept 0{subCard8 + 1} of 05
                        </div>
                        <h3 className="text-lg font-extrabold text-white">{currentConcept.concept}</h3>
                      </div>
                    </div>
                    <span className="theory-author-pill large">Kotler & Armstrong (2021)</span>
                  </div>

                  {/* Academic Definition Box */}
                  <div className="theory-def-box mb-2.5">
                    <span className="def-label flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      Academic Theoretical Definition:
                    </span>
                    <p className="def-text text-xs leading-relaxed">{currentConcept.academicDefinition}</p>
                  </div>

                  {/* Pettah Bazaar Practical Application Box */}
                  <div className="theory-app-box mb-2.5">
                    <span className="app-label flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                      Practical Platform Application to Pettah Bazaar:
                    </span>
                    <PointList points={currentConcept.points} color="gold" className="theory-points-large" />
                  </div>
                </div>

                {/* Strategic Insight Takeaway Footer */}
                <div className="theory-strategic-insight-bar p-2.5 rounded-lg bg-slate-900/90 border border-teal-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    <span className="text-xs text-slate-200">
                      <strong>Strategic Takeaway:</strong> {currentConcept.strategicNote}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded font-bold flex-shrink-0 ml-2">
                    Step {subCard8 + 1}/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
              <div className="bullseye-diagram-card flex flex-col justify-between p-3.5">
                <div>
                  <div className="bullseye-header flex items-center justify-between mb-2">
                    <span className="flex items-center text-sm font-bold text-white">
                      <Target className="w-4 h-4 text-primary-flame mr-1.5" />
                      Target Market Prioritization (Bullseye Model)
                    </span>
                    <span className="text-[11px] font-semibold text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">Kotler STP Focus</span>
                  </div>
                  
                  <div className="bullseye-rings-visual my-1">
                    <div className="ring outer-ring">
                      <span className="ring-label">Broad Colombo Retail Visitors (General Footfall)</span>
                      <div className="ring middle-ring">
                        <span className="ring-label">Secondary: Outstation Buyers & Tech Students</span>
                        <div className="ring inner-ring">
                          <span className="ring-label active-bullseye">🎯 Primary Core: Shoppers Seeking Specific Products</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="primary-cohort-box mt-2 p-3 bg-slate-900/90 rounded-xl border border-primary-flame/50 shadow-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-primary-flame text-xs uppercase tracking-wider">{slide.targetGroups.primary.title}</span>
                    <span className="text-[10px] bg-primary-flame/20 text-orange-300 font-bold px-2 py-0.5 rounded-full border border-primary-flame/40">Tier 1 Priority</span>
                  </div>
                  <div className="text-white text-xs font-bold mb-1.5">{slide.targetGroups.primary.cohort}</div>
                  <PointList points={slide.targetGroups.primary.points} color="orange" />
                </div>
              </div>

              <div className="secondary-targets-list flex flex-col justify-between p-3 bg-slate-900/70 rounded-xl border border-slate-700/60">
                <div className="secondary-header flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-xs uppercase tracking-wider">Secondary Market Cohorts (Specialized Audiences):</span>
                  <span className="text-[10px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">Tier 2 Expansion</span>
                </div>
                <div className="grid grid-cols-1 gap-2 flex-1">
                  {slide.targetGroups.secondary.map((sec, idx) => (
                    <div key={idx} className="secondary-item p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-cyan-300 text-xs font-bold">{sec.name}</strong>
                        <span className="text-[10px] text-slate-400 font-mono">Cohort 0{idx + 1}</span>
                      </div>
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

              {/* Right: Official Mobile App & Campaign Poster */}
              <div className="detail-col-media">
                <div className="media-large-frame proposed-frame">
                  <div className="frame-header-strip orange-strip">
                    <span className="text-xs font-bold text-orange-300 flex items-center">
                      <Sparkles className="w-3.5 h-3.5 mr-1 text-orange-400" />
                      Official Platform & Mobile Campaign
                    </span>
                    <span className="verified-chip text-[10px]">pettah-bazaar.vercel.app</span>
                  </div>
                  <div className="frame-image-wrap bg-slate-950/90 flex items-center justify-center p-1.5">
                    <img 
                      src={slide.campaignPromoImage || slide.marketImage} 
                      alt="Pettah Bazaar - Find the shop, save you Time Mobile Campaign" 
                      className="frame-full-img promo-campaign-poster-img"
                    />
                  </div>
                  <div className="frame-footer-caption">
                    <span className="text-slate-300 text-xs">
                      “Find the shop, save you Time” • Live PWA web app on pettah-bazaar.vercel.app with instant QR access.
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
      '1st': { 
        name: "1st Cross Street", 
        zone: "Electronics & Tech Alley",
        specialty: "Electronics, microcontrollers, Arduino components, audio amplifiers, smartphone accessories & hardware repair tools.", 
        shops: "8 Verified Tech Stalls",
        landmarks: "3-min walk from Main St; dense tech cluster"
      },
      '2nd': { 
        name: "2nd Cross Street", 
        zone: "Textiles & Saree Center",
        specialty: "Silk sarees, bridal fabrics, center point wholesale textiles, tailoring materials & cotton garments.", 
        shops: "12 Verified Saree Stalls",
        landmarks: "Famous central textile corridor"
      },
      'bankshall': { 
        name: "Bankshall Street", 
        zone: "Ceylon Spices & Herbs",
        specialty: "Pure Ceylon cinnamon, cardamom, cloves, black pepper, wholesale bulk spices & Ayurvedic medicinal herbs.", 
        shops: "6 Spice Wholesalers",
        landmarks: "Near Colombo Port gate; spice route"
      },
      'keyzer': { 
        name: "Keyzer Street", 
        zone: "Heavy Tools & Trade Hub",
        specialty: "Power tools, heavy electrical hardware, industrial fixtures, machinery parts & metal fabrication supplies.", 
        shops: "9 Hardware Emporiums",
        landmarks: "Near Sea St junction; heavy trade supply"
      },
      'main': {
        name: "Main Street",
        zone: "Arterial Retail Corridor",
        specialty: "Footwear, luggage, fashion retail, umbrellas, leather goods & everyday consumer merchandise.",
        shops: "15 Verified Retail Stores",
        landmarks: "Front promenade facing Fort Station"
      }
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

        {/* Card 1: Price Strategy (With Official Flexible Pricing Plans Infographic) */}
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
                  <span className="benefit-pill">Zero Cost Barrier & Scalable Merchant Tiers</span>
                </div>
                <p className="benefit-description">{slide.priceStrategy.customerBenefit}</p>
              </div>
            </div>

            {/* Two-Column Split: 4 Pricing Strategy Cards on Left, Official Pricing Infographic on Right */}
            <div className="card-detail-two-col mt-2">
              <div className="detail-col-features">
                <div className="col-top-badge proto mb-1.5 flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-teal-400 mr-1.5" />
                    <strong className="text-teal-300 text-sm">Tiered Monetization & Inclusivity Architecture:</strong>
                  </div>
                  <span className="text-[10px] text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded font-mono font-bold">3 Tiers</span>
                </div>
                <div className="features-spacious-grid">
                  {slide.priceStrategy.points.map((pt, idx) => (
                    <div key={idx} className="spacious-feature-card proto">
                      <div className="feature-top-header">
                        <span className={`feature-dot-badge ${idx === 0 ? 'teal' : idx === 1 ? 'orange' : idx === 2 ? 'gold' : 'cyan'}`}>
                          {idx === 0 ? '01' : idx === 1 ? '02' : idx === 2 ? '03' : '04'}
                        </span>
                        <h4 className="feature-head text-white text-sm font-bold">{pt.title}</h4>
                      </div>
                      <p className="feature-body-text text-slate-200 text-xs mt-1.5 leading-relaxed">{pt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Official Flexible Pricing Plans Infographic */}
              <div className="detail-col-media">
                <div className="media-large-frame proto-frame">
                  <div className="frame-header-strip">
                    <span className="text-xs font-bold text-teal-300 flex items-center">
                      <Sparkles className="w-3.5 h-3.5 mr-1 text-gold-400" />
                      Price Strategy — Flexible Pricing Plans
                    </span>
                    <span className="verified-chip text-[10px]">pettahbazaar.lk</span>
                  </div>
                  <div className="frame-image-wrap bg-slate-950/90 p-2">
                    <img 
                      src={slide.pricingPlansImage} 
                      alt="Pettah Bazaar Flexible Pricing Plans Infographic" 
                      className="frame-full-img pricing-plans-img"
                    />
                  </div>
                  <div className="frame-footer-caption">
                    <span className="text-slate-300 text-xs">
                      Transparent 3-tier structure: Free 0 LKR (Shoppers), 3,000 LKR (Starter/Growth), 7,500 LKR (Pro Merchant).
                    </span>
                  </div>
                </div>
              </div>
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
                <div className="col-top-badge proto mb-1.5 flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-teal-400 mr-1.5" />
                    <strong className="text-teal-300 text-sm">Distribution Architecture & Accessibility:</strong>
                  </div>
                  <span className="text-[10px] text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded font-mono font-bold">4 Pillars</span>
                </div>
                <div className="features-spacious-grid">
                  {slide.placeStrategy.points.map((pt, idx) => (
                    <div key={idx} className="spacious-feature-card proto">
                      <div className="feature-top-header">
                        <span className={`feature-dot-badge ${idx === 0 ? 'teal' : idx === 1 ? 'orange' : idx === 2 ? 'gold' : 'cyan'}`}>
                          {idx === 0 ? '01' : idx === 1 ? '02' : idx === 2 ? '03' : '04'}
                        </span>
                        <h4 className="feature-head text-white text-sm font-bold">{pt.title}</h4>
                      </div>
                      <p className="feature-body-text text-slate-200 text-xs mt-1.5 leading-relaxed">{pt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Interactive Pettah Micro-District Specialty Explorer (Photo slot removed) */}
              <div className="detail-col-media">
                <div className="media-large-frame proto-frame flex flex-col h-full justify-between">
                  <div className="frame-header-strip">
                    <span className="text-xs font-bold text-teal-300 flex items-center">
                      <Compass className="w-3.5 h-3.5 mr-1 text-gold-400" />
                      Interactive Pettah Micro-District Specialty Explorer
                    </span>
                    <span className="verified-chip text-[10px]">Colombo 11 Grid</span>
                  </div>

                  <div className="street-explorer-hub-body p-3 flex-1 flex flex-col justify-between bg-slate-950/80">
                    <div>
                      <div className="text-[11px] font-semibold text-slate-300 mb-2 flex items-center justify-between">
                        <span>Select Commercial Street:</span>
                        <span className="text-teal-400 text-[10px]">Click street to inspect cluster</span>
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
                    </div>

                    {/* Active Street Detailed Showcase */}
                    <div className="street-active-card p-3 rounded-lg bg-slate-900/90 border border-teal-500/40 shadow-inner my-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-primary-flame flex-shrink-0" />
                          <h4 className="font-bold text-teal-300 text-sm tracking-wide">{streets[selectedStreet]?.name}</h4>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-teal-300 bg-teal-500/15 px-2 py-0.5 rounded border border-teal-500/30">
                          {streets[selectedStreet]?.zone}
                        </span>
                      </div>
                      <p className="text-slate-200 text-xs leading-relaxed">
                        {streets[selectedStreet]?.specialty}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[11px]">
                        <span className="text-orange-300 font-semibold flex items-center">
                          <Store className="w-3.5 h-3.5 mr-1 text-orange-400" />
                          {streets[selectedStreet]?.shops}
                        </span>
                        <span className="text-slate-400 italic text-[10px]">
                          📍 {streets[selectedStreet]?.landmarks}
                        </span>
                      </div>
                    </div>

                    {/* Zero-barrier distribution highlight */}
                    <div className="street-channel-footer p-2.5 rounded bg-teal-950/40 border border-teal-500/25 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <span className="text-[11px] text-slate-300 leading-snug">
                        <strong>Lightweight Web App (PWA):</strong> Accessible 24/7 on any mobile browser with zero app installation overhead for on-the-go Pettah shoppers.
                      </span>
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

                <div className="promotion-mockup-frame mt-2 flex-1 min-h-0">
                  <div className="mockup-hand-inner">
                    <img 
                      src={slide.appMockup} 
                      alt="Pettah Bazaar Mobile Mockup" 
                      className="mockup-hand-img"
                    />
                    <div className="mockup-overlay-badge">
                      <Smartphone className="w-3.5 h-3.5 text-teal-300 mr-1 flex-shrink-0" />
                      <span>On-The-Go Discovery in Crowded Alleys</span>
                    </div>
                  </div>
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
              {/* Left: 4 Physical Evidence Elements + Proof of Concept Banner */}
              <div className="detail-col-features flex flex-col justify-between">
                <div className="evidence-spacious-list">
                  {slide.physicalEvidenceStrategy.elements.slice(0, 4).map((ev, idx) => (
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
                
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-teal-500/40 flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 mr-2 flex-shrink-0" />
                    <span className="text-slate-200 text-xs font-semibold">Proof of Concept: Actual Live Screen & Handheld Mockup Demonstrated on Right</span>
                  </div>
                  <span className="text-[10px] text-teal-300 font-mono font-bold bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">Verified</span>
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

    const getEthicsIcon = (code) => {
      switch (code) {
        case 'E1': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
        case 'E2': return <HeartHandshake className="w-5 h-5 text-teal-300" />;
        case 'E3': return <Scale className="w-5 h-5 text-cyan-400" />;
        case 'E4': return <Lock className="w-5 h-5 text-gold-400" />;
        case 'E5': return <Eye className="w-5 h-5 text-pink-400" />;
        case 'E6': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
        default: return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      }
    };

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
                      <div className="ethics-icon-box">
                        {getEthicsIcon(eth.code)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="ethics-code-badge">{eth.code}</span>
                          <span className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-wider">Kotler Ethics Pillar</span>
                        </div>
                        <h4 className="ethics-title text-sm font-bold text-white leading-tight">{eth.title}</h4>
                      </div>
                    </div>
                    <PointList points={eth.points || [eth.desc]} color="emerald" className="mt-2" />
                  </div>
                  
                  <div className="ethics-badge-tag mt-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1.5 flex-shrink-0" />
                    <span>Verified Academic Ethical Standard</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {subCard18 === 1 && (
          <div className="slide-subcard-container animate-fade-in flex flex-col justify-between">
            <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
              {currentPillars.map((eth, idx) => (
                <div 
                  key={idx} 
                  className="ethics-card visual-interactive-card flex flex-col justify-between"
                >
                  <div>
                    <div className="ethics-header">
                      <div className="ethics-icon-box">
                        {getEthicsIcon(eth.code)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="ethics-code-badge">{eth.code}</span>
                          <span className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-wider">Kotler Ethics Pillar</span>
                        </div>
                        <h4 className="ethics-title text-sm font-bold text-white leading-tight">{eth.title}</h4>
                      </div>
                    </div>
                    <PointList points={eth.points || [eth.desc]} color="emerald" className="mt-2" />
                  </div>
                  
                  <div className="ethics-badge-tag mt-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1.5 flex-shrink-0" />
                    <span>Verified Academic Ethical Standard</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ethics-trust-statement visual-glow-banner mt-2.5">
              <ShieldCheck className="w-5 h-5 text-primary-flame mr-2.5 flex-shrink-0 animate-pulse" />
              <span className="text-xs leading-relaxed text-slate-200">
                <strong className="text-white">Our Formal Commitment to Trust:</strong> Responsible marketing requires that consumer and merchant trust is treated as the venture's most valuable asset. We maintain strict academic research integrity, zero phantom listings, and verified data veracity.
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
          <div className="slide-subcard-container animate-fade-in flex flex-col justify-between flex-1 min-h-0">
            {/* 4-Pillar Executive Summary Scorecard */}
            <div className="executive-scorecard-strip">
              <div className="scorecard-item">
                <div className="scorecard-icon-circle emerald">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="scorecard-val">Validated</div>
                <div className="scorecard-lbl">Real Market Problem in Pettah</div>
                <span className="scorecard-badge emerald">100% Problem Confirmed</span>
              </div>
              <div className="scorecard-item">
                <div className="scorecard-icon-circle cyan">
                  <Globe className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="scorecard-val">Live Deployed</div>
                <div className="scorecard-lbl">Working PWA Prototype</div>
                <span className="scorecard-badge cyan">pettah-bazaar.vercel.app</span>
              </div>
              <div className="scorecard-item">
                <div className="scorecard-icon-circle gold">
                  <Scale className="w-5 h-5 text-gold-400" />
                </div>
                <div className="scorecard-val">Ethical & Free</div>
                <div className="scorecard-lbl">Vendor Empowerment Model</div>
                <span className="scorecard-badge gold">Zero Paywalls for Stalls</span>
              </div>
              <div className="scorecard-item">
                <div className="scorecard-icon-circle flame">
                  <Users className="w-5 h-5 text-primary-flame" />
                </div>
                <div className="scorecard-val">10 Presenters</div>
                <div className="scorecard-lbl">KDU Intake 43 Presentation</div>
                <span className="scorecard-badge flame">Collaborative Defense</span>
              </div>
            </div>

            <div className="spacious-strategy-card flex-1 min-h-0 mt-2.5 p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white text-base font-bold flex items-center">
                    <Award className="w-5 h-5 text-gold-400 mr-2" />
                    Key Strategic Milestones Delivered:
                  </h4>
                  <span className="text-xs text-teal-300 font-semibold bg-teal-500/10 px-2.5 py-0.5 rounded border border-teal-500/30">Capstone Ready</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="milestone-pod p-3 rounded-xl bg-slate-900/90 border border-teal-500/40 shadow-md">
                    <div className="flex items-center gap-2 mb-1.5">
                      <BookOpen className="w-4 h-4 text-teal-300 flex-shrink-0" />
                      <strong className="text-teal-300 text-sm font-bold">1. Academic Marketing Rigor</strong>
                    </div>
                    <p className="text-slate-200 text-xs leading-relaxed">
                      Fully grounded in Kotler 7Ps Framework, STP Segmentation (Geographic, Demographic, Psychographic, Behavioural), Strategic Perceptual Map, and ethical compliance standards.
                    </p>
                  </div>
                  <div className="milestone-pod p-3 rounded-xl bg-slate-900/90 border border-teal-500/40 shadow-md">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Target className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      <strong className="text-orange-300 text-sm font-bold">2. Field Viability & Commercial Value</strong>
                    </div>
                    <p className="text-slate-200 text-xs leading-relaxed">
                      Direct field observations across 1st to 5th Cross Streets confirm huge item density, walking fatigue, and strong merchant willingness to claim free digital store profiles.
                    </p>
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

  // Slide 20: Thank You & Any Questions (Grand Finale)
  if (slide.id === 20) {
    return (
      <div className={`slide-content slide-thank-you-pure ${animClass} ${spotlightClass}`}>
        <div className="thank-you-pure-wrapper">
          <h1 className="thank-you-pure-title">
            THANK <span className="brand-accent-text">YOU!</span>
          </h1>
          <div className="any-questions-pure-box">
            <h2 className="any-questions-pure-text">ANY QUESTIONS?</h2>
          </div>
        </div>
      </div>
    );
  }


  return <div>Slide {slide.id} Content</div>;
}
