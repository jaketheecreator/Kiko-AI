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

// Generate assistant reply message
export const generateAssistantReply = (userMessage: string): ChatMessage => {
  return {
    id: `msg-${Date.now()}-assistant`,
    text: `Cool, I'll add this detail to your moodboard! "${userMessage}" (API call goes here)`,
    sender: 'assistant',
    timestamp: Date.now()
  };
};

// Clear chat data
export const clearChatData = (): void => {
  try {
    localStorage.removeItem(CHAT_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing chat data:', error);
  }
};
