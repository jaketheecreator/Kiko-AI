import React from 'react';
import Attachment from '../assets/icons/Attachment.png';
import Image from '../assets/icons/Image.png';
import Send from '../assets/icons/Send.png';
import mic from '../assets/icons/mic.png';

interface InputComponentProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  variant?: 'homepage' | 'chat';
}

const InputComponent: React.FC<InputComponentProps> = ({
  inputValue,
  setInputValue,
  isRecording,
  setIsRecording,
  variant = 'homepage'
}) => {
  if (variant === 'homepage') {
    // Original homepage input - exact copy
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#f8f9fa',
        padding: '12px 20px',
        borderRadius: '16px',
        flex: 1,
        maxWidth: '600px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#e9ecef',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <img src={Attachment} alt="Attachment" style={{ width: '20px', height: '20px' }} />
        </div>
        
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#e9ecef',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <img src={Image} alt="Image" style={{ width: '20px', height: '20px' }} />
        </div>
        
        <input
          type="text"
          placeholder="Ask Anything"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            background: 'none',
            outline: 'none',
            fontSize: '16px',
            fontStyle: 'italic',
            color: '#333',
            minHeight: '24px'
          }}
        />
        
        <button 
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: isRecording ? '#ff4444' : '#000',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            animation: isRecording ? 'recordingPulse 1.5s ease-in-out infinite' : 'none'
          }}
          onClick={() => setIsRecording(!isRecording)}
        >
          <img 
            src={isRecording ? mic : Send} 
            alt={isRecording ? "Recording" : "Send"} 
            style={{ 
              width: '20px', 
              height: '20px', 
              filter: isRecording ? 'invert(1)' : 'invert(1)' 
            }} 
          />
        </button>
      </div>
    );
  }

  // Chat variant - scaled down for chat panel
  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      borderRadius: '16px',
      padding: '12px 16px',
      minHeight: '87px', // Increased by 10% more (79px * 1.1 = 86.9px)
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {/* Input Field - Top */}
      <input
        type="text"
        placeholder="Ask Anything"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          fontSize: '15px',
          fontStyle: 'italic',
          color: '#9ca3af',
          padding: '0',
          marginBottom: '8px'
        }}
      />
      
      {/* Icons Row - Bottom */}
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
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#e9ecef',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <img src={Attachment} alt="Attachment" style={{ width: '16px', height: '16px' }} />
          </button>
          <button style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#e9ecef',
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
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: isRecording ? '#ff4444' : '#000',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onClick={() => {
            if (inputValue.trim()) {
              // Send logic here
              console.log('Sending message:', inputValue);
              setInputValue(''); // Clear input after sending
            } else {
              // Toggle recording
              setIsRecording(!isRecording);
            }
          }}
        >
          <img 
            src={inputValue.trim() ? Send : (isRecording ? mic : mic)} 
            alt={inputValue.trim() ? "Send" : (isRecording ? "Recording" : "Mic")} 
            style={{ 
              width: '16px', 
              height: '16px', 
              filter: 'invert(1)' 
            }} 
          />
        </button>
      </div>
    </div>
  );
};

export default InputComponent;
