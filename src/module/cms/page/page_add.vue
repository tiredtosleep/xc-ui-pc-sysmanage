<template>
  <div>
    <el-form   :model="pageForm" label-width="80px"  :rules="pageFormRules" ref="pageForm">
      <el-form-item label="所属站点" prop="siteId">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择模版" prop="templateId">
        <el-select v-model="pageForm.templateId" placeholder="请选择">
          <el-option
            v-for="item in templateList"
            :key="item.templateId"
            :label="item.templateName"
            :value="item.templateId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称" prop="pageName">
        <el-input v-model="pageForm.pageName" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="别名" prop="pageAliase">
        <el-input v-model="pageForm.pageAliase" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="访问路径" prop="pageWebPath">
        <el-input v-model="pageForm.pageWebPath" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="物理路径" prop="pagePhysicalPath">
        <el-input v-model="pageForm.pagePhysicalPath" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="数据Url" prop="dataUrl">
        <el-input v-model="pageForm.dataUrl" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="pageForm.pageType">
          <el-radio class="radio" label="0">静态</el-radio>
          <el-radio class="radio" label="1">动态</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="pageForm.pageCreateTime"></el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="addSubmit" >提交</el-button>
    </div>
  </div>
</template>

<script>
  import * as cmsApi from '../api/cms'
  export default {
        name: "page_add",
      data(){
          return{
            siteList:[],
            templateList:[],
            pageForm:{
              siteId:'',
              templateId:'',
              pageName: '',
              pageAliase: '',
              pageWebPath: '',
              dataUrl:'',
              pageParameter:'',
              pagePhysicalPath:'',
              pageType:'',
              pageCreateTime: new Date()
            },
            pageFormRules: {
              siteId:[
                {required: true, message: '请选择站点', trigger: 'blur'}
              ],
              templateId:[
                {required: true, message: '请选择模版', trigger: 'blur'}
              ],
              pageName: [
                {required: true, message: '请输入页面名称', trigger: 'blur'}
              ],
              pageWebPath: [
                {required: true, message: '请输入访问路径', trigger: 'blur'}
              ],
              pagePhysicalPath: [
                {required: true, message: '请输入物理路径', trigger: 'blur'}
              ]
            }
          }
      },
    methods:{

      addSubmit(){
        this.$refs.pageForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              cmsApi.page_add(this.pageForm).then((res) => {
                console.log(res);
                if(res.success){
                  this.addLoading = false;
                  //NProgress.done();
                  this.$message.success("提交成功")
                  this.$refs['pageForm'].resetFields();

                }else if(res.message){
                  this.addLoading = false;
                  this.$message.error(res.message);
                }else{
                  this.addLoading = false;
                  this.$message.error('提交失败');
                }
              });
            });
          }
        });
      },
      go_back:function () {
        this.$router.push({
          path: '/cms/page/list',
          query:{
            //取出路由里的参数
            page:this.$route.query.page,
            siteId:this.$route.query.siteId
          }
        })
      },
      //获取站点信息
      querysite: function () {

        cmsApi.site_list().then((res)=>{
          this.siteList=res;
        })
      },
      querytemplate:function () {
        cmsApi.template_list().then((res)=>{
          this.templateList=res;
        })
      },
    },
    mounted(){
      //当dom元素渲染完成后调用query
      this.querytemplate();
      this.querysite();
    }
  }
</script>

<style scoped>

</style>
