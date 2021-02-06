Vue.component('product', {
  props: ['product', 'img'],
  template: `<div class="items">
                    <a href="single-page.html"> 
                      <img class="items__img" :src="img" :alt="product.product_name">
                    </a>
                    <div class="items__text">
                        <h6 class="items__h6">
                            NAMGO PEOPLE T-SHIRT <br>
                            <span class="items__cost">$52.00</span>
                        </h6>
                    </div>
                    <div class="items__add" @click="$root.$refs.cart.addProduct(product)">
                      <img src="img/cart_white.svg" alt="cart">
                      Add to Cart
                    </div>
                    <div class="items__add items__add_small1"><img src="img/refresh.png" alt="cart"></div>
                    <div class="items__add items__add_small2"><img src="img/heart.png" alt="cart"></div>
                </div>`
});