<template>
    <div class="container">

        <div>
            <router-link :to="{name:'goals.create'}">
                <el-button type="primary">新建</el-button>
            </router-link>
        </div>
        <div style="height: 10px"></div>
        <el-card>
            <el-row>
                <el-col :span="8">奖励</el-col>
                <el-col :span="16">
                    <el-tabs type="border-card">
                        <el-tab-pane label="目标">
                            <GoalLIst></GoalLIst>
                        </el-tab-pane>
                        <el-tab-pane label="每周任务">配置管理</el-tab-pane>
                        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import GoalLIst from './goal/components/GoalLIst'
    export default {
        name: "Home",
        components: {GoalLIst},
        data() {
            return {}
        },
        created() {

        },
        computed: {},
        methods: {

        }
    }
</script>

<style lang="scss" scoped>

</style>
