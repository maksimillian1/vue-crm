export const loadCurrency = async (ctx) => {
    ctx.currency = await ctx.$store.dispatch('fetchCurrency')
    ctx.$store.commit('setCurrency', ctx.currency)
    ctx.loading = false
}  