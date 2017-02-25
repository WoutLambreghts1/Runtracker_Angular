import {browser, element, by} from "protractor";
import * as myGlobals from "../src/app/globals";

describe('friends', () => {
  beforeEach(() => {
    browser.get(myGlobals.FRONTEND_BASEURL);
    let inputMail = element(by.id('username'));
    let inputPass = element(by.id('password'));
    let btnLogin = element(by.id('login'));
    let navFriends = element(by.id('friends'));

    inputMail.sendKeys("runtrackminds2017@gmail.com");
    inputPass.sendKeys("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
    });
    navFriends.click().then(() => {
      browser.driver.sleep(2000);
    });

  });

  //Tabs
  let tabMyFriends = element(by.id('my-friends'));
  let tabFind = element(by.id('find-friends'));
  let tabRequest = element(by.id('friend-requests'));


  it('Should have a correct url', () => {
    expect(browser.getCurrentUrl()).toBe(myGlobals.FRONTEND_BASEURL + '/friends');
  });

  it('Should have all tabs on page', () => {
    expect(tabMyFriends.isPresent()).toBeTruthy();
    expect(tabFind.isPresent()).toBeTruthy();
    expect(tabRequest.isPresent()).toBeTruthy();
  });


  it("Should add a new friend",() => {
    let tabFindFriends= element(by.id('tab-find-friends'));
    tabFindFriends.click().then(() => {
      browser.driver.sleep(3000);
      let addBtns = element.all(by.css('.btn-success'));
      addBtns.count().then(function (size) {
        if(size > 0){
          addBtns.get(0).click();
        }
      });
      browser.driver.sleep(4000);
    });

  });

  it("Should delete a friend",() => {
    let tabMyFriends= element(by.id('tab-my-friends'));
    tabMyFriends.click().then(() => {
      browser.driver.sleep(3000);
      let removeBtns = element.all(by.css('.btn-danger'));
      removeBtns.count().then(function (size) {
        if(size > 1){
          removeBtns.get(0).click();
        }
      });
      browser.driver.sleep(4000);
    });
  })
});
