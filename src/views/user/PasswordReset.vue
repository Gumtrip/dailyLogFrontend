<template>
    <el-card class="box-card">
        <div slot="header">
            修改资料
        </div>
        <el-form :model="userForm" label-position="left" label-width="100px">
            <VerificationCode v-bind:phone="userForm.phone" v-on:verificationKey="getVerificationKey" />

            <el-form-item label="短信验证码">
                <el-input v-model="verificationCode"></el-input>
                <input type="hidden"  name="verificationKey" v-model="verificationKey"/>
            </el-form-item>

            <el-form-item label="密码">
                <el-input  type="password"
                          v-model="userForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input  type="password" v-model="userForm.password_confirmation"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    import ls from '@/utils/localStorage';
    import VerificationCode from '@/components/utils/VerificationCode';
    import {mapState} from 'vuex';

    export default {
        name: "PasswordReset",
        components:{VerificationCode},
        data() {
            return {
                user: ls.getItem('user'),
                userForm: {
                    password: '',
                    password_confirmation: '',
                },
                verificationKey: '',//短信验证码Key
                verificationCode: '',//短信验证码Code

            }
        },
        computed: {},
        created() {
            const user = this.$store.state.user;
            if (user && typeof user === 'object') {
                this.userForm.phone = user.phone;
            }
        },

        methods: {
            getVerificationKey(key){
                this.verificationKey = key;
            },
            submitForm() {
                        this.$api.userPasswordReset({
                            verificationKey: this.verificationKey,
                            verificationCode: this.verificationCode,
                            password: this.userForm.password,
                            password_confirmation: this.userForm.password_confirmation,
                        }).then((response) => {
                            this.$message({
                                message: '修改成功,请重新登陆才能生效',
                                type: 'success'
                            });
                        })
            },
        }
    }
</script>

<style scoped>

</style>
