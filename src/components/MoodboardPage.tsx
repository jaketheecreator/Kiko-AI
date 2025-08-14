import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '../assets/images/Grid.png';
import Plus from '../assets/icons/plus.png';
import ArrowLeft from '../assets/icons/ArrowLeft.png';
import TopRightNav from './TopRightNav';
import ChatPanel from './ChatPanel';

function MoodboardPage() {
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - panOffset.x,
        y: e.clientY - panOffset.y
      });
    }
  }, [panOffset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    if (e.ctrlKey || e.metaKey) {
      // Zoom functionality
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.max(0.1, Math.min(5, zoom * zoomFactor));
      setZoom(newZoom);
    } else {
      // Pan functionality
      setPanOffset(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }));
    }
  }, [zoom]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(5, prev * 1.2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(0.1, prev / 1.2));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Chat Panel - Left Side */}
      <div style={{
        position: 'fixed',
        top: '80px',
        left: '24px',
        width: '320px',
        height: 'calc(100vh - 104px)',
        zIndex: 1000
      }}>
        <ChatPanel onBack={handleBackToHome} />
      </div>

      {/* Fixed Top Navigation */}
      {/* Back Button - Top Left */}
      <div style={{
        position: 'fixed',
        top: '24px',
        left: '24px',
        zIndex: 1000
      }}>
        <button 
          onClick={handleBackToHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: '#fff',
            borderRadius: '50px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            color: '#374151',
            fontFamily: 'Red Hat Display',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
          }}
        >
          <img src={ArrowLeft} alt="Arrow Left" style={{ width: '16px', height: '16px' }} />
          Back to home
        </button>
      </div>



      {/* Top Right Navigation */}
      <TopRightNav 
        credits="500/1000 Credits"
        onLightModeToggle={() => console.log('Light mode toggled')}
        onSettingsClick={() => console.log('Settings clicked')}
        onProfileClick={() => console.log('Profile clicked')}
      />

      {/* Infinite Canvas */}
      <div 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f5f5f5',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Draggable Canvas Content */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}>
          {/* Grid Background */}
          <div style={{
            position: 'absolute',
            top: '-2000px',
            left: '-2000px',
            width: '4000px',
            height: '4000px',
            backgroundImage: `url(${Grid}), linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
            backgroundSize: '40px 40px, 40px 40px, 40px 40px',
            backgroundRepeat: 'repeat',
            opacity: 0.5,
            pointerEvents: 'none'
          }} />
        </div>
      </div>

      {/* Zoom Controls - Simple and Bulletproof */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 9999
      }}>
        <button
          onClick={handleZoomIn}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            color: '#374151'
          }}
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            color: '#374151'
          }}
        >
          −
        </button>
        <button
          onClick={handleResetZoom}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            color: '#374151'
          }}
        >
          1:1
        </button>
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '8px',
          fontSize: '12px',
          color: '#6b7280',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          minWidth: '44px'
        }}>
          {Math.round(zoom * 100)}%
        </div>
      </div>

      <style>
        {`
          @keyframes recordingPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}
      </style>
    </div>
  );
}

export default MoodboardPage;
