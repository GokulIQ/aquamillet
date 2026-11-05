/**
 * AuraMillet Organics - Main Global Controller
 * Manages sticky navbar scroll, search modal live autocomplete,
 * and mobile UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Match the footer brand to the header's actual responsive width.
  const headerLogo = document.querySelector('.site-header .brand-logo');
  if (headerLogo) {
    const syncBrandSize = () => {
      document.documentElement.style.setProperty('--header-logo-width', headerLogo.clientWidth + 'px');
    };
    syncBrandSize();
    new ResizeObserver(syncBrandSize).observe(headerLogo);
  }

  // 1. Sticky Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Search Modal Live Autocomplete
  const modalSearchInput = document.getElementById('globalModalSearchInput');
  const modalSearchResults = document.getElementById('globalModalSearchResults');

  if (modalSearchInput && modalSearchResults) {
    modalSearchInput.addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      if (!q || q.length < 2) {
        modalSearchResults.innerHTML = '<p class="text-muted text-center py-4 mb-0 small">Type at least 2 characters to search millet products and recipes...</p>';
        return;
      }

      if (typeof PRODUCTS_DATA === 'undefined') return;

      const matches = PRODUCTS_DATA.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        (p.shortDescription || '').toLowerCase().includes(q)
      ).slice(0, 5);

      if (matches.length === 0) {
        modalSearchResults.innerHTML = `
          <div class="text-center py-4">
            <i class="bi bi-search text-muted fs-3 mb-2 d-block"></i>
            <p class="text-muted mb-0 small">No millet products found matching "<strong>${escapeHtml(q)}</strong>".</p>
          </div>
        `;
        return;
      }

      modalSearchResults.innerHTML = `
        <div class="list-group list-group-flush">
          ${matches.map(p => `
            <a href="product-details.html?id=${p.id}" class="list-group-item list-group-item-action d-flex align-items-center gap-3 p-2.5 border-bottom border-light">
              <img src="${p.image}" alt="${p.name}" style="width: 48px; height: 48px; border-radius: 8px; object-fit: cover;">
              <div class="flex-grow-1">
                <div class="fw-bold text-main small mb-0.5">${p.name}</div>
                <div class="text-muted small">${p.categoryLabel} • ${p.weight}</div>
              </div>
              <div class="fw-bold text-brand">${formatPrice(p.price)}</div>
            </a>
          `).join('')}
          <div class="text-center pt-3">
            <a href="products.html?q=${encodeURIComponent(q)}" class="btn btn-sm btn-outline-brand">
              View All Results (${matches.length})
            </a>
          </div>
        </div>
      `;
    });
  }

  // Helper for XSS safety
  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
});
