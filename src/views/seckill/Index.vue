<template>
    <div class="container">
        <el-card id="product">
            <el-row :gutter="30">
                <el-col :span="12" id="ad" class="picBox">
                    <img src="/static/ad1.png" alt="">
                </el-col>
                <el-col :span="12">
                    <h3 class="title">[可乐相伴 开怀畅饮]可口可乐500ml/瓶</h3>
                    <p class="desc">缤纷时刻齐分享！可口可乐以其独特的风味和上佳的口感深受大众尤其是年轻人的青睐，与 美食是绝配哦！</p>
                    <div class="saleAmount"><img src="/static/fire.png" alt=""><strong>1586</strong> 瓶已抢</div>
                    <div class="bottomBox">
                        <div class="price">
                            <span class="currency">￥</span>
                            <strong class="value">1</strong>
                        </div>
                        <el-button @click="submitForm" type="danger">马上抢</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>

        <el-card>
            <el-form :inline="true">
                <el-form-item label="库存">
                    <el-input v-model="seckillProduct.stock" placeholder="库存"></el-input>
                </el-form-item>
                <el-button type="primary" @click="editProduct">
                    提交
                </el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Index",
        components: {},
        data() {
            return {
                id:1,
                seckillProduct:{
                    stock:0
                }
            }
        },
        created() {
            this.getProduct(1);
        },
        computed: {},
        methods: {
            async submitForm(){
                try {
                    const response = await this.$api.placeSeckillOrder({
                        'seckillProductId':1
                    });
                    if(response.status===201){
                        this.$message({
                            message: '下单成功!',
                            type: 'success'
                        });
                    }
                }catch (e) {
                    console.log(e);
                }

            },

            async getProduct(id){
                try {
                    const response = await this.$api.getSeckillProduct(id)
                    if(response.status===200){
                        this.seckillProduct = response.data;
                    }
                }catch (e) {
                    console.log(e);
                }
            },

            async editProduct(){
                try{
                    const response = await this.$api.editSeckillProduct(1,this.seckillProduct);

                    if(response.status===200){
                        this.product = response.data;
                        this.$message({
                            message: '修改成功!',
                            type: 'success'
                        })
                    }

                }catch (e) {
                    console.log(e);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $red:#ff4646;
    #product{margin-bottom: 20px}
    .title{font-size: 18px; border-bottom:1px dashed #dedede; line-height:60px; }
    .desc{font-size: 14px;color: #a9a9a9;margin-bottom: 20px}
    .bottomBox{display: flex;justify-content: space-between}
    .saleAmount{color: #726f6f;margin-bottom: 100px;font-size: 14px;
        strong{color: $red;padding:0 10px}
    }
    .price{color: $red;
        .currency{font-size: 24px}
        .value{font-size: 48px}
    }
</style>
