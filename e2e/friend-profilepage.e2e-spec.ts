import {browser, element, by} from "protractor";
import * as myGlobals from "../src/app/globals";

describe('friends-profilepage', () => {
  let username = "runtrackminds2017";

  beforeAll(() => {
    browser.get(myGlobals.FRONTEND_BASEURL);
    let inputMail = element(by.id('username'));
    let inputPass = element(by.id('password'));
    let btnLogin = element(by.id('login'));

    inputMail.sendKeys("runtrackminds2017@gmail.com");
    inputPass.sendKeys("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
    });

    browser.sleep(2000);
    browser.get(myGlobals.FRONTEND_BASEURL + "/friends/" + username);
    browser.driver.sleep(6000);

  });
  
  //Parts
  let personalInfo = element(by.id('personal-info'));
  let coreInfo= element(by.tagName('core-info'));

  it('Should have a correct url', () => {
    expect(browser.getCurrentUrl()).toBe(myGlobals.FRONTEND_BASEURL + '/friends/' + username);
  });

  it('Should have 2 parts on page (core info & personal info)', () => {
    expect(personalInfo.isPresent()).toBeTruthy();
    expect(coreInfo.isPresent()).toBeTruthy();
  });

  it('Personal info should contains right text', () => {
    expect(personalInfo.getText()).toContain("First name");
    expect(personalInfo.getText()).toContain("Last name");
    expect(personalInfo.getText()).toContain("City");
    expect(personalInfo.getText()).toContain("Birthday");
    expect(personalInfo.getText()).toContain("Gender");

    let h1 = element(by.tagName('h1'));
    expect(h1.getText()).toEqual(username);
  });

});

