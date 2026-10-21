import React, { useState } from 'react';
import { 
  Search, MapPin, Phone, MessageCircle, Star, Compass, 
  ExternalLink, Layers, CheckCircle2, AlertCircle, Sparkles,
  Store, Navigation2, ArrowRight, Info
} from 'lucide-react';
import { sampleShopsData } from '../data/slidesData';

export default function InteractivePrototype() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedShop, setSelectedShop] = useState(null);
  const [mode, setMode] = useState('working'); // 'working' or 'future'
  const [contactToast, setContactToast] = useState('');

  const categories = ['All', 'Textiles', 'Electronics', 'Spices', 'Hardware'];

  const filteredShops = sampleShopsData.filter((shop) => {
    const matchesCategory = selectedCategory === 'All' || shop.category === selectedCategory;
    const query = searchTerm.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesName = shop.name.toLowerCase().includes(query);
    const matchesStreet = shop.street.toLowerCase().includes(query);
    const matchesProducts = shop.products.some(p => p.toLowerCase().includes(query));
    return matchesCategory && (matchesName || matchesStreet || matchesProducts);
  });

  const handleSimulateWhatsApp = (shop) => {
    setContactToast(`Connecting to ${shop.name} WhatsApp: "+94... " with auto-filled message: "Hello! Found your shop via Pettah Bazaar. Are you currently open?"`);
    setTimeout(() => setContactToast(''), 4500);
  };

  return (
    <div className="prototype-interactive-container">
      {/* Top Banner & Mode Toggle */}
      <div className="proto-top-bar">
        <div className="proto-branding">
          <div className="proto-logo-badge">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="proto-app-title">PETTAH BAZAAR — Web Prototype</span>
            <span className="proto-app-version">v0.9.4 Live Demonstration</span>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="proto-mode-switch">
          <button 
            className={`mode-btn ${mode === 'working' ? 'active-working' : ''}`}
            onClick={() => setMode('working')}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-teal-accent" />
            Interactive Search (Simulator)
          </button>
          <button 
            className={`mode-btn ${mode === 'screenshot' ? 'active-working' : ''}`}
            onClick={() => setMode('screenshot')}
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1 text-teal-accent" />
            Actual Deployed Web App (Vercel)
          </button>
          <button 
            className={`mode-btn ${mode === 'future' ? 'active-future' : ''}`}
            onClick={() => setMode('future')}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-orange-accent" />
            Future Roadmap (Mockup)
          </button>
        </div>
      </div>

      {contactToast && (
        <div className="proto-toast-notification">
          <MessageCircle className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
          <span>{contactToast}</span>
        </div>
      )}

      {mode === 'working' ? (
        <div className="proto-main-grid">
          {/* Left Column: Search & Shop Cards */}
          <div className="proto-left-pane">
            {/* Search Input Box */}
            <div className="proto-search-wrapper">
              <Search className="w-4 h-4 text-teal-accent proto-search-icon" />
              <input
                type="text"
                placeholder="Try: 'Cotton', 'Arduino', 'Cinnamon', 'Display', 'Zippers'..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="proto-search-input"
              />
              {searchTerm && (
                <button className="proto-clear-btn" onClick={() => setSearchTerm('')}>
                  Clear
                </button>
              )}
            </div>

            {/* Category Quick Chips */}
            <div className="proto-category-chips">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`proto-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filtered Shop Cards List */}
            <div className="proto-shops-list">
              <div className="proto-results-count">
                Found <strong>{filteredShops.length}</strong> verified shops in Pettah
              </div>

              {filteredShops.length === 0 ? (
                <div className="proto-empty-state">
                  <Store className="w-8 h-8 text-slate-500 mb-2" />
                  <p>No verified shop found matching "{searchTerm}".</p>
                  <span className="text-xs text-slate-400">Try searching for generic terms like 'Fabric', 'Electronics', or 'Spice'.</span>
                </div>
              ) : (
                filteredShops.map((shop) => (
                  <div 
                    key={shop.id} 
                    className={`proto-shop-card ${selectedShop?.id === shop.id ? 'selected-shop' : ''}`}
                    onClick={() => setSelectedShop(shop)}
                  >
                    <div className="shop-card-header">
                      <div className="shop-title-wrap">
                        <h4 className="shop-name">{shop.name}</h4>
                        <span className="shop-category-tag">{shop.category}</span>
                      </div>
                      <div className="shop-rating-badge">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400 mr-1" />
                        <span>{shop.rating}</span>
                      </div>
                    </div>

                    <div className="shop-card-location">
                      <MapPin className="w-3.5 h-3.5 text-teal-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="street-address">{shop.street} ({shop.floor})</div>
                        <div className="landmark-text">Landmark: {shop.landmark}</div>
                      </div>
                    </div>

                    <div className="shop-products-wrap">
                      <span className="products-label">Stocked Items:</span>
                      <div className="product-tags-cloud">
                        {shop.products.slice(0, 4).map((p, idx) => (
                          <span key={idx} className="product-chip">{p}</span>
                        ))}
                      </div>
                    </div>

                    <div className="shop-card-actions">
                      <button 
                        className="btn-whatsapp"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSimulateWhatsApp(shop);
                        }}
                      >
                        <MessageCircle className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                        WhatsApp Shop
                      </button>
                      <button 
                        className="btn-view-details"
                        onClick={() => setSelectedShop(shop)}
                      >
                        <Navigation2 className="w-3.5 h-3.5 mr-1" />
                        View Map & Guidance
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Micro-Location Guidance & Pettah Map Visualizer */}
          <div className="proto-right-pane">
            <div className="proto-map-card">
              <div className="map-card-header">
                <div className="flex items-center gap-2">
                  <Navigation2 className="w-4 h-4 text-teal-accent" />
                  <span className="font-semibold text-white text-sm">Pettah Micro-Street Navigator</span>
                </div>
                <span className="map-scale-tag">Keyzer / Main / Cross Streets</span>
              </div>

              {/* Stylized Street Grid Diagram */}
              <div className="pettah-street-schematic">
                <div className="street-line main-st">
                  <span className="street-label">MAIN STREET (COMMERCIAL SPINE)</span>
                  <div className="landmark-node clock-tower" title="Khan Clock Tower">
                    🏛️ Khan Clock Tower
                  </div>
                  <div className="landmark-node bus-stand" title="Central Bus Stand">
                    🚌 Bus Stand
                  </div>
                </div>

                <div className="cross-streets-grid">
                  <div className="cross-street-col">
                    <span className="col-label">1st Cross St</span>
                    <span className="sector-tag">Electronics</span>
                    <div 
                      className={`map-pin-marker ${selectedShop?.id === 2 ? 'active-pin' : ''}`}
                      onClick={() => setSelectedShop(sampleShopsData[1])}
                    >
                      📍 Shop #2
                    </div>
                  </div>

                  <div className="cross-street-col">
                    <span className="col-label">2nd Cross St</span>
                    <span className="sector-tag">Textiles & Silk</span>
                    <div className="landmark-mosque">🕌 Red Mosque</div>
                    <div 
                      className={`map-pin-marker ${selectedShop?.id === 1 ? 'active-pin' : ''}`}
                      onClick={() => setSelectedShop(sampleShopsData[0])}
                    >
                      📍 Shop #1
                    </div>
                  </div>

                  <div className="cross-street-col">
                    <span className="col-label">Keyzer St</span>
                    <span className="sector-tag">Haberdashery</span>
                    <div 
                      className={`map-pin-marker ${selectedShop?.id === 5 ? 'active-pin' : ''}`}
                      onClick={() => setSelectedShop(sampleShopsData[4])}
                    >
                      📍 Shop #5
                    </div>
                  </div>

                  <div className="cross-street-col">
                    <span className="col-label">Bankshall St</span>
                    <span className="sector-tag">Spices & Herbs</span>
                    <div 
                      className={`map-pin-marker ${selectedShop?.id === 3 ? 'active-pin' : ''}`}
                      onClick={() => setSelectedShop(sampleShopsData[2])}
                    >
                      📍 Shop #3
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Shop Guidance Panel */}
              {selectedShop ? (
                <div className="selected-shop-guidance-box">
                  <div className="guidance-header">
                    <h5 className="guidance-shop-title">{selectedShop.name}</h5>
                    <span className="verified-badge-pill">✓ Verified Directory Entry</span>
                  </div>

                  <div className="guidance-route-step">
                    <div className="step-bullet">1</div>
                    <div className="step-info">
                      <strong>Starting Point:</strong> Walk from Khan Clock Tower entrance into {selectedShop.street.split(',')[0]}.
                    </div>
                  </div>
                  <div className="guidance-route-step">
                    <div className="step-bullet">2</div>
                    <div className="step-info">
                      <strong>Visual Landmark:</strong> Look for {selectedShop.landmark}.
                    </div>
                  </div>
                  <div className="guidance-route-step">
                    <div className="step-bullet">3</div>
                    <div className="step-info">
                      <strong>Exact Location:</strong> {selectedShop.floor}. Operating hours: {selectedShop.timing}.
                    </div>
                  </div>

                  <div className="contact-quick-bar">
                    <span className="phone-num">Direct Contact: {selectedShop.phone}</span>
                    <button 
                      className="call-sim-btn"
                      onClick={() => handleSimulateWhatsApp(selectedShop)}
                    >
                      Simulate Direct Chat
                    </button>
                  </div>
                </div>
              ) : (
                <div className="guidance-prompt">
                  <Info className="w-4 h-4 text-teal-accent mr-2" />
                  <span>Click on any shop card on the left or map pin above to inspect micro-directions.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : mode === 'screenshot' ? (
        /* Actual Deployed Prototype View */
        <div className="proto-deployed-view">
          <div className="deployed-top-strip">
            <div className="strip-left">
              <span className="strip-live-dot"></span>
              <strong className="text-white text-sm">Live Deployed Student Application:</strong>
              <code className="deployed-url-text">pettah-bazaar.vercel.app</code>
            </div>
            <a 
              href="https://pettah-bazaar.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="open-live-btn"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              Launch Live App in New Tab
            </a>
          </div>

          <div className="deployed-visuals-row">
            <div className="deployed-screen-card">
              <div className="screen-header">
                <span>Direct UI Screenshot (Mobile Viewport)</span>
                <span className="verified-pill">✓ Active Interface</span>
              </div>
              <div className="screen-img-wrap">
                <img 
                  src="/assets/pettah_real_prototype_screen.png" 
                  alt="Real Pettah Bazaar user interface" 
                  className="deployed-img" 
                />
              </div>
            </div>

            <div className="deployed-screen-card">
              <div className="screen-header">
                <span>In-Hand Field Testing Mockup</span>
                <span className="verified-pill">✓ On-Site Testing</span>
              </div>
              <div className="screen-img-wrap">
                <img 
                  src="/assets/pettah_real_app_mockup_hand.png" 
                  alt="Pettah Bazaar prototype in user hand" 
                  className="deployed-img hand-img" 
                />
              </div>
            </div>

            <div className="deployed-specs-card">
              <h4 className="specs-title">Prototype Architecture Highlights</h4>
              <ul className="specs-list">
                <li>
                  <strong>Production Deployment:</strong> Hosted on Vercel at <code>pettah-bazaar.vercel.app</code>.
                </li>
                <li>
                  <strong>Curated Sectors:</strong> Sarees & Clothes, Tech & Gadgets, Pure Spices, Sea St Gold, Bags & Travel, Shoes.
                </li>
                <li>
                  <strong>Database Coverage:</strong> 28+ Verified Products across 6 Major Pettah Street Districts.
                </li>
                <li>
                  <strong>Micro-Navigation:</strong> Direct street walking directions and merchant contact integration.
                </li>
              </ul>
              <div className="academic-badge-box">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                <span>Genuine prototype developed by KDU Intake 43 students.</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Future Roadmap Preview Panel (Clearly labeled as mockup) */
        <div className="proto-future-container">
          <div className="future-banner">
            <AlertCircle className="w-5 h-5 text-orange-accent mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white">PROPOSED FUTURE FEATURES — CONCEPT MOCKUPS</h4>
              <p className="text-xs text-slate-300">
                In strict adherence to academic honesty, the features below are prospective roadmap concepts designed for post-pilot expansion. They are not active in the current prototype.
              </p>
            </div>
          </div>

          <div className="future-cards-grid">
            <div className="future-card">
              <div className="future-tag">ROADMAP PHASE 2</div>
              <h5 className="future-title">Live Merchant Stock Sync via WhatsApp API</h5>
              <p className="future-desc">
                Enables micro-retailers in Pettah to update stock status by simply sending a message to a verified WhatsApp bot (e.g. "Cotton Voile ALBA stock low"), updating the web index in real-time.
              </p>
              <div className="mockup-pill">Status: Technical Architecture Proposed</div>
            </div>

            <div className="future-card">
              <div className="future-tag">ROADMAP PHASE 2</div>
              <h5 className="future-title">Indoor Bluetooth Beacon Navigation</h5>
              <p className="future-desc">
                Solves GPS blackout inside multi-floor commercial arcades such as People's Park by placing low-energy Bluetooth proximity tags on upper mezzanine floors.
              </p>
              <div className="mockup-pill">Status: Hardware Feasibility Under Review</div>
            </div>

            <div className="future-card">
              <div className="future-tag">ROADMAP PHASE 3</div>
              <h5 className="future-title">Sinhala & Tamil Voice Search Engine</h5>
              <p className="future-desc">
                Allows shoppers to speak conversational queries (e.g., "Meka ganna puluwan kadayak koheda thiyenne?") using browser speech recognition tailored to local Sri Lankan dialects.
              </p>
              <div className="mockup-pill">Status: NLP Training Model Required</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
