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

//Liste des departement
let listeDep = ref();
// departement selectionné
let depSelect = ref();

// liste des gare pour un dep
let listeGares = ref();

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

  // recherche des dep - geo api gouv
  await fetch("https://geo.api.gouv.fr/departements")
    // reponse demande en json
    .then((response) => response.json())
    // recuperation de la reponse
    .then((response) => {
      listeDep.value = response;
      // onvérifie dans la consol les resulta
      console.log("response", listeDep);
      // valeur 0 par defaut
      depSelect.valut = "0";
    })
    .catch((error) => console.log("erreur ajax"));
});

const selection = async (dep) => {
  console.log("departement selectionné", dep);
  let request =
    "https://ressources.data.sncf.com/api/records/1.0/search/" +
    "?dataset=liste-des-gares" +
    "&q=departemen=" +
    dep +
    "&rows=100" +
    "&lang=FR&facet=voyageurs";
  console.log({ request });
  await fetch(request)
    .then((response) => response.json())
    .then((response) => {
      listeGares.value = response.records;
      console.log(listeGares);
      let markers = Leaflet.featureGroup();
      let myIcon = Leaflet.icon({
        iconUrl: "assets/marker-icon.png",
        shadowUrl: "assets/marker-shadow.png",
        iconSize: [25, 41],
        shadowSize: [25, 41],
        shadowAnchor: [-10, -10],
        popupAnchor: [0, 0],
      });
      listeGares.value.forEach((gare) => {
        let position = gare.geometry.coordinates;
        let libelle = gare.fields.commune;
        let marker = Leaflet.marker([position[1], position[0]], {
          icon: myIcon,
        });
        marker.bindPopup(libelle);
        markers.addLayer(marker);
      });
      map.addLayer(markers);
      map.fitBounds(markers.getBounds());
    })
    .catch((error) => console.log("erreur ajax", error));
};
</script>
    
<template>
  <div>
    <div class="container">
      <select
        class="custom-select"
        v-model="depSelect"
        @change="selection(depSelect)"
      >
        <option disabled value="0">Sélectionner un département</option>
        <option v-for="dep in listeDep" :key="dep.code" :value="dep.nom">
          {{ dep.code }} - {{ dep.nom }}
        </option>
      </select>
      <hr />
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
    