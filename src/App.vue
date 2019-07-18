<template>
    <div id="app">
        <el-container>
            <el-header height="auto"><Header></Header></el-header>
        </el-container>
        <el-main>
            <div style="height: 100px"></div>
            <router-view/>
        </el-main>
    </div>
</template>

<script>
    import Header from '@/components/layouts/Header';

    export default {
        name: 'App',
        components: {Header}
    }
</script>

<style lang="scss">
    @import "styles/custom";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

</style>
