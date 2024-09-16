document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío estándar y la redirección

    const form = event.target;
    const formData = new FormData(form);

    fetch('https://formspree.io/f/xovazdyv', {
    method: 'POST',
    body: formData,
    headers: {
        'Accept': 'application/json'
    }
    })
    .then(response => {
    if (response.ok) {
        form.reset();
        Calendly.initPopupWidget({url: 'https://calendly.com/diegopaeze/30min'});
        return false;
    } else {
        response.json().then(data => {
        if (data.errors) {
            alert(data.errors.map(error => error.message).join(', '));
        }
        });
    }
    })
    .catch(error => console.error('Error:', error));
});


///monto personalizado

const amountSelect = document.getElementById("amount");
const customAmountInput = document.getElementById("custom-amount-input"); // Assuming you have an input field with this ID

amountSelect.addEventListener("change", function() {
    if (amountSelect.value === "custom") {
        customAmountInput.style.display = "block"; // Show the custom input field
        customAmountInput.style.name  = "amount"; 
        amountSelect.removeAttribute("name");
    } else {
        customAmountInput.style.display = "none"; // Hide the custom input field
        customAmountInput.removeAttribute("name");
        amountSelect.name  = "amount";
    }
});