ALUWORLD LTD website

Hosting: Netlify site "velvety-youtiao-cf9edc" (serves aluworldltd.com), connected to
GitHub. Merging to main deploys automatically; pull requests get a deploy preview.

Structure
  index.html   The whole site (one stylesheet, small scripts at the end of the page)
  assets/      Images, logo, favicon, share image. Served with a 1-year immutable
               cache, so give replaced files a NEW filename (e.g. -v5) instead of
               overwriting them.
  brand/       Logo kit (all colour versions, Google profile icon, generator script)

Forms (Netlify Forms; notification emails go to aluworldltd@gmail.com)
  quick-quote     Hero form            Email subject: New AluWorld Quick Quote
  quote-request   Contact form         Email subject: New AluWorld Quote Request
  visit-request   Visit request flow   Email subject: New AluWorld Visit Request
  Keep the form names and field names unchanged, or Netlify stops receiving them.

Google reviews: copied verbatim from the Google Business Profile. Do not edit the text.
