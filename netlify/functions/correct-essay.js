exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('Function called with method:', event.httpMethod);
    console.log('Environment check - API key exists:', !!process.env.CLAUDE_API_KEY);

    const { originalEssay } = JSON.parse(event.body);
    console.log('Original essay received:', originalEssay?.substring(0, 50) + '...');

    // Make Claude API call from server (no CORS issues)
    console.log('Making API call to Claude...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Please correct the following essay for grammar and spelling errors with minimum changes to sentence structure. Return only the corrected version without any additional commentary:

${originalEssay}`
        }]
      })
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`Claude API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API success, returning corrected essay');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        correctedEssay: data.content[0].text
      })
    };

  } catch (error) {
    console.error('Function error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
        details: error.stack
      })
    };
  }
};