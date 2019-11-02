<template>
    <div>
        <div style="margin-bottom: 50px">
            <router-view/>
        </div>
        <van-tabbar route>
            <van-tabbar-item v-for="item in navList" :key="item.path" replace :to="item.path" >
                <i class="iconfont" :class="item.meta.icon"></i>
                <span>{{item.meta.title}}</span>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: 'bottomNav',
        data() {
            return {
                navList: this.$router.options.routes.find(item => item.path === '/').children
            }
        },
    }
</script>

<style scoped lang="less">
    /deep/ .van-tabbar-item__text {
        display: flex;
        flex-direction: column;
        align-items: center;
        .iconfont {
            font-size: 24px;
        }
    }
</style>
