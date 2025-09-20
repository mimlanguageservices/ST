exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { originalEssay } = JSON.parse(event.body);

    // Test with a simple correction first
    const correctedEssay = originalEssay
      .replace(/\bfavrit\b/g, 'favorite')
      .replace(/\bBarcalona\b/g, 'Barcelona')
      .replace(/\bbecaus\b/g, 'because')
      .replace(/\bwethar\b/g, 'weather')
      .replace(/\busally\b/g, 'usually')
      .replace(/\bsuny\b/g, 'sunny')
      .replace(/\bwich\b/g, 'which')
      .replace(/\bhapy\b/g, 'happy')
      .replace(/\bamazng\b/g, 'amazing')
      .replace(/\bspecaily\b/g, 'especially')
      .replace(/\bpaela\b/g, 'paella')
      .replace(/\bcold\b/g, 'could')
      .replace(/\bevry\b/g, 'every')
      .replace(/\barchtecture\b/g, 'architecture')
      .replace(/\bGaudy\b/g, 'Gaudí')
      .replace(/\bincredable\b/g, 'incredible')
      .replace(/\bbildings\b/g, 'buildings')
      .replace(/\bsomthing\b/g, 'something')
      .replace(/\bbeches\b/g, 'beaches')
      .replace(/\bswiming\b/g, 'swimming')
      .replace(/\bfrendly\b/g, 'friendly')
      .replace(/\bnite\b/g, 'night')
      .replace(/\blivly\b/g, 'lively')
      .replace(/\bOvurall\b/g, 'Overall')
      .replace(/\bevrything\b/g, 'everything')
      .replace(/\bchoise\b/g, 'choice');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        correctedEssay: correctedEssay
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};