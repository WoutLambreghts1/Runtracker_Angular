import {browser, by, element} from "protractor";
import * as myGlobals from "../src/app/globals";

describe('history', () => {
  beforeAll(() => {

    browser.get(myGlobals.FRONTEND_BASEURL);
    let inputMail = element(by.id('username'));
    let inputPass = element(by.id('password'));
    let btnLogin = element(by.id('login'));
    let navHistory = element(by.id('history'));

    inputMail.sendKeys("runtrackminds2017@gmail.com");
    inputPass.sendKeys("Team102017");

    btnLogin.click().then(() => {
      console.log("Logged in");
      browser.driver.sleep(15000);
    });
    navHistory.click().then(() => {
      console.log("nav history clicked");
      browser.driver.sleep(5000);
    });
  });


  it('Should have a correct url', () => {
    browser.driver.sleep(2000);
    expect(browser.getCurrentUrl()).toBe(myGlobals.FRONTEND_BASEURL + '/history');
  });

  it('All data is showed', () => {
    browser.driver.sleep(10000);
    let graph = element(by.tagName('canvas'));
    expect(graph.isPresent()).toBeTruthy();

    let selectOne = element.all(by.tagName('select')).get(0);
    let selectTwo = element.all(by.tagName('select')).get(1);
    let selectThree = element.all(by.tagName('select')).get(2);
    expect(selectOne.isPresent()).toBeTruthy();
    expect(selectTwo.isPresent()).toBeTruthy();
    expect(selectThree.isPresent()).toBeTruthy();

    let trackingCard = element(by.tagName('tracking-list-item'));
    expect(trackingCard.isPresent()).toBeTruthy();

  });


  it('Should navigate to details page', () => {
    let trackingCard = element.all(by.tagName('tracking-list-item')).get(0);

    trackingCard.click().then(() => {
      console.log("Trackingcard clicked");
      browser.driver.sleep(2000);
      expect(browser.getCurrentUrl()).toContain(myGlobals.FRONTEND_BASEURL + '/history/tracking');
    });
  });

  it('Detailspage should contain all elements', () => {
    let map = element(by.id("tracking-map"));
    let graph = element(by.tagName("canvas"));
    let coreInfo = element(by.className("tracking-info-coreData"));
    let sebmGoogleMap = element(by.tagName("sebm-google-map"));

    expect(map.isPresent()).toBeTruthy();
    expect(graph.isPresent()).toBeTruthy();
    expect(coreInfo.isPresent()).toBeTruthy();
    expect(sebmGoogleMap.isPresent()).toBeTruthy();
  });

});


