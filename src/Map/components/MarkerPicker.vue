<template>
  <v-card-subtitle class="d-flex flex-wrap">
    <v-btn v-for="(marker, index) in markers" :key="index" icon @click="setCurrentMarker(marker)">
      <v-icon v-if="(marker.lat === lastMarker.lat) && (marker.lng === lastMarker.lng)">place</v-icon>
      <v-icon v-else>my_location</v-icon>
    </v-btn>
  </v-card-subtitle>
</template>

<script>
export default {
  name: 'MarkerPicker',
  props: {
    markers: Array,
    lastMarker: Object
  },
  methods: {
    setCurrentMarker(markerPosition) {
      this.$emit('handleCurrentMarker', markerPosition)
    }
  }
}
</script>