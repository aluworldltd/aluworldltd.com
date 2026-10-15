ALUWORLD LTD website

Hosting: Netlify site "velvety-youtiao-cf9edc" (serves aluworldltd.com), connected to
GitHub. Merging to main deploys automatically; pull requests get a deploy preview.

Structure
  index.html   The whole site (one stylesheet, small scripts at the end of the page)
  assets/      Images, logo, favicon, share image. Served with a 1-year immutable
               cache, so give replaced files a NEW filename (e.g. -v5) instead of
               overwriting them.
  assets/img/  AVIF versions of the photos (400/800 wide for the gallery). When
               making them with macOS sips, give the 800 version an EVEN height
               (sips --resampleHeightWidth H 800): an odd height produces a tiled
               AVIF that Chrome refuses to show, leaving a blank gallery tile.
  services/    One page per service: glass repair, condo & high-rise glass, screen
               repair, windows & doors, patio covers & enclosures, railings,
               storefronts, aluminum cladding, glass partitions, custom mirrors,
               shower glass. They share assets/service-v5.css and
               assets/service-v2.js, reuse gallery photos, and carry a copy of the
               quick-quote form (same name and fields, with the page named in the
               email subject). Add new pages to sitemap.xml.
  brand/       Logo kit (all colour versions, Google profile icon, generator script)

Forms (Netlify Forms; notification emails go to aluworldltd@gmail.com)
  quick-quote     Hero form            Email subject: New AluWorld Quick Quote
  quote-request   Contact form         Email subject: New AluWorld Quote Request
  Site visits are requested with the "site_visit" checkbox and "preferred_visit_day"
  field in quote-request (the separate visit-request form was removed).
  Keep the form names and field names unchanged, or Netlify stops receiving them.

Google reviews: copied verbatim from the Google Business Profile. Do not edit the text.

Stock photos (not ALUWORLD work; only used as illustrations, with a caption saying so)
  assets/stock-torn-screen.jpg (+ assets/img/stock-torn-screen-400/800.avif)
    "A torn window screen with a hole in it" by maks_d on Unsplash
    https://unsplash.com/photos/a-torn-window-screen-with-a-hole-in-it-mJx6Nlb9TM8
    Unsplash License (https://unsplash.com/license): free commercial use, no credit
    required. Downloaded 2026-10-15. Screenshot of the licence line kept in
    licences/unsplash-mJx6Nlb9TM8-torn-screen-2026-10-15.jpg.
    Used on /services/screen-repair/ with the caption "This is what a damaged screen
    looks like before repair. Stock photo." Replace it with an ALUWORLD photo when one
    is available.
