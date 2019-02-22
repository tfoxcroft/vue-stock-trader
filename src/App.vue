<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col mx-5">
            <Header/>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header.vue'

    export default {
        components: {
            Header
        }
    }
</script>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.25s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>
