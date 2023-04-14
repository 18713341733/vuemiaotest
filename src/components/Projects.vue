<template>
	<div class="project_list">
		<el-card class="box-card">
			<!-- 顶部的面包屑 -->
			<div slot="header" class="clearfix">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>项目管理</el-breadcrumb-item>
					<el-breadcrumb-item>项目列表</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-card class="box-card">
				<!-- 添加项目的按钮 -->
				<el-button type="primary" icon='el-icon-plus' @click='dialogCreate="true"'>创建项目</el-button>
				<!-- 项目列表页 -->
				<el-table :data="projectList" style="width: 100%;margin-bottom: 10px;">
					<el-table-column prop="id" label="ID" width="80" sortable>
					</el-table-column>
					<el-table-column prop="name" label="项目名" width="200">
					</el-table-column>
					<el-table-column prop="desc" label="描述信息" width="280">
					</el-table-column>
					<el-table-column prop="leader" label="负责人" width="100" sortable>
					</el-table-column>
					<el-table-column prop="tester" label="测试人员" width="100">
					</el-table-column>
					<el-table-column prop="interfaces" label="接口数量" width="120" sortable>
					</el-table-column>
					<el-table-column prop="testcases" label="用例数量" width="80">
					</el-table-column>
					<el-table-column prop="testsuits" label="套件数量" width="80">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="proEdit(scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="proDelete(scope.row.id)">删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 项目翻页管理 -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="page" :page-sizes="[5, 10, 20, 30]" :page-size="size"
					layout="total, sizes, prev, pager, next, jumper" :total="count">
				</el-pagination>
			</el-card>
		</el-card>

		<!-- 编辑项目的弹框 -->
		<el-dialog title="编辑项目" :visible.sync="dialogEdit">
			<el-form :model="editProject" :rules="caseRules" ref='updateRef' label-width="80px">
				<el-form-item label="项目名" prop="name">
					<el-input v-model="editProject.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="负责人" prop="leader">
					<el-input v-model="editProject.leader" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="测试人员" prop="tester">
					<el-input v-model="editProject.tester" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="开发人员"  prop="programmer">
					<el-input v-model="editProject.programmer" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="发布应用" prop="publish_app">
					<el-input v-model="editProject.publish_app" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述信息">
					<el-input type="textarea" v-model="editProject.desc" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEdit = false">取 消</el-button>
				<el-button type="primary" @click="updateProject">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 创建项目的弹框 -->
		<el-dialog :visible.sync="dialogCreate" :rules="caseRules" ref='createRef'>
			<template slot='title'>
				<div style="text-align: center;width: 100%;font-size: 24px;">创建项目</div>
			</template>
			<el-form :model="newProject" label-width="80px" size='mini' :rules="caseRules" ref='createRef'>
				<el-form-item label="项目名称" prop="name">
					<el-input v-model="newProject.name"></el-input>
				</el-form-item>
				<el-form-item label="测试者" prop="tester">
					<el-input v-model="newProject.tester" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="负责人" prop="leader">
					<el-input v-model="newProject.leader" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="开发人员" prop="programmer">
					<el-input v-model="newProject.programmer" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="发布应用" prop="publish_app">
					<el-input v-model="newProject.publish_app" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="项目描述">
					<el-input type="textarea" :rows="5" v-model="newProject.desc"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogCreate = false">取 消</el-button>
				<el-button type="primary" @click="createProject">提 交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				projectList: [],
				// 当前选择的页码
				page: 1,
				// 数据总数
				count: 0,
				//每页的数据量
				size: 10,
				//编辑窗口显示
				dialogEdit: false,
				editProject: {},
				//创建项目
				dialogCreate: false,
				newProject: {
					name: '',
					leader: '',
					tester: '',
					programmer: '',
					publish_app: '',
					desc: ''
				},
				// 校验规则
				caseRules: {
					name: [{
						required: true,
						message: '项目名不能为空',
						trigger: 'blur'
					}],
					leader: [{
						required: true,
						message: '负责人不能为空',
						trigger: 'blur'
					}, ],
					tester: [{
						required: true,
						message: '测试人员不能为空',
						trigger: 'blur'
					}, ],
					programmer: [{
						required: true,
						message: '开发人员不能为空',
						trigger: 'blur'
					}, ],
					publish_app: [{
						required: true,
						message: '发布应用不能为空',
						trigger: 'blur'
					}, ]
				}

			}
		},
		methods: {
			// 创建项目的方法
			createProject() {
				// 发送请求之前对表单进行预验证
				this.$refs.createRef.validate(async (valid) => {
					if (!valid) return
					// 验证通过，发送请求
					const response = await this.$request.post('/projects/', this.newProject)
					if (response.status === 201) {
						this.$message({
							type: 'success',
							message: '项目创建成功!',
							duration: 1000
						});
						// 更新页面的数据
						this.getProject()
						// 关闭弹框
						this.dialogCreate = false
					} else {
						console.log(response)
						this.$message.error('服务端异常!')
					}

				})
			},
			// 编辑项目
			proEdit(value) {
				console.log(value)
				// 把接收到的项目数据，
				this.editProject = {
					...value
				}
				// 显示编辑框
				this.dialogEdit = true
			},
			// 请求修改项目的接口
			async updateProject() {
				// 发送请求之前对表单进行预验证
				this.$refs.updateRef.validate(async (valid) => {
					if (!valid) return
					const response = await this.$request.put('/projects/' + this.editProject.id + '/', this
						.editProject)
					if (response.status === 200) {
						this.$message({
							message: '修改项目成功',
							type: 'success',
							duration: 1000
						})
						this.getProject()
						this.dialogEdit = false
					} else {
						this.$message({
							message: '修改失败',
							type: 'error',
							duration: 1000
						})
					}
				})
			},


			// 删除项目
			async proDelete(id) {
				console.log('当前删除的数据id为：', id)
				// 通过接口删除后端数据
				const response = await this.$request.delete('/projects/' + id + '/')
				//  后端接口是安装resetful规范设计的，delete方法成功时，返回的状态码为204
				if (response.status === 204) {
					// 删除成功
					this.$message({
						message: '删除成功',
						type: 'success',
						duration: 1000
					});
					// 重写加载数据
					this.getProject()
				} else {
					this.$message({
						message: '删除失败',
						type: 'error',
						duration: 1000
					});
				}
			},
			// 获取项目
			async getProject() {
				// 请求项目列表的接口，获取所有的项目
				const response = await this.$request.get('/projects/', {
					params: {
						page: this.page,
						size: this.size
					}
				})
				if (response.status !== 200) return this.$message.error('服务器异常')
				// 保存接口返回的项目列表
				this.projectList = response.data.results
				// 保存数据总数
				this.count = response.data.count
				console.log(response)
			},
			// 处理每页数量大小变化的方法
			handleSizeChange(size) {
				this.size = size
				this.page = 1
				this.getProject()
			},
			// 处理页码变化的方法
			handleCurrentChange(page) {
				this.page = page
				this.getProject()
			}
		},

		// vue实例数据挂载之后，出触发这个钩子函数
		mounted() {
			this.getProject()
		}

	}
</script>

<style>
</style>
