export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, model = 'openrouter/free' } = req.body;
    
    // The key is safely stored in Vercel Environment Variables, totally hidden from frontend!
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY;

    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({ 
        error: 'API key not configured on server.',
        message: 'Please add OPENROUTER_API_KEY to your Vercel Environment Variables.' 
      });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://yehiaamin-site.vercel.app',
        'X-Title': 'Yehia Amin Portfolio AI',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Server proxy error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
