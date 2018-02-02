import { Component, ViewChild } from '@angular/core';
import { NavController, ElementRef } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
declare var document;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  start;
  end;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
  }
  ionViewDidLoad() {
    this.loadMap();

  }
  loadMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });
    directionsDisplay.setMap(map);

    var onChangeHandler = function () {
      directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);

   

  }

}