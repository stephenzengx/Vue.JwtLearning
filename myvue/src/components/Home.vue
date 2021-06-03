<template>
   <div>
      <el-tree :data="treeData" style="width: 20%; background: #aed8ec;" default-expand-all :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      <el-button v-if="addRight==1" style="float: right;margin-right: 10%;" type="success" plain @click="handleAddClick">新增用户</el-button>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="userId" label="用户id" width="180"> </el-table-column>
        <el-table-column prop="userName" label="联系方式" width="180"> </el-table-column>       
        <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
        <el-table-column prop="phone" label="手机号" width="180"> </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
        <el-table-column prop="addTime" label="注册时间" width="180"> </el-table-column>
        <el-table-column v-if="showOpColumn==1"  label="操作" width="180">
            <template slot-scope="scope">
                <el-button v-if="updateRight==1" type="primary" @click="handleEditClick(scope.$index,scope.row)"  size="mini">编辑</el-button>
                <el-button v-if="deleteRight==1" type="danger" size="mini" @click="handleDelClick(scope.$index,scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
        
      <el-pagination style="margin-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[1,20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination> 

      <el-dialog title="添加用户" :visible.sync="isShowAddBox" width="50%" :before-close="handleClose">
            <el-form ref="form" label-width="100px" v-model="addUserData">
                <el-form-item label="用户名:">
                    <el-input maxlength="50" v-model = "addUserData.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码:">
                    <el-input maxlength="50" v-model = "addUserData.passWord"></el-input>
                </el-form-item>
                <el-form-item label="年龄:">
                    <el-input  maxlength="50" v-model = "addUserData.age"></el-input>
                </el-form-item>
                <el-form-item label="联系方式:">
                    <el-input maxlength="50" v-model = "addUserData.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:">
                    <el-input maxlength="50" v-model = "addUserData.email"></el-input>
                </el-form-item>
                <el-form-item label="注册时间:">
                    <el-date-picker
                            v-model = "addUserData.addTime"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleAddUser">确 定</el-button>
            </span>
      </el-dialog>

      <el-dialog title="修改用户" :visible.sync="isShowEditBox" width="50%" :before-close="handleClose">
          <el-form ref="form" label-width="100px" v-model="editUserData">
              <el-form-item label="用户名:">
                  <el-input maxlength="50" v-model = "editUserData.userName"></el-input>
              </el-form-item>
              <el-form-item label="年龄:">
                  <el-input  maxlength="50" v-model = "editUserData.age"></el-input>
              </el-form-item>
              <el-form-item label="联系方式:">
                  <el-input maxlength="50" v-model = "editUserData.phone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱:">
                  <el-input maxlength="50" v-model = "editUserData.email"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleEditUser">确 定</el-button>
          </span>
      </el-dialog>
   </div>
</template>

<script>
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;

}

export default {
  name: 'Home',
  data () {
    return {  
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'nodeName'
      },

      tableData:[],
      pageIndex: 1,
      pageSize : 20,
      totalCount : 0,
      isShowAddBox : false,
      isShowEditBox:false,

      addUserData:{
          userName : "",
          passWord:"",
          age : "",
          phone : "",                             
          email :"",
          addTime: ""       
      },

      editUserData: {
          userId : 0,
          userName : "",
          age : 0,
          phone : "",                             
          email :""   
      },
      curMenuId : 5,
      showOpColumn:0,
      addRight:0,
      updateRight:0,
      deleteRight:0,
      addTxt :"",
      updateTxt:"",
      deleteTxt:""     
    }
  },
  mounted () {
    this.loadTreeData();
    this.loadData();
  },
  methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      //加载菜单树
      loadTreeData(){
        var that = this;
        this.$http.get(this.$asbPath.UserMenuTree)
        .then(function(response){
            var data = response.data;
            if (data.status>=0){
                that.treeData = data.record;  
                that.loadBtnRight(that.curMenuId);           
            }else{
                that.$message(data.message);
            }           
        }).catch(function (error) { // 请求失败处理
            console.log(error);
        });
      },
      //重载当前页面数据
      loadData(){
        var that = this;
        this.$http.get(this.$asbPath.UserListUrl,{
            params: {
              pageIndex: that.pageIndex,
              pageSize: that.pageSize
            }
        }).then(function(response){
            var data = response.data;
            if (data.status>=0)
            {
              that.totalCount = data.totalCount;
              that.tableData = data.record;             
            }else{
                that.$message(data.message);
            }               
        }).catch(function (error) { // 请求失败处理
            console.log(error);
        });
      }, 
      loadBtnRight(curMenuId)
      {
        var that = this;
        this.$http.get(this.$asbPath.UserMenuBtnRight,{
          params:{
            menuId:curMenuId
          }
        }).then(function(response){
            var data = response.data;
            if (data.status>=0){
                data.record.forEach(function(value,index,array){
                  if (value.btnId==1)
                  {
                    that.addRight = 1;
                    that.addTxt = value.btnTxt;
                  }                    
                  else if (value.btnId==2)
                  {
                    that.updateRight = 1;
                    that.updateTxt = value.btnTxt;
                  }
                  else if (value.btnId==3) {
                    that.deleteRight = 1;
                    that.deleteTxt = value.btnTxt;
                  }
                });     
                if (that.updateRight==1 || that.deleteRight==1)
                  that.showOpColumn = 1;

            }else{
                that.$message(data.message);
            }           
        }).catch(function (error) { // 请求失败处理
            console.log(error);
        });
      },

      handleClose(done) {
          done();
      },
      //删除
      handleDelClick(index,row){
          var that = this;
          this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
            this.$http.delete(this.$asbPath.UserDelete,{
                params: {
                  userId : row.userId
                }
            }).then(function(response){
                  var data = response.data;
                  if (data.status>=0)
                  {
                    that.$message(data.message);
                    that.loadData();    
                  }else{
                      that.$message(data.message);
                  }               
              }
            )
            .catch(function (error) { // 请求失败处理
              console.log(error);
            });
          })
      },

      //修改 弹窗
      handleEditClick(index,row){
          var that = this;

          that.editUserData.userId = row.userId;
          that.editUserData.userName = row.userName;
          that.editUserData.age = row.age;
          that.editUserData.phone = row.phone;
          that.editUserData.email = row.email;

          this.isShowEditBox = true;
      },

      //修改确认
      handleEditUser(){
          var that = this;
          this.$http.put(this.$asbPath.UserEdit,{
              userId:that.editUserData.userId,
              userName: that.editUserData.userName,
              age: that.editUserData.age,
              phone: that.editUserData.phone,
              email: that.editUserData.email  
          })
          .then(function(response){
                var data = response.data;
                if (data.status>=0)
                {
                  that.$message(data.message);
                  that.loadData();
                  that.isShowEditBox = false;

                  that.editUserData.userId = 0;
                  that.editUserData.userName = "";
                  that.editUserData.passWord ="";
                  that.editUserData.age="";
                  pthat.editUserData.phone="";
                  that.editUserData.email="";  
                }else{
                    that.$message(data.message);
                }               
            }
          )
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });
      },

      //新增弹窗  
      handleAddClick(){
          this.isShowAddBox = true;
      },
      //新增确认
      handleAddUser(){
          var that = this;
          this.$http.post(this.$asbPath.UserAdd,{
              userName: that.addUserData.userName,
              passWord: that.addUserData.passWord,
              age: that.addUserData.age,
              phone: that.addUserData.phone,
              email: that.addUserData.email,
              addTime: dateFormat("YYYY-mm-dd",that.addUserData.addTime) 
          }).then(function(response){
                var data = response.data;
                if (data.status>=0)
                {
                  that.$message(data.message);
                  that.loadData();
                  that.isShowAddBox = false;
                  that.addUserData.userName = "",
                  that.addUserData.passWord ="",
                  that.addUserData.age="",
                  pthat.addUserData.phone="",
                  that.addUserData.email="",
                  that.addUserData.addTime=""       
                }else{
                    that.$message(data.message);
                }               
            }
          )
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });
      },

      //切换 页数
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.loadData();
      },
      //切换每页条数
      handleSizeChange(val) {
        this.pageSize = val;
        this.loadData();
      }
  }
}
</script>