import { createWebHistory, createRouter } from "vue-router";
//import IntroPage from '../components/IntroPage';
import GalleryPage from '../components/GalleryPage';
import HelloWorld from '../components/HelloWorld';

import AppVue from '../App';

const routes = [
    {
        path: "/",
        name: "Home",
        component: AppVue,
    },
    {
        path: "/hello",
        name: "hello",
        component: HelloWorld,
    },
    // {
    //     path: "/intro",
    //     name: "Home",
    //     component: IntroPage,
    // },
    {
        path: "/gallery",
        name: "gallery",
        component: GalleryPage,
    },
    // {
    //     path: "/about",
    //     name: "About",
    //     component: () => import("../views/About.vue"),
    // },
]

//VueRouter에 route를 등록하고 설정한다.
const router = new createRouter({
    history: createWebHistory(),
    routes,
});

//설정한 VueRouter 내보낸다.
export default router;