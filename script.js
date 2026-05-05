const cartStorageKey = 'bookHavenCart';
const contactStorageKey = 'bookHavenContactSubmission';

function getCart() {
  const storedCart = sessionStorage.getItem(cartStorageKey);
  return storedCart ? JSON.parse(storedCart) : [];
}

function saveCart(cartItems) {
  sessionStorage.setItem(cartStorageKey, JSON.stringify(cartItems));
}

function renderCart() {
  const cartItemsList = document.getElementById('cartItems');
  const emptyCartMessage = document.getElementById('emptyCartMessage');

  if (!cartItemsList || !emptyCartMessage) {
    return;
  }

  const cartItems = getCart();
  cartItemsList.innerHTML = '';

  if (cartItems.length === 0) {
    emptyCartMessage.hidden = false;
    return;
  }

  emptyCartMessage.hidden = true;

  cartItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    cartItemsList.appendChild(listItem);
  });
}

function openCartModal() {
  const cartModal = document.getElementById('cartModal');

  if (!cartModal) {
    return;
  }

  renderCart();
  cartModal.hidden = false;
}

function closeCartModal() {
  const cartModal = document.getElementById('cartModal');

  if (cartModal) {
    cartModal.hidden = true;
  }
}

function setupNewsletterForms() {
  const newsletterForms = document.querySelectorAll('.newsletter-form');

  newsletterForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }

      alert('Thank you for subscribing.');
      form.reset();
    });
  });
}

function setupShoppingCart() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const viewCartButton = document.getElementById('viewCartBtn');
  const closeCartButton = document.getElementById('closeCartBtn');
  const clearCartButton = document.getElementById('clearCartBtn');
  const processOrderButton = document.getElementById('processOrderBtn');
  const cartModal = document.getElementById('cartModal');

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product;
      const cartItems = getCart();
      cartItems.push(productName);
      saveCart(cartItems);
      alert('Item added.');
    });
  });

  if (viewCartButton) {
    viewCartButton.addEventListener('click', openCartModal);
  }

  if (closeCartButton) {
    closeCartButton.addEventListener('click', (event) => {
      event.stopPropagation();
      closeCartModal();
    });
  }

  if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
      sessionStorage.removeItem(cartStorageKey);
      renderCart();
      alert('Cart cleared.');
    });
  }

  if (processOrderButton) {
    processOrderButton.addEventListener('click', () => {
      sessionStorage.removeItem(cartStorageKey);
      renderCart();
      closeCartModal();
      alert('Thank you for your order.');
    });
  }

  if (cartModal) {
    cartModal.addEventListener('click', (event) => {
      if (event.target === cartModal) {
        closeCartModal();
      }
    });
  }
}

function setupContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) {
    return;
  }

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const submission = {
      name: document.getElementById('customerName').value.trim(),
      email: document.getElementById('customerEmail').value.trim(),
      phone: document.getElementById('customerPhone').value.trim(),
      message: document.getElementById('customerMessage').value.trim(),
      customOrder: document.getElementById('customOrder').checked,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(contactStorageKey, JSON.stringify(submission));
    alert(`Thank you for your message, ${submission.name}.`);
    contactForm.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupNewsletterForms();
  setupShoppingCart();
  setupContactForm();
});