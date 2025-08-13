import React from 'react';

const swatches = [
  { color: '#CC5500', label: 'Burnt Orange\n#CC5500' },
  { color: '#4B2E2E', label: 'Deep Mocha\n#4B2E2E' },
  { color: '#D6A84F', label: 'Faded Mustard\n#D6A84F' },
  { color: '#F5E8D0', label: 'Warm Beige\n#F5E8D0', dark: true },
  { color: '#2E4E3F', label: 'Forest Green\n#2E4E3F' },
];

const MoodboardCanvas: React.FC = () => {
  return (
    <div className="center-canvas-wrap">
      <div className="center-canvas">
        <div className="canvas-card">
          {/* Title Pill */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
            <div className="title-pill">Cozy 90s cafe moodboard</div>
          </div>

          {/* Palette */}
          <div className="section-title">Color Palette ✨</div>
          <div className="swatches">
            {swatches.map((s) => (
              <div key={s.color} className="swatch" style={{ background: s.color, color: s.dark ? '#1a1a1a' : '#fff', border: s.dark ? '1px solid #e5e7eb' : 'none', whiteSpace: 'pre-line', textAlign: 'center' }}>
                {s.label}
              </div>
            ))}
          </div>

          {/* Typography */}
          <div className="section-title mt-16">Typography ✍️</div>
          <div>
            <div className="type-row" style={{ background: '#fafafa' }}>
              <div className="type-face">Cooper Black</div>
              <div className="type-role">Titles / Hero</div>
            </div>
            <div className="type-row" style={{ background: '#fafafa' }}>
              <div className="type-face">Courier Prime</div>
              <div className="type-role">Subheaders / Quotes</div>
            </div>
            <div className="type-row" style={{ background: '#fafafa' }}>
              <div className="type-face">Quattrocento Serif</div>
              <div className="type-role">Body Text / Elegant captions</div>
            </div>
          </div>

          {/* Images grid - spans carefully tuned to match screenshot composition */}
          <div className="section-title mt-16">Image Inspiration ✨</div>
          <div className="image-grid">
            {/* Row 1 */}
            <div className="img-tile" style={{ gridColumn: 'span 2', gridRow: 'span 3' }}><div className="img-heart">♡</div></div>
            <div className="img-tile" style={{ gridColumn: 'span 2', gridRow: 'span 2' }}><div className="img-heart">♡</div></div>
            <div className="img-tile" style={{ gridColumn: 'span 2', gridRow: 'span 2' }}><div className="img-heart">♡</div></div>

            {/* Row 2 */}
            <div className="img-tile" style={{ gridColumn: 'span 2', gridRow: 'span 3' }}><div className="img-heart">♡</div></div>
            <div className="img-tile" style={{ gridColumn: 'span 2', gridRow: 'span 3' }}><div className="img-heart">♡</div></div>
            <div className="img-tile" style={{ gridColumn: 'span 2', gridRow: 'span 3' }}><div className="img-heart">♡</div></div>

            {/* Row 3 */}
            <div className="img-tile" style={{ gridColumn: 'span 3', gridRow: 'span 3' }}><div className="img-heart">♡</div></div>
            <div className="img-tile" style={{ gridColumn: 'span 3', gridRow: 'span 3' }}><div className="img-heart">♡</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodboardCanvas;


