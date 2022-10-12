<script setup>
//imoport element vue
import { reactive, ref, onMounted, toRef } from "vue";
//
import { getVillageois, getVideos, getGares } from '@/composables/serviceAjax.js'
//
import { getLabels, countDatas } from '@/composables/utilsApp.js'
//
import { aleatoire, densite } from '@/composables/commonChart.js'
// import type graphique de bar
import { PolarArea } from "vue-chartjs";

//import des objet graphique de la biblioteque chartjs
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
} from "chart.js";
//importelement utilisé dans le graphique
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
);

let propChart = defineProps({
    chartId: { type: String, default: "Polar-chart" }, //Id du graphique
    datasetIdKey: { type: String, default: "label" }, //Id du dataset
    width: { type: Number, default: 500 }, //largeur du graph
    height: { type: Number, default: 500 }, //Hauteur du graph
    cssClasses: { type: String, default: "" }, //class css use
    styles: { type: Object, default: () => { } }, //class css use
    plugins: { type: Object, default: () => { } }, // plugin use
});

// données injecte dans le graphique
let chartData = reactive({
    // etiquete de l'axe
    labels: [],
    // valeur des donnée du graphique
    datasets: [{}],
});
const chartOptions = reactive({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            text: null,
            display: true
        }
    }
})

let listeVillageois = ref()
let listeVideos = ref()
let listeGares = ref()

let modeSelected = ref()

modeSelected.value = false

let baseColor = ref()

const selectMode = () => {
    let bgColor = null
    let bdColor = null

    if (modeSelected.value) {
        [bgColor, bdColor] = aleatoire(chartData.labels)
    } else {
        [bgColor, bdColor] = densite(baseColor.value, chartData.datasets[0].data)
    }
    chartData.datasets[0].backgroundColor = bgColor
    chartData.datasets[0].borderColor = bdColor
    chartData.datasets[0].borderWidth = 1
}

//
const selectVillageois = async () => {
    await getVillageois()
        .then(response => {
            listeVillageois.value = response
            chartOptions.plugins.title.text = "Spécialités des villageois"
            chartData.labels = getLabels(listeVillageois.value, 'laSpecialite.nom#1')
            chartData.datasets[0].data = countDatas(listeVillageois.value, chartData.labels, 'laSpecialite.nom#1')
            baseColor.value = 'rgba(0,0,255,#deg#)'
            selectMode()
        })
}
//
const selectVideos = async () => {
    await getVideos()
        .then(response => {
            listeVideos.value = response
            chartOptions.plugins.title.text = "Catégories des vidéos"
            chartData.labels = getLabels(listeVideos.value, 'lesCategories.lib#multi')
            chartData.datasets[0].data = countDatas(listeVideos.value, chartData.labels, 'lesCategories.lib#multi')
            baseColor.value = 'rgba(255,0,0,#deg#)'
            selectMode()
        })
}
//
const selectGares = async () => {
    await getGares('Doubs')
        .then(response => {
            listeGares.value = response.records
            chartOptions.plugins.title.text = "Lignes des gares"
            chartData.labels = getLabels(listeGares.value, 'fields.code_ligne#1')
            chartData.datasets[0].data = countDatas(listeGares.value, chartData.labels, 'fields.code_ligne#1')
            baseColor.value = 'rgba(0,255,0,#deg#)'
            console.log("baseColor :", baseColor)
            selectMode()
        })
}
//
onMounted(async () => {
    await selectVillageois()
})
</script>

<template>
    <main class="container">
        <h1 class="titre">Graphique PolarArea</h1>
        <br>
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <a href="#" class="navbar-brand">Selection :</a>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="#" class="nav-link" @click="selectVillageois">Villageois</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" @click="selectVideos">Videos</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" @click="selectGares">Gares</a>
                </li>
            </ul>
            <form class="navbar-nav ml-auto">
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="modeSelected"
                        @change="selectMode">
                    <label for="customSwitch1" class="custom-control-label">Dégradé / Aléatoire</label>
                </div>
            </form>
        </nav>
        <PolarArea class="fondblanc" :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
            :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width"
            :height="height">

        </PolarArea>
    </main>
</template>
<style scoped>
.fondblanc {
    background-color: white;
}

.titre {
    text-align: center;
}

.custom-control-label {
    color: #8A9DA0
}
</style>