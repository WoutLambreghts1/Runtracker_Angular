import {browser, by, element} from "protractor";
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

  it('Has greeting message', () => {
    let greeting = element(by.id('greeting'));
    expect(greeting.isPresent()).toBeTruthy();
    expect(greeting.getText()).toContain('runtrackminds2017');
  });

  it('Contains core information', () => {
    let ranTenKm = element(by.id('ranTenKm'));
    let ranTwentyKm = element(by.id('ranTwentyKm'));
    let ranMarathon = element(by.id('ranMarathon'));
    let avgSpeed = element(by.id('avgSpeed'));
    let maxSpeed = element(by.id('maxSpeed'));
    let avgDistance = element(by.id('avgDistance'));
    let maxDistance = element(by.id('maxDistance'));
    let totalDistance = element(by.id('totalDistance'));
    let nrOfCompetitionsWon = element(by.id('nrOfCompetitionsWon'));

    expect(ranTenKm.isPresent()).toBeTruthy();
    expect(ranTwentyKm.isPresent()).toBeTruthy();
    expect(ranMarathon.isPresent()).toBeTruthy();
    expect(avgSpeed.isPresent()).toBeTruthy();
    expect(maxSpeed.isPresent()).toBeTruthy();
    expect(avgDistance.isPresent()).toBeTruthy();
    expect(maxDistance.isPresent()).toBeTruthy();
    expect(totalDistance.isPresent()).toBeTruthy();
    expect(nrOfCompetitionsWon.isPresent()).toBeTruthy();
  });
});
