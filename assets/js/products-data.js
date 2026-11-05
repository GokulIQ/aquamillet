/**
 * AuraMillet Organics - Central Products, Bundles, Blog & Initiative Data Store
 * Professional commercial frontend dataset for realistic ecommerce interactions
 */

// INR demo retail prices; see docs/inr-pricing.md for assumptions and references.
const INR_FORMATTER = new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', minimumFractionDigits: 2,
  maximumFractionDigits: 2, trailingZeroDisplay: 'stripIfInteger'
});
function formatPrice(amount) { return INR_FORMATTER.format(amount); }

const PRODUCTS_DATA = [
  {
    id: "foxtail-millet-cookies",
    name: "Artisanal Foxtail Millet Cookies (Almond Crunch)",
    category: "cookies",
    categoryLabel: "Millet Cookies",
    price: 199,
    originalPrice: 249,
    weight: "200g (Pack of 12)",
    rating: 4.9,
    reviewsCount: 142,
    badge: "Bestseller",
    badgeType: "bestseller",
    shortDescription: "Slow-baked golden foxtail millet cookies enriched with California almonds and cardamom. 100% refined flour-free and sweetened with unrefined jaggery.",
    fullDescription: "Our signature Foxtail Millet Almond Cookies represent the sweet spot between wholesome ancient nutrition and artisanal confectionery. Handcrafted using whole grain foxtail flour (Kangni), cold-pressed desi ghee, roasted almond slivers, and raw jaggery. Unlike commercial cookies loaded with refined palm oil and white sugar, every bite delivers sustained energy, natural dietary fiber, and a satisfying nutty crunch.",
    image: "assets/images/products/cookies/foxtail-cookies-1.jpg",
    gallery: [
      "assets/images/products/cookies/foxtail-cookies-1.jpg",
      "assets/images/products/cookies/foxtail-cookies-2.jpg",
      "assets/images/products/cookies/foxtail-cookies-3.jpg",
      "assets/images/products/cookies/foxtail-cookies-4.jpg"
    ],
    sku: "AM-CK-001",
    inStock: true,
    stockCount: 38,
    ingredients: [
      "Organic Foxtail Millet Flour (48%)",
      "Raw Desi Ghee (18%)",
      "Unrefined Organic Palm Jaggery (16%)",
      "Roasted Almond Slivers (12%)",
      "Green Cardamom Powder",
      "Himalayan Pink Rock Salt"
    ],
    nutrition: {
      servingSize: "30g (2 cookies)",
      calories: "138 kcal",
      protein: "3.4g",
      carbs: "18.2g",
      fiber: "3.8g",
      fats: "5.8g",
      iron: "1.8mg (12% DV)",
      calcium: "28mg (3% DV)",
      glycemicIndex: "Low (GI 54)"
    },
    allergens: "Contains Almonds and Milk solids (Ghee). Crafted in a facility handling sesame and tree nuts.",
    storage: "Store in a cool, airtight container away from direct sunlight. Consume within 90 days from packing.",
    cookingInstructions: "Ready to eat. Exceptional when paired with morning herbal tea or warm spiced oat milk."
  },
  {
    id: "sprouted-ragi-flour",
    name: "Stoneground Sprouted Ragi Flour (Finger Millet)",
    category: "flours",
    categoryLabel: "Millet Flours",
    price: 249,
    originalPrice: 299,
    weight: "1.0 kg (2.2 lbs)",
    rating: 5.0,
    reviewsCount: 218,
    badge: "High Calcium",
    badgeType: "organic",
    shortDescription: "Germinated and cold-stoneground finger millet flour. Sprouting boosts bioavailable calcium tenfold and delivers silky soft rotis and breakfast porridge.",
    fullDescription: "Ragi (Eleusine coracana) is renowned as nature's highest non-dairy calcium source. We sprout the whole grains for 48 hours to activate vital phytase enzymes, breaking down phytic acid for superior nutrient absorption. The sprouted grain is slowly dried under sun-diffused heat and milled on slow stone chakkis to preserve delicate dietary enzymes, vitamins, and a deep earthy aroma.",
    image: "assets/images/products/flours/ragi-flour-1.jpg",
    gallery: [
      "assets/images/products/flours/ragi-flour-1.jpg",
      "assets/images/products/flours/ragi-flour-2.jpg",
      "assets/images/products/flours/ragi-flour-3.jpg",
      "assets/images/products/flours/ragi-flour-4.jpg"
    ],
    sku: "AM-FL-002",
    inStock: true,
    stockCount: 54,
    ingredients: ["100% Certified Organic Sprouted Finger Millet (Ragi / Nachni)"],
    nutrition: {
      servingSize: "50g",
      calories: "164 kcal",
      protein: "4.2g",
      carbs: "33.5g",
      fiber: "5.7g",
      fats: "0.9g",
      iron: "2.1mg (15% DV)",
      calcium: "172mg (17% DV)",
      glycemicIndex: "Low (GI 51)"
    },
    allergens: "Naturally Gluten-Free. Milled on dedicated gluten-free stone grinders.",
    storage: "Transfer to an airtight steel or glass jar after opening. Store in a cool dry pantry for up to 6 months.",
    cookingInstructions: "Ideal for wholesome rotis, savory dosas, ragi malt porridge, baby food, and gluten-free sourdough bread baking."
  },
  {
    id: "air-dried-little-millet-noodles",
    name: "Sun-Dried Little Millet Noodles (Zero Maida)",
    category: "noodles",
    categoryLabel: "Millet Noodles",
    price: 179,
    originalPrice: 219,
    weight: "250g (Serves 3-4)",
    rating: 4.8,
    reviewsCount: 96,
    badge: "Zero Maida",
    badgeType: "vegan",
    shortDescription: "Slow air-dried little millet and red lentil noodles with a natural cold-pressed spice tastemaker. 100% free from palm oil and artificial flavor enhancers.",
    fullDescription: "Ditch fried instant noodles for clean nourishment. Our Little Millet (Samai) Noodles are extruded under low temperature and air-dried for 18 hours to create a firm, al dente texture that never gets mushy. Paired with a dehydrated spice blend crafted from real roasted cumin, coriander, ginger, turmeric, and sea salt. Satisfying comfort food ready in just 6 minutes.",
    image: "assets/images/products/noodles/little-millet-noodles-1.jpg",
    gallery: [
      "assets/images/products/noodles/little-millet-noodles-1.jpg",
      "assets/images/products/noodles/little-millet-noodles-2.jpg",
      "assets/images/products/noodles/little-millet-noodles-3.jpg",
      "assets/images/products/noodles/little-millet-noodles-4.jpg"
    ],
    sku: "AM-ND-003",
    inStock: true,
    stockCount: 42,
    ingredients: [
      "Little Millet Flour (70%)",
      "Sprouted Red Lentil Flour (28%)",
      "Sea Salt (2%)",
      "Tastemaker: Cumin, coriander, black pepper, turmeric, dry mango powder, unrefined sugar, rock salt"
    ],
    nutrition: {
      servingSize: "60g",
      calories: "212 kcal",
      protein: "7.6g",
      carbs: "42.0g",
      fiber: "6.2g",
      fats: "1.4g",
      iron: "2.4mg (17% DV)",
      calcium: "34mg (3% DV)",
      glycemicIndex: "Low (GI 53)"
    },
    allergens: "Gluten-free, vegan. Free of monosodium glutamate (MSG) and synthetic preservatives.",
    storage: "Keep in a cool dry place. Keep package sealed until preparation.",
    cookingInstructions: "Boil 600ml water. Drop noodle cake and cook for 5-6 minutes until tender. Drain, stir-fry with favorite seasonal greens, and mix in the natural tastemaker."
  },
  {
    id: "roasted-pearl-millet-chivda",
    name: "Roasted Pearl Millet Chivda (Bajra Namkeen)",
    category: "snacks",
    categoryLabel: "Millet Snacks",
    price: 129,
    originalPrice: 159,
    weight: "180g Pouch",
    rating: 4.9,
    reviewsCount: 168,
    badge: "Palm-Oil Free",
    badgeType: "bestseller",
    shortDescription: "Puffed pearl millet flakes roasted to crisp perfection with curry leaves, crunchy peanuts, roasted split chickpeas, and cold-pressed groundnut oil.",
    fullDescription: "A guilt-free transformation of traditional tea-time chivda. We gently puff whole pearl millet (Bajra) and dry-roast it without deep-frying. Spritzed lightly with cold-pressed groundnut oil to adhere aromatic roasted curry leaves, whole green chilies, golden peanuts, and crushed whole spices. Satisfying, spicy, and packed with plant iron and dietary fiber.",
    image: "assets/images/products/snacks/bajra-chivda-1.jpg",
    gallery: [
      "assets/images/products/snacks/bajra-chivda-1.jpg",
      "assets/images/products/snacks/bajra-chivda-2.jpg",
      "assets/images/products/snacks/bajra-chivda-3.jpg",
      "assets/images/products/snacks/bajra-chivda-4.jpg"
    ],
    sku: "AM-SN-004",
    inStock: true,
    stockCount: 65,
    ingredients: [
      "Puffed Pearl Millet Flakes (55%)",
      "Roasted Peanuts (18%)",
      "Roasted Bengal Gram (12%)",
      "Cold-Pressed Groundnut Oil (8%)",
      "Fresh Curry Leaves, Green Chilies, Turmeric, Cumin, Rock Salt"
    ],
    nutrition: {
      servingSize: "30g",
      calories: "128 kcal",
      protein: "4.1g",
      carbs: "17.4g",
      fiber: "3.9g",
      fats: "4.8g",
      iron: "3.2mg (23% DV)",
      calcium: "22mg (2% DV)",
      glycemicIndex: "Low (GI 48)"
    },
    allergens: "Contains Peanuts. Manufactured in a facility that also processes tree nuts and seeds.",
    storage: "Keep tightly sealed in resealable eco-pouch. Protect from air moisture.",
    cookingInstructions: "Ready to eat snack. Perfect with evening chai, office break munching, or sprinkled over salads."
  },
  {
    id: "spiced-kodo-millet-crisps",
    name: "Baked Spiced Kodo Millet Crisps (Sun-Dried Tomato)",
    category: "snacks",
    categoryLabel: "Millet Snacks",
    price: 129,
    originalPrice: 159,
    weight: "150g Pouch",
    rating: 4.7,
    reviewsCount: 84,
    badge: "Baked Never Fried",
    badgeType: "new",
    shortDescription: "Ultra-crisp triangular baked crackers made with kodo millet flour, dehydrated Mediterranean herbs, and sun-dried tomatoes. Zero cholesterol.",
    fullDescription: "Say goodbye to potato chips. These oven-baked kodo millet crisps feature whole grain kodo millet flour tossed with tangy sun-dried tomato powder, Mediterranean oregano, garlic, and sea salt. Light on the stomach, loaded with polyphenols, and delivering a satisfying crunch without greasy fingers.",
    image: "assets/images/products/snacks/kodo-crisps-1.jpg",
    gallery: [
      "assets/images/products/snacks/kodo-crisps-1.jpg",
      "assets/images/products/snacks/kodo-crisps-2.jpg",
      "assets/images/products/snacks/kodo-crisps-3.jpg",
      "assets/images/products/snacks/kodo-crisps-4.jpg"
    ],
    sku: "AM-SN-005",
    inStock: true,
    stockCount: 31,
    ingredients: [
      "Organic Kodo Millet Flour (62%)",
      "Cold-Pressed Sunflower Oil (10%)",
      "Dehydrated Sun-Dried Tomato Powder (8%)",
      "Tapioca Starch (8%)",
      "Dried Oregano, Thyme, Garlic, Pink Salt"
    ],
    nutrition: {
      servingSize: "30g",
      calories: "124 kcal",
      protein: "2.8g",
      carbs: "19.6g",
      fiber: "4.2g",
      fats: "3.9g",
      iron: "1.6mg (11% DV)",
      calcium: "18mg (2% DV)",
      glycemicIndex: "Low (GI 50)"
    },
    allergens: "Gluten-Free, Dairy-Free, Vegan.",
    storage: "Seal pouch immediately after snacking. Store in a cool dry cabinet.",
    cookingInstructions: "Ready to eat. Outstanding when dipped in homemade hummus or guacamole."
  },
  {
    id: "barnyard-millet-muesli",
    name: "Barnyard Millet Morning Flakes & Super-Seed Muesli",
    category: "breakfast",
    categoryLabel: "Breakfast Mixes",
    price: 349,
    originalPrice: 399,
    weight: "400g Box",
    rating: 4.9,
    reviewsCount: 112,
    badge: "High Fiber",
    badgeType: "organic",
    shortDescription: "Toasted barnyard millet flakes tossed with chia seeds, pumpkin seeds, whole almonds, and unsweetened dried cranberries. Naturally low GI.",
    fullDescription: "Energize your morning with clean grain vitality. Barnyard Millet (Sanwa) has the lowest carbohydrate content and fastest digestibility among all millets. We lightly steam and flake the grain, then toast it with raw pumpkin seeds, roasted chia, sliced California almonds, and tart sun-dried cranberries. Lightly sweetened with wild forest honey.",
    image: "assets/images/product-details/barnyard-millet-muesli/main-960.webp",
    gallery: [
      "assets/images/product-details/barnyard-millet-muesli/main-960.webp",
      "assets/images/product-details/barnyard-millet-muesli/ingredients-960.webp",
      "assets/images/product-details/barnyard-millet-muesli/preparation-960.webp",
      "assets/images/product-details/barnyard-millet-muesli/serving-960.webp"
    ],
    sku: "AM-BF-006",
    inStock: true,
    stockCount: 47,
    ingredients: [
      "Rolled Barnyard Millet Flakes (52%)",
      "Raw Pumpkin Seeds (12%)",
      "Roasted Chia Seeds (8%)",
      "Sliced Almonds (10%)",
      "Sun-Dried Cranberries (10%)",
      "Wild Forest Honey (8%)"
    ],
    nutrition: {
      servingSize: "45g",
      calories: "172 kcal",
      protein: "5.4g",
      carbs: "26.8g",
      fiber: "6.8g",
      fats: "4.9g",
      iron: "2.8mg (20% DV)",
      calcium: "42mg (4% DV)",
      glycemicIndex: "Very Low (GI 46)"
    },
    allergens: "Contains Almonds. Packed in an allergen-controlled cleanroom.",
    storage: "Store inner pouch in a cool dark pantry. Reseal tightly after each pour.",
    cookingInstructions: "Enjoy cold with almond milk, Greek yogurt, or soak overnight for a chilled creamy breakfast bowl."
  },
  {
    id: "cold-milled-sorghum-flour",
    name: "Whole Grain Sorghum (Jowar) Flour - Cold Milled",
    category: "flours",
    categoryLabel: "Millet Flours",
    price: 149,
    originalPrice: 179,
    weight: "1.0 kg (2.2 lbs)",
    rating: 4.8,
    reviewsCount: 174,
    badge: "100% Organic",
    badgeType: "organic",
    shortDescription: "Certified organic whole grain jowar flour milled under 32°C. High in dietary fiber and essential minerals, producing soft, pliable flatbreads.",
    fullDescription: "Sorghum (Jowar) is a prehistoric staple grain revered across arid regions for its sweet, gentle profile and impressive antioxidant content. Our cold-milling technology ensures the flour temperature never exceeds 32°C during processing, preventing heat oxidation of delicate vitamins and fatty acids. Yields velvety jowar bhakri, gluten-free pizza bases, and tender pancakes.",
    image: "assets/images/products/flours/sorghum-flour-1.jpg",
    gallery: [
      "assets/images/products/flours/sorghum-flour-1.jpg",
      "assets/images/products/flours/sorghum-flour-2.jpg",
      "assets/images/products/flours/sorghum-flour-3.jpg",
      "assets/images/products/flours/sorghum-flour-4.jpg"
    ],
    sku: "AM-FL-007",
    inStock: true,
    stockCount: 50,
    ingredients: ["100% Certified Organic Whole Grain Sorghum (Jowar)"],
    nutrition: {
      servingSize: "50g",
      calories: "170 kcal",
      protein: "4.8g",
      carbs: "34.2g",
      fiber: "4.9g",
      fats: "1.4g",
      iron: "2.2mg (16% DV)",
      calcium: "25mg (2.5% DV)",
      glycemicIndex: "Low (GI 52)"
    },
    allergens: "Certified Gluten-Free.",
    storage: "Keep in an airtight jar. Best enjoyed within 4 months of milling date.",
    cookingInstructions: "Mix with warm water to knead supple rotis, bake into rustic sandwich bread, or use as a 1:1 gluten-free pastry flour blend."
  },
  {
    id: "barnyard-millet-fettuccine",
    name: "Gluten-Free Barnyard Millet Pasta (Fettuccine Style)",
    category: "noodles",
    categoryLabel: "Millet Noodles",
    price: 229,
    originalPrice: 279,
    weight: "300g Pack",
    rating: 4.9,
    reviewsCount: 79,
    badge: "Artisanal",
    badgeType: "new",
    shortDescription: "Bronze-die extruded artisanal fettuccine ribbons made with organic barnyard millet and brown rice flour. Exceptional sauce-clinging texture.",
    fullDescription: "Crafted in small batches using traditional Italian bronze dies, our Barnyard Millet Fettuccine provides the authentic pasta experience without wheat, maida, or xanthan gum. The rough bronze-drawn surface grabs hold of pestos, rich tomato reductions, and garlic-infused olive oil for an uncompromised gourmet dining experience.",
    image: "assets/images/products/noodles/barnyard-fettuccine-1.jpg",
    gallery: [
      "assets/images/products/noodles/barnyard-fettuccine-1.jpg",
      "assets/images/products/noodles/barnyard-fettuccine-2.jpg",
      "assets/images/products/noodles/barnyard-fettuccine-3.jpg",
      "assets/images/products/noodles/barnyard-fettuccine-4.jpg"
    ],
    sku: "AM-ND-008",
    inStock: true,
    stockCount: 28,
    ingredients: [
      "Organic Barnyard Millet Flour (65%)",
      "Organic Brown Rice Flour (33%)",
      "Guar Gum (Natural plant binder, 2%)"
    ],
    nutrition: {
      servingSize: "75g",
      calories: "255 kcal",
      protein: "6.2g",
      carbs: "52.4g",
      fiber: "5.8g",
      fats: "1.2g",
      iron: "2.0mg (14% DV)",
      calcium: "30mg (3% DV)",
      glycemicIndex: "Low (GI 49)"
    },
    allergens: "Gluten-Free, Egg-Free, Vegan.",
    storage: "Store dry pasta in cool, moisture-free cabinet.",
    cookingInstructions: "Bring 3 liters of salted water to rolling boil. Add fettuccine and cook 7-8 minutes for al dente. Drain and toss immediately with olive oil."
  },
  {
    id: "ragi-dark-chocolate-bites",
    name: "Finger Millet (Ragi) Dark Chocolate Crunch Bites",
    category: "cookies",
    categoryLabel: "Millet Cookies",
    price: 199,
    originalPrice: 249,
    weight: "175g Jar",
    rating: 5.0,
    reviewsCount: 189,
    badge: "Bestseller",
    badgeType: "bestseller",
    shortDescription: "Sprouted ragi crunch centers enrobed in 70% single-origin dark chocolate. 100% refined sugar-free, sweetened with coconut blossom sugar.",
    fullDescription: "A decadent wellness treat loved by kids and adults alike. We puff sprouted ragi pearls into featherweight crunchy spheres and coat them in single-origin Kerala dark chocolate crafted from stone-ground cocoa beans and coconut palm sugar. Clean indulgence packed with calcium, magnesium, and natural antioxidants.",
    image: "assets/images/products/cookies/ragi-choco-bites-1.jpg",
    gallery: [
      "assets/images/products/cookies/ragi-choco-bites-1.jpg",
      "assets/images/products/cookies/ragi-choco-bites-2.jpg",
      "assets/images/products/cookies/ragi-choco-bites-3.jpg",
      "assets/images/products/cookies/ragi-choco-bites-4.jpg"
    ],
    sku: "AM-CK-009",
    inStock: true,
    stockCount: 44,
    ingredients: [
      "Dark Chocolate 70% (Cocoa Mass, Cocoa Butter, Coconut Blossom Sugar) (60%)",
      "Puffed Sprouted Ragi Pearls (35%)",
      "Sea Salt (1%)",
      "Natural Vanilla Pod Extract (4%)"
    ],
    nutrition: {
      servingSize: "25g (5 bites)",
      calories: "118 kcal",
      protein: "2.6g",
      carbs: "14.2g",
      fiber: "3.2g",
      fats: "5.9g",
      iron: "2.2mg (16% DV)",
      calcium: "65mg (6.5% DV)",
      glycemicIndex: "Low (GI 45)"
    },
    allergens: "Vegan, Dairy-Free, Gluten-Free.",
    storage: "Store in a cool dry place below 22°C (72°F) to prevent chocolate bloom.",
    cookingInstructions: "Ready to savor. Great as an afternoon energy pick-me-up or healthy dessert topping."
  },
  {
    id: "foxtail-cashew-trailmix",
    name: "Roasted Foxtail Millet & Cashew Trail Mix",
    category: "snacks",
    categoryLabel: "Millet Snacks",
    price: 249,
    originalPrice: 299,
    weight: "220g Jar",
    rating: 4.8,
    reviewsCount: 92,
    badge: "High Energy",
    badgeType: "organic",
    shortDescription: "Crunchy roasted foxtail millet clusters, jumbo Mangalorean cashews, raw sunflower seeds, and sun-ripened golden raisins with pink rock salt.",
    fullDescription: "Fuel your active lifestyle with wholesome sustained energy. This artisanal trail mix blends puffed foxtail millet crispies with slow-roasted cashew halves, raw sunflower seeds, golden Afghani raisins, and cracked black pepper. Balanced electrolyte replenishment for hiking, fitness, or desk-side nourishment.",
    image: "assets/images/products/snacks/trailmix-1.jpg",
    gallery: [
      "assets/images/products/snacks/trailmix-1.jpg",
      "assets/images/products/snacks/trailmix-2.jpg",
      "assets/images/products/snacks/trailmix-3.jpg",
      "assets/images/products/snacks/trailmix-4.jpg"
    ],
    sku: "AM-SN-010",
    inStock: true,
    stockCount: 35,
    ingredients: [
      "Roasted Whole Foxtail Millet (40%)",
      "Roasted Whole Cashew Nuts (25%)",
      "Raw Sunflower Seeds (15%)",
      "Golden Raisins (15%)",
      "Cold-Pressed Sesame Oil (3%)",
      "Black Pepper, Pink Salt"
    ],
    nutrition: {
      servingSize: "35g",
      calories: "158 kcal",
      protein: "4.8g",
      carbs: "18.2g",
      fiber: "3.5g",
      fats: "7.6g",
      iron: "2.1mg (15% DV)",
      calcium: "32mg (3.2% DV)",
      glycemicIndex: "Low (GI 49)"
    },
    allergens: "Contains Cashews and Sesame.",
    storage: "Keep jar tightly closed to retain roasted crispness.",
    cookingInstructions: "Ready to eat. Toss into breakfast yogurt or carry in your daily workout bag."
  },
  {
    id: "sprouted-multi-millet-dosa-mix",
    name: "Instant Sprouted Multi-Millet Dosa & Pancake Mix",
    category: "breakfast",
    categoryLabel: "Breakfast Mixes",
    price: 199,
    originalPrice: 249,
    weight: "500g Pouch",
    rating: 4.9,
    reviewsCount: 138,
    badge: "Quick 10-Min Meal",
    badgeType: "vegan",
    shortDescription: "Naturally fermented blend of sprouted ragi, foxtail, kodo, and urad dal. Makes restaurant-crisp golden dosas, savory waffles, and crepes in minutes.",
    fullDescription: "Enjoy authentic traditional South Indian crepes without hours of soaking, grinding, and overnight fermentation. Our multi-millet blend features germinated ragi, foxtail, and kodo millets combined with stoneground urad dal and methi (fenugreek) seeds. Simply whisk with water, rest for 10 minutes, and pour onto a hot skillet for paper-thin, golden crisp dosas packed with live plant nutrients.",
    image: "assets/images/products/breakfast-mixes/dosa-mix-1.jpg",
    gallery: [
      "assets/images/products/breakfast-mixes/dosa-mix-1.jpg",
      "assets/images/products/breakfast-mixes/dosa-mix-2.jpg",
      "assets/images/products/breakfast-mixes/dosa-mix-3.jpg",
      "assets/images/products/breakfast-mixes/dosa-mix-4.jpg"
    ],
    sku: "AM-BF-011",
    inStock: true,
    stockCount: 52,
    ingredients: [
      "Sprouted Finger Millet (Ragi) (30%)",
      "Sprouted Foxtail Millet (25%)",
      "Sprouted Kodo Millet (20%)",
      "De-husked Black Gram (Urad Dal) (20%)",
      "Fenugreek (Methi) Seeds (3%)",
      "Himalayan Pink Salt (2%)"
    ],
    nutrition: {
      servingSize: "45g",
      calories: "156 kcal",
      protein: "5.8g",
      carbs: "29.4g",
      fiber: "5.1g",
      fats: "1.1g",
      iron: "2.5mg (18% DV)",
      calcium: "88mg (8.8% DV)",
      glycemicIndex: "Low (GI 51)"
    },
    allergens: "Gluten-Free, Dairy-Free, 100% Vegan.",
    storage: "Store in a dry cupboard away from steam.",
    cookingInstructions: "Whisk 1 cup mix with 1 cup room temperature water. Rest 10 minutes. Ladle onto a hot non-stick or seasoned cast iron tawa and drizzle cold-pressed oil until golden brown."
  },
  {
    id: "organic-whole-proso-millet",
    name: "Proso Millet Organic Whole Grain (Cleaned & Hulled)",
    category: "flours",
    categoryLabel: "Millet Flours",
    price: 199,
    originalPrice: 249,
    weight: "1.0 kg (2.2 lbs)",
    rating: 4.8,
    reviewsCount: 65,
    badge: "Zero Chemical",
    badgeType: "organic",
    shortDescription: "Gently de-hulled whole proso millet grains with high protein and low glycemic index. Cooks fluffy like jasmine rice in 15 minutes.",
    fullDescription: "Proso Millet (Panicum miliaceum) boasts the highest protein percentage (up to 12.5%) among small millets. Machine-cleaned with dual optical color sorters to remove husks without damaging the nutrient-dense bran layer. Replaces white rice cup-for-cup in curries, biryanis, khichdi, and refreshing grain salads.",
    image: "assets/images/products/flours/proso-grain-1.jpg",
    gallery: [
      "assets/images/products/flours/proso-grain-1.jpg",
      "assets/images/products/flours/proso-grain-2.jpg",
      "assets/images/products/flours/proso-grain-3.jpg",
      "assets/images/products/flours/proso-grain-4.jpg"
    ],
    sku: "AM-GR-012",
    inStock: true,
    stockCount: 40,
    ingredients: ["100% Certified Organic De-Hulled Whole Proso Millet Grains"],
    nutrition: {
      servingSize: "50g raw",
      calories: "178 kcal",
      protein: "6.2g",
      carbs: "34.8g",
      fiber: "4.4g",
      fats: "1.8g",
      iron: "2.0mg (14% DV)",
      calcium: "14mg (1.4% DV)",
      glycemicIndex: "Low (GI 50)"
    },
    allergens: "Naturally Gluten-Free.",
    storage: "Store in an airtight container in a cool, dry place.",
    cookingInstructions: "Rinse once. Add 1 part millet to 2 parts water. Simmer covered on low heat for 14-16 minutes until water is absorbed. Fluff with a fork and rest for 5 minutes."
  },
  {
    id: "bundle-starter-box",
    name: "Starter Millet Discovery Box (5-Grain Sampler & Recipe Booklet)",
    category: "combos",
    categoryLabel: "Combo Packs",
    price: 599,
    originalPrice: 749,
    weight: "Curated Kit (1.8 kg Total)",
    rating: 5.0,
    reviewsCount: 248,
    badge: "Save ₹150 (20% OFF)",
    badgeType: "bestseller",
    shortDescription: "The ideal beginner pantry kit: Sprouted Ragi Flour (500g), Foxtail Cookies (200g), Little Millet Noodles (250g), Bajra Chivda (180g), and a 24-page Printed Millet Recipe Guide.",
    fullDescription: "Start your healthy ancient grains journey effortlessly. The Starter Millet Discovery Box bundles our top five customer-favorite products, giving your kitchen an instant transition into wholesome eating. Complete with an illustrated chef-curated 24-page recipe booklet showing quick weekday meal preps, storage tips, and grain conversion guides.",
    image: "assets/images/products/combo-packs/starter-box-1.jpg",
    gallery: [
      "assets/images/products/combo-packs/starter-box-1.jpg",
      "assets/images/products/combo-packs/starter-box-2.jpg",
      "assets/images/products/combo-packs/starter-box-3.jpg",
      "assets/images/products/combo-packs/starter-box-4.jpg"
    ],
    sku: "AM-BD-013",
    inStock: true,
    stockCount: 60,
    includedItems: [
      "Sprouted Ragi Flour (500g)",
      "Artisanal Foxtail Almond Cookies (200g)",
      "Sun-Dried Little Millet Noodles (250g)",
      "Roasted Pearl Millet Chivda (180g)",
      "AuraMillet 24-Page Printed Recipe Handbook",
      "Eco-Friendly Organic Cotton Kitchen Tote"
    ],
    savingsValue: "₹150",
    savingsPercent: "20%",
    nutrition: {
      servingSize: "Sampler Assortment",
      calories: "Varies per item",
      protein: "Balanced plant protein",
      carbs: "Slow release complex carbs",
      fiber: "High prebiotic dietary fiber",
      fats: "Cold-pressed healthy fats",
      iron: "Abundant bioavailable iron",
      calcium: "Bone-fortifying calcium",
      glycemicIndex: "All products GI < 55"
    },
    allergens: "See individual product labels for nut and allergen disclosures.",
    storage: "Keep each sealed item in cool dry pantry conditions.",
    cookingInstructions: "Refer to included printed Recipe Booklet for 15+ chef-crafted meal and snack preparations."
  },
  {
    id: "bundle-family-pack",
    name: "Family Daily Nutrition Pantry Crate (4 Flours + 2 Snacks)",
    category: "combos",
    categoryLabel: "Combo Packs",
    price: 999,
    originalPrice: 1249,
    weight: "Family Crate (3.4 kg Total)",
    rating: 4.9,
    reviewsCount: 176,
    badge: "Save ₹250 (20% OFF)",
    badgeType: "bestseller",
    shortDescription: "Complete monthly staple nutrition for families of 3-5: Sprouted Ragi Flour (1kg), Cold-Milled Sorghum Flour (1kg), Proso Grains (1kg), Multi-Millet Dosa Mix (500g), plus 2 full-sized snack packs.",
    fullDescription: "Designed for families transitioning from refined wheat and white rice to nutrient-dense ancestral supergrains. This comprehensive crate delivers enough stoneground flours and breakfast essentials to support 4 weeks of gut-friendly rotis, morning dosas, and crunchy after-school snacking without toxic palm oil or refined sweeteners.",
    image: "assets/images/products/combo-packs/family-pack-1.jpg",
    gallery: [
      "assets/images/products/combo-packs/family-pack-1.jpg",
      "assets/images/products/combo-packs/family-pack-2.jpg",
      "assets/images/products/combo-packs/family-pack-3.jpg",
      "assets/images/products/combo-packs/family-pack-4.jpg"
    ],
    sku: "AM-BD-014",
    inStock: true,
    stockCount: 30,
    includedItems: [
      "Stoneground Sprouted Ragi Flour (1 kg)",
      "Cold-Milled Whole Grain Sorghum Flour (1 kg)",
      "Organic Cleaned Proso Millet Grains (1 kg)",
      "Instant Sprouted Multi-Millet Dosa Mix (500g)",
      "Baked Spiced Kodo Crisps (150g)",
      "Roasted Foxtail Cashew Trail Mix (220g)"
    ],
    savingsValue: "₹250",
    savingsPercent: "20%",
    nutrition: {
      servingSize: "Family Assortment",
      calories: "Whole food nutrition",
      protein: "High essential amino acids",
      carbs: "100% complex slow carbs",
      fiber: "Over 5g fiber per serving",
      fats: "Heart-healthy unsaturated fats",
      iron: "Daily dietary iron boost",
      calcium: "High calcium from ragi",
      glycemicIndex: "Diabetic and senior friendly"
    },
    allergens: "Contains Cashews. Flours milled in dedicated gluten-free mill.",
    storage: "Seal airtight after unboxing.",
    cookingInstructions: "Versatile family staples for rotis, idlis, dosas, pilafs, and midday snacks."
  },
  {
    id: "bundle-snack-crate",
    name: "Guilt-Free Teatime Snacking Crate (6 Assorted Munchies)",
    category: "combos",
    categoryLabel: "Combo Packs",
    price: 1099,
    originalPrice: 1349,
    weight: "Gourmet Box (1.1 kg Total)",
    rating: 5.0,
    reviewsCount: 132,
    badge: "Save ₹250 (19% OFF)",
    badgeType: "popular",
    shortDescription: "Six best-selling roasted and baked munchies packed together: Foxtail Almond Cookies, Dark Chocolate Ragi Bites, Bajra Chivda, Spiced Kodo Crisps, Trail Mix, and Barnyard Muesli.",
    fullDescription: "The ultimate cure for afternoon cravings. Packed into a craft wooden presentation box, this assortment features zero deep-fried snacks, zero artificial flavors, and zero refined sugars. The perfect corporate gift, hostess present, or personal pantry stash for health-conscious food lovers.",
    image: "assets/images/products/combo-packs/snack-crate-1.jpg",
    gallery: [
      "assets/images/products/combo-packs/snack-crate-1.jpg",
      "assets/images/products/combo-packs/snack-crate-2.jpg",
      "assets/images/products/combo-packs/snack-crate-3.jpg",
      "assets/images/products/combo-packs/snack-crate-4.jpg"
    ],
    sku: "AM-BD-015",
    inStock: true,
    stockCount: 45,
    includedItems: [
      "Artisanal Foxtail Almond Cookies (200g)",
      "Ragi Dark Chocolate Crunch Bites (175g)",
      "Roasted Pearl Millet Chivda (180g)",
      "Baked Spiced Kodo Crisps (150g)",
      "Roasted Foxtail Cashew Trail Mix (220g)",
      "Barnyard Morning Muesli (400g)"
    ],
    savingsValue: "₹250",
    savingsPercent: "19%",
    nutrition: {
      servingSize: "Snack Assortment",
      calories: "Guilt-free clean energy",
      protein: "Plant protein from seeds & nuts",
      carbs: "Low glycemic whole grain",
      fiber: "Natural digestive fiber",
      fats: "Zero trans fat, zero palm oil",
      iron: "Rich in plant iron",
      calcium: "High calcium treats",
      glycemicIndex: "Low GI snacking"
    },
    allergens: "Contains Almonds, Cashews, Peanuts, and Sesame.",
    storage: "Keep in a cool dry pantry away from moisture.",
    cookingInstructions: "Ready to enjoy anytime straight from the pouch."
  },
  {
    id: "bundle-pasta-feast",
    name: "Millet Pasta & Noodle Weekend Feast Kit",
    category: "combos",
    categoryLabel: "Combo Packs",
    price: 799,
    originalPrice: 999,
    weight: "Feast Box (1.2 kg Total)",
    rating: 4.8,
    reviewsCount: 88,
    badge: "Save ₹200 (20% OFF)",
    badgeType: "popular",
    shortDescription: "A gluten-free Italian and Asian gourmet noodle night kit: 2 packs Barnyard Fettuccine, 2 packs Little Millet Noodles, plus our Organic Cold-Pressed Garlic Herb Finishing Oil.",
    fullDescription: "Elevate your weekend dinners with nutritious pasta feasts that leave you feeling energized rather than sluggish. This kit combines bronze-cut gluten-free barnyard fettuccine, air-dried little millet noodles, and a bottle of extra virgin cold-pressed garlic herb finishing oil.",
    image: "assets/images/products/combo-packs/pasta-feast-1.jpg",
    gallery: [
      "assets/images/products/combo-packs/pasta-feast-1.jpg",
      "assets/images/products/combo-packs/pasta-feast-2.jpg",
      "assets/images/products/combo-packs/pasta-feast-3.jpg",
      "assets/images/products/combo-packs/pasta-feast-4.jpg"
    ],
    sku: "AM-BD-016",
    inStock: true,
    stockCount: 25,
    includedItems: [
      "Gluten-Free Barnyard Millet Fettuccine (2 x 300g)",
      "Sun-Dried Little Millet Noodles (2 x 250g)",
      "Cold-Pressed Garlic Herb Olive Finishing Oil (100ml)",
      "Laminated Italian & Pan-Asian Recipe Card"
    ],
    savingsValue: "₹200",
    savingsPercent: "20%",
    nutrition: {
      servingSize: "Gourmet Pasta Assortment",
      calories: "Wholesome gluten-free meal",
      protein: "High vegetable protein",
      carbs: "Complex slow-digesting carbs",
      fiber: "Twice the fiber of wheat pasta",
      fats: "Extra virgin heart-healthy fats",
      iron: "Essential dietary minerals",
      calcium: "Natural bone support",
      glycemicIndex: "Low GI dinner"
    },
    allergens: "Gluten-Free, 100% Vegan.",
    storage: "Store dry pasta in kitchen pantry.",
    cookingInstructions: "Step-by-step instructions for garlic-chili tossed noodles and sun-dried tomato pesto fettuccine included."
  }
];

// BLOG JOURNAL ARTICLES DATA
const BLOG_POSTS_DATA = [
  {
    id: "climate-resilient-supergrain-21st-century",
    title: "Why Millets are the Climate-Resilient Supergrain of the 21st Century",
    category: "Sustainable Farming",
    author: "Dr. Ananya Sharma",
    authorRole: "Chief Food Scientist",
    authorAvatar: "assets/images/about/team-1.jpg",
    date: "October 18, 2026",
    readingTime: "6 min read",
    image: "assets/images/blog/climate-resilient-supergrain/featured.jpg",
    detailImage: "assets/images/blog/climate-resilient-supergrain/supporting.jpg",
    tertiaryImage: "assets/images/blog/climate-resilient-supergrain/detail.jpg",
    tertiaryCaption: "Drought-hardy C4 photosynthetic millet crops flourishing under semi-arid conditions with 70% less water than rice.",
    excerpt: "With groundwater depleting and global temperatures rising, ancient C4 photosynthetic millets require 70% less water than rice and thrive in arid soils without synthetic fertilizers.",
    tags: ["Sustainability", "Agriculture", "Climate Action", "Organic Grains"],
    content: `
      <p class="lead">As humanity confronts the twin challenges of global water scarcity and unpredictable climatic swings, modern agronomy is rediscovering an agricultural marvel that nourished civilizations for over five millennia: millets.</p>
      
      <h3>The Remarkable C4 Photosynthetic Advantage</h3>
      <p>Unlike common cereals such as wheat and white rice, which utilize the C3 photosynthetic pathway, millets belong to the elite C4 group of plants. This evolutionary adaptation allows them to assimilate carbon dioxide with exceptional efficiency, even at ambient temperatures exceeding 38°C (100°F). Their specialized bundle sheath anatomy prevents photorespiration, drastically conserving cell moisture and maximizing carbohydrate production per drop of water.</p>
      
      <blockquote>
        "Millets are not merely a nostalgic grain of the past; they are the literal insurance policy of our planet's future food security."
      </blockquote>

      <h3>Comparative Water Footprint: Rice vs. Millets</h3>
      <p>To produce just one kilogram of polished paddy rice, modern flood irrigation consumes between 3,000 and 5,000 liters of fresh water. In stark contrast, rainfed pearl millet (Bajra) and foxtail millet require as little as 250 to 350 liters—a staggering 90% reduction in freshwater demand. Furthermore, millets possess extensive fibrous root architectures that penetrate deep into semi-arid topsoils, anchoring against soil erosion and capturing trace subsoil nutrients that standard crops leave behind.</p>

      <h3>Regenerative Benefits for Smallholder Farmers</h3>
      <p>Because millets have evolved in harsh dryland ecosystems, they possess innate natural resistance to common fungal pathogens and insect borers. This biological resilience allows our partner farming cooperatives across dryland belts to cultivate them completely chemical-free, eliminating expensive petrochemical inputs and shielding rural water tables from toxic pesticide runoff.</p>
    `,
    takeaways: [
      "Millets use up to 70% to 90% less irrigation water compared to commercial white rice.",
      "C4 photosynthesis ensures robust grain yields even during prolonged dry spells and high temperatures.",
      "Deep fibrous root systems improve soil aeration and prevent agricultural topsoil degradation.",
      "Zero synthetic pesticides are needed due to natural indigenous pest resistance."
    ]
  },
  {
    id: "7-day-guide-to-incorporating-millets",
    title: "From Breakfast to Dinner: A 7-Day Guide to Incorporating Millets into Modern Diets",
    category: "Nutrition Education",
    author: "Meera Patel",
    authorRole: "Head of Product Development",
    authorAvatar: "assets/images/about/team-3.jpg",
    date: "October 12, 2026",
    readingTime: "8 min read",
    image: "assets/images/blog/7-day-guide-millets/featured.jpg",
    detailImage: "assets/images/blog/7-day-guide-millets/supporting.jpg",
    tertiaryImage: "assets/images/blog/7-day-guide-millets/detail.jpg",
    tertiaryCaption: "Fluffy cooked foxtail millet grains and whole supergrain breakfast bowls designed for daily nutrient rotation.",
    excerpt: "Transitioning to whole grains doesn't mean eating boring porridge. Learn how to effortlessly swap refined grains with versatile foxtail, ragi, and sorghum across seven delicious days.",
    tags: ["Meal Planning", "Healthy Eating", "Gluten-Free", "Kitchen Tips"],
    content: `
      <p class="lead">Many home cooks hesitate to embrace ancient millets because they assume cooking them requires cumbersome soaking rituals or yields dense, unpalatable dishes. In truth, millets are the most versatile chameleons in the modern pantry.</p>
      
      <h3>The Golden Rule of Millet Hydration</h3>
      <p>The single secret to preparing fluffy, separate millet grains is respecting grain-to-water ratios. While whole proso or foxtail millet thrives with a 1:2 ratio for a fluffy rice-like texture, barnyard and little millet excel with 1:2.5 for soft breakfast pilafs. A quick 15-minute rinse and soak gently relaxes the outer seed coat, cutting stove time down to under 15 minutes.</p>

      <h3>Your Step-by-Step 7-Day Transition Schedule</h3>
      <ul>
        <li><strong>Day 1 (Monday):</strong> Energizing Breakfast — Creamy Sprouted Ragi Malt with cinnamon, crushed walnuts, and wild honey.</li>
        <li><strong>Day 2 (Tuesday):</strong> Lunch Bowl — Fluffy Foxtail Millet tossed with roasted Mediterranean vegetables and basil dressing.</li>
        <li><strong>Day 3 (Wednesday):</strong> Midweek Comfort — Sun-Dried Little Millet Noodles stir-fried with bok choy and sesame chili oil.</li>
        <li><strong>Day 4 (Thursday):</strong> Dinner Staple — Soft Sorghum (Jowar) rotis served alongside spiced lentil dhal.</li>
        <li><strong>Day 5 (Friday):</strong> Evening Snack — Oven-baked Kodo Millet Crisps with homemade Greek tzatziki dip.</li>
        <li><strong>Day 6 (Saturday):</strong> Weekend Brunch — Golden crispy Sprouted Multi-Millet Dosas with fresh coconut mint chutney.</li>
        <li><strong>Day 7 (Sunday):</strong> Feast Finale — Slow-simmered Barnyard Millet and wild mushroom risotto with parmesan shavings.</li>
      </ul>
    `,
    takeaways: [
      "Always rinse whole grains once before cooking to remove superficial dust and surface saponins.",
      "Maintain a 1:2 water ratio for fluffy rice alternatives; 1:2.5 for creamier porridges.",
      "Sprouted ragi flour dissolves instantly in warm liquids without forming clumpy residues.",
      "Millet dishes remain digestively light and promote steady blood glucose levels throughout the afternoon."
    ]
  },
  {
    id: "crispy-baked-bajra-methi-crackers",
    title: "Crispy Baked Bajra & Methi Crackers: The Ultimate Tea-Time Companion",
    category: "Millet Recipes",
    author: "Meera Patel",
    authorRole: "Head of Product Development",
    authorAvatar: "assets/images/about/team-3.jpg",
    date: "September 28, 2026",
    readingTime: "5 min read",
    image: "assets/images/blog/bajra-methi-crackers/featured.jpg",
    detailImage: "assets/images/blog/bajra-methi-crackers/supporting.jpg",
    tertiaryImage: "assets/images/blog/bajra-methi-crackers/detail.jpg",
    tertiaryCaption: "Artisanal preparation of stoneground pearl millet (bajra) flour blended with fresh fenugreek leaves and carom seeds.",
    excerpt: "Bake these crunchy pearl millet and fresh fenugreek leaf crackers at home in under 25 minutes. Rich in dietary iron and completely free from palm oil or refined flour.",
    tags: ["Recipes", "Baking", "Tea-Time Snacks", "Iron Rich"],
    content: `
      <p class="lead">Afternoon slumps often prompt cravings for greasy fried chips or sugary biscuits. These homemade Bajra (Pearl Millet) and Methi (Fenugreek) crackers deliver a satisfyingly crisp bite with an earthy, savory flavor profile that elevates any tea break.</p>

      <h3>Why Bajra and Methi Are a Match Made in Heaven</h3>
      <p>Pearl millet is one of the richest botanical sources of non-heme iron and phosphorus. Pairing it with fresh fenugreek greens introduces bioavailable vitamin C and natural bitters that activate digestive enzymes and significantly enhance iron absorption in the gut.</p>

      <h3>Ingredients You Will Need</h3>
      <ul>
        <li>1 cup Organic Pearl Millet (Bajra) Flour</li>
        <li>1/2 cup finely chopped fresh fenugreek (methi) leaves</li>
        <li>1 tablespoon white sesame seeds (adds delicate calcium crunch)</li>
        <li>1/2 teaspoon carom seeds (ajwain), crushed between palms</li>
        <li>2 tablespoons cold-pressed sesame or olive oil</li>
        <li>1/2 teaspoon Himalayan rock salt and pinch of turmeric</li>
        <li>1/3 cup warm water for kneading</li>
      </ul>
      
      <h3>Baking Instructions</h3>
      <p>Knead all ingredients into a firm, pliable dough. Roll out thinly between two sheets of parchment paper to approximately 2mm thickness. Score into diamond crackers with a pastry wheel. Bake in a preheated oven at 180°C (350°F) for 14-16 minutes until edges turn deep golden brown. Cool on a wire rack for maximum crispness.</p>
    `,
    takeaways: [
      "Pearl millet flour provides 8mg of iron per 100g—more than four times that of refined wheat flour.",
      "Sesame seeds and fenugreek leaves naturally balance the rustic grain flavor.",
      "Baking at 180°C preserves delicate antioxidants while creating a shelf-stable cracker.",
      "Store in an airtight tin for up to 3 weeks of crunchy afternoon snacking."
    ]
  },
  {
    id: "decoding-glycemic-index-diabetologists-recommendation",
    title: "Decoding Glycemic Index: Why Diabetologists Recommend Sorghum & Kodo Millet",
    category: "Nutrition Education",
    author: "Dr. Ananya Sharma",
    authorRole: "Chief Food Scientist",
    authorAvatar: "assets/images/about/team-1.jpg",
    date: "September 19, 2026",
    readingTime: "7 min read",
    image: "assets/images/blog/glycemic-index-sorghum-kodo/featured.jpg",
    detailImage: "assets/images/blog/glycemic-index-sorghum-kodo/supporting.jpg",
    tertiaryImage: "assets/images/blog/glycemic-index-sorghum-kodo/detail.jpg",
    tertiaryCaption: "Comparative clinical grain analysis: Whole sorghum (GI 52) and kodo millet (GI 48) slow-digesting resistant starches.",
    excerpt: "Explore the clinical science of slow-digesting resistant starches in Kodo and Sorghum millets that prevent postprandial glucose spikes in diabetic and pre-diabetic individuals.",
    tags: ["Diabetes Care", "Glycemic Index", "Metabolic Health", "Gut Microbiome"],
    content: `
      <p class="lead">Type 2 diabetes and metabolic syndrome have reached epidemic proportions globally, largely accelerated by diets dominated by high-glycemic carbohydrates like polished white rice (GI ~73) and refined wheat flour (GI ~75).</p>

      <h3>The Science of Resistant Starch and Amylose</h3>
      <p>The rate at which a food raises blood glucose is governed by the ratio of amylose to amylopectin in its starch structure. While fast-digesting grains are loaded with branched amylopectin, millets—particularly Kodo (Paspalum scrobiculatum) and Sorghum—contain high proportions of linear amylose. This compact molecular alignment resists rapid enzymatic degradation by salivary and pancreatic alpha-amylase.</p>

      <h3>Postprandial Insulin Stabilization</h3>
      <p>Clinical trials monitoring continuous glucose monitors (CGM) demonstrate that substituting white rice with whole kodo millet flattens post-meal glycemic excursions by up to 37%. Instead of a sharp insulin surge followed by an energy crash, glucose enters the bloodstream at a steady, sustained trickle over 3 to 4 hours.</p>
    `,
    takeaways: [
      "Kodo millet has a measured Glycemic Index of ~50, classifying it firmly as a low-GI complex carbohydrate.",
      "High amylose-to-amylopectin ratio slows enzymatic starch breakdown.",
      "Prebiotic beta-glucan fibers nourish beneficial Bifidobacteria in the gut, boosting insulin sensitivity.",
      "Simple 1:1 dietary substitution significantly lowers post-prandial HbA1c trajectory over 90 days."
    ]
  },
  {
    id: "reviving-indigenous-seed-varieties",
    title: "Reviving Indigenous Seed Varieties: Our Direct Partnership with 400+ Smallholder Farmers",
    category: "Sustainable Farming",
    author: "Rajesh Varma",
    authorRole: "Founder & Supply Chain Director",
    authorAvatar: "assets/images/about/team-2.jpg",
    date: "September 04, 2026",
    readingTime: "6 min read",
    image: "assets/images/blog/indigenous-seed-varieties/featured.jpg",
    detailImage: "assets/images/blog/indigenous-seed-varieties/supporting.jpg",
    tertiaryImage: "assets/images/blog/indigenous-seed-varieties/detail.jpg",
    tertiaryCaption: "Community seed bank conservation: Preserving 24 heirloom landraces across smallholder farming cooperatives.",
    excerpt: "How our community seed bank initiative is preserving 24 heirloom millet landraces while guaranteeing fair minimum purchase prices for women-led agricultural cooperatives.",
    tags: ["Biodiversity", "Fair Trade", "Heirloom Seeds", "Farmer Stories"],
    content: `
      <p class="lead">Over the past century, commercial monoculture eradicated nearly 75% of diverse plant genetic varieties from farmers' fields. At AuraMillet, we believe true food security begins at the seed level.</p>

      <h3>The Peril of Monoculture Hybridization</h3>
      <p>Commercial hybrid seeds require heavy synthetic chemical cocktails and high-volume irrigation to yield crops. When rains fail, the hybrid plants wither, leaving smallholder farming households burdened with debt. In contrast, indigenous heirloom landraces have adapted over centuries to local microclimates, harboring genetic traits that withstand severe drought, saline soils, and sudden pest attacks.</p>

      <h3>Our Community Seed Bank Initiative</h3>
      <p>In partnership with rural women cooperatives, we established three decentralized community seed banks. Before the sowing season, farmers receive free organic heirloom seed stock. Following the harvest, they return 1.5 times the seed volume back to the community bank, creating a self-sustaining cycle of agricultural abundance that is owned and governed by the community.</p>
    `,
    takeaways: [
      "Over 24 distinct heirloom landraces of finger, foxtail, and barnyard millets are protected in our seed banks.",
      "Farmers gain complete freedom from patented commercial seeds and chemical dependencies.",
      "AuraMillet contracts directly with cooperatives at 25% above statutory minimum support prices.",
      "Promotes gender equity through direct payments into women farmers' dedicated bank accounts."
    ]
  },
  {
    id: "science-of-sprouting-calcium-bioavailability",
    title: "The Science of Sprouting: How Germination Multiplies Ragi's Calcium & Iron Bioavailability",
    category: "Healthy Lifestyle",
    author: "Dr. Ananya Sharma",
    authorRole: "Chief Food Scientist",
    authorAvatar: "assets/images/about/team-1.jpg",
    date: "August 22, 2026",
    readingTime: "5 min read",
    image: "assets/images/blog/sprouted-ragi/featured.jpg",
    detailImage: "assets/images/blog/sprouted-ragi/supporting.jpg",
    tertiaryImage: "assets/images/blog/sprouted-ragi/detail.jpg",
    tertiaryCaption: "Controlled 48-hour grain germination activates phytase enzymes, unlocking bioavailable calcium and natural plant iron.",
    excerpt: "Sprouting is not just a culinary trend—it is biochemistry at work. Discover how 48 hours of controlled germination reduces phytic acid and unlocks bound micronutrients.",
    tags: ["Sprouting", "Bioavailability", "Bone Health", "Enzymes"],
    content: `
      <p class="lead">Whole grains are nature's storage vessels. To protect their internal nutrients until optimal soil conditions arise, seeds contain anti-nutritional compounds like phytic acid and enzyme inhibitors. Sprouting is the master biological key that unlocks these treasures.</p>

      <h3>Deactivating Phytic Acid: The Chelating Agent</h3>
      <p>Phytic acid binds tightly to minerals like calcium, iron, and zinc in the human digestive tract, forming insoluble precipitates that pass unabsorbed through the intestines. During germination, endogenous phytase enzymes are activated, breaking the ester bonds of phytic acid and liberating up to 85% of bound calcium ions for intestinal transport.</p>

      <h3>Vitamin C Synthesis and Enzymatic Flourishing</h3>
      <p>While dormant ragi grain contains practically zero vitamin C, 48 hours of gentle sprouting synthesizes significant quantities of ascorbic acid. This natural vitamin C acts as a reducing agent, converting ferric iron (Fe3+) into the highly absorbable ferrous (Fe2+) state, multiplying overall dietary iron bioavailability twofold.</p>
    `,
    takeaways: [
      "Sprouting reduces phytic acid content by up to 85%, preventing mineral binding.",
      "Naturally synthesized vitamin C converts iron into its easily absorbable ferrous state.",
      "Proteins are pre-digested into free amino acids, making sprouted ragi exceptionally gentle on infant and senior digestion.",
      "Yields a silky flour texture that produces fluffy baked goods without gum additives."
    ]
  },
  {
    id: "creamy-little-millet-mushroom-risotto",
    title: "15-Minute Creamy Little Millet & Mushroom Risotto (100% Gluten-Free)",
    category: "Millet Recipes",
    author: "Meera Patel",
    authorRole: "Head of Product Development",
    authorAvatar: "assets/images/about/team-3.jpg",
    date: "August 11, 2026",
    readingTime: "7 min read",
    image: "assets/images/blog/little-millet-risotto/featured.jpg",
    detailImage: "assets/images/blog/little-millet-risotto/supporting.jpg",
    tertiaryImage: "assets/images/blog/little-millet-risotto/detail.jpg",
    tertiaryCaption: "Velvety gluten-free risotto prepared by simmering whole little millet grains with cremini mushrooms and fresh thyme.",
    excerpt: "Recreate the velvety richness of traditional Arborio risotto using little millet grains, sautéed cremini mushrooms, garlic, and fresh thyme. Done in under 20 minutes.",
    tags: ["Gourmet Recipes", "Risotto", "Comfort Food", "Gluten-Free Dining"],
    content: `
      <p class="lead">Classic Italian risotto is celebrated for its decadent, velvety starch suspension, but traditional white Arborio rice lacks dietary fiber and causes rapid blood sugar spikes. Little Millet (Samai) is the culinary secret weapon that delivers equal creaminess with superior nutrition.</p>

      <h3>Why Little Millet Creates the Ideal Risotto Consistency</h3>
      <p>Little millet grains possess a unique starch profile with natural soluble fibers that dissolve during low-temperature braising, forming an unctuous emulsion without requiring heavy cream. The tender yet distinct grain core maintains a pleasurable al dente texture that mimics traditional Italian carnaroli rice.</p>

      <h3>Ingredients (Serves 3-4)</h3>
      <ul>
        <li>1 cup Little Millet, rinsed and drained</li>
        <li>250g Cremini or Shiitake mushrooms, sliced</li>
        <li>3 cloves garlic, minced, and 1 medium shallot, diced</li>
        <li>3 cups warm vegetable broth (low sodium)</li>
        <li>2 tablespoons cold-pressed extra virgin olive oil</li>
        <li>1/3 cup freshly grated Parmesan cheese (or nutritional yeast for vegan)</li>
        <li>Fresh thyme sprigs, freshly cracked black pepper, sea salt</li>
      </ul>
      
      <h3>Cooking Method</h3>
      <p>Sauté shallots and garlic in olive oil until translucent. Add sliced mushrooms and fresh thyme, cooking until deep brown. Stir in rinsed little millet to toast for 2 minutes. Gradually ladle warm broth one cup at a time, allowing the grains to absorb the liquid over gentle simmering for 14 minutes. Fold in cheese and freshly ground black pepper. Serve steaming hot.</p>
    `,
    takeaways: [
      "Little millet mimics the rich, creamy texture of Arborio rice without heavy cream.",
      "Delivers 6g of dietary fiber per serving—triple that of conventional white risotto rice.",
      "Cooks in just 15 minutes compared to 35 minutes for whole brown rice.",
      "Pair with seasonal wild mushrooms for a burst of immune-supporting beta-glucans."
    ]
  },
  {
    id: "smart-school-lunchboxes-millet-munchies",
    title: "Smart School Lunchboxes: Ditching Palm Oil & Refined Flour for Millet Munchies",
    category: "Healthy Snacking",
    author: "David Miller",
    authorRole: "Sustainability Operations Lead",
    authorAvatar: "assets/images/about/team-4.jpg",
    date: "July 29, 2026",
    readingTime: "6 min read",
    image: "assets/images/blog/millet-school-lunchbox/featured.jpg",
    detailImage: "assets/images/blog/millet-school-lunchbox/supporting.jpg",
    tertiaryImage: "assets/images/blog/millet-school-lunchbox/detail.jpg",
    tertiaryCaption: "Kid-approved healthy bento swaps: Ragi chocolate crunch bites, baked spiced kodo crisps, and roasted pearl chivda.",
    excerpt: "Simple, kid-approved snack swaps that replace ultra-processed packaged treats with calcium-rich ragi chocolate bites, baked kodo crisps, and wholesome nut mixes.",
    tags: ["Kids Nutrition", "Snack Swaps", "No Palm Oil", "Lunchbox Ideas"],
    content: `
      <p class="lead">Commercial children's snacks are filled with ultra-processed refined flours, hydrogenated palm oils, artificial food dyes, and hidden high-fructose corn syrup. These ingredients trigger intense sugar spikes followed by midday classroom fatigue and behavioral restlessness.</p>

      <h3>The Nutrient Demands of Growing Children</h3>
      <p>Between ages 4 and 14, children build the structural bone density that protects them throughout adult life. Finger millet (Ragi) delivers an astonishing 344mg of calcium per 100g—more than ten times that of wheat or rice. When formulated into crunchy baked cookies sweetened with jaggery or cacao crunch bites, children eagerly devour the nutrients without suspecting they are eating health food.</p>

      <h3>Three 60-Second Lunchbox Upgrades</h3>
      <ul>
        <li><strong>Swap 1:</strong> Replace potato chips with Baked Spiced Kodo Crisps (eliminates trans-fats and boosts prebiotic fiber).</li>
        <li><strong>Swap 2:</strong> Replace commercial chocolate cream biscuits with Artisanal Foxtail Almond Cookies or Ragi Dark Chocolate Crunch Bites.</li>
        <li><strong>Swap 3:</strong> Replace instant cup noodles with Sun-Dried Little Millet Noodles in a thermos container with colorful diced carrots and peas.</li>
      </ul>
    `,
    takeaways: [
      "Ragi provides bone-building calcium critical for childhood growth spurts.",
      "Eliminating palm oil protects children from inflammatory industrial trans-fatty acids.",
      "Slow-burning whole grain starches prevent classroom sugar crashes and improve afternoon focus.",
      "Crispy textures and familiar seasonings make whole millets an instant hit with picky eaters."
    ]
  },
  {
    id: "heritage-of-dryland-agriculture-water-conservation",
    title: "The Heritage of Dryland Agriculture: How Millets Flourish With 70% Less Water",
    category: "Traditional Foods",
    author: "Rajesh Varma",
    authorRole: "Founder & Supply Chain Director",
    authorAvatar: "assets/images/about/team-2.jpg",
    date: "July 15, 2026",
    readingTime: "7 min read",
    image: "assets/images/blog/dryland-millet-farming/featured.jpg",
    detailImage: "assets/images/blog/dryland-millet-farming/supporting.jpg",
    tertiaryImage: "assets/images/blog/dryland-millet-farming/detail.jpg",
    tertiaryCaption: "Traditional contour bunding and rainfed semi-arid cultivation methods preserving subterranean groundwater aquifers.",
    excerpt: "A deep dive into historical contour trenching, mixed cropping systems, and traditional indigenous knowledge that made dryland farming resilient for centuries.",
    tags: ["Dryland Farming", "Ancient Wisdom", "Water Conservation", "Ecology"],
    content: `
      <p class="lead">In regions where annual precipitation averages under 450mm, conventional modern agriculture fails completely. Yet for thousands of years, traditional dryland farmers sustained vibrant communities by cultivating multi-tier polycultures anchored by resilient millet varieties.</p>

      <h3>The Traditional Navadanya (Nine Seeds) Polyculture</h3>
      <p>Traditional farmers never planted single-crop monocultures. Instead, they sowed an intricate guild of nine companion seeds—combining deep-rooted pearl millet, sprawling pulse cover crops like black gram, and flowering pollinators like mustard. The pulses fix atmospheric nitrogen into the soil, the millets provide structural windbreaks, and the foliage shades the soil surface, cutting evaporation to near zero.</p>

      <h3>Rainwater Harvesting Through Earthen Bunds</h3>
      <p>Rather than sinking deep borewells that drain ancient aquifers, our partner communities utilize contour bunding and check dams. When the brief monsoon arrives, rainwater is gently slowed across the slopes, percolating deeply into root zones where drought-resistant millet root networks hold moisture for months.</p>
    `,
    takeaways: [
      "Mixed companion cropping naturally replenishes soil nitrogen without chemical fertilizers.",
      "Zero groundwater extraction shields rural aquifers from permanent depletion.",
      "Traditional bunding keeps every drop of monsoon rainfall directly in the agricultural root zone.",
      "Empowers dryland farming communities with self-reliant, zero-debt crop abundance."
    ]
  }
];

// SUSTAINABILITY INITIATIVES DATA
const INITIATIVES_DATA = [
  {
    id: "sustainable-millet-cultivation",
    title: "Sustainable Millet Cultivation & Water Stewardship",
    summary: "Championing rainfed, low-input dryland farming that consumes 70% less water than rice or wheat while regenerating fragile topsoils.",
    image: "assets/images/initiatives/init-cultivation.jpg",
    stat: "70% Less Water",
    statLabel: "Compared to Commercial Paddy",
    pillar: "Environment",
    details: "Commercial agriculture accounts for over 70% of global freshwater withdrawals. By revitalizing indigenous millet crops across arid and semi-arid dryland belts, we eliminate artificial flood irrigation. Our partner fields rely predominantly on natural seasonal rainfall, preserving precious subterranean aquifers for future generations while rebuilding microbial soil organic matter.",
    goals: [
      "Transition 1,200+ hectares of semi-arid farmland to certified zero-chemical cultivation.",
      "Conserve over 400 million liters of groundwater annually through rainfed crops.",
      "Implement contour rainwater trenches across 100% of partner cooperative acreage."
    ]
  },
  {
    id: "supporting-local-farmers",
    title: "Supporting Local Smallholders & Women-Led Cooperatives",
    summary: "Direct farm-gate purchasing guarantees 25% above statutory market rates, eliminating exploitative middlemen and empowering rural women growers.",
    image: "assets/images/initiatives/init-farmers.jpg",
    stat: "400+ Farmers",
    statLabel: "Direct Fair-Trade Partners",
    pillar: "Community",
    details: "We bypass predatory commodity trading syndicates by contracting directly with rural farmer producer organizations (FPOs). We provide free organic bio-inputs, modern threshing technology, and direct electronic bank payments into farmers' accounts, ensuring fair and timely compensation for their hard labor.",
    goals: [
      "Pay guaranteed 25% price premiums above regional market benchmarks.",
      "Support 85% women-managed agricultural producer cooperatives.",
      "Provide free micro-credit for clean mechanical grain cleaning machinery."
    ]
  },
  {
    id: "responsible-packaging",
    title: "100% Biodegradable & Recyclable Earth-Packs",
    summary: "Ditching multi-layered virgin plastics in favor of plant-based bio-films, unbleached kraft papers, and soy-based non-toxic printing inks.",
    image: "assets/images/initiatives/init-packaging.jpg",
    stat: "Zero Virgin Plastic",
    statLabel: "By End of 2027",
    pillar: "Packaging",
    details: "Food packaging should never outlive the food it protects by hundreds of years. Our new Generation Earth-Packs utilize unbleached FSC-certified kraft paper lined with plant-derived PLA compostable barrier films that lock out oxygen and humidity while breaking down harmlessly in commercial compost conditions.",
    goals: [
      "Achieve 100% compostable or curbside-recyclable packaging across entire product line.",
      "Utilize vegetable soy-based printing inks free from volatile organic compounds (VOCs).",
      "Offset 100% of shipping carton footprints through community agroforestry tree planting."
    ]
  },
  {
    id: "traditional-grain-revival",
    title: "Traditional Grain Revival & Heirloom Seed Conservation",
    summary: "Curating decentralized community seed banks to rescue endangered indigenous millet landraces from extinction.",
    image: "assets/images/initiatives/init-seed-revival.jpg",
    stat: "24 Landraces",
    statLabel: "Preserved in Seed Banks",
    pillar: "Biodiversity",
    details: "Centuries of industrial agriculture pushed rich heirloom grain strains to the brink of extinction in favor of uniform, chemical-dependent hybrids. Through our Seed Guardians project, we collect, document, and propagate native drought-resilient seed stocks, returning genetic ownership directly to traditional farming communities.",
    goals: [
      "Operate three decentralized climate-controlled community seed banks.",
      "Distribute free organic heirloom starter seed kits to newly registered growers.",
      "Publish open-source morphological and agronomic records for all preserved landraces."
    ]
  },
  {
    id: "community-nutrition-awareness",
    title: "Community Nutrition & School Midday Meal Support",
    summary: "Partnering with rural primary schools to introduce delicious, iron-dense millet porridge and nutritious crunch snacks into children's daily meals.",
    image: "assets/images/initiatives/init-community.jpg",
    stat: "15,000+ Meals",
    statLabel: "Nutritional Support Served",
    pillar: "Nutrition",
    details: "Childhood malnutrition and micro-nutrient deficiencies (hidden hunger) persist in agricultural belts where cash crops have displaced food crops. We supply freshly milled sprouted ragi flour and nutritious snacks to rural government schools, reversing childhood anemia and improving cognitive vitality in classrooms.",
    goals: [
      "Provide daily sprouted ragi porridge support to 12 rural elementary schools.",
      "Measure and publish quarterly hemoglobin and growth metrics with pediatric oversight.",
      "Conduct community culinary workshops teaching parents affordable millet meal prep."
    ]
  },
  {
    id: "farm-to-table-practices",
    title: "Farm-to-Table Transparency & Seed-to-Shelf Traceability",
    summary: "Transparent QR batch tracing linking every pack back to its source farming cluster, harvest date, and clean third-party lab safety testing.",
    image: "assets/images/initiatives/init-farm-table.jpg",
    stat: "100% Traceable",
    statLabel: "QR Batch Transparency",
    pillar: "Purity",
    details: "In modern industrial food systems, consumers have lost touch with where their food was grown and who harvested it. Every AuraMillet package includes a verifiable batch code that allows shoppers to view soil test certificates, farmer cooperative details, cold-milling dates, and heavy metal testing results.",
    goals: [
      "Implement batch-level QR traceability on 100% of retail SKUs.",
      "Publish third-party NABL-accredited purity and pesticide residue lab reports online.",
      "Maintain strict cold-chain processing under 32°C to prevent thermal nutrient degradation."
    ]
  }
];

// HEALTH BENEFITS & MILLET COMPARISON DATA
const HEALTH_BENEFITS_DATA = [
  {
    id: "finger-millet-ragi",
    name: "Ragi / Finger Millet",
    botanical: "Eleusine coracana",
    calcium: "344 mg",
    iron: "3.9 mg",
    protein: "7.3 g",
    fiber: "11.5 g",
    gi: "Low (GI 51)",
    image: "assets/images/millets/finger-millet/grain-960.webp",
    description: "The undisputed calcium king among all cultivated grains. Contains over 30 times more calcium than white rice, fortifying bone mineral density in growing children and mature adults.",
    keyBenefit: "Bone Health & Natural Calcium"
  },
  {
    id: "pearl-millet-bajra",
    name: "Bajra / Pearl Millet",
    botanical: "Pennisetum glaucum",
    calcium: "42 mg",
    iron: "8.0 mg",
    protein: "11.6 g",
    fiber: "11.3 g",
    gi: "Low (GI 54)",
    image: "assets/images/millets/pearl-millet/grain-960.webp",
    description: "Rich in bioavailable plant iron and phosphorus. Promotes optimal cellular oxygenation, fights fatigue, and provides prolonged sustained energy for active, physically demanding lifestyles.",
    keyBenefit: "High Iron & Stamina"
  },
  {
    id: "sorghum-jowar",
    name: "Jowar / Sorghum",
    botanical: "Sorghum bicolor",
    calcium: "25 mg",
    iron: "4.1 mg",
    protein: "10.4 g",
    fiber: "10.2 g",
    gi: "Low (GI 52)",
    image: "assets/images/millets/sorghum/grain-960.webp",
    description: "A gentle, prebiotic-rich ancient grain high in rare anthocyanin antioxidants. Supports cardiovascular artery elasticity, optimal digestion, and steady lipid profiles.",
    keyBenefit: "Heart Health & Prebiotics"
  },
  {
    id: "foxtail-millet-kangni",
    name: "Foxtail Millet / Kangni",
    botanical: "Setaria italica",
    calcium: "31 mg",
    iron: "2.8 mg",
    protein: "12.3 g",
    fiber: "8.0 g",
    gi: "Low (GI 50)",
    image: "assets/images/millets/foxtail-millet/grain-960.webp",
    description: "Packed with vitamin B1 (thiamine) and essential amino acids. Regulates nervous system neurotransmitters, aids muscle repair, and helps maintain healthy glycemic balance.",
    keyBenefit: "Nervous System & Low GI"
  },
  {
    id: "little-millet-samai",
    name: "Little Millet / Samai",
    botanical: "Panicum sumatrense",
    calcium: "17 mg",
    iron: "9.3 mg",
    protein: "9.7 g",
    fiber: "7.6 g",
    gi: "Low (GI 53)",
    image: "assets/images/millets/little-millet/grain-960.webp",
    description: "Features the highest iron density among small millets along with potent flavonoids. Exceptionally light on sensitive stomachs and cooks in under 12 minutes.",
    keyBenefit: "Fast Digesting & High Iron"
  },
  {
    id: "kodo-millet-varagu",
    name: "Kodo Millet / Varagu",
    botanical: "Paspalum scrobiculatum",
    calcium: "27 mg",
    iron: "1.7 mg",
    protein: "8.3 g",
    fiber: "9.0 g",
    gi: "Very Low (GI 48)",
    image: "assets/images/millets/kodo-millet/grain-960.webp",
    description: "Revered in clinical diabetes research for its high content of resistant starch and polyphenols. Extensively proven to curb postprandial glucose surges.",
    keyBenefit: "Diabetic Management & Fiber"
  },
  {
    id: "barnyard-millet-sanwa",
    name: "Barnyard Millet / Sanwa",
    botanical: "Echinochloa frumentacea",
    calcium: "20 mg",
    iron: "5.0 mg",
    protein: "11.2 g",
    fiber: "13.6 g",
    gi: "Lowest (GI 45)",
    image: "assets/images/millets/barnyard-millet/grain-960.webp",
    description: "Contains the lowest total digestible carbohydrate load and highest dietary fiber among all millets. An ideal staple for weight management and fasting diets.",
    keyBenefit: "Weight Management & Lowest Carbs"
  }
];

// Helper Functions
function getProductById(id) {
  return PRODUCTS_DATA.find(p => p.id === id) || PRODUCTS_DATA[0];
}

function getProductsByCategory(cat) {
  if (!cat || cat === "all") return PRODUCTS_DATA;
  return PRODUCTS_DATA.filter(p => p.category === cat);
}

function getBlogById(id) {
  return BLOG_POSTS_DATA.find(b => b.id === id) || BLOG_POSTS_DATA[0];
}

function getInitiativeById(id) {
  return INITIATIVES_DATA.find(i => i.id === id) || INITIATIVES_DATA[0];
}
