<template>
    <div>
        <el-row v-if="auth">
            <el-dropdown>
                <el-button type="primary" class="el-dropdown-link">
                    {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item><router-link :to="{name:'user'}" >个人中心</router-link></el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </el-row>
        <el-row v-else>
            <router-link :to="{name:'login.code'}" replace>
                <el-button type="primary">登陆</el-button>
            </router-link>
        </el-row>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: "TheEntry",
        components: {},
        data() {
            return {}
        },
        created() {
        },
        computed: {
            ...mapState([
                'auth',
                'user'
            ])
        },
        methods: {
            logout(){
                this.$confirm('是否退出?','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type:'warning'
                }).then(()=>{
                    this.$api.logout();
                    this.$nextTick(function(){
                        this.$store.dispatch('logout');
                        this.$message({
                            message: '登出成功',
                            type: 'success'
                        })
                    })
                }).catch(()=>{});
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
