<template>
    <div class="card bg-light">
        <div class="card-body px-5 py-5">
            <h1>Trade or View your Portfolio</h1>
            <div>You may Save & Load your Data</div>
            <div>Click on 'End Day' to begin a new day!</div>
            <br/>
            <hr/>
            <br/>
            <strong>Your funds: $ {{ funds }}</strong>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        funds: function() {
            return this.$store.state.funds;
        }
    }
}
</script>