exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Debug info',
      apiKeyExists: !!process.env.CLAUDE_API_KEY,
      apiKeyLength: process.env.CLAUDE_API_KEY ? process.env.CLAUDE_API_KEY.length : 0,
      apiKeyPrefix: process.env.CLAUDE_API_KEY ? process.env.CLAUDE_API_KEY.substring(0, 10) + '...' : 'none',
      environmentVars: Object.keys(process.env).filter(key => key.includes('CLAUDE'))
    })
  };
};