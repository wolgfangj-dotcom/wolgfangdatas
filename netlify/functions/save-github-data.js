const { getFileContent, createOrUpdateFile } = require('./github-utils');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const content = payload.content;
    const message = payload.message || 'Actualización de datos de escuelas desde Netlify';
    if (!content) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Content is required' }) };
    }

    const existingFile = await getFileContent();
    const contentBase64 = Buffer.from(content, 'utf8').toString('base64');
    const result = await createOrUpdateFile({
      filePath: existingFile?.path,
      contentBase64,
      message,
      sha: existingFile?.sha
    });

    // result should include content and commit per GitHub API
    const contentSha = result.content && result.content.sha ? result.content.sha : (result.commit && result.commit.tree && result.commit.tree.sha ? result.commit.tree.sha : null);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, commit: result.commit, contentSha })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
