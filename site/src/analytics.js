export function trackPageView() {
  if (typeof window.gtag !== 'function') return

  const pageView = {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`
  }

  if (window.googleTagManager) {
    window.dataLayer.push({ event: 'app_page_view', ...pageView })
  } else {
    window.gtag('event', 'page_view', pageView)
  }
}
