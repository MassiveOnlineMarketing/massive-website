'use client'

import Script from "next/script"

import { useCookies } from "react-cookie"

function LoadCookies() {
    const [cookies] = useCookies(['marketing', 'analytics', 'statistics']);

    // const CLARITY_TAG = 'jicivy07ui';

    return (
        <>
            {/* * Always load */}
            <Script src={`/scroll.js`} strategy="afterInteractive" />

            {/* Google tag analytics script */}
            <Script src={`https://www.googletagmanager.com/gtag/js?id=G-BQ9FGY7RYN`} strategy="afterInteractive" />
            <Script id="gtag" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    
                    gtag('config', 'G-BQ9FGY7RYN', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>

            {/* Microsoft Clarity */}
            <Script id="clarity-tag" strategy="afterInteractive">
                {`
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "jicivy07ui");
                `}
            </Script>

            <Script id='google-tag-manager' strategy="afterInteractive">
                {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-NBF7DZQ6');
                `}
            </Script>




            {/* * Load scripts based on cookies */}
            {/* {cookies.marketing && (
                <Script id="marketing" strategy="afterInteractive">
                    {`  
                        // Marketing script
                    `}
                </Script>
            )} */}

            {/* {cookies.analytics && (
                <Script id="analytics" strategy="afterInteractive">
                    {`
                        // Analytics script
                    `}
                </Script>
            )} */}

            {/* {cookies.statistics && (
                <Script id="statistics" strategy="afterInteractive">
                    {`
                        // Statistics script
                    `}
                </Script>
            )} */}

        </>
    );
}

export default LoadCookies;
