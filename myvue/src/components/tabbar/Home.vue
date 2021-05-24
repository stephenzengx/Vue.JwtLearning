<template>
   <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="userId" label="用户id" width="180"> </el-table-column>
        <el-table-column prop="userName" label="用户名" width="180"> </el-table-column>       
        <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
        <el-table-column prop="phone" label="手机号" width="180"> </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
        <el-table-column prop="writeTime" label="注册时间" width="180"> </el-table-column>
      </el-table>   
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination> 
   </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {  
      tableData:[],
      pageIndex: 1,
      pageSize : 20,
      totalCount : 0
    }
  },
  methods: {
      //切换 页数
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        var that = this;
        this.$http
          .get(this.$asbPath.HomeListUrl,{
              params: {
                pageIndex: val,
                pageSize: pageIndex
              }
            })
          .then(function(response){
                var data = response.data;
                if (data.status>=0)
                {
                  that.tableData = data.record;             
                }else{
                    that.$message(data.message);
                }               
            }
          )
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });
      },
      //切换每页条数
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        var that = this;
        this.$http
          .get(this.$asbPath.HomeListUrl,{
            params: {
              pageIndex: pageIndex,
              pageSize: val
            }
          })
          .then(function(response){
                var data = response.data;
                if (data.status>=0)
                {
                  that.tableData = data.record;             
                }else{
                    that.$message(data.message);
                }               
            }
          )
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });
      }
  },
  mounted () {
    var that = this;
    this.$http
      .get(this.$asbPath.HomeListUrl,{
        params: {
          pageIndex: 1,
          pageSize: 20
        }
      })
      .then(function(response){
            var data = response.data;
            if (data.status>=0)
            {
              that.totalCount = data.totalCount
              that.tableData = data.record;             
            }else{
              that.$message(data.message);
            }           
        }
      )
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
  }
}
</script>