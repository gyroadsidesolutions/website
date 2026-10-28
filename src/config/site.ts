const site = {
  // Canonical/site URL. Override at build time with PUBLIC_SITE_URL (e.g. a
  // Netlify preview URL); defaults to the production domain.
  url:
    (import.meta.env.PUBLIC_SITE_URL as string | undefined) ?? "https://gyroadsidesolutions.com",
  defaultLang: "en" as const,
  supportedLangs: ["en", "es"] as const,
  twitterHandle: "",
  ogImage: "/images/og-default.webp",
  // Matches the primary brand navy (tailwind `primary` / `#0D1B2E`) so the
  // browser UI, theme-color meta and manifest stay consistent.
  themeColor: "#0D1B2E",

  // Analytics & Search Console are intentionally DISABLED: every field is empty
  // until the client provides real IDs. With empty values, Analytics.astro and
  // the google-site-verification meta render nothing (no third-party requests).
  // To enable later, set PUBLIC_GA_ID / PUBLIC_GTM_ID / PUBLIC_GSC_VERIFICATION
  // in the environment (see .env.example) — no code change required.
  analytics: {
    gaId:            import.meta.env.PUBLIC_GA_ID            ?? "",
    gtmId:           import.meta.env.PUBLIC_GTM_ID           ?? "",
    gscVerification: import.meta.env.PUBLIC_GSC_VERIFICATION ?? "BpqZwQBLMXdCqm8lbkpkMFLLdiT57_b5vyYSashzALY",
  },

  form: {
    netlifyName: "contact-gy-roadside",
  },
};

export default site;
