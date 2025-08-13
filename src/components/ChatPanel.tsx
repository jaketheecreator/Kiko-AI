import React from 'react';

type Props = {
  onBack?: () => void;
};

const ChatPanel: React.FC<Props> = ({ onBack }) => {
  return (
    <aside className="panel left-panel panel-scroll">
      <div className="px-16 pt-16">
        <button
          onClick={onBack}
          style={{
            border: 'none',
            background: 'transparent',
            color: '#444',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          ← Back to home
        </button>
      </div>

      <div className="px-16 mt-12">
        <div className="title-pill">Generate a cozy 90s cafe moodboard</div>
      </div>

      <div className="panel-body px-16 mt-16">
        <section style={{ background: '#fafafa', borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 600, color: '#111', marginBottom: 8 }}>☕ Mood Summary:</div>
          <p style={{ color: '#333', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            Think warm lighting, mismatched furniture, vintage posters, and the smell of espresso in the air.
            Inspired by Friends-era aesthetics with a nostalgic, soft vibe.
          </p>
        </section>

        <section className="mt-16" style={{ background: '#fafafa', borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 600, color: '#111', marginBottom: 8 }}>🌿 Overall Vibe:</div>
          <p style={{ color: '#333', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            A space that feels like a second home — where jazz plays softly in the background, and every corner
            invites you to slow down, read, or write in your journal.
          </p>
        </section>
      </div>

      <div className="px-16 pb-16">
        <div className="mt-12" style={{ display: 'flex', gap: 12, color: '#777', fontSize: 14 }}>
          <span>👍</span><span>👎</span><span>↩</span><span>↪</span><span>⋯</span>
        </div>
        <div className="mt-16" style={{ background: '#f5f6f7', borderRadius: 16, padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            placeholder="Ask anything"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontStyle: 'italic' }}
          />
          <button className="nav-btn" style={{ width: 36, height: 36 }}>🎙</button>
        </div>
      </div>
    </aside>
  );
};

export default ChatPanel;


