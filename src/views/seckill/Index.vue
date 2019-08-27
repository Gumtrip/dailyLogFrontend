<template>
    <div class="container">
        <el-card>
            <el-row :gutter="30">
                <el-col :span="12" id="ad" class="picBox">
                    <img src="/static/ad1.png" alt="">
                </el-col>
                <el-col :span="12">
                    <h3 class="title">[可乐相伴 开怀畅饮]可口可乐500ml/瓶</h3>
                    <p class="desc">缤纷时刻齐分享！可口可乐以其独特的风味和上佳的口感深受大众尤其是年轻人的青睐，与 美食是绝配哦！</p>
                    <div class="bottomBox">
                        <div class="price">
                            <span class="currency">￥</span>
                            <strong class="value">1</strong>
                        </div>
                        <el-button type="danger">马上抢</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Index",
        components: {},
        data() {
            return {}
        },
        created() {

        },
        computed: {},
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .title{font-size: 18px; border-bottom:1px dashed #dedede; line-height:60px; }
    .desc{font-size: 14px;color: #a9a9a9;margin-bottom: 150px}
    .bottomBox{display: flex;justify-content: space-between}
    .price{color: #ff4646;
        .currency{font-size: 24px}
        .value{font-size: 48px}
    }
</style>
