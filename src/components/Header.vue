<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light my-4 px-3 py-2">
        <router-link class="navbar-brand" to="/">Stock Trader</router-link>
        <button class="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <router-link class="nav-item" tag="li" to="/portfolio" active-class="active">
                    <a class="nav-link">Portfolio</a>
                </router-link>
                <router-link class="nav-item" tag="li" to="/stocks" active-class="active">
                    <a class="nav-link">Stocks</a>
                </router-link>
            </ul>

            <div>
                <ul class="navbar-nav">
                    <li class="nav-item active mr-3">
                        <a class="nav-link" href="#" @click="endDay">End Day</a>
                    </li>
                    <li class="nav-item dropdown mr-3" :class="{show : dropdownOpen}">
                        <a 
                            @click="dropdownOpen = !dropdownOpen"
                            class="nav-link dropdown-toggle" 
                            href="#" 
                            id="navbarDropdown" 
                            role="button" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">
                        Data
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown" :class="{show : dropdownOpen}">
                            <a class="dropdown-item" href="#" @click="reset">Reset</a>
                        </div>
                    </li>
                    <span class="navbar-text">
                        <strong>Funds: ${{ funds }}</strong>
                    </span>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        data () {
            return {
                dropdownOpen: false
            }
        },
        computed: {
            funds: function() {
                return this.$store.state.funds
            }
        },
        methods: {
            endDay() {
                this.$store.dispatch('endDay')
            },
            reset() {
                localStorage.removeItem('vuex')
                window.location.reload()
            },
        }
    }
</script>