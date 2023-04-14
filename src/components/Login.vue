<template>
	<div class="login_box">
		<el-card class="box-card">
			<div class="title">
				自 动 化 平 台 登 录
			</div>
			<el-form :model="formLogin" :rules="loginRules" ref='loginRef'>
				<el-form-item prop="username">
					<el-input v-model="formLogin.username" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="formLogin.password" type='password' prefix-icon="el-icon-lock"
						placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item label="记住账号">
					<el-switch v-model="formLogin.status"></el-switch>
				</el-form-item>
				<el-form-item style="text-align: center;">
					<el-button type="primary" @click="loginHandle">点击登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>

</template>

<script>
	/*
	一、输入框数据验证
		1、在 el-form 标签上绑定rules属性，指定校验的规则对象
		2、在data中定义绑定校验规则
		3、在 el-form-item 标签中通过prop指定校验的字段
	
	二、点击登录对表单进行预验证
		1、在 el-form 标签通过ref属性，设置表单引用对象
		2、在点击登录的处理函数中，通过this.$resf.表单引用对象，获取表单对象，调用表单对象的validate方法进行校验
	*/
	export default {
		data() {
			return {
				formLogin: {
					username: '',
					password: '',
					status: false,
				},
				loginRules: {
					username: [{
						required: true,
						message: '账号不能为空',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: '密码不能为空',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 18,
							message: '密码的长度在6到18之间',
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			// 点击登录之后，处理登录的方法
			loginHandle: function() {
				// 验证表单，验证通过再发送登录请求
				this.$refs.loginRef.validate(async (valid) => {
					console.log('表单验证的结果', valid)
					// 判断是否验证通过，没有通过则，终止函数执行
					if (!valid) return

					// -----判断是否要记住账号-----
					if (this.formLogin.status) {
						// 勾选则保存账号到localStorage中
						window.localStorage.setItem('username', this.formLogin.username)
					} else {
						// 没有勾选则删除localStorage中的账号
						window.localStorage.removeItem('username')
					}
					// 验证通过的情况下，发送请求登录
					console.log('请求登录接口')
					const response = await this.$request.post('/login/', this.formLogin)
					console.log(response)
					// 判断登录请求是否成功 
					if (response.status === 200) {
						this.$message({
							message: '登录成功',
							type: 'success',
							duration: 1000
						});
						// duration: 1000，弹窗停留1s消失
						window.sessionStorage.setItem('token', response.data.token)
						this.$router.push('/home')
					} else {
						this.$message.error('登录失败');
					}
				})
			}
		},
		// 组件中的数据挂载到模板中之后，会触发这个生命周期钩子函数
		mounted(){
			// 获取localStorage中的账号,设置到data中
			const username = window.localStorage.getItem('username')
			if(username){
				this.formLogin.username = username
				this.formLogin.status = true
			}
		}
	}
</script>

<style scoped>
	/**
	 * 在style中，添加scoped属性，表示css样式，只对当前组件生效。
	 */
	.login_box {
		width: 600px;
		height: 400px;
		margin: 200px auto;
	}

	.title {
		color: #409eff;
		font: bold 28px/60px "microsoft yahei";
		width: 100%;
		text-align: center;
		margin-bottom: 25px;
	}
</style>
