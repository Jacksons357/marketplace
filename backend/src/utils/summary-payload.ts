export function summarizePayload(payload: any) {
  if (!payload) return null;
  const copy = { ...payload };
  if (copy.body && typeof copy.body === 'object') {
    delete copy.body.password;
    if (JSON.stringify(copy.body).length > 1000) copy.body = '[TRUNCATED]';
  }
  return copy;
}