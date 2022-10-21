<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getVillageois } from '@/composables/serviceAjax.js'
import TableMdl from '@/components/TableMdl.vue'
import { linearData, sortCol, filterColumn } from '@/composables/utilsTable.js'


let items = ref()
let itemsSvg = ref()

let fields = ref()
fields.value = [
    { key: 'id', label: "id", type: "number", sortable: true, sort: 1, filter: "" },
    { key: 'nom', label: "Nom", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'adresse', label: "Adresse", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'laSpecialite.nom', label: "Spécialité", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'leLieuHabitat.nom', label: "Habitat", type: "string", sortable: true, sort: 1, filter: "" },
]
// let nomKeyword = ref("")
// let spKeyword = ref("")
// let habitatKeyword = ref("")

let title = ref("Tri et filtrages")
let color = ref("color:blue;")

onMounted(async () => {
    await getVillageois()
        .then(response => {
            items.value = response;
            items.value = linearData(fields.value, items.value)

            itemsSvg.value = items.value
        })
        .catch(error => console.log('erreur Ajax', error))
})

const tableFilter = (field) => {
    items.value = filterColumn(field, itemsSvg.value)
}

</script>
<template>
    <div class="container-fluid fondblanc">
        <TableMdl :title="title" :fields="fields" :items="items" :color="color" @tableFilter="tableFilter" />

    </div>
</template>
<style scoped>
.fondblanc {
    background-color: white;
    color: black;
}
</style>