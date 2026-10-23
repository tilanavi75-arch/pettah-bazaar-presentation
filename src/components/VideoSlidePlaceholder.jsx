import React, { useState, useEffect } from 'react';
import { Video, Play, Upload, Film, RefreshCw, CheckCircle, Globe, ExternalLink } from 'lucide-react';

function getDriveEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
  }
  return null;
}

export default function VideoSlidePlaceholder({ 
  slideNumber, 
  heading, 
  label, 
  presenter, 
  videoSrc,
  driveUrl,
  videoTitle,
  extraHeaderContent
}) {
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState(driveUrl || videoSrc || null);
  const [useDriveEmbed, setUseDriveEmbed] = useState(Boolean(driveUrl));

  useEffect(() => {
    if (driveUrl) {
      setActiveVideoSrc(driveUrl);
      setUseDriveEmbed(true);
    } else if (videoSrc) {
      setActiveVideoSrc(videoSrc);
      setUseDriveEmbed(false);
    } else {
      setActiveVideoSrc(null);
      setUseDriveEmbed(false);
    }
  }, [videoSrc, driveUrl]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setActiveVideoSrc(url);
      setUseDriveEmbed(false);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (customVideoUrl.trim()) {
      const trimmed = customVideoUrl.trim();
      const driveEmbed = getDriveEmbedUrl(trimmed);
      if (driveEmbed) {
        setActiveVideoSrc(driveEmbed);
        setUseDriveEmbed(true);
      } else {
        setActiveVideoSrc(trimmed);
        setUseDriveEmbed(false);
      }
      setShowInput(false);
    }
  };

  const resetVideo = () => {
    setActiveVideoSrc(null);
    setCustomVideoUrl('');
    setUseDriveEmbed(false);
  };

  const restoreDefaultVideo = () => {
    if (videoSrc) {
      setActiveVideoSrc(videoSrc);
      setUseDriveEmbed(false);
    } else if (driveUrl) {
      setActiveVideoSrc(driveUrl);
      setUseDriveEmbed(true);
    }
  };

  const toggleSourceMode = () => {
    if (useDriveEmbed && videoSrc) {
      setActiveVideoSrc(videoSrc);
      setUseDriveEmbed(false);
    } else if (!useDriveEmbed && driveUrl) {
      setActiveVideoSrc(driveUrl);
      setUseDriveEmbed(true);
    }
  };

  const isCurrentDrive = useDriveEmbed || (activeVideoSrc && (activeVideoSrc.includes('drive.google.com') || getDriveEmbedUrl(activeVideoSrc) !== null));
  const driveEmbedSrc = isCurrentDrive ? getDriveEmbedUrl(activeVideoSrc || driveUrl) : null;

  return (
    <div className="fullscreen-video-slide">
      {/* Sleek, compact top header strip */}
      <div className="video-slide-top-bar">
        <div className="video-slide-heading-wrap">
          <div className="flex items-center gap-2">
            <span className="video-badge">
              <Film className="w-3.5 h-3.5 mr-1 text-orange-accent" />
              SLIDE {slideNumber} • FIELDWORK VIDEO
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Presenter: {presenter}
            </span>
          </div>
          <h2 className="video-slide-heading">{heading}</h2>
        </div>

        <div className="video-controls-tools">
          {extraHeaderContent}
          {activeVideoSrc ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="video-badge" style={{ margin: 0, background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <CheckCircle className="w-3 h-3 mr-1" />
                {isCurrentDrive ? "Drive Stream Active" : "HD Video Active"}
              </span>

              {driveUrl && (
                <a
                  href={driveUrl.replace('/preview', '/view')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-tool-btn"
                  title="Open video in Google Drive in new tab"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1 text-teal-accent" />
                  <span>Open Drive</span>
                </a>
              )}

              {driveUrl && videoSrc && (
                <button
                  className="video-tool-btn"
                  onClick={toggleSourceMode}
                  title={isCurrentDrive ? "Switch to Local HD Video" : "Switch to Google Drive Stream"}
                  style={{ background: 'rgba(255, 85, 0, 0.15)', color: '#FF7733', borderColor: 'rgba(255, 85, 0, 0.3)' }}
                >
                  <Globe className="w-3.5 h-3.5 mr-1" />
                  <span>{isCurrentDrive ? "Local Video" : "Drive Stream"}</span>
                </button>
              )}

              <button 
                className="video-tool-btn"
                onClick={() => setShowInput(!showInput)}
                title="Change or test another video file or URL"
              >
                <Upload className="w-3.5 h-3.5 mr-1" />
                <span>{showInput ? "Hide" : "Change"}</span>
              </button>
              <button className="video-tool-btn reset" onClick={resetVideo} title="View placeholder blueprint">
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                <span>Reset</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {(videoSrc || driveUrl) && (
                <button 
                  className="video-tool-btn"
                  onClick={restoreDefaultVideo}
                  style={{ background: 'rgba(255, 85, 0, 0.2)', borderColor: 'var(--border-focus)', color: '#FF7733', fontWeight: 600 }}
                  title="Play loaded video"
                >
                  <Play className="w-3.5 h-3.5 mr-1 fill-current" />
                  <span>Play Video</span>
                </button>
              )}
              <button 
                className="video-tool-btn"
                onClick={() => setShowInput(!showInput)}
                title="Test with actual video file or URL for rehearsal"
              >
                <Upload className="w-3.5 h-3.5 mr-1" />
                <span>{showInput ? "Hide" : "Test Video"}</span>
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
              placeholder="Paste Google Drive or MP4 URL..." 
              value={customVideoUrl}
              onChange={(e) => setCustomVideoUrl(e.target.value)}
              className="video-url-input"
            />
            <button type="submit" className="video-url-submit-btn">Load</button>
          </form>
        </div>
      )}

      {/* Fullscreen Video Cinema Container (Expands to 100% height and width) */}
      <div className="widescreen-video-frame cinema-fullscreen">
        {activeVideoSrc ? (
          <div className="actual-video-wrapper">
            {isCurrentDrive && driveEmbedSrc ? (
              <iframe
                src={driveEmbedSrc}
                className="actual-video-element"
                style={{ border: 'none', width: '100%', height: '100%' }}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                title={heading}
              />
            ) : (
              <video 
                key={activeVideoSrc}
                src={activeVideoSrc} 
                controls 
                autoPlay 
                playsInline
                preload="auto"
                className="actual-video-element"
                onError={() => {
                  if (driveUrl) {
                    setUseDriveEmbed(true);
                  }
                }}
              />
            )}
          </div>
        ) : (
          <div 
            className="video-placeholder-canvas" 
            onClick={(videoSrc || driveUrl) ? restoreDefaultVideo : undefined}
            style={{ cursor: (videoSrc || driveUrl) ? 'pointer' : 'default' }}
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

              {/* Exact editable placeholder label */}
              <div className="placeholder-editable-label">
                <span className="label-bracket">[</span>
                <span className="label-text">{(videoSrc || driveUrl) ? "CLICK TO PLAY FIELD FOOTAGE" : label}</span>
                <span className="label-bracket">]</span>
              </div>

              <p className="placeholder-sublabel">
                {(videoSrc || driveUrl) 
                  ? (videoTitle || `Field Video Ready: ${slideNumber === "16" ? "Customer Feedback Interview Video" : "Market Problem Video"}`)
                  : "16:9 Widescreen Footage Placeholder • Ready for Video Embed"}
              </p>
            </div>

            {/* Bottom metadata tags */}
            <div className="video-frame-footer">
              <div className="footer-left">
                <div className="aspect-ratio-pill">16:9 HD Cinema Format</div>
                <div className="duration-pill">Full Slide Cinema View</div>
              </div>
              <div className="footer-right">
                <span className="presenter-tag">Coordinated by: {presenter}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
