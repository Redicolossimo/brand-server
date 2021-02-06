Vue.component('big-cart', {
  data(){
    return {
      showCart: false,
      cartUrl: '/getBasket.json',
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
    remove(product, param){
      if(param === 0){
        this.$parent.delJson(`/api/cart/0`)
          .then(data => {
            if (data.result) {
              this.cartItems.splice(0);
            }
          });
      }
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
  template: `<div class="shop_cart container">
                <div class="cart__head">
                <p>Product Details</p>
                <p>unite Price</p>
                <p>Quantity</p>
                <p>shipping</p>
                <p>Subtotal</p>
                <p>ACTION</p>
            </div>
                <big-cart-item 
                     v-for="item of cartItems"
                     :key="item.id_product"
                     :img="item.product_img"
                     :cart-item="item"
                     @remove="remove"
                     ></big-cart-item>
                <div class="cart__buttons cart__buttons_unite">
                    <button @click="remove(cartItems, 0)">CLEAR SHOPPING CART</button>
                    <a href="product.html"><button>CONTINUE SHOPPING</button></a>
                </div>
                <div class="order_details container">
                    <div class="order_details__part">
                <h3 class="order_details__h3">SHIPPING ADRESS</h3>
                <div class="select__part order__place">
                    <div class="select__size select__place">
                        <p>Bangladesh</p>
                        <div class="caret"><i class="fas fa-caret-down"></i></div>
                    </div>
                </div>
                <div class="order__part_input">
                    <input type="text" placeholder="State">
                </div>
                <div class="order__part_input">
                    <input type="text" placeholder="Postcode / Zip">
                </div>
                <div class="cart__buttons cart__buttons_quote">
                    <button>GET A QUOTE</button>
                </div>
            </div>
                    <div class="order_details__part">
                <h3 class="order_details__h3">coupon discount</h3>
                <p class="coupon__p">Enter your coupon code if you have one</p>
                <div class="order__part_input">
                    <input type="text" placeholder="Coupon code">
                </div>
                <div class="cart__buttons cart__buttons_quote cart__buttons_coupon">
                    <button>APPLY COUPON</button>
                </div>
            </div>
                    <div class="order_details__part">
                <div class="totalize">
                    <p>sub total <span>what for it?</span></p>
                    <h3 class="order_details__h3">GRAND TOTAL <span>&#36;{{calcSum}}</span></h3>
                    <a class="button" href="#">
                        proceed to checkout
                    </a>
                </div>
            </div>
                </div>
             </div>`
});
