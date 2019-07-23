<template>
    <div class="container">
        <div v-if="goalCategoryData">
            <el-row v-for="(category,key) in goalCategoryData" class="list" :key="key">
                <el-col :span="20">
                    <span class="title" v-text="category.title"></span>
                </el-col>
                <el-col :span="4">
                    <router-link :to="{name:'goalCategories.edit',params:{goalCategoryId:category.id}}">
                        <span><i class="el-icon-edit-outline"></i></span>
                    </router-link>
                </el-col>

            </el-row>
            <el-pagination layout="prev,pager,next"
                           :total="total"
                           :page-size="pageSize"
                           :current-page.sync="page"
                           @current-change="turnPage"></el-pagination>



        </div>

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
