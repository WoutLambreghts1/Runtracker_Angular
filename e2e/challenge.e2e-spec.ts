import {browser, element, by} from "protractor";
import * as myGlobals from "../src/app/globals";

describe('challenge', () => {
  beforeEach(() => {
    browser.get(myGlobals.FRONTEND_BASEURL + "/challenge");
  });
  //Tabs
  let tabRunning = element(by.id('running'));
  let tabCreated = element(by.id('created'));
  let tabAvailable = element(by.id('available'));

  //CompetitionModal
  let competitionModal = element(by.id('competitionModal'));
  let createForm = element(by.id('create-form'));

  //New challenge
  let btnNewChallenge = element(by.id('btn-new-challenge'));


  it('Should have a correct url', () => {
    expect(browser.getCurrentUrl()).toBe(myGlobals.FRONTEND_BASEURL + '/challenge');
  });

  it('Should have all elements on page', () => {
    expect(tabRunning.isPresent()).toBeTruthy();
    expect(tabCreated.isPresent()).toBeTruthy();
    expect(tabAvailable.isPresent()).toBeTruthy();
    expect(competitionModal.isPresent()).toBeTruthy();
    expect(btnNewChallenge.isPresent()).toBeTruthy();
    expect(createForm.isPresent()).toBeTruthy();
  });

  it("Should have correct values",() => {
    let header = element(by.tagName('h1'));
    expect(header.getText()).toBe('My challenges');


     btnNewChallenge.click().then(() => {
     browser.driver.sleep(2000);
     let modalHeader = element(by.css('.modal-title'));
     let inputCompetitionType = element(by.name('competitionType'));
     let inputDeadline = element(by.name('deadline'));
     let inputGoal = element(by.name('goal'));
     let inputMaxParticipants = element(by.name('maxParticipants'));

     expect(modalHeader.getText()).toBe('Create new challenge');
     expect(inputCompetitionType.isPresent()).toBeTruthy();
     expect(inputDeadline.isPresent()).toBeTruthy();
     expect(inputGoal.isPresent()).toBeTruthy();
     expect(inputMaxParticipants.isPresent()).toBeTruthy();

     });

  })

});
