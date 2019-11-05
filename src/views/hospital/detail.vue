<template>
    <div>
        <van-nav-bar title="医院介绍" left-arrow  @click-left="$router.go(-1)">
            <van-button icon="plus" type="info" round slot="right" color="#316DE0" size="small">按钮
            </van-button>
        </van-nav-bar>
        <div class="info">
            <img src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg">
            <div>
                <h4>复旦大学附属儿科医院</h4>
                <div class="tag">
                    <van-tag type="danger">三级甲等</van-tag>
                    <van-tag type="primary">公立/专科医院</van-tag>
                </div>
                <p>门诊：09:00-12:00 14:00-17:00</p>
                <p>电话：021-64931990</p>
                <p>3.5km|上海市闵行区万源路399号</p>
            </div>
        </div>
        <van-divider/>
        <ul>
            <li>

            </li>
        </ul>
        <van-grid :column-num="3" class="grid">
            <van-grid-item>
                <div class="box flex-center" style="background: #517AF2">
                    <i class="iconfont icon-yuyuexinxi"></i>
                </div>
                <p>预约挂号</p>
            </van-grid-item>
            <van-grid-item>
                <div class="box flex-center" style="background: #18D54C">
                    <i class="iconfont icon-dianhua"></i>
                </div>
                <p>电话预约</p>
            </van-grid-item>
            <van-grid-item>
                <div class="box flex-center" style="background: #F94270">
                    <i class="iconfont icon-xianlu"></i>
                </div>
                <p>查看线路</p>
            </van-grid-item>
        </van-grid>
        <van-tabs v-model="active">
            <van-tab title="妇产科">
            </van-tab>
            <van-tab title="儿科">
                <van-grid :column-num="2" class="doctor">
                    <van-grid-item v-for="item in 5" :key="item">
                        <div class="box">
                            <img src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg">
                            <div style="display: flex;flex-direction: column;justify-content: space-around">
                                <div style="display: flex;align-items: center">
                                    <h4>黄医生</h4>
                                    <span style="font-size: 12px;color: #999">(副主任医师)</span>
                                </div>
                                <P style="font-size: 14px"> 科室：儿科综合</P>
                            </div>
                        </div>
                        <p style="font-size: 12px;margin-top: 5px">【擅长】小儿湿疹、血管炎、过敏性紫癜。</p>
                    </van-grid-item>
                </van-grid>
            </van-tab>
            <van-tab title="内科">内容 3</van-tab>
            <van-tab title="外科">内容 4</van-tab>
        </van-tabs>
        <div class="content-title">
            <h4>就诊需知</h4>
        </div>
        <ul class="know">
            <li style="background: #FFFAFA;border-color: #FEECF0">
                <div class="box flex-center" style="background: #FF2654">
                    <i class="iconfont icon-qupiao"></i>
                </div>
                <p>自助取票</p>
            </li>
            <li style="background: #FFFBF5;border-color: #FEF5D4">
                <div class="box flex-center" style="background: #FFC600">
                    <i class="iconfont icon-jilu"></i>
                </div>
                <p>挂号须知</p>
            </li>
            <li style="background: #F7F9FC;border-color: #E9F1FE">
                <div class="box flex-center" style="background: #5C93E5">
                    <i class="iconfont icon-jilu1"></i>
                </div>
                <p>就诊时间</p>
            </li>
            <li style="background: #FFFAFA;border-color: #E1FDEB">
                <div class="box flex-center" style="background: #1BBD55">
                    <i class="iconfont icon-quxiao"></i>
                </div>
                <p>取消预约</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'detail',
        data() {
            return {
                active: 1
            }
        }
    }
</script>

<style scoped lang="less">
    .van-nav-bar__right {
        .van-button {
            i {
                color: #fff;
                vertical-align: initial;
            }
        }
    }

    .info {
        display: flex;
        background: #fff;
        padding: 10px;
        img {
            width: 100px;
            height: 100px;
            margin-right: 10px;
        }
        > div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .tag {
                padding: 5px 0;
                > span {
                    margin-right: 3px;
                }
            }
            p {
                font-size: 14px;
                color: #333333;
            }
        }
    }

    .grid {
        .box {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            i {
                color: #fff;
                font-size: 30px;
            }
        }
        p {
            margin-top: 3px;
            font-size: 14px;
        }
    }

    .doctor {
        .box {
            display: flex;
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 5px;
            }
        }
    }

    .content-title {
        margin-top: 10px;
        padding: 10px;
        background: #fff;
        p {
            font-size: 14px;
        }
    }

    .know {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background: #fff;
        li {
            border: 1px solid;
            padding: 8px 15px;
            .box {
                margin: 5px auto;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                i {
                    font-size: 28px;
                    color: #fff;
                }
            }
        }
    }
</style>
