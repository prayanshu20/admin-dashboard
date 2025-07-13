// lib/auth.js
export function isAuthenticated(req) {
  return req.headers.cookie?.includes("auth=true");
}
