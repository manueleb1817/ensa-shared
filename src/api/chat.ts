// shared/src/api/chat.ts

// ═══════════════════════════════════════════════════════════
// ✅ CHAT API
// ═══════════════════════════════════════════════════════════

import { apiClient, extractErrorMessage } from './apiClient';
import { CHAT_ENDPOINTS } from '../constants/endpoints';
import type { ChatMessage, SendMessagePayload } from '../types/Chat';

/**
 * ✅ Get chat messages for ride
 */
export const getChatMessages = async (
  rideId: string,
  token: string
): Promise<ChatMessage[]> => {
  console.log('[Chat API] 💬 Getting messages for ride:', rideId);
  
  try {
    const response = await apiClient.get<ChatMessage[]>(
      CHAT_ENDPOINTS.MESSAGES(rideId),
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Chat API] ✅ Messages retrieved:', response.data.length);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Chat API] ❌ Get messages failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Send chat message
 */
export const sendChatMessage = async (
  rideId: string,
  message: string,
  token: string
): Promise<ChatMessage> => {
  console.log('[Chat API] 📤 Sending message to ride:', rideId);
  console.log('   Message:', message.substring(0, 50) + (message.length > 50 ? '...' : ''));
  
  try {
    const response = await apiClient.post<ChatMessage>(
      CHAT_ENDPOINTS.SEND(rideId),
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Chat API] ✅ Message sent:', response.data._id);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Chat API] ❌ Send message failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Mark messages as read
 */
export const markMessagesAsRead = async (
  rideId: string,
  token: string,
  messageIds?: string[]
): Promise<void> => {
  console.log('[Chat API] ✅ Marking messages as read for ride:', rideId);
  
  try {
    await apiClient.put(
      CHAT_ENDPOINTS.MESSAGES(rideId) + '/mark-read',
      { messageIds },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Chat API] ✅ Messages marked as read');
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Chat API] ❌ Mark as read failed:', message);
    throw new Error(message);
  }
};
