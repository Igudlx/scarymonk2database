module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({
      error: 'Method not allowed'
    });
    return;
  }

  const photonAppId = process.env.PHOTON_APP_ID;
  const voiceAppId = process.env.PHOTON_VOICE_APP_ID;
  const chatAppId = process.env.PHOTON_CHAT_APP_ID;
  const playfabTitleId = process.env.PLAYFAB_TITLE_ID;
  const region = process.env.PHOTON_REGION;
  const configSharedSecret = process.env.CONFIG_SHARED_SECRET;

  if (!photonAppId) {
    res.status(500).json({
      error: 'PHOTON_APP_ID is not configured'
    });
    return;
  }

  if (!voiceAppId) {
    res.status(500).json({
      error: 'PHOTON_VOICE_APP_ID is not configured'
    });
    return;
  }

  if (!chatAppId) {
    res.status(500).json({
      error: 'PHOTON_CHAT_APP_ID is not configured'
    });
    return;
  }

  if (!playfabTitleId) {
    res.status(500).json({
      error: 'PLAYFAB_TITLE_ID is not configured'
    });
    return;
  }

  if (!region) {
    res.status(500).json({
      error: 'PHOTON_REGION is not configured'
    });
    return;
  }

  if (!configSharedSecret) {
    res.status(500).json({
      error: 'CONFIG_SHARED_SECRET is not configured'
    });
    return;
  }

  res.setHeader('Cache-Control', 'no-store');

  res.status(200).json({
    photonAppId: photonAppId,
    voiceAppId: voiceAppId,
    chatAppId: chatAppId,
    playfabTitleId: playfabTitleId,
    region: region,
    configSharedSecret: configSharedSecret
  });
};
