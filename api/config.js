module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const sharedSecret = process.env.CONFIG_SHARED_SECRET;
  const region = process.env.PHOTON_REGION;

  if (!sharedSecret) {
    res.status(500).json({
      error: 'CONFIG_SHARED_SECRET is not configured'
    });
    return;
  }

  if (!region) {
    res.status(500).json({
      error: 'PHOTON_REGION is not configured'
    });
    return;
  }

  res.setHeader('Cache-Control', 'no-store');

  res.status(200).json({
    photonAppId: process.env.PHOTON_APP_ID || '',
    voiceAppId: process.env.PHOTON_VOICE_APP_ID || '',
    chatAppId: process.env.PHOTON_CHAT_APP_ID || '',
    playfabTitleId: process.env.PLAYFAB_TITLE_ID || '',
    region: region,
    configSharedSecret: sharedSecret
  });
};
