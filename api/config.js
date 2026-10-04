module.exports = (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).json({
            error: 'Method not allowed'
        });
        return;
    }

    const requiredSecret = process.env.CONFIG_SHARED_SECRET;
    const providedSecret = req.headers['x-config-key'];

    if (!requiredSecret) {
        res.status(500).json({
            error: 'CONFIG_SHARED_SECRET is not configured'
        });
        return;
    }

    if (providedSecret !== requiredSecret) {
        res.status(401).json({
            error: 'Unauthorized'
        });
        return;
    }

    const photonAppId = process.env.PHOTON_APP_ID;
    const voiceAppId = process.env.PHOTON_VOICE_APP_ID;
    const chatAppId = process.env.PHOTON_CHAT_APP_ID;
    const playfabTitleId = process.env.PLAYFAB_TITLE_ID;
    const region = process.env.PHOTON_REGION;

    const missing = [];

    if (!photonAppId) missing.push('PHOTON_APP_ID');
    if (!voiceAppId) missing.push('PHOTON_VOICE_APP_ID');
    if (!chatAppId) missing.push('PHOTON_CHAT_APP_ID');
    if (!playfabTitleId) missing.push('PLAYFAB_TITLE_ID');
    if (!region) missing.push('PHOTON_REGION');

    if (missing.length > 0) {
        res.status(500).json({
            error: 'Environment variables are missing from the deployed Vercel function.',
            missing: missing,
            vercelEnvironment: process.env.VERCEL_ENV || 'unknown'
        });
        return;
    }

    res.setHeader('Cache-Control', 'no-store');

    res.status(200).json({
        photonAppId: photonAppId,
        voiceAppId: voiceAppId,
        chatAppId: chatAppId,
        playfabTitleId: playfabTitleId,
        region: region
    });
};
