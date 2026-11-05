# Product details redesign

The shared `product-details.html?id=…` template supports all 16 catalog products. It has seven main sections: purchase/gallery, ingredients/nutrition, preparation, product care, farm-to-pack, FAQs, and related products. Product-specific copy and related selections live in `assets/js/product-experience-data.js`; prices and recipe data remain in `products-data.js`.

The gallery includes four distinct photographs per product, responsive thumbnails, keyboard navigation, and a native zoom dialog. Quantity validation, basket actions, and simulated checkout remain available. FAQ accordions use native keyboard-accessible details elements. Layouts use the existing theme tokens and logical spacing for RTL.

## Photography and provenance

Original generated photographs and selected existing relevant masters are recorded in `assets/images/product-details/manifest-a.json`, `manifest-b.json`, and `shared/manifest.json`. These files preserve generation prompts, source paths, and native dimensions. The combined `exports.json` records every responsive derivative and master.

There are 64 gallery entries plus two shared illustrative process photographs. Bundle galleries intentionally reuse their included products' photographs, with no repeated photograph within an individual gallery. New assets were generated with the built-in image generation tool and visually reviewed for product relevance.

Generation returned images below native 4K resolution. Original masters are retained; the separate 3840-pixel-wide JPEG files are explicitly named `4k-upscaled`. These are upscaled exports, not native 4K photographs. The website serves optimized WebP variants through `srcset` instead of the large exports. Regenerate derivatives with:

```sh
node scripts/export-product-detail-images.cjs
```

Nutrition, recipes, delivery, and the sourcing journey are demonstration content. Nutrition is labeled sample data, aggregate bundle nutrition is omitted, and unverified shelf life and certification claims are not introduced. Photos are illustrative; the site has no batch verification or payment backend.

## Verification

```sh
node scripts/check-product-redesign.cjs
```

The browser check covers all 16 product IDs and images, six representative categories at 320, 375, 425, 768, 1024, and 1440 pixels, light/dark themes, and LTR/RTL (144 layout combinations). It checks overflow, visible text contrast, seven-section structure, gallery/zoom, keyboard FAQs, quantity validation, basket, related-product additions, simulated checkout, and invalid product IDs. Results and screenshots are written under `artifacts/product-redesign/`.

The real theme and RTL buttons and mobile navigation were also exercised. Shared inner-page heroes on About, Products, Journal, Value Bundles, and Contact use `.page-hero` in `main.css`; their height is consistent across mobile and desktop. The floating back-to-top control was removed site-wide.
