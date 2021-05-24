
var asbPath = {
    UserDedetail:"TenantUser/GetOne",
    UserListUrl: "TenantUser/ListByPage",
    UserAdd:"TenantUser/Post",
    UserEdit:"TenantUser/Put",
    UserDelete:"TenantUser/Delete",
    TenantMenu: "Menu/TenantMenu",

    SystemMenu: "Menu/SystemMenu",//admin


    LoginUrl: "System/Login",
    RegisterUrl: "System/Register",
    PubKey:"-----BEGIN PUBLIC KEY-----"+
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDD4ZdsUEnRyfRyDZReRNKpMfnL"+
    "RSIF24+upydx7DRLaRoDwbuQD7tNSyQwhqCeLUXI83bLfhcMvHzSisst3WMbsG7A"+
    "/3jiG+KpvCgznkCoeVnjj6q8dw+lO5gtRT6zCJf8aC1MriVBHrtjcaw2dodwPRfL"+
    "a1kOdxxPY2OFJ2lirwIDAQAB"+
    "-----END PUBLIC KEY-----" //要加 begin-end头,否则会加密失败
}

export default asbPath
