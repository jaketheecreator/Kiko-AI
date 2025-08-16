import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatData, ChatMessage } from '../utils/chatStorage';
import PageTransition from './PageTransition';
import Grid from '../assets/images/Grid.png';
import Logo from '../assets/icons/Logo.png';
import Home from '../assets/icons/Home.png';
import Gallery from '../assets/icons/Gallery.png';
import Boards from '../assets/icons/Boards.png';
import Inspirations from '../assets/icons/Inspirations.png';
import retrovibe from '../assets/images/retrovibe.png';
import softanddreamy from '../assets/images/softanddreamy.png';
import earthytones from '../assets/images/earthytones.png';
import playfulpop from '../assets/images/playfulpop.png';
import Attachment from '../assets/icons/Attachment.png';
import Image from '../assets/icons/Image.png';
import Send from '../assets/icons/Send.png';
import mic from '../assets/icons/mic.png';
import TopRightNav from './TopRightNav';

function Homepage() {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  const handleVibeCardClick = () => {
    navigate('/moodboard');
  };

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      // Create initial chat data with user's idea
      const chatData: ChatData = {
        idea: inputValue.trim(),
        messages: [
          {
            id: `msg-${Date.now()}`,
            text: inputValue.trim(),
            sender: 'user',
            timestamp: Date.now()
          }
        ]
      };
      
      // Store in localStorage
      localStorage.setItem('kiko_chat', JSON.stringify(chatData));
      
      // Navigate to moodboard
      navigate('/moodboard');
    }
  };

  return (
    <PageTransition>
      <div style={{ 
        height: '100vh', 
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
      backgroundColor: '#f1f1f1',
      backgroundImage: `
        linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
      display: 'flex'
    }}>
      {/* Left Side Nav */}
      <div style={{
        position: 'fixed',
        top: '24px',
        left: '24px',
                 width: '140px', // Increased by 10% from 128px
        height: '235px', // Reduced by 10% from ~300px
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '18px', // Reduced by 10% from 20px
                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
        zIndex: 1000,
        animation: 'slideInLeft 0.8s ease-out'
      }}>
                 {/* Logo with KIKO text */}
         <div style={{
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           marginBottom: '20px'
         }}>
           <img src={Logo} alt="KIKO" style={{ height: '32px', width: 'auto' }} />
         </div>

        {/* Navigation Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                     {/* Home - Active */}
           <div style={{
             display: 'flex',
             alignItems: 'center',
             gap: '12px',
             padding: '12px 16px',
             borderRadius: '20px',
             backgroundColor: '#f3f4f6',
             cursor: 'pointer'
           }}>
             <img src={Home} alt="Home" style={{ width: '18px', height: '18px' }} />
             <span style={{ 
               color: '#000', 
               fontSize: '15px', 
               fontWeight: '600',
               fontFamily: 'Red Hat Display, sans-serif'
             }}>
               Home
             </span>
           </div>

          {/* My Boards */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}>
            <img src={Gallery} alt="My Boards" style={{ width: '18px', height: '18px', opacity: 0.6 }} />
            <span style={{ 
              color: '#6b7280', 
              fontSize: '15px', 
              fontWeight: '500',
              fontFamily: 'Red Hat Display, sans-serif'
            }}>
              My Boards
            </span>
          </div>

          {/* Moodboards */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}>
            <img src={Boards} alt="Moodboards" style={{ width: '18px', height: '18px', opacity: 0.6 }} />
            <span style={{ 
              color: '#6b7280', 
              fontSize: '15px', 
              fontWeight: '500',
              fontFamily: 'Red Hat Display, sans-serif'
            }}>
              Moodboards
            </span>
          </div>

          {/* Inspirations */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}>
            <img src={Inspirations} alt="Inspirations" style={{ width: '18px', height: '18px', opacity: 0.6 }} />
            <span style={{ 
              color: '#6b7280', 
              fontSize: '15px', 
              fontWeight: '500',
              fontFamily: 'Red Hat Display, sans-serif'
            }}>
              Inspirations
            </span>
          </div>
        </div>
      </div>

                     {/* Top Right Navigation */}
      <TopRightNav 
        credits="500/1000 Credits"
        onLightModeToggle={() => console.log('Light mode toggled')}
        onSettingsClick={() => console.log('Settings clicked')}
        onProfileClick={() => console.log('Profile clicked')}
        style={{ animation: 'slideInRight 0.8s ease-out 0.2s both' }}
      />

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingTop: '120px',
        paddingBottom: '60px'
      }}>
                 {/* Hero Section */}
         <div style={{
           textAlign: 'center',
           marginBottom: '0px',
           animation: 'fadeInUp 1s ease-out 0.4s both'
         }}>
                       <h1 style={{
              fontSize: '64px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '-10px',
              lineHeight: '0.4',
              fontFamily: 'Red Hat Display, sans-serif'
            }}>
              Describe the mood.
            </h1>
            <h1 style={{
              fontSize: '64px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '8px',
              lineHeight: '0.7',
              fontFamily: 'Red Hat Display, sans-serif'
            }}>
              We'll make the board 🎨
            </h1>
           <p style={{
             fontSize: '24px',
             color: '#9ca3af',
             marginTop: '16px',
             textAlign: 'center',
             fontFamily: 'Red Hat Display, sans-serif'
           }}>
             Get an AI-powered moodboard in seconds
           </p>
         </div>

        {/* Vibe Cards */}
        <div style={{
          position: 'relative',
          width: '740px',
          height: '180px',
          marginBottom: '40px',
          margin: '0 auto 40px auto',
          animation: 'fadeInScale 1.2s ease-out 0.8s both'
        }}>
          {/* Card 1 - Retro Vibe */}
          <div 
            onClick={handleVibeCardClick}
            onMouseEnter={(e) => (e.target as HTMLElement).style.transform = 'rotate(-3deg) scale(1.05)'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.transform = 'rotate(-3deg) scale(1)'}
            style={{
              position: 'absolute',
              left: '0px',
              top: '20px',
              width: '160px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.09)',
              transform: 'rotate(-3deg)',
              zIndex: 1,
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
          >
            <div style={{
              width: '100%',
              height: '104px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              <img src={retrovibe} alt="Retro Vibe" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{
              display: 'flex',
              gap: '4px',
              marginBottom: '8px'
            }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#90EE90' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#2D5A27' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#696969' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#D2B48C' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#8B4513' }}></div>
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 4px 0',
              fontFamily: 'Red Hat Display, sans-serif'
            }}>
              Retro <span style={{ fontStyle: 'italic', fontFamily: 'Red Hat Display, sans-serif' }}>Vibe</span>
            </h3>
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: '0',
              lineHeight: '1.3'
            }}>
              Bold colors, funky fonts, and vintage cool.
            </p>
          </div>

          {/* Card 2 - Soft & Dreamy */}
          <div 
            onClick={handleVibeCardClick}
            onMouseEnter={(e) => (e.target as HTMLElement).style.transform = 'rotate(2deg) scale(1.05)'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.transform = 'rotate(2deg) scale(1)'}
            style={{
              position: 'absolute',
              left: '180px',
              top: '8px',
              width: '160px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.09)',
              transform: 'rotate(2deg)',
              zIndex: 2,
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
          >
            <div style={{
              width: '100%',
              height: '104px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              <img src={softanddreamy} alt="Soft & Dreamy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{
              display: 'flex',
              gap: '4px',
              marginBottom: '8px'
            }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFB6C1' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFDAB9' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFFFE0' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#E6E6FA' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FF69B4' }}></div>
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 4px 0',
              fontFamily: 'Red Hat Display, sans-serif'
            }}>
              Soft & <span style={{ fontStyle: 'italic', fontFamily: 'Red Hat Display, sans-serif' }}>Dreamy</span>
            </h3>
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: '0',
              lineHeight: '1.3'
            }}>
              Pastels, glow, and cloud-like<br/>calm.
            </p>
          </div>

          {/* Card 3 - Earthy Tones */}
          <div 
            onClick={handleVibeCardClick}
            onMouseEnter={(e) => (e.target as HTMLElement).style.transform = 'rotate(-2deg) scale(1.05)'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.transform = 'rotate(-2deg) scale(1)'}
            style={{
              position: 'absolute',
              left: '360px',
              top: '10px',
              width: '160px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.09)',
              transform: 'rotate(-2deg)',
              zIndex: 3,
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
          >
            <div style={{
              width: '100%',
              height: '104px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              <img src={earthytones} alt="Earthy Tones" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{
              display: 'flex',
              gap: '4px',
              marginBottom: '8px'
            }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#2D5A27' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#8B4513' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#D2B48C' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#696969' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#000000' }}></div>
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 4px 0',
              fontFamily: 'Red Hat Display, sans-serif'
            }}>
              Earthy <span style={{ fontStyle: 'italic', fontFamily: 'Red Hat Display, sans-serif' }}>Tones</span>
            </h3>
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: '0',
              lineHeight: '1.3'
            }}>
              Warm neutrals, natural textures, and calm vibes.
            </p>
          </div>

          {/* Card 4 - Playful Pop */}
          <div 
            onClick={handleVibeCardClick}
            onMouseEnter={(e) => (e.target as HTMLElement).style.transform = 'rotate(3deg) scale(1.05)'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.transform = 'rotate(3deg) scale(1)'}
            style={{
              position: 'absolute',
              left: '540px',
              top: '5px',
              width: '160px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.09)',
              transform: 'rotate(3deg)',
              zIndex: 4,
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
          >
            <div style={{
              width: '100%',
              height: '104px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              <img src={playfulpop} alt="Playful Pop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{
              display: 'flex',
              gap: '4px',
              marginBottom: '8px'
            }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#2D5A27' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#8B4513' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#D2B48C' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#696969' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFFF00' }}></div>
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 4px 0',
              fontFamily: 'Red Hat Display, sans-serif'
            }}>
              Playful <span style={{ fontStyle: 'italic', fontFamily: 'Red Hat Display, sans-serif' }}>Pop</span>
            </h3>
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: '0',
              lineHeight: '1.3'
            }}>
              Bright colors, bouncy shapes, and good energy.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Input Bar */}
      <div style={{
        position: 'fixed',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)', // Center perfectly
        width: '620px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
        zIndex: 1000,
        animation: 'slideInUp 1s ease-out 1.2s both'
      }}>
        {/* Input Field */}
        <input
          type="text"
          placeholder="Moody desert tech"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: '16px',
            fontStyle: inputValue ? 'normal' : 'italic',
            color: inputValue ? '#2d3748' : '#9ca3af',
            padding: '0',
            marginBottom: '12px',
            width: '100%',
            fontFamily: 'Red Hat Display, sans-serif'
          }}
        />
        
        {/* Icons Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Left Icons */}
          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <button style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#f1f3f4',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <img src={Attachment} alt="Attachment" style={{ width: '16px', height: '16px' }} />
            </button>
            <button style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#f1f3f4',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <img src={Image} alt="Image" style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
          
          {/* Right Button */}
          <button 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: inputValue.trim() ? '#000' : (isRecording ? '#ff4444' : '#000'),
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              animation: isRecording ? 'recordingPulse 1s infinite' : 'none'
            }}
            onClick={() => {
              if (inputValue.trim()) {
                handleInputSubmit();
              } else {
                setIsRecording(!isRecording);
              }
            }}
          >
            <img 
              src={inputValue.trim() ? Send : mic} 
              alt={inputValue.trim() ? "Send" : (isRecording ? "Recording" : "Mic")} 
              style={{ 
                width: '16px', 
                height: '16px', 
                filter: 'brightness(0) saturate(100%) invert(1)',
                mixBlendMode: 'difference'
              }} 
            />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)', // Center perfectly
        fontSize: '14px',
        color: '#9ca3af',
        fontFamily: 'Red Hat Display, sans-serif',
        animation: 'fadeIn 1s ease-out 1.6s both'
      }}>
        Built with Love from Juggernaut
      </div>

      <style>
        {`
          @keyframes recordingPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }

          @keyframes slideInLeft {
            0% {
              opacity: 0;
              transform: translateX(-50px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            0% {
              opacity: 0;
              transform: translateX(50px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInUp {
            0% {
              opacity: 0;
              transform: translateX(-50%) translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }

          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
    </PageTransition>
  );
}

export default Homepage;
