<template>
    <div>
        <div>Hello World</div>
        <img :src="testSrc">
    </div>
</template>

<script>
export default {
    computed: {
        testSrc() {
            return require('./img/logo.png');
        },
    },
    mounted() {
        console.log(this.testSrc);
    },
};
</script>

<style>

</style>
