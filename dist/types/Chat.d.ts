export interface ChatMessage {
    _id: string;
    rideId: string;
    senderId: string;
    senderName: string;
    senderRole: 'pasajero' | 'conductor';
    message: string;
    timestamp: Date | string;
    read: boolean;
    delivered: boolean;
}
export interface SendMessagePayload {
    rideId: string;
    message: string;
}
export interface MarkMessagesReadPayload {
    rideId: string;
    messageIds?: string[];
}
//# sourceMappingURL=Chat.d.ts.map