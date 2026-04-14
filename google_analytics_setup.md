# Google Analytics 4 (GA4) Setup Guide

This guide will walk you through setting up Google Analytics for your portfolio to track visitors, traffic, and user behavior.

## Phase 1: Create a Google Analytics Account

1.  Go to [Google Analytics](https://analytics.google.com/).
2.  Click **Admin** (the gear icon at the bottom left).
3.  Click **Create Account**.
4.  Enter an Account Name (e.g., "Jagot Jit Portfolio").
5.  Click **Next**.
6.  Enter a Property Name (e.g., "Portfolio Website").
7.  Select your reporting time zone (Bangladesh) and currency.
8.  Click **Next**, fill in business details, and click **Create**.

## Phase 2: Create a Data Stream

1.  After creating the property, you'll see "Choose a platform". Select **Web**.
2.  Enter your Website URL: `https://jagotjitproductions.com`.
3.  Enter a Stream name: `Portfolio Web Stream`.
4.  Click **Create stream**.
5.  Google will show you your **MEASUREMENT ID**. It looks like `G-XXXXXXXXXX`. **Copy this ID.**

## Phase 3: Integration into your Project

There are two ways to do this in Next.js (App Router). I recommend using the official `@next/third-parties` library for best performance.

### Option A: Using `@next/third-parties` (Recommended)

1.  **Install the package:**
    ```bash
    npm install @next/third-parties@latest
    ```

2.  **Update `app/layout.tsx`:**
    Import and add the `GoogleAnalytics` component inside the `RootLayout`.

    ```tsx
    import { GoogleAnalytics } from '@next/third-parties/google'

    export default function RootLayout({ children }) {
      return (
        <html lang="en">
          <body>
            {children}
            <GoogleAnalytics gaId="G-XXXXXXXXXX" /> {/* Replace with your ID */}
          </body>
        </html>
      )
    }
    ```

### Option B: Manual Integration (Custom Script)

If you don't want to install an extra package, add this to your `app/layout.tsx` inside the `<head>` or `<body>`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

## Phase 4: Verify the Setup

1.  Deploy your changes to your live site.
2.  Visit your website in a new tab.
3.  Go back to Google Analytics -> **Reports** -> **Real-time**.
4.  You should see at least one visitor (you!) on the site within a minute.

---

> [!TIP]
> **Bonus SEO Tip:** To rank for keywords like "Best music producer in BD", make sure you have a **Google Business Profile**. It's free and helps you show up on Google Maps and Local Search results!
