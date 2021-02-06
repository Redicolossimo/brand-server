Vue.component('cart-item', {
  props: ['cartItem', 'img'],
  template: `<div class="cart__product">
                <div class="cart__pic">
                  <img :src="img" alt="cart_product">
                </div>
                <div class="cart__info">
                  <p><a href="single-page.html">{{cartItem.product_name}}</a></p>
                  <p>STARS</p>
                  <p>{{cartItem.quantity}} x $ {{cartItem.price}}</p>
                </div>
                <div>
                  <button class="cart__cancel_button" @click="$emit('remove', cartItem)">&times;</button>
                </div>
             </div>`
});
