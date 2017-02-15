import {by, element, browser} from "protractor";
import * as myGlobals from "../src/app/globals";
describe('Login page - login form', () => {
  beforeEach(() => {
    browser.get(myGlobals.FRONTEND_BASEURL);
  });

  let btnAuthGoogle = element(by.id('googleLogin'));
  it('has google login button', () => {
    expect(btnAuthGoogle.isPresent()).toBeTruthy();
  });

  it('test google login authentication', () => {
    btnAuthGoogle.click().then(() => {
      browser.driver.sleep(2000); // wait for page redirect
      expect(browser.navigate()).toBeTruthy();
    });
  });

  let btnAuthFacebook = element(by.id('facebookLogin'));
  it('has facebook login button', () => {
    expect(btnAuthFacebook.isPresent()).toBeTruthy();
  });

  it('test facebook login authentication', () => {
    btnAuthFacebook.click().then(() => {
      browser.driver.sleep(2000); // wait for page redirect
      expect(browser.navigate()).toBeTruthy();
    });
  });

  let inputMail = element(by.id('username'));
  let inputPass = element(by.id('password'));
  it('has mail/pass login field', () => {
    expect(inputMail.isPresent()).toBeTruthy();
    expect(inputPass.isPresent()).toBeTruthy();
  });

  let btnLogin = element(by.id('login'));
  it('should have login button', () => {
    expect(btnLogin.isPresent()).toBeTruthy();
    expect(btnLogin.getText()).toBe('LOG IN');
  });

  it('test login mail/pass authentication', () => {
    inputMail.sendKeys("runtrackminds2017@gmail.com");
    inputPass.sendKeys("Team102017");

    expect(inputMail.getAttribute('value')).toEqual("runtrackminds2017@gmail.com");
    expect(inputPass.getAttribute('value')).toEqual("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
      expect(browser.getCurrentUrl()).toBe(myGlobals.FRONTEND_BASEURL+'/home');
    });
  });

  let errorMessage = element(by.id('errorMessage'));
  it('test login error (wrong username and password)', () => {
    inputMail.sendKeys("wronguser@gmail.com");
    inputPass.sendKeys("wrongpassword");

    expect(inputMail.getAttribute('value')).toEqual("wronguser@gmail.com");
    expect(inputPass.getAttribute('value')).toEqual("wrongpassword");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
      expect(errorMessage.isPresent()).toBeTruthy();
      expect(errorMessage.getText()).toEqual("An error has occurred while logging in.")
    });
  });

  it('test login error (no password)', () => {
    inputMail.sendKeys("runtrackminds2017@gmail.com");

    expect(inputMail.getAttribute('value')).toEqual("runtrackminds2017@gmail.com");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
      expect(errorMessage.isPresent()).toBeTruthy();
      expect(errorMessage.getText()).toEqual("Password need to be filled in.")
    });
  });

  it('test login error (no username)', () => {
    inputPass.sendKeys("Team102017");

    expect(inputPass.getAttribute('value')).toEqual("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
      expect(errorMessage.isPresent()).toBeTruthy();
      expect(errorMessage.getText()).toEqual("Username need to be filled in.")
    });
  });

  it('test login error (nothing filled in)', () => {
    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
      expect(errorMessage.isPresent()).toBeTruthy();
      expect(errorMessage.getText()).toEqual("Username and password need to be filled in.")
    });
  })


  it('test signup error', () => {
    let btnSignup = element(by.id('signup'));
    inputMail.sendKeys("runtrackminds2017@gmail.com");
    inputPass.sendKeys("Team102017");

    expect(inputMail.getAttribute('value')).toEqual("runtrackminds2017@gmail.com");
    expect(inputPass.getAttribute('value')).toEqual("Team102017");

    expect(btnSignup.isPresent()).toBeTruthy();

    btnSignup.click().then(() => {
      browser.driver.sleep(2000);
      expect(errorMessage.isPresent()).toBeTruthy();
      expect(errorMessage.getText()).toEqual("The user already exists.")
    });
  })
});
