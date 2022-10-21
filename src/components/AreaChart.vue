<script setup>
//imoport element vue
import { reactive, ref, onMounted } from "vue";
//
import { getVillageois, getVideos, getGares } from '@/composables/serviceAjax.js'
//
import { getLabels, countDatas } from '@/composables/utilsApp.js'
//
import { aleatoire, densite } from '@/composables/commonChart.js'
// import type graphique de bar
//
import TableMdl from './TableMdl.vue'
//
import { linearData, sortCol, filterColumn } from '@/composables/utilsTable.js'
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
let dataSelected = ref()

let listeVillageois = ref()
let listeVideos = ref()
let listeGares = ref()

let modeSelected = ref()

modeSelected.value = false

let baseColor = ref()

//
let fields = ref()
let title = ref()
let color = ref()
let titleGraph = ref('')
let dataView = ref('')
let numDataset = 0

let items = ref()
let itemsSvg = ref()

//
let fieldsVillageois = ref()
fieldsVillageois.value = [
    { key: 'id', label: "id", type: "number", sortable: true, sort: 1, filter: "" },
    { key: 'nom', label: "Nom", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'adresse', label: "Adresse", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'laSpecialite.nom', label: "Spécialité", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'leLieuHabitat.nom', label: "Habitat", type: "string", sortable: true, sort: 1, filter: "" },
]
let fieldsVideos = ref()
fieldsVideos.value = [
    { key: 'id', label: "id", type: "number", sortable: true, sort: 1, filter: "" },
    { key: 'nom', label: "Nom", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'adresse', label: "Adresse", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'laSpecialite.nom', label: "Spécialité", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'leLieuHabitat.nom', label: "Habitat", type: "string", sortable: true, sort: 1, filter: "" },
]
let fieldsGares = ref()
fieldsGares.value = [
    { key: 'fields.code_ligne', label: "Code Ligne", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'fields.commune', label: "Commune", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'fields.linelle', label: "Libellé", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'fields.voyageurs', label: "Voyageurs", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'field.idreseau', label: "Réseau", type: "string", sortable: true, sort: 1, filter: "" },
]



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
const selectData = async (typeData) => {
    dataSelected.value = typeData
    switch (typeData) {
        case 'villageois':
            await getVillageois()
                .then(response => {
                    items.value = response
                    titleGraph = "Spécialités des villageois"
                    dataView.value = 'laSpecialite.nom#1'
                    baseColor.value = 'rgba(0,0,255,#deg#)'
                    numDataset = 0
                    fields.value = fieldsVillageois.value
                    color.value = 'color:blue;'
                })
            break

        case 'videos':
            await getVideos()
                .then(response => {
                    items.value = response
                    titleGraph = "Catégories des vidéos"
                    dataView.value = 'lesCategories.lib#multi'
                    baseColor.value = 'rgba(255,0,0,#deg#)'
                    numDataset = 0
                    fields.value = fieldsVideos.value
                    color.value = 'color:red;'
                })
            break

        case 'gares':
            await getGares('Doubs')
                .then(response => {
                    items.value = response.records
                    titleGraph = "Lignes des gares"
                    dataView.value = 'fields.code_ligne#1'
                    baseColor.value = 'rgba(0,255,0,#deg#)'
                    numDataset = 0
                    fields.value = fieldsGares.value
                    color.value = 'color:green;'
                })
            break
    }
    items.value = linearData(fields.value, items.value)
    itemsSvg.value = items.value
    updateGraph(items)
}

const updateGraph = (items) => {
    chartOptions.plugins.title.text = titleGraph
    chartData.labels = getLabels(items.value, dataView.value)
    chartData.datasets[numDataset].data = countDatas(items.value, chartData.labels, dataView.value)
    selectMode()
    title.value = chartOptions.plugins.title.text
}






// //
// const selectVillageois = async () => {
//     await getVillageois()
//         .then(response => {
//             listeVillageois.value = response
//             chartOptions.plugins.title.text = "Spécialités des villageois"
//             chartData.labels = getLabels(listeVillageois.value, 'laSpecialite.nom#1')
//             chartData.datasets[0].data = countDatas(listeVillageois.value, chartData.labels, 'laSpecialite.nom#1')
//             baseColor.value = 'rgba(0,0,255,#deg#)'
//             selectMode()
//         })
// }
// //
// const selectVideos = async () => {
//     await getVideos()
//         .then(response => {
//             listeVideos.value = response
//             chartOptions.plugins.title.text = "Catégories des vidéos"
//             chartData.labels = getLabels(listeVideos.value, 'lesCategories.lib#multi')
//             chartData.datasets[0].data = countDatas(listeVideos.value, chartData.labels, 'lesCategories.lib#multi')
//             baseColor.value = 'rgba(255,0,0,#deg#)'
//             selectMode()
//         })
// }
// //
// const selectGares = async () => {
//     await getGares('Doubs')
//         .then(response => {
//             listeGares.value = response.records
//             chartOptions.plugins.title.text = "Lignes des gares"
//             chartData.labels = getLabels(listeGares.value, 'fields.code_ligne#1')
//             chartData.datasets[0].data = countDatas(listeGares.value, chartData.labels, 'fields.code_ligne#1')
//             baseColor.value = 'rgba(0,255,0,#deg#)'
//             console.log("baseColor :", baseColor)
//             selectMode()
//         })
// }
//
onMounted(async () => {
    await selectData('Villageois')
})

const tableFilter = (field) => {
    items.value = filterColumn(field, itemsSvg.value)
    updateGraph(items)
}
</script>

<template>
    <main class="container">
        <h1 class="titre">Graphique PolarArea</h1>
        <br>
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <a href="#" class="navbar-brand">Selection :</a>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="#" class="nav-link" @click="selectData('villageois')">Villageois</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" @click="selectData('videos')">Videos</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" @click="selectData('gares')">Gares</a>
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
        <div class="row">
            <div class="col-4">
                <PolarArea class="fondblanc" :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
                    :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles"
                    :width="width" :height="height">

                </PolarArea>
            </div>
            <div class="col-8">
                <TableMdl :title="title" :fields="fields" :items="items" :itemsSvg="ItemsSvg"
                    @tableFilter="tableFilter" />
            </div>
        </div>
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