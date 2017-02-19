import {User} from "./user";
export class CoreInfo{
  avgDistance: number;
  avgSpeed: number;
  maxDistance: number;
  maxSpeed: number;
  nrOfCompetitionsWon: number;
  ranMarathon: boolean;
  ranTenKm: boolean;
  ranTwentyKm: boolean;
  totalDistance: number;

  constructor(user: User){
    this.avgDistance = user.avgDistance;
    this.avgSpeed = user.avgSpeed;
    this.maxDistance = user.maxDistance;
    this.maxSpeed = user.maxSpeed;
    this.nrOfCompetitionsWon = user.nrOfCompetitionsWon;
    this.totalDistance = user.totalDistance;
    this.ranMarathon = user.ranMarathon;
    this.ranTenKm = user.ranTenKm;
    this.ranTwentyKm = user.ranTwentyKm;
  }
}
