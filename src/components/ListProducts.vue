<script setup>
import { ref, onMounted } from "vue";

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
  <div>
    <h6>composant - ListProducts.vue</h6>
    <div v-for="v in liste" :key="v.id">{{ v.id }} - {{ v.nom }}</div>

    <hr />
  </div>
</template>

<style scoped>
hr {
  background-color: white;
}
</style>