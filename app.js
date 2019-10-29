console.log('connected...');

// GLOBAL VARIABLES 
// let CartItems = [];


// SHOW CARRT
(function(){
    const button = document.getElementById('show-cart-button');
    const cart = document.getElementById('cart');

    button.addEventListener( 'click', showCartMenu );

    function showCartMenu() {
        cart.classList.toggle('show-cart');

        button.innerText === 'Show Cart' 
            ? button.innerText ='Close Cart' 
            : button.innerText ='Show Cart';
    }

})();

// ADD ITEM TO CART
(function(){
    const cartBtn = document.querySelectorAll('.add-item-btn');
    
    cartBtn.forEach(function(btn) {

        btn.addEventListener( 'click', function(event) {
            let itemId = event.target.id;
            let fullPath = event.target.previousElementSibling.firstElementChild.src;
            let itemName = event.target.previousElementSibling.previousElementSibling.innerHTML;
            let itemPrice = event.target.nextElementSibling.children[2].innerHTML;

            console.log(event.target.nextElementSibling.children[2].innerHTML, "TEST");

            const item = {};
            item.id = itemId,
            item.image = fullPath,
            item.name = itemName
            item.price = itemPrice.slice(1).trim();

            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src=${item.image} alt=${itemName} />
                <h2>${item.name}</h2>
                <h2 class="cart-item-price">${item.price}</h2>
            `;

            // get cart
            const cart = document.getElementById('cart');
            const total = document.querySelector('.total-container');
            
            cart.insertBefore(cartItem, total);
            
            const cartTotal = document.getElementById('cart-total');
            cartTotal.textContent = showTotal().toFixed(2);

        })     
    });

    function showTotal() {

        const total = [];
        const item = document.querySelectorAll('.cart-item-price');
        

        item.forEach(function(singleItem) {
            total.push(parseFloat(singleItem.textContent) ); 
        });

        document.getElementById('total-items').textContent = total.length;

        return total.reduce(function(sum, item) {
            return sum + item;
        },0);


    }
})();

// CLEAR CART
(function(){
    const clearButton = document.getElementById('clear-cart');
    console.log(clearButton);

    clearButton.addEventListener('click', function() {
        console.log('something');
        const cartTotalPrice = document.getElementById('cart-total');
        cartTotalPrice.textContent = 0;

        const deleteThis = document.querySelector('.total-container');
        console.log(deleteThis.previousElementSibling);

        document.getElementById('total-items').textContent = 0;
    });




})()
