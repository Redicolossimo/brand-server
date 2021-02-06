Vue.component('catalog', {
  data(){
    return {
      catalogUrl: '/catalogData.json',
      catalog: [],
      //loaded: true,
    }
  },
  props: ['amount'],
  mounted(){
      this.$parent.getJson(`api/catalog`)
          .then(data => {
              for (let el of data.products){
                  this.catalog.push(el);
              }
              console.log(this.catalog);
          });
  },
  computed: {
    createMiniArray() {
      return this.catalog.filter((item, index) => {
        return index < this.amount;
      });
    }
  },
  template: `<div class="items_box">
            <product
            v-for="product of createMiniArray"
            :key="product.id_product"
            :img="product.product_img"
            :product="product"
            ></product>
        </div>`
});