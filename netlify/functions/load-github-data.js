const { getFileContent } = require('./github-utils');

exports.handler = async function(event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const file = await getFileContent();
    if (!file) {
      return { statusCode: 404, body: JSON.stringify({ error: 'GitHub data file not found' }) };
    }

    const data = JSON.parse(file.content);
    return {
      statusCode: 200,
      body: JSON.stringify({ data, sha: file.sha }),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
