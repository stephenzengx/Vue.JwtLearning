
var asbPath = {
    //system 接口
    LoginUrl: "System/Login",
    RegisterUrl: "System/Register",

    //业务接口
    UserDedetail:"User/GetOne",
    UserListUrl: "User/ListByPage",//to do 这个暂时不改成Admin的 加了测试接口
    UserAdd:"User/Post",
    UserEdit:"User/Put",
    UserDelete:"User/Delete",

    UserMenuTree:"Menu/UserMenuTree",//用户菜单树
  
    //后台admin接口
    AdminSystemMenuTree: "Menu/AdminSystemMenuTree",//系统菜单树
    AdminRoleAccessMenuIds: "Menu/AdminRoleAccessMenuIds",//角色授权菜单Id集合
    AdminAuthMenuByIds:"Role/AdminAuthMenuByIds",//管理员给 角色授权菜单
    AdminRoleList:"Role/AdminRoleList", //角色列表  

    //注意：业务接口和后台admin接口可能会共用一份接口. 即使功能类似，但为了区分权限，也要分开编写接口
    PubKey:"-----BEGIN PUBLIC KEY-----"+
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDD4ZdsUEnRyfRyDZReRNKpMfnL"+
    "RSIF24+upydx7DRLaRoDwbuQD7tNSyQwhqCeLUXI83bLfhcMvHzSisst3WMbsG7A"+
    "/3jiG+KpvCgznkCoeVnjj6q8dw+lO5gtRT6zCJf8aC1MriVBHrtjcaw2dodwPRfL"+
    "a1kOdxxPY2OFJ2lirwIDAQAB"+
    "-----END PUBLIC KEY-----" //要加 begin-end头,否则会加密失败
}

export default asbPath
