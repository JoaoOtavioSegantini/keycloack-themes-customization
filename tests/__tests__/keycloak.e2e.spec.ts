import { Builder, By, WebDriver, until } from "selenium-webdriver";
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
    console.log(loginUrl);

    await driver.get(loginUrl);
    await driver.sleep(5000);

    const span = await driver.wait(
      until.elementLocated({
        className: "MuiTypography-root MuiTypography-h5 MuiCardHeader-title",
      })
    );

    const title = await span.getText();

    const text = await driver.wait(
      until.elementLocated({
        xpath: "//span[text()='Log In']",
      })
    );

    const header = await driver.findElement(By.xpath("//header"));

    const mainTitle = await header
      .findElement(By.xpath("//img"))
      .getAttribute("alt");

    const form = await driver.findElement(By.xpath("//form"));

    const usernameLabel = await form
      .findElement(By.id("username-label"))
      .getText();

    const passwordLabel = await form
      .findElement(By.id("password-label"))
      .getText();

    const usernameInput = await form.findElement(By.id("username"));

    const passwordInput = await form.findElement(By.id("password"));

    const keepMeConnected = await form
      .findElement(
        By.className(
          "MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label"
        )
      )
      .getText();

    const forgetPassword = await form
      .findElement(
        By.className(
          "MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways"
        )
      )
      .getText();

    const register = await driver.wait(
      until.elementsLocated({
        xpath: "//a[text()='Register']",
      })
    );

    const loginBtn = await driver
      .findElement(
        By.className(
          "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium"
        )
      )
      .getText();

    const select = await driver.findElement(By.xpath("//select")).getText();

    expect(title).toBe("Log In");
    expect(text).not.toBeNull();
    expect(header).not.toBeNull();
    expect(mainTitle).toBe("CodeFlix");
    expect(usernameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(usernameLabel).toBe("Username or email");
    expect(passwordLabel).toBe("Password");
    expect(keepMeConnected).toBe("Remember me");
    expect(forgetPassword).toBe("Forgot Password?");
    expect(register).toBeDefined();
    expect(loginBtn).toBe("LOGIN");
    expect(select).toBe(`Deutsch\nPortuguês (Brasil)\nel\nEnglish\nItaliano\nCatalà`);
  });
});
