const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'master';
const GITHUB_DATA_PATH = process.env.GITHUB_DATA_PATH || 'respaldo_ld_2026-05-13.json';

if (!GITHUB_TOKEN || !GITHUB_REPOSITORY) {
  console.warn('GitHub functions require GITHUB_TOKEN and GITHUB_REPOSITORY environment variables.');
}

const githubApi = async (path, options = {}) => {
  if (!GITHUB_TOKEN || !GITHUB_REPOSITORY) {
    throw new Error('GitHub repo or token is not configured. Set GITHUB_TOKEN and GITHUB_REPOSITORY in Netlify environment variables.');
  }

  const url = `https://api.github.com/repos/${GITHUB_REPOSITORY}${path}`;
  const headers = {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'Netlify-GitHub-Integration'
  };
  const response = await fetch(url, { headers, ...options });
  return response;
};

const getFileContent = async (filePath = GITHUB_DATA_PATH) => {
  const encodedPath = filePath.split('/').map(encodeURIComponent).join('/');
  const response = await githubApi(`/contents/${encodedPath}?ref=${encodeURIComponent(GITHUB_BRANCH)}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub GET failed: ${response.status} ${response.statusText} - ${text}`);
  }
  const data = await response.json();
  const content = Buffer.from(data.content, 'base64').toString('utf8');
  return { sha: data.sha, content, path: filePath };
};

const createOrUpdateFile = async ({ filePath = GITHUB_DATA_PATH, contentBase64, message, sha, branch = GITHUB_BRANCH }) => {
  const body = {
    message,
    content: contentBase64,
    branch,
    committer: {
      name: process.env.GITHUB_COMMITTER_NAME || 'Netlify Bot',
      email: process.env.GITHUB_COMMITTER_EMAIL || 'netlify-bot@example.com'
    }
  };
  if (sha) body.sha = sha;

  const encodedPath = filePath.split('/').map(encodeURIComponent).join('/');
  const response = await githubApi(`/contents/${encodedPath}`, {
    method: 'PUT',
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub PUT failed: ${response.status} ${response.statusText} - ${text}`);
  }

  return await response.json();
};

module.exports = {
  getFileContent,
  createOrUpdateFile,
  GITHUB_DATA_PATH,
  GITHUB_BRANCH,
  GITHUB_REPOSITORY
};
