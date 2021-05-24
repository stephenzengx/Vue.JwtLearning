<template>
  <div class="Login">
    <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="用户名" >
                <el-input v-model="form.userName" placeholder="用户名"></el-input>
              </el-form-item>
          </el-col>    
        </el-row>

        <el-row :gutter="20">
           <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="密码">
              <el-input placeholder="请输入密码" v-model="form.passWord" show-password></el-input>
            </el-form-item>
          </el-col>             
        </el-row>
        
        <el-row :gutter="20">
           <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item>
              <el-button type="primary" @click="onLogin">登录</el-button>
              <el-button type="info" @click="onRegister">注册</el-button>
            </el-form-item>
          </el-col>             
        </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
        form: {
          userName: '',
          passWord: ''
        }
    }
  },    
  methods: {
      onLogin() {
        var that = this;
        const jse = new this.$jsEncrypt();
        jse.setPublicKey(this.$asbPath.PubKey);//配置公钥
        var aesuncrypt_acount = jse.encrypt(this.form.userName)//加密账号
        var aesuncrypt_pwd = jse.encrypt(this.form.passWord)//加密密码

        console.log(aesuncrypt_pwd);

        this.$http.post(this.$asbPath.LoginUrl, {
              userName: aesuncrypt_acount,
              passWord: aesuncrypt_pwd
          }).then(function(response){
              var data = response.data;
              if (data.state>=0)
              {
                that.$message("登录成功");
                localStorage.setItem('Authorization', data.record);

                setTimeout(function(){
                that.$router.push('/Home'); //router 要以$开头
                },2000)               
              }else{
                that.$message(data.message);   
              }        
            }
          ).catch(function (error) { // 请求失败处理
            that.$message(error);   
          });         
      },
      onRegister() {
        var that = this;
        const jse = new this.$jsEncrypt();
        jse.setPublicKey(this.$asbPath.PubKey);//配置公钥
        var rsacrypt_acount = jse.encrypt(this.form.userName)//加密账号
        var rsacrypt_pwd = jse.encrypt(this.form.passWord)//加密密码

        this.$http.post(this.$asbPath.RegisterUrl, {
              userName: rsacrypt_acount,
              passWord: rsacrypt_pwd
          }).then(function(response){
              var data = response.data;
              var data = response.data;
              if (data.state>=0)
              {
                that.form.name = "";
                that.form.password = ""; 
                that.$message('注册成功');                  
              }else{
                 that.$message(data.message);   
              } 
            }
          ).catch(function (error) { // 请求失败处理
            that.$message(error);   
          });       
      }
    }
}
</script>

