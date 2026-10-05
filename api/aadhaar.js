// language: JavaScript, file: api/aadhaar.js, target: Vercel
// ADITYA AADHAAR INFO API HUB — Backend
// Nitin ki API call karta hai, tera branding lagata hai

const fetch = require('node-fetch');

const NITIN_API = 'https://nitin-vio-api-paid-best.boyu3054.workers.dev/aadhaar';
const NITIN_KEY = 'FZ-UJKAHS8A2ABUJA8LBBK9';
const DEFAULT_KEY = 'ADITYA-LIFE-PERMAN-218CZ06C';

const BRANDING = {
    api_name: "ADITYA AADHAAR INFO API HUB",
    developer: "Aditya",
    youtube: "https://youtube.com/@geniushacker29",
    youtube_name: "Genius Hacker",
    telegram: "https://t.me/geniushackerfreetools",
    channel: "@geniushackerfreetools"
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const aadhaar = req.query.aadhaar;
    if (!aadhaar || aadhaar.length !== 12 || !/^\d+$/.test(aadhaar)) {
        return res.status(400).json({
            status: "error",
            api: BRANDING.api_name,
            message: "Valid 12-digit Aadhaar number required",
            example: `${req.headers.host}/api/aadhaar?key=${DEFAULT_KEY}&aadhaar=123412341234`,
            developer: BRANDING.developer,
            youtube: BRANDING.youtube
        });
    }

    try {
        const url = `${NITIN_API}?key=${NITIN_KEY}&aadhaar=${aadhaar}`;
        const response = await fetch(url, {
            method: 'GET',
            timeout: 15000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10)' }
        });

        if (!response.ok) {
            return res.status(response.status).json({
                status: "error",
                api: BRANDING.api_name,
                message: `Backend error: ${response.status}`,
                developer: BRANDING.developer,
                youtube: BRANDING.youtube
            });
        }

        const data = await response.json();
        const cleaned = { ...data };
        delete cleaned.owner;
        delete cleaned.channel;
        delete cleaned.credit;
        delete cleaned.developer;
        delete cleaned.youtube;
        delete cleaned.telegram;

        return res.status(200).json({
            status: "success",
            api: BRANDING.api_name,
            query: { aadhaar: aadhaar },
            data: cleaned,
            developer: BRANDING.developer,
            youtube: BRANDING.youtube,
            youtube_name: BRANDING.youtube_name,
            telegram: BRANDING.telegram,
            channel: BRANDING.channel,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            api: BRANDING.api_name,
            message: "API unreachable",
            error: error.message,
            developer: BRANDING.developer,
            youtube: BRANDING.youtube
        });
    }
}
