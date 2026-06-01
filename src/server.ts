import { OMSSServer } from '@omss/framework';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = new OMSSServer({
  version: "1.0.0",
    name: 'CinePro',
    port: 3000,
    host: '0.0.0.0',
    publicUrl: 'http://127.0.0.1:3000',
    tmdb: {
        apiKey: 'c2df4f2f21df8f6dffc6ac6b74ce345d',
        cacheTTL: 86400
    },
    // إضافة هذه الحقول الفارغة لتفادي أخطاء الطباعة
    cors: { origin: '*' },
    stremio: { enableNativeAddon: false, stremioAddons: [] },
    mcp: { enabled: false }
});

process.env.PUBLIC_URL = 'http://127.0.0.1:3000';

// خدعة لإيقاف الـ console.log مؤقتاً لتفادي الـ padEnd
const originalLog = console.log;
console.log = () => {};

async function start() {
    try {
        await server.getRegistry().discoverProviders(path.join(__dirname, './providers/'));
        await server.start();
        console.log = originalLog; // إعادة الـ log للعمل
        console.log('Server is running on http://0.0.0.0:3000');
    } catch (err) {
        console.log = originalLog;
        console.error('Detailed Error:', err);
    }
}

start();

