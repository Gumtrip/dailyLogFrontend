<template>
    <div class="container">
        <el-row type="flex" justify="center">
            <el-col :span="14">
                <Menu></Menu>
                <el-card>
                    <div slot="header">
                        密码登陆
                    </div>
                    <el-form :model="loginForm" label-position="left" label-width="100px">
                        <el-form-item label="移动电话：">
                            <el-input name="mobile" v-model="loginForm.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input type="password" v-model="loginForm.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Menu from './LoginMenu';
    export default {
        name: "Login",
        components: {Menu},
        data() {
            return {
                loginForm: {
                    mobile: '',
                    password: ''
                },
            }
        },
        created() {

        },
        computed: {},
        methods: {
            async submitForm() {
                try {
                    let authResponse = await this.$api.login({
                        mobile: this.loginForm.mobile,
                        password: this.loginForm.password,
                    });
                    if (authResponse.status === 201) {
                        await this.$store.dispatch('setToken', authResponse.data);
                        this.$message({
                            message: '登陆成功',
                            type: 'success'
                        });
                        const user = await this.$api.userMe();
                        this.$store.dispatch('login', user.data);
                    }
                } catch (e) {
                    console.log(e);
                }


            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
