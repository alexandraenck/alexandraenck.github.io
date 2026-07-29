import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: {
        accept: "text/html",
        host: "alexandra.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Alexandra Enck's portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Alexandra Enck/);
  assert.match(html, /Ideas with/);
  assert.match(html, /Illustration/);
  assert.match(html, /Design/);
  assert.match(html, /Knitwear/);
  assert.match(html, /Television/);
  assert.match(html, /KRTHs7gpr6g/);
  assert.match(html, /alexandra-signature-original\.png/);
  assert.match(html, /pixel-trail/);
  assert.match(html, /contact-dialog/);
  assert.match(html, /Email delivery will be connected soon/);
  assert.doesNotMatch(html, /alexandraenck\.myportfolio\.com\/contact/);
  assert.doesNotMatch(html, /og-playful\.png|og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});
