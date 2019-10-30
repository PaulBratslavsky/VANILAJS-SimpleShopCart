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

            // shows the clear cart button ( can be done better )
            const clearCartButton = document.getElementById('clear-cart');
            clearCartButton.classList.remove('hide');

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
                <button class="cart-item-remove-button">x</button>
            `;

            const cartItemsContainer = document.querySelector('.cart-items-container');
            console.log(cartItemsContainer, "SHOW ME");

            cartItemsContainer.appendChild(cartItem);
                        
            const cartTotal = document.getElementById('cart-total');
            cartTotal.textContent = `$${showTotal().toFixed(2)}`;

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

    clearButton.addEventListener('click', function() {
        
        const cartTotalPrice = document.getElementById('cart-total');
        cartTotalPrice.textContent = 0;

        // hide clear cart button
        const clearCartButton = document.getElementById('clear-cart');
        clearCartButton.classList.add('hide');

        // select all items in cart
        const itemsToClear = document.querySelector('.cart-items-container');

        // change to array so can loop through with forEach
        let myItems = [...itemsToClear.children]

        // loop through and delete
        myItems.forEach( function(item) {
            item.parentNode.removeChild(item);
        });
        
        // reset starting total to zero
        document.getElementById('total-items').textContent = 0;
    });


})();

// Remove Single Item
(function() {
    const itemsToClear = document.querySelector('.cart-items-container');

   

    itemsToClear.addEventListener('click', function(event){
        if ( event.target.classList.contains('cart-item-remove-button') ) {
            itemsToClear.removeChild(event.target.parentNode);

            function subtractTotal() {

                const startingAmount = parseFloat(document.getElementById('cart-total').textContent.slice(1));
                console.log(startingAmount, "starting Amount");

                const startingTotal = parseInt(document.getElementById('total-items').textContent);
                console.log(startingTotal, "starting Total");


                const currentItemPrice = parseFloat(event.target.previousElementSibling.textContent);
                const newTotalAmount = startingAmount - currentItemPrice;
                
                console.log(newTotalAmount, 'new total');
        
                document.getElementById('total-items').textContent = startingTotal - 1;
                document.getElementById('cart-total').textContent = `$${newTotalAmount.toFixed(2)}`;
            }


            subtractTotal();


            if ( itemsToClear.children.length === 0 ) {
                // hide clear cart button
                const clearCartButton = document.getElementById('clear-cart');
                clearCartButton.classList.add('hide');
            }
        }
    })

})();


