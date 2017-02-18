import {browser, element, by} from "protractor";
import * as myGlobals from "../src/app/globals";

describe('user-homepage', () => {
  beforeEach(() => {
    browser.get(myGlobals.FRONTEND_BASEURL);
    let inputMail = element(by.id('username'));
    let inputPass = element(by.id('password'));
    let btnLogin = element(by.id('login'));

    inputMail.sendKeys("runtrackminds2017@gmail.com");
    inputPass.sendKeys("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
    });
  });

  let navHome = element(by.id('home'));
  let navProfile = element(by.id('profile'));
  let navFriends = element(by.id('friends'));
  let navHistory = element(by.id('history'));
  let navChallenge = element(by.id('challenge'));
  let navLogout = element(by.id('logout'));

  it('Should have a correct url', () => {
    expect(browser.getCurrentUrl()).toBe(myGlobals.FRONTEND_BASEURL + '/home');
  });

  it('Should have all elements in the header', () => {
    let navLogo = element(by.css('.navbar-brand'));

    expect(navLogo.isPresent()).toBeTruthy();
    expect(navLogo.getText()).toBe('JAT');

    expect(navHome.isPresent()).toBeTruthy();
    expect(navProfile.isPresent()).toBeTruthy();
    expect(navFriends.isPresent()).toBeTruthy();
    expect(navHistory.isPresent()).toBeTruthy();
    expect(navChallenge.isPresent()).toBeTruthy();
    expect(navLogout.isPresent()).toBeTruthy();
  });

  it('Home should navigate to /home', () => {
    navHome.click().then(() => {
      browser.driver.sleep(2000);
      expect(browser.getCurrentUrl()).toBe(myGlobals.FRONTEND_BASEURL + '/home');
    });
  });

  it('Profile should navigate to /profile', () => {
    navProfile.click().then(() => {
      browser.driver.sleep(2000);
      expect(browser.getCurrentUrl()).toBe(myGlobals.FRONTEND_BASEURL + '/profile');
    });
  });

  it('Friends should navigate to /friends', () => {
    navFriends.click().then(() => {
      browser.driver.sleep(2000);
      expect(browser.getCurrentUrl()).toBe(myGlobals.FRONTEND_BASEURL + '/friends');
    });
  });

  it('History should navigate to /history', () => {
    navHistory.click().then(() => {
      browser.driver.sleep(2000);
      expect(browser.getCurrentUrl()).toBe(myGlobals.FRONTEND_BASEURL + '/history');
    });
  });

  it('Challenge should navigate to /challenge', () => {
    navChallenge.click().then(() => {
      browser.driver.sleep(2000);
      expect(browser.getCurrentUrl()).toBe(myGlobals.FRONTEND_BASEURL + '/challenge');
    });
  });

  it('Should be logged out if you click logout', () => {
    let storedAccesToken = '';
    browser.executeScript("return window.localStorage.getItem('access_token');")
      .then(val => storedAccesToken = val)
      .catch(() => storedAccesToken = '')
      .thenFinally(() => {
        browser.driver.sleep(2000);
        expect(storedAccesToken.length).toBeGreaterThan(0);

        navLogout.click().then(() => {
            browser.driver.sleep(2000);
            expect(browser.getCurrentUrl()).toBe(myGlobals.FRONTEND_BASEURL + '/');
            browser.executeScript("return window.localStorage.getItem('access_token');") .then(val => storedAccesToken = val)
              .catch(() => storedAccesToken = '')
              .thenFinally(() => {
                expect(storedAccesToken).toEqual(null);
              });
          }
        );
      });
  });
});
