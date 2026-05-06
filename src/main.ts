//import createApp from Vue
import { createApp } from 'vue';

// Impor file CSS utama Anda agar Tailwind dimuat
import './style.css';

//import component App
import App from './App.vue';

//import config router
import routes from './routes';

//create App Vue
const app = createApp(App);

//use routes on vue
app.use(routes);

app.mount('#app');