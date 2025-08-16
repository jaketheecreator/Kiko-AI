import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatData, ChatMessage, loadChatData } from '../utils/chatStorage';
import PageTransition from './PageTransition';
import Shimmer from './Shimmer';
import Grid from '../assets/images/Grid.png';
import Plus from '../assets/icons/plus.png';
import ArrowLeft from '../assets/icons/ArrowLeft.png';
import Heart from '../assets/icons/Heart.png';
import Trash from '../assets/icons/Trash.png';
import TopRightNav from './TopRightNav';
import ChatPanel from './ChatPanel';

function MoodboardPage() {
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeNavItem, setActiveNavItem] = useState('home');
  // Center the board in viewport (accounting for sidebars)
  // Viewport width minus chat panel (344px) and board sidebar (296px) = available width
  // Board component is 494px wide
  const centerX = (window.innerWidth - 344 - 296 - 494) / 2 + 344; // Add chat panel width offset
  const centerY = (window.innerHeight - 400) / 2; // Board height is roughly 400px
  const [boardPosition, setBoardPosition] = useState({ 
    x: Math.max(centerX, 370), // Ensure minimum distance from left
    y: Math.max(centerY, 150)  // Ensure minimum distance from top
  });
  const [isDraggingBoard, setIsDraggingBoard] = useState(false);
  const [boardDragStart, setBoardDragStart] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('Images');

  // Mock image data
  const initialCenterImages = [
    { id: 1, color: '#8B4513', gradient: 'linear-gradient(45deg, #D2691E, #8B4513)', type: 'tall', position: 'left-1' },
    { id: 2, color: '#2F4F4F', gradient: 'linear-gradient(45deg, #2F4F4F, #708090)', type: 'medium', position: 'left-2' },
    { id: 3, color: '#D2B48C', gradient: 'linear-gradient(45deg, #DEB887, #D2B48C)', type: 'medium', position: 'left-3' },
    { id: 4, color: '#CD853F', gradient: 'linear-gradient(45deg, #F4A460, #CD853F)', type: 'medium', position: 'left-4' },
    { id: 5, color: '#8FBC8F', gradient: 'linear-gradient(45deg, #90EE90, #8FBC8F)', type: 'medium', position: 'right-1' },
    { id: 6, color: '#A0522D', gradient: 'linear-gradient(45deg, #D2691E, #A0522D)', type: 'medium', position: 'right-2' },
    { id: 7, color: '#696969', gradient: 'linear-gradient(45deg, #A9A9A9, #696969)', type: 'medium', position: 'right-3' },
    { id: 8, color: '#DAA520', gradient: 'linear-gradient(45deg, #FFD700, #DAA520)', type: 'tall', position: 'right-4' }
  ];

  // Image type definition
  type ImageData = {
    id: number;
    color: string;
    gradient: string;
    type: string;
    position: string;
  };

  const [centerImages, setCenterImages] = useState<ImageData[]>(initialCenterImages);
  const [rightBoardImages, setRightBoardImages] = useState<ImageData[]>([]);
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Initialize immediately to show shimmer
  useEffect(() => {
    setHasInitialized(true);
  }, []);

  // Load chat data on component mount
  useEffect(() => {
    const loadData = async () => {
      // Check for chat data first
      const loadedChatData = loadChatData();
      if (!loadedChatData) {
        // If no chat data, redirect to homepage immediately
        navigate('/');
        return;
      }
      
      // Add artificial delay for shimmer effect (only if we have data)
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setChatData(loadedChatData);
      setIsLoading(false);
    };
    
    loadData();
  }, [navigate]);

  // Transfer functions
  const moveToBoard = useCallback((imageId: number) => {
    const imageToMove = centerImages.find(img => img.id === imageId);
    if (imageToMove) {
      setCenterImages(prev => prev.filter(img => img.id !== imageId));
      setRightBoardImages(prev => [...prev, imageToMove]);
    }
  }, [centerImages]);

  const moveToInspiration = useCallback((imageId: number) => {
    const imageToMove = rightBoardImages.find(img => img.id === imageId);
    if (imageToMove) {
      setRightBoardImages(prev => prev.filter(img => img.id !== imageId));
      setCenterImages(prev => [...prev, imageToMove]);
    }
  }, [rightBoardImages]);

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
    // Optional: Clear chat data when going back to home
    // localStorage.removeItem('kiko_chat');
    navigate('/');
  };

  const handleBoardMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingBoard(true);
    setBoardDragStart({
      x: e.clientX - boardPosition.x,
      y: e.clientY - boardPosition.y
    });
  }, [boardPosition]);

  const handleBoardMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingBoard) return;
    
    setBoardPosition({
      x: e.clientX - boardDragStart.x,
      y: e.clientY - boardDragStart.y
    });
  }, [isDraggingBoard, boardDragStart]);

  const handleBoardMouseUp = useCallback(() => {
    setIsDraggingBoard(false);
  }, []);

  // Don't render anything until initialized
  if (!hasInitialized) {
    return null;
  }

  return (
    <PageTransition trigger={hasInitialized}>
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
        {isLoading ? (
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            height: '100%',
            width: '100%',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <Shimmer height="40px" borderRadius="20px" />
            <Shimmer height="80px" borderRadius="12px" delay={200} />
            <Shimmer height="60px" borderRadius="12px" delay={400} />
            <Shimmer height="40px" width="70%" borderRadius="12px" delay={600} />
            <div style={{ flex: 1 }} />
            <Shimmer height="50px" borderRadius="25px" delay={800} />
          </div>
        ) : (
          <ChatPanel onBack={handleBackToHome} chatData={chatData} />
        )}
      </div>

      {/* Fixed Top Navigation */}
      {/* Back Button - Top Left */}
      <div style={{
        position: 'fixed',
        top: '24px',
        left: '24px',
        zIndex: 1000
      }}>
        {isLoading ? (
          <Shimmer height="44px" width="140px" borderRadius="50px" />
        ) : (
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
        )}
      </div>



      {/* Top Right Navigation */}
      {isLoading ? (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 1000,
          display: 'flex',
          gap: '16px'
        }}>
          <Shimmer height="44px" width="120px" borderRadius="22px" />
          <Shimmer height="44px" width="44px" borderRadius="50%" delay={100} />
          <Shimmer height="44px" width="44px" borderRadius="50%" delay={200} />
          <Shimmer height="44px" width="44px" borderRadius="50%" delay={300} />
        </div>
      ) : (
        <TopRightNav 
          credits="500/1000 Credits"
          onLightModeToggle={() => console.log('Light mode toggled')}
          onSettingsClick={() => console.log('Settings clicked')}
          onProfileClick={() => console.log('Profile clicked')}
        />
      )}

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
           {isLoading ? (
             <>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                 <Shimmer height="28px" width="120px" borderRadius="8px" />
                 <div style={{ display: 'flex', gap: '8px' }}>
                   <Shimmer height="32px" width="32px" borderRadius="50%" delay={100} />
                   <Shimmer height="32px" width="80px" borderRadius="20px" delay={200} />
                 </div>
               </div>
               <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                 <Shimmer height="36px" width="70px" borderRadius="20px" delay={300} />
                 <Shimmer height="36px" width="50px" borderRadius="20px" delay={400} />
                 <Shimmer height="36px" width="50px" borderRadius="20px" delay={500} />
               </div>
               <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(6, 1fr)', gap: '10px' }}>
                 <Shimmer borderRadius="12px" delay={600} />
                 <Shimmer borderRadius="12px" delay={700} />
                 <Shimmer borderRadius="12px" delay={800} />
                 <Shimmer borderRadius="12px" delay={900} />
                 <Shimmer borderRadius="12px" delay={1000} />
                 <Shimmer borderRadius="12px" delay={1100} />
               </div>
             </>
           ) : (
             <>
                 {/* Header */}
         <div style={{
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'space-between',
           marginBottom: '16px'
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
           marginBottom: '16px'
         }}>
          <button 
            onClick={() => setActiveTab('Images')}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: activeTab === 'Images' ? '#000' : 'transparent',
              color: activeTab === 'Images' ? '#fff' : '#6b7280',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'Red Hat Display',
              transition: 'all 0.3s ease'
            }}>
            Images
          </button>
          <button 
            onClick={() => setActiveTab('Color')}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: activeTab === 'Color' ? '#000' : 'transparent',
              color: activeTab === 'Color' ? '#fff' : '#6b7280',
              border: 'none',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'Red Hat Display',
              transition: 'all 0.3s ease'
            }}>
            Color
          </button>
          <button 
            onClick={() => setActiveTab('Font')}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: activeTab === 'Font' ? '#000' : 'transparent',
              color: activeTab === 'Font' ? '#fff' : '#6b7280',
              border: 'none',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'Red Hat Display',
              transition: 'all 0.3s ease'
            }}>
            Font
          </button>
        </div>

                 {/* Board Content - Dynamic Content */}
         <div style={{
           flex: 1,
           opacity: 1,
           transform: 'translateY(0)',
           transition: 'all 0.4s ease',
           minHeight: 0,
           overflow: 'hidden'
         }}>
           {activeTab === 'Images' && (
             <div style={{
               display: 'grid',
               gridTemplateColumns: '1fr 1fr',
               gridTemplateRows: 'repeat(6, 1fr)',
               gap: '10px',
               height: '100%',
               gridTemplateAreas: `
                 "top1 wideR"
                 "tall wideR"
                 "tall tallR"
                 "tall tallR"
                 "wide tallR"
                 "wide top1R"
               `
             }}>
               {/* Always show skeleton/placeholder grid */}
               <>
                 <div style={{ gridArea: 'top1', backgroundColor: '#f3f4f6', borderRadius: '12px' }} />
                 <div style={{ gridArea: 'tall', backgroundColor: '#f3f4f6', borderRadius: '12px' }} />
                 <div style={{ gridArea: 'wide', backgroundColor: '#f3f4f6', borderRadius: '12px' }} />
                 <div style={{ gridArea: 'top1R', backgroundColor: '#f3f4f6', borderRadius: '12px' }} />
                 <div style={{ gridArea: 'tallR', backgroundColor: '#f3f4f6', borderRadius: '12px' }} />
                 <div style={{ gridArea: 'wideR', backgroundColor: '#f3f4f6', borderRadius: '12px' }} />
               </>
               
               {/* Overlay liked images on top of skeleton */}
               {rightBoardImages.map((image, index) => {
                 const gridAreas = ['top1', 'tall', 'wide', 'top1R', 'tallR', 'wideR'];
                 const gridArea = gridAreas[index % gridAreas.length];
                 
                 return (
                   <div key={`right-${image.id}`} style={{
                     gridArea: gridArea,
                     backgroundColor: image.color,
                     backgroundImage: image.gradient,
                     borderRadius: '12px',
                     position: 'relative',
                     cursor: 'pointer',
                     opacity: 1,
                     transform: 'scale(1)',
                     transition: 'all 0.3s ease'
                   }}>
                     <div 
                       onClick={(e) => {
                         e.stopPropagation();
                         moveToInspiration(image.id);
                       }}
                       style={{
                         position: 'absolute',
                         top: '8px',
                         left: '8px',
                         width: '28px',
                         height: '28px',
                         backgroundColor: 'rgba(255,255,255,0.9)',
                         borderRadius: '50%',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         cursor: 'pointer',
                         transition: 'transform 0.2s ease'
                       }}
                       onMouseEnter={(e) => {
                         (e.target as HTMLElement).style.transform = 'scale(1.1)';
                       }}
                       onMouseLeave={(e) => {
                         (e.target as HTMLElement).style.transform = 'scale(1)';
                       }}
                     >
                       <img src={Trash} alt="Trash" style={{ width: '14px', height: '14px' }} />
                     </div>
                   </div>
                 );
               })}
             </div>
           )}

           {activeTab === 'Color' && (
             <div style={{
               display: 'grid',
               gridTemplateColumns: '1fr 1fr',
               gap: '12px',
               height: '100%'
             }}>
               {/* Color swatches */}
               <div style={{
                 backgroundColor: '#C65500',
                 borderRadius: '12px',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'flex-end',
                 padding: '12px',
                 color: '#fff',
                 fontSize: '12px',
                 fontFamily: 'Red Hat Display'
               }}>
                 <div style={{ fontWeight: '500' }}>Burnt Orange</div>
                 <div style={{ opacity: 0.8 }}>#C65500</div>
               </div>
               <div style={{
                 backgroundColor: '#4B5E2E',
                 borderRadius: '12px',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'flex-end',
                 padding: '12px',
                 color: '#fff',
                 fontSize: '12px',
                 fontFamily: 'Red Hat Display'
               }}>
                 <div style={{ fontWeight: '500' }}>Deep Moss</div>
                 <div style={{ opacity: 0.8 }}>#4B5E2E</div>
               </div>
               <div style={{
                 backgroundColor: '#D4AF37',
                 borderRadius: '12px',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'flex-end',
                 padding: '12px',
                 color: '#fff',
                 fontSize: '12px',
                 fontFamily: 'Red Hat Display'
               }}>
                 <div style={{ fontWeight: '500' }}>Faded Mustard</div>
                 <div style={{ opacity: 0.8 }}>#D4AF37</div>
               </div>
               <div style={{
                 backgroundColor: '#F5E6D0',
                 borderRadius: '12px',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'flex-end',
                 padding: '12px',
                 color: '#333',
                 fontSize: '12px',
                 fontFamily: 'Red Hat Display'
               }}>
                 <div style={{ fontWeight: '500' }}>Warm Beige</div>
                 <div style={{ opacity: 0.7 }}>#F5E6D0</div>
               </div>
               <div style={{
                 backgroundColor: '#2E4E3F',
                 borderRadius: '12px',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'flex-end',
                 padding: '12px',
                 color: '#fff',
                 fontSize: '12px',
                 fontFamily: 'Red Hat Display',
                 gridColumn: 'span 2'
               }}>
                 <div style={{ fontWeight: '500' }}>Forest Green</div>
                 <div style={{ opacity: 0.8 }}>#2E4E3F</div>
               </div>
             </div>
           )}

           {activeTab === 'Font' && (
             <div style={{
               display: 'flex',
               flexDirection: 'column',
               gap: '24px',
               flex: 1,
               padding: '16px',
               backgroundColor: '#fafafa',
               borderRadius: '12px',
               overflow: 'auto',
               maxHeight: '100%'
             }}>
               <div>
                 <div style={{
                   fontSize: '23px',
                   fontWeight: '600',
                   color: '#111',
                   fontFamily: 'Red Hat Display',
                   marginBottom: '4px'
                 }}>
                   Cooper Black
                 </div>
                 <div style={{
                   fontSize: '15px',
                   color: '#9ca3af',
                   fontFamily: 'Red Hat Display'
                 }}>
                   Titles / Hero
                 </div>
               </div>
               <div>
                 <div style={{
                   fontSize: '20px',
                   fontWeight: '600',
                   color: '#111',
                   fontFamily: 'Red Hat Display',
                   marginBottom: '4px'
                 }}>
                   Courier Prime
                 </div>
                 <div style={{
                   fontSize: '15px',
                   color: '#9ca3af',
                   fontFamily: 'Red Hat Display'
                 }}>
                   Subheaders / Quotes
                 </div>
               </div>
               <div>
                 <div style={{
                   fontSize: '19px',
                   fontWeight: '400',
                   color: '#111',
                   fontFamily: 'serif',
                   marginBottom: '4px'
                 }}>
                   Quattrocento Serif
                 </div>
                 <div style={{
                   fontSize: '15px',
                   color: '#9ca3af',
                   fontFamily: 'Red Hat Display'
                 }}>
                   Body Text / Elegant captions
                 </div>
               </div>
             </div>
           )}
         </div>
         </>
           )}
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
          userSelect: 'none',
          opacity: isLoading ? 0.3 : 1,
          transition: 'opacity 0.3s ease'
        }}
                 onMouseDown={handleMouseDown}
         onMouseMove={(e) => {
           handleMouseMove(e);
           handleBoardMouseMove(e);
         }}
         onMouseUp={() => {
           handleMouseUp();
           handleBoardMouseUp();
         }}
         onMouseLeave={() => {
           handleMouseUp();
           handleBoardMouseUp();
         }}
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

           {/* Draggable Moodboard Component */}
           <div 
             onMouseDown={handleBoardMouseDown}
             style={{
               position: 'absolute',
               left: `${boardPosition.x}px`,
               top: `${boardPosition.y}px`,
               width: '494px',
               backgroundColor: '#fff',
               borderRadius: '20px',
               boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
               padding: '24px',
               cursor: isDraggingBoard ? 'grabbing' : 'grab',
               userSelect: 'none',
               zIndex: 100
             }}
           >
             {/* Color Palette Section */}
             <div style={{ marginBottom: '20px' }}>
               <h3 style={{
                 fontSize: '16px',
                 fontWeight: '500',
                 color: '#9ca3af',
                 margin: '0 0 16px 0',
                 fontFamily: 'Red Hat Display',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '8px'
               }}>
                 Color Palette
               </h3>
               <div style={{
                 display: 'grid',
                 gridTemplateColumns: 'repeat(5, 1fr)',
                 gap: '8px'
               }}>
                 <div style={{
                   backgroundColor: '#C65500',
                   borderRadius: '12px',
                   height: '60px',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'flex-end',
                   padding: '8px',
                   color: '#fff',
                   fontSize: '10px',
                   fontFamily: 'Red Hat Display'
                 }}>
                   <div style={{ fontWeight: '500', marginBottom: '2px' }}>Burnt Orange</div>
                   <div style={{ opacity: 0.8 }}>#C65500</div>
                 </div>
                 <div style={{
                   backgroundColor: '#4B5E2E',
                   borderRadius: '12px',
                   height: '60px',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'flex-end',
                   padding: '8px',
                   color: '#fff',
                   fontSize: '10px',
                   fontFamily: 'Red Hat Display'
                 }}>
                   <div style={{ fontWeight: '500', marginBottom: '2px' }}>Deep Moss</div>
                   <div style={{ opacity: 0.8 }}>#4B5E2E</div>
                 </div>
                 <div style={{
                   backgroundColor: '#D4AF37',
                   borderRadius: '12px',
                   height: '60px',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'flex-end',
                   padding: '8px',
                   color: '#fff',
                   fontSize: '10px',
                   fontFamily: 'Red Hat Display'
                 }}>
                   <div style={{ fontWeight: '500', marginBottom: '2px' }}>Faded Mustard</div>
                   <div style={{ opacity: 0.8 }}>#D4AF37</div>
                 </div>
                 <div style={{
                   backgroundColor: '#F5E6D0',
                   borderRadius: '12px',
                   height: '60px',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'flex-end',
                   padding: '8px',
                   color: '#333',
                   fontSize: '10px',
                   fontFamily: 'Red Hat Display'
                 }}>
                   <div style={{ fontWeight: '500', marginBottom: '2px' }}>Warm Beige</div>
                   <div style={{ opacity: 0.7 }}>#F5E6D0</div>
                 </div>
                 <div style={{
                   backgroundColor: '#2E4E3F',
                   borderRadius: '12px',
                   height: '60px',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'flex-end',
                   padding: '8px',
                   color: '#fff',
                   fontSize: '10px',
                   fontFamily: 'Red Hat Display'
                 }}>
                   <div style={{ fontWeight: '500', marginBottom: '2px' }}>Forest Green</div>
                   <div style={{ opacity: 0.8 }}>#2E4E3F</div>
                 </div>
               </div>
             </div>

             {/* Subtle Divider */}
             <div style={{
               height: '1px',
               backgroundColor: '#f3f4f6',
               margin: '0 0 20px 0'
             }} />

             {/* Typography Section */}
             <div style={{ marginBottom: '20px' }}>
               <h3 style={{
                 fontSize: '16px',
                 fontWeight: '500',
                 color: '#9ca3af',
                 margin: '0 0 16px 0',
                 fontFamily: 'Red Hat Display',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '8px'
               }}>
                 Typography
               </h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <div>
                   <div style={{
                     fontSize: '24px',
                     fontWeight: '600',
                     color: '#111',
                     fontFamily: 'Red Hat Display',
                     marginBottom: '4px'
                   }}>
                     Cooper Black
                   </div>
                   <div style={{
                     fontSize: '12px',
                     color: '#9ca3af',
                     fontFamily: 'Red Hat Display'
                   }}>
                     Titles / Hero
                   </div>
                 </div>
                 <div>
                   <div style={{
                     fontSize: '20px',
                     fontWeight: '600',
                     color: '#111',
                     fontFamily: 'Red Hat Display',
                     marginBottom: '4px'
                   }}>
                     Courier Prime
                   </div>
                   <div style={{
                     fontSize: '12px',
                     color: '#9ca3af',
                     fontFamily: 'Red Hat Display'
                   }}>
                     Subheaders / Quotes
                   </div>
                 </div>
                 <div>
                   <div style={{
                     fontSize: '18px',
                     fontWeight: '400',
                     color: '#111',
                     fontFamily: 'serif',
                     marginBottom: '4px'
                   }}>
                     Quattrocento Serif
                   </div>
                   <div style={{
                     fontSize: '12px',
                     color: '#9ca3af',
                     fontFamily: 'Red Hat Display'
                   }}>
                     Body Text / Elegant captions
                   </div>
                 </div>
               </div>
             </div>

             {/* Subtle Divider */}
             <div style={{
               height: '1px',
               backgroundColor: '#f3f4f6',
               margin: '0 0 20px 0'
             }} />

                         {/* Image Inspiration Section */}
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#9ca3af',
                margin: '0 0 16px 0',
                fontFamily: 'Red Hat Display'
              }}>
                Image Inspiration
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}>
                {/* Left Column */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gridTemplateRows: '280px 140px 140px 140px',
                  gap: '8px'
                }}>
                  {centerImages.filter(img => img.position.startsWith('left')).map((image, index) => (
                    <div key={image.id} style={{
                      backgroundColor: image.color,
                      borderRadius: '12px',
                      backgroundImage: image.gradient,
                      position: 'relative',
                      cursor: 'pointer',
                      opacity: 1,
                      transform: 'scale(1)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          moveToBoard(image.id);
                        }}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          width: '32px',
                          height: '32px',
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.transform = 'scale(1)';
                        }}
                      >
                        <img src={Heart} alt="Heart" style={{ width: '18px', height: '18px' }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gridTemplateRows: '140px 140px 140px 280px',
                  gap: '8px'
                }}>
                  {centerImages.filter(img => img.position.startsWith('right')).map((image, index) => (
                    <div key={image.id} style={{
                      backgroundColor: image.color,
                      borderRadius: '12px',
                      backgroundImage: image.gradient,
                      position: 'relative',
                      cursor: 'pointer',
                      opacity: 1,
                      transform: 'scale(1)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          moveToBoard(image.id);
                        }}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          width: '32px',
                          height: '32px',
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.transform = 'scale(1)';
                        }}
                      >
                        <img src={Heart} alt="Heart" style={{ width: '18px', height: '18px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
           </div>
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
    </PageTransition>
  );
}

export default MoodboardPage;
