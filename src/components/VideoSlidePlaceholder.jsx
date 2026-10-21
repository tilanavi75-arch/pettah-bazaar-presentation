import React, { useState, useEffect } from 'react';
import { Video, Play, Upload, Film, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

export default function VideoSlidePlaceholder({ 
  slideNumber, 
  heading, 
  label, 
  caption, 
  presenter, 
  context,
  disclaimer,
  videoSrc
}) {
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [uploadedVideoSrc, setUploadedVideoSrc] = useState(videoSrc || null);

  useEffect(() => {
    setUploadedVideoSrc(videoSrc || null);
  }, [videoSrc]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedVideoSrc(url);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (customVideoUrl.trim()) {
      setUploadedVideoSrc(customVideoUrl.trim());
      setShowInput(false);
    }
  };

  const resetVideo = () => {
    setUploadedVideoSrc(null);
    setCustomVideoUrl('');
  };

  const restoreDefaultVideo = () => {
    if (videoSrc) {
      setUploadedVideoSrc(videoSrc);
    }
  };

  return (
    <div className="fullscreen-video-slide">
      {/* Subtle top header bar */}
      <div className="video-slide-top-bar">
        <div className="video-slide-heading-wrap">
          <span className="video-badge">
            <Film className="w-3.5 h-3.5 mr-1 text-orange-accent" />
            FIELDWORK VIDEO SLIDE {slideNumber}
          </span>
          <h1 className="video-slide-heading">{heading}</h1>
        </div>

        <div className="video-controls-tools">
          {uploadedVideoSrc ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="video-badge" style={{ margin: 0, background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <CheckCircle className="w-3 h-3 mr-1" />
                Video Active
              </span>
              <button 
                className="video-tool-btn"
                onClick={() => setShowInput(!showInput)}
                title="Change or test another video file or URL"
              >
                <Upload className="w-3.5 h-3.5 mr-1" />
                <span>{showInput ? "Hide Tester" : "Change Video"}</span>
              </button>
              <button className="video-tool-btn reset" onClick={resetVideo} title="View placeholder blueprint">
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                <span>Placeholder</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {videoSrc && (
                <button 
                  className="video-tool-btn"
                  onClick={restoreDefaultVideo}
                  style={{ background: 'rgba(255, 85, 0, 0.2)', borderColor: 'var(--border-focus)', color: '#FF7733', fontWeight: 600 }}
                  title="Play loaded video"
                >
                  <Play className="w-3.5 h-3.5 mr-1 fill-current" />
                  <span>Play Field Video</span>
                </button>
              )}
              <button 
                className="video-tool-btn"
                onClick={() => setShowInput(!showInput)}
                title="Test with actual video file or URL for rehearsal"
              >
                <Upload className="w-3.5 h-3.5 mr-1" />
                <span>{showInput ? "Hide Tester" : "Test Real Video (Optional)"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Optional test video input panel */}
      {showInput && (
        <div className="video-input-panel">
          <label className="file-upload-label">
            <Upload className="w-4 h-4 mr-2" />
            <span>Choose MP4 / WebM from computer</span>
            <input 
              type="file" 
              accept="video/*" 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />
          </label>
          <span className="text-slate-400 text-xs font-mono">OR</span>
          <form onSubmit={handleUrlSubmit} className="flex gap-2">
            <input 
              type="url" 
              placeholder="Paste video URL (mp4)..." 
              value={customVideoUrl}
              onChange={(e) => setCustomVideoUrl(e.target.value)}
              className="video-url-input"
            />
            <button type="submit" className="video-url-submit-btn">Load</button>
          </form>
        </div>
      )}

      {/* 16:9 Widescreen Video Cinema Container */}
      <div className="widescreen-video-frame">
        {uploadedVideoSrc ? (
          <div className="actual-video-wrapper">
            <video 
              key={uploadedVideoSrc}
              src={uploadedVideoSrc} 
              controls 
              autoPlay 
              playsInline
              preload="auto"
              className="actual-video-element"
            />
          </div>
        ) : (
          <div 
            className="video-placeholder-canvas" 
            onClick={videoSrc ? restoreDefaultVideo : undefined}
            style={{ cursor: videoSrc ? 'pointer' : 'default' }}
          >
            {/* Dark grid texture & subtle glow */}
            <div className="video-placeholder-ambient" />

            {/* Central Video Graphic & Icons */}
            <div className="video-placeholder-center">
              <div className="camera-icon-badge">
                <Video className="w-9 h-9 text-teal-accent" />
              </div>

              <div className="play-button-outer">
                <div className="play-button-inner">
                  <Play className="w-12 h-12 text-white fill-white ml-1.5" />
                </div>
              </div>

              {/* Exact editable placeholder label from requirements */}
              <div className="placeholder-editable-label">
                <span className="label-bracket">[</span>
                <span className="label-text">{videoSrc ? "CLICK TO PLAY FIELD FOOTAGE" : label}</span>
                <span className="label-bracket">]</span>
              </div>

              <p className="placeholder-sublabel">
                {videoSrc ? "Field Video Ready: P 1 F - Trim problem .mp4" : "16:9 Widescreen Footage Placeholder • Ready for Canva Video Embed"}
              </p>
            </div>

            {/* Bottom metadata tags */}
            <div className="video-frame-footer">
              <div className="footer-left">
                <div className="aspect-ratio-pill">16:9 HD Format</div>
                <div className="duration-pill">~45–60 Seconds Recommended</div>
              </div>
              <div className="footer-right">
                <span className="presenter-tag">Coordinated by: {presenter}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide Caption & Academic Context */}
      <div className="video-slide-caption-bar">
        <div className="caption-text-group">
          <p className="primary-caption">“{caption}”</p>
          <p className="context-detail">{context}</p>
        </div>
        <div className="academic-badge">
          <AlertCircle className="w-3.5 h-3.5 text-teal-accent mr-1 inline" />
          <span>{disclaimer || "Preliminary qualitative student fieldwork"}</span>
        </div>
      </div>
    </div>
  );
}
