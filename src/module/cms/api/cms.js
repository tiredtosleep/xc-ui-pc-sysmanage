import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//页面查询
//定义方法，请求服务端的页面查询接口-----export导出
//params为json格式

export const page_list=(page,size,params)=>{
  //使用querystring将json对象转成key/value串
  let querys = querystring.stringify(params)
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size+'/?'+querys);
}
//定义查询站点信息名
export const site_list =()=> {
  return http.requestQuickGet(apiUrl+'/cms/page/list/site')
}
//定义查询模板名
export const template_list =()=> {
  return http.requestQuickGet(apiUrl+'/cms/page/template')
}
//定义新增页面信息
export  const page_add=params=>{
  return http.requestPost(apiUrl+'/cms/page/add',params);
}
//通过id查询页面信息
export  const page_get=id=>{
  return http.requestQuickGet(apiUrl+'/cms/page/get/'+id);
}
/*修改页面*/
export  const page_edit=(id,params)=>{
  return http.requestPut(apiUrl+'/cms/page/edit/'+id,params);
}
/*删除页面*/
export  const page_del=id=>{
  return http.requestDelete(apiUrl+'/cms/page/del/'+id);
}
/*发布页面*/
export  const page_post=id=>{
  return http.requestPost(apiUrl+'/cms/page/postPage/'+id);
}

