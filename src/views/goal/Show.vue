<template>
    <div class="container">

        <div>
            <router-link :to="{name:'home'}">
                <el-button type="primary">返回</el-button>
            </router-link>
        </div>
        <div style="height: 10px"></div>

        <el-card>
            <el-row :gutter="20">
                <el-col :span="14">&nbsp;
                    <el-timeline v-if="goalLogs">
                        <el-timeline-item v-for="(log,key) in goalLogs" :key="key" :timestamp="log.created_at"
                                          placement="top">
                            <el-card>
                                <el-collapse>
                                    <el-collapse-item :title="log.description" name="1">
                                        <pre class="properties"><code v-text="log.properties"></code></pre>
                                    </el-collapse-item>
                                </el-collapse>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-col>
                <el-col :span="10">
                    <el-row v-if="goalProgress" class="progress" :gutter="20">
                        <el-col :span="5" class="label">任务进度:</el-col>
                        <el-col :span="14">
                            <el-progress :percentage="goalProgress"></el-progress>
                        </el-col>
                        <el-col :span="5">
                            <span v-text="goal.mission_accomplish_amount"></span>
                            <span>/</span>
                            <span v-text="goal.mission_amount"></span>
                        </el-col>
                    </el-row>
                    <el-form :model="form" label-width="80px">
                        <el-form-item label="任务数量:">
                            <el-input-number v-model="form.amount"></el-input-number>
                        </el-form-item>
                        <el-form-item label="备注:">
                            <el-input v-model="form.remark"></el-input>
                        </el-form-item>
                        <el-form-item>

                            <el-button  @click="getRewards" v-if="goal.done_at" type="success" :disabled="!canGetRewards">领取奖励</el-button>
                            <el-button type="primary" @click="submitForm">提交</el-button>
                            <router-link :to="{name:'home'}">
                                <el-button>取消</el-button>
                            </router-link>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import router from '@/router';

    export default {
        name: "Show",
        components: {},
        data() {
            return {
                form: {
                    amount: 0,
                    remark: '',
                },
                goal: {},
                goalLogs: {},
                goalId: '',
                canGetRewards:false
            }
        },
        created() {
            const goalId = this.$route.params.goal;
            this.goalId = goalId;
            this.getGoal(goalId);
            this.getGoalLogs(goalId)
        },
        computed: {
            goalProgress() {
                if (Object.keys(this.goal).length) {
                    let percentage = this.goal.mission_accomplish_amount / this.goal.mission_amount;
                    if (percentage > 1) percentage = 1;
                    return parseInt(percentage * 100);
                } else {
                    return 0
                }
            }
        },
        methods: {
            async getGoal(goalId) {
                try {
                    const response = await this.$api.getGoal(goalId, {include: 'goalLogs'});
                    const goal = response.data;
                    if (goal) {
                        this.goal = goal;
                        this.canGetRewards = this.goal.can_get_the_awards;
                        this.form.remark = goal.remark
                    }
                } catch (e) {
                    console.log(e);
                    this.$message.error('目标不存在,跳转到新建页面');
                    router.push({name: 'goals.create'});
                }
            },
            async getGoalLogs(goalId) {
                try {
                    const response = await this.$api.getGoalLogs({goalId: goalId});
                    this.goalLogs = response.data.data.reverse();

                } catch (e) {
                    console.log(e);
                }
            },
            async submitForm() {
                const response = await this.$api.editGoal(this.goal.id, {
                    amount: this.form.amount,
                    remark: this.form.remark
                });
                if (response.status === 200) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.getGoalLogs(this.goalId)

                }
            },
            async getRewards() {
                if (this.goal.can_get_the_awards===true) {
                    const response = await this.$api.editGoal(this.goal.id, {
                        get_awards: 1,
                    });
                    if (response.status === 200) {
                        this.$message({
                            message: '领取奖励成功!',
                            type: 'success'
                        });
                        this.canGetRewards=false;
                        this.getGoalLogs(this.goalId)
                    }

                }else{
                    this.$message({
                        message: '不能重复领取奖励',
                        type: 'warning'
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/styles/_variables.scss";

    .el-collapse {
        border-top: 0;
        border-bottom: 0
    }

    .properties {
        padding: 8px;
        border-radius: 4px;
        background: #f8f9fa;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
        color: #212529;
    }

    .progress {
        margin-bottom: 12px;

        .label {
            font-size: 14px
        }
    }
</style>
