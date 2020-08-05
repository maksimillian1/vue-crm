<template>
    <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>

          <p class="currency-line" v-for="item in currConsts" :key="item">
            <span>{{getCurrency(item) | currency(item)}}</span>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: ['bill', 'currency'],
    data: () => ({
        currConsts: ['RUB', 'EUR', 'USD']
    }),
    computed: {
        base() {
            return this.$store.getters.userInfo.bill / (this.currency.rates['RUB'] / this.currency.rates['EUR'])
        }
    },
    methods: {
        getCurrency(currency) {
            return Math.floor(this.base * this.currency.rates[currency])
        }
    }
}
</script>