<script setup>
//imoport element vue
import { reactive } from "vue";

// import type graphique de bar
import { Bar } from "vue-chartjs";

//import des objet graphique de la biblioteque chartjs
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

//importelement utilisé dans le graphique
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

//proprieter du graphique use dans le template
//On définipour chacune son type de donné et ça valeur par défaut
//On peux utilisé une grande varieté de type,voire des objet

const propChart = defineProps({
  chartId: { type: String, default: "bar-chart" }, //Id du graphique
  datasetIdKey: { type: String, default: "label" }, //Id du dataset
  width: { type: Number, default: 350 }, //largeur du graph
  height: { type: Number, default: 700 }, //Hauteur du graph
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
      // etiquete du je de donnée a projeter
      label: "données 01",
      // valeur des donnée
      data: [40, 20, 12, 14, 24],
    },
  ],
});

//optionn du graphique
// les principale utilisées, ils en existe d'autre
// voir documentation
let chartOption = reactive({
  //aspect responsive du graphique
  responsive: true,
  // maintient du ratio
  maintainAspectRatio: false,
});
</script>

<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartID"
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