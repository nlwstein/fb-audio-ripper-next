

const chromium = require('chrome-aws-lambda')
const { addExtra } = require('puppeteer-extra')
const puppeteer = addExtra(chromium.puppeteer)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

export default function handler(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ validation: false, message: "Missing username or password.", body: req.body, data: req.data });
  }
  (async () => {
    try {
      puppeteer.use(StealthPlugin())
      puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
      const browser = await puppeteer.launch(); 
      const page = await browser.newPage();
      await page.goto("https://www.facebook.com/");
      await page.waitForSelector("#email");
      await page.type("#email", req.body.email);
      await page.type("#pass", req.body.password);
      await page.click('button[name="login"]');
      await page.waitForSelector("#approvals_code");
      await page.type("#approvals_code", req.body.twofactor);
      await page.click("#checkpointSubmitButton");
      await page.waitForSelector("div[role=feed]");
      let cookies = await page.cookies();
      cookies = cookies.map(({ name: key, ...rest }) => ({ key, ...rest }));
      await browser.close();
      return res.status(200).json({ appstate: cookies });
    } catch (e) {
      return res.status(500).json({ error: e });
    }

  })();
}
