/**
 * AuraMillet Organics - Blog & Journal Controller
 * Manages blog article filtering, category tags, search, pagination,
 * dynamic article hydration on blog-details.html, and social sharing.
 */

(function () {
  'use strict';

  let currentCategory = 'all';
  let searchQuery = '';
  let currentPage = 1;
  const itemsPerPage = 6;

  function init() {
    initBlogCatalog();
    initBlogDetails();
  }

  // --- BLOG CATALOG PAGE ---
  function initBlogCatalog() {
    const grid = document.getElementById('blogPostsGrid');
    if (!grid) return;

    bindCatalogFilters();
    renderBlogPosts();
  }

  function bindCatalogFilters() {
    // Category Filter Buttons
    document.querySelectorAll('[data-blog-category]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('[data-blog-category]').forEach(b => {
          b.classList.remove('active', 'btn-primary');
          b.classList.add('btn-outline-brand');
        });
        btn.classList.remove('btn-outline-brand');
        btn.classList.add('active', 'btn-primary');
        currentCategory = btn.getAttribute('data-blog-category');
        currentPage = 1;
        renderBlogPosts();
      });
    });

    // Search Input
    const searchInput = document.getElementById('blogSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value.trim().toLowerCase();
        currentPage = 1;
        renderBlogPosts();
      });
    }
  }

  function getFilteredPosts() {
    if (typeof BLOG_POSTS_DATA === 'undefined') return [];

    return BLOG_POSTS_DATA.filter(post => {
      if (currentCategory !== 'all' && post.category !== currentCategory) {
        return false;
      }
      if (searchQuery) {
        const titleMatch = post.title.toLowerCase().includes(searchQuery);
        const excerptMatch = post.excerpt.toLowerCase().includes(searchQuery);
        const tagMatch = (post.tags || []).some(t => t.toLowerCase().includes(searchQuery));
        if (!titleMatch && !excerptMatch && !tagMatch) return false;
      }
      return true;
    });
  }

  function renderBlogPosts() {
    const grid = document.getElementById('blogPostsGrid');
    const emptyState = document.getElementById('blogEmptyState');
    const paginationEl = document.getElementById('blogPagination');

    if (!grid) return;

    const filtered = getFilteredPosts();

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

    grid.innerHTML = pageItems.map(post => `
      <div class="col-12 col-md-6 col-lg-4 mb-4">
        <article class="blog-card" data-post-id="${post.id}">
          <div class="blog-thumb">
            <a href="blog-details.html?id=${post.id}">
              <img src="${post.image}" alt="${post.title}" loading="lazy" width="600" height="400">
            </a>
          </div>
          <div class="blog-body">
            <div class="blog-meta">
              <span class="badge-pill badge-organic">${post.category}</span>
              <span><i class="bi bi-clock"></i> ${post.readingTime}</span>
            </div>
            <h3 class="blog-title fs-5">
              <a href="blog-details.html?id=${post.id}">${post.title}</a>
            </h3>
            <p class="text-muted small mb-3 flex-grow-1">${post.excerpt}</p>
            <div class="d-flex align-items-center justify-content-between pt-3 border-top">
              <div class="d-flex align-items-center gap-2">
                <img src="${post.authorAvatar}" alt="${post.author}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
                <span class="small fw-semibold text-main">${post.author}</span>
              </div>
              <a href="blog-details.html?id=${post.id}" class="small fw-bold text-accent" aria-label="Read ${post.title}">Read <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </article>
      </div>
    `).join('');

    renderBlogPagination(totalPages);
  }

  function renderBlogPagination(totalPages) {
    const paginationEl = document.getElementById('blogPagination');
    if (!paginationEl || totalPages <= 1) {
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }

    let html = `
      <nav aria-label="Blog pages">
        <ul class="pagination justify-content-center gap-1 mb-0">
          <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <button class="page-link rounded-pill px-3" data-page="${currentPage - 1}" aria-label="Previous">
              <i class="bi bi-chevron-left"></i>
            </button>
          </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
      html += `
        <li class="page-item ${currentPage === i ? 'active' : ''}">
          <button class="page-link rounded-circle" style="width: 42px; height: 42px;" data-page="${i}">${i}</button>
        </li>
      `;
    }

    html += `
          <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <button class="page-link rounded-pill px-3" data-page="${currentPage + 1}" aria-label="Next">
              <i class="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    `;

    paginationEl.innerHTML = html;

    paginationEl.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const p = parseInt(btn.getAttribute('data-page'), 10);
        if (p >= 1 && p <= totalPages) {
          currentPage = p;
          renderBlogPosts();
          window.scrollTo({ top: document.getElementById('blogPostsGrid').offsetTop - 120, behavior: 'smooth' });
        }
      });
    });
  }

  // --- BLOG DETAILS PAGE ---
  function initBlogDetails() {
    const articleContainer = document.getElementById('blogArticleView');
    if (!articleContainer) return;

    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id') || 'climate-resilient-supergrain-21st-century';
    const post = typeof getBlogById === 'function' ? getBlogById(postId) : null;

    if (!post) return;

    document.title = `${post.title} | AuraMillet Journal`;

    // Hydrate Title & Meta
    setElementText('articleTitle', post.title);
    setElementText('articleCategory', post.category);
    setElementText('articleDate', post.date);
    setElementText('articleReadingTime', post.readingTime);
    setElementText('articleAuthorName', post.author);
    setElementText('articleAuthorRole', post.authorRole || 'Contributor');
    
    const authorImg = document.getElementById('articleAuthorAvatar');
    if (authorImg) authorImg.src = post.authorAvatar;

    const mainImg = document.getElementById('articleFeaturedImage');
    if (mainImg) {
      mainImg.src = post.image;
      mainImg.alt = post.title;
    }

    const detailImg = document.getElementById('articleSecondaryImage');
    if (detailImg) {
      detailImg.src = post.detailImage || post.image;
      detailImg.alt = `${post.title} - Supporting Editorial`;
    }

    const tertiaryImg = document.getElementById('articleTertiaryImage');
    if (tertiaryImg) {
      tertiaryImg.src = post.tertiaryImage || post.detailImage || post.image;
      tertiaryImg.alt = `${post.title} - Preparation & Process`;
    }

    const tertiaryCaption = document.getElementById('articleTertiaryCaption');
    if (tertiaryCaption) {
      tertiaryCaption.textContent = post.tertiaryCaption || `${post.title} — Detailed botanical and ingredient preparation view.`;
    }

    const contentEl = document.getElementById('articleBodyContent');
    if (contentEl) contentEl.innerHTML = post.content;

    const takeawaysEl = document.getElementById('articleKeyTakeaways');
    if (takeawaysEl && post.takeaways) {
      takeawaysEl.innerHTML = post.takeaways.map(t => `
        <li class="d-flex align-items-start gap-2 mb-2">
          <i class="bi bi-check-circle-fill text-success mt-1"></i>
          <span>${t}</span>
        </li>
      `).join('');
    }

    const tagsEl = document.getElementById('articleTagsList');
    if (tagsEl && post.tags) {
      tagsEl.innerHTML = post.tags.map(t => `
        <a href="blog.html?q=${encodeURIComponent(t)}" class="badge-pill badge-organic text-decoration-none me-2 mb-2">#${t}</a>
      `).join('');
    }

    // Share link button
    const shareBtn = document.getElementById('copyArticleLinkBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', e => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href).then(() => {
          if (window.AuraCart) {
            window.AuraCart.showToast('Link Copied', 'Article link copied to clipboard!');
          }
        });
      });
    }

    // Related Articles
    renderRelatedArticles(post);
  }

  function renderRelatedArticles(currentPost) {
    const relatedContainer = document.getElementById('relatedArticlesGrid');
    if (!relatedContainer || typeof BLOG_POSTS_DATA === 'undefined') return;

    let related = BLOG_POSTS_DATA.filter(p => p.id !== currentPost.id && p.category === currentPost.category);
    if (related.length < 3) {
      const others = BLOG_POSTS_DATA.filter(p => p.id !== currentPost.id && p.category !== currentPost.category);
      related = [...related, ...others].slice(0, 3);
    } else {
      related = related.slice(0, 3);
    }

    relatedContainer.innerHTML = related.map(p => `
      <div class="col-12 col-md-4 mb-4">
        <div class="blog-card h-100">
          <div class="blog-thumb">
            <a href="blog-details.html?id=${p.id}">
              <img src="${p.image}" alt="${p.title}" loading="lazy" width="400" height="260">
            </a>
          </div>
          <div class="blog-body p-3">
            <span class="badge-pill badge-organic mb-2">${p.category}</span>
            <h4 class="blog-title fs-6">
              <a href="blog-details.html?id=${p.id}">${p.title}</a>
            </h4>
            <div class="small text-muted mt-auto pt-2">${p.date} • ${p.readingTime}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function setElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
