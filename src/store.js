import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const findByName = (needle, heystack) => {
  return heystack.find(possibleNeedle => possibleNeedle.name == needle.name)
}

const findIndexByName = (needle, heystack) => {
  return heystack.indexOf(possibleNeedle => possibleNeedle.name == needle.name)
}

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
      funds: 10000,
      stocks: [
        {
          name : 'BWM',
          price: 100,
          color: '#010306',
        },
        {
          name : 'Google',
          price: 200,
          color: '#f4c20d',
        },
        {
          name : 'Apple',
          price: 250,
          color: '#a5adb0',
        },
        {
          name : 'Twitter',
          price: 10,
          color: '#0084b4',
        },
        {
          name : 'Amazon',
          price: 300,
          color: '#ff9900',
        },
        {
          name : 'Netflix',
          price: 20,
          color: '#B9090B',
        },
        {
          name : 'Facebook',
          price: 50,
          color: '#3b5998',
        },
        {
          name : 'Spotify',
          price: 15,
          color: '#84bd00',
        },
      ],
      portfolio: []
    },
    mutations: {
      updateStocks (state, stocks) {
        state.stocks = stocks
      },
      addToFunds (state, value) {
        state.funds += value
      },
      subtractFromFunds (state, value) {
        state.funds -= value
      },
      addToPortfolio (state, buyTrade) {
        var portfolioStock = findByName(buyTrade, state.portfolio)
        if (portfolioStock) {
          portfolioStock.quantity += buyTrade.quantity
        } else {
          state.portfolio.push(buyTrade)
        }
      },
      removeFromPortfolio (state, sellTrade) {
        var portfolioStock = findByName(sellTrade, state.portfolio)
        var remaining = portfolioStock.quantity - sellTrade.quantity
        if (remaining == 0) {
          var index = findIndexByName(sellTrade, state.portfolio)
          state.portfolio.splice(index, 1 )
        } else {
          portfolioStock.quantity -= sellTrade.quantity
        }
      }
    },
    actions: {
      buy (context, buyTrade) {
        return new Promise((resolve, reject) => {
          var stock = findByName(buyTrade, context.state.stocks)
          var buyValue = buyTrade.quantity * stock.price
          context.commit('addToPortfolio', buyTrade)
          context.commit('subtractFromFunds', buyValue)
          resolve()
        });
      },
      sell (context, sellTrade) {
        return new Promise((resolve, reject) => {
          var stock = findByName(sellTrade, context.state.stocks)
          var sellValue = sellTrade.quantity * stock.price
          context.commit('removeFromPortfolio', sellTrade)
          context.commit('addToFunds', sellValue)
          resolve()
        });
      },
      endDay (context) {
        var stocks = context.state.stocks;
        stocks.forEach(stock => {
          var change = Math.round(stock.price * (0.55 - Math.random()) / 5)
          stock.price = stock.price + change
        })
        context.commit('updateStocks', stocks)
      }
    },
    getters: {
      getPortfolio(state) {
        var portfolioWithCurrentPrices = state.portfolio
        portfolioWithCurrentPrices.forEach(portfolioStock => {
          var stock = findByName(portfolioStock, state.stocks)
          portfolioStock.price = stock.price
          portfolioStock.color = stock.color
        })
        return portfolioWithCurrentPrices
      }
    }
  });

  export default store