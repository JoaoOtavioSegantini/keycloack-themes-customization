import { Capabilities } from "selenium-webdriver";

export const capabilities = Capabilities.chrome();

capabilities.set("goog:chromeOptions", {
  args: [
    "--disable-gpu",
    "--headless",
    "--window-size=800,600",
    "--enable-javascript",
    "--disable-extensions",
    "--disable-dev-shm-usage",
    "--no-proxy-server",
    "--proxy-server='direct://'",
    "--proxy-bypass-list=*",
    "--no-sandbox",
  ],
});


