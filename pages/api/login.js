const readline = require("readline");
import puppeteer from 'puppeteer-extra'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

export default function handler(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ validation: false, message: "Missing username or password. Piss", body: req.body, data: req.data });
  }
  (async () => {
    try {
      puppeteer.use(StealthPlugin())
      puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
      const browser = await puppeteer.launch({ headless: true });
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
