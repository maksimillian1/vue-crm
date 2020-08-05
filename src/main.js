import Vue from 'vue'
import Vuelidate from 'vuelidate';
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin'
import dateFilter from '@/filters/date.filter'
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'materialize-css/dist/js/materialize.min'
import './registerServiceWorker'


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDbkamvdeTJGh_OKWStthYjt2aM5WtY8Hs",
  authDomain: "vuejs-crm-test.firebaseapp.com",
  databaseURL: "https://vuejs-crm-test.firebaseio.com",
  projectId: "vuejs-crm-test",
  storageBucket: "vuejs-crm-test.appspot.com",
  messagingSenderId: "214018541204",
  appId: "1:214018541204:web:a98ef94d45d9b2d9d7d681",
  measurementId: "G-XHW0FTNBHC"
})

let app;
firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }  
})