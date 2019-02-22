import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import Stocks from './components/Stocks.vue'
import Portfolio from './components/Portfolio.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home, exact: true },
    { path: '/portfolio', component: Portfolio },
    { path: '/stocks', component: Stocks }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;