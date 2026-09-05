const TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

// Cloudflare Web Analytics: no cookies, no cross-site tracking, and no DNS
// change or proxying required, which is why it works on GitHub Pages at all.
// Without a token this renders nothing, so local development and tests send
// no traffic and a missing secret degrades to no analytics rather than a
// broken page.
export default function Analytics() {
  if (!TOKEN) return null;

  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: TOKEN })}
    />
  );
}
