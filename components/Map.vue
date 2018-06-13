<template>
  <!--<div class="map-holder" :data-lat="stateInfo['location']['lat']" data-lng="stateInfo['location']['lan']"-->
  <!--data-image="~/assets/images/marker.png">-->

  <!--</div>-->
  <div :id="mapId"></div>
</template>

<script>
  import Menu from '~/components/Menu.vue';
  export default {
    props: {
      'name': {
        type: String,
        default: function(){
          return 'map'
        }
      },
      'latitude': {
        type: Number,
        default: function(){
          return 39.50
        }
      },
      'longitude': {
        type: Number,
        default: function(){
          return -98.35
        }
      },
      'image': {
        type: String,
        default: function(){
          return '~/assets/images/marker.png'
        }
      }
    },
    data() {
      return {
        mapId: this.name,
        styles: [
          {
            "featureType": "administrative",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#444444"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "visibility": "on"
              },
              {
                "hue": "#ebff00"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text",
            "stylers": [
              {
                "saturation": "-72"
              },
              {
                "gamma": "0.00"
              },
              {
                "lightness": "47"
              },
              {
                "weight": "5.59"
              },
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "saturation": "14"
              },
              {
                "lightness": "11"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              },
              {
                "hue": "#00ff00"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                "color": "#f2f2f2"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 45
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              {
                "color": "#ffffff"
              },
              {
                "visibility": "on"
              }
            ]
          }
        ],
        myLatlng: String,
        optionsMap: Object
      }
    },

    mounted() {
      this.myLatlng = new google.maps.LatLng(this.latitude, this.longitude);
      this.optionsMap = {
        center: this.myLatlng,
        zoom: 12,
        styles: this.styles,
        draggable: !((typeof window.orientation !== 'undefined') ||
          (navigator.userAgent.indexOf('IEMobile') !== -1)),
        scrollwheel: false
      };

      this.map = new google.maps.Map(document.getElementById(this.mapId), this.optionsMap);

      let marker = new google.maps.Marker({
        position: this.myLatlng,
        map: this.map,
        icon: this.image
      });
    }
  }
</script>

