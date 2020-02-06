import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp'
import '@babel/polyfill'

Vue.config.productionTip = false
const googleMapsApiKey = 'AIzaSyCTWGvoJ2pxkg4JPTUTbASKT-iTsxoz9RY'

Vue.use(VueGoogleMaps, {
  load: {
    key: googleMapsApiKey,
    libraries: 'places'
  }
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
