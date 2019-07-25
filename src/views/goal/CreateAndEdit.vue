<template>
    <div class="container">

        <div>
            <router-link :to="{name:'home'}">
                <el-button type="primary">返回</el-button>
            </router-link>
        </div>
        <div style="height: 10px"></div>

        <el-card>
            <el-form :model="form" label-width="80px">
                <el-form-item label="名称:" >
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="备注:" >
                    <el-input type="textarea"  v-model="form.remark"></el-input>
                </el-form-item>
                <el-form-item label="奖金:" >
                    <el-input v-model="form.bonus"></el-input>
                </el-form-item>
                <el-form-item label="任务数量:" >
                    <el-input v-model="form.missionAmount"></el-input>
                </el-form-item>
                <el-form-item label="时间范围:" >
                    <el-date-picker
                        :editable="false"
                        v-model="form.dateRange"
                        type="datetimerange"
                        align="right"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <router-link :to="{name:'home'}">
                        <el-button >取消</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import moment from 'moment';
    import router from '@/router';

    export default {
        name: "CreateAndEdit",
        components: {},
        data() {
            return {
                form:{
                    title:'',
                    remark:'',
                    bonus:3,
                    missionAmount:1,
                    dateRange:[],
                },
                dateFormat:'YYYY-MM-DD hh:mm:ss',
                goal:[]
            }
        },
        created() {
            this.form.dateRange=[this.today,this.tomorrow];
            const goalId = this.$route.params.goal;
            if(goalId){
                this.getGoal(goalId)
            }

        },
        computed: {
            today(){
                return moment().format('YYYY-MM-DD')
            },
            tomorrow(){
                return moment().add(1, 'd').format('YYYY-MM-DD')
            }
        },
        methods: {
            async submitForm(){
                try {
                    let  response,data,message;
                    data={
                        title:this.form.title,
                        remark:this.form.remark,
                        bonus:this.form.bonus,
                        mission_amount:this.form.missionAmount,
                        start_at:moment(this.form.dateRange[0]).format(this.dateFormat),
                        end_at:moment(this.form.dateRange[1]).format(this.dateFormat),
                    };
                    if(Object.keys(this.goal.length)>0){
                        response = await this.$api.editGoal(this.goal.id,data);
                        message='修改成功';
                    }else{
                        response =await this.$api.createGoal(data);
                        message='添加成功';
                    }
                    if(response.status===201||response.status===200){
                        this.$message({
                            message: message,
                            type: 'success'
                        });
                    }
                }catch (e) {
                    console.log(e);
                }

            },
            async getGoal(goalId){
                try {
                    const response = await this.$api.getGoal(goalId);
                    const goal = response.data;
                    if(goal){
                        this.goal=goal;
                        this.form={
                            title:goal.title,
                            remark:goal.remark,
                            bonus:goal.bonus,
                            missionAmount:goal.mission_amount,
                            dateRange:[goal.start_at,goal.end_at],
                        }
                    }
                }catch (e) {
                    console.log(e);
                    this.$message.error('目标不存在,跳转到新建页面');
                    router.push({name:'goals.create'});
                }
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>
