'use client'

import { ContentfulLivePreviewProvider as ContentfulProvider } from '@contentful/live-preview/react';
import { usePathname } from 'next/navigation';

export function ContentfulLivePreviewProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ContentfulProvider
      locale="en-US"
      enableInspectorMode={true}
      enableLiveUpdates={true}
    >
      {children}
    </ContentfulProvider>
  );
}