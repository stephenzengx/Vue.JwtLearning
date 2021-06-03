<template>   
  <div>
    <div class="Grid"> 
      <el-select @change="selectChanged" v-model="curRoleId"  placeholder="请选择">
        <el-option 
          v-for="item in roleInfoList"
          :key="item.roleId"
          :label="item.roleName"
          :value="item.roleId">
          <span style="float: left">{{ item.roleName }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.tenantName }}</span>
        </el-option>
      </el-select>
      
      <el-tree :data="treeData" show-checkbox default-expand-all node-key="nodeId" ref="tree" 
          highlight-current :props="defaultProps">       
      </el-tree>
    </div>

    <el-button @click="AuthMenusSave">保存</el-button>
    <el-button @click="resetChecked">清空</el-button>
    
    <div style="margin-top:30px;">
      <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-button @click="setCheckedNodes">通过 node 设置</el-button>
      <el-button @click="setCheckedKeys">通过 key 设置</el-button>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>
  export default {
    data() {
      return {
        roleInfoList:[],//当前角色列表
        curRoleId: 0, //当前选中角色id
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'nodeName'
        }
      };
    },
    mounted () {
      this.initRoleList();
    },

    methods: {
      initRoleList(){
        var that = this;
        this.$http.get(this.$asbPath.AdminRoleList)
        .then(function(response){
            var data = response.data;
            if (data.status>=0){
                that.roleInfoList = data.record;  
                if(that.roleInfoList.length > 0)
                {
                  that.curRoleId = that.roleInfoList[0].roleId;
                  that.initRoleMenuData();
                }
                
            }else{
                that.$message(data.message);
            }           
        }).catch(function (error) { // 请求失败处理
            console.log(error);
        });
      },
      //初始化
      initRoleMenuData(){
        var that = this;
        this.$http.get(this.$asbPath.AdminSystemMenuTree)
        .then(function(response){
            var data = response.data;
            if (data.status>=0){
                that.treeData = data.record;  
                that.setCheckedKeys();//设置选中key
            }else{
                that.$message(data.message);
            }           
        }).catch(function (error) { // 请求失败处理
            console.log(error);
        });
      },
      //角色授权菜单保存
      AuthMenusSave(){
        var that = this;

        this.$http.post(this.$asbPath.AdminAuthMenuByIds, {
          roleId: that.curRoleId,
          selectIds: that.$refs.tree.getCheckedKeys()
        }).then(function(response){
            var data = response.data;
            var data = response.data;
            if (data.status>=0)
            {
              that.$message(data.message);                  
            }else{
                that.$message(data.message);   
            } 
          }
        ).catch(function (error) { // 请求失败处理
          that.$message(error);   
        }); 
      },
      //设置选中key
      setCheckedKeys() {
        var that = this;
        this.$http.get(this.$asbPath.AdminRoleAccessMenuIds,{
            params: {
              roleId: that.curRoleId
            }
        })
        .then(function(response){
            var data = response.data;
            if (data.status>=0){
               that.$refs.tree.setCheckedKeys(data.record);//设置选中key
            }else{
                that.$message(data.message);
            }           
        }).catch(function (error) { // 请求失败处理
            console.log(error);
        });       
      },
      //清空选中key
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      selectChanged(curRoleId){
          this.curRoleId = curRoleId;
      },

      handleNodeClick(data) {
        console.log(data);
      },
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          nodeId: 3
        }, {
          nodeId: 5
        }]);
      },
    }
  };
</script>