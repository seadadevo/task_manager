import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../views/TaskList.vue';


// import NotFoundView from '@/view/NotFoundView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: TaskList
        },
        // {
        //     path: '/:pathMatch(.*)*',
        //     name: 'not-found',
        //     component: NotFoundView,
        // },
    ]
})


export default router
