import type { ChatMessage } from '../types/Chat';
/**
 * ✅ Get chat messages for ride
 */
export declare const getChatMessages: (rideId: string, token: string) => Promise<ChatMessage[]>;
/**
 * ✅ Send chat message
 */
export declare const sendChatMessage: (rideId: string, message: string, token: string) => Promise<ChatMessage>;
/**
 * ✅ Mark messages as read
 */
export declare const markMessagesAsRead: (rideId: string, token: string, messageIds?: string[]) => Promise<void>;
//# sourceMappingURL=chat.d.ts.map