import {browser, by, element} from "protractor";
import * as myGlobals from "../src/app/globals";

describe('edit-profile', () => {
  beforeEach(() => {
    browser.get(myGlobals.FRONTEND_BASEURL);
    let inputMail = element(by.id('username'));
    let inputPass = element(by.id('password'));
    let btnLogin = element(by.id('login'));
    let navProfile = element(by.id('profile'));

    inputMail.sendKeys("runtrackminds2017@gmail.com");
    inputPass.sendKeys("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
    });

    navProfile.click().then(() => {
      browser.driver.sleep(2000);
    })
  });

  let username = element(by.name('username'));
  let firstname = element(by.name('firstname'));
  let lastname = element(by.name('lastname'));
  let city = element(by.name('city'));
  let birthday = element(by.name('birthday'));
  let gender = element(by.name('gender'));
  let submit = element(by.id('saveChanges'));

  it('all data is showed', () => {
    expect(username.isPresent()).toBeTruthy();
    expect(firstname.isPresent()).toBeTruthy();
    expect(lastname.isPresent()).toBeTruthy();
    expect(city.isPresent()).toBeTruthy();
    expect(birthday.isPresent()).toBeTruthy();
    expect(gender.isPresent()).toBeTruthy();

    expect(username.getAttribute('value')).toBe('runtrackminds2017');
    expect(firstname.getAttribute('value')).toBe('runtrack');
    expect(lastname.getAttribute('value')).toBe('minds');
    expect(city.getAttribute('value')).toBe('Antwerp');
    expect(birthday.getAttribute('value')).toBe('2017-01-01');
    expect(gender.getAttribute('value')).toBe('UNDEFINED');
  });

  it('profile is editable', () => {
    username.clear().then(() => username.sendKeys('testusername'));
    firstname.clear().then(() => firstname.sendKeys('testfirstname'));
    lastname.clear().then(() => lastname.sendKeys('testlastname'));
    city.clear().then(() => city.sendKeys('testcity'));
    gender.sendKeys('MALE');


    submit.click().then(() => {
      browser.driver.sleep(1000);
      expect(username.getAttribute('value')).toBe('testusername');
      expect(firstname.getAttribute('value')).toBe('testfirstname');
      expect(lastname.getAttribute('value')).toBe('testlastname');
      expect(city.getAttribute('value')).toBe('testcity');
      expect(gender.getAttribute('value')).toBe('MALE');
    }).thenFinally(() => {
      username.clear().then(() => username.sendKeys('runtrackminds2017'));
      firstname.clear().then(() => firstname.sendKeys('runtrack'));
      lastname.clear().then(() => lastname.sendKeys('minds'));
      city.clear().then(() => city.sendKeys('Antwerp'));
      gender.sendKeys('UNDEFINED');

      submit.click().then(() => {
        browser.driver.sleep(1000);
        expect(username.getAttribute('value')).toBe('runtrackminds2017');
        expect(firstname.getAttribute('value')).toBe('runtrack');
        expect(lastname.getAttribute('value')).toBe('minds');
        expect(city.getAttribute('value')).toBe('Antwerp');
        expect(gender.getAttribute('value')).toBe('UNDEFINED');
      })
    });
  });

  let errorMessage = element(by.id('errorMessage'));
  it('empty username error',() => {
    username.clear().then(() => username.sendKeys(''));
    expect(username.getAttribute('value')).toBe('');

    submit.click().then(() => {
      browser.driver.sleep(1000);
      expect(errorMessage.isPresent()).toBeTruthy();
      expect(errorMessage.getText()).toEqual('Username can not be empty. Please enter a valid username.');
    });
    });

  it('username already taken error',() => {
    username.clear().then(() => username.sendKeys('Jelle'));
    expect(username.getAttribute('value')).toBe('Jelle');

    submit.click().then(() => {
      browser.driver.sleep(1000);
      expect(errorMessage.isPresent()).toBeTruthy();
      expect(errorMessage.getText()).toEqual('Username not available. Please choose another username.');
    });
  });
});
