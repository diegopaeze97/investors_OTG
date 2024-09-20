document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío estándar y la redirección

    const form = event.target;
    const dialog1 =  document.getElementById("dialog1");
    const formData = new FormData(form);
    const tel = document.getElementById("tel").value;
    const email = document.getElementById("email").value;
    const responseMessage = document.getElementById("responseMessage");

    if (!tel && !email) {
        responseMessage.style.display = "block";
        return;
    } else {
        responseMessage.style.display = "none";
    }

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
        customAmountInput.style.display = "none"; // Hide the custom input field
        dialog1.showModal();

        setTimeout(() => {
            if (dialog1) {
            dialog1.close();
            }
        }, 5000);
        Calendly.initPopupWidget({url: 'https://calendly.com/oscar-otg/abundancia/30min'});
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
        customAmountInput.name  = "amount"; 
        amountSelect.removeAttribute("name");
    } else {
        customAmountInput.style.display = "none"; // Hide the custom input field
        customAmountInput.removeAttribute("name");
        amountSelect.name  = "amount";
    }
});

customAmountInput.addEventListener('input', function(event) {
    // Elimina cualquier carácter que no sea número y quita ceros a la izquierda
    let value = this.value.replace(/\D/g, '').replace(/^0+/, '');

    // Solo aplica el formato si el número tiene más de 3 dígitos (evita formateo prematuro)
    if (value.length > 3) {
        let numericValue = parseInt(value, 10);

        // Si la tecla presionada es 'Delete' o 'Backspace', reduce el valor numérico
        if (event.inputType === 'deleteContentBackward') {
            numericValue = 0; // Elimina el último dígito
        }

        // Aplica los límites
        if (numericValue > 100000000) {
            numericValue = 100000000;
        } else if (numericValue < 1000 && numericValue !== 0) {
            numericValue = 1000;
        }

        // Formatea el número y añade "$" y "USD"
        this.value = '$' + numericValue.toLocaleString('en-US') + ' USD';
    } else {
        // Permite escribir hasta que haya al menos 4 dígitos antes de formatear
        this.value = '$' + value;
    }

    // Si el campo está vacío, permitir que se borre el valor
    if (value === '') {
        this.value = '';
    }
});



