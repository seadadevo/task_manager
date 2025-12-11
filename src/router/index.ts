import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../views/TaskList.vue';
import AddTaskView from '../views/AddTaskView.vue';
import EditTaskView from '../views/EditTaskView.vue';
import TaskDetailView from '../views/TaskDetailView.vue';


// import NotFoundView from '@/view/NotFoundView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: TaskList
        },
        {
            path: '/add-task',
            name: 'add-task',
            component: AddTaskView
        },
        {
            path: '/edit/:id',
            name: 'edit-task',
            component: EditTaskView
        },
        {
            path: '/tasks/:id',
            name: 'task-detail',
            component: TaskDetailView
    }
        // {
        //     path: '/:pathMatch(.*)*',
        //     name: 'not-found',
        //     component: NotFoundView,
        // },
    ]
})


export default router
