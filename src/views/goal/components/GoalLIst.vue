<template>
    <div>
        <div v-if="goalData">
            <el-row v-for="(goal,key) in goalData" class="goalList" :key="key">
                <el-col :span="1">
                    <i :class="[goal.done_at?'el-icon-success':'el-icon-warning-outline']"></i>
                </el-col>
                <el-col :span="8">
                    <p class="goalTitle" v-text="goal.title"></p>
                </el-col>
                <el-col :span="8">
                    <el-progress :percentage="percentage(goal.mission_amount,goal.mission_accomplish_amount)"></el-progress>
                </el-col>
                <el-col :span="3">
                    <span v-text="goal.mission_accomplish_amount"></span>
                    <span>/</span>
                    <span v-text="goal.mission_amount"></span>
                </el-col>
                <el-col :span="2">
                    <i class="el-icon-coin"></i>
                    <span v-text="goal.bonus"></span>
                </el-col>
                <el-col :span="2">
                    <router-link :to="{name:'goals.show',params:{goal:goal.id}}">
                        <span><i class="el-icon-view"></i></span>
                    </router-link>
                    <router-link :to="{name:'goals.edit',params:{goal:goal.id}}">
                        <span><i class="el-icon-edit-outline"></i></span>
                    </router-link>
                </el-col>

            </el-row>
            <el-pagination layout="prev,pager,next"
                           :total="total"
                           :page-size="pageSize"
                           :current-page.sync="page"
                           @current-change="turnPage"
            >

            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoalLIst",
        components: {},
        data() {
            return {
                goalData:[],
                total: 0,
                page: 1,
                pageSize: 20,
                loading:true,
            }
        },
        created() {
            this.getGoals();
        },
        computed: {

        },
        methods: {
            async getGoals(page=1){
                try {
                    const response =await this.$api.getGoals({
                        page:page,
                        page_size:this.pageSize
                    });
                    this.goalData = response.data.data;
                    this.total = response.data.meta.pagination.total;

                }catch (e) {
                    console.log(e);
                }

            },
            percentage(mission_amount,mission_accomplish_amount){
                if(mission_accomplish_amount<=0){
                      return 0
                }
                return parseInt((mission_accomplish_amount/mission_amount )*100);

            },
            turnPage(page){
                this.page = page;
                this.getGoals(page);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/styles/_variables.scss';
    .goalList{font-size: 16px;
        .goalTitle{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
    }

    .el-icon-success{color: $successColor}
    .goalList{display: flex;padding: 0.5rem 0}
</style>
