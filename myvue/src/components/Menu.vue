<template>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
</template>

<script>
  export default {
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    mounted () {
        var that = this;
        this.$http
        .get(this.$asbPath.SystemMenu)
        .then(function(response){
                var data = response.data;
                if (data.status>=0){
                    that.data = data.record;             
                }else{
                    that.$message(data.message);
                }           
            }
        )
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  };
</script>