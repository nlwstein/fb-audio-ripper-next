const puppeteer = require("puppeteer");
const readline = require("readline");

export default function handler(req, res) {
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation({
      waitUntil: "networkidle0"
    });
    await page.goto("https://www.facebook.com/");
    await page.waitForSelector("#email");
    await page.type("#email", req.data.email);
    await page.type("#pass", req.data.password);
    await page.click('button[name="login"]');
    await page.waitForSelector("#approvals_code");
    await page.type("#approvals_code", req.data.twofactor);
    await page.click("#checkpointSubmitButton");
    await page.waitForSelector("div[role=feed]");
    let cookies = await page.cookies();
    cookies = cookies.map(({ name: key, ...rest }) => ({ key, ...rest }));
    await browser.close();
    return res.status(200).json({ appstate: cookies });
  })();
}
