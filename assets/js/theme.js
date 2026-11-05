/**
 * AuraMillet Organics - Theme & Direction Controller
 * Supports persistent Light/Dark themes and LTR/RTL layout switching
 */

(function () {
  'use strict';

  const STORAGE_KEY_THEME = 'auramillet_theme';
  const STORAGE_KEY_DIR = 'auramillet_dir';

  // Apply stored or system preferences immediately before DOM render
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    const theme = savedTheme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);

    const savedDir = localStorage.getItem(STORAGE_KEY_DIR) || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
  }

  initTheme();

  document.addEventListener('DOMContentLoaded', () => {
    updateTogglesUI();
    updateBrandLogos();

    // Theme Toggle Listener
    document.querySelectorAll('[data-toggle-theme]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem(STORAGE_KEY_THEME, newTheme);
        updateTogglesUI();
        updateBrandLogos();
      });
    });

    // RTL Toggle Listener
    document.querySelectorAll('[data-toggle-rtl]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem(STORAGE_KEY_DIR, newDir);
        updateTogglesUI();
      });
    });
  });

  function updateTogglesUI() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';

    document.querySelectorAll('[data-toggle-theme]').forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
      }
    });

    document.querySelectorAll('[data-toggle-rtl]').forEach(btn => {
      btn.setAttribute('aria-label', isRtl ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left');
      const text = btn.querySelector('.dir-text');
      if (text) {
        text.textContent = isRtl ? 'LTR' : 'RTL';
      }
    });
  }

  function updateBrandLogos() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.site-brand-logo').forEach(img => {
      if (isDark) {
        img.src = 'assets/images/branding/logo-white.svg';
      } else {
        img.src = 'assets/images/branding/logo.svg';
      }
    });
  }

  window.AuraTheme = {
    getTheme: () => document.documentElement.getAttribute('data-theme') || 'light',
    getDir: () => document.documentElement.getAttribute('dir') || 'ltr'
  };
})();
