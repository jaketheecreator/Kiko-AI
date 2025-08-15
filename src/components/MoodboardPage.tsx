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
  const [activeNavItem, setActiveNavItem] = useState('home');
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
        top: '96px',
        left: '24px',
        width: '320px',
        height: 'calc(100vh - 120px)',
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

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             {/* Board Sidebar - Right Side */}
           <div style={{
             position: 'fixed',
             top: '96px',
             bottom: '24px',
             right: '24px',
             width: '272px',
             backgroundColor: '#fff',
             borderRadius: '20px',
             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
             zIndex: 1000,
             padding: '24px',
             display: 'flex',
             flexDirection: 'column'
           }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111',
            margin: 0,
            fontFamily: 'Red Hat Display'
          }}>
            My Board
          </h2>
                     <div style={{
             display: 'flex',
             gap: '8px'
           }}>
             <button style={{
               width: '32px',
               height: '32px',
               borderRadius: '50%',
               backgroundColor: '#f3f4f6',
               border: 'none',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               cursor: 'pointer'
             }}>
               <img src={require('../assets/icons/Option.png')} alt="Options" style={{ width: '16px', height: '16px' }} />
             </button>
             <button style={{
               display: 'flex',
               alignItems: 'center',
               gap: '6px',
               padding: '8px 12px',
               borderRadius: '20px',
               backgroundColor: '#f3f4f6',
               border: 'none',
               cursor: 'pointer',
               fontSize: '14px',
               fontWeight: '500',
               color: '#374151',
               fontFamily: 'Red Hat Display'
             }}>
               <img src={require('../assets/icons/Share.png')} alt="Share" style={{ width: '16px', height: '16px' }} />
               Share
             </button>
           </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px'
        }}>
          <button style={{
            padding: '8px 16px',
            borderRadius: '20px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: 'Red Hat Display'
          }}>
            Images
          </button>
                                           <button style={{
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: 'none',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'Red Hat Display'
            }}>
              Color
            </button>
            <button style={{
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: 'none',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'Red Hat Display'
            }}>
              Font
            </button>
        </div>

                 {/* Board Content - Empty State */}
         <div style={{
           flex: 1,
           display: 'grid',
           gridTemplateColumns: '1fr 1fr',
           gridTemplateRows: 'repeat(6, 1fr)',
           gap: '12px',
           gridTemplateAreas: `
             "tall top1"
             "tall top2"
             "grid1 top2"
             "grid2 top2"
             "grid3 wide"
             "grid4 wide"
           `
         }}>
           {/* Tall left rectangle */}
           <div style={{
             gridArea: 'tall',
             backgroundColor: '#f3f4f6',
             borderRadius: '12px'
           }} />
           
           {/* Top right rectangles */}
           <div style={{
             gridArea: 'top1',
             backgroundColor: '#f3f4f6',
             borderRadius: '12px'
           }} />
           <div style={{
             gridArea: 'top2',
             backgroundColor: '#f3f4f6',
             borderRadius: '12px'
           }} />
           
           {/* 2x2 grid */}
           <div style={{
             gridArea: 'grid1',
             backgroundColor: '#f3f4f6',
             borderRadius: '12px'
           }} />
           <div style={{
             gridArea: 'grid2',
             backgroundColor: '#f3f4f6',
             borderRadius: '12px'
           }} />
           <div style={{
             gridArea: 'grid3',
             backgroundColor: '#f3f4f6',
             borderRadius: '12px'
           }} />
           <div style={{
             gridArea: 'grid4',
             backgroundColor: '#f3f4f6',
             borderRadius: '12px'
           }} />
           
           {/* Wide bottom rectangle */}
           <div style={{
             gridArea: 'wide',
             backgroundColor: '#f3f4f6',
             borderRadius: '12px'
           }} />
         </div>
      </div>

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

                                                         {/* Bottom Navigation Bar */}
         <div style={{
           position: 'fixed',
           bottom: '24px',
           left: '50%',
           transform: 'translateX(-50%)',
           display: 'flex',
           alignItems: 'center',
           gap: '8px',
           padding: '12px 12px',
           backgroundColor: '#fff',
           borderRadius: '50px',
           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
           zIndex: 9999
         }}>
          {/* Home */}
          <div 
            onClick={() => setActiveNavItem('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: activeNavItem === 'home' ? '6px' : '0px',
              padding: activeNavItem === 'home' ? '12px 16px' : '12px',
              backgroundColor: activeNavItem === 'home' ? '#f3f4f6' : 'transparent',
              borderRadius: '50px',
              border: activeNavItem === 'home' ? 'none' : '1px solid #e5e7eb',
              cursor: 'pointer',
              height: '44px',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease',
              width: activeNavItem === 'home' ? 'auto' : '44px',
              justifyContent: activeNavItem === 'home' ? 'flex-start' : 'center'
            }}
          >
            <img src={require('../assets/icons/Home.png')} alt="Home" style={{ width: '20px', height: '20px' }} />
            {activeNavItem === 'home' && (
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#000',
                fontFamily: 'Red Hat Display',
                whiteSpace: 'nowrap'
              }}>
                Home
              </span>
            )}
          </div>

          {/* Gallery */}
          <div 
            onClick={() => setActiveNavItem('gallery')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: activeNavItem === 'gallery' ? '6px' : '0px',
              padding: activeNavItem === 'gallery' ? '12px 16px' : '12px',
              backgroundColor: activeNavItem === 'gallery' ? '#f3f4f6' : 'transparent',
              borderRadius: '50px',
              border: activeNavItem === 'gallery' ? 'none' : '1px solid #e5e7eb',
              cursor: 'pointer',
              height: '44px',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease',
              width: activeNavItem === 'gallery' ? 'auto' : '44px',
              justifyContent: activeNavItem === 'gallery' ? 'flex-start' : 'center'
            }}
          >
            <img src={require('../assets/icons/Gallery.png')} alt="Gallery" style={{ width: '20px', height: '20px' }} />
            {activeNavItem === 'gallery' && (
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#000',
                fontFamily: 'Red Hat Display',
                whiteSpace: 'nowrap'
              }}>
                Gallery
              </span>
            )}
          </div>

          {/* Boards */}
          <div 
            onClick={() => setActiveNavItem('boards')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: activeNavItem === 'boards' ? '6px' : '0px',
              padding: activeNavItem === 'boards' ? '12px 16px' : '12px',
              backgroundColor: activeNavItem === 'boards' ? '#f3f4f6' : 'transparent',
              borderRadius: '50px',
              border: activeNavItem === 'boards' ? 'none' : '1px solid #e5e7eb',
              cursor: 'pointer',
              height: '44px',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease',
              width: activeNavItem === 'boards' ? 'auto' : '44px',
              justifyContent: activeNavItem === 'boards' ? 'flex-start' : 'center'
            }}
          >
            <img src={require('../assets/icons/Boards.png')} alt="Boards" style={{ width: '20px', height: '20px' }} />
            {activeNavItem === 'boards' && (
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#000',
                fontFamily: 'Red Hat Display',
                whiteSpace: 'nowrap'
              }}>
                Boards
              </span>
            )}
          </div>

          {/* Inspirations */}
          <div 
            onClick={() => setActiveNavItem('inspirations')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: activeNavItem === 'inspirations' ? '6px' : '0px',
              padding: activeNavItem === 'inspirations' ? '12px 16px' : '12px',
              backgroundColor: activeNavItem === 'inspirations' ? '#f3f4f6' : 'transparent',
              borderRadius: '50px',
              border: activeNavItem === 'inspirations' ? 'none' : '1px solid #e5e7eb',
              cursor: 'pointer',
              height: '44px',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease',
              width: activeNavItem === 'inspirations' ? 'auto' : '44px',
              justifyContent: activeNavItem === 'inspirations' ? 'flex-start' : 'center'
            }}
          >
            <img src={require('../assets/icons/Inspirations.png')} alt="Inspirations" style={{ width: '20px', height: '20px' }} />
            {activeNavItem === 'inspirations' && (
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#000',
                fontFamily: 'Red Hat Display',
                whiteSpace: 'nowrap'
              }}>
                Inspirations
              </span>
            )}
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
