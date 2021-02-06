Vue.component('cart', {
  data(){
    return {
      showCart: false,
      cartUrl: 'getBasket.json',
      cartItems: [],
    }
  },
  computed: {
    calcSum(){
      let accum = 0;
      this.cartItems.forEach(el => {
        accum += el.price * el.quantity;
      });
      return accum;
    },
    calcQuan(){
      let accum = 0;
      this.cartItems.forEach(el => {
        accum +=el.quantity;
      });
      return accum;
    }
  },
  mounted(){
    this.$parent.getJson(`/api/cart`)
      .then(data => {
        for (let el of data.contents){
          this.cartItems.push(el);
        }
      });
  },
  methods: {
    addProduct(product){
      let find = this.cartItems.find(el => el.id_product === product.id_product);
      if(find){
        this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
          .then(data => {
            if (data.result) {
              find.quantity++
            }
          });
      } else {
        let prod = Object.assign({quantity: 1}, product);
        this.$parent.postJson(`/api/cart`, prod)
          .then(data => {
            if (data.result) {
              this.cartItems.push(prod);
            }
          });
      }
    },
    remove(product){
      if(product.quantity > 1){
        this.$parent.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
          .then(data => {
            if (data.result) {
              product.quantity--
            }
          })
      } else {
        this.$parent.delJson(`/api/cart/${product.id_product}`)
          .then(data => {
            if (data.result) {
              this.cartItems.splice(this.cartItems.indexOf(product), 1);
            }
          })
      }
    },
  },
  template: `<div class="cart">
                <button class="cart__button_main" type="button" @click="showCart = !showCart"><img src="img/cart.svg" alt="cart"></button>
                <div class="cart_counter" v-if="calcQuan < 99">{{calcQuan}}</div>
                <div class="cart_counter" v-else>99+</div>
                <div class="cart-block" v-show="showCart">
                     <p v-if="!cartItems.length">Cart is empty</p>
                     <cart-item 
                     v-for="item of cartItems"
                     :key="item.id_product"
                     :img="item.product_img"
                     :cart-item="item"
                     @remove="remove"
                     ></cart-item>
                     <p class="total_price">TOTAL : $ {{calcSum}}</p>
                     <div class="cart__buttons">
                         <a href="checkout.html"><button>CHECK OUT</button></a>
                         <a href="shopping-cart.html"><button>GO CART</button></a>
                     </div>
                </div>
             </div>`
});
