import {coordinate} from "./coordinate";
import {Competition} from "./competition";
import {User} from "./user";
export class Tracking{
  trackingId:number;
  time:Date;
  totalDuration:number;
  totalDistance:number;
  maxSpeed:number;
  avgSpeed:number;
  avgPace:number;
  competition:Competition;
  coordinates:coordinate[];
  user:User;
}
