import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {HistoryService} from "../../history.service";
import {Tracking} from "../../../model/tracking";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'trackingDetailComponent',
  templateUrl: 'tracking-detail.component.html',
  styleUrls: ['tracking-detail.component.css']
})

export class TrackingDetailComponent implements OnInit {
  private trackingId: number;
  private tracking: Tracking;

  // Chart parameters
  private lineChartData: Array<any> = [{data: []}];
  private lineChartLabels: Array<any> = [];
  private lineChartColors: Array<any> = [
    {
      backgroundColor: '#2ddeff',
      borderColor: '#2e87fe',
      pointBackgroundColor: '#6388ef',
      pointBorderColor: '#0cd6ef',
      pointHoverBackgroundColor: '#80d234',
      pointHoverBorderColor: '#168b19'
    }
  ];
  private lineChartLegend: boolean = false;
  private lineChartType: string = 'line';
  private lineChartOptions: any = {
    responsive: true,
    scales: {}
  };

  constructor(private activeRoute: ActivatedRoute, private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.trackingId = +params['id'];
      this.historyService.getAllTrackings().subscribe(val => {
        this.tracking = val.find(x => x.trackingId == this.trackingId);
        this.setChartData(this.tracking);
        //this.loadMap();
      });
    });
  }

  setChartData(tracking: Tracking){
    this.lineChartData[0] = {data: tracking.coordinates.map(x => x.speed)};
    this.lineChartLabels = tracking.coordinates.map(x => (new Date((x.time)).getHours() + ":" +new Date(x.time).getMinutes() + ":" + new Date(x.time).getSeconds()));
  }

  // chart events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  /*
  private loadMap() {
    let runningCoordinates = this.fetchCoordinates();

    let runningPath = new google.maps.Polyline({
      path: runningCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    let startPosition = new google.maps.LatLng(runningCoordinates[Math.round(runningCoordinates.length/2)].lat, runningCoordinates[Math.round(runningCoordinates.length/2)].lng);

    let mapOptions = {
      center: startPosition,
      zoom: 17,
      scrollwheel: false,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#444444"}]
      }, {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{"color": "#f2f2f2"}]
      }, {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#c1b8af"}, {"lightness": "69"}]
      }, {
        "featureType": "landscape.man_made",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "landscape.natural.landcover",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "landscape.natural.terrain",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
      }, {
        "featureType": "poi.attraction",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "poi.business",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "poi.government",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "poi.medical",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#978b82"}]
      }, {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "poi.place_of_worship",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "poi.school",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "poi.sports_complex",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{"saturation": -100}, {"lightness": 45}]
      }, {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{"visibility": "simplified"}]
      }, {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "road.highway.controlled_access",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#003f5f"}]
      }, {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
      }, {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#438fb6"}, {"lightness": "0"}, {"gamma": "0"}, {"saturation": "0"}]
      }, {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
      }, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{"color": "#328aae"}, {"visibility": "on"}]
      }, {"featureType": "water", "elementType": "geometry.fill", "stylers": [{"color": "#003f5f"}]}]
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    runningPath.setMap(this.map);
  }*/

  private fetchCoordinates(): any {
    let runningCoordinates = [];

    if (this.tracking.coordinates.length > 0) {
      this.tracking.coordinates.forEach((c) => {
        runningCoordinates.push({lat: c.lat, lng: c.lon})
      });
    } else {
      runningCoordinates.push({lat: 51, lng: 48});
      runningCoordinates.push({lat: 50, lng: 49});
    }
    return runningCoordinates;
  }


}
