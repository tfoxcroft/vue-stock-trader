<template>
    <div class="mb-4 mt-3">
    <div class="card">
        <div class="card-header text-white" :style="{backgroundColor : stock.color}">
            <strong>{{ stock.name }}</strong> <small>Price: ${{ stock.price }}</small>
        </div>
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <input 
                    type="number" 
                    class="form-control mr-5" 
                    placeholder="Quantity" 
                    v-model.number="quantity"/>
                <button 
                    class="btn btn-success" 
                    @click="buy" 
                    :disabled="quantity == '' || quantity <= 0 || funds < quantity * stock.price">
                    {{ (funds >= quantity * stock.price) ? 'Buy' : 'Insuffcient funds' }}
                </button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        props: ['stock'],
        data: function() {
            return {
                quantity: ""
            }
        },
        computed: {
            funds: function() {
                return this.$store.state.funds
            }
        },
        methods: {
            buy: function() {
                const buyTrade = {name : this.stock.name, quantity: this.quantity}
                this.$store.dispatch('buy', buyTrade)
                    .then(() => {
                        this.quantity = ''
                        this.$emit('buyTradeExecuted', buyTrade)
                    });
            }
        }
    }
</script>