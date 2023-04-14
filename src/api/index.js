import axios from 'axios'

const request = axios.create({
	// 指定请求HTTP响应码错误范围
	validateStatus: function(status) {
		return true
	},
	// 指定基本的url地址
	baseURL: 'http://127.0.0.1:8001',
})


// 给请求添加token用的
// 添加请求拦截器：每次请求接口都会自动调用
request.interceptors.request.use(function(config) {
	// 在发送请求之前,判断是否有token
	if (window.sessionStorage.getItem('token')) {
		config.headers.Authorization = 'JWT ' + window.sessionStorage.getItem('token')
	}
	console.log('请求头', config.headers)
	return config;
})



export default request