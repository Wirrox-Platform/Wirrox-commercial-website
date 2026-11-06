import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const labels = {
  '/': 'B2B Technology and Provider Access',
  '/capabilities': 'Provider Supported Platform Capabilities',
  '/for-businesses': 'Business Service Eligibility',
  '/about': 'Swiss Fintech Forum AG',
  '/security': 'Platform Security and Safe Use',
};

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!pathname.startsWith('/legal')) document.title = `${labels[pathname] || 'Page not found'} | WIRROX`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = pathname.startsWith('/legal')
      ? 'WIRROX website information, company details, privacy and browser storage.'
      : 'WIRROX, operated by Swiss Fintech Forum AG, coordinates B2B onboarding and access to provider-supported financial services. Availability is subject to approval.';
  }, [pathname]);
  return null;
}
