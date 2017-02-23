import {browser, element, by} from "protractor";
import * as myGlobals from "../src/app/globals";
/*
describe('friends-profilepage', () => {
  let username = "runtrackminds2017";

  beforeAll(() => {
    browser.executeScript(function () {
      let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5EQkJNRUU1TmpnM09FVTVNVVJDUXpCRFFrSkVNVEEwTlVFek5qZ3lOakUxTVVFM1JFSkROdyJ9.eyJuYW1lIjoicnVudHJhY2ttaW5kczIwMTdAZ21haWwuY29tIiwibmlja25hbWUiOiJydW50cmFja21pbmRzMjAxNyIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci83MzE1ZWVlMWI1NGJkODA1OWRmMTJlNDEzMTQ2OGE4Mz9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnJ1LnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE3LTAyLTE4VDEwOjM1OjMxLjAyNloiLCJlbWFpbCI6InJ1bnRyYWNrbWluZHMyMDE3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9ydW50cmFja21pbmRzLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ODk3NDA1NjQ2MDVlNTE3ZmI5MzU3ODMiLCJhdWQiOiJGSW1sN2JlUHZ5V2ZjMnk5VXphUlVQallEZW5EUVNORSIsImV4cCI6MTQ4NzQ1MDEzMSwiaWF0IjoxNDg3NDE0MTMxfQ.3vuYukw-PTcZ5fruRCrUYZdp0DQckHm4twx-jriLorXbiWoukmfKvXMljZ8DtW5TmRN5IyJ5fkp4ZnxbxXqWUdFlcq84VMSPZQXuvGNjS1Lw_ZKEfh2ggagK_SVEXiNCVyxxzTnc6bYF80eQ_WdILDbsIOoc9wyJCtWQa04IMt1LD9IKcPi6djqflsmEHuqhz3m_GCgo-J3HfiTzG-mvbKLYjGIN6azzg5s0NWyTZYxBNEpg4CyG9SqCJSr_K8-KCVOqPcUT_60R-9v31sZDZC_xq0aiyQEXtb3Z_vGZnBv__d0oOo1-vUFx7fdVMXtmFE5HDrT2AJayB2Fv479H7A";
      window.localStorage.setItem("id_token",token);
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
*/
