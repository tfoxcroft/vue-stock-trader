<template>
    <div>
        <div class="card-deck">
            <Stock 
                v-for="stock in stocks" 
                :key="stock.name" 
                :stock="stock" 
                @buyTradeExecuted="buyTradeExecuted"/>
        </div>
        <transition name="fade" mode="out-in">
            <div v-if="message" class="alert alert-success text-center" role="alert">
                {{ message }}
            </div>
        </transition>
    </div>
</template>

<script>
    import Stock from './Stock.vue'

    export default {
        components: {
            Stock
        },
        data: () => {
            return {
                message: null
            }
        },
        computed: {
            stocks: function() {
                return this.$store.state.stocks;
            }
        },
        methods: {
            buyTradeExecuted(buyTrade) {
                const vm = this;
                vm.message = "Successfully bought " + buyTrade.quantity + " " + buyTrade.name + " stocks"
                setTimeout(() => {
                    vm.message = null
                },2000)
            }
        }
    }
</script>