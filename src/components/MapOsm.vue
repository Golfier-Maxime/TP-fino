<script setup>
// import élément de vue
import { onMounted, ref, reactive } from "vue";
// import leaflet
import * as Leaflet from "leaflet";
// css leaflet
import "leaflet/dist/leaflet.css";

// Canevas leaflet pour la carte
let tileLayer = Leaflet.tileLayer;
// Initialisation de la carte sous forme de ref
let map = ref();

// lorsque le composant est monté dans la vue
// On affiche la carte
onMounted(async () => {
  // Caracteristique visuelle de la carte
  tileLayer = Leaflet.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });

  //création de la carte sur la div ayant : id='map'
  map = Leaflet.map("map", {
    zoomControl: true, // control du zoom
    layers: [tileLayer], // caneva pour dessiner la carte
    maxZoom: 18, // zoom maxi autorisé
    minZoom: 6, // zoom mini autorisé
  })
    // projection de la carte avec centrage aux coordonnées infiqué, avec facteur d'agrandissement
    .setView([47.495328, 6.8044455], 17);

  // création d'un icone
  let myIcon = Leaflet.icon({
    iconUrl: "assets/marker-icon.png", // image de l'icone
    shadowUrl: "assets/marker-shadow.png", // image de l'ombre
    iconSize: [25, 41], // taille de l'icone
    shadowSize: [25, 41], //taille de l'ombre
    iconAnchor: [0, 0], // point de position de licone
    shadowAnchor: [-10, -10], // point de position de l'ombre
    popupAnchor: [0, 0], // point de position popub si elle existe, relativement a l'icone
  });

  // ajout d'un marqueur
  let marker = Leaflet.marker([47.495328, 6.8044455], { icon: myIcon }).addTo(
    map
  );
  // ajout d'une infobulle
  marker.bindPopup("Je suis un marker");

  // recentrage de la carte au bout de 5 sec
  // a une autre position
  setTimeout(function () {
    map.panTo([47.50133850064826, 6.80762174718467]);
  }, 5000);

  // ajout d'un marker
  // a la positon de centrage
  let marker2 = Leaflet.marker([47.50133850064826, 6.80762174718467], {
    icon: myIcon,
  }).addTo(map);
  // ajout d'une infobulle
  marker2.bindPopup("Je suis a la gendarmerie national");
});

// hors de onMounted
// coordonée de l'user
const coordMe = reactive({ latitude: 0, longitude: 0 });

//fonction de detection de la geolocalisation via navigateur
const locMe = () => {
  let watcher = navigator.geolocation.watchPosition(
    // fonction à appeler en cas de succes
    showLocation
  );
};
// fonction de sa localisation si elle reussi
const showLocation = (position) => {
  //recuperation latitude et longitude
  coordMe.latitude = position.coords.latitude;
  coordMe.longitude = position.coords.longitude;
  // recentrage de la carte sur la position user
  map.panTo([coordMe.latitude, coordMe.longitude]);
  // création d'un marqueur
  // l'icone ayant deja ete instancier
  // on na pas  a la préciser on le reprend par defaut
  let markerMe = Leaflet.marker([coordMe.latitude, coordMe.longitude]).addTo(
    map
  );
  //ajout d'une infobulle
  markerMe.bindPopup("Je suis la !!!");
};
</script>

<template>
  <div>
    <button type="button" @click="locMe()">Se localiser</button>
    <span v-if="coordMe">
      coordonnées : {{ coordMe.latitude }} - {{ coordMe.longitude }}</span
    >
    <span v-else> pas de coordonées </span>
    <div class="container">
      <div id="map"></div>
    </div>
  </div>
</template>

<style  scoped>
#map {
  width: 100%;
  height: 70vh;
}
</style>
