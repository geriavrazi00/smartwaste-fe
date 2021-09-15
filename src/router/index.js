import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Help from "../views/Help.vue";
import RoutePlan from "../views/RoutePlan.vue";
import RoutePlan2 from "../views/RoutePlan2.vue";
import Statistics from "../views/Statistics.vue";
import NotFound from "../views/errors/NotFound.vue";

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
		path: '/statistics',
		name: 'Statistics',
		component: Statistics
	},
	{
		path: '/routeplan',
		name: 'RoutePlan',
		component: RoutePlan
	},
	{
		path: '/routeplan2',
		name: 'RoutePlan2',
		component: RoutePlan2
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