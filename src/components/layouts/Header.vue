<template>
    <div class="container">
        <TheEntry></TheEntry>
    </div>
</template>

<script>
    import TheEntry from './TheEntry'
    import ls from '@/utils/localStorage';

    export default {
        name: "Header",
        components: {TheEntry},
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
