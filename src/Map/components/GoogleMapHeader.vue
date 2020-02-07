<template>
  <div class="d-flex flex-nowrap">
    <gmap-autocomplete class="introInput" @place_changed="setPlace">
      <template v-slot:input="slotProps">
        <v-text-field
          outlined
          prepend-inner-icon="place"
          placeholder="Location Of Event"
          ref="input"
          v-on:listeners="slotProps.listeners"
          v-on:attrs="slotProps.attrs"
          width="500"
        />
      </template>
    </gmap-autocomplete>
    <v-btn-toggle>
      <v-btn icon min-height="56" min-width="56" @click="addMarkerFromPlace">
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn icon min-height="56" min-width="56" @click="handleDeletePoint">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  name: 'GoogleMapHeader',
  data() {
    return {
      currentPlace: null
    }
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place
    },
    addMarkerFromPlace() {
      this.$emit('addMarkerFromPlace', this.currentPlace)
    },
    handleDeletePoint() {
      this.$emit('handleDeletePoint')
    }
  }
}
</script>

<style scoped>
.introInput {
  width: 80%;
}
</style>