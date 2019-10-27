<template>
    <div class="container">
        <div>
            <router-link :to="{name:'home'}">
                <el-button type="primary">返回</el-button>
            </router-link>
        </div>
        <el-card v-if="goalCategoryData">
            <div slot="header">
                <p>目标分类</p>
            </div>
            <el-row v-for="(category,key) in goalCategoryData" class="list" :key="key">
                <el-col :span="20">
                    <span class="title" v-text="category.title"></span>
                </el-col>
                <el-col :span="4">
                    <router-link :to="{name:'goalCategories.edit',params:{goalCategoryId:category.id}}">
                        <span><i class="el-icon-edit-outline"></i></span>
                    </router-link>
                    <span class="hover"><i class="el-icon-delete" @click="deleteItem(category.id)"></i></span>
                </el-col>

            </el-row>
            <el-pagination layout="prev,pager,next"
                           :total="total"
                           :page-size="pageSize"
                           :current-page.sync="page"
                           @current-change="turnPage"></el-pagination>

        </el-card>

    </div>
</template>

<script>
    export default {
        name: "CategoryList",
        components: {},
        data() {
            return {
                goalCategoryData:[],
                total: 0,
                page: 1,
                pageSize: 20,
                loading:true,
            }
        },
        created() {
            this.getGoalCategories();

        },
        computed: {},
        methods: {
            async getGoalCategories(page=1){
                try {
                    const response =await this.$api.getGoalCategories({
                        page:page,
                        page_size:this.pageSize
                    });
                    this.goalCategoryData = response.data.data;

                    this.total = response.data.meta.pagination.total;

                }catch (e) {
                    console.log(e);
                }
            },
            deleteItem(id){
                this.$confirm('确认删除？').then(()=>{
                    this.$api.deleteGoalCategory(id).then(()=>{
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                    })
                })
                    .catch(()=>{
                        console.log(2);
                    })
            },
            turnPage(page){
                this.page = page;
                this.getGoalCategories(page);
            }

        }
    }
</script>

<style lang="scss" scoped>
    .list{font-size: 16px;
        .title{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
    }
</style>
