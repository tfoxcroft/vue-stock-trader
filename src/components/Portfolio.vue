<template>
    <div>
        <div v-if="getPortfolio.length != 0" class="card-deck">
            <PortfolioStock 
                v-for="portfolioStock in getPortfolio" 
                :key="portfolioStock.name" 
                :portfolioStock="portfolioStock"
                @sellTradeExecuted="sellTradeExecuted"/>
        </div>

        <div v-else class="card bg-light">
            <div class="card-body px-5 py-5">
                <span>You don't have any stocks in your portfolio. <router-link to="/stocks">Trade</router-link> now.</span>
            </div>
        </div>

        <transition name="fade" mode="out-in">
            <div v-if="message" class="alert alert-success text-center" role="alert">
                {{ message }}
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import PortfolioStock from './PortfolioStock.vue'

    export default {
        components: {
            PortfolioStock
        },
        data: () => {
            return {
                message: null
            }
        },
        computed: {
            ...mapGetters([
                'getPortfolio'
            ])
        },
        methods: {
            sellTradeExecuted(sellTrade) {
                const vm = this;
                vm.message = "Successfully sold " + sellTrade.quantity + " " + sellTrade.name + " stocks"
                setTimeout(() => {
                    vm.message = null
                },2000)
            }
        }
    }
</script>