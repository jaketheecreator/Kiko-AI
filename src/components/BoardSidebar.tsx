import React from 'react';

const BoardSidebar: React.FC = () => {
  return (
    <aside className="panel right-panel panel-scroll">
      <div className="px-16 pt-16" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>My Board</div>
        <div style={{ color: '#888', display: 'flex', gap: 12 }}>
          <span>⋯</span>
          <span>Share</span>
        </div>
      </div>

      <div className="sidebar-tabs">
        <button className="tab active">Images</button>
        <button className="tab">Color</button>
        <button className="tab">Font</button>
      </div>

      <div className="panel-body">
        <div className="slot-grid">
          <div className="slot" />
          <div className="slot" style={{ height: 180 }} />
          <div className="slot" style={{ height: 80 }} />
          <div className="slot" />
          <div className="slot" style={{ height: 160 }} />
          <div className="slot" />
        </div>
      </div>
    </aside>
  );
};

export default BoardSidebar;



