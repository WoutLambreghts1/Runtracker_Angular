import {browser, element, by} from "protractor";
import * as myGlobals from "../src/app/globals";

describe('challenge', () => {
  beforeAll(() => {
    browser.get(myGlobals.FRONTEND_BASEURL);
    let inputMail = element(by.id('username'));
    let inputPass = element(by.id('password'));
    let btnLogin = element(by.id('login'));
    let navChallenge = element(by.id('challenge'));

    inputMail.sendKeys("runtrackminds2017@gmail.com");
    inputPass.sendKeys("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
    });
    navChallenge.click().then(() => {
      browser.driver.sleep(2000);
    });

  });

  //CompetitionModal
  let competitionModal = element(by.id('competitionModal'));
  let h1 = element(by.tagName('h1'));
  let h2 = element(by.tagName('h2'));

  it('Should have a correct url', () => {
    browser.driver.sleep(2000);
    expect(browser.getCurrentUrl()).toBe(myGlobals.FRONTEND_BASEURL + '/challenge');
  });

  it('Should have all elements on page & correct values', () => {
    expect(competitionModal.isPresent()).toBeTruthy();
    expect(h1.isPresent()).toBeTruthy();
    expect(h2.isPresent()).toBeTruthy();

    expect(h1.getText()).toBe('Live challenges');
    expect(h2.getText()).toContain('Watch people challenge each other!');

  });

});
