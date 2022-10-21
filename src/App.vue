<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-dark justify-content-between">
      <RouterLink class="navbar-brand" to="/">VueJs-ChartJs </RouterLink>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/setup">Setup</RouterLink>
            <!-- <a class="nav-link" href="#">Setup</a> -->
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Firebase</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Service">Services</a>
          </li>
          <li>
            <a class="nav-link" href="/Service2">Services 2</a>
          </li>
          <li class="nav-item dropdown mr-0">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              Tri & Filtre
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <RouterLink class="dropdown-item" to="/TriFiltre01">Tri & Filtre 1</RouterLink>
              <RouterLink class="dropdown-item" to="/TriFiltre02">Tri & Filtre 2</RouterLink>
              <RouterLink class="dropdown-item" to="/TriFiltre03">Tri & Filtre 3</RouterLink>
              <RouterLink class="dropdown-item" to="/TriFiltre04">Tri & Filtre 4</RouterLink>
              <RouterLink class="dropdown-item" to="/TriFiltre05">Tri & Filtre 5</RouterLink>
            </div>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/Map">Géoloc</RouterLink>

          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/Sncf">SNCF</RouterLink>

          </li>

          <li class="nav-item dropdown mr-0">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              ChartJs
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <RouterLink class="dropdown-item" to="/barchart">Barchart</RouterLink>
              <a class="dropdown-item" href="/LineChart">LineChart</a>
              <a class="dropdown-item" href="#">BubbleChart</a>
              <RouterLink class="dropdown-item" to="/Pie"> Pie</RouterLink>

              <RouterLink class="dropdown-item" to="/Area"> Area</RouterLink>
              <RouterLink class="dropdown-item" to="/Radar"> Radar</RouterLink>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Villageois</a>
            </div>
          </li>

          <li class="nav-item dropdown mr-0">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown02" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              TP
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdown2">
              <a class="dropdown-item disabled" href="#"><b>VueJs</b></a>
              <a class="dropdown-item" href="#">TP01 - xxxx</a>
              <a class="dropdown-item" href="#">TP02 - xxxx</a>
              <a class="dropdown-item" href="#">TP03 - xxxx</a>
              <a class="dropdown-item" href="#">TP04 - xxxx</a>
              <a class="dropdown-item" href="#">TP05 - xxxx</a>
              <a class="dropdown-item" href="#">TP06 - xxxx</a>
              <a class="dropdown-item" href="#">TP07 - xxxx</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item disabled" href="#"><b>ChartJs</b></a>
              <a class="dropdown-item" href="#">TP01 - xxxx</a>
              <a class="dropdown-item" href="#">TP02 - xxxx</a>
              <a class="dropdown-item" href="#">TP03 - xxxx</a>
              <a class="dropdown-item" href="#">TP04 - xxxx</a>
              <a class="dropdown-item" href="#">TP05 - xxxx</a>
              <a class="dropdown-item" href="#">TP06 - xxxx</a>
              <a class="dropdown-item" href="#">TP07 - xxxx</a>
            </div>
          </li>
        </ul>

        <form class="form-inline input-group-sm ml-auto">
          <input class="form-control mr-2" placeholder="Login" />
          <input class="form-control mr-2" placeholder="Password" />
          <button class="btn btn-dark ml-auto" type="submit">
            <i class="fa fa-power-off"></i>
          </button>
        </form>
      </div>
    </nav>
  </div>
  <RouterView />
</template>

