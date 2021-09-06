import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/auth/Login.vue";
import Help from "../components/views/Help.vue";
import RoutePlan from "../components/views/RoutePlan.vue";
import Statistics from "../components/views/Statistics.vue";
import NotFound from "../components/views/errors/NotFound.vue";

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login
	},
	{
		path: '/login',
		redirect: '/'
	},
	{
		path: '/routeplan',
		name: 'RoutePlan',
		component: RoutePlan
	},
	{
		path: '/statistics',
		name: 'Statistics',
		component: Statistics
	},
	{
		path: '/help',
		name: 'Help',
		component: Help
	},
	// catch all 404
	{
		path: '/:catchAll(.*)',
		name: 'NotFound',
		component: NotFound
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router