/** Product-specific editorial guidance. Recipe suggestions, not verified pack directions. */
const PRODUCT_EXPERIENCES = {
  'foxtail-millet-cookies': {
    intro: 'A crisp, buttery millet cookie with almond pieces and a little cardamom. A simple companion for a slow tea break.',
    taste: ['Toasty & gently spiced', 'A crumbly bite with pieces of almond.'],
    title: 'Make a little time for tea', time: 'Ready to serve', needs: 'Cookies, your favourite tea, and a small serving plate.',
    steps: [['Choose your portion', 'Take a few cookies from the pack; keep the rest sealed.'], ['Brew a companion', 'Serve with unsweetened tea, coffee, or warm milk of your choice.'], ['Try a new texture', 'Crumble a cookie over yogurt just before serving.'], ['Keep the crunch', 'Put remaining cookies in an airtight container after your break.']],
    serving: 'Try alongside sliced pear or a small bowl of plain yogurt.',
    opened: 'Use a rigid airtight tin so the cookies stay dry and do not crumble.',
    process: ['Mix & shape', 'Foxtail flour, almonds, ghee, jaggery, and cardamom form the sample cookie recipe.'],
    related: ['ragi-dark-chocolate-bites','roasted-pearl-millet-chivda','foxtail-cashew-trailmix','bundle-snack-crate']
  },
  'sprouted-ragi-flour': {
    intro: 'Finely milled finger millet with a warm, earthy flavour. Bring it into everyday cooking, from a smooth breakfast porridge to rustic rotis.',
    taste: ['Earthy & softly nutty', 'A fine flour that gives cooked dishes a warm brown colour.'],
    title: 'One flour, four everyday ideas', time: 'Cook thoroughly', needs: 'Ragi flour, water or milk, and the ingredients in your chosen recipe.',
    steps: [['Whisk a porridge', 'Mix flour into cool water first. Add to a saucepan and cook, stirring, until smooth and fully cooked.'], ['Make a savoury dosa', 'Use a tested ragi dosa recipe to prepare a thin batter. Cook both sides on a heated pan.'], ['Shape a rustic roti', 'Follow a ragi roti recipe using warm water. Pat or roll carefully and cook on a tawa.'], ['Bake with intention', 'Choose a recipe developed for ragi; its texture behaves differently from wheat flour.']],
    serving: 'Finish porridge with fruit, or serve savoury ragi dishes with chutney and vegetables.',
    opened: 'Transfer to a clean, dry, airtight jar and keep the original date label.',
    process: ['Sprout & mill', 'The sample process uses germinated finger millet, dried before slow milling into flour.'],
    related: ['cold-milled-sorghum-flour','organic-whole-proso-millet','sprouted-multi-millet-dosa-mix','bundle-family-pack']
  },
  'air-dried-little-millet-noodles': {
    intro: 'Little millet and red lentil noodles with a savoury spice blend. Add your favourite vegetables for a colourful bowl.',
    taste: ['Mild & savoury', 'Fine strands with a tender bite when cooked.'],
    title: 'A warm bowl, your way', time: 'About 6 min cooking*', needs: 'Noodles, water, vegetables, and the included seasoning.',
    steps: [['Get the water ready', 'Bring a roomy saucepan of water to a rolling boil.'], ['Cook the strands', 'Add the noodles and stir gently. The sample recipe suggests about 6 minutes; check the pack and taste for doneness.'], ['Drain gently', 'Drain when tender, keeping the strands intact.'], ['Toss & serve', 'Combine with cooked vegetables and seasoning. Serve while warm.']],
    serving: 'Try mushrooms, carrots, and spring onions with a squeeze of lime.',
    opened: 'Reseal uncooked noodles in a dry container without crushing the strands.',
    process: ['Extrude & dry', 'Little millet and lentil dough is shaped into noodles and dried in this illustrative process.'],
    related: ['barnyard-millet-fettuccine','bundle-pasta-feast','organic-whole-proso-millet','sprouted-multi-millet-dosa-mix']
  },
  'roasted-pearl-millet-chivda': {
    intro: 'A savoury mix of roasted pearl millet, peanuts, curry leaves, and spices. Keep a small bowl nearby for a crisp afternoon snack.',
    taste: ['Roasted & savoury', 'A light crunch with peanuts and aromatic curry leaves.'],
    title: 'A brighter afternoon snack', time: 'Ready to serve', needs: 'Chivda and, optionally, freshly chopped vegetables.',
    steps: [['Pour a small bowl', 'Use a dry spoon to portion the chivda.'], ['Keep it simple', 'Enjoy the roasted mix on its own with tea.'], ['Make a quick chaat', 'For immediate serving, add chopped onion, tomato, coriander, and a little lime.'], ['Seal the rest', 'Keep the unused dry mix separate from moist toppings.']],
    serving: 'Add to a salad at the table so it keeps its crunch.',
    opened: 'Press air from the pouch and reseal after each serving.',
    process: ['Roast & season', 'Pearl millet and peanuts are combined with curry leaves and spices in the sample mix.'],
    related: ['spiced-kodo-millet-crisps','foxtail-cashew-trailmix','foxtail-millet-cookies','bundle-snack-crate']
  },
  'spiced-kodo-millet-crisps': {
    intro: 'Triangular kodo millet crackers with sun-dried tomato and herbs. An easy choice for a savoury snack plate.',
    taste: ['Tomato & garden herbs', 'Thin, crisp crackers with a lightly textured surface.'],
    title: 'Build a better dipping plate', time: 'Ready to serve', needs: 'Kodo crisps, a dip, and fresh vegetable sticks.',
    steps: [['Arrange the crisps', 'Set out a small handful just before eating.'], ['Choose a dip', 'Try hummus, a yogurt dip, or mashed avocado.'], ['Add something fresh', 'Place carrot and cucumber sticks alongside the crackers.'], ['Store separately', 'Keep leftover dry crisps away from dips and reseal the pack.']],
    serving: 'Pair with hummus and a few cherry tomatoes.',
    opened: 'Close the pouch promptly; transfer to an airtight box if its seal is damaged.',
    process: ['Shape & bake', 'The sample recipe shapes kodo flour dough into triangles with tomato powder and dried herbs.'],
    related: ['roasted-pearl-millet-chivda','foxtail-cashew-trailmix','foxtail-millet-cookies','bundle-snack-crate']
  },
  'barnyard-millet-muesli': {
    intro: 'Barnyard millet flakes with seeds and fruit for an easy breakfast bowl. Enjoy them crisp or let them soften to your liking.',
    taste: ['Toasty & fruity', 'Light flakes with seeds and chewy dried fruit.'],
    title: 'Build your morning bowl', time: 'No cooking needed', needs: 'Muesli, milk or yogurt, and optional fresh fruit.',
    steps: [['Start with the flakes', 'Pour your preferred portion into a breakfast bowl.'], ['Add milk or yogurt', 'Use a chilled or warm accompaniment to suit your preference.'], ['Choose your texture', 'Eat straight away for crunch, or allow the flakes to soften.'], ['Finish with fruit', 'Add freshly cut fruit immediately before eating.']],
    serving: 'Try banana and plain yogurt, with extra fruit served on the side.',
    opened: 'Keep the dry mix in a tightly sealed jar; only add milk to the portion you will eat.',
    process: ['Flake & blend', 'Barnyard millet flakes are blended with the seeds and fruit listed in the sample recipe.'],
    related: ['sprouted-multi-millet-dosa-mix','foxtail-cashew-trailmix','sprouted-ragi-flour','organic-whole-proso-millet']
  },
  'cold-milled-sorghum-flour': {
    intro: 'A versatile jowar flour with a mild, nutty character. Use it in recipes made for sorghum, from soft rotis to savoury pancakes.',
    taste: ['Mild & nutty', 'A pale, finely milled flour for everyday cooking.'],
    title: 'Bring jowar to the table', time: 'Cook thoroughly', needs: 'Sorghum flour, warm water, and a recipe suited to jowar.',
    steps: [['Choose a recipe', 'Start with jowar roti or a tested sorghum pancake recipe.'], ['Mix a small batch', 'Add water gradually and combine until the recipe texture is reached.'], ['Shape with care', 'Pat rotis between your palms or roll between sheets; jowar dough is delicate.'], ['Cook & enjoy', 'Cook on a heated tawa until done and serve warm.']],
    serving: 'Serve warm jowar rotis with dal and cooked seasonal vegetables.',
    opened: 'Keep flour in an airtight jar, away from the steam and heat of your hob.',
    process: ['Clean & mill', 'Selected sorghum is cleaned and milled into a fine flour in this illustrative process.'],
    related: ['sprouted-ragi-flour','organic-whole-proso-millet','sprouted-multi-millet-dosa-mix','bundle-family-pack']
  },
  'barnyard-millet-fettuccine': {
    intro: 'Wide barnyard millet pasta ribbons for simple weeknight sauces. A gentle toss brings the cooked ribbons and sauce together.',
    taste: ['Delicate & lightly nutty', 'Broad ribbons with a tender, satisfying bite.'],
    title: 'A simple pasta supper', time: '7–8 min cooking*', needs: 'Fettuccine, salted water, olive oil, and your chosen sauce.',
    steps: [['Boil plenty of water', 'Use a large pan so the pasta can move freely.'], ['Cook the ribbons', 'Stir gently and check at 7–8 minutes, following the final pack directions.'], ['Keep a little pasta water', 'Reserve a splash before draining to loosen your sauce.'], ['Toss gently', 'Combine with the sauce and serve immediately.']],
    serving: 'Try olive oil, sautéed mushrooms, and fresh herbs.',
    opened: 'Protect dry ribbons in a closed container, away from moisture and breakage.',
    process: ['Shape the ribbons', 'Barnyard millet pasta dough is formed into broad ribbons and dried in this sample process.'],
    related: ['air-dried-little-millet-noodles','bundle-pasta-feast','organic-whole-proso-millet','sprouted-multi-millet-dosa-mix']
  },
  'ragi-dark-chocolate-bites': {
    intro: 'Little ragi crunch centres coated in dark chocolate. A small, crisp treat for a coffee break or a finishing touch on dessert.',
    taste: ['Dark cocoa & crisp centres', 'A chocolate coating around a light, crunchy bite.'],
    title: 'A small chocolate moment', time: 'Ready to serve', needs: 'Ragi chocolate bites and an optional dessert or coffee.',
    steps: [['Keep the jar cool', 'Store away from heat before opening.'], ['Portion the bites', 'Use clean, dry hands or a spoon.'], ['Pair or sprinkle', 'Enjoy with coffee or scatter over a dessert immediately before serving.'], ['Close the lid', 'Reseal the jar and return it to a cool cupboard.']],
    serving: 'Serve a few bites alongside fresh berries or plain yogurt.',
    opened: 'Close the jar tightly and keep below 22°C, as suggested by the sample product data.',
    process: ['Puff & coat', 'The sample recipe coats puffed ragi centres in dark chocolate and lets the coating set.'],
    related: ['foxtail-millet-cookies','foxtail-cashew-trailmix','barnyard-millet-muesli','bundle-snack-crate']
  },
  'foxtail-cashew-trailmix': {
    intro: 'Roasted foxtail millet with cashews and seeds. Portion it for a snack break or use it to add texture to a breakfast bowl.',
    taste: ['Nutty & roasted', 'Crisp millet with the richer bite of cashews.'],
    title: 'Crunch for wherever you are', time: 'Ready to serve', needs: 'Trail mix and a dry snack container or yogurt bowl.',
    steps: [['Mix gently', 'Give the closed jar a gentle turn to distribute the ingredients.'], ['Portion a snack', 'Spoon a small amount into a clean, dry container.'], ['Try a topping', 'Add to yogurt or fruit just before eating.'], ['Close for freshness', 'Keep the remaining mix tightly sealed.']],
    serving: 'Bring a small portion with you, or add to a bowl of yogurt.',
    opened: 'Tighten the jar lid after serving to protect the roasted nuts from air and humidity.',
    process: ['Roast & combine', 'Foxtail millet, cashews, and seeds are combined for the sample roasted mix.'],
    related: ['roasted-pearl-millet-chivda','spiced-kodo-millet-crisps','barnyard-millet-muesli','bundle-snack-crate']
  },
  'sprouted-multi-millet-dosa-mix': {
    intro: 'A sprouted millet and urad dal blend for savoury dosas. Mix a fresh batter and cook a warm breakfast straight from the tawa.',
    taste: ['Savoury & lightly earthy', 'Thin dosas with a crisp edge and tender centre.'],
    title: 'From batter to golden dosa', time: '10 min resting*', needs: 'Dosa mix, water, a little oil, and a flat pan.',
    steps: [['Whisk the batter', 'Add water gradually to the mix, following the final pack ratio.'], ['Let it rest', 'The sample recipe allows a 10-minute rest. Adjust consistency before cooking.'], ['Spread on the pan', 'Pour onto a heated tawa and spread gently into a thin circle.'], ['Cook & serve', 'Cook until the dosa releases and is cooked through. Serve straight from the pan.']],
    serving: 'Pair with coconut chutney and a bowl of sambar.',
    opened: 'Keep the dry mix sealed. Make only the batter you need and handle prepared batter separately.',
    process: ['Blend the mix', 'Sprouted millet flours, urad dal, and fenugreek are combined in the sample dry blend.'],
    related: ['sprouted-ragi-flour','cold-milled-sorghum-flour','barnyard-millet-muesli','bundle-family-pack']
  },
  'organic-whole-proso-millet': {
    intro: 'Small, golden proso millet grains for warm bowls, pilafs, and porridges. Let the grain’s gentle flavour carry your favourite vegetables and spices.',
    taste: ['Mild & gently sweet', 'Small grains that become tender when cooked.'],
    title: 'A versatile grain bowl', time: 'Follow pack cooking time', needs: 'Proso millet, water, a saucepan, and your chosen vegetables.',
    steps: [['Rinse the grain', 'Rinse in a fine sieve and check the final pack for soaking directions.'], ['Simmer gently', 'Use the water ratio on the pack and cook covered until tender.'], ['Rest & fluff', 'Let the cooked grain rest briefly, then loosen gently with a fork.'], ['Build your bowl', 'Add cooked vegetables, herbs, and a dressing of your choice.']],
    serving: 'Try a warm vegetable pilaf or a soft breakfast porridge.',
    opened: 'Transfer dry grain to a sealed container and retain its batch and date information.',
    process: ['Clean & sort', 'Whole proso millet is cleaned and sorted before packing in this illustrative process.'],
    related: ['sprouted-ragi-flour','cold-milled-sorghum-flour','sprouted-multi-millet-dosa-mix','bundle-family-pack']
  },
  'bundle-starter-box': {
    intro: 'A first taste of the pantry: ragi flour, almond millet cookies, little millet noodles, and roasted chivda, with a recipe booklet and tote.',
    taste: ['A little of everything', 'Earthy flour, crisp cookies, tender noodles, and a savoury snack.'],
    title: 'Meet your millet essentials', time: 'Prepare each pack separately', needs: 'The included packs, their individual directions, and your usual kitchen essentials.',
    steps: [['Unpack & check', 'Read the ingredients, allergens, and dates on every individual pack.'], ['Start with breakfast', 'Use the ragi flour in a cooked porridge or a tested ragi recipe.'], ['Plan a noodle bowl', 'Cook the little millet noodles with vegetables of your choice.'], ['Keep snacks handy', 'Serve the cookies and chivda separately, resealing each pack after use.']],
    serving: 'Try one new millet meal at a time with the included recipe booklet.',
    opened: 'Keep each component in its own sealed pack; do not combine different foods in one jar.',
    process: ['Curate the sampler', 'The flour, cookies, noodles, and chivda are brought together with the booklet and tote.'],
    related: ['sprouted-ragi-flour','foxtail-millet-cookies','air-dried-little-millet-noodles','roasted-pearl-millet-chivda']
  },
  'bundle-family-pack': {
    intro: 'A family pantry selection of ragi flour, sorghum flour, proso millet, dosa mix, and two savoury snacks for everyday variety.',
    taste: ['Everyday pantry variety', 'Flours and whole grain for meals, with crunchy snacks on the side.'],
    title: 'Plan a week of variety', time: 'Follow each pack’s directions', needs: 'The included staples and snacks, plus vegetables and accompaniments.',
    steps: [['Organise the pantry', 'Store each component separately with its label visible.'], ['Plan your breakfasts', 'Alternate a cooked ragi breakfast with freshly made millet dosas.'], ['Cook your staples', 'Use jowar for rotis and proso grain for a pilaf or warm bowl.'], ['Portion the snacks', 'Serve kodo crisps and cashew trail mix in small bowls as needed.']],
    serving: 'Keep a simple meal plan so each opened pack is used in date order.',
    opened: 'Decant flours and grains separately, and reseal both snack packs promptly.',
    process: ['Assemble the pantry', 'Four pantry staples and two snacks are selected for this example family assortment.'],
    related: ['sprouted-ragi-flour','cold-milled-sorghum-flour','organic-whole-proso-millet','sprouted-multi-millet-dosa-mix']
  },
  'bundle-snack-crate': {
    intro: 'Six different ways to take a break: millet cookies, chocolate bites, chivda, kodo crisps, cashew trail mix, and breakfast muesli.',
    taste: ['Sweet meets savoury', 'A mix of cookies, chocolate crunch, roasted snacks, and flakes.'],
    title: 'Create a tasting table', time: 'Ready-to-serve assortment', needs: 'The six included packs and separate small serving bowls.',
    steps: [['Read every label', 'Check individual allergens before sharing the assortment.'], ['Separate sweet & savoury', 'Arrange each snack in its own bowl to preserve its flavour.'], ['Add accompaniments', 'Offer tea with the cookies and a dip beside the kodo crisps.'], ['Reseal each pack', 'Keep chocolate cool and the dry snacks protected from moisture.']],
    serving: 'Save the muesli for breakfast and enjoy the other snacks across several breaks.',
    opened: 'Store all six foods separately. Keep the chocolate jar cool and dry.',
    process: ['Bring the snacks together', 'Six individually prepared products are assembled into the sample snacking crate.'],
    related: ['foxtail-millet-cookies','ragi-dark-chocolate-bites','roasted-pearl-millet-chivda','spiced-kodo-millet-crisps']
  },
  'bundle-pasta-feast': {
    intro: 'Two packs each of barnyard fettuccine and little millet noodles, with a garlic-herb finishing oil for a relaxed weekend meal.',
    taste: ['Two styles of supper', 'Wide pasta ribbons and fine noodles with a fragrant finishing oil.'],
    title: 'Make a weekend feast', time: 'Cook each pasta separately', needs: 'The included pasta, noodles, finishing oil, water, and your preferred sauce.',
    steps: [['Choose tonight’s pack', 'Prepare the fettuccine or noodles rather than mixing their cooking times.'], ['Cook to the pack', 'Use plenty of boiling water and check the individual directions.'], ['Dress while warm', 'Drain gently and add the finishing oil or a sauce of your choice.'], ['Save the next meal', 'Keep remaining dry packs sealed for another supper.']],
    serving: 'Try mushroom fettuccine one evening and a vegetable noodle bowl the next.',
    opened: 'Keep the oil tightly closed and store dry pasta in separate sealed containers.',
    process: ['Pair & pack', 'The two pasta varieties are paired with a finishing oil and recipe card in this example kit.'],
    related: ['barnyard-millet-fettuccine','air-dried-little-millet-noodles','bundle-starter-box','organic-whole-proso-millet']
  }
};
