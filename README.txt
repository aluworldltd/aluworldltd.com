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
  services/    One page per service (glass repair, windows & doors, railings,
               storefronts, aluminum cladding, glass partitions). They share
               assets/service-v1.css and assets/service-v1.js, reuse gallery photos,
               and carry a copy of the quick-quote form (same name and fields, with
               the page named in the email subject). Add new pages to sitemap.xml.
  brand/       Logo kit (all colour versions, Google profile icon, generator script)

Forms (Netlify Forms; notification emails go to aluworldltd@gmail.com)
  quick-quote     Hero form            Email subject: New AluWorld Quick Quote
  quote-request   Contact form         Email subject: New AluWorld Quote Request
  Site visits are requested with the "site_visit" checkbox and "preferred_visit_day"
  field in quote-request (the separate visit-request form was removed).
  Keep the form names and field names unchanged, or Netlify stops receiving them.

Google reviews: copied verbatim from the Google Business Profile. Do not edit the text.
