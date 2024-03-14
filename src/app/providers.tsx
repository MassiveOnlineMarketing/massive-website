'use client'

import { Toaster } from "@/website/features/toast/toaster"


export async function Providers({ children }: { children: React.ReactNode }) {

  return (
    <>
      {/* <!-- Google Tag Manager (noscript) --> */}
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NBF7DZQ6"
        height="0" width="0" className='hidden invisible'></iframe></noscript>
      {/* <!-- End Google Tag Manager (noscript) --> */}
      {children}
      <Toaster />
    </>
  )
}