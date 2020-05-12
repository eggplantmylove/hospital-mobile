<template>
 <div>
   <van-nav-bar title="部门选择" left-text="返回" left-arrow>
  <template #right>
    <van-icon name="search" size="18" />
  </template>
</van-nav-bar>
  <van-tree-select
  :height="800"
  :items="items"
  :active-id.sync="activeId"
  :main-active-index.sync="activeIndex"
  @click-item="clickItem"
/>
 </div>

</template>

<script>
  import {mobileDept} from '../../api/api'
    export default {
    data() {
    return {
       items: [],
      activeId: 1,
      activeIndex: 0,
    };
   },
  methods:{
      clickItem:function(e){
            console.log(e)
            this.$router.push({path:`/appointment/${e.id}`})
      },
      getAppDept:function(){
        mobileDept().then(res=>{
          this.items = res.data.data;
        })
      }

  },
  mounted(){
    this.getAppDept();
  }
  }
</script>

<style lang="scss" scoped>
  //头部样式
  /deep/ .van-nav-bar{
    background: #3372D0;
    .van-icon{
      color: #fff;
    }
    .van-nav-bar__text{
      color: #fff;
    }
    .van-nav-bar__title{
      color: #fff;
    }
  }
</style>
