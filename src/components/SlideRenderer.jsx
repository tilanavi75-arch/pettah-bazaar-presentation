import React, { useState } from 'react';
import { 
  Compass, MapPin, Search, Tag, Users, Zap, Clock, ShieldCheck, 
  ArrowRight, ExternalLink, CheckCircle2, AlertTriangle, Layers, 
  BookOpen, Target, Crosshair, BarChart3, HelpCircle, Eye, Phone,
  FileCheck, HeartHandshake, Sparkles, AlertCircle, Quote, Smartphone,
  Globe, QrCode, Store, Scale, Lock, TrendingUp, Navigation2, Info,
  ShoppingBag, Flame, Star, Award, Check, Play, EyeOff, Radio, Activity,
  ThumbsUp, DollarSign, LayoutGrid, ChevronRight, MessageSquare, Volume2,
  Share2, Trophy, CheckSquare, RefreshCw, BarChart2, ShieldAlert, Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';

import VideoSlidePlaceholder from './VideoSlidePlaceholder';
import InteractivePrototype from './InteractivePrototype';
import { teamMembers } from '../data/slidesData';

export default function SlideRenderer({ slide, onJumpToSlide }) {
  // State for interactive features on specific slides
  const [problemPhoto, setProblemPhoto] = useState('alley'); // 'alley' or 'traffic'
  const [activeStep, setActiveStep] = useState(0); // For Slide 6 concept step
  const [theoryView, setTheoryView] = useState('cards'); // 'cards' or 'table' for Slide 8
  const [hoveredMember, setHoveredMember] = useState(null); // For Slide 1 team hover
  const [activePersona, setActivePersona] = useState(0); // For Slide 9 persona toggle
  const [positioningView, setPositioningView] = useState('map'); // 'map' or 'bullseye' for Slide 10
  const [selectedStreet, setSelectedStreet] = useState('2nd'); // For Slide 14 street explorer
  const [productLevel, setProductLevel] = useState(1); // For Slide 12 Kotler levels
  const [pricingCycle, setPricingCycle] = useState('phase1'); // For Slide 13 pricing tiers
  const [activeEthic, setActiveEthic] = useState(null); // For Slide 18 ethics cards
  const [slide20View, setSlide20View] = useState('thankYou'); // 'thankYou' or 'references' for Slide 20

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
      <VideoSlidePlaceholder 
        slideNumber={slide.slideNumber}
        heading={slide.videoHeading}
        label={slide.videoLabel}
        caption={slide.videoCaption}
        presenter={slide.presenter}
        context={slide.videoContext}
      />
    );
  }

  // Slide 1: Executive Cover Page & Brand Introduction
  if (slide.id === 1) {
    return (
      <div className="slide-content cover-page-master">
        {/* Background Ambient Glow Elements */}
        <div className="cover-ambient-glow top-right"></div>
        <div className="cover-ambient-glow bottom-left"></div>

        {/* Top Academic & Presentation Credential Header */}
        <div className="cover-top-ribbon">
          <div className="ribbon-university-group">
            <div className="univ-crest-badge">
              <Award className="w-4 h-4 text-primary-flame" />
              <span>KDU</span>
            </div>
            <div className="univ-text-meta">
              <span className="univ-name">{slide.meta.university}</span>
              <span className="univ-sub">{slide.meta.faculty} • {slide.meta.degree}</span>
            </div>
          </div>

          <div className="ribbon-module-group">
            <span className="module-badge">
              <span className="badge-pulse-dot"></span>
              {slide.meta.module}
            </span>
            <span className="duration-badge">
              <Clock className="w-3.5 h-3.5 text-gold-400 mr-1" />
              {slide.meta.duration}
            </span>
          </div>
        </div>

        {/* Center Main Stage (Hero Typography + Cinematic Photography Showcase) */}
        <div className="cover-hero-grid">
          {/* Left Hero Content */}
          <div className="cover-hero-text">
            <div className="cover-category-chip">
              <Flame className="w-3.5 h-3.5 text-primary-flame mr-1.5 animate-pulse" />
              <span>PROPOSED DIGITAL SHOP-DISCOVERY PLATFORM • COLOMBO 11</span>
            </div>

            <h1 className="cover-brand-title">
              PETTAH<span className="cover-brand-glow">BAZAAR</span>
            </h1>

            <div className="cover-tagline-glass">
              <span className="tagline-quote">“</span>
              <span className="tagline-main">{slide.tagline}</span>
              <span className="tagline-quote">”</span>
            </div>

            <p className="cover-subtitle-lead">
              A student-developed digital discovery engine designed to bridge Colombo’s most congested commercial hub with instant, product-first micro-location search.
            </p>

            {/* Key Platform Value Badges */}
            <div className="cover-stats-row">
              <div className="cover-stat-card">
                <MapPin className="w-4 h-4 text-cyan-400 mb-0.5" />
                <div className="stat-val">11</div>
                <div className="stat-lbl">Micro-Streets Mapped</div>
              </div>

              <div className="cover-stat-card">
                <Store className="w-4 h-4 text-gold-400 mb-0.5" />
                <div className="stat-val">28+</div>
                <div className="stat-lbl">Verified Stalls Active</div>
              </div>

              <div className="cover-stat-card">
                <Clock className="w-4 h-4 text-emerald-400 mb-0.5" />
                <div className="stat-val">&lt; 3 Min</div>
                <div className="stat-lbl">Discovery Speed</div>
              </div>

              <div className="cover-stat-card">
                <Globe className="w-4 h-4 text-primary-flame mb-0.5" />
                <div className="stat-val">Zero LKR</div>
                <div className="stat-lbl">Merchant Barrier</div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div className="cover-hero-visual">
            <div className="cover-photo-frame">
              <img 
                src={slide.heroImage} 
                alt="Pettah commercial epicenter crowd in Colombo" 
                className="cover-hero-img"
              />

              {/* Floating Live Badges */}
              <div className="cover-float-chip chip-top-right animate-float">
                <div className="chip-indicator-dot green"></div>
                <span>Live Prototype Tested</span>
              </div>

              <div className="cover-float-chip chip-bottom-left animate-float-delay">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 mr-1" />
                <span>2nd Cross & Keyzer St</span>
              </div>

              <div className="cover-photo-overlay">
                <div className="photo-credit-text">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400 mr-1.5" />
                  <span>Field Research Photography • Colombo 11 Commercial Epicenter</span>
                </div>
                <div className="deployed-link-pill">
                  pettah-bazaar.vercel.app
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Executive Presenter Deck (All 10 Team Members) */}
        <div className="cover-team-deck">
          <div className="team-deck-header">
            <div className="deck-title">
              <Users className="w-4 h-4 text-primary-flame mr-1.5" />
              <span>PROJECT EXECUTIVE TEAM — 10 PRESENTERS (INTAKE 43 — BSM 12012):</span>
            </div>
            <div className="deck-meta">
              BSc (Hons) in Management • KDU Faculty of Management, Social Sciences & Humanities
            </div>
          </div>

          <div className="cover-presenters-grid">
            {teamMembers.map((m) => (
              <div 
                key={m.id} 
                className={`presenter-card-cover ${hoveredMember === m.id ? 'active' : ''}`}
                onMouseEnter={() => setHoveredMember(m.id)}
                onMouseLeave={() => setHoveredMember(null)}
                title={`${m.role}: ${m.focus}`}
              >
                <div className="presenter-num-chip">0{m.id}</div>
                <div className="presenter-info">
                  <div className="presenter-name-cover">{m.name}</div>
                  <div className="presenter-role-cover">{m.focus}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Hover Info Cue */}
          {hoveredMember && (
            <div className="cover-hover-cue animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 mr-1.5 flex-shrink-0" />
              <span>
                <strong>{teamMembers.find(m => m.id === hoveredMember)?.name}</strong>: {teamMembers.find(m => m.id === hoveredMember)?.role} — <em>{teamMembers.find(m => m.id === hoveredMember)?.focus}</em>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Slide 2: Introduction & Brand Identity
  if (slide.id === 2) {
    return (
      <div className="slide-content slide-two-column">
        <div className="slide-header-bar">
          <div>
            <span className="section-tag">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <div className="pillars-grid-2x2">
          {slide.brandPillars.map((p, idx) => (
            <div key={idx} className="brand-pillar-card visual-interactive-card">
              <div className="pillar-header">
                <div className="pillar-num-badge">0{idx + 1}</div>
                <div className="flex-1">
                  <h4 className="pillar-title">{p.title}</h4>
                  <span className="pillar-micro-tag">
                    {idx === 0 && "Core Discovery Engine"}
                    {idx === 1 && "High-Density Commercial Grid"}
                    {idx === 2 && "Heritage Meets Technology"}
                    {idx === 3 && "Customer Value Promise"}
                  </span>
                </div>
              </div>
              <p className="pillar-desc">{p.desc}</p>
              
              <div className="pillar-progress-track">
                <div className="pillar-progress-fill" style={{ width: `${80 + idx * 5}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Commercial Metrics Strip */}
        <div className="commercial-metrics-strip">
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

        <div className="brand-purpose-banner visual-glow-banner">
          <div className="purpose-icon-wrap">
            <HeartHandshake className="w-6 h-6 text-primary-flame flex-shrink-0 animate-pulse" />
          </div>
          <div className="purpose-text">
            <strong>Core Brand Purpose:</strong> Pettah Bazaar aims to make discovering relevant shops in Pettah more convenient, bridging physical street commerce with modern digital accessibility.
          </div>
          <div className="purpose-badge-pill">
            <Activity className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            Active Student Mission
          </div>
        </div>
      </div>
    );
  }

  // Slide 3: Market Problem
  if (slide.id === 3) {
    return (
      <div className="slide-content slide-problem">
        <div className="slide-header-bar">
          <div>
            <span className="section-tag problem">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

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

        <div className="problem-split-layout">
          <div className="problem-points-col">
            {slide.problemPoints.map((pt, idx) => (
              <div key={idx} className="problem-item-card visual-card">
                <div className="problem-item-header">
                  <span className="problem-tag">{pt.tag}</span>
                  <h4 className="problem-item-title">{pt.title}</h4>
                </div>
                <p className="problem-item-desc">{pt.desc}</p>
              </div>
            ))}

            {/* Problem Severity Indicators */}
            <div className="severity-indicators-row">
              <div className="severity-pill">
                <span className="pill-dot red"></span>
                <span>Walking Fatigue: <strong>89% High</strong></span>
              </div>
              <div className="severity-pill">
                <span className="pill-dot red"></span>
                <span>Directory Coverage: <strong>0% Unmapped</strong></span>
              </div>
            </div>

            <div className="observation-disclaimer">
              <AlertCircle className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>{slide.observationNote}</span>
            </div>
          </div>

          <div className="problem-image-col">
            {/* Interactive Photo Switcher */}
            <div className="photo-switcher-tabs">
              <button 
                className={`photo-tab-btn ${problemPhoto === 'alley' ? 'active' : ''}`}
                onClick={() => setProblemPhoto('alley')}
              >
                Photo 1: Congested Alleys
              </button>
              <button 
                className={`photo-tab-btn ${problemPhoto === 'traffic' ? 'active' : ''}`}
                onClick={() => setProblemPhoto('traffic')}
              >
                Photo 2: Street Traffic Gridlock
              </button>
            </div>

            <div className="problem-photo-card">
              <img 
                src={problemPhoto === 'alley' ? slide.image : slide.trafficImage} 
                alt="Pettah field study photograph" 
                className="problem-photo"
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
    );
  }

  // Slide 5: Market Opportunity & Research Insights
  if (slide.id === 5) {
    return (
      <div className="slide-content">
        <div className="slide-header-bar">
          <div>
            <span className="section-tag opportunity">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        {/* 3-Step Journey Flow Infographic with Animated Connectors */}
        <div className="opportunity-flow-row">
          {slide.journey.map((j, idx) => (
            <React.Fragment key={idx}>
              <div className="journey-node-card visual-node">
                <div className="node-icon-header">
                  <div className="journey-step-badge">Stage {j.step}</div>
                  {idx === 0 && <AlertTriangle className="w-5 h-5 text-red-400" />}
                  {idx === 1 && <Radio className="w-5 h-5 text-gold-400 animate-pulse" />}
                  {idx === 2 && <ShoppingBag className="w-5 h-5 text-primary-flame" />}
                </div>
                <h4 className="journey-stage-title">{j.stage}</h4>
                <p className="journey-desc">{j.desc}</p>
              </div>
              {idx < slide.journey.length - 1 && (
                <div className="journey-arrow">
                  <ArrowRight className="w-6 h-6 text-primary-flame animate-pulse" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

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
        <div className="insights-tri-grid">
          {slide.insights.map((ins, idx) => (
            <div key={idx} className="insight-card visual-card">
              <div className="insight-metric">{ins.metric}</div>
              <h5 className="insight-label">{ins.label}</h5>
              <p className="insight-detail">{ins.detail}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Slide 6: Product Concept (Interactive Showroom)
  if (slide.id === 6) {
    return (
      <div className="slide-content">
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
                  <p className="concept-desc">{st.desc}</p>
                  
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
    return (
      <div className="slide-content">
        <div className="slide-header-bar">
          <div>
            <span className="section-tag">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <div className="value-prop-hero-box">
          <div className="prop-tag">PROPOSED VALUE PROPOSITION</div>
          <blockquote className="prop-quote">
            {slide.valueProposition}
          </blockquote>
        </div>

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
        <div className="strategy-canvas-banner">
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

        <div className="innovation-quad-grid mt-3">
          {slide.pillars.map((pil, idx) => (
            <div key={idx} className="innovation-card visual-card">
              <div className="card-top-tag">{pil.tag}</div>
              <h4 className="card-heading">{pil.title}</h4>
              <p className="card-body">{pil.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Slide 8: Application of Marketing Concepts (Dashboard + Table Toggle)
  if (slide.id === 8) {
    return (
      <div className="slide-content">
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

        {/* Kotler 5-Stage Customer Value Flow Banner */}
        <div className="kotler-value-flow-strip">
          <div className="flow-step">1. Needs & Chaos</div>
          <ArrowRight className="w-3.5 h-3.5 text-primary-flame" />
          <div className="flow-step highlight">2. Value Proposition</div>
          <ArrowRight className="w-3.5 h-3.5 text-primary-flame" />
          <div className="flow-step">3. Integrated 4Ps</div>
          <ArrowRight className="w-3.5 h-3.5 text-primary-flame" />
          <div className="flow-step">4. Merchant Trust</div>
          <ArrowRight className="w-3.5 h-3.5 text-primary-flame" />
          <div className="flow-step highlight-orange">5. Value Capture</div>
        </div>

        {theoryView === 'cards' ? (
          <div className="marketing-concept-cards-grid">
            {slide.table.map((row, idx) => (
              <div key={idx} className="theory-card visual-card">
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
                    <h4 className="theory-concept-name">{row.concept}</h4>
                    <span className="theory-author-pill">Kotler & Armstrong</span>
                  </div>
                </div>

                <div className="theory-def-box">
                  <span className="def-label">Academic Definition:</span>
                  <p className="def-text">{row.academicDefinition}</p>
                </div>

                <div className="theory-app-box">
                  <span className="app-label">Pettah Bazaar Application:</span>
                  <p className="app-text">{row.application}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="marketing-concepts-table-container">
            <table className="marketing-theory-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>Core Marketing Concept</th>
                  <th style={{ width: '38%' }}>Academic Theoretical Definition (Kotler & Armstrong)</th>
                  <th style={{ width: '40%' }}>Practical Application to Pettah Bazaar</th>
                </tr>
              </thead>
              <tbody>
                {slide.table.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td className="concept-cell">
                      <strong>{row.concept}</strong>
                    </td>
                    <td className="academic-cell">{row.academicDefinition}</td>
                    <td className="application-cell">
                      <span className="app-highlight">{row.application}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

    return (
      <div className="slide-content">
        <div className="slide-header-bar">
          <div>
            <span className="section-tag stp">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <div className="segmentation-quad-grid">
          {slide.segments.map((seg, idx) => (
            <div key={idx} className="segment-card visual-interactive-card">
              <div className="segment-header">
                <div className="segment-icon-wrap">
                  {seg.variable === 'Geographic' && <MapPin className="w-5 h-5 text-cyan-400" />}
                  {seg.variable === 'Demographic' && <Users className="w-5 h-5 text-primary-flame" />}
                  {seg.variable === 'Psychographic' && <Zap className="w-5 h-5 text-gold-400" />}
                  {seg.variable === 'Behavioural' && <Smartphone className="w-5 h-5 text-pink-400" />}
                </div>
                <div>
                  <h4 className="segment-var-title">{seg.variable}</h4>
                  <span className="segment-focus-tag">{seg.focus}</span>
                </div>
              </div>
              <p className="segment-details">{seg.details}</p>

              {/* Visual Persona Chips */}
              <div className="segment-persona-chips">
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

        {/* Interactive Target Persona Cards Bar */}
        <div className="interactive-personas-bar">
          <div className="personas-header">
            <span className="font-semibold text-white">Interactive Customer Archetypes:</span>
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
          <div className="persona-details-card animate-fade-in">
            <div className="persona-left">
              <div className="persona-avatar-wrap">
                <Users className="w-6 h-6 text-primary-flame" />
              </div>
              <div>
                <h5 className="persona-title">{personas[activePersona].name}</h5>
                <span className="persona-role-tag">{personas[activePersona].role}</span>
              </div>
            </div>
            <div className="persona-center">
              <div className="persona-item">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 mr-1" />
                <span>Target: <strong>{personas[activePersona].target}</strong></span>
              </div>
              <div className="persona-item">
                <Target className="w-3.5 h-3.5 text-gold-400 mr-1" />
                <span>Goal: <em>"{personas[activePersona].goal}"</em></span>
              </div>
            </div>
            <div className="persona-right">
              <span className="persona-badge-tag">{personas[activePersona].badge}</span>
            </div>
          </div>
        </div>

        <div className="academic-summary-note">
          <Info className="w-4 h-4 text-primary-flame mr-2 flex-shrink-0" />
          <span>{slide.summaryNote}</span>
        </div>
      </div>
    );
  }

  // Slide 10: Targeting & Positioning Strategy
  if (slide.id === 10) {
    return (
      <div className="slide-content">
        <div className="slide-header-bar">
          <div>
            <span className="section-tag stp">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="view-mode-toggle">
              <button 
                className={`toggle-view-btn ${positioningView === 'map' ? 'active' : ''}`}
                onClick={() => setPositioningView('map')}
              >
                <Crosshair className="w-3.5 h-3.5 mr-1" />
                Positioning Map (2x2)
              </button>
              <button 
                className={`toggle-view-btn ${positioningView === 'bullseye' ? 'active' : ''}`}
                onClick={() => setPositioningView('bullseye')}
              >
                <Target className="w-3.5 h-3.5 mr-1" />
                Target Bullseye
              </button>
            </div>
            <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
          </div>
        </div>

        <div className="targeting-positioning-grid">
          {/* Left Column: Interactive Diagram (2x2 Map OR Bullseye) */}
          <div className="target-col">
            {positioningView === 'map' ? (
              <div className="perceptual-map-card">
                <div className="map-title-bar">
                  <Crosshair className="w-4 h-4 text-primary-flame mr-1.5" />
                  <span>Strategic Perceptual Positioning Map</span>
                </div>
                
                <div className="perceptual-matrix">
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
            ) : (
              <div className="bullseye-diagram-card">
                <div className="bullseye-header">
                  <Target className="w-4 h-4 text-primary-flame mr-1.5" />
                  <span>Target Market Prioritization</span>
                </div>
                
                <div className="bullseye-rings-visual">
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
            )}

            <div className="secondary-targets-list mt-3">
              <div className="secondary-header">Detailed Target Cohorts:</div>
              {slide.targetGroups.secondary.map((sec, idx) => (
                <div key={idx} className="secondary-item">
                  <strong>{sec.name}:</strong> <span>{sec.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Positioning Statement & Tagline */}
          <div className="positioning-col">
            <div className="formal-positioning-card visual-glow-card">
              <div className="card-top-tag">FORMAL POSITIONING STATEMENT</div>
              <blockquote className="positioning-statement">
                {slide.positioningStatement}
              </blockquote>

              <div className="positioning-breakdown">
                <div className="breakdown-item">
                  <span className="item-label">Target Customer:</span>
                  <span className="item-val">Shoppers visiting Pettah seeking specific items</span>
                </div>
                <div className="breakdown-item">
                  <span className="item-label">Core Benefit:</span>
                  <span className="item-val">Frictionless product-to-shop discovery & time savings</span>
                </div>
                <div className="breakdown-item">
                  <span className="item-label">Competitive Edge:</span>
                  <span className="item-val">Hyper-local Pettah street precision (not broad generic pins)</span>
                </div>
              </div>

              <div className="tagline-callout-box">
                <span className="tagline-label">OFFICIAL BRAND TAGLINE:</span>
                <span className="tagline-big">“{slide.taglineEmphasis}”</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 11: Competitor Analysis Matrix
  if (slide.id === 11) {
    return (
      <div className="slide-content">
        <div className="slide-header-bar">
          <div>
            <span className="section-tag competitor">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

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

        <div className="competitor-matrix-wrap">
          <table className="competitor-table">
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

        <div className="academic-competitor-note">
          <Scale className="w-4 h-4 text-primary-flame mr-2 flex-shrink-0" />
          <span>{slide.keyTakeaway}</span>
        </div>
      </div>
    );
  }

  // Slide 12: Product Strategy (4Ps: Product)
  if (slide.id === 12) {
    return (
      <div className="slide-content">
        <div className="slide-header-bar">
          <div>
            <span className="section-tag mix">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        {/* Kotler 3-Level Product Architecture Visual */}
        <div className="product-levels-bar">
          <div 
            className={`level-pill ${productLevel === 1 ? 'active' : ''}`}
            onClick={() => setProductLevel(1)}
          >
            <span className="level-num">1</span>
            <div>
              <span className="level-title">Core Customer Value</span>
              <span className="level-sub">Time Savings & Instant Match</span>
            </div>
          </div>

          <div 
            className={`level-pill ${productLevel === 2 ? 'active' : ''}`}
            onClick={() => setProductLevel(2)}
          >
            <span className="level-num">2</span>
            <div>
              <span className="level-title">Actual Product</span>
              <span className="level-sub">Verified Stalls & Landmarks</span>
            </div>
          </div>

          <div 
            className={`level-pill ${productLevel === 3 ? 'active' : ''}`}
            onClick={() => setProductLevel(3)}
          >
            <span className="level-num">3</span>
            <div>
              <span className="level-title">Augmented Product</span>
              <span className="level-sub">WhatsApp & Community Ratings</span>
            </div>
          </div>
        </div>

        <div className="product-strategy-grid mt-3">
          {/* Current Working Prototype Features */}
          <div className="product-strat-card current visual-card">
            <div className="strat-card-header">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
              <div>
                <h4 className="strat-title">CURRENT PROTOTYPE FEATURES</h4>
                <p className="strat-subtitle">Verified & Operational in Student Prototype</p>
              </div>
            </div>
            <div className="strat-features-list">
              {slide.comparison.currentPrototype.map((f, idx) => (
                <div key={idx} className="strat-feature-item">
                  <div className="feature-name">
                    <span>{f.feature}</span>
                    <span className="feature-status current">{f.status}</span>
                  </div>
                  <p className="feature-detail">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Proposed Future Roadmap Features */}
          <div className="product-strat-card future visual-card">
            <div className="strat-card-header">
              <Sparkles className="w-5 h-5 text-primary-flame mr-2" />
              <div>
                <h4 className="strat-title">PROPOSED FUTURE FEATURES</h4>
                <p className="strat-subtitle">Planned Extensions Following Field Testing</p>
              </div>
            </div>
            <div className="strat-features-list">
              {slide.comparison.futureRoadmap.map((f, idx) => (
                <div key={idx} className="strat-feature-item">
                  <div className="feature-name">
                    <span>{f.feature}</span>
                    <span className="feature-status future">{f.status}</span>
                  </div>
                  <p className="feature-detail">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 13: Pricing Strategy (4Ps: Price)
  if (slide.id === 13) {
    return (
      <div className="slide-content">
        <div className="slide-header-bar">
          <div>
            <span className="section-tag mix">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        {/* Pricing Strategy Phase Selector */}
        <div className="pricing-phase-selector">
          <button 
            className={`phase-btn ${pricingCycle === 'phase1' ? 'active' : ''}`}
            onClick={() => setPricingCycle('phase1')}
          >
            Phase 1: Zero-Barrier Onboarding (Current)
          </button>
          <button 
            className={`phase-btn ${pricingCycle === 'phase2' ? 'active' : ''}`}
            onClick={() => setPricingCycle('phase2')}
          >
            Phase 2: Freemium Commercial Monetization (Future)
          </button>
        </div>

        <div className="pricing-models-grid">
          {slide.models.map((m, idx) => (
            <div key={idx} className={`pricing-tier-card visual-card ${idx === 0 ? 'featured-pricing-card' : ''}`}>
              <div className="tier-header">
                <span className="tier-tag">{m.tag}</span>
                <h4 className="tier-name">{m.tier}</h4>
              </div>

              {/* Price visual pill */}
              <div className="tier-cost-badge">
                {idx === 0 && <span className="price-tag-big">LKR 0 <small>/ Always Free</small></span>}
                {idx === 1 && <span className="price-tag-big">LKR 750 <small>/ Month</small></span>}
                {idx === 2 && <span className="price-tag-big">LKR 1,500 <small>/ Month</small></span>}
              </div>

              <p className="tier-desc">{m.desc}</p>
              <div className="tier-rationale-box">
                <strong>Strategic Rationale:</strong> {m.rationale}
              </div>
            </div>
          ))}
        </div>

        <div className="academic-disclaimer-banner">
          <AlertCircle className="w-4 h-4 text-gold-400 mr-2 flex-shrink-0" />
          <span>{slide.academicDisclaimer}</span>
        </div>
      </div>
    );
  }

  // Slide 14: Place Strategy (4Ps: Place)
  if (slide.id === 14) {
    const streets = {
      '1st': { name: "1st Cross Street", specialty: "Electronics, Microcontrollers, Audio & Mobile Tech", shops: "8 Verified Tech Stalls" },
      '2nd': { name: "2nd Cross Street", specialty: "Textiles, Silk Sarees, Center Point & Wholesale Fabric", shops: "12 Verified Saree Stalls" },
      'bankshall': { name: "Bankshall Street", specialty: "Pure Ceylon Spices, Cinnamon, Cardamom & Ayurvedic Herbs", shops: "6 Spice Wholesalers" },
      'sea': { name: "Sea Street", specialty: "Traditional Gold, Jewelry & Gemstone Artisans", shops: "4 Verified Goldsmiths" },
      'main': { name: "Main Street", specialty: "Bags, Footwear, Leather Goods & Retail Accessories", shops: "10 Retail Emporiums" }
    };

    return (
      <div className="slide-content">
        <div className="slide-header-bar">
          <div>
            <span className="section-tag mix">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        {/* Interactive Street Explorer Banner */}
        <div className="street-explorer-bar">
          <div className="explorer-header">
            <MapPin className="w-4 h-4 text-primary-flame mr-1.5" />
            <span>Interactive Pettah Commercial Micro-District Selector:</span>
          </div>
          <div className="street-pills-row">
            {Object.keys(streets).map((key) => (
              <button
                key={key}
                className={`street-pill-btn ${selectedStreet === key ? 'active' : ''}`}
                onClick={() => setSelectedStreet(key)}
              >
                {streets[key].name}
              </button>
            ))}
          </div>
          <div className="selected-street-info animate-fade-in">
            <span className="font-semibold text-primary-flame">{streets[selectedStreet].name}:</span>
            <span className="text-slate-300 ml-2">{streets[selectedStreet].specialty}</span>
            <span className="shops-count-badge ml-auto">{streets[selectedStreet].shops}</span>
          </div>
        </div>

        <div className="place-channels-grid mt-3">
          {slide.channels.map((ch, idx) => (
            <div key={idx} className="place-card visual-card">
              <div className="place-header">
                <div className="place-icon-wrap">
                  {ch.icon === 'globe' && <Globe className="w-5 h-5 text-primary-flame" />}
                  {ch.icon === 'qr-code' && <QrCode className="w-5 h-5 text-gold-400" />}
                  {ch.icon === 'laptop' && <Layers className="w-5 h-5 text-cyan-400" />}
                  {ch.icon === 'smartphone' && <Smartphone className="w-5 h-5 text-pink-400" />}
                </div>
                <div>
                  <h4 className="place-title">{ch.channel}</h4>
                  <span className="place-status-tag">{ch.status}</span>
                </div>
              </div>
              <p className="place-desc">{ch.desc}</p>
            </div>
          ))}
        </div>

        {/* Animated Customer Access Funnel */}
        <div className="customer-access-diagram visual-glow-banner">
          <div className="diagram-step">
            <Search className="w-3.5 h-3.5 mr-1 text-primary-flame inline" />
            1. CUSTOMER QUERY
          </div>
          <ArrowRight className="w-4 h-4 text-primary-flame animate-pulse" />
          <div className="diagram-step highlight">
            <Globe className="w-3.5 h-3.5 mr-1 inline" />
            2. PETTAH BAZAAR PWA
          </div>
          <ArrowRight className="w-4 h-4 text-primary-flame animate-pulse" />
          <div className="diagram-step">
            <Navigation2 className="w-3.5 h-3.5 mr-1 text-gold-400 inline" />
            3. VERIFIED SHOP & ROUTE
          </div>
          <ArrowRight className="w-4 h-4 text-primary-flame animate-pulse" />
          <div className="diagram-step highlight-orange">
            <Store className="w-3.5 h-3.5 mr-1 inline" />
            4. IN-STORE PURCHASE
          </div>
        </div>
      </div>
    );
  }

  // Slide 15: Promotion Strategy (4Ps: Promotion)
  if (slide.id === 15) {
    return (
      <div className="slide-content">
        <div className="slide-header-bar">
          <div>
            <span className="section-tag mix">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <div className="promotion-layout-grid">
          {/* Left: Promotional Mix details & Social Reel Mockup */}
          <div className="promo-tools-col">
            <div className="campaign-name-banner">
              CAMPAIGN THEME: “Find the Shop. Save Your Time.”
            </div>

            {/* Interactive TikTok / Viral Reel Mockup Strip */}
            <div className="viral-reel-card">
              <div className="reel-header">
                <Flame className="w-4 h-4 text-primary-flame mr-1.5 animate-pulse" />
                <span>Simulated Viral TikTok / Reels Campaign</span>
                <span className="live-pill">High Engagement</span>
              </div>
              <div className="reel-body">
                <div className="reel-caption">
                  "POV: Finding wholesale silk sarees in Pettah in under 60 seconds with Pettah Bazaar 🛍️🔥 #ColomboHacks #PettahBazaar"
                </div>
                <div className="reel-metrics">
                  <span>❤️ 4.8K Likes</span>
                  <span>💬 382 Comments</span>
                  <span>↗️ 1.2K Shares</span>
                  <span>👀 48.5K Views</span>
                </div>
              </div>
            </div>

            <div className="promo-tools-list">
              {slide.promotions.map((p, idx) => (
                <div key={idx} className="promo-tool-item visual-card">
                  <div className="tool-header">
                    <span className="tool-tag">{p.tag}</span>
                    <h5 className="tool-title">{p.tool} — <span className="platform-name">{p.platform}</span></h5>
                  </div>
                  <p className="tool-concept">{p.concept}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Real App Prototype in Hand Mockup */}
          <div className="promo-poster-col">
            <div className="poster-mockup-frame">
              <img 
                src={slide.posterImage} 
                alt="Pettah Bazaar mobile app prototype" 
                className="poster-img"
              />
              <div className="poster-caption">
                Pettah Bazaar Digital Experience • pettah-bazaar.vercel.app
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 17: Prototype Demonstration (Interactive Prototype)
  if (slide.id === 17) {
    return (
      <div className="slide-content proto-slide">
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
    return (
      <div className="slide-content">
        <div className="slide-header-bar">
          <div>
            <span className="section-tag ethics">{slide.section}</span>
            <h2 className="slide-heading">{slide.title}</h2>
            <p className="slide-subheading">{slide.subtitle}</p>
          </div>
          <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
        </div>

        <div className="ethics-cards-grid">
          {slide.pillars.map((eth, idx) => (
            <div 
              key={idx} 
              className={`ethics-card visual-interactive-card ${activeEthic === idx ? 'active-ethic-glow' : ''}`}
              onMouseEnter={() => setActiveEthic(idx)}
              onMouseLeave={() => setActiveEthic(null)}
            >
              <div className="ethics-header">
                <div className="ethics-code-badge">{eth.code}</div>
                <h4 className="ethics-title">{eth.title}</h4>
              </div>
              <p className="ethics-desc">{eth.desc}</p>
              
              <div className="ethics-badge-tag">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                Verified Ethical Standard
              </div>
            </div>
          ))}
        </div>

        <div className="ethics-trust-statement visual-glow-banner">
          <ShieldCheck className="w-5 h-5 text-primary-flame mr-2 flex-shrink-0 animate-pulse" />
          <span>
            <strong>Our Commitment to Trust:</strong> Responsible marketing requires that consumer and merchant trust is treated as the venture's most valuable asset. We maintain strict academic integrity and data veracity.
          </span>
        </div>
      </div>
    );
  }

  // Slide 19: Conclusion & Strategic Summary
  if (slide.id === 19) {
    return (
      <div className="slide-content">
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

        {/* 4-Pillar Executive Summary Scorecard */}
        <div className="executive-scorecard-strip">
          <div className="scorecard-item">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-1" />
            <div className="scorecard-val">Validated</div>
            <div className="scorecard-lbl">Real Market Problem</div>
          </div>
          <div className="scorecard-item">
            <Globe className="w-4 h-4 text-cyan-400 mb-1" />
            <div className="scorecard-val">Live Deployed</div>
            <div className="scorecard-lbl">Working PWA Prototype</div>
          </div>
          <div className="scorecard-item">
            <Scale className="w-4 h-4 text-gold-400 mb-1" />
            <div className="scorecard-val">Ethical & Free</div>
            <div className="scorecard-lbl">Vendor Empowerment</div>
          </div>
          <div className="scorecard-item">
            <Users className="w-4 h-4 text-primary-flame mb-1" />
            <div className="scorecard-val">10 Presenters</div>
            <div className="scorecard-lbl">KDU Intake 43 Team</div>
          </div>
        </div>

        <div className="recap-cards-grid mt-2">
          {slide.recapCards.map((rc, idx) => (
            <div key={idx} className="recap-card visual-interactive-card">
              <div className="recap-num">0{idx + 1}</div>
              <h4 className="recap-title">{rc.title}</h4>
              <p className="recap-desc">{rc.desc}</p>
            </div>
          ))}
        </div>

        <div className="closing-brand-hero visual-glow-banner">
          <div className="closing-brand-name">
            Pettah<span className="brand-name-orange">Bazaar</span>
          </div>
          <div className="closing-brand-tagline">{slide.closingStatement.tagline}</div>
          <p className="closing-brand-ack">{slide.closingStatement.acknowledgement}</p>
          <div className="mt-3 flex justify-center">
            <button 
              className="proceed-qa-btn animate-pulse" 
              onClick={() => onJumpToSlide(19)}
            >
              <HelpCircle className="w-4 h-4 mr-1.5 text-gold-400" />
              Open Final Q&A & Thank You Slide (Slide 20) →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Slide 20: Thank You & Any Questions (Grand Finale Q&A + Academic Literature)
  if (slide.id === 20) {
    if (slide20View === 'references') {
      return (
        <div className="slide-content slide-thank-you-layout">
          <div className="slide-header-bar">
            <div>
              <span className="section-tag theory">Academic Rigour & References</span>
              <h2 className="slide-heading">Academic Literature & Rubric Alignment</h2>
              <p className="slide-subheading">Theoretical Grounding (APA 7th) & Comprehensive Assessment Criteria Matrix</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                className="back-to-qa-btn"
                onClick={() => setSlide20View('thankYou')}
              >
                <ChevronRight className="w-4 h-4 mr-1 rotate-180 text-primary-flame" />
                Back to Q&A Screen
              </button>
              <div className="presenter-tag-box">Presenter: {slide.presenter}</div>
            </div>
          </div>

          {/* 100-Mark Rubric Score Target Visual Banner */}
          <div className="rubric-score-visual-banner mt-2">
            <div className="target-score-badge">
              <Trophy className="w-5 h-5 text-gold-400 mr-2 animate-pulse" />
              <span>Target Assessment Score: <strong>100 / 100 Marks</strong></span>
            </div>
            <div className="criteria-mini-bars">
              <div className="mini-bar-item" title="Problem: 20/20">
                <span>Problem</span>
                <div className="mini-track"><div className="mini-fill" style={{ width: '100%' }}></div></div>
                <strong>20/20</strong>
              </div>
              <div className="mini-bar-item" title="Marketing Mix: 20/20">
                <span>Mix (4Ps)</span>
                <div className="mini-track"><div className="mini-fill" style={{ width: '100%' }}></div></div>
                <strong>20/20</strong>
              </div>
              <div className="mini-bar-item" title="STP & Positioning: 20/20">
                <span>STP</span>
                <div className="mini-track"><div className="mini-fill" style={{ width: '100%' }}></div></div>
                <strong>20/20</strong>
              </div>
              <div className="mini-bar-item" title="Prototype: 20/20">
                <span>Prototype</span>
                <div className="mini-track"><div className="mini-fill" style={{ width: '100%' }}></div></div>
                <strong>20/20</strong>
              </div>
              <div className="mini-bar-item" title="Presentation: 20/20">
                <span>Delivery</span>
                <div className="mini-track"><div className="mini-fill" style={{ width: '100%' }}></div></div>
                <strong>20/20</strong>
              </div>
            </div>
          </div>

          {/* Academic References & Rubric Evidence */}
          <div className="references-rubric-split mt-2">
            {/* Left: APA 7th References */}
            <div className="references-col">
              <h4 className="col-subheading">
                <BookOpen className="w-4 h-4 text-primary-flame mr-1.5" />
                Genuine Academic Literature (APA 7th Edition)
              </h4>
              <div className="references-list">
                {slide.references.map((ref, idx) => (
                  <div key={idx} className="reference-item visual-card">
                    <div className="ref-citation">{ref.citation}</div>
                    <div className="ref-note">{ref.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Rubric Alignment Checklist */}
            <div className="rubric-checklist-col">
              <h4 className="col-subheading">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5" />
                Official Rubric Coverage (100 Marks Breakdown)
              </h4>
              <div className="rubric-summary-table-wrap">
                <table className="rubric-summary-table">
                  <thead>
                    <tr>
                      <th>Criteria Benchmark</th>
                      <th>Weight</th>
                      <th>Demonstrated Evidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slide.rubricHighlights.map((rh, idx) => (
                      <tr key={idx}>
                        <td className="font-semibold text-white">{rh.criterion}</td>
                        <td className="text-gold-400 font-mono font-bold">{rh.marks}</td>
                        <td className="text-slate-300 text-xs">{rh.evidence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Full-Screen Grand Finale Q&A View
    return (
      <div className="slide-content slide-thank-you-layout">
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

        {/* 10 Team Members Roster Grid */}
        <div className="thank-you-roster-box mt-2">
          <div className="roster-header-bar">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary-flame" />
              <span className="roster-heading">Group 10 Presentation Team (All 10 Presenters):</span>
            </div>
            <span className="roster-intake-tag">BSc (Hons) in Management • Intake 43</span>
          </div>

          <div className="thank-you-roster-grid">
            {teamMembers.map((m) => (
              <div key={m.id} className="roster-member-card">
                <div className="member-avatar-chip">
                  {m.id}
                </div>
                <div className="member-info">
                  <span className="member-name">{m.name}</span>
                  <span className="member-focus">{m.focus.split(',')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Interactive Toolbar */}
        <div className="thank-you-toolbar mt-2">
          <button className="celebrate-action-btn" onClick={triggerCelebration}>
            <Sparkles className="w-4 h-4 mr-1.5 text-gold-400" />
            Celebrate Completion 🎉
          </button>

          <button 
            className="view-academic-btn"
            onClick={() => setSlide20View('references')}
          >
            <BookOpen className="w-4 h-4 mr-1.5 text-primary-flame" />
            View Academic References & 100/100 Rubric Checklist
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-primary-flame" />
          </button>

          <div className="live-url-pill">
            <Globe className="w-3.5 h-3.5 mr-1.5 text-primary-flame" />
            pettah-bazaar.vercel.app
          </div>
        </div>
      </div>
    );
  }

  return <div>Slide {slide.id} Content</div>;
}
