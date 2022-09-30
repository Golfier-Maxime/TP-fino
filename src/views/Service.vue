<script setup>
import { ref, reactive, onMounted } from "vue";
import { getVillageois, getVideos, getGares } from "@/composables/serviceAjax";
import { getLabels, countDatas } from "@/composables/utilsApp.js";

let listeVillageois = ref();
let listeVideos = ref();
let listeGares = ref();

let lstLabelsVillageois = ref();
let lstLabelsVideos = ref();
let lstLabelsGares = ref();

let lstDataVillageois = ref();
let lstDataVideos = ref();
let lstDataGares = ref();

onMounted(async () => {
  await getVillageois().then((response) => {
    listeVillageois.value = response;
    console.log("liste villageois", listeVillageois);
    //
    lstLabelsVillageois.value = getLabels(
      listeVillageois,
      "laSpecialite.nom#1"
    );
    console.log("labels villageois", lstLabelsVillageois);
    //
    lstDataVillageois.value = countDatas(
      listeVillageois,
      lstLabelsVillageois,
      "laSpecialite.nom#1"
    );
    console.log("data villaeois", lstDataVillageois);
  });
  await getVideos().then((response) => {
    listeVideos.value = response;
    console.log("liste videos", listeVideos);
    //
    lstLabelsVideos.value = getLabels(listeVideos, "lesCategories.lib#multi");
    console.log("labels videos", lstLabelsVideos);
    //
    lstDataVideos.value = countDatas(
      listeVideos,
      lstLabelsVideos,
      "lesCategories.lib#multi"
    );
    console.log("data videos", lstDataVideos);
  });
  await getGares("Doubs").then((response) => {
    listeGares.value = response.records;
    console.log("liste gares", listeGares);
    //
    lstLabelsGares.value = getLabels(listeGares, "fields.commune#1");
    console.log("labels Gares", lstLabelsGares);
    //
    lstDataGares.value = countDatas(
      listeGares,
      lstLabelsGares,
      "fields.commune#1"
    );
    console.log("data gares", lstDataGares);
  });
});
</script>
<template>
  <h1>Service - Partie 01</h1>
  <!-- <pre>{{ listeVillageois }}</pre>
  <hr />
  <pre>{{ listeVideos }}</pre>
  <hr />
  <pre>{{ listeGares }}</pre> -->
  <div class="row">
    <div class="col-6">
      <pre>{{ lstLabelsVillageois }}</pre>
    </div>
    <div class="col-6">
      <pre>{{ lstDataVillageois }}</pre>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-6">
      <pre>{{ lstLabelsVideos }}</pre>
    </div>
    <div class="col-6">
      <pre>{{ lstDataVideos }}</pre>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-6">
      <pre>{{ lstLabelsGares }}</pre>
    </div>
    <div class="col-6">
      <pre>{{ lstDataGares }}</pre>
    </div>
  </div>
  <hr />
</template>
<style scoped>
pre {
  color: white;
}
</style>