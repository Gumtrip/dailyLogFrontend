<template>
    <div class="container">
        <el-row type="flex" justify="space-between" :gutter="30">
            <el-col :span="4">
                <el-menu class="" :default-active="$route.path" :router="true" mode="vertical">
                    <el-menu-item :route="link.name" v-for="(link,index) in links" :key="index"
                                  :index="`/user/${link.name}`">
                        {{link.title}}
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Layout",
        data() {
            return {
                links: [
                    {
                        name: '',
                        title: '个人信息',
                    },
                    {
                        name: 'edit',
                        title: '修改信息',
                    },
                    {
                        name: 'passwordReset',
                        title: '修改密码',
                    }
                ]
            }
        },
    }
</script>

<style scoped>

</style>
