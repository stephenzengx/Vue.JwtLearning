
var asbPath = {

    //system 接口
    LoginUrl: "System/Login",
    RegisterUrl: "System/Register",

    //业务接口
    UserDedetail:"TenantUser/GetOne",
    UserListUrl: "TenantUser/ListByPage",//to do 这个暂时不改成Admin的 加了测试接口
    UserAdd:"TenantUser/Post",
    UserEdit:"TenantUser/Put",
    UserDelete:"TenantUser/Delete",
  
    //后台admin接口
    AdminMenu: "Menu/AdminMenu",
    RoleMenu: "Menu/AdminRoleMenu",

    //注意：业务接口和后台admin接口可能会共用一份接口. 即使功能类似，但为了区分权限，也要分开编写接口
    PubKey:"-----BEGIN PUBLIC KEY-----"+
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDD4ZdsUEnRyfRyDZReRNKpMfnL"+
    "RSIF24+upydx7DRLaRoDwbuQD7tNSyQwhqCeLUXI83bLfhcMvHzSisst3WMbsG7A"+
    "/3jiG+KpvCgznkCoeVnjj6q8dw+lO5gtRT6zCJf8aC1MriVBHrtjcaw2dodwPRfL"+
    "a1kOdxxPY2OFJ2lirwIDAQAB"+
    "-----END PUBLIC KEY-----" //要加 begin-end头,否则会加密失败
}

export default asbPath
