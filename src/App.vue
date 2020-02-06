<template>
  <v-app>
    <div class="main-wrapper">
      <v-card width="720">
        <v-card-title>Google map</v-card-title>
        <v-card-text class="d-flex justify-center">
          <GoogleMap />
        </v-card-text>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import GoogleMap from './Map'

export default {
  name: 'app',
  components: {
    GoogleMap
  }
}
</script>

<style scoped lang="scss">
.main-wrapper {
  > div {
    margin: 0 auto;
  }
}
</style>