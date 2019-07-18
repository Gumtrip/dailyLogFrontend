<template>
    <el-menu mode="horizontal" class="loginMenu" :default-active="$route.path" :router="true">
        <el-menu-item v-for="(item,key) in menuList" :key="key" :index="item.url" v-text="item.title" :route="item.url">
            手机验证码登陆
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "LoginMenu",
        components: {},
        data() {
            return {
                defaultIndex:'/auth/loginViaCode',
                menuList:[
                    {title:'手机验证码登陆',url:'/auth/loginViaCode'},
                    {title:'密码登陆',url:'/auth/login'}
                ]
            }
        },
        created() {

        },
        computed: {},
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .loginMenu{margin-bottom: 20px}
</style>
