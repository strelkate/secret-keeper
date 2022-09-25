import {createRouter, createWebHistory} from 'vue-router'
import Keeper from '../views/Keeper.vue'

export const PathHome = '/'
export const PathLogin = '/login'
export const PathSignup = '/signup'
export const PathSecret = '/secret'
export const PathAddNewPassword = '/add-new-password'
export const PathEditPassword = '/edit-password/:id'
export const PathSettings = '/settings'
export const PathEditDirectory = '/edit-directory'

const routes = [
	{
		path: PathHome,
		name: 'Keeper',
		component: Keeper
	},
	{
		path: PathLogin,
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
	{
		path: PathSignup,
		name: 'Signup',
		component: () => import('../views/Signup.vue'),
	},
	{
		path: PathSecret,
		name: 'Secret',
		component: () => import('../views/Secret.vue'),
	},
	{
		path: PathAddNewPassword,
		name: 'AddNewPassword',
		component: () => import('../views/AddNewPassword.vue'),
	},
	{
		path: PathEditPassword,
		name: 'EditPassword',
		component: () => import('../views/EditPassword.vue'),
		props: true
	},
	{
		path: PathSettings,
		name: 'Settings',
		component: () => import('../views/Settings.vue')
	},
	{
		path: PathEditDirectory,
		name: 'EditDirectory',
		component: () => import('../views/EditDirectory.vue')
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
