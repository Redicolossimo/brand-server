Vue.component('big-cart-item', {
  data(){
    return {

    }
  },
  props: ['cartItem', 'img'],
  methods: {
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  },
  template: `<div class="shop__unite">
                <div class="big-cart__img">
                    <img :src="img" alt="unite">
                </div>
                <div class="unite__details">
                    <h4><a class="unite__link" href="single-page.html">Mango People T-shirt</a></h4>
                    <p>Color: <span>Red</span></p>
                    <p>Size: <span>XXL</span></p>
                </div>
                <p class="unite__price">{{cartItem.price}}</p>
                <input class="unite__quantity" 
                       v-model="cartItem.quantity"
                       type="text"
                       @keypress="isNumber($event)"
                       :placeholder="cartItem.quantity">
                <p class="unite__ship">FREE</p>
                <p class="unite__subtotal">{{cartItem.quantity * cartItem.price}}</p>
                <div>
                    <button class="unite__cb" @click="$emit('remove', cartItem)">&times;</button>
                </div>
            </div>`
});
