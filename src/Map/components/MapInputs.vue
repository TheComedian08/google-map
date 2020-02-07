<template>
  <v-expand-transition>
    <div v-show="isInputsShow">
      <v-select :items="markerTypes" v-model="computedMarkerType" />
      <v-text-field type="number" label="Latitude" v-model="latitude" step="0.001" />
      <v-text-field type="number" label="Longitude" v-model="longitude" step="0.001" />
      <v-text-field :value="area" v-if="computedMarkerType==='geoshape'" disabled label="area, m²" />
    </div>
  </v-expand-transition>
</template>

<script>
export default {
  name: 'MapInputs',
  props: {
    markerTypes: Array,
    currentMarkerType: String,
    lastMarker: Object,
    isInputsShow: Boolean,
    area: String
  },
  data() {
    return {
      number: null
    }
  },
  computed: {
    computedMarkerType: {
      get() {
        return this.currentMarkerType
      },
      set(markerType) {
        this.$emit('handleMarkerType', markerType)
      }
    },
    latitude: {
      get() {
        return this.lastMarker.lat
      },
      set(val) {
        this.$emit('handlePositionInput', 'lat', parseFloat(val))
      }
    },
    longitude: {
      get() {
        return this.lastMarker.lng
      },
      set(val) {
        this.$emit('handlePositionInput', 'lng', parseFloat(val))
      }
    }
  }
}
</script>