import {Tracking} from "./tracking";
import {Competition} from "./competition";

export class HistoryWrapper {
  type: string;
  tracking: Tracking;
  competition: Competition;
  date: Date;

  public makeTrackingHistory(tracking: Tracking) {
    this.tracking = tracking;
    this.date = tracking.time;
  }

  public makeCompetitionHistory(competition: Competition){
    this.competition = competition;
    this.date = competition.time;
  }
}
