<script setup>
// import des éléments utilisés de VueJs
import { ref, reactive, computed, onMounted } from "vue";

//import composant ListProduct

import ListProducts from "../components/ListProducts.vue";

// création d'une ref
let title = ref();
//valeur de la ref
title.value = "SetUp";

// création d'un objet reactive
const user = reactive({
  name: "Golfier",
  firstName: "Maxime",
});

// création d'une props
const proprietes = defineProps({
  name: { type: String, default: "Golfier" },
  firstName: { type: String, default: "Maxime" },
  date: { type: Date, default: new Date() },
  number: { type: Number, default: "28" },
  preferences: { type: Object, default: () => {} },
});

//fontion pour ajouter 0 devant date
const addZero = (val) => {
  if (val < 10) {
    return (val = "0" + val);
  } else {
    return val;
  }
};

// zone calculée (fonction flechees)
// identique à : const now = computed ()
const now = computed(() => {
  let d = new Date();
  let day = addZero(d.getDay());
  let hour = addZero(d.getHours());
  let month = addZero(d.getMonth() + 1);
  let year = d.getFullYear();
  let mn = addZero(d.getMinutes());
  let se = addZero(d.getSeconds());

  let d1 = [hour, mn, se].join(":");
  let d2 = [day, month, year].join("/");

  return [d2, d1].join(" à ");
});

//création d'une méthode (fonction)
// cp permet de passer des majuscule a minuscule (depart minuscule)
let cp = false;
const capitalize = () => {
  // on prend la valeur inverse de cp
  cp = !cp;
  if (cp) {
    //si cp est vrai on passe en majuscules
    title.value = title.value.toUpperCase();
  } else {
    //si cp est faux pn passe en minuscule
    title.value = title.value.toLowerCase();
  }
};

// utilisation d'une ref pour la requete ajax
// null au dépard
let liste = ref(null);

onMounted(async () => {
  //appel ajax via fetch
  const response = await fetch(
    "https://jsonGaulois.jmfino.fr/listeVillageois.php"
  );
  //récuperation des résultat
  liste.value = await response.json();
  //affichage dans la console
  console.log(liste);
});
</script>

<template>
  <div class="container">
    <hr />
    <h6>ref - title : {{ title }}</h6>

    <h6>reactive - user : {{ user.firstName }} {{ user.name }}</h6>
    <hr />

    <h6>props - proprietes :</h6>
    <ul>
      <li>{{ proprietes.name }}</li>
      <li>{{ proprietes.firstName }}</li>
      <li>{{ proprietes.date }}</li>
      <li>{{ proprietes.number }}</li>
      <li>{{ proprietes.preferences }}</li>
    </ul>

    <hr />
    <h6>Zone calculée - Aujourd'hui : {{ now }}</h6>
    <hr />

    <input type="text" v-model="title" />
    <button type="button" @click="capitalize(title)">
      Capitalize (On/Off)
    </button>
    <hr />

    <h6>Liste des villageois</h6>
    <div v-for="v in liste" :key="v.id">{{ v.id }} - {{ v.nom }}</div>
    <hr />
    <h6>Liste des villageois avec composants</h6>
    <ListProducts />
  </div>
</template>

<style scoped>
hr {
  background-color: white;
}
</style>