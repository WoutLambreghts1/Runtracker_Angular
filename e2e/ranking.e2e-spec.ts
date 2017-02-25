import {browser, by, element, protractor} from "protractor";
import * as myGlobals from "../src/app/globals";

describe('ranking', () => {
  beforeEach(() => {
    browser.get(myGlobals.FRONTEND_BASEURL);
    let inputMail = element(by.id('username'));
    let inputPass = element(by.id('password'));
    let btnLogin = element(by.id('login'));
    let navRanking = element(by.id('ranking'));

    inputMail.sendKeys("runtrackminds2017@gmail.com");
    inputPass.sendKeys("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
    });

    navRanking.click().then(() => {
      browser.driver.sleep(4000);
    })
  });

  let btnWorld = element(by.id('button-world'));
  let btnFriend = element(by.id('button-friends'));
  let orderby = element(by.id('order-option'));
  let header = element(by.tagName('h1'));

  it('All data is showed', () => {
    expect(btnWorld.isPresent()).toBeTruthy();
    expect(btnFriend.isPresent()).toBeTruthy();
    expect(orderby.isPresent()).toBeTruthy();
    expect(header.isPresent()).toBeTruthy();
  });

  it('Should change buttons', () => {
      btnFriend.click().then(() => {
        browser.driver.sleep(1000);
        expect(btnFriend.getAttribute('class')).toMatch('btn-primary');
        expect(btnWorld.getAttribute('class')).toMatch('btn-default');
      })
  });

  it('Should change colum name', () => {

    element(by.xpath('//*[@id="order-option"]/option[2]')).click().then(() => {
      browser.driver.sleep(3000);
      expect(element(by.className("option-text")).getText()).toBe('Average speed');
    });
  });

});
