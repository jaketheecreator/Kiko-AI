import React, { useState, useEffect } from 'react';
import InputComponent from './InputComponent';
import Copy from '../assets/icons/Copy.png';
import Thumbsup from '../assets/icons/Thumbsup.png';
import Thumbsdown from '../assets/icons/Thumbsdown.png';
import Share from '../assets/icons/Share.png';
import Reload from '../assets/icons/Reload.png';
import Option from '../assets/icons/Option.png';
import { ChatData, ChatMessage, saveChatData, generateAssistantReply } from '../utils/chatStorage';

type Props = {
  onBack?: () => void;
  chatData: ChatData | null;
};

const ChatPanel: React.FC<Props> = ({ onBack, chatData }) => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // Load messages from chatData when it changes
  useEffect(() => {
    if (chatData?.messages) {
      // Filter out the first message (which is the original idea already shown in header)
      const messagesToShow = chatData.messages.slice(1);
      setMessages(messagesToShow);
    }
  }, [chatData]);

  const handleSendMessage = async () => {
    if (inputValue.trim() && chatData) {
      // Create user message
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        text: inputValue.trim(),
        sender: 'user',
        timestamp: Date.now()
      };

      // Clear input immediately
      const messageText = inputValue.trim();
      setInputValue('');

      // Add user message first
      const updatedMessagesWithUser = [...messages, userMessage];
      setMessages(updatedMessagesWithUser);

      // Update chatData with user message
      const chatDataWithUser: ChatData = {
        ...chatData,
        messages: [...chatData.messages, userMessage]
      };
      saveChatData(chatDataWithUser);

      // Show thinking state
      setIsThinking(true);

      // Generate assistant reply using real API
      const assistantMessage = await generateAssistantReply(messageText, chatData.messages);

      // Hide thinking state
      setIsThinking(false);

      // Add assistant message
      const finalMessages = [...updatedMessagesWithUser, assistantMessage];
      setMessages(finalMessages);

      // Update chatData with assistant message
      const finalChatData: ChatData = {
        ...chatDataWithUser,
        messages: [...chatDataWithUser.messages, assistantMessage]
      };
      saveChatData(finalChatData);
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
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <style>
        {`
          @keyframes thinking {
            0%, 60%, 100% {
              transform: translateY(0);
              opacity: 0.4;
            }
            30% {
              transform: translateY(-10px);
              opacity: 1;
            }
          }
        `}
      </style>
      {/* Header with Title Pill */}
      <div style={{
        padding: '24px 24px 16px 24px',
        textAlign: 'right'
      }}>
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '16px',
          padding: '12px 20px',
          display: 'inline-block',
          maxWidth: '100%',
          wordWrap: 'break-word',
          whiteSpace: 'normal'
        }}>
                     <span style={{
             fontSize: '14px',
             fontWeight: '600',
             color: '#374151',
             fontFamily: 'Red Hat Display'
           }}>
             {chatData?.idea || 'Loading...'}
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
             {chatData?.idea ? 
               `I'm excited about your ${chatData.idea.toLowerCase()} idea! This moodboard is going to be amazing.` :
               'Think warm lighting, mismatched furniture, vintage posters, and the smell of espresso in the air. Inspired by Friends-era aesthetics with a nostalgic, soft vibe.'
             }
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
             {chatData?.idea ? 
               `The ${chatData.idea.toLowerCase()} aesthetic will create such a special atmosphere.` :
               'A space that feels like a second home — where jazz plays softly in the background, and every corner invites you to slow down, read, or write in your journal.'
             }
           </p>
        </div>

                 {/* Interactive Icons */}
         <div style={{
           display: 'flex',
           gap: '16px',
           justifyContent: 'flex-start',
           marginBottom: '24px'
         }}>
                       <img 
              src={Copy} 
              alt="Copy" 
              style={{ 
                width: '20px', 
                height: '22px', 
                cursor: 'pointer', 
                opacity: '0.7',
                transition: 'opacity 0.2s ease'
              }} 
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            />
            <img 
              src={Thumbsup} 
              alt="Thumbs Up" 
              style={{ 
                width: '20px', 
                height: '22px', 
                cursor: 'pointer', 
                opacity: '0.7',
                transition: 'opacity 0.2s ease'
              }} 
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            />
            <img 
              src={Thumbsdown} 
              alt="Thumbs Down" 
              style={{ 
                width: '20px', 
                height: '22px', 
                cursor: 'pointer', 
                opacity: '0.7',
                transition: 'opacity 0.2s ease'
              }} 
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            />
            <img 
              src={Share} 
              alt="Share" 
              style={{ 
                width: '20px', 
                height: '22px', 
                cursor: 'pointer', 
                opacity: '0.7',
                transition: 'opacity 0.2s ease'
              }} 
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            />
            <img 
              src={Reload} 
              alt="Reload" 
              style={{ 
                width: '20px', 
                height: '22px', 
                cursor: 'pointer', 
                opacity: '0.7',
                transition: 'opacity 0.2s ease'
              }} 
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            />
            <img 
              src={Option} 
              alt="Options" 
              style={{ 
                width: '20px', 
                height: '22px', 
                cursor: 'pointer', 
                opacity: '0.7',
                transition: 'opacity 0.2s ease'
              }} 
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            />
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
                 display: 'flex',
                 justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                 width: '100%'
               }}
             >
               <div style={{
                 maxWidth: '80%',
                 padding: message.sender === 'user' ? '12px 16px' : '0',
                 borderRadius: message.sender === 'user' ? '18px' : '0',
                 backgroundColor: message.sender === 'user' ? '#f8f9fa' : 'transparent',
                 color: message.sender === 'user' ? '#000' : '#374151',
                 fontSize: '14px',
                 lineHeight: '1.4',
                 fontFamily: 'Red Hat Display'
               }}>
                 {message.text}
               </div>
             </div>
           ))}
           
           {/* Thinking Animation */}
           {isThinking && (
             <div style={{
               display: 'flex',
               justifyContent: 'flex-start',
               width: '100%',
               marginBottom: '16px'
             }}>
               <div style={{
                 display: 'flex',
                 alignItems: 'center',
                 gap: '8px',
                 padding: '12px 16px',
                 backgroundColor: '#f8f9fa',
                 borderRadius: '18px',
                 maxWidth: '80%'
               }}>
                 <div style={{
                   display: 'flex',
                   gap: '4px'
                 }}>
                   <div style={{
                     width: '8px',
                     height: '8px',
                     borderRadius: '50%',
                     backgroundColor: '#9CA3AF',
                     animation: 'thinking 1.4s infinite ease-in-out'
                   }} />
                   <div style={{
                     width: '8px',
                     height: '8px',
                     borderRadius: '50%',
                     backgroundColor: '#9CA3AF',
                     animation: 'thinking 1.4s infinite ease-in-out 0.2s'
                   }} />
                   <div style={{
                     width: '8px',
                     height: '8px',
                     borderRadius: '50%',
                     backgroundColor: '#9CA3AF',
                     animation: 'thinking 1.4s infinite ease-in-out 0.4s'
                   }} />
                 </div>
                 <span style={{
                   fontSize: '14px',
                   color: '#6B7280',
                   fontFamily: 'Red Hat Display'
                 }}>
                   Thinking...
                 </span>
               </div>
             </div>
           )}
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


