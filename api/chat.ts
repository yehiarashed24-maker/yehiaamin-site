export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: { message: 'OPENROUTER_API_KEY is missing on server.' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const { messages, model = 'openrouter/free' } = body;

    const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': request.headers.get('referer') || 'https://yehia-amin.com',
        'X-Title': 'Yehia Amin Portfolio AI',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
      }),
    });

    const data = await openRouterRes.json();
    return new Response(JSON.stringify(data), {
      status: openRouterRes.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: { message: err.message || 'Server proxy error' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
