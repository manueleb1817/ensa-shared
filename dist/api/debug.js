// shared/src/api/debug.ts
// ═══════════════════════════════════════════════════════════
// ✅ API DEBUG HELPERS
// ═══════════════════════════════════════════════════════════
import { apiClient } from './apiClient';
/**
 * ✅ Debug API call con logging detallado
 */
export const debugApiCall = async (method, url, data, headers) => {
    console.log('═══════════════════════════════════════════════════');
    console.log('🔍 DEBUG API CALL');
    console.log('═══════════════════════════════════════════════════');
    console.log(`Method: ${method}`);
    console.log(`URL: ${url}`);
    console.log(`Data:`, data);
    console.log(`Headers:`, headers);
    const start = Date.now();
    try {
        const response = await apiClient.request({
            method,
            url,
            data,
            headers
        });
        const elapsed = Date.now() - start;
        console.log('✅ SUCCESS');
        console.log(`Response time: ${elapsed}ms`);
        console.log(`Status: ${response.status}`);
        console.log(`Data:`, response.data);
        console.log('═══════════════════════════════════════════════════');
        return response.data;
    }
    catch (error) {
        const elapsed = Date.now() - start;
        console.log('❌ ERROR');
        console.log(`Response time: ${elapsed}ms`);
        console.log(`Error:`, error.response?.data || error.message);
        console.log('═══════════════════════════════════════════════════');
        throw error;
    }
};
/**
 * ✅ Test connection to backend
 */
export const testBackendConnection = async () => {
    console.log('🔍 Testing backend connection...');
    try {
        await apiClient.get('/api/health');
        console.log('✅ Backend is reachable');
        return true;
    }
    catch (error) {
        console.error('❌ Backend is NOT reachable:', error);
        return false;
    }
};
//# sourceMappingURL=debug.js.map