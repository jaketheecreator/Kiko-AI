import React, { useState } from 'react';
import InputComponent from './InputComponent';
import Copy from '../assets/icons/Copy.png';
import Thumbsup from '../assets/icons/Thumbsup.png';
import Thumbsdown from '../assets/icons/Thumbsdown.png';
import Share from '../assets/icons/Share.png';
import Reload from '../assets/icons/Reload.png';
import Option from '../assets/icons/Option.png';

type Props = {
  onBack?: () => void;
};

const ChatPanel: React.FC<Props> = ({ onBack }) => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, text: string, isUser: boolean}>>([]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        isUser: true
      };
      setMessages(prev => [...prev, newMessage]);
      setInputValue('');
      
      // Simulate AI response (you can replace this with actual API call)
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          text: "I'll help you create that cozy 90s cafe moodboard! What specific elements would you like me to focus on?",
          isUser: false
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header with Title Pill */}
      <div style={{
        padding: '24px 24px 16px 24px',
        textAlign: 'center'
      }}>
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '50px',
          padding: '12px 20px',
          display: 'inline-block',
          whiteSpace: 'nowrap'
        }}>
                     <span style={{
             fontSize: '14px',
             fontWeight: '600',
             color: '#374151',
             fontFamily: 'Red Hat Display'
           }}>
             Generate a cozy 90s cafe moodboard
           </span>
        </div>
      </div>

      {/* Content Body */}
      <div style={{
        flex: 1,
        padding: '0 24px',
        overflowY: 'auto'
      }}>
        {/* Mood Summary Section */}
        <div style={{
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '20px' }}>☕</span>
                         <span style={{
               fontSize: '16px',
               fontWeight: '600',
               color: '#111',
               fontFamily: 'Red Hat Display'
             }}>
               Mood Summary:
             </span>
          </div>
                     <p style={{
             color: '#333',
             fontSize: '14px',
             lineHeight: '1.6',
             margin: 0,
             fontFamily: 'Red Hat Display'
           }}>
             Think warm lighting, mismatched furniture, vintage posters, and the smell of espresso in the air.
             Inspired by Friends-era aesthetics with a nostalgic, soft vibe.
           </p>
        </div>

        {/* Overall Vibe Section */}
        <div style={{
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '20px' }}>🌿</span>
                         <span style={{
               fontSize: '16px',
               fontWeight: '600',
               color: '#111',
               fontFamily: 'Red Hat Display'
             }}>
               Overall Vibe:
             </span>
          </div>
                     <p style={{
             color: '#333',
             fontSize: '14px',
             lineHeight: '1.6',
             margin: 0,
             fontFamily: 'Red Hat Display'
           }}>
             A space that feels like a second home — where jazz plays softly in the background, and every corner
             invites you to slow down, read, or write in your journal.
           </p>
        </div>

                 {/* Interactive Icons */}
         <div style={{
           display: 'flex',
           gap: '16px',
           justifyContent: 'flex-start',
           marginBottom: '24px'
         }}>
           <img src={Copy} alt="Copy" style={{ width: '20px', height: '22px', cursor: 'pointer', opacity: '0.7' }} />
           <img src={Thumbsup} alt="Thumbs Up" style={{ width: '20px', height: '22px', cursor: 'pointer', opacity: '0.7' }} />
           <img src={Thumbsdown} alt="Thumbs Down" style={{ width: '20px', height: '22px', cursor: 'pointer', opacity: '0.7' }} />
           <img src={Share} alt="Share" style={{ width: '20px', height: '22px', cursor: 'pointer', opacity: '0.7' }} />
           <img src={Reload} alt="Reload" style={{ width: '20px', height: '22px', cursor: 'pointer', opacity: '0.7' }} />
           <img src={Option} alt="Options" style={{ width: '20px', height: '22px', cursor: 'pointer', opacity: '0.7' }} />
         </div>

         {/* Chat Messages */}
         <div style={{
           marginBottom: '20px'
         }}>
           {messages.map((message) => (
             <div
               key={message.id}
               style={{
                 marginBottom: '16px',
                 textAlign: message.isUser ? 'right' : 'left'
               }}
             >
               <div style={{
                 display: 'inline-block',
                 maxWidth: '80%',
                 padding: '12px 16px',
                 borderRadius: '18px',
                 backgroundColor: message.isUser ? '#000' : '#f3f4f6',
                 color: message.isUser ? '#fff' : '#374151',
                 fontSize: '14px',
                 lineHeight: '1.4',
                 fontFamily: 'Red Hat Display'
               }}>
                 {message.text}
               </div>
             </div>
           ))}
         </div>
       </div>

      {/* Input Component at Bottom */}
      <div style={{
        padding: '0 24px 24px 24px'
      }}>
        <InputComponent
          inputValue={inputValue}
          setInputValue={setInputValue}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          variant="chat"
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default ChatPanel;


