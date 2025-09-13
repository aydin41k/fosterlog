function getXsrfToken() {
  try {
    const match = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]+)/);
    if (match && match[1]) {
      return decodeURIComponent(match[1]);
    }
  } catch {
  }
  const meta = document.querySelector('meta[name="csrf-token"]');
  return (meta == null ? void 0 : meta.content) ?? "";
}
export {
  getXsrfToken as g
};
