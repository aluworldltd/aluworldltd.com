// Netlify runs this automatically after every form submission on the site
// (quick-quote and quote-request). It passes the submission to the CRM so
// the lead shows up there with its photos.
//
// Needs two environment variables on this Netlify site:
//   CRM_INBOUND_URL  e.g. https://crm.aluworldltd.com/api/inbound/netlify
//   CRM_INBOUND_KEY  the key shown in the CRM under Settings → Connections
// The form itself never depends on this: if the CRM is down, the submission
// is still saved in Netlify and emailed as before.

export const handler = async (event) => {
  const url = process.env.CRM_INBOUND_URL;
  const key = process.env.CRM_INBOUND_KEY;
  if (!url || !key) {
    console.log('CRM hook: not configured, skipping');
    return { statusCode: 200, body: 'skipped' };
  }
  try {
    const { payload } = JSON.parse(event.body || '{}');
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-crm-key': key },
      body: JSON.stringify({ payload }),
    });
    console.log('CRM hook:', res.status, (await res.text()).slice(0, 200));
  } catch (err) {
    console.error('CRM hook failed:', err);
  }
  return { statusCode: 200, body: 'ok' };
};
