<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col class="mt-2" cols="12">
        <v-sheet class="fill-height d-flex align-center justify-center">
          {{ $route }}
          <div>
    <h1>404 - Page Not Found</h1>
    <p>This page no longer exists or was moved to another location.</p>
    <p>Visit home page <router-link to="/">here</router-link></p>
  </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
  
</template>