<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getVillageois, getVideos, getGares } from '@/composables/serviceAjax.js'

let items = ref()
let itemsAll = ref()

let fields = ref()
fields.value = [
    { key: 'id', label: "id", type: "number", sortable: true, sort: 1, filter: "" },
    { key: 'titre', label: "Nom", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'lesPays.nom', label: "Pays", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'lesCategories.lib', label: "Catégories", type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'lesActeurs.nom', label: "Acteurs", type: "string", sortable: true, sort: 1, filter: "" },
]
// let nomKeyword = ref("")
// let spKeyword = ref("")
// let habitatKeyword = ref("")


onMounted(async () => {
    await getVideos()
        .then(response => {
            items.value = response;
            console.log("items", items)
            fields.value.forEach((field) => {
                let t = field.key.split(".")
                let lg = t.length
                items.value.forEach((item) => {
                    if (lg == 1) {
                        if (Array.isArray(item[field.key])) {
                            let value = ''
                            item[field.key].forEach((val) => { value += " " + val })
                            item[field.key] = value
                        } else { }
                    }
                    if (lg == 2) {
                        if (Array.isArray(item[t[0]])) {
                            let value = ''
                            item[t[0]].forEach((val) => { value += " " + val[t[1]] })
                            item[field.key] = value
                        } else { item[field.key] = item[t[0]][t[1]] }
                    }
                    if (lg == 3) {
                        if (Array.isArray(item[t[0]][t[1]])) {
                            let value = ''
                            item[t[0]][t[1]].forEach((val) => { value += " " + val[t[2]] })
                            item[field.key] = value
                        } else { item[field.key] = item[t[0]][t[1]][t[2]] }
                    }
                })
            })
            console.log("items 2", items)
            itemsAll.value = items.value
        })
        .catch(error => console.log('erreur Ajax', error))
})
//
const sortCol = (items, field) => {
    const compareString = (a, b) => {
        return a[field.key].toLowerCase() > b[field.key].toLowerCase() ? 1 * field.sort : -1 * field.sort
    }
    const compareNumber = (a, b) => {
        return parseFloat(a[field.key]) > parseFloat(b[field.key]) ? 1 * field.sort : -1 * field.sort
    }
    if (field.type == 'number') { items = items.sort(compareNumber) }
    else { items = items.sort(compareString) }
    field.sort = field.sort * -1
}

const tableFilter = (field) => {
    items.value = itemsAll.value.filter((villageois) => {
        return villageois[field.key].toLowerCase().includes(field.filter.toLowerCase())
    })
}
// const nomFilter = () => {
//     items.value = itemsAll.value.filter((villageois) => {
//         return villageois.nom.toLowerCase().includes(nomKeyword.value.toLowerCase())
//     })
// }
// const spFilter = () => {
//     items.value = itemsAll.value.filter((villageois) => {
//         return villageois.laSpecialite.nom.toLowerCase().includes(spKeyword.value.toLowerCase())
//     })
// }
// const habitatFilter = () => {
//     items.value = itemsAll.value.filter((villageois) => {
//         return villageois.leLieuHabitat.nom.toLowerCase().includes(habitatKeyword.value.toLowerCase())
//     })
// }


</script>
<template>
    <div class="container-fluid fondblanc">
        <h1 class="textNoir">Tris & Filtres 02</h1>
        <div class="card">
            <h5 class="card-title textNoir">Filtrages</h5>
            <!-- <div class="card-body">
                <div class="input-group">
                    <div class="input-group-text">Nom</div>
                    <input class="form-control" placeholder="Nom" v-model="nomKeyword" @input="nomFilter">
                    <div class="input-group-text">Spécialité</div>
                    <input class="form-control" placeholder="Spécialité" v-model="spKeyword" @input="spFilter">
                    <div class="input-group-text">Habitat</div>
                    <input class="form-control" placeholder="Habitat" v-model="habitatKeyword" @input="habitatFilter">
                </div>
            </div> -->
        </div>


        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th v-for="field in fields" :key='field'>
                        <div class="input-group-text w-100 mb-2">
                            <span class="col-10">{{field.label}}</span>
                            <span class="col-2">
                                <i v-if="field.sortable" class="fa fa-sort fa-sm float-right"
                                    @click="sortCol(items,field)"></i>
                            </span>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="fa fa-filter fa-sm"></i>
                            </span>
                            <input class="form-control" @input="tableFilter(field)" v-model="field.filter" />

                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key='item'>
                    <td v-for="field in fields" :key="'field'">
                        {{item[field.key]}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
.fondblanc {
    background-color: white;
}

.textNoir {
    color: black;
}
</style>