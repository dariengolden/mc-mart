let navbar = document.querySelector('.navbar')

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    loginForm.classList.remove('active');
    searchForm.classList.remove('active');
}
 

let searchForm = document.querySelector('.search-form')

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
    searchForm.classList.remove('active');
}
 
var swiper = new Swiper(".review-slider", {
    loop:true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 5500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});


// Checkout popup

var stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
        var elements = stripe.elements();

        var card = elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    fontFamily: 'Arial, sans-serif',
                }
            }
        });

        card.mount('#card-element');

        card.addEventListener('change', function(event) {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });

        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the token and additional form data to your server to charge the user.
                    console.log(result.token);
                    var formData = new FormData(form);
                    formData.append('stripeToken', result.token.id);
                    // Example: Send form data to server using fetch API
                    fetch('/charge', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.message);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            });
        });

        function togglePopup() {
            var overlay = document.getElementById('overlay');
            var popup = document.getElementById('popup');

            if (popup.style.display === 'block') {
                overlay.style.display = 'none';
                popup.style.display = 'none';
            } else {
                overlay.style.display = 'block';
                popup.style.display = 'block';
            }
        }

// Get the login form and the login button
var loginForm = document.getElementById('loginForm');
var loginButton = document.getElementById('loginButton');

// Function to open the login form
function openLoginForm() {
    loginForm.style.display = 'block';
}

// Function to close the login form
function closeLoginForm() {
    loginForm.style.display = 'none';
}

// Event listener to open the login form when the login button is clicked
loginButton.addEventListener('click', openLoginForm);