function getLocalBaseUrl(): string {
  const port = process.env.PORT || 3001;
  return `http://localhost:${port}`;
}

export function getAppBaseUrl(): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl) {
    return appUrl;
  }
  return getLocalBaseUrl();
}

export function getAbsoluteLinktreeUrl(uid: string): string {
  if (typeof window === "undefined") {
    return getAppBaseUrl();
  }
  const baseUrl = window.location.origin;
  if (uid === "designmix") {
    return baseUrl;
  }
  return `${baseUrl}/${uid}`;
}
