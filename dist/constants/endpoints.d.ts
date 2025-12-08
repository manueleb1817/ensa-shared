export declare const AUTH_ENDPOINTS: {
    LOGIN: string;
    REGISTER: string;
    LOGOUT: string;
    ME: string;
    REFRESH: string;
};
export declare const RIDE_ENDPOINTS: {
    REQUEST: string;
    GET: (id: string) => string;
    ACCEPT: (id: string) => string;
    START: (id: string) => string;
    COMPLETE: (id: string) => string;
    CANCEL: (id: string) => string;
    RATE: (id: string) => string;
    QUOTE: string;
    ACTIVE: string;
    HISTORY: string;
};
export declare const SCHEDULED_ENDPOINTS: {
    CREATE: string;
    MARKETPLACE: string;
    ACCEPT: (id: string) => string;
    MY_RIDES: string;
    CONFIRM: (id: string) => string;
    CANCEL: (id: string) => string;
    START: (id: string) => string;
};
export declare const DRIVER_ENDPOINTS: {
    STATUS: string;
    AVAILABILITY: string;
    EARNINGS: string;
    HISTORY: string;
    PAYOUT_REQUEST: string;
    AGENDA: string;
    LOCATION: string;
};
export declare const PASSENGER_ENDPOINTS: {
    HISTORY: string;
    SCHEDULED_RIDES: string;
    PAYMENT_METHODS: string;
    PAYMENT_METHOD: (id: string) => string;
    PROFILE: string;
    DEBT_INFO: string;
};
export declare const PAYMENT_ENDPOINTS: {
    CREATE_INTENT: string;
    CONFIRM: string;
    ADD_CARD: string;
    SET_DEFAULT: string;
    TIP: (rideId: string) => string;
    CREATE_CONNECT_ACCOUNT: string;
    CONNECT_ACCOUNT_STATUS: string;
};
export declare const USER_ENDPOINTS: {
    BALANCE: string;
};
export declare const CHAT_ENDPOINTS: {
    MESSAGES: (rideId: string) => string;
    SEND: (rideId: string) => string;
};
//# sourceMappingURL=endpoints.d.ts.map