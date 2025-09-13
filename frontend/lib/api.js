const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function api(path, token, method = 'GET', body) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = 'Bearer ' + token;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null; // no content
  const text = await res.text().catch(() => '');
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    // try to normalize error shape
    const err = data || { message: res.statusText || 'API error' };
    throw err;
  }
  return data;
}

export { api, API_URL };
