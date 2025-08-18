// Types for chat data
export type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: number;
};

export type ChatData = {
  idea: string;
  messages: ChatMessage[];
};

const CHAT_STORAGE_KEY = 'kiko_chat';

// Load chat data from localStorage
export const loadChatData = (): ChatData | null => {
  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as ChatData;
  } catch (error) {
    console.error('Error loading chat data:', error);
    return null;
  }
};

// Save chat data to localStorage
export const saveChatData = (chatData: ChatData): void => {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatData));
  } catch (error) {
    console.error('Error saving chat data:', error);
  }
};

// Add a new message to existing chat data
export const addMessage = (message: ChatMessage): void => {
  const chatData = loadChatData();
  if (chatData) {
    chatData.messages.push(message);
    saveChatData(chatData);
  }
};

// Generate assistant reply message using direct Gemini API
export const generateAssistantReply = async (userMessage: string, chatHistory: ChatMessage[] = []): Promise<ChatMessage> => {
  try {
    console.log('🔑 API Key:', process.env.REACT_APP_GEMINI_API_KEY ? 'Present' : 'Missing');
    console.log('📝 User Message:', userMessage);
    
    // Call local Express backend instead of direct Gemini API
    const response = await fetch(`http://localhost:5000/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        history: chatHistory
      })
    });

    console.log('📡 Response Status:', response.status);
    console.log('📡 Response OK:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('📊 API Response Data:', data);
    
    const text = data.response || 'I understand your vision! Let me help you create that perfect moodboard.';
    console.log('💬 Generated Text:', text);
    
    return {
      id: `msg-${Date.now()}-assistant`,
      text: text,
      sender: 'assistant',
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('❌ Error calling Gemini API:', error);
    return {
      id: `msg-${Date.now()}-assistant`,
      text: 'I understand your vision! Let me help you create that perfect moodboard aesthetic.',
      sender: 'assistant',
      timestamp: Date.now()
    };
  }
};

// Clear chat data
export const clearChatData = (): void => {
  try {
    localStorage.removeItem(CHAT_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing chat data:', error);
  }
};
