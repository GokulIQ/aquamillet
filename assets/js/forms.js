/**
 * AuraMillet Organics - Form Validation Controller
 * Production-quality HTML5 + JavaScript form validation with inline accessible errors,
 * trimmed inputs, safe sanitization, and honest demo submission feedback.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initNewsletterForms();
    initCheckoutEnquiryForm();
  });

  // --- CONTACT FORM ---
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      let isValid = true;

      // 1. Full Name
      const nameInput = document.getElementById('contactName');
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameInput || nameVal.length < 3) {
        showError(nameInput, 'Please provide your full name (minimum 3 characters).');
        isValid = false;
      } else {
        clearError(nameInput);
      }

      // 2. Email Address
      const emailInput = document.getElementById('contactEmail');
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailInput || !emailRegex.test(emailVal)) {
        showError(emailInput, 'Please provide a valid email address (e.g. name@example.com).');
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // 3. Phone Number
      const phoneInput = document.getElementById('contactPhone');
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (phoneInput && phoneVal.length > 0 && !phoneRegex.test(phoneVal)) {
        showError(phoneInput, 'Please enter a valid telephone number with area code.');
        isValid = false;
      } else if (phoneInput) {
        clearError(phoneInput);
      }

      // 4. Enquiry Type
      const typeSelect = document.getElementById('contactType');
      if (typeSelect && (!typeSelect.value || typeSelect.value === '')) {
        showError(typeSelect, 'Please select the type of your enquiry.');
        isValid = false;
      } else if (typeSelect) {
        clearError(typeSelect);
      }

      // 5. Subject
      const subjectInput = document.getElementById('contactSubject');
      const subjectVal = subjectInput ? subjectInput.value.trim() : '';
      if (!subjectInput || subjectVal.length < 4) {
        showError(subjectInput, 'Please enter an enquiry subject (minimum 4 characters).');
        isValid = false;
      } else {
        clearError(subjectInput);
      }

      // 6. Message
      const messageInput = document.getElementById('contactMessage');
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageInput || messageVal.length < 15) {
        showError(messageInput, 'Please provide a detailed message (minimum 15 characters).');
        isValid = false;
      } else {
        clearError(messageInput);
      }

      // 7. Consent Checkbox
      const consentCheck = document.getElementById('contactConsent');
      if (consentCheck && !consentCheck.checked) {
        showError(consentCheck, 'You must agree to our Privacy Policy to submit an enquiry.');
        isValid = false;
      } else if (consentCheck) {
        clearError(consentCheck);
      }

      if (!isValid) return;

      // Simulated sending state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        const alertContainer = document.getElementById('contactFormAlert');
        if (alertContainer) {
          alertContainer.className = 'alert alert-success d-flex align-items-start gap-3 mt-3';
          alertContainer.innerHTML = `
            <i class="bi bi-check-circle-fill fs-4 flex-shrink-0 text-success"></i>
            <div>
              <h5 class="alert-heading fs-6 mb-1">Submitted successfully</h5>
              <p class="small mb-0">Thank you, <strong>${escapeHtml(nameVal)}</strong>! This was a demo submission; no message was sent.</p>
            </div>
          `;
          alertContainer.style.display = 'flex';
          form.reset();
        }
      }, 1200);
    });
  }

  // --- NEWSLETTER SUBSCRIPTION FORMS ---
  function initNewsletterForms() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const emailVal = emailInput ? emailInput.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const feedback = form.querySelector('.newsletter-feedback');

        if (!emailRegex.test(emailVal)) {
          if (feedback) {
            feedback.textContent = 'Please enter a valid email address.';
            feedback.className = 'newsletter-feedback small text-warning mt-1';
            feedback.style.display = 'block';
          }
          return;
        }

        if (feedback) {
          feedback.textContent = 'Subscribed! Check your inbox for your 10% coupon code: MILLETS10.';
          feedback.className = 'newsletter-feedback small text-success mt-1';
          feedback.style.display = 'block';
        }
        form.reset();
      });
    });
  }

  // --- CHECKOUT ENQUIRY MODAL FORM ---
  function initCheckoutEnquiryForm() {
    // Every page with a basket needs a checkout, including catalog and bundle pages.
    if (!document.getElementById('checkoutDemoModal') && document.getElementById('cartCheckoutBtn')) {
      document.body.insertAdjacentHTML('beforeend', `
        <div class="modal fade" id="checkoutDemoModal" tabindex="-1" aria-labelledby="checkoutDemoModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title fs-5 font-serif" id="checkoutDemoModalLabel">Simulated Demo Checkout</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close checkout"></button>
              </div>
              <div class="modal-body p-4">
                <p class="small text-muted mb-3">Try the checkout with demonstration details. No payment is taken. Do not enter real card information.</p>
                <form id="checkoutDemoForm">
                  <div class="mb-3">
                    <label for="demoShippingAddress" class="form-label small">Shipping Address</label>
                    <input id="demoShippingAddress" type="text" class="form-control form-control-sm" placeholder="123 Demo Street, City, PIN" required>
                  </div>
                  <div class="row g-2 mb-3">
                    <div class="col-8">
                      <label for="demoCardNumber" class="form-label small">Simulated Card Number</label>
                      <input id="demoCardNumber" type="text" class="form-control form-control-sm" placeholder="4242 4242 4242 4242" autocomplete="off" required>
                    </div>
                    <div class="col-4">
                      <label for="demoCardExpiry" class="form-label small">Exp / CVC</label>
                      <input id="demoCardExpiry" type="text" class="form-control form-control-sm" placeholder="12/28 / 123" autocomplete="off" required>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary w-100">Complete Simulated Order</button>
                </form>
                <div id="checkoutDemoAlert" style="display: none;"></div>
              </div>
            </div>
          </div>
        </div>`);
    }
    const form = document.getElementById('checkoutDemoForm');
    if (!form) return;

    const modal = document.getElementById('checkoutDemoModal');
    const alertEl = document.getElementById('checkoutDemoAlert');
    if (!modal || !alertEl) return;

    const introduction = modal.querySelector('.modal-body > p');
    let completed = false;
    // Keep the confirmation visible when the completed form is hidden.
    form.after(alertEl);
    alertEl.setAttribute('role', 'status');
    alertEl.setAttribute('tabindex', '-1');

    modal.addEventListener('show.bs.modal', () => {
      completed = false;
      form.reset();
      form.hidden = false;
      if (introduction) introduction.hidden = false;
      alertEl.style.display = 'none';
      alertEl.replaceChildren();
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (completed) return;
      form.querySelectorAll('input').forEach(input => { input.value = input.value.trim(); });
      if (!form.reportValidity()) return;

      if (typeof AuraCart === 'undefined' || AuraCart.getCount() === 0) {
        alertEl.className = 'alert alert-warning mt-3 mb-0';
        alertEl.textContent = 'Your basket is empty. Add an item before completing your order.';
        alertEl.style.display = 'block';
        alertEl.focus();
        return;
      }

      completed = true;
      AuraCart.clearCart();
      form.reset();
      form.hidden = true;
      if (introduction) introduction.hidden = true;
      alertEl.className = 'text-center py-3';
      alertEl.innerHTML = `
        <i class="bi bi-check-circle-fill text-success display-4" aria-hidden="true"></i>
        <h3 class="h4 mt-3">Demo order completed successfully!</h3>
        <p class="text-muted mb-4">Thank you! Your basket has been cleared. This was a simulated order; no payment was taken.</p>
        <button type="button" class="btn btn-primary w-100" data-bs-dismiss="modal">Continue Shopping</button>`;
      alertEl.style.display = 'block';
      alertEl.focus();
    });
  }

  function showError(inputEl, message) {
    if (!inputEl) return;
    inputEl.classList.add('is-invalid');
    inputEl.setAttribute('aria-invalid', 'true');
    const feedback = inputEl.parentElement.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.textContent = message;
      feedback.style.display = 'block';
    }
  }

  function clearError(inputEl) {
    if (!inputEl) return;
    inputEl.classList.remove('is-invalid');
    inputEl.removeAttribute('aria-invalid');
    const feedback = inputEl.parentElement.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.style.display = 'none';
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
})();
