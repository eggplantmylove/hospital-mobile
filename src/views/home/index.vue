<template>
    <div>
        <van-grid :column-num="2" :center="false">
            <van-grid-item v-for="(item, index) in topNav" :key="index">
                <div class="top-box">
                    <div class="round-box flex-center" :style="{background: item.color}">
                        <i class="iconfont" :class="item.icon"></i>
                    </div>
                    <div class="text">
                        <h4>{{item.title}}</h4>
                        <p>{{item.content}}</p>
                    </div>
                </div>
            </van-grid-item>
        </van-grid>
        <van-swipe :autoplay="3000" indicator-color="#FF4C68" style="height: 20vh">
            <van-swipe-item v-for="(item, index) in carousel" :key="index">
                <img v-lazy="item.src" style="width: 100%;height: 100%"/>
            </van-swipe-item>
        </van-swipe>
        <div>
            <div class="content-title">
                <h4>我的服务</h4>
                <p>展开更多</p>
            </div>
            <van-grid :column-num="5" :border="false">
                <van-grid-item v-for="(item, index) in myService" :key="index">
                    <div class="round-box flex-center" :style="{background: `linear-gradient(to bottom, ${item.topColor}, ${item.bottomColor})`}">
                        <i class="iconfont" :class="item.icon"></i>
                    </div>
                    <span style="font-size: 12px;margin-top: 3px">{{item.title}}</span>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                // 顶部导航
                topNav: [
                    {title: '在线预约', content: '看病提前预约', icon: 'icon-yuyuexinxi', color: '#FA525A',},
                    {title: '线上提问', content: '在线免费咨询', icon: 'icon-tiwen', color: '#FCBA00',},
                    {title: '移动支付', content: '移动支付医疗费', icon: 'icon-zhifubao', color: '#4CBDFA',},
                    {title: '今日挂号', content: '解决排队烦恼', icon: 'icon-jia', color: '#55D323',},
                    {title: '医保促销', content: '快速报销医疗费', icon: 'icon-baoxiao', color: '#6435FA',},
                    {title: '快速购药', content: '买药快速方便', icon: 'icon-yaopin', color: '#20ABA9',},
                ],
                // 我的服务
                myService: [
                    { title: '预约体检', icon: 'icon-tijian', topColor: '#F20FE5', bottomColor: '#FB243A' },
                    { title: '住院办理', icon: 'icon-zhuyuanjiancha', topColor: '#FFC454', bottomColor: '#FF6D21' },
                    { title: '专家门诊', icon: 'icon-menzhenfuwukaobei', topColor: '#A551FE', bottomColor: '#552FF9' },
                    { title: '家庭医生', icon: 'icon-jiatingyisheng', topColor: '#A551FE', bottomColor: '#532EF9' },
                    { title: '开药门诊', icon: 'icon-yao', topColor: '#FFC252', bottomColor: '#FF6E21' },
                ],
                // 轮播图
                carousel: [
                    {src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',},
                    {src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',},
                    {src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',},
                    {src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',},
                ],
            }
        }
    }
</script>

<style scoped lang="less">
    /deep/ .van-grid-item {
    }

    .top-box {
        display: flex;
        align-items: center;
        padding-left: 10px;
        .round-box {
            margin-right: 15px;
        }
        .text {
            p {
                font-size: 14px;
                color: #999;
            }
        }
    }

    .content-title {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background: #fff;
        p {
            font-size: 14px;
        }
    }

    .round-box {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        .iconfont {
            font-size: 26px;
            color: #fff;
        }
    }
</style>
