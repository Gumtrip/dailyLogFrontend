<template>
    <div class="container">
        <router-link :to="{name:'home'}">
            <el-button type="primary">返回</el-button>
        </router-link>
        <div style="height: 10px"></div>
        <el-card>
            <el-form :model="form" label-width="80px">
                <el-form-item label="名称:" >
                    <el-input v-model="form.title"></el-input>
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
    import router from '@/router';

    export default {
        name: "CreateAndEdit",
        components: {},
        data() {
            return {
                form:{
                    title:'',
                },
                goalCategory:[]
            }
        },
        created() {
            const goalCategoryId = this.$route.params.goalCategoryId;

            if(goalCategoryId){
                this.getGoalCategory(goalCategoryId)
            }
        },
        computed: {},
        methods: {
            async submitForm(){
                try {
                    let  response,data,message;
                    data={
                        title:this.form.title,
                    };
                    if(Object.keys(this.goalCategory).length>0){
                        response = await this.$api.editGoalCategory(this.goalCategory.id,data);
                        message='修改成功';
                    }else{
                        response =await this.$api.createGoalCategory(data);
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
            async getGoalCategory(goalCategoryId){
                try {
                    const response = await this.$api.getGoalCategory(goalCategoryId);
                    const goalCategory = response.data;
                    if(goalCategory){
                        this.goalCategory=goalCategory;
                        this.form={
                            title:goalCategory.title,
                        }
                    }
                }catch (e) {
                    console.log(e);
                    // this.$message.error('目标不存在,跳转到新建页面');
                    // router.push({name:'goals.create'});
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
