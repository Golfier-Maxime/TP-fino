<script setup>
import { ref, reactive, onMounted } from "vue";
import { Bar } from "vue-chartjs";
import { getVillageois, getVideos, getGares } from "@/composables/serviceAjax";
import { getLabels, countDatas } from "@/composables/utilsApp";
import { densite, aleatoire } from '@/composables/commonChart.js'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

const propChart = defineProps({
    chartId: { type: String, default: "bar-chart" }, //Id du graphique
    datasetIdKey: { type: String, default: "label" }, //Id du dataset
    width: { type: Number, default: 350 }, //largeur du graph
    height: { type: Number, default: 400 }, //Hauteur du graph
    cssClasses: { type: String, default: "" }, //class css use
    styles: { type: Object, default: () => { } }, //class css use
    plugins: { type: Object, default: () => { } }, // plugin use
});

let chartData = reactive({
    // etiquete de l'axe
    labels: [],
    // valeur des donnée du graphique
    datasets: [
        {},
    ],
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

let liste = ref()

let modeSelected = ref()
modeSelected.value = false
let baseColor = ref()
baseColor.value = 'rgba(0,0,255,#deg#)'

onMounted(async () => {
    await getVillageois()
        .then(response => {
            liste.value = response
            console.log("liste villageois", chartData.labels)
            //
            chartOptions.plugins.title.text = "Spécialités des villageois"
            //
            chartData.labels = getLabels(liste.value, 'laSpecialite.nom#1')
            console.log("labels villageois", chartData.labels)
            //
            chartData.datasets[0].data = countDatas(liste.value, chartData.labels, 'laSpecialite.nom#1')
            console.log("data villageois", chartData.datasets[0].data)
            //
            chartData.datasets[0].label = "Spécialités"
            // 
            selectMode()
            // let [bgColor, bdColor] = densite('rgba(0,0,255,#deg#)', chartData.datasets[0].data)
            // // let bgColor = densite('rgba(0,0,255,#deg#)', chartData.datasets[0].data)
            // // 
            // chartData.datasets[0].backgroundColor = bgColor
            // //
            // // let bdColor = densite('rgba(0,0,255,1)', chartData.datasets[0].data)
            // chartData.datasets[0].borderColor = bdColor
            // //
            // chartData.datasets[0].borderWidth = 1
        });
})

const selectMode = () => {
    if (modeSelected.value) {
        let [bgColor, bdColor] = aleatoire(chartData.labels)
        chartData.datasets[0].backgroundColor = bgColor
        chartData.datasets[0].borderColor = bdColor
    } else {
        let bgColorDeg = densite(baseColor.value, chartData.datasets[0].data)
        chartData.datasets[0].backgroundColor = bgColorDeg
    }
}

</script>
<template>
    <div class="fondblanc">
        <h1>Service - Partie 02</h1>
        <hr>
        <form class="navbar-nav ml-auto">
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="modeSelected"
                    @change="selectMode">
                <label class="custom-control-label" for="customSwitch1"></label>
            </div>
        </form>
        <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartID" :dataset-id-key="datasetIdKey"
            :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
    </div>
</template>
<style scoped>
.fondblanc {
    background-color: white;
}
</style>