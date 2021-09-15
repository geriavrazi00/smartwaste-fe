<template>
  <div class="sidebar">
    <div class="image-container">
        <img src="../assets/images/smartwaste-logo.png"/>
    </div>

    <div class="route-container">
      <router-link :to="{ name: 'Statistics'}" style="display: flex;">
        <div class="col-3"><font-awesome-icon icon="chart-pie"/></div> <div class="col-9">{{ $t('menu.statistics') }}</div>
      </router-link>
      <router-link :to="{ name: 'RoutePlan'}" style="display: flex;">
        <div class="col-3"><font-awesome-icon icon="route"/></div> <div class="col-9">{{ $t('menu.routeplan') }}</div>
      </router-link>
      <router-link :to="{ name: 'RoutePlan2'}" style="display: flex;">
        <div class="col-3"><font-awesome-icon icon="route"/></div> <div class="col-9">MapBox</div>
      </router-link>
      <router-link :to="{ name: 'Help'}" style="display: flex;">
        <div class="col-3"><font-awesome-icon icon="question"/></div> <div class="col-9">{{ $t('menu.help') }}</div>
      </router-link>
    </div>

    <div class="logout-container">
      <router-link :to="{ name: 'Login'}" class="logout-route" style="display: flex;">
        <div class="col-3"><font-awesome-icon icon="sign-out-alt"/></div> <div class="col-9"> {{ $t('auth.logout') }}</div>
      </router-link>
    </div>

    <hr class="line"/>
  </div>
</template>

<style>
  /* The side navigation menu */
  .sidebar {
    margin: 0;
    padding: 10px;
    width: 245px;
    background-color: #fff;
    position: fixed;
    height: 100%;
    overflow: auto;
    box-shadow: 0px 3px 40px #00000029;
  }

  /* Sidebar links */
  .sidebar a {
    display: block;
    color: black;
    padding: 8px;
    text-decoration: none;
    border-radius: 8px;
    background-color: rgba(55, 206, 183, 0.1);
    /* text-align: center; */
    font-family: 'ttcommons-bold';
    transition: all .2s;
  }

  /* Links on mouse-over */
  .sidebar a:hover:not(.active) {
    background-color: rgba(55, 206, 183, 0.5);
    color: white;
  }

  .router-link-exact-active {
    background-color: #37CEB7!important;
  }

  .image-container {
    text-align: center;
    margin-top: 50px;
  }

  .route-container {
    margin-top: 70%;
  }

  .logout-container {
    margin-top: 100%;
  }

  .line {
    color: #37CEB7;
    height: 2px!important;
  }

  .logout-route {
    background-color: white!important;
  }

  .logout-route:hover {
    background-color: rgba(55, 206, 183, 0.5)!important;
  }

  /* On screens that are less than 700px wide, make the sidebar into a topbar */
  /* @media screen and (max-width: 700px) {
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
    }
    .sidebar a {float: left;}
    div.content {margin-left: 0;}

    .image-container {
      display: none;
    }

    .route-container {
      margin-top: 0;
    }

    .logout-container {
      margin-top: 0;
    }

    .line {
      display: none;
    }
  } */

  /* On screens that are less than 400px, display the bar vertically, instead of horizontally */
  @media screen and (max-width: 500px) {
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
    }
    .sidebar a {float: left;}
    div.content {margin-left: 0;}

    .sidebar a {
      text-align: center;
      float: none;
    }

    .image-container {
      display: none;
    }

    .route-container {
      margin-top: 0;
    }

    .logout-container {
      margin-top: 0;
    }

    .line {
      display: none;
    }
  }
</style>