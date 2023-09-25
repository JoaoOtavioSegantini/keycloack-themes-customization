import { Builder, WebDriver, until } from "selenium-webdriver";
import Keycloak from "keycloak-connect";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import { capabilities } from "../setup";

describe("validate themes", () => {
  let driver: WebDriver;
  beforeEach(async () => {
    driver = await new Builder()
      .forBrowser("chrome")
      .withCapabilities(capabilities)
      .usingServer("http://selenium:4444/wd/hub")
      .build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  test("validate codeflix theme", async () => {
    const memoryStore = new session.MemoryStore();

    const keycloak = new Keycloak(
      { store: memoryStore },
      {
        realm: "Test",
        resource: "codeflix-client",
        "auth-server-url": "http://app.test:8080/auth/",
        "ssl-required": "external",
        "confidential-port": 0,
      }
    );

    const loginUrl = keycloak.loginUrl(uuidv4(), "http://localhost:8000");

    await driver.get(loginUrl);
    await driver.sleep(5000);

    const span = await driver.wait(
      until.elementLocated({
        className: "MuiTypography-root MuiTypography-h5 MuiCardHeader-title",
      })
    );

    const title = await span.getText();

    expect(title).toBe("Log In");

    const text = await driver.wait(
      until.elementLocated({
        xpath: "//span[text()='Log In']",
      })
    );
    expect(text).not.toBeNull();
  });
});
