import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login.vue"
import Home from "../components/Home.vue"
import Interface from "../components/Interface.vue"
import Cases from "../components/Cases.vue"
import Projects from "../components/Projects.vue"


Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect:'/home'
	},{
	path: '/login',
	name: 'login',
	component: Login
	},{
	path: '/home',
	name: 'home',
	component: Home,
	redirect:'/projects',
	children:[
		{
		path: '/cases',
		name:'cases',
		component: Cases
		},{
		path: '/interface',
		name: 'interface',
		component: Interface
		},{
		path: '/projects',
		name:'/projects',
		component: Projects
		}
		
	]},	
]

const router = new VueRouter({
  routes
})

// 添加路由导航守卫
// 添加路由导航守卫
// 用来对访问的路由进行权限控制
// 除了login这个路由其他的路由都要进行了登录之后才能访问
router.beforeEach((to, from, next) => {
	// console.log(to)
	// console.log(from)
	// console.log(next)
	// 判断访问的是否是登录页面
	// if (to.path === '/login') {
	// 	return next()
	// 	// 判断当前sessionStorage中是否有token(判断是否登录过)
	// } else if (window.sessionStorage.getItem('token')) {
	// 	return next()
	// } else {
	// 	return next('/login')
	// }
	
	if(to.path=== '/login' || window.sessionStorage.getItem('token')) return next()
	return next('/login')
})



export default router
