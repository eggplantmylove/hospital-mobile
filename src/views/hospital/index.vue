<template>
    <div>
        <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="option" title="排序"/>
            <van-dropdown-item v-model="value" :options="option" title="排序"/>
            <van-dropdown-item v-model="value" :options="option" title="排序"/>
            <van-dropdown-item v-model="value" :options="option" title="排序"/>
            <van-dropdown-item v-model="value" :options="option" title="排序"/>
        </van-dropdown-menu>
        <div class="tag">
            <van-tag round type="primary">综合型</van-tag>
            <van-tag round type="success">妇产科</van-tag>
            <van-tag round type="danger">内分泌失调</van-tag>
            <van-tag round type="warning">肾结石</van-tag>
            <van-tag round type="warning">肺结核</van-tag>
        </div>
        <van-divider/>
        <ul class="hospital-list">
            <li v-for="item in 5" :key="item" @click="$router.push('/hospital/detail')">
                <div class="img-distance">
                    <img src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg">
                    <p>距离您8km</p>
                </div>
                <div>
                    <h4>复旦大学附属儿科医院</h4>
                    <div>
                        <van-tag type="danger">三级甲等</van-tag>
                        <van-tag type="primary">公立/专科医院</van-tag>
                    </div>
                    <div class="brief">
                        <span class="title">【简介】</span><span class="content">复旦大学附属儿科医院创建于1952年，系卫生哈哈嘿嘿呵呵嘻嘻</span>
                    </div>
                    <div class="grade">
                        <div>
                            <p>10<span>分</span></p>
                            <span>医疗水平</span>
                        </div>
                        <div>
                            <p>10<span>分</span></p>
                            <span>医院服务</span>
                        </div>
                        <div>
                            <p>10<span>分</span></p>
                            <span>就诊价格</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                value: 'a',
                option: [
                    {text: '默认排序', value: 'a'},
                    {text: '好评排序', value: 'b'},
                    {text: '销量排序', value: 'c'},
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    .tag {
        background: #fff;
        padding: 10px 5px;
    }

    .van-tag {
        margin-right: 3px;
    }

    .hospital-list {
        background: #fff;
        li {
            display: flex;
            padding: 10px;
            .img-distance {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-right: 15px;
                img {
                    width: 100px;
                    height: 100px;
                }
                p {
                    padding-top: 5px;
                    color: #999;
                    font-size: 14px;
                }
            }
            .brief {
                display: flex;
                align-items: center;
                height: 20px;
                .title {
                    font-size: 14px;
                }
                .content {
                    display: inline-block;
                    width: 200px;
                    font-size: 12px;
                    color: #999;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
            .grade {
                display: flex;
                justify-content: space-between;
                p {
                    font-size: 18px;
                }
                span {
                    font-size: 12px;
                }
            }
        }
    }
</style>
