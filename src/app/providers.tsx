"use client";

import { Toaster } from "@/website/features/toast/toaster";
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <details style={{ whiteSpace: 'pre-wrap' }}>
        {error.toString()}
        <br />
        {error.stack}
      </details>
    </div>
  )
}


export async function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NBF7DZQ6"
            height="0"
            width="0"
            className="hidden invisible"
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
        {children}
        <Toaster />
      </ErrorBoundary>
    </>
  );
}
