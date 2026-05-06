import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/js-ts',
        name: 'jsTs',
        component: () => import('../views/JsTsView.vue')
    },
    {
        path: '/php-laravel',
        name: 'phpLaravel',
        component: () => import('../views/PhpLaravelView.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router