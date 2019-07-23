<template>
    <div class="container">
        <CategoryList></CategoryList>
    </div>
</template>

<script>
    import CategoryList from '@/views/goalCategory/components/CategoryList'

    export default {
        name: "Index",
        components: {CategoryList},
        data() {
            return {}
        },
        created() {

        },
        computed: {},
        methods: {}
    }
</script>

<style lang="scss" scoped>

</style>
