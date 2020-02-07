<template>
  <v-card flat>
    <!-- <MarkerPicker
      v-if="currentMarkerType!='simpleMarker'"
      :markers="polyline.path"
      :lastMarker="lastMarker"
      @handleCurrentMarker="handleCurrentMarker"
    />-->
    <GoogleMapHeader
      @handleDeletePoint="handleDeletePoint"
      @addMarkerFromPlace="addMarkerFromPlace"
    />
    <v-card-text>
      <v-btn @click="hadleHideButton" text width="100%">{{ isInputsShow ? 'hide' : 'open' }}</v-btn>
      <MapInputs
        :markerTypes="markerTypes"
        :currentMarkerType="currentMarkerType"
        :lastMarker="lastMarker"
        :isInputsShow="isInputsShow"
        :area="area"
        @handleMarkerType="handleMarkerType"
        @handlePositionInput="handlePositionInput"
      />
      <Map
        :marker="marker"
        :lastMarker="lastMarker"
        :polylinePath="polylinePath"
        :polygonPath="polygonPath"
        :currentMarkerType="currentMarkerType"
        @handleOnMapClick="handleOnMapClick"
        @handleCurrentMarker="handleCurrentMarker"
        @handleDragMarker="handleDragMarker"
        @handleDragPolyline="handleDragPolyline"
        @calcArea="calcArea"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import Map from './components/GoogleMap'
import MapInputs from './components/MapInputs'
import MarkerPicker from './components/MarkerPicker'
import GoogleMapHeader from './components/GoogleMapHeader'
export default {
  name: 'GoogleMap',
  components: {
    Map,
    MapInputs,
    MarkerPicker,
    GoogleMapHeader
  },
  data() {
    return {
      lastMarker: {
        lat: null,
        lng: null
      },
      currentPlace: null,
      marker: {},
      polyline: {
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      },
      polylinePath: [],
      polygonPath: [],
      markerTypes: [
        {
          //simple marker
          text: 'Simple marker',
          value: 'simpleMarker'
        },
        {
          //polyline
          text: 'Geotrace',
          value: 'geotrace'
        },
        {
          //polygon
          text: 'Geoshape',
          value: 'geoshape'
        }
      ],
      currentMarkerType: 'simpleMarker',
      area: null,
      isInputsShow: true
    }
  },
  methods: {
    hadleHideButton() {
      this.isInputsShow = !this.isInputsShow
    },
    getCurrentPosition: function() {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = parseFloat(position.coords.latitude)
        const lng = parseFloat(position.coords.longitude)
        this.lastMarker = { lat, lng }
      })
    },
    handleMarkerType(markerType) {
      this.marker = {}
      this.polylinePath = []
      this.polygonPath = []
      this.currentMarkerType = markerType
    },
    handleOnMapClick(position) {
      this.lastMarker = { ...position }

      switch (this.currentMarkerType) {
        case 'simpleMarker':
          this.marker = {
            ...position
          }
          break
        case 'geotrace':
          this.polylinePath.push({ ...position })
          break
        default:
        case 'geoshape':
          this.polylinePath.push({ ...position })
          this.polygonPath.push({ ...position })
          this.calcArea(this.polygonPath)
          break
      }
    },
    handleDragMarker(oldPosition, newPosition) {
      this.lastMarker = { ...newPosition }
      this.marker = { ...newPosition }
    },
    handleDragPolyline(newPathes) {
      this.polylinePath = [...newPathes]
      if (this.currentMarkerType === 'geoshape') {
        this.polygonPath = [...newPathes]
      }
    },
    handleCurrentMarker(markerPosition) {
      this.lastMarker = markerPosition
    },
    addMarkerFromPlace(place) {
      const lat = parseFloat(place.geometry.location.lat())
      const lng = parseFloat(place.geometry.location.lng())
      this.handleOnMapClick({ lat, lng })
    },
    handleDeletePoint() {
      switch (this.currentMarkerType) {
        case 'simpleMarker':
          this.marker = {}
          break
        case 'geotrace':
          this.polylinePath.pop()
          break
        default:
        case 'geoshape':
          this.polylinePath.pop()
          this.polygonPath.pop()
          break
      }
    },
    handlePositionInput(type, newPosition) {
      const { lastMarker, polylinePath } = this
      switch (this.currentMarkerType) {
        case 'simpleMarker':
          this.marker = {
            ...this.marker,
            [`${type}`]: newPosition
          }
          this.lastMarker = {
            ...this.lastMarker,
            [`${type}`]: newPosition
          }
          break
        case 'geotrace':
          const changedTracePathIndex = polylinePath.findIndex(path => path.lat === lastMarker.lat && path.lng === lastMarker.lng)
          this.polylinePath[changedTracePathIndex] = {
            ...this.polylinePath[changedTracePathIndex],
            [`${type}`]: newPosition
          }
          this.lastMarker = {
            ...this.lastMarker,
            [`${type}`]: newPosition
          }
          break
        case 'geoshape':
          const changedShapePathIndex = polylinePath.findIndex(path => path.lat === lastMarker.lat && path.lng === lastMarker.lng)
          this.polylinePath[changedShapePathIndex] = {
            ...this.polylinePath[changedShapePathIndex],
            [`${type}`]: newPosition
          }
          this.polygonPath[changedShapePathIndex] = {
            ...this.polygonPath[changedShapePathIndex],
            [`${type}`]: newPosition
          }
          this.lastMarker = {
            ...this.lastMarker,
            [`${type}`]: newPosition
          }
          break
      }
    },
    calcArea(path) {
      let newPolygon = new google.maps.Polygon({
        path
      })
      this.area = google.maps.geometry.spherical.computeArea(newPolygon.getPath())
    }
  },
  created() {
    this.getCurrentPosition()
  }
}
</script>