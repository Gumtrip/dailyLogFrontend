<template>
    <div>
        <el-form-item label="图片验证码:">
            <el-row>
                <el-col :span="10" id="captcha_container">
                    <img :src="captchaTpl" @click="getCaptcha">
                    <input type="hidden" name="captchaKey" v-model="captchaKey"/>
                </el-col>
                <el-col :span="10" >
                    <el-input  name="captchaCode" v-model="captchaCode"  placeholder="请输入图形验证码"></el-input>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="手机号码:">
            <el-row>
                <el-col :span="12">
                    <el-input  name="mobile"
                               v-model="mobile"></el-input>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-button type="primary" @click="getVerificationCode">获取验证码</el-button>
                </el-col>
            </el-row>
        </el-form-item>

    </div>
</template>

<script>
    export default {
        name: "VerificationCode",
        components: {},
        data() {
            return {
                mobile: '',
                captchaCode: '',//图片验证码
                captchaTpl: '',//图片验证码图片路径
                captchaKey: '',//图片验证码key,
                verificationKey: '',//短信验证码Key
                verificationCode: '',//短信验证码Code
            }
        },
        created() {
            this.getCaptcha();
            const auth = this.$store.state.auth;
            if(auth===true){
                const user = this.$store.state.user;
                this.mobile = user.mobile
            }
        },
        computed: {},
        methods: {
            getCaptcha() {
                this.$api.getCaptcha().then((response) => {
                    this.captchaTpl = response.data.captchaImageContent;
                    this.captchaKey = response.data.captchaKey;
                });
            },
            getVerificationCode() {
                this.$api.verificationCodes({
                    mobile: this.mobile,
                    captchaKey: this.captchaKey,
                    captchaCode: this.captchaCode
                }).then((response) => {
                    this.$message({
                        message: response.data.message,
                        type: 'success'
                    });
                    this.$emit('mobile',this.mobile);//verificationKey
                    this.$emit('verificationKey',response.data.key);//verificationKey
                }).catch(() => {
                    this.getCaptcha()
                })
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
