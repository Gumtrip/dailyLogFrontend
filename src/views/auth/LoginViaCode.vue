<template>
    <div class="container">
        <el-row type="flex" justify="center">
            <el-col :span="14">
                <el-alert
                    title="未注册用户登陆后将直接注册！"
                    type="info">
                </el-alert>
            <Menu></Menu>
            <el-card>

                <div slot="header">

                    手机验证码登陆
                </div>
                <el-form  label-position="left" label-width="100px">

                    <VerificationCode v-on:mobile="getMobile" v-on:verificationKey="getVerificationKey" />
                    <el-form-item label="短信验证码">
                        <el-input  name="verificationCode" v-model="verificationCode"></el-input>
                        <input type="hidden" name="verificationKey"  v-model="verificationKey"/>
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
    import VerificationCode from '@/components/utils/VerificationCode';

    export default {
        name: "LoginViaCode",
        components: {Menu,VerificationCode},
        data() {
            return {
                mobile: '',
                verificationCode: '',//短信验证码Code
                verificationKey: '',//短信验证码Key
            }
        },
        created() {

        },
        computed: {},
        methods: {
            getVerificationKey(key){
                this.verificationKey = key;
            },
            getMobile(mobile){
                this.mobile = mobile;
            },
            async submitForm() {
                try{
                    let response = await this.$api.loginViaCode({
                        mobile: this.mobile,
                        verificationKey: this.verificationKey,
                        verificationCode: this.verificationCode,
                    });
                    if(response.status===201){
                        await this.$store.dispatch('setToken', response.data);
                        this.$message({
                            message: '登陆成功',
                            type: 'success'
                        });
                        const user = await this.$api.userMe();
                        this.$store.dispatch('login', user.data);

                    }
                }catch (e) {
                    console.log(e);
                }


            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
