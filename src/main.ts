import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/main.scss';

const app = createApp(App);
app.config.globalProperties.$store = store;
createApp(App).use(store).use(router).mount('#app');
