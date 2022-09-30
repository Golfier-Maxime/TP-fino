<script setup>
//imoport element vue
import { reactive, ref, onMounted } from "vue";
// import type graphique de bar
import { Line } from "vue-chartjs";

//import des objet graphique de la biblioteque chartjs
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
} from "chart.js";
//importelement utilisé dans le graphique
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler
);
//proprieter du graphique use dans le template
//On définipour chacune son type de donné et ça valeur par défaut
//On peux utilisé une grande varieté de type,voire des objet

const propChart = defineProps({
  chartId: { type: String, default: "Line-chart" }, //Id du graphique
  datasetIdKey: { type: String, default: "label" }, //Id du dataset
  width: { type: Number, default: 200 }, //largeur du graph
  height: { type: Number, default: 100 }, //Hauteur du graph
  cssClasses: { type: String, default: "" }, //class css use
  styles: { type: Object, default: () => {} }, //class css use
  plugins: { type: Object, default: () => {} }, // plugin use
});

// données injecte dans le graphique
let chartData = reactive({
  // etiquete de l'axe
  labels: ["Janvier", "Février", "Mars", "Avril", "Mai"],
  // valeur des donnée du graphique
  datasets: [
    {
      // valeur des donnée
      label: "Femmes",
      data: [40, 20, 12, 14, 24],
      borderColor: "rgba(255, 0, 0, 0.5)",
      tension: 0.5,
      fill: true,
    },
    {
      // valeur des donnée
      label: "Hommes",
      data: [29, 24, 2, 28, 12],
      borderColor: "rgba(0, 0, 255, 0.5)",
      tension: 0.5,
      fill: true,
    },
    {
      // valeur des donnée
      label: "Tous",
      data: [69, 44, 14, 42, 32],
      borderColor: "rgba(255, 255, 255, 0.5)",
      tension: 0.5,
      fill: true,

      // point de la courbe
      pointBackgroundColor: "#fff",
      pointBorderColor: "#ffb88c",
      PointHoverBackgroundColor: "#ffb88c",
      PointHoverBorderColor: "#fff",
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
});

let chartOptions = reactive({
  //aspect responsive du graphique
  responsive: true,
  // les plugins
  plugins: {
    //titre
    title: {
      //affichage
      display: true,
      // libelle du graphique
      text: "Univerité BFC - inscriptions :",
      // police du texte
      font: { size: 16 },
    },
  },
});

let liste = ref();
onMounted(async () => {
  let request =
    "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/" +
    "?dataset=fr-esr-statistiques-sur-les-effectifs-d-etudiants-inscrits-par-etablissement" +
    "&q=&rows=100" +
    "&sort=-annee_universitaire" +
    "&refine.etablissement_type=Université" +
    "&refine.etablissement_region=Bourgogne-Franche-Comté";
  await fetch(request)
    .then((response) => response.json())
    .then((response) => {
      liste.value = new Array(response);
      console.log("response", liste.value);
      chartOptions.plugins.title.text += liste.value[0].nhits + " réponses";
      let setLabels = new Set();
      liste.value[0].records.forEach((el) => {
        setLabels.add(el.fields.annee_universitaire);
      });
      chartData.labels = Array.from(setLabels);
      chartData.labels.sort();

      //calcul des valeur par label
      // comptage pour femmes
      let cptf = [];
      // comptage pour homme
      let cptm = [];
      // comtage totaux
      let cptall = [];
      // parcours des labels
      chartData.labels.forEach((label) => {
        let nbf = 0;
        let nbm = 0;
        let nball = 0;
        liste.value[0].records.forEach((el) => {
          if (label == el.fields.annee_universitaire) {
            nbf += el.fields.sexef;
            nbm += el.fields.sexem;
            nball += el.fields.sexef + el.fields.sexem;
          }
        });
        cptf.push(nbf);
        cptm.push(nbm);
        cptall.push(nball);
      });
      chartData.datasets[0].data = cptf;
      chartData.datasets[1].data = cptm;
      chartData.datasets[2].data = cptall;
    })
    .catch((error) => console.log("erreur ajax", error));
});
</script>
<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>
<style scoped>
</style>