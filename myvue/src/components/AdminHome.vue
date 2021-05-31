<template>   
  <div class="buttons">
    <el-tree  :data="treeData" show-checkbox default-expand-all node-key="nodeId" ref="tree" 
      highlight-current :props="defaultProps"></el-tree>

    <el-button @click="getCheckedNodes">通过 node 获取</el-button>
    <el-button @click="getCheckedKeys">通过 key 获取</el-button>
    <el-button @click="setCheckedNodes">通过 node 设置</el-button>
    <el-button @click="setCheckedKeys">通过 key 设置</el-button>
    <el-button @click="resetChecked">清空</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'nodeName'
        }
      };
    },
    mounted () {
      this.initData();
    },

    methods: {
      initData(){
        var that = this;
        this.$http.get(this.$asbPath.AdminSystemMenuTree)
        .then(function(response){
            var data = response.data;
            if (data.status>=0){
                that.treeData = data.record;             
            }else{
                that.$message(data.message);
            }           
        }).catch(function (error) { // 请求失败处理
            console.log(error);
        });
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
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    }
  };
</script>