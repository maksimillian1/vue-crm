<template>
  <div>
  <div class="page-title">
    <h3>Счет</h3>

    <button class="btn waves-effect waves-light btn-small" @click="refresh">
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <Loader v-if="loading"/>
  <div v-else class="row">
    <HomeBill :bill="bill" :currency="currency" />
    <HomeCurrency :currency="currency" />
  </div>

</div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'
import {loadCurrency} from '@/utils/services'

export default {
  name: 'Home',
  components: {
    HomeBill,
    HomeCurrency
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    await loadCurrency(this);
  },
  computed: {
    bill: function() {return this.$store.getters.userInfo.bill}
  },
  methods: {
    async refresh() {
      this.loading = true
      await loadCurrency(this);
    }
  }
}
</script>
