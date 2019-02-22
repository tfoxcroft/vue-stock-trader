<template>
    <div class="mb-4 mt-3">
    <div class="card">
        <div class="card-header text-white" :style="{backgroundColor : portfolioStock.color}">
            <strong>{{ portfolioStock.name }}</strong> 
            <small>Price: ${{ portfolioStock.price }} | Quantity: {{ portfolioStock.quantity }}</small>
        </div>
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <input 
                    type="number" 
                    class="form-control mr-5" 
                    placeholder="Quantity" 
                    v-model.number="quantity"/>
                <button 
                    class="btn btn-danger" 
                    @click="sell" 
                    :disabled="quantity == '' || quantity <= 0 || quantity > portfolioStock.quantity">
                    {{ (quantity > portfolioStock.quantity) ? 'Insufficient available' : 'Sell' }}
                </button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        props: ['portfolioStock'],
        data: function() {
            return {
                quantity: ""
            }
        },
        methods: {
            sell: function() {
                const sellTrade = {name : this.portfolioStock.name, quantity: this.quantity}
                this.$store.dispatch('sell', sellTrade)
                    .then(() => {
                        this.quantity = ''
                        this.$emit('sellTradeExecuted', sellTrade)
                    });
            }
        }
    }
</script>