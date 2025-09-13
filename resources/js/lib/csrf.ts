// Utility to fetch the current CSRF/XSRF token in a robust way
// Prefer the XSRF cookie (kept in sync by Laravel) and fall back to meta tag.

export function getXsrfToken(): string {
  try {
    const match = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]+)/);
    if (match && match[1]) {
      // Cookie value is URI-encoded
      return decodeURIComponent(match[1]);
    }
  } catch {
    // ignore
  }

  const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
  return meta?.content ?? '';
}

