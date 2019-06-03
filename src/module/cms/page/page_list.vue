<template>
<div>
<el-form :model="params">
  <el-select v-model="params.siteId" placeholder="请选择站点">
    <el-option :data="siteList" v-for="item in siteList"
               :key="item.siteName"
               :label="item.siteName"
               :value="item.siteId">
    </el-option>
  </el-select>
  网页别名<el-input v-model="params.pageAliase" style="width: 100px"></el-input>
  <el-button type="primary" v-on:click="query" size="small">查询</el-button>
  <router-link :to="{path:'/cms/page/add',query:{page:this.params.page,siteId:this.params.siteId}}">
    <el-button type="primary" size="small">新增页面</el-button>
  </router-link>

</el-form>


  <el-table :data="list" stripe style="width:100%">
    <el-table-column type="index" width="60">
    </el-table-column>
    <el-table-column prop="pageName" label="页面名称" width="120">
    </el-table-column>
    <el-table-column prop="pageAliase" label="别名" width="120">
    </el-table-column>
    <el-table-column prop="pageType" label="页面类型" width="100">
    </el-table-column>
    <el-table-column prop="pageWebPath" label="访问路径" width="250">
    </el-table-column>
    <el-table-column prop="pagePhysicalPath" label="物理路径" width="180">
    </el-table-column>
    <el-table-column prop="pageCreateTime"  label="创建时间" width="180">
    </el-table-column>
    <el-table-column label="操作" width="240">
      <!--slot-scope="page" 设置插槽-->
      <template slot-scope="page">
        <!--page.row.pageId 取插槽数据-->
        <el-button size="small" type="text" @click="postPage(page.row.pageId)">
          页面发布
        </el-button>
        <el-button size="small" type="text" @click="edit(page.row.pageId)">
          编辑
        </el-button>
        <el-button size="small" type="text" @click="del(page.row.pageId)">
          删除
        </el-button>
        <el-button size="small" type="text" @click="preview(page.row.pageId)">
          页面预览
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    :page-size="params.size"
    :current-page="params.page"
    v-on:current-change="changePage"
    layout="prev, pager, next"
    :total="total" style="float: right; ">
  </el-pagination>
</div>
</template>
<script>
  import * as cmsApi from '../api/cms'
  export default {
    data() {
      return {
        siteList:[],
        list:[],
        total:0,
        params:{
          siteId:'',
          pageAliase:'',
          size:5,
          page:1
        }
      }

    }

  ,
    methods:{
      query: function () {
        //调用服务端接口
        cmsApi.page_list(this.params.page, this.params.size,this.params).then((res) => {
          //将res结果数据赋值给数据模型对象
          this.list=res.queryResult.list;
          this.total = res.queryResult.total;
        })
      }
      ,changePage:function (page) {
        this.params.page=page;
        this.query();
      },
      //获取站点信息
      querysite: function () {

        cmsApi.site_list().then((res)=>{
          this.siteList=res;
        })
      },
      edit:function (pageId) {
        this.$router.push({
          path:'/cms/page/edit/'+pageId,query: {
            page: this.params.page,
            siteId: this.params.siteId
          }})
      },
      del:function (pageId) {
        this.$confirm('确定删除此页面吗？','提示',{}).then(()=>{
          cmsApi.page_del(pageId).then((res)=>{
            if (res.success) {
              this.$message.success("删除成功")
              //刷新页面，重新查询数据
              this.query()
            } else{
              this.$message.error("删除失败")
            }

          })


        })
      },
      postPage:function (pageId) {
        this.$confirm('确定发布此页面吗？','提示',{}).then(()=>{
          cmsApi.page_post(pageId).then((res)=>{
            if (res.success) {
              this.$message.success("发布成功")
              //刷新页面，重新查询数据
              this.query()
            } else{
              this.$message.error("发布失败")
            }

          })


        })
      }
      ,
      preview:function (pageId) {
        //打开浏览器窗口
        window.open("http://www.xuecheng.com/cms/preview/"+pageId)
      }
    },
    created(){
      //取出路由的参数，复制数据对象
      this.params.page=Number.parseInt(this.$route.query.page || 1);
      this.params.siteId=this.$route.query.siteId || '';
    }

  ,
    mounted(){
      //当dom元素渲染完成后调用query
      this.query();
      this.querysite();

    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
