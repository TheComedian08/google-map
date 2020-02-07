<template>
  <GmapMap
    :center="lastMarker"
    :zoom="7"
    :options="options"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
    @click="handleOnMapClick"
  >
    <template v-if="currentMarkerType==='simpleMarker'">
      <GmapMarker
        :position="!!marker.lng ? marker : lastMarker"
        :clickable="true"
        :draggable="true"
        @click="onMarkerClick"
        @dragend="(e)=>onDragEnd(e, marker)"
      />
    </template>
    <GmapPolyline
      v-else-if="currentMarkerType !== 'simpleMarker'"
      :path="polylinePath"
      :geodesic="polylineOption.geodesic"
      :strokeColor="polylineOption.strokeColor"
      :strokeOpacity="polylineOption.strokeOpacity"
      :strokeWeight="polylineOption.strokeWeight"
      :editable="true"
      :immediate="true"
      @click="onMarkerClick"
      @path_changed="onDragPolyline"
    />
    <GmapPolygon
      v-if="currentMarkerType=== 'geoshape'"
      :paths="polygonPath"
      :editable="true"
      @paths_changed="onDragPolygon"
      @click="onMarkerClick"
    />
  </GmapMap>
</template>

<script>
export default {
  name: 'Map',
  props: {
    marker: Object,
    lastMarker: Object,
    currentMarkerType: String,
    polylinePath: Array,
    polygonPath: Array
  },
  data() {
    return {
      options: {
        mapTypeControl: true,
        disableDefaultUi: true,
        fullscreenControl: false,
        streetViewControl: false
      },
      polylineOption: {
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      }
    }
  },
  methods: {
    handleOnMapClick(e) {
      const lat = parseFloat(e.latLng.lat())
      const lng = parseFloat(e.latLng.lng())
      this.$emit('handleOnMapClick', { lat, lng })
    },
    onMarkerClick(e) {
      const lat = parseFloat(e.latLng.lat())
      const lng = parseFloat(e.latLng.lng())
      this.$emit('handleCurrentMarker', { lat, lng })
    },
    onDragEnd(e, oldPosition) {
      const lat = parseFloat(e.latLng.lat())
      const lng = parseFloat(e.latLng.lng())
      this.$emit('handleDragMarker', { ...oldPosition }, { lat, lng })
    },
    onDragPolyline(e) {
      const pathes = e.g.map(path => {
        const lat = parseFloat(path.lat())
        const lng = parseFloat(path.lng())
        return { lat, lng }
      })
      this.$emit('handleDragPolyline', pathes)
    },
    onDragPolygon(e) {
      const pathes = e.g[0].g.map(path => {
        const lat = parseFloat(path.lat())
        const lng = parseFloat(path.lng())
        return { lat, lng }
      })
      this.$emit('handleDragPolyline', pathes)
      this.$emit('calcArea', pathes)
    }
  }
}
</script>