// ============================================================
// DMart Products Database - 10,000+ Procedurally Generated Products
// ============================================================
(function() {
  'use strict';

  // ----------------------------------------------------------
  // Department definitions
  // ----------------------------------------------------------
  var DEPARTMENTS = [
    { id: 'grocery', name: 'Grocery & Staples', emoji: '🛒', color: '#ff6b6b' },
    { id: 'fruits', name: 'Fruits & Vegetables', emoji: '🥦', color: '#00d2a0' },
    { id: 'dairy', name: 'Dairy & Eggs', emoji: '🥛', color: '#4da6ff' },
    { id: 'beverages', name: 'Beverages', emoji: '🥤', color: '#ffb347' },
    { id: 'snacks', name: 'Snacks & Branded Foods', emoji: '🍪', color: '#ff6b9d' },
    { id: 'personal', name: 'Personal Care', emoji: '🧴', color: '#a78bfa' },
    { id: 'home', name: 'Home & Kitchen', emoji: '🏠', color: '#34d399' },
    { id: 'baby', name: 'Baby Care', emoji: '👶', color: '#f9a8d4' },
    { id: 'frozen', name: 'Frozen Foods', emoji: '🧊', color: '#60a5fa' },
    { id: 'meat', name: 'Meat & Seafood', emoji: '🥩', color: '#ef4444' },
    { id: 'bakery', name: 'Bakery', emoji: '🍞', color: '#d97706' },
    { id: 'health', name: 'Health & Wellness', emoji: '💊', color: '#10b981' },
    { id: 'pets', name: 'Pet Supplies', emoji: '🐾', color: '#8b5cf6' },
    { id: 'electronics', name: 'Electronics & Appliances', emoji: '📱', color: '#3b82f6' }
  ];

  // ----------------------------------------------------------
  // Seeded random generator for consistent data
  // ----------------------------------------------------------
  function seededRandom(seed) {
    var s = seed;
    return function() {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  // ----------------------------------------------------------
  // Product templates per department
  // ----------------------------------------------------------
  var TEMPLATES = {};

  // ---- GROCERY & STAPLES ----
  TEMPLATES['grocery'] = [
    { baseName: 'Basmati Rice', brands: ['India Gate', 'Daawat', 'Fortune', 'Kohinoor', 'Tata Sampann', 'Lal Qilla', 'Dawat Rozana', 'Patanjali'], variants: ['1 kg', '5 kg', '10 kg', '25 kg'], priceRange: [85, 180], emoji: '🍚', tags: ['rice', 'basmati', 'grain', 'staple'] },
    { baseName: 'Wheat Flour (Atta)', brands: ['Aashirvaad', 'Pillsbury', 'Fortune', 'Patanjali', 'Rajdhani', 'Nature Fresh', 'Shakti Bhog', 'Annapurna'], variants: ['1 kg', '5 kg', '10 kg'], priceRange: [40, 75], emoji: '🌾', tags: ['atta', 'wheat', 'flour', 'roti'] },
    { baseName: 'Sugar', brands: ['Trust', 'Uttam', 'Madhur', 'Dhampure', 'Patanjali', 'Mawana', 'Dhampur Green', 'Reliance'], variants: ['500 g', '1 kg', '5 kg'], priceRange: [35, 55], emoji: '🍬', tags: ['sugar', 'sweetener', 'white sugar'] },
    { baseName: 'Toor Dal', brands: ['Tata Sampann', 'Fortune', 'Patanjali', 'Rajdhani', 'BB Popular', 'Reliance', 'Organic Tattva', 'Pro Nature'], variants: ['500 g', '1 kg', '2 kg'], priceRange: [65, 140], emoji: '🫘', tags: ['dal', 'toor', 'lentil', 'pulse', 'arhar'] },
    { baseName: 'Chana Dal', brands: ['Tata Sampann', 'Fortune', 'Patanjali', 'Rajdhani', 'BB Popular', 'Reliance', 'Organic Tattva', 'Pro Nature'], variants: ['500 g', '1 kg', '2 kg'], priceRange: [55, 110], emoji: '🫘', tags: ['dal', 'chana', 'gram', 'lentil'] },
    { baseName: 'Moong Dal', brands: ['Tata Sampann', 'Fortune', 'Patanjali', 'Rajdhani', 'BB Popular', 'Reliance', 'Organic Tattva', 'Pro Nature'], variants: ['500 g', '1 kg', '2 kg'], priceRange: [70, 150], emoji: '🫘', tags: ['dal', 'moong', 'green gram', 'lentil'] },
    { baseName: 'Urad Dal', brands: ['Tata Sampann', 'Fortune', 'Patanjali', 'Rajdhani', 'BB Popular', 'Reliance'], variants: ['500 g', '1 kg', '2 kg'], priceRange: [80, 160], emoji: '🫘', tags: ['dal', 'urad', 'black gram', 'lentil'] },
    { baseName: 'Masoor Dal', brands: ['Tata Sampann', 'Fortune', 'Patanjali', 'Rajdhani', 'BB Popular', 'Reliance'], variants: ['500 g', '1 kg', '2 kg'], priceRange: [60, 120], emoji: '🫘', tags: ['dal', 'masoor', 'red lentil', 'lentil'] },
    { baseName: 'Mustard Oil', brands: ['Fortune', 'Patanjali', 'Dhara', 'Engine', 'Nature Fresh', 'Emami'], variants: ['500 ml', '1 L', '5 L'], priceRange: [80, 180], emoji: '🫗', tags: ['oil', 'mustard', 'cooking oil'] },
    { baseName: 'Sunflower Oil', brands: ['Fortune', 'Saffola', 'Sundrop', 'Freedom', 'Nature Fresh', 'Gemini'], variants: ['500 ml', '1 L', '5 L'], priceRange: [75, 170], emoji: '🌻', tags: ['oil', 'sunflower', 'cooking oil'] },
    { baseName: 'Refined Oil', brands: ['Fortune', 'Saffola Gold', 'Sundrop', 'Dhara', 'Nature Fresh', 'Freedom'], variants: ['1 L', '2 L', '5 L'], priceRange: [110, 200], emoji: '🫗', tags: ['oil', 'refined', 'cooking oil', 'soybean'] },
    { baseName: 'Olive Oil', brands: ['Figaro', 'Borges', 'Del Monte', 'Leonardo', 'Bertolli', 'Disano'], variants: ['250 ml', '500 ml', '1 L'], priceRange: [220, 650], emoji: '🫒', tags: ['oil', 'olive', 'extra virgin', 'healthy'] },
    { baseName: 'Coconut Oil', brands: ['Parachute', 'KLF Nirmal', 'Coco Soul', 'Patanjali', 'Maxcare', 'Fortune'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [60, 200], emoji: '🥥', tags: ['oil', 'coconut', 'cooking', 'hair'] },
    { baseName: 'Ghee', brands: ['Amul', 'Patanjali', 'Mother Dairy', 'Gowardhan', 'Nandini', 'Milma'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [120, 550], emoji: '🧈', tags: ['ghee', 'clarified butter', 'desi ghee'] },
    { baseName: 'Salt', brands: ['Tata', 'Catch', 'Patanjali', 'Aashirvaad', 'Sambhar', 'Saffola'], variants: ['1 kg', '2 kg'], priceRange: [18, 35], emoji: '🧂', tags: ['salt', 'iodized', 'table salt', 'namak'] },
    { baseName: 'Turmeric Powder', brands: ['MDH', 'Everest', 'Catch', 'Tata Sampann', 'Patanjali', 'Eastern', 'Aachi', 'Pushp'], variants: ['100 g', '200 g', '500 g'], priceRange: [30, 95], emoji: '🟡', tags: ['turmeric', 'haldi', 'spice', 'masala'] },
    { baseName: 'Red Chili Powder', brands: ['MDH', 'Everest', 'Catch', 'Tata Sampann', 'Patanjali', 'Eastern', 'Aachi', 'Pushp'], variants: ['100 g', '200 g', '500 g'], priceRange: [35, 110], emoji: '🌶️', tags: ['chili', 'mirchi', 'spice', 'masala', 'red chili'] },
    { baseName: 'Coriander Powder', brands: ['MDH', 'Everest', 'Catch', 'Tata Sampann', 'Patanjali', 'Eastern', 'Aachi', 'Pushp'], variants: ['100 g', '200 g', '500 g'], priceRange: [28, 85], emoji: '🟢', tags: ['coriander', 'dhania', 'spice', 'masala'] },
    { baseName: 'Cumin Seeds', brands: ['MDH', 'Everest', 'Catch', 'Tata Sampann', 'Patanjali', 'Eastern'], variants: ['50 g', '100 g', '200 g', '500 g'], priceRange: [35, 140], emoji: '🫘', tags: ['cumin', 'jeera', 'spice', 'seeds'] },
    { baseName: 'Black Pepper', brands: ['MDH', 'Everest', 'Catch', 'Tata Sampann', 'Patanjali', 'Eastern'], variants: ['50 g', '100 g', '200 g'], priceRange: [45, 180], emoji: '⚫', tags: ['pepper', 'kali mirch', 'spice'] },
    { baseName: 'Garam Masala', brands: ['MDH', 'Everest', 'Catch', 'Tata Sampann', 'Patanjali', 'Eastern', 'Aachi', 'Pushp'], variants: ['50 g', '100 g', '200 g', '500 g'], priceRange: [40, 150], emoji: '🫙', tags: ['garam masala', 'spice', 'masala mix'] },
    { baseName: 'Tea', brands: ['Tata Tea', 'Red Label', 'Wagh Bakri', 'Taj Mahal', 'Lipton', 'Tetley', 'Society', 'Patanjali'], variants: ['100 g', '250 g', '500 g', '1 kg'], priceRange: [40, 280], emoji: '🍵', tags: ['tea', 'chai', 'black tea', 'leaves'] },
    { baseName: 'Coffee', brands: ['Nescafe', 'Bru', 'Davidoff', 'Continental', 'Rage', 'Levista', 'Tata Coffee', 'Cothas'], variants: ['50 g', '100 g', '200 g'], priceRange: [90, 350], emoji: '☕', tags: ['coffee', 'instant coffee', 'filter coffee'] },
    { baseName: 'Jaggery', brands: ['Patanjali', 'Miltop', '24 Mantra', 'Organic Tattva', 'BB Popular', 'Trust'], variants: ['500 g', '1 kg'], priceRange: [45, 120], emoji: '🟤', tags: ['jaggery', 'gur', 'sweetener', 'natural'] },
    { baseName: 'Poha', brands: ['Patanjali', 'Rajdhani', 'BB Popular', 'Tata Sampann', 'Reliance', 'Fortune'], variants: ['250 g', '500 g', '1 kg'], priceRange: [25, 60], emoji: '🍚', tags: ['poha', 'flattened rice', 'breakfast'] },
    { baseName: 'Rava/Sooji', brands: ['Patanjali', 'Rajdhani', 'BB Popular', 'Tata Sampann', 'Aashirvaad', 'Reliance'], variants: ['500 g', '1 kg'], priceRange: [30, 55], emoji: '🌾', tags: ['rava', 'sooji', 'semolina', 'suji'] },
    { baseName: 'Maida', brands: ['Pillsbury', 'Rajdhani', 'Fortune', 'Patanjali', 'Aashirvaad', 'Reliance'], variants: ['500 g', '1 kg'], priceRange: [28, 48], emoji: '🌾', tags: ['maida', 'refined flour', 'all purpose flour'] },
    { baseName: 'Besan', brands: ['Rajdhani', 'Fortune', 'Patanjali', 'Tata Sampann', 'BB Popular', 'Reliance'], variants: ['500 g', '1 kg', '2 kg'], priceRange: [45, 95], emoji: '🟡', tags: ['besan', 'gram flour', 'chickpea flour'] },
    { baseName: 'Sago', brands: ['Rajdhani', 'Patanjali', 'BB Popular', 'Reliance', 'Trust', 'Swad'], variants: ['200 g', '500 g', '1 kg'], priceRange: [30, 75], emoji: '⚪', tags: ['sago', 'sabudana', 'tapioca'] },
    { baseName: 'Corn Flour', brands: ['Brown & Polson', 'Rajdhani', 'Fortune', 'Patanjali', 'BB Popular', 'Reliance'], variants: ['100 g', '200 g', '500 g'], priceRange: [20, 60], emoji: '🌽', tags: ['corn flour', 'cornstarch', 'thickener'] },
    { baseName: 'Oats', brands: ['Quaker', 'Saffola', 'Kelloggs', 'Bagrry\'s', 'Patanjali', 'True Elements'], variants: ['200 g', '500 g', '1 kg'], priceRange: [50, 180], emoji: '🥣', tags: ['oats', 'breakfast', 'healthy', 'fiber'] },
    { baseName: 'Muesli', brands: ['Kelloggs', 'Bagrry\'s', 'Saffola', 'True Elements', 'Yoga Bar', 'MuscleBlaze'], variants: ['400 g', '700 g', '1 kg'], priceRange: [180, 450], emoji: '🥣', tags: ['muesli', 'cereal', 'breakfast', 'healthy'] },
    { baseName: 'Honey', brands: ['Dabur', 'Patanjali', 'Apis', 'Zandu', 'Hitkari', 'Saffola'], variants: ['250 g', '500 g', '1 kg'], priceRange: [120, 450], emoji: '🍯', tags: ['honey', 'natural', 'sweetener'] },
    { baseName: 'Jam', brands: ['Kissan', 'Mapro', 'Patanjali', 'IXL', 'Tops', 'Cremica'], variants: ['200 g', '500 g', '700 g'], priceRange: [65, 180], emoji: '🍓', tags: ['jam', 'fruit preserve', 'spread', 'mixed fruit'] },
    { baseName: 'Peanut Butter', brands: ['Pintola', 'MyFitness', 'Sundrop', 'Dr. Oetker', 'Happilo', 'Yoga Bar'], variants: ['350 g', '500 g', '1 kg'], priceRange: [150, 450], emoji: '🥜', tags: ['peanut butter', 'protein', 'spread', 'butter'] },
    { baseName: 'Vinegar', brands: ['Dabur', 'Del Monte', 'American Garden', 'Borges', 'Patanjali', 'Nourish'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [35, 140], emoji: '🫗', tags: ['vinegar', 'white vinegar', 'condiment'] },
    { baseName: 'Soy Sauce', brands: ['Ching\'s', 'Tops', 'Del Monte', 'Kikkoman', 'Patanjali', 'Weikfield'], variants: ['200 ml', '500 ml', '750 ml'], priceRange: [40, 170], emoji: '🫗', tags: ['soy sauce', 'chinese', 'condiment', 'sauce'] },
    { baseName: 'Tomato Ketchup', brands: ['Kissan', 'Maggi', 'Del Monte', 'Heinz', 'Cremica', 'Tops'], variants: ['200 g', '500 g', '1 kg'], priceRange: [45, 170], emoji: '🍅', tags: ['ketchup', 'tomato', 'sauce', 'condiment'] },
    { baseName: 'Noodles', brands: ['Maggi', 'Yippee', 'Top Ramen', 'Ching\'s', 'Knorr', 'Patanjali', 'Wai Wai', 'Smith & Jones'], variants: ['Single Pack', '4 Pack', '12 Pack'], priceRange: [14, 48], emoji: '🍜', tags: ['noodles', 'instant noodles', 'maggi'] },
    { baseName: 'Pasta', brands: ['Del Monte', 'Borges', 'Disano', 'Barilla', 'Weikfield', 'Bambino'], variants: ['250 g', '500 g', '1 kg'], priceRange: [50, 180], emoji: '🍝', tags: ['pasta', 'penne', 'macaroni', 'spaghetti'] },
    { baseName: 'Vermicelli', brands: ['MTR', 'Bambino', 'Patanjali', 'Aashirvaad', 'Rajdhani', 'Reliance'], variants: ['200 g', '400 g', '900 g'], priceRange: [22, 65], emoji: '🍜', tags: ['vermicelli', 'seviyan', 'semiya'] },
    { baseName: 'Papad', brands: ['Lijjat', 'Bikaner', 'Haldiram\'s', 'Ganesh', 'Patanjali', 'BB Popular'], variants: ['100 g', '200 g', '400 g'], priceRange: [30, 90], emoji: '🫓', tags: ['papad', 'poppadom', 'appetizer'] },
    { baseName: 'Pickle', brands: ['Mother\'s Recipe', 'Priya', 'Tops', 'Patanjali', 'Bedekar', 'Kissan', 'Nilon\'s', 'Ruchi'], variants: ['200 g', '400 g', '1 kg'], priceRange: [55, 180], emoji: '🫙', tags: ['pickle', 'achar', 'mango pickle', 'mixed pickle'] },
    { baseName: 'Dry Fruits Mix', brands: ['Happilo', 'Nutraj', 'Miltop', 'Rostaa', 'True Elements', 'Farmley'], variants: ['200 g', '400 g', '1 kg'], priceRange: [250, 900], emoji: '🥜', tags: ['dry fruits', 'mixed nuts', 'trail mix'] },
    { baseName: 'Almonds', brands: ['Happilo', 'Nutraj', 'Miltop', 'Rostaa', 'Wonderland', 'Farmley'], variants: ['100 g', '250 g', '500 g', '1 kg'], priceRange: [150, 650], emoji: '🌰', tags: ['almonds', 'badam', 'nuts', 'dry fruits'] },
    { baseName: 'Cashews', brands: ['Happilo', 'Nutraj', 'Miltop', 'Rostaa', 'Wonderland', 'Farmley'], variants: ['100 g', '250 g', '500 g', '1 kg'], priceRange: [160, 750], emoji: '🥜', tags: ['cashews', 'kaju', 'nuts', 'dry fruits'] },
    { baseName: 'Raisins', brands: ['Happilo', 'Nutraj', 'Miltop', 'Rostaa', 'True Elements', 'Farmley'], variants: ['100 g', '250 g', '500 g'], priceRange: [50, 250], emoji: '🍇', tags: ['raisins', 'kishmish', 'dry fruits'] },
    { baseName: 'Walnuts', brands: ['Happilo', 'Nutraj', 'Miltop', 'Rostaa', 'Kashmir Online', 'Farmley'], variants: ['100 g', '250 g', '500 g'], priceRange: [180, 600], emoji: '🌰', tags: ['walnuts', 'akhrot', 'nuts', 'dry fruits'] },
    { baseName: 'Dates', brands: ['Happilo', 'Nutraj', 'Miltop', 'Rostaa', 'Lion', 'Markstor'], variants: ['200 g', '400 g', '1 kg'], priceRange: [120, 450], emoji: '🌴', tags: ['dates', 'khajoor', 'dry fruits', 'sweet'] },
    { baseName: 'Coconut Powder', brands: ['Maggi', 'Eastern', 'Patanjali', 'Aachi', 'KLF', 'Everest'], variants: ['50 g', '100 g', '200 g'], priceRange: [25, 85], emoji: '🥥', tags: ['coconut', 'desiccated coconut', 'powder'] }
  ];

  // ---- FRUITS & VEGETABLES ----
  TEMPLATES['fruits'] = [
    { baseName: 'Bananas', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Freshtohome', 'BigBasket Fresh', 'Reliance Fresh'], variants: ['6 pcs', '12 pcs', '1 dozen'], priceRange: [30, 60], emoji: '🍌', tags: ['banana', 'fruit', 'fresh'] },
    { baseName: 'Apples', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Shimla', 'Kashmir', 'Reliance Fresh'], variants: ['500 g', '1 kg', '2 kg'], priceRange: [80, 250], emoji: '🍎', tags: ['apple', 'fruit', 'fresh', 'shimla'] },
    { baseName: 'Oranges', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Nagpur', 'Kinnow', 'Reliance Fresh'], variants: ['500 g', '1 kg', '2 kg'], priceRange: [50, 140], emoji: '🍊', tags: ['orange', 'fruit', 'citrus', 'fresh'] },
    { baseName: 'Mangoes', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Alphonso', 'Devgad', 'Reliance Fresh'], variants: ['500 g', '1 kg', '2 kg', 'Box 5 kg'], priceRange: [100, 600], emoji: '🥭', tags: ['mango', 'fruit', 'seasonal', 'aam'] },
    { baseName: 'Grapes', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Nashik', 'Imported', 'Reliance Fresh'], variants: ['250 g', '500 g', '1 kg'], priceRange: [45, 180], emoji: '🍇', tags: ['grape', 'fruit', 'green', 'black'] },
    { baseName: 'Pomegranate', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['250 g', '500 g', '1 kg'], priceRange: [60, 220], emoji: '🍎', tags: ['pomegranate', 'fruit', 'anaar', 'fresh'] },
    { baseName: 'Watermelon', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh'], variants: ['1 pc (Small)', '1 pc (Medium)', '1 pc (Large)'], priceRange: [30, 80], emoji: '🍉', tags: ['watermelon', 'fruit', 'summer', 'tarbooz'] },
    { baseName: 'Papaya', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['500 g', '1 kg', '1 pc'], priceRange: [25, 60], emoji: '🍈', tags: ['papaya', 'fruit', 'fresh'] },
    { baseName: 'Pineapple', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh'], variants: ['1 pc (Small)', '1 pc (Medium)', '1 pc (Large)'], priceRange: [35, 90], emoji: '🍍', tags: ['pineapple', 'fruit', 'fresh', 'tropical'] },
    { baseName: 'Guava', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['250 g', '500 g', '1 kg'], priceRange: [30, 80], emoji: '🍐', tags: ['guava', 'fruit', 'amrud', 'fresh'] },
    { baseName: 'Strawberries', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['100 g', '200 g', '500 g'], priceRange: [60, 200], emoji: '🍓', tags: ['strawberry', 'fruit', 'berry', 'fresh'] },
    { baseName: 'Kiwi', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Zespri', 'Imported'], variants: ['3 pcs', '6 pcs', '1 kg'], priceRange: [80, 250], emoji: '🥝', tags: ['kiwi', 'fruit', 'imported', 'fresh'] },
    { baseName: 'Tomatoes', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh', 'Local Farm'], variants: ['250 g', '500 g', '1 kg', '2 kg'], priceRange: [15, 60], emoji: '🍅', tags: ['tomato', 'vegetable', 'fresh'] },
    { baseName: 'Potatoes', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh', 'Local Farm'], variants: ['500 g', '1 kg', '2 kg', '5 kg'], priceRange: [15, 50], emoji: '🥔', tags: ['potato', 'vegetable', 'aloo', 'fresh'] },
    { baseName: 'Onions', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh', 'Local Farm'], variants: ['500 g', '1 kg', '2 kg', '5 kg'], priceRange: [20, 60], emoji: '🧅', tags: ['onion', 'vegetable', 'pyaaz', 'fresh'] },
    { baseName: 'Garlic', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['100 g', '250 g', '500 g'], priceRange: [20, 80], emoji: '🧄', tags: ['garlic', 'lehsun', 'spice', 'vegetable'] },
    { baseName: 'Ginger', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['100 g', '250 g', '500 g'], priceRange: [15, 60], emoji: '🫚', tags: ['ginger', 'adrak', 'spice', 'vegetable'] },
    { baseName: 'Green Chili', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['100 g', '250 g', '500 g'], priceRange: [10, 40], emoji: '🌶️', tags: ['green chili', 'hari mirch', 'spicy', 'vegetable'] },
    { baseName: 'Capsicum', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['250 g', '500 g', '1 kg'], priceRange: [30, 120], emoji: '🫑', tags: ['capsicum', 'bell pepper', 'shimla mirch'] },
    { baseName: 'Cucumber', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['250 g', '500 g', '1 kg'], priceRange: [15, 40], emoji: '🥒', tags: ['cucumber', 'kheera', 'salad', 'vegetable'] },
    { baseName: 'Carrot', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh', 'Local Farm'], variants: ['250 g', '500 g', '1 kg'], priceRange: [20, 60], emoji: '🥕', tags: ['carrot', 'gajar', 'vegetable', 'root'] },
    { baseName: 'Beans', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['250 g', '500 g', '1 kg'], priceRange: [25, 80], emoji: '🫘', tags: ['beans', 'french beans', 'vegetable'] },
    { baseName: 'Cauliflower', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'Local Farm'], variants: ['1 pc (Small)', '1 pc (Medium)', '1 pc (Large)'], priceRange: [20, 50], emoji: '🥦', tags: ['cauliflower', 'gobi', 'vegetable'] },
    { baseName: 'Cabbage', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'Local Farm'], variants: ['1 pc (Small)', '1 pc (Medium)', '1 pc (Large)'], priceRange: [15, 40], emoji: '🥬', tags: ['cabbage', 'patta gobi', 'vegetable'] },
    { baseName: 'Spinach', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['100 g', '250 g', '500 g'], priceRange: [15, 40], emoji: '🥬', tags: ['spinach', 'palak', 'leafy green', 'vegetable'] },
    { baseName: 'Broccoli', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['250 g', '500 g', '1 kg'], priceRange: [40, 120], emoji: '🥦', tags: ['broccoli', 'vegetable', 'green'] },
    { baseName: 'Mushrooms', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['200 g', '400 g', '500 g'], priceRange: [30, 100], emoji: '🍄', tags: ['mushroom', 'button mushroom', 'vegetable'] },
    { baseName: 'Sweet Potato', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'Local Farm'], variants: ['250 g', '500 g', '1 kg'], priceRange: [25, 60], emoji: '🍠', tags: ['sweet potato', 'shakarkandi', 'root', 'vegetable'] },
    { baseName: 'Lettuce', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['100 g', '200 g', '1 pc'], priceRange: [30, 80], emoji: '🥬', tags: ['lettuce', 'salad', 'leafy green'] },
    { baseName: 'Corn', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'Local Farm'], variants: ['2 pcs', '4 pcs', '1 kg'], priceRange: [20, 60], emoji: '🌽', tags: ['corn', 'maize', 'bhutta', 'sweet corn'] },
    { baseName: 'Peas', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'BigBasket Fresh'], variants: ['250 g', '500 g', '1 kg'], priceRange: [30, 80], emoji: '🫛', tags: ['peas', 'matar', 'green peas', 'vegetable'] },
    { baseName: 'Lemon', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'Local Farm'], variants: ['4 pcs', '8 pcs', '250 g', '500 g'], priceRange: [10, 40], emoji: '🍋', tags: ['lemon', 'nimbu', 'citrus', 'fresh'] },
    { baseName: 'Beetroot', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'Local Farm'], variants: ['250 g', '500 g', '1 kg'], priceRange: [20, 55], emoji: '🟣', tags: ['beetroot', 'chukandar', 'root', 'vegetable'] },
    { baseName: 'Radish', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'Local Farm'], variants: ['250 g', '500 g', '1 kg'], priceRange: [15, 35], emoji: '🟠', tags: ['radish', 'mooli', 'root', 'vegetable'] },
    { baseName: 'Lady Finger', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'Local Farm'], variants: ['250 g', '500 g', '1 kg'], priceRange: [20, 60], emoji: '🟢', tags: ['ladyfinger', 'bhindi', 'okra', 'vegetable'] },
    { baseName: 'Brinjal', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'Local Farm'], variants: ['250 g', '500 g', '1 kg'], priceRange: [15, 45], emoji: '🍆', tags: ['brinjal', 'baingan', 'eggplant', 'vegetable'] },
    { baseName: 'Bottle Gourd', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'Local Farm'], variants: ['1 pc (Small)', '1 pc (Medium)', '1 pc (Large)'], priceRange: [15, 40], emoji: '🟢', tags: ['bottle gourd', 'lauki', 'ghiya', 'vegetable'] },
    { baseName: 'Ridge Gourd', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'Local Farm'], variants: ['250 g', '500 g', '1 kg'], priceRange: [20, 50], emoji: '🟢', tags: ['ridge gourd', 'tori', 'turai', 'vegetable'] },
    { baseName: 'Drumstick', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'Local Farm'], variants: ['250 g', '500 g', '1 kg'], priceRange: [30, 80], emoji: '🟢', tags: ['drumstick', 'sahjan', 'moringa', 'vegetable'] },
    { baseName: 'Coriander Leaves', brands: ['Fresh Farm', 'Organic India', 'Nature\'s Basket', 'Reliance Fresh', 'Local Farm'], variants: ['50 g', '100 g', '250 g'], priceRange: [5, 20], emoji: '🌿', tags: ['coriander', 'dhania patti', 'herb', 'garnish'] }
  ];

  // ---- DAIRY & EGGS ----
  TEMPLATES['dairy'] = [
    { baseName: 'Full Cream Milk', brands: ['Amul', 'Mother Dairy', 'Nestle', 'Britannia', 'Nandini', 'Verka', 'Parag', 'Gokul'], variants: ['500 ml', '1 L', '2 L'], priceRange: [28, 60], emoji: '🥛', tags: ['milk', 'full cream', 'dairy', 'fresh'] },
    { baseName: 'Toned Milk', brands: ['Amul', 'Mother Dairy', 'Nestle', 'Britannia', 'Nandini', 'Verka', 'Parag', 'Gokul'], variants: ['500 ml', '1 L', '2 L'], priceRange: [24, 52], emoji: '🥛', tags: ['milk', 'toned', 'dairy', 'fresh'] },
    { baseName: 'Skimmed Milk', brands: ['Amul', 'Mother Dairy', 'Nestle', 'Britannia', 'Nandini', 'Parag'], variants: ['500 ml', '1 L', '2 L'], priceRange: [22, 48], emoji: '🥛', tags: ['milk', 'skimmed', 'low fat', 'dairy'] },
    { baseName: 'Butter', brands: ['Amul', 'Mother Dairy', 'Britannia', 'Nandini', 'Gowardhan', 'Patanjali'], variants: ['100 g', '200 g', '500 g'], priceRange: [45, 250], emoji: '🧈', tags: ['butter', 'dairy', 'spread'] },
    { baseName: 'Cheese Slice', brands: ['Amul', 'Mother Dairy', 'Britannia', 'Go Cheese', 'Dlecta', 'Milky Mist'], variants: ['5 Slices', '10 Slices', '20 Slices'], priceRange: [60, 200], emoji: '🧀', tags: ['cheese', 'slice', 'processed', 'dairy'] },
    { baseName: 'Cheese Block', brands: ['Amul', 'Mother Dairy', 'Britannia', 'Go Cheese', 'Dlecta', 'Milky Mist'], variants: ['200 g', '400 g', '1 kg'], priceRange: [90, 400], emoji: '🧀', tags: ['cheese', 'block', 'dairy'] },
    { baseName: 'Paneer', brands: ['Amul', 'Mother Dairy', 'Britannia', 'Nandini', 'Gowardhan', 'Milky Mist'], variants: ['200 g', '400 g', '1 kg'], priceRange: [70, 380], emoji: '🧀', tags: ['paneer', 'cottage cheese', 'dairy'] },
    { baseName: 'Curd/Yogurt', brands: ['Amul', 'Mother Dairy', 'Nestle', 'Britannia', 'Epigamia', 'Milky Mist'], variants: ['200 g', '400 g', '1 kg'], priceRange: [25, 75], emoji: '🥛', tags: ['curd', 'yogurt', 'dahi', 'dairy'] },
    { baseName: 'Flavored Yogurt', brands: ['Epigamia', 'Nestle', 'Mother Dairy', 'Amul', 'Danone', 'Milky Mist'], variants: ['90 g', '180 g', '400 g'], priceRange: [30, 120], emoji: '🥛', tags: ['yogurt', 'flavored', 'strawberry', 'dairy'] },
    { baseName: 'Cream', brands: ['Amul', 'Mother Dairy', 'Britannia', 'Nestle', 'Milky Mist', 'Dlecta'], variants: ['100 ml', '200 ml', '500 ml'], priceRange: [30, 140], emoji: '🥛', tags: ['cream', 'fresh cream', 'dairy'] },
    { baseName: 'Buttermilk', brands: ['Amul', 'Mother Dairy', 'Nestle', 'Nandini', 'Verka', 'Milky Mist'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [15, 45], emoji: '🥛', tags: ['buttermilk', 'chaas', 'dairy', 'drink'] },
    { baseName: 'Condensed Milk', brands: ['Milkmaid', 'Amul', 'Mother Dairy', 'Britannia', 'Nestle', 'Dlecta'], variants: ['200 g', '400 g', '1 kg'], priceRange: [55, 250], emoji: '🥛', tags: ['condensed milk', 'sweetened', 'dairy'] },
    { baseName: 'Milk Powder', brands: ['Amul', 'Nestle', 'Nandini', 'Anik', 'Britannia', 'Patanjali'], variants: ['200 g', '500 g', '1 kg'], priceRange: [100, 450], emoji: '🥛', tags: ['milk powder', 'dairy', 'dried milk'] },
    { baseName: 'Eggs (White)', brands: ['Amul', 'Mother Dairy', 'Fresho', 'SKM', 'Suguna', 'IB Group'], variants: ['6 pcs', '12 pcs', '30 pcs'], priceRange: [35, 195], emoji: '🥚', tags: ['eggs', 'white eggs', 'protein', 'poultry'] },
    { baseName: 'Eggs (Brown)', brands: ['Amul', 'Mother Dairy', 'Fresho', 'Kegg Farms', 'Suguna', 'IB Group'], variants: ['6 pcs', '12 pcs', '30 pcs'], priceRange: [50, 260], emoji: '🥚', tags: ['eggs', 'brown eggs', 'free range', 'protein'] },
    { baseName: 'Ghee', brands: ['Amul', 'Mother Dairy', 'Patanjali', 'Gowardhan', 'Nandini', 'Milma'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [120, 550], emoji: '🧈', tags: ['ghee', 'clarified butter', 'dairy'] },
    { baseName: 'Shrikhand', brands: ['Amul', 'Mother Dairy', 'Chitale', 'Gowardhan', 'Nandini', 'Milky Mist'], variants: ['100 g', '250 g', '500 g'], priceRange: [30, 140], emoji: '🍮', tags: ['shrikhand', 'dessert', 'dairy', 'sweet'] },
    { baseName: 'Lassi', brands: ['Amul', 'Mother Dairy', 'Nestle', 'Nandini', 'Verka', 'Punjab'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [20, 65], emoji: '🥛', tags: ['lassi', 'drink', 'dairy', 'punjabi'] },
    { baseName: 'Khoya', brands: ['Amul', 'Mother Dairy', 'Gowardhan', 'Nandini', 'Milky Mist', 'Chitale'], variants: ['200 g', '500 g', '1 kg'], priceRange: [80, 450], emoji: '🥛', tags: ['khoya', 'mawa', 'dairy', 'sweet'] },
    { baseName: 'Cream Cheese', brands: ['Dlecta', 'Britannia', 'Amul', 'Philadelphia', 'Milky Mist', 'Go Cheese'], variants: ['150 g', '200 g', '400 g'], priceRange: [80, 250], emoji: '🧀', tags: ['cream cheese', 'cheese', 'spread', 'dairy'] },
    { baseName: 'Mozzarella', brands: ['Amul', 'Go Cheese', 'Dlecta', 'Britannia', 'Milky Mist', 'Fonterra'], variants: ['200 g', '500 g', '1 kg'], priceRange: [110, 550], emoji: '🧀', tags: ['mozzarella', 'cheese', 'pizza', 'dairy'] },
    { baseName: 'Cheddar', brands: ['Amul', 'Go Cheese', 'Dlecta', 'Britannia', 'Milky Mist', 'Fonterra'], variants: ['200 g', '400 g', '1 kg'], priceRange: [120, 600], emoji: '🧀', tags: ['cheddar', 'cheese', 'dairy'] },
    { baseName: 'Whipping Cream', brands: ['Amul', 'Rich', 'Dlecta', 'Milky Mist', 'Britannia', 'Nestle'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [70, 300], emoji: '🥛', tags: ['whipping cream', 'cream', 'baking', 'dairy'] },
    { baseName: 'Chocolate Milk', brands: ['Amul', 'Mother Dairy', 'Nestle', 'Hershey\'s', 'Cavin\'s', 'Milky Mist'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [20, 75], emoji: '🍫', tags: ['chocolate milk', 'flavored milk', 'dairy'] },
    { baseName: 'Almond Milk', brands: ['So Good', 'Epigamia', 'Raw Pressery', 'Urban Platter', 'Sofit', 'Blue Diamond'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [60, 220], emoji: '🥛', tags: ['almond milk', 'plant milk', 'vegan', 'dairy free'] },
    { baseName: 'Soy Milk', brands: ['Sofit', 'So Good', 'Staeta', 'Silk', 'Hershey\'s', 'Epigamia'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [30, 120], emoji: '🥛', tags: ['soy milk', 'plant milk', 'vegan', 'protein'] },
    { baseName: 'Oat Milk', brands: ['So Good', 'Epigamia', 'Raw Pressery', 'Urban Platter', 'Oatly', 'Alt Co'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [80, 250], emoji: '🥛', tags: ['oat milk', 'plant milk', 'vegan', 'dairy free'] },
    { baseName: 'Cottage Cheese', brands: ['Amul', 'Mother Dairy', 'Britannia', 'Dlecta', 'Milky Mist', 'Go Cheese'], variants: ['200 g', '400 g', '1 kg'], priceRange: [70, 350], emoji: '🧀', tags: ['cottage cheese', 'paneer', 'dairy'] },
    { baseName: 'Tofu', brands: ['Nutrela', 'Morinaga', 'Sofit', 'Urban Platter', 'So Good', 'Nature\'s Basket'], variants: ['200 g', '400 g', '1 kg'], priceRange: [45, 200], emoji: '🧊', tags: ['tofu', 'soy', 'vegan', 'protein'] },
    { baseName: 'Probiotic Drink', brands: ['Yakult', 'Amul', 'Mother Dairy', 'Nestle', 'Epigamia', 'Danone'], variants: ['65 ml (5 pack)', '65 ml (10 pack)', '200 ml'], priceRange: [55, 180], emoji: '🥛', tags: ['probiotic', 'gut health', 'drink', 'dairy'] },
    { baseName: 'Ice Cream', brands: ['Amul', 'Mother Dairy', 'Kwality Walls', 'Baskin Robbins', 'Havmor', 'Vadilal'], variants: ['100 ml', '500 ml', '1 L', '2 L'], priceRange: [30, 350], emoji: '🍦', tags: ['ice cream', 'frozen', 'dessert', 'dairy'] },
    { baseName: 'Kulfi', brands: ['Amul', 'Mother Dairy', 'Havmor', 'Vadilal', 'Creambell', 'Kwality Walls'], variants: ['1 pc', '4 pack', '6 pack'], priceRange: [15, 120], emoji: '🍧', tags: ['kulfi', 'ice cream', 'indian', 'frozen dessert'] },
    { baseName: 'Milkshake', brands: ['Amul', 'Mother Dairy', 'Hershey\'s', 'Cavin\'s', 'Nestle', 'Keventers'], variants: ['200 ml', '350 ml', '500 ml'], priceRange: [25, 90], emoji: '🥤', tags: ['milkshake', 'flavored', 'drink', 'dairy'] },
    { baseName: 'Dahi', brands: ['Amul', 'Mother Dairy', 'Nestle', 'Britannia', 'Nandini', 'Milky Mist'], variants: ['200 g', '400 g', '1 kg'], priceRange: [20, 70], emoji: '🥛', tags: ['dahi', 'curd', 'yogurt', 'set curd'] },
    { baseName: 'Fresh Cream', brands: ['Amul', 'Mother Dairy', 'Britannia', 'Milky Mist', 'Nestle', 'Dlecta'], variants: ['100 ml', '200 ml', '500 ml'], priceRange: [28, 130], emoji: '🥛', tags: ['fresh cream', 'cooking cream', 'dairy'] }
  ];

  // ---- BEVERAGES ----
  TEMPLATES['beverages'] = [
    { baseName: 'Green Tea', brands: ['Tata Tea', 'Lipton', 'Tetley', 'Organic India', 'Typhoo', 'Girnar', 'Chaayos', 'True Elements'], variants: ['25 Bags', '50 Bags', '100 Bags', '250 g Loose'], priceRange: [100, 380], emoji: '🍵', tags: ['green tea', 'tea', 'healthy', 'antioxidant'] },
    { baseName: 'Black Tea', brands: ['Tata Tea', 'Red Label', 'Wagh Bakri', 'Taj Mahal', 'Lipton', 'Tetley', 'Society', 'Girnar'], variants: ['100 g', '250 g', '500 g', '1 kg'], priceRange: [45, 300], emoji: '🍵', tags: ['black tea', 'tea', 'chai', 'leaves'] },
    { baseName: 'Masala Tea', brands: ['Tata Tea', 'Wagh Bakri', 'Society', 'Girnar', 'Red Label', 'Patanjali', 'Chaayos', 'Brooke Bond'], variants: ['25 Bags', '50 Bags', '250 g', '500 g'], priceRange: [80, 280], emoji: '🍵', tags: ['masala tea', 'chai', 'spiced tea'] },
    { baseName: 'Chamomile Tea', brands: ['Tetley', 'Lipton', 'Organic India', 'Typhoo', 'Twinings', 'Girnar'], variants: ['25 Bags', '50 Bags', '100 Bags'], priceRange: [120, 400], emoji: '🌼', tags: ['chamomile', 'herbal tea', 'relaxation', 'caffeine free'] },
    { baseName: 'Instant Coffee', brands: ['Nescafe', 'Bru', 'Davidoff', 'Continental', 'Levista', 'Rage', 'Tata Coffee', 'Country Bean'], variants: ['50 g', '100 g', '200 g', '500 g'], priceRange: [90, 500], emoji: '☕', tags: ['coffee', 'instant', 'nescafe'] },
    { baseName: 'Filter Coffee', brands: ['Cothas', 'Narasu\'s', 'Leo', 'Bru', 'Continental', 'Tata Coffee', 'Levista', 'TGL'], variants: ['100 g', '200 g', '500 g'], priceRange: [80, 350], emoji: '☕', tags: ['filter coffee', 'south indian', 'decoction'] },
    { baseName: 'Cold Coffee', brands: ['Nescafe', 'Starbucks', 'Sleepy Owl', 'Rage', 'Keventers', 'Hershey\'s'], variants: ['200 ml', '250 ml', '400 ml'], priceRange: [60, 200], emoji: '☕', tags: ['cold coffee', 'iced coffee', 'ready to drink'] },
    { baseName: 'Orange Juice', brands: ['Tropicana', 'Real', 'B Natural', 'Paper Boat', 'Del Monte', 'Minute Maid', 'Raw Pressery', 'Dabur'], variants: ['200 ml', '500 ml', '1 L', '2 L'], priceRange: [25, 180], emoji: '🍊', tags: ['orange juice', 'juice', 'citrus', 'fresh'] },
    { baseName: 'Apple Juice', brands: ['Tropicana', 'Real', 'B Natural', 'Paper Boat', 'Del Monte', 'Minute Maid', 'Raw Pressery', 'Dabur'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [30, 170], emoji: '🍎', tags: ['apple juice', 'juice', 'fresh'] },
    { baseName: 'Mixed Fruit Juice', brands: ['Tropicana', 'Real', 'B Natural', 'Paper Boat', 'Del Monte', 'Minute Maid', 'Raw Pressery', 'Tang'], variants: ['200 ml', '500 ml', '1 L', '2 L'], priceRange: [25, 180], emoji: '🍹', tags: ['mixed fruit', 'juice', 'fruit punch'] },
    { baseName: 'Mango Juice', brands: ['Tropicana', 'Real', 'B Natural', 'Paper Boat', 'Maaza', 'Slice', 'Frooti', 'Minute Maid'], variants: ['200 ml', '500 ml', '1 L', '2 L'], priceRange: [15, 120], emoji: '🥭', tags: ['mango juice', 'juice', 'aam', 'summer'] },
    { baseName: 'Coconut Water', brands: ['Paper Boat', 'Real', 'Raw Pressery', 'Coco Soul', 'ORS', 'B Natural', 'Tropicana', 'Jain Farm Fresh'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [25, 90], emoji: '🥥', tags: ['coconut water', 'natural', 'hydration', 'electrolyte'] },
    { baseName: 'Lemonade', brands: ['Paper Boat', 'Real', 'B Natural', 'Raw Pressery', 'Limca', 'Minute Maid'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [20, 80], emoji: '🍋', tags: ['lemonade', 'nimbu pani', 'refreshing'] },
    { baseName: 'Cola', brands: ['Coca Cola', 'Pepsi', 'Thums Up', 'RC Cola', 'Campa Cola', 'Sosyo'], variants: ['250 ml', '500 ml', '750 ml', '1.25 L', '2 L'], priceRange: [18, 85], emoji: '🥤', tags: ['cola', 'soft drink', 'carbonated', 'soda'] },
    { baseName: 'Lemon Soda', brands: ['Sprite', '7UP', 'Limca', 'Mountain Dew', 'Mirinda', 'Fanta'], variants: ['250 ml', '500 ml', '750 ml', '1.25 L', '2 L'], priceRange: [18, 85], emoji: '🥤', tags: ['lemon soda', 'lime', 'soft drink', 'carbonated'] },
    { baseName: 'Ginger Ale', brands: ['Schweppes', 'Canada Dry', 'Fever Tree', 'Sepoy', 'Bisleri', 'SodaStream'], variants: ['200 ml', '300 ml', '500 ml'], priceRange: [35, 120], emoji: '🥤', tags: ['ginger ale', 'soda', 'mixer', 'carbonated'] },
    { baseName: 'Energy Drink', brands: ['Red Bull', 'Monster', 'Sting', 'Tzinga', 'Hell', 'Gatorade', 'Enerzal', 'Glucon-D'], variants: ['250 ml', '350 ml', '500 ml'], priceRange: [60, 180], emoji: '⚡', tags: ['energy drink', 'caffeine', 'sports', 'energy'] },
    { baseName: 'Sports Drink', brands: ['Gatorade', 'Powerade', 'Fast&Up', 'Enerzal', 'ORS', 'Glucon-D'], variants: ['250 ml', '500 ml', '1 L'], priceRange: [30, 120], emoji: '🏃', tags: ['sports drink', 'electrolyte', 'hydration'] },
    { baseName: 'Mineral Water', brands: ['Bisleri', 'Kinley', 'Aquafina', 'Himalayan', 'Bailey', 'Rail Neer'], variants: ['500 ml', '1 L', '2 L', '5 L', '20 L'], priceRange: [10, 60], emoji: '💧', tags: ['water', 'mineral water', 'drinking water'] },
    { baseName: 'Sparkling Water', brands: ['Perrier', 'San Pellegrino', 'Bisleri', 'Himalayan', 'Schweppes', 'SodaStream'], variants: ['250 ml', '500 ml', '750 ml', '1 L'], priceRange: [40, 180], emoji: '💧', tags: ['sparkling water', 'carbonated water', 'soda water'] },
    { baseName: 'Tonic Water', brands: ['Schweppes', 'Fever Tree', 'Sepoy', 'London Essence', 'Bisleri', 'SodaStream'], variants: ['200 ml', '300 ml', '500 ml'], priceRange: [35, 120], emoji: '💧', tags: ['tonic water', 'mixer', 'quinine'] },
    { baseName: 'Lassi', brands: ['Amul', 'Mother Dairy', 'Nandini', 'Verka', 'Patanjali', 'Punjab Sind'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [20, 65], emoji: '🥛', tags: ['lassi', 'dairy drink', 'punjabi'] },
    { baseName: 'Buttermilk', brands: ['Amul', 'Mother Dairy', 'Nandini', 'Verka', 'Patanjali', 'Paper Boat'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [15, 45], emoji: '🥛', tags: ['buttermilk', 'chaas', 'masala chaas'] },
    { baseName: 'Aam Panna', brands: ['Paper Boat', 'Real', 'B Natural', 'Mapro', 'Patanjali', 'MDH'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [25, 80], emoji: '🥭', tags: ['aam panna', 'mango drink', 'summer', 'raw mango'] },
    { baseName: 'Jaljeera', brands: ['Paper Boat', 'Mapro', 'Patanjali', 'MDH', 'Hajmola', 'Dabur'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [20, 70], emoji: '🫗', tags: ['jaljeera', 'digestive', 'spiced drink'] },
    { baseName: 'Rooh Afza', brands: ['Hamdard', 'Dabur', 'Patanjali', 'Mapro', 'Kissan', 'Rasna'], variants: ['200 ml', '500 ml', '750 ml'], priceRange: [55, 180], emoji: '🌹', tags: ['rooh afza', 'sharbat', 'rose', 'summer drink'] },
    { baseName: 'Badam Milk', brands: ['Amul', 'Mother Dairy', 'Hershey\'s', 'Paper Boat', 'Nandini', 'Cavin\'s'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [25, 90], emoji: '🥛', tags: ['badam milk', 'almond milk', 'flavored milk'] },
    { baseName: 'Health Drink', brands: ['Bournvita', 'Horlicks', 'Complan', 'Boost', 'Milo', 'Protinex', 'Pediasure', 'Ensure'], variants: ['200 g', '500 g', '1 kg', '2 kg'], priceRange: [120, 900], emoji: '🥤', tags: ['health drink', 'malt', 'nutrition', 'energy'] },
    { baseName: 'Protein Shake', brands: ['MuscleBlaze', 'Oziva', 'Amway', 'Herbalife', 'Ensure', 'Protinex'], variants: ['200 ml', '400 ml', '1 L'], priceRange: [80, 350], emoji: '💪', tags: ['protein shake', 'fitness', 'gym', 'nutrition'] },
    { baseName: 'Milkshake Mix', brands: ['Hershey\'s', 'Nestle', 'Dr. Oetker', 'Cadbury', 'Keventers', 'Cavin\'s'], variants: ['200 g', '400 g', '1 kg'], priceRange: [120, 350], emoji: '🥤', tags: ['milkshake', 'mix', 'powder', 'chocolate'] },
    { baseName: 'Instant Soup', brands: ['Knorr', 'Maggi', 'Ching\'s', 'Smith & Jones', 'Wai Wai', 'Saffola'], variants: ['Single Sachet', '4 Pack', '12 Pack'], priceRange: [12, 90], emoji: '🥣', tags: ['soup', 'instant', 'hot drink'] },
    { baseName: 'Hot Chocolate', brands: ['Cadbury', 'Hershey\'s', 'Nestle', 'Galaxy', 'Van Houten', 'Swiss Miss'], variants: ['100 g', '200 g', '500 g'], priceRange: [120, 400], emoji: '🍫', tags: ['hot chocolate', 'cocoa', 'warm drink'] },
    { baseName: 'Kombucha', brands: ['Atmosphere', 'Bhu Kombucha', 'Bombucha', 'Toyo Kombucha', 'ZOH', 'Raw Pressery'], variants: ['250 ml', '500 ml', '1 L'], priceRange: [100, 300], emoji: '🍵', tags: ['kombucha', 'fermented', 'probiotic', 'gut health'] },
    { baseName: 'Electrolyte Water', brands: ['ORS', 'Fast&Up', 'Gatorade', 'Enerzal', 'Glucon-D', 'Himalayan'], variants: ['250 ml', '500 ml', '1 L'], priceRange: [20, 80], emoji: '💧', tags: ['electrolyte', 'hydration', 'sports'] },
    { baseName: 'Flavored Water', brands: ['Bisleri', 'Himalayan', 'Raw Pressery', 'Paper Boat', 'Kinley', 'Aquafina'], variants: ['250 ml', '500 ml', '1 L'], priceRange: [20, 60], emoji: '💧', tags: ['flavored water', 'infused water', 'fruit water'] },
    { baseName: 'Detox Water', brands: ['Raw Pressery', 'Organic India', 'True Elements', 'Urban Platter', 'Nourish', 'Kapiva'], variants: ['250 ml', '500 ml', '1 L'], priceRange: [60, 200], emoji: '🍋', tags: ['detox', 'cleanse', 'healthy drink'] },
    { baseName: 'Iced Tea', brands: ['Lipton', 'Tetley', 'Snapple', 'Fuze', 'Nestea', 'Paper Boat', 'Tata Tea', 'Chaayos'], variants: ['200 ml', '400 ml', '1 L'], priceRange: [30, 120], emoji: '🧊', tags: ['iced tea', 'cold tea', 'refreshing'] },
    { baseName: 'Smoothie Mix', brands: ['True Elements', 'Raw Pressery', 'Yoga Bar', 'Urban Platter', 'Kapiva', 'Oziva'], variants: ['200 g', '400 g', '1 kg'], priceRange: [200, 600], emoji: '🥤', tags: ['smoothie', 'blend', 'fruit', 'healthy'] },
    { baseName: 'Aloe Vera Juice', brands: ['Patanjali', 'Kapiva', 'Dabur', 'Organic India', 'Baidyanath', 'Wow'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [60, 250], emoji: '🌿', tags: ['aloe vera', 'juice', 'detox', 'health'] },
    { baseName: 'Neem Juice', brands: ['Patanjali', 'Kapiva', 'Dabur', 'Baidyanath', 'Organic India', 'Krishna\'s'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [80, 280], emoji: '🌿', tags: ['neem', 'juice', 'detox', 'ayurvedic'] }
  ];

  // ---- SNACKS & BRANDED FOODS ----
  TEMPLATES['snacks'] = [
    { baseName: 'Potato Chips', brands: ['Lay\'s', 'Uncle Chipps', 'Bingo', 'Too Yumm', 'Pringles', 'Kettle', 'Act II', 'Balaji'], variants: ['25 g', '52 g', '115 g', '180 g'], priceRange: [10, 90], emoji: '🥔', tags: ['chips', 'potato', 'snack', 'crispy'] },
    { baseName: 'Nachos', brands: ['Doritos', 'Bingo', 'Too Yumm', 'Cornitos', 'Act II', 'Del Monte'], variants: ['60 g', '120 g', '200 g'], priceRange: [30, 140], emoji: '🌮', tags: ['nachos', 'corn', 'chips', 'mexican'] },
    { baseName: 'Namkeen Mix', brands: ['Haldiram\'s', 'Bikano', 'Balaji', 'Aakash', 'Bikanervala', 'Priyagold', 'Jabsons', 'Gopal'], variants: ['150 g', '350 g', '1 kg'], priceRange: [40, 250], emoji: '🫘', tags: ['namkeen', 'mixture', 'indian snack'] },
    { baseName: 'Bhujia', brands: ['Haldiram\'s', 'Bikano', 'Balaji', 'Bikanervala', 'Gopal', 'Jabsons'], variants: ['150 g', '400 g', '1 kg'], priceRange: [45, 260], emoji: '🟡', tags: ['bhujia', 'namkeen', 'indian snack', 'besan'] },
    { baseName: 'Aloo Bhujia', brands: ['Haldiram\'s', 'Bikano', 'Balaji', 'Bikanervala', 'Gopal', 'Jabsons'], variants: ['150 g', '350 g', '1 kg'], priceRange: [40, 230], emoji: '🥔', tags: ['aloo bhujia', 'potato', 'namkeen'] },
    { baseName: 'Moong Dal Snack', brands: ['Haldiram\'s', 'Bikano', 'Balaji', 'Bikanervala', 'Jabsons', 'Gopal'], variants: ['150 g', '350 g', '1 kg'], priceRange: [40, 220], emoji: '🫘', tags: ['moong dal', 'namkeen', 'protein snack'] },
    { baseName: 'Peanuts Roasted', brands: ['Haldiram\'s', 'Jabsons', 'Miltop', 'Happilo', 'Balaji', 'Bikano'], variants: ['150 g', '350 g', '1 kg'], priceRange: [40, 200], emoji: '🥜', tags: ['peanuts', 'roasted', 'masala', 'snack'] },
    { baseName: 'Khakhra', brands: ['Haldiram\'s', 'Jabsons', 'Balaji', 'Bikano', 'Induben', 'Gopal'], variants: ['150 g', '300 g', '500 g'], priceRange: [35, 140], emoji: '🫓', tags: ['khakhra', 'gujarati', 'thin crisp'] },
    { baseName: 'Mathri', brands: ['Haldiram\'s', 'Bikano', 'Bikanervala', 'Jabsons', 'Gopal', 'Balaji'], variants: ['200 g', '400 g', '1 kg'], priceRange: [50, 200], emoji: '🫓', tags: ['mathri', 'indian snack', 'tea time'] },
    { baseName: 'Biscuits Cream', brands: ['Parle', 'Britannia', 'Sunfeast', 'Oreo', 'Priyagold', 'Unibic', 'McVitie\'s', 'Jim Jam'], variants: ['50 g', '120 g', '300 g', '600 g'], priceRange: [10, 120], emoji: '🍪', tags: ['biscuit', 'cream', 'cookie', 'sweet'] },
    { baseName: 'Biscuits Digestive', brands: ['Britannia', 'McVitie\'s', 'Sunfeast', 'Parle', 'Unibic', 'Nairns'], variants: ['100 g', '250 g', '400 g'], priceRange: [30, 140], emoji: '🍪', tags: ['biscuit', 'digestive', 'fiber', 'healthy'] },
    { baseName: 'Biscuits Glucose', brands: ['Parle-G', 'Britannia', 'Sunfeast', 'Priyagold', 'Tiger', 'Patanjali'], variants: ['50 g', '100 g', '250 g', '800 g'], priceRange: [5, 50], emoji: '🍪', tags: ['biscuit', 'glucose', 'energy', 'tea time'] },
    { baseName: 'Biscuits Chocolate', brands: ['Parle', 'Britannia', 'Sunfeast', 'Oreo', 'Unibic', 'Dark Fantasy'], variants: ['50 g', '120 g', '300 g'], priceRange: [15, 120], emoji: '🍪', tags: ['biscuit', 'chocolate', 'cookie'] },
    { baseName: 'Cookies', brands: ['Unibic', 'Britannia Good Day', 'Sunfeast', 'Karachi Bakery', 'McVitie\'s', 'Milano'], variants: ['75 g', '150 g', '300 g', '600 g'], priceRange: [20, 200], emoji: '🍪', tags: ['cookies', 'butter', 'chocolate chip'] },
    { baseName: 'Wafers', brands: ['Parle', 'Britannia', 'Dukes', 'Priyagold', 'Loacker', 'Bisk Farm'], variants: ['60 g', '150 g', '300 g'], priceRange: [15, 100], emoji: '🧇', tags: ['wafer', 'cream wafer', 'crispy'] },
    { baseName: 'Rusks', brands: ['Britannia', 'Parle', 'Patanjali', 'Priyagold', 'Sunfeast', 'Modern'], variants: ['200 g', '400 g', '600 g'], priceRange: [30, 90], emoji: '🍞', tags: ['rusk', 'toast', 'tea time', 'breakfast'] },
    { baseName: 'Cake', brands: ['Britannia', 'Parle', 'Sunfeast', 'Monginis', 'Winkies', 'Modern'], variants: ['35 g', '75 g', '250 g', '500 g'], priceRange: [10, 180], emoji: '🍰', tags: ['cake', 'soft cake', 'snack cake'] },
    { baseName: 'Brownie', brands: ['Britannia', 'Sunfeast', 'Monginis', 'Theobroma', 'Winkies', 'Unibic'], variants: ['25 g', '60 g', '150 g'], priceRange: [15, 120], emoji: '🟫', tags: ['brownie', 'chocolate', 'dessert'] },
    { baseName: 'Chocolate Bar', brands: ['Cadbury', 'Nestle', 'Amul', 'Snickers', 'KitKat', '5 Star', 'Mars', 'Munch'], variants: ['Small', 'Regular', 'King Size', 'Family Pack'], priceRange: [10, 200], emoji: '🍫', tags: ['chocolate', 'candy', 'sweet', 'cocoa'] },
    { baseName: 'Dark Chocolate', brands: ['Cadbury Bournville', 'Amul', 'Lindt', 'Toblerone', 'Mason & Co', 'Ketofy'], variants: ['40 g', '80 g', '150 g', '300 g'], priceRange: [50, 400], emoji: '🍫', tags: ['dark chocolate', 'cocoa', 'premium'] },
    { baseName: 'White Chocolate', brands: ['Cadbury', 'Nestle', 'Amul', 'Lindt', 'Milkybar', 'Mason & Co'], variants: ['40 g', '80 g', '150 g'], priceRange: [30, 250], emoji: '🤍', tags: ['white chocolate', 'sweet', 'cocoa butter'] },
    { baseName: 'Toffees', brands: ['Cadbury Eclairs', 'Alpenliebe', 'Melody', 'Mango Bite', 'Kismi', 'Parle'], variants: ['10 pcs', '25 pcs', '100 pcs'], priceRange: [10, 120], emoji: '🍬', tags: ['toffee', 'candy', 'sweet'] },
    { baseName: 'Candy', brands: ['Pulse', 'Alpenliebe', 'Mentos', 'Skittles', 'Gems', 'Center Fresh'], variants: ['10 pcs', '50 pcs', '100 pcs'], priceRange: [10, 100], emoji: '🍬', tags: ['candy', 'sweet', 'hard candy'] },
    { baseName: 'Lollipop', brands: ['Alpenliebe', 'Chupa Chups', 'Candyman', 'Perfetti', 'Pan Pasand', 'Parle'], variants: ['5 pcs', '10 pcs', '25 pcs'], priceRange: [15, 80], emoji: '🍭', tags: ['lollipop', 'candy', 'sweet', 'kids'] },
    { baseName: 'Mints', brands: ['Polo', 'Tic Tac', 'Mentos', 'Center Fresh', 'Clorets', 'Orbit'], variants: ['15 g', '35 g', '80 g'], priceRange: [10, 60], emoji: '🍬', tags: ['mint', 'breath freshener', 'candy'] },
    { baseName: 'Chewing Gum', brands: ['Center Fresh', 'Orbit', 'Happydent', 'Boomer', 'Big Babol', 'Doublemint'], variants: ['5 pcs', '10 pcs', '15 pcs'], priceRange: [5, 40], emoji: '🫧', tags: ['chewing gum', 'gum', 'bubble gum'] },
    { baseName: 'Fruit Bar', brands: ['Raw Pressery', 'Yoga Bar', 'True Elements', 'Paper Boat', 'Happilo', 'Nature\'s Basket'], variants: ['30 g', '50 g', '6 Pack'], priceRange: [20, 180], emoji: '🍓', tags: ['fruit bar', 'healthy snack', 'dried fruit'] },
    { baseName: 'Granola Bar', brands: ['Yoga Bar', 'True Elements', 'MuscleBlaze', 'RiteBite', 'Nature Valley', 'Kellogg\'s'], variants: ['35 g', '50 g', '6 Pack'], priceRange: [25, 250], emoji: '🥣', tags: ['granola bar', 'oats', 'healthy snack'] },
    { baseName: 'Protein Bar', brands: ['Yoga Bar', 'MuscleBlaze', 'RiteBite', 'Oziva', 'Max Protein', 'Mojo Bar'], variants: ['35 g', '60 g', '6 Pack', '12 Pack'], priceRange: [30, 600], emoji: '💪', tags: ['protein bar', 'fitness', 'gym', 'protein'] },
    { baseName: 'Energy Bar', brands: ['RiteBite', 'Yoga Bar', 'True Elements', 'MuscleBlaze', 'Max Protein', 'Unibic'], variants: ['35 g', '50 g', '6 Pack'], priceRange: [20, 200], emoji: '⚡', tags: ['energy bar', 'snack', 'pre workout'] },
    { baseName: 'Kurkure', brands: ['Kurkure', 'Bingo', 'Too Yumm', 'Balaji', 'Cornitos', 'Bikano'], variants: ['25 g', '70 g', '115 g', '250 g'], priceRange: [10, 80], emoji: '🌶️', tags: ['kurkure', 'corn snack', 'masala', 'crunchy'] },
    { baseName: 'Puffed Rice', brands: ['Haldiram\'s', 'Balaji', 'Bikano', 'Jabsons', 'Gopal', 'BB Popular'], variants: ['150 g', '300 g', '500 g'], priceRange: [25, 80], emoji: '🍚', tags: ['puffed rice', 'murmura', 'snack'] },
    { baseName: 'Popcorn', brands: ['Act II', 'Too Yumm', '4700BC', 'Parle', 'American Garden', 'Del Monte'], variants: ['30 g', '75 g', '150 g', '300 g'], priceRange: [15, 180], emoji: '🍿', tags: ['popcorn', 'corn', 'snack', 'movie'] },
    { baseName: 'Corn Puffs', brands: ['Kurkure', 'Bingo', 'Cheetos', 'Too Yumm', 'Balaji', 'Bikano'], variants: ['25 g', '55 g', '115 g'], priceRange: [10, 60], emoji: '🟡', tags: ['corn puffs', 'puffs', 'snack', 'cheese'] },
    { baseName: 'Instant Noodles', brands: ['Maggi', 'Yippee', 'Top Ramen', 'Ching\'s', 'Wai Wai', 'Knorr', 'Patanjali', 'Smith & Jones'], variants: ['Single', '4 Pack', '8 Pack', '12 Pack'], priceRange: [14, 120], emoji: '🍜', tags: ['instant noodles', 'maggi', 'quick meal'] },
    { baseName: 'Cup Noodles', brands: ['Nissin', 'Knorr', 'Ching\'s', 'Wai Wai', 'Maggi', 'Top Ramen'], variants: ['Single Cup', '4 Pack'], priceRange: [40, 180], emoji: '🍜', tags: ['cup noodles', 'instant', 'quick meal'] },
    { baseName: 'Ready to Eat Meals', brands: ['MTR', 'Haldiram\'s', 'ITC Kitchen of India', 'Gits', 'Kohinoor', 'Tasty Bite'], variants: ['Single', '2 Pack', '4 Pack'], priceRange: [45, 250], emoji: '🍛', tags: ['ready to eat', 'meal', 'instant', 'curry'] },
    { baseName: 'Soup Packets', brands: ['Knorr', 'Maggi', 'Ching\'s', 'Saffola', 'Smith & Jones', 'Wai Wai'], variants: ['Single', '4 Pack', '12 Pack'], priceRange: [12, 100], emoji: '🥣', tags: ['soup', 'instant soup', 'hot'] },
    { baseName: 'Bread Sticks', brands: ['Britannia', 'Parle', 'Del Monte', 'Alessi', 'Kambly', 'Urban Platter'], variants: ['100 g', '200 g', '400 g'], priceRange: [40, 180], emoji: '🥖', tags: ['bread sticks', 'crispy', 'snack'] },
    { baseName: 'Cream Rolls', brands: ['Britannia', 'Parle', 'Sunfeast', 'Winkies', 'Modern', 'Monginis'], variants: ['Single', '4 Pack', '8 Pack'], priceRange: [10, 80], emoji: '🧁', tags: ['cream roll', 'pastry', 'sweet'] },
    { baseName: 'Swiss Rolls', brands: ['Britannia', 'Parle', 'Sunfeast', 'Winkies', 'Modern', 'Monginis'], variants: ['Single', '2 Pack', 'Family Pack'], priceRange: [15, 120], emoji: '🍥', tags: ['swiss roll', 'cake', 'chocolate'] },
    { baseName: 'Muffin', brands: ['Britannia', 'Sunfeast', 'Monginis', 'Winkies', 'Top n Town', 'Modern'], variants: ['Single', '4 Pack', '6 Pack'], priceRange: [15, 120], emoji: '🧁', tags: ['muffin', 'cupcake', 'snack cake'] },
    { baseName: 'Doughnut', brands: ['Britannia', 'Monginis', 'Dunkin', 'Mad Over Donuts', 'Winkies', 'Modern'], variants: ['Single', '3 Pack', '6 Pack'], priceRange: [20, 250], emoji: '🍩', tags: ['doughnut', 'donut', 'glazed', 'sweet'] },
    { baseName: 'Croissant', brands: ['Britannia', 'Le Marche', 'Monginis', 'Theobroma', 'Modern', 'French Loaf'], variants: ['Single', '3 Pack', '6 Pack'], priceRange: [25, 200], emoji: '🥐', tags: ['croissant', 'pastry', 'french', 'buttery'] },
    { baseName: 'Pretzel', brands: ['Snyder\'s', 'Urban Platter', 'Del Monte', 'Bikano', 'Too Yumm', 'Cornitos'], variants: ['50 g', '100 g', '250 g'], priceRange: [60, 250], emoji: '🥨', tags: ['pretzel', 'twisted', 'snack', 'salted'] },
    { baseName: 'Trail Mix', brands: ['Happilo', 'True Elements', 'Yoga Bar', 'Nutraj', 'Farmley', 'Rostaa'], variants: ['100 g', '200 g', '400 g', '1 kg'], priceRange: [100, 600], emoji: '🥜', tags: ['trail mix', 'nuts', 'dried fruit', 'healthy'] },
    { baseName: 'Dry Fruit Mix', brands: ['Happilo', 'Nutraj', 'Miltop', 'Farmley', 'Rostaa', 'True Elements'], variants: ['200 g', '400 g', '1 kg'], priceRange: [250, 900], emoji: '🌰', tags: ['dry fruit', 'mixed nuts', 'premium'] },
    { baseName: 'Chikki', brands: ['Haldiram\'s', 'Jabsons', 'Bikano', 'Patanjali', 'Gopal', 'Balaji'], variants: ['100 g', '250 g', '500 g'], priceRange: [30, 150], emoji: '🥜', tags: ['chikki', 'peanut brittle', 'jaggery', 'sweet'] },
    { baseName: 'Halwa', brands: ['Haldiram\'s', 'Bikano', 'MTR', 'Gits', 'Bikanervala', 'Patanjali'], variants: ['200 g', '500 g', '1 kg'], priceRange: [60, 350], emoji: '🍮', tags: ['halwa', 'sweet', 'dessert', 'indian sweet'] },
    { baseName: 'Laddu', brands: ['Haldiram\'s', 'Bikano', 'Bikanervala', 'Chitale', 'Balaji', 'Gopal'], variants: ['250 g', '500 g', '1 kg'], priceRange: [100, 450], emoji: '🟡', tags: ['laddu', 'ladoo', 'sweet', 'indian sweet'] }
  ];

  // ---- PERSONAL CARE ----
  TEMPLATES['personal'] = [
    { baseName: 'Shampoo', brands: ['Dove', 'Head & Shoulders', 'Pantene', 'L\'Oreal', 'TRESemme', 'Himalaya', 'Clinic Plus', 'Sunsilk'], variants: ['80 ml', '180 ml', '340 ml', '650 ml'], priceRange: [45, 450], emoji: '🧴', tags: ['shampoo', 'hair care', 'hair wash'] },
    { baseName: 'Conditioner', brands: ['Dove', 'Pantene', 'L\'Oreal', 'TRESemme', 'Matrix', 'Sunsilk', 'Himalaya', 'Garnier'], variants: ['80 ml', '180 ml', '340 ml'], priceRange: [60, 400], emoji: '🧴', tags: ['conditioner', 'hair care', 'smooth'] },
    { baseName: 'Hair Oil', brands: ['Parachute', 'Dabur Amla', 'Bajaj Almond', 'Navratna', 'Himalaya', 'Indulekha', 'Kesh King', 'Biotique'], variants: ['100 ml', '200 ml', '300 ml', '500 ml'], priceRange: [40, 450], emoji: '🫗', tags: ['hair oil', 'coconut oil', 'hair care'] },
    { baseName: 'Hair Serum', brands: ['L\'Oreal', 'TRESemme', 'Streax', 'Livon', 'Matrix', 'Dove', 'Set Wet', 'Garnier'], variants: ['50 ml', '100 ml', '200 ml'], priceRange: [120, 500], emoji: '✨', tags: ['hair serum', 'anti frizz', 'shine'] },
    { baseName: 'Hair Gel', brands: ['Set Wet', 'Gatsby', 'Brylcreem', 'Garnier', 'Beardo', 'Park Avenue'], variants: ['50 ml', '100 ml', '250 ml'], priceRange: [50, 200], emoji: '💈', tags: ['hair gel', 'styling', 'men', 'grooming'] },
    { baseName: 'Body Wash', brands: ['Dove', 'Nivea', 'Lux', 'Fiama', 'Dettol', 'Lifebuoy', 'Palmolive', 'Old Spice'], variants: ['100 ml', '250 ml', '500 ml', '900 ml'], priceRange: [60, 400], emoji: '🧴', tags: ['body wash', 'shower gel', 'bath'] },
    { baseName: 'Soap Bar', brands: ['Dove', 'Lux', 'Pears', 'Dettol', 'Lifebuoy', 'Himalaya', 'Mysore Sandal', 'Cinthol'], variants: ['75 g', '100 g', '3 Pack', '6 Pack'], priceRange: [25, 250], emoji: '🧼', tags: ['soap', 'bath soap', 'bar soap'] },
    { baseName: 'Hand Wash', brands: ['Dettol', 'Lifebuoy', 'Himalaya', 'Savlon', 'Palmolive', 'Godrej Protekt'], variants: ['200 ml', '500 ml', '750 ml'], priceRange: [45, 180], emoji: '🧴', tags: ['hand wash', 'hygiene', 'antibacterial'] },
    { baseName: 'Hand Sanitizer', brands: ['Dettol', 'Lifebuoy', 'Himalaya', 'Savlon', 'Sterillium', 'Godrej Protekt'], variants: ['50 ml', '200 ml', '500 ml', '1 L'], priceRange: [25, 250], emoji: '🧴', tags: ['sanitizer', 'hand sanitizer', 'hygiene'] },
    { baseName: 'Face Wash', brands: ['Himalaya', 'Garnier', 'Nivea', 'Clean & Clear', 'Pond\'s', 'Cetaphil', 'Mamaearth', 'WOW'], variants: ['50 ml', '100 ml', '150 ml', '200 ml'], priceRange: [60, 350], emoji: '🧴', tags: ['face wash', 'cleanser', 'skin care'] },
    { baseName: 'Face Cream', brands: ['Pond\'s', 'Nivea', 'Lakme', 'Himalaya', 'Olay', 'Garnier', 'Biotique', 'Mamaearth'], variants: ['25 g', '50 g', '100 g'], priceRange: [50, 500], emoji: '🧴', tags: ['face cream', 'moisturizer', 'skin care'] },
    { baseName: 'Moisturizer', brands: ['Nivea', 'Vaseline', 'Pond\'s', 'Cetaphil', 'Himalaya', 'Dove', 'Aveeno', 'Mamaearth'], variants: ['100 ml', '200 ml', '400 ml'], priceRange: [80, 500], emoji: '🧴', tags: ['moisturizer', 'body lotion', 'skin care', 'hydration'] },
    { baseName: 'Sunscreen', brands: ['Lakme', 'Neutrogena', 'Lotus', 'Mamaearth', 'Nivea', 'Himalaya', 'La Shield', 'Biotique'], variants: ['30 ml', '50 ml', '100 ml'], priceRange: [120, 600], emoji: '☀️', tags: ['sunscreen', 'SPF', 'sun protection', 'UV'] },
    { baseName: 'Body Lotion', brands: ['Nivea', 'Vaseline', 'Dove', 'Himalaya', 'Aveeno', 'Biotique', 'Parachute', 'Mamaearth'], variants: ['100 ml', '200 ml', '400 ml', '600 ml'], priceRange: [80, 450], emoji: '🧴', tags: ['body lotion', 'moisturizer', 'skin care'] },
    { baseName: 'Lip Balm', brands: ['Nivea', 'Maybelline', 'Himalaya', 'Biotique', 'Burt\'s Bees', 'Vaseline', 'Lakme', 'Mamaearth'], variants: ['4.5 g', '10 g', '2 Pack'], priceRange: [70, 350], emoji: '💋', tags: ['lip balm', 'lip care', 'moisturize'] },
    { baseName: 'Deodorant', brands: ['Nivea', 'Dove', 'Fogg', 'Wild Stone', 'Park Avenue', 'Yardley', 'Old Spice', 'Axe'], variants: ['50 ml', '150 ml', '250 ml'], priceRange: [80, 350], emoji: '🧴', tags: ['deodorant', 'deo', 'body spray'] },
    { baseName: 'Perfume', brands: ['Denver', 'Engage', 'Set Wet', 'Bella Vita', 'Fogg', 'Wild Stone', 'Park Avenue', 'Yardley'], variants: ['30 ml', '60 ml', '100 ml'], priceRange: [150, 1200], emoji: '🌸', tags: ['perfume', 'fragrance', 'eau de toilette'] },
    { baseName: 'Talcum Powder', brands: ['Pond\'s', 'Yardley', 'Nycil', 'Cinthol', 'Navratna', 'Spinz'], variants: ['50 g', '100 g', '300 g'], priceRange: [30, 180], emoji: '🤍', tags: ['talcum powder', 'body powder', 'fragrance'] },
    { baseName: 'Toothpaste', brands: ['Colgate', 'Pepsodent', 'Sensodyne', 'Close Up', 'Oral-B', 'Patanjali', 'Himalaya', 'Dabur Red'], variants: ['50 g', '100 g', '150 g', '300 g'], priceRange: [25, 220], emoji: '🦷', tags: ['toothpaste', 'dental', 'oral care'] },
    { baseName: 'Toothbrush', brands: ['Colgate', 'Oral-B', 'Sensodyne', 'Pepsodent', 'Patanjali', 'Himalaya', 'Aquafresh', 'Curaprox'], variants: ['Single', '2 Pack', '4 Pack'], priceRange: [20, 180], emoji: '🪥', tags: ['toothbrush', 'dental', 'oral care'] },
    { baseName: 'Mouthwash', brands: ['Listerine', 'Colgate', 'Oral-B', 'Himalaya', 'Betadine', 'Sensodyne'], variants: ['80 ml', '250 ml', '500 ml'], priceRange: [40, 280], emoji: '🧴', tags: ['mouthwash', 'oral care', 'breath freshener'] },
    { baseName: 'Dental Floss', brands: ['Oral-B', 'Colgate', 'Listerine', 'Reach', 'Sensodyne', 'Dr. Fresh'], variants: ['25 m', '50 m', '100 m'], priceRange: [50, 200], emoji: '🦷', tags: ['dental floss', 'oral care', 'teeth'] },
    { baseName: 'Shaving Cream', brands: ['Gillette', 'Park Avenue', 'Nivea', 'Old Spice', 'Godrej', 'Dettol'], variants: ['50 g', '100 g', '200 g'], priceRange: [50, 200], emoji: '💈', tags: ['shaving cream', 'grooming', 'men'] },
    { baseName: 'Razor', brands: ['Gillette', 'Bombay Shaving', 'LetsShave', 'Ustraa', 'Park Avenue', 'Philips'], variants: ['Single', '2 Pack', '5 Pack'], priceRange: [30, 450], emoji: '💈', tags: ['razor', 'shaving', 'grooming', 'men'] },
    { baseName: 'Aftershave', brands: ['Nivea', 'Old Spice', 'Park Avenue', 'Gillette', 'Brut', 'Axe'], variants: ['50 ml', '100 ml', '150 ml'], priceRange: [80, 350], emoji: '💈', tags: ['aftershave', 'grooming', 'men'] },
    { baseName: 'Face Mask', brands: ['Himalaya', 'Garnier', 'Lakme', 'Mamaearth', 'WOW', 'Biotique', 'Nivea', 'Pond\'s'], variants: ['Single', '5 Pack', '10 Pack'], priceRange: [30, 300], emoji: '🧖', tags: ['face mask', 'skin care', 'sheet mask'] },
    { baseName: 'Eye Cream', brands: ['Olay', 'L\'Oreal', 'Nivea', 'Pond\'s', 'Himalaya', 'Mamaearth', 'Cetaphil', 'Biotique'], variants: ['15 ml', '20 g', '40 ml'], priceRange: [200, 800], emoji: '👁️', tags: ['eye cream', 'dark circles', 'anti aging'] },
    { baseName: 'Serum', brands: ['L\'Oreal', 'Garnier', 'Mamaearth', 'Plum', 'WOW', 'The Derma Co', 'Minimalist', 'Olay'], variants: ['15 ml', '30 ml', '50 ml'], priceRange: [150, 900], emoji: '✨', tags: ['serum', 'vitamin C', 'skin care', 'anti aging'] },
    { baseName: 'Night Cream', brands: ['Olay', 'Pond\'s', 'Nivea', 'L\'Oreal', 'Himalaya', 'Lakme', 'Garnier', 'Mamaearth'], variants: ['25 g', '50 g', '100 g'], priceRange: [100, 600], emoji: '🌙', tags: ['night cream', 'skin care', 'repair'] },
    { baseName: 'BB Cream', brands: ['Lakme', 'Garnier', 'Maybelline', 'Pond\'s', 'L\'Oreal', 'Nivea'], variants: ['9 g', '18 g', '30 g'], priceRange: [80, 350], emoji: '🧴', tags: ['bb cream', 'base', 'makeup', 'skin care'] },
    { baseName: 'Foundation', brands: ['Maybelline', 'Lakme', 'L\'Oreal', 'MAC', 'Revlon', 'Colorbar', 'Nykaa', 'Faces Canada'], variants: ['15 ml', '25 ml', '30 ml'], priceRange: [150, 1200], emoji: '💄', tags: ['foundation', 'makeup', 'base'] },
    { baseName: 'Kajal', brands: ['Lakme', 'Maybelline', 'Colorbar', 'Himalaya', 'Faces Canada', 'Nykaa', 'Biotique', 'Lotus'], variants: ['Single', '2 Pack'], priceRange: [80, 350], emoji: '👁️', tags: ['kajal', 'kohl', 'eye makeup'] },
    { baseName: 'Lipstick', brands: ['Lakme', 'Maybelline', 'MAC', 'L\'Oreal', 'Revlon', 'Colorbar', 'Nykaa', 'Faces Canada'], variants: ['Single', '2 Pack', 'Mini'], priceRange: [100, 900], emoji: '💄', tags: ['lipstick', 'lip color', 'makeup'] },
    { baseName: 'Nail Polish', brands: ['Lakme', 'Maybelline', 'Colorbar', 'Nykaa', 'Faces Canada', 'Revlon', 'Lotus', 'Elle 18'], variants: ['Single', '3 Pack', '6 Pack'], priceRange: [60, 400], emoji: '💅', tags: ['nail polish', 'nail paint', 'nail art'] },
    { baseName: 'Makeup Remover', brands: ['Garnier', 'Nivea', 'Lakme', 'Biotique', 'Simple', 'Plum', 'Neutrogena', 'L\'Oreal'], variants: ['50 ml', '125 ml', '200 ml'], priceRange: [80, 350], emoji: '🧴', tags: ['makeup remover', 'cleanser', 'micellar water'] },
    { baseName: 'Cotton Pads', brands: ['Bella', 'Whisper', 'Tulips', 'Kara', 'Johnson\'s', 'Sirona'], variants: ['50 pcs', '100 pcs', '200 pcs'], priceRange: [40, 180], emoji: '⚪', tags: ['cotton pads', 'skin care', 'cleansing'] },
    { baseName: 'Wet Wipes', brands: ['Dettol', 'Himalaya', 'Johnson\'s', 'Kara', 'Sirona', 'Mother Sparsh'], variants: ['10 pcs', '30 pcs', '72 pcs'], priceRange: [30, 200], emoji: '🧻', tags: ['wet wipes', 'cleansing', 'hygiene'] },
    { baseName: 'Tissue Box', brands: ['Paseo', 'Origami', 'Kleenex', 'Scott', 'Mee Mee', 'Nice'], variants: ['100 pulls', '200 pulls', '3 Box Pack'], priceRange: [50, 250], emoji: '🧻', tags: ['tissue', 'facial tissue', 'paper'] },
    { baseName: 'Sanitary Pads', brands: ['Whisper', 'Stayfree', 'Sofy', 'Kotex', 'Nua', 'Sirona', 'Carmesi', 'Pee Safe'], variants: ['8 pcs', '15 pcs', '30 pcs', '44 pcs'], priceRange: [45, 350], emoji: '🩹', tags: ['sanitary pads', 'menstrual', 'hygiene', 'women'] },
    { baseName: 'Diaper (Adult)', brands: ['Friends', 'Dignity', 'Kare In', 'Nobel Hygiene', 'Lifree', 'Tena'], variants: ['10 pcs', '20 pcs', '30 pcs'], priceRange: [200, 800], emoji: '🩹', tags: ['adult diaper', 'incontinence', 'elderly care'] },
    { baseName: 'Hair Color', brands: ['Garnier', 'L\'Oreal', 'Godrej', 'Revlon', 'Streax', 'Indus Valley'], variants: ['Single Sachet', '40 ml', '70 ml'], priceRange: [30, 500], emoji: '🎨', tags: ['hair color', 'hair dye', 'coloring'] },
    { baseName: 'Hair Straightener Cream', brands: ['Streax', 'L\'Oreal', 'Matrix', 'BBlunt', 'TRESemme', 'Schwarzkopf'], variants: ['50 g', '120 g', '250 g'], priceRange: [100, 800], emoji: '💇', tags: ['hair straightener', 'straightening', 'hair care'] },
    { baseName: 'Comb', brands: ['Vega', 'Roots', 'Denman', 'Kent', 'Majestique', 'Alan Truman'], variants: ['Single', '3 Pack', 'Set'], priceRange: [30, 250], emoji: '💇', tags: ['comb', 'hair comb', 'grooming'] },
    { baseName: 'Body Scrub', brands: ['mCaffeine', 'Mamaearth', 'WOW', 'Plum', 'Biotique', 'Bryan & Candy', 'St. Ives', 'Himalaya'], variants: ['100 g', '200 g', '300 g'], priceRange: [150, 500], emoji: '✨', tags: ['body scrub', 'exfoliate', 'skin care'] }
  ];

  // ---- HOME & KITCHEN ----
  TEMPLATES['home'] = [
    { baseName: 'Dishwash Liquid', brands: ['Vim', 'Pril', 'Dettol', 'Godrej', 'Patanjali', 'Amazon Basics', 'Scotch-Brite', 'Exo'], variants: ['250 ml', '500 ml', '1 L', '2 L'], priceRange: [30, 200], emoji: '🧴', tags: ['dishwash', 'dish soap', 'kitchen cleaning'] },
    { baseName: 'Dishwash Bar', brands: ['Vim', 'Exo', 'Pril', 'Patanjali', 'Godrej', 'Rin'], variants: ['200 g', '500 g', '1 kg', '3 Pack'], priceRange: [15, 100], emoji: '🧼', tags: ['dishwash bar', 'dish soap', 'kitchen'] },
    { baseName: 'Floor Cleaner', brands: ['Lizol', 'Dettol', 'Harpic', 'Domex', 'Presto', 'Godrej'], variants: ['500 ml', '1 L', '2 L'], priceRange: [70, 250], emoji: '🧹', tags: ['floor cleaner', 'disinfectant', 'cleaning'] },
    { baseName: 'Toilet Cleaner', brands: ['Harpic', 'Domex', 'Dettol', 'Sanifresh', 'Swachh', 'Patanjali'], variants: ['250 ml', '500 ml', '1 L'], priceRange: [45, 180], emoji: '🚽', tags: ['toilet cleaner', 'bathroom', 'disinfectant'] },
    { baseName: 'Glass Cleaner', brands: ['Colin', 'Mr. Muscle', 'Dettol', 'Amazon Basics', 'Presto', 'Godrej'], variants: ['250 ml', '500 ml', '1 L'], priceRange: [45, 150], emoji: '🪟', tags: ['glass cleaner', 'window', 'cleaning'] },
    { baseName: 'All Purpose Cleaner', brands: ['Dettol', 'Lizol', 'Colin', 'Mr. Muscle', 'Presto', 'Godrej'], variants: ['250 ml', '500 ml', '1 L'], priceRange: [60, 200], emoji: '🧹', tags: ['all purpose cleaner', 'multi surface', 'cleaning'] },
    { baseName: 'Detergent Powder', brands: ['Surf Excel', 'Tide', 'Ariel', 'Rin', 'Nirma', 'Patanjali', 'Ghadi', 'Wheel'], variants: ['500 g', '1 kg', '2 kg', '4 kg'], priceRange: [35, 350], emoji: '🧺', tags: ['detergent', 'washing powder', 'laundry'] },
    { baseName: 'Liquid Detergent', brands: ['Surf Excel', 'Tide', 'Ariel', 'Persil', 'Comfort', 'Genteel'], variants: ['500 ml', '1 L', '2 L'], priceRange: [80, 350], emoji: '🧴', tags: ['liquid detergent', 'laundry', 'washing'] },
    { baseName: 'Fabric Softener', brands: ['Comfort', 'Downy', 'Surf Excel', 'Snuggle', 'Godrej', 'Patanjali'], variants: ['200 ml', '800 ml', '1.6 L'], priceRange: [50, 250], emoji: '🧺', tags: ['fabric softener', 'laundry', 'fragrance'] },
    { baseName: 'Bleach', brands: ['Domex', 'Rin', 'Robin', 'Clorox', 'Dettol', 'Patanjali'], variants: ['500 ml', '1 L', '2 L'], priceRange: [35, 150], emoji: '🧴', tags: ['bleach', 'whitener', 'disinfectant'] },
    { baseName: 'Scrub Pad', brands: ['Scotch-Brite', 'Vim', 'Gala', 'Prestige', 'Amazon Basics', 'Spotzero'], variants: ['Single', '3 Pack', '6 Pack'], priceRange: [15, 100], emoji: '🧽', tags: ['scrub pad', 'sponge', 'kitchen cleaning'] },
    { baseName: 'Sponge', brands: ['Scotch-Brite', 'Gala', 'Spotzero', 'Vim', 'Amazon Basics', 'Prestige'], variants: ['Single', '3 Pack', '6 Pack'], priceRange: [20, 80], emoji: '🧽', tags: ['sponge', 'dish sponge', 'cleaning'] },
    { baseName: 'Broom', brands: ['Gala', 'Scotch-Brite', 'Spotzero', 'Cello', 'Prestige', 'Milton'], variants: ['Single', 'With Handle', 'Set'], priceRange: [60, 350], emoji: '🧹', tags: ['broom', 'sweeping', 'cleaning'] },
    { baseName: 'Mop', brands: ['Gala', 'Scotch-Brite', 'Spotzero', 'Prestige', 'Cello', 'Milton'], variants: ['Flat Mop', 'Spin Mop', 'Mop Refill'], priceRange: [80, 600], emoji: '🧹', tags: ['mop', 'floor cleaning', 'spin mop'] },
    { baseName: 'Dustpan', brands: ['Gala', 'Scotch-Brite', 'Spotzero', 'Cello', 'Milton', 'Amazon Basics'], variants: ['Small', 'Medium', 'With Broom Set'], priceRange: [50, 200], emoji: '🧹', tags: ['dustpan', 'sweeping', 'cleaning'] },
    { baseName: 'Garbage Bags', brands: ['Ezee', 'Hypercity', 'Amazon Basics', 'Presto', 'Nice', 'Sparkle'], variants: ['Small (30 pcs)', 'Medium (15 pcs)', 'Large (10 pcs)', 'XL (5 pcs)'], priceRange: [50, 200], emoji: '🗑️', tags: ['garbage bags', 'trash bags', 'dustbin'] },
    { baseName: 'Zip Lock Bags', brands: ['Ezee', 'Amazon Basics', 'Presto', 'Nice', 'Sparkle', 'Reynolds'], variants: ['Small (25 pcs)', 'Medium (20 pcs)', 'Large (15 pcs)'], priceRange: [60, 180], emoji: '🫙', tags: ['zip lock', 'storage bags', 'food storage'] },
    { baseName: 'Aluminum Foil', brands: ['Ezee', 'Hindalco', 'Amazon Basics', 'Prestige', 'Freshwrapp', 'Reynolds'], variants: ['9 m', '18 m', '25 m'], priceRange: [50, 200], emoji: '🫙', tags: ['aluminum foil', 'cooking', 'wrapping'] },
    { baseName: 'Cling Wrap', brands: ['Ezee', 'Freshwrapp', 'Amazon Basics', 'Prestige', 'Reynolds', 'Glad'], variants: ['30 m', '60 m', '100 m'], priceRange: [60, 200], emoji: '🫙', tags: ['cling wrap', 'food wrap', 'plastic wrap'] },
    { baseName: 'Parchment Paper', brands: ['Ezee', 'Amazon Basics', 'Reynolds', 'Prestige', 'Freshwrapp', 'Glad'], variants: ['5 m', '10 m', '20 m'], priceRange: [70, 250], emoji: '📄', tags: ['parchment paper', 'baking', 'non stick'] },
    { baseName: 'Paper Towels', brands: ['Scott', 'Origami', 'Nice', 'Paseo', 'Amazon Basics', 'Kleenex'], variants: ['2 Rolls', '4 Rolls', '8 Rolls'], priceRange: [80, 350], emoji: '🧻', tags: ['paper towels', 'kitchen towel', 'absorbent'] },
    { baseName: 'Air Freshener', brands: ['Ambi Pur', 'Odonil', 'Godrej Aer', 'Air Wick', 'Glade', 'Room Freshener'], variants: ['75 g', '270 ml', '300 ml'], priceRange: [60, 250], emoji: '🌸', tags: ['air freshener', 'room spray', 'fragrance'] },
    { baseName: 'Room Spray', brands: ['Ambi Pur', 'Godrej Aer', 'Air Wick', 'Glade', 'Odonil', 'Park Avenue'], variants: ['150 ml', '240 ml', '300 ml'], priceRange: [80, 300], emoji: '🌸', tags: ['room spray', 'air freshener', 'fragrance'] },
    { baseName: 'Mosquito Repellent', brands: ['Good Knight', 'All Out', 'Mortein', 'HIT', 'Odomos', 'Maxo'], variants: ['Liquid Refill', 'Coil (10 pcs)', 'Spray 200 ml'], priceRange: [40, 200], emoji: '🦟', tags: ['mosquito', 'repellent', 'insect'] },
    { baseName: 'Insect Killer', brands: ['HIT', 'Mortein', 'Baygon', 'Laxman Rekha', 'Godrej', 'All Out'], variants: ['200 ml', '325 ml', '500 ml'], priceRange: [80, 250], emoji: '🐜', tags: ['insect killer', 'cockroach', 'pest control'] },
    { baseName: 'Naphthalene Balls', brands: ['Odonil', 'Godrej', 'HIT', 'Atom', 'Super', 'Rex'], variants: ['50 g', '100 g', '200 g'], priceRange: [20, 80], emoji: '⚪', tags: ['naphthalene', 'moth balls', 'wardrobe'] },
    { baseName: 'Candles', brands: ['Flipkart SmartBuy', 'Amazon Basics', 'Resonance', 'Ekam', 'Purewick', 'Archies'], variants: ['Pack of 6', 'Pack of 12', 'Scented Set'], priceRange: [60, 400], emoji: '🕯️', tags: ['candles', 'decorative', 'scented'] },
    { baseName: 'Matchbox', brands: ['Ship', 'AVM', 'Homelite', 'Wimco', 'Asian', 'Safety'], variants: ['Single', '10 Pack', '50 Pack'], priceRange: [2, 30], emoji: '🔥', tags: ['matchbox', 'matches', 'fire'] },
    { baseName: 'Lighter', brands: ['Zippo', 'Cricket', 'Bic', 'Neon', 'Classic', 'Clipper'], variants: ['Single', '3 Pack', '5 Pack'], priceRange: [15, 200], emoji: '🔥', tags: ['lighter', 'flame', 'fire'] },
    { baseName: 'Battery', brands: ['Duracell', 'Eveready', 'Panasonic', 'Energizer', 'Nippo', 'Amazon Basics'], variants: ['AA (2 pcs)', 'AAA (2 pcs)', 'AA (4 pcs)', 'AAA (4 pcs)'], priceRange: [30, 200], emoji: '🔋', tags: ['battery', 'AA', 'AAA', 'alkaline'] },
    { baseName: 'Extension Cord', brands: ['Anchor', 'Havells', 'Bajaj', 'GM', 'Cona', 'Syska'], variants: ['1.5 m', '3 m', '5 m'], priceRange: [150, 600], emoji: '🔌', tags: ['extension cord', 'power strip', 'electrical'] },
    { baseName: 'Light Bulb', brands: ['Philips', 'Syska', 'Havells', 'Wipro', 'Bajaj', 'Crompton'], variants: ['7W', '9W', '12W', '15W'], priceRange: [60, 250], emoji: '💡', tags: ['light bulb', 'LED', 'bulb', 'lighting'] },
    { baseName: 'Bucket', brands: ['Milton', 'Cello', 'Nayasa', 'Supreme', 'Varmora', 'Princeware'], variants: ['10 L', '16 L', '20 L'], priceRange: [80, 300], emoji: '🪣', tags: ['bucket', 'bathroom', 'storage'] },
    { baseName: 'Mug', brands: ['Milton', 'Cello', 'Nayasa', 'Supreme', 'Varmora', 'Princeware'], variants: ['1 L', '1.5 L', '2 L'], priceRange: [20, 80], emoji: '🫗', tags: ['mug', 'bathroom mug', 'plastic'] },
    { baseName: 'Dustbin', brands: ['Milton', 'Cello', 'Nayasa', 'Kuber Industries', 'Solimo', 'Princeware'], variants: ['5 L', '10 L', '25 L', '50 L'], priceRange: [80, 500], emoji: '🗑️', tags: ['dustbin', 'trash can', 'waste bin'] },
    { baseName: 'Clothes Hanger', brands: ['Solimo', 'Amazon Basics', 'House of Quirk', 'Kuber', 'Milton', 'Cello'], variants: ['6 pcs', '12 pcs', '24 pcs'], priceRange: [80, 350], emoji: '👔', tags: ['hanger', 'clothes', 'wardrobe'] },
    { baseName: 'Shoe Rack', brands: ['Amazon Basics', 'Solimo', 'Cello', 'Nilkamal', 'Flipkart SmartBuy', 'Kuber'], variants: ['3 Layer', '5 Layer', '8 Layer'], priceRange: [250, 1200], emoji: '👞', tags: ['shoe rack', 'storage', 'organizer'] },
    { baseName: 'Storage Container', brands: ['Milton', 'Cello', 'Nayasa', 'Princeware', 'Signoraware', 'Tupperware'], variants: ['500 ml', '1 L', '2 L', '5 L'], priceRange: [50, 350], emoji: '📦', tags: ['container', 'storage', 'food storage'] },
    { baseName: 'Lunch Box', brands: ['Milton', 'Cello', 'Signoraware', 'Borosil', 'Vaya', 'Tupperware'], variants: ['2 Container', '3 Container', '4 Container'], priceRange: [150, 800], emoji: '🍱', tags: ['lunch box', 'tiffin', 'food container'] },
    { baseName: 'Water Bottle', brands: ['Milton', 'Cello', 'Nayasa', 'Prestige', 'Borosil', 'Signoraware'], variants: ['500 ml', '750 ml', '1 L', '2 L'], priceRange: [80, 500], emoji: '🫗', tags: ['water bottle', 'bottle', 'hydration'] }
  ];

  // ---- BABY CARE ----
  TEMPLATES['baby'] = [
    { baseName: 'Baby Diapers', brands: ['Pampers', 'Huggies', 'MamyPoko', 'Himalaya', 'Luvlap', 'Supples', 'Bumtum', 'Mee Mee'], variants: ['Small (42 pcs)', 'Medium (34 pcs)', 'Large (28 pcs)', 'XL (22 pcs)'], priceRange: [300, 900], emoji: '👶', tags: ['diapers', 'baby', 'nappy'] },
    { baseName: 'Baby Wipes', brands: ['Pampers', 'Huggies', 'Johnson\'s', 'Himalaya', 'Mee Mee', 'Mother Sparsh', 'Luvlap', 'Supples'], variants: ['24 pcs', '72 pcs', '144 pcs'], priceRange: [60, 350], emoji: '🧻', tags: ['baby wipes', 'wet wipes', 'baby'] },
    { baseName: 'Baby Lotion', brands: ['Johnson\'s', 'Himalaya', 'Cetaphil Baby', 'Dove Baby', 'Chicco', 'Pigeon', 'Aveeno Baby', 'Mee Mee'], variants: ['100 ml', '200 ml', '500 ml'], priceRange: [80, 400], emoji: '🧴', tags: ['baby lotion', 'moisturizer', 'baby skin care'] },
    { baseName: 'Baby Oil', brands: ['Johnson\'s', 'Himalaya', 'Dabur Lal Tail', 'Chicco', 'Pigeon', 'Mee Mee', 'Mamaearth', 'Patanjali'], variants: ['100 ml', '200 ml', '500 ml'], priceRange: [60, 350], emoji: '🧴', tags: ['baby oil', 'massage oil', 'baby'] },
    { baseName: 'Baby Shampoo', brands: ['Johnson\'s', 'Himalaya', 'Chicco', 'Pigeon', 'Mamaearth', 'Mee Mee', 'Dove Baby', 'Sebamed'], variants: ['100 ml', '200 ml', '500 ml'], priceRange: [80, 400], emoji: '🧴', tags: ['baby shampoo', 'hair care', 'gentle'] },
    { baseName: 'Baby Soap', brands: ['Johnson\'s', 'Himalaya', 'Chicco', 'Pigeon', 'Dove Baby', 'Mee Mee', 'Sebamed', 'Cetaphil Baby'], variants: ['75 g', '100 g', '3 Pack'], priceRange: [40, 200], emoji: '🧼', tags: ['baby soap', 'bath', 'gentle'] },
    { baseName: 'Baby Powder', brands: ['Johnson\'s', 'Himalaya', 'Mee Mee', 'Pigeon', 'Chicco', 'Patanjali', 'Dabur', 'Mothercare'], variants: ['100 g', '200 g', '400 g'], priceRange: [50, 250], emoji: '🤍', tags: ['baby powder', 'talcum', 'baby care'] },
    { baseName: 'Baby Cream', brands: ['Johnson\'s', 'Himalaya', 'Chicco', 'Pigeon', 'Sebamed', 'Mamaearth', 'Cetaphil Baby', 'Mee Mee'], variants: ['50 g', '100 g', '200 g'], priceRange: [60, 300], emoji: '🧴', tags: ['baby cream', 'skin care', 'baby'] },
    { baseName: 'Diaper Rash Cream', brands: ['Himalaya', 'Johnson\'s', 'Chicco', 'Sebamed', 'Mamaearth', 'Pigeon', 'Sudocrem', 'Mee Mee'], variants: ['20 g', '50 g', '100 g'], priceRange: [60, 350], emoji: '🧴', tags: ['diaper rash', 'rash cream', 'baby care'] },
    { baseName: 'Baby Food Cereal', brands: ['Cerelac', 'Nestum', 'Slurrp Farm', 'Gerber', 'Happa', 'Early Foods', 'ByGrandma', 'Mee Mee'], variants: ['150 g', '300 g', '450 g'], priceRange: [120, 400], emoji: '🥣', tags: ['baby food', 'cereal', 'weaning', 'infant'] },
    { baseName: 'Baby Food Puree', brands: ['Gerber', 'Happa', 'Slurrp Farm', 'Early Foods', 'Nestle', 'ByGrandma', 'Mee Mee', 'Pigeon'], variants: ['100 g', '200 g', '6 Pack'], priceRange: [50, 350], emoji: '🥣', tags: ['baby food', 'puree', 'organic', 'fruit'] },
    { baseName: 'Baby Formula', brands: ['Enfamil', 'Similac', 'Nan Pro', 'Lactogen', 'Dexolac', 'Farex', 'SMA', 'Aptamil'], variants: ['200 g', '400 g', '1 kg'], priceRange: [200, 1200], emoji: '🍼', tags: ['baby formula', 'infant formula', 'milk powder'] },
    { baseName: 'Feeding Bottle', brands: ['Pigeon', 'Chicco', 'Philips Avent', 'Mee Mee', 'Dr. Brown\'s', 'Luvlap', 'Mothercare', 'Tritan'], variants: ['125 ml', '250 ml', '330 ml'], priceRange: [120, 600], emoji: '🍼', tags: ['feeding bottle', 'baby bottle', 'milk bottle'] },
    { baseName: 'Sippy Cup', brands: ['Philips Avent', 'Pigeon', 'Chicco', 'Mee Mee', 'Luvlap', 'Dr. Brown\'s', 'Mothercare', 'Babyhug'], variants: ['150 ml', '200 ml', '300 ml'], priceRange: [150, 500], emoji: '🥤', tags: ['sippy cup', 'training cup', 'baby'] },
    { baseName: 'Pacifier', brands: ['Philips Avent', 'Pigeon', 'Chicco', 'Mee Mee', 'Dr. Brown\'s', 'Luvlap', 'NUK', 'MAM'], variants: ['0-6 months', '6-18 months', '2 Pack'], priceRange: [100, 400], emoji: '👶', tags: ['pacifier', 'soother', 'baby'] },
    { baseName: 'Teether', brands: ['Pigeon', 'Chicco', 'Mee Mee', 'Luvlap', 'Fisher Price', 'Infantino', 'Babyhug', 'Mothercare'], variants: ['Single', '2 Pack', 'Set'], priceRange: [80, 350], emoji: '🦷', tags: ['teether', 'teething', 'baby', 'soothing'] },
    { baseName: 'Baby Blanket', brands: ['Mee Mee', 'Luvlap', 'Babyhug', 'Mothercare', 'Mi Arcus', 'Chicco', 'Carter\'s', 'BabyGo'], variants: ['Single', 'Set of 2', 'Set of 3'], priceRange: [200, 800], emoji: '🧸', tags: ['baby blanket', 'swaddle', 'warm'] },
    { baseName: 'Baby Towel', brands: ['Mee Mee', 'Luvlap', 'Babyhug', 'Mothercare', 'Johnson\'s', 'Chicco', 'BabyGo', 'Pigeon'], variants: ['Single', 'Hooded', 'Set of 2'], priceRange: [150, 500], emoji: '🧸', tags: ['baby towel', 'hooded towel', 'bath'] },
    { baseName: 'Baby Socks', brands: ['Mee Mee', 'Luvlap', 'Babyhug', 'Mothercare', 'Carter\'s', 'Chicco', 'BabyGo', 'Mi Arcus'], variants: ['3 Pack', '6 Pack', '12 Pack'], priceRange: [80, 350], emoji: '🧦', tags: ['baby socks', 'infant', 'feet'] },
    { baseName: 'Baby Mittens', brands: ['Mee Mee', 'Luvlap', 'Babyhug', 'Mothercare', 'Chicco', 'BabyGo', 'Mi Arcus', 'Carter\'s'], variants: ['2 Pack', '4 Pack', '6 Pack'], priceRange: [60, 250], emoji: '🧤', tags: ['baby mittens', 'scratch mittens', 'infant'] },
    { baseName: 'Baby Cap', brands: ['Mee Mee', 'Luvlap', 'Babyhug', 'Mothercare', 'Chicco', 'BabyGo', 'Mi Arcus', 'Carter\'s'], variants: ['Single', '3 Pack', '6 Pack'], priceRange: [50, 200], emoji: '🧢', tags: ['baby cap', 'infant hat', 'newborn'] },
    { baseName: 'Baby Onesie', brands: ['Carter\'s', 'Babyhug', 'Mothercare', 'Mee Mee', 'Luvlap', 'Chicco', 'BabyGo', 'Mi Arcus'], variants: ['Single', '3 Pack', '5 Pack'], priceRange: [150, 700], emoji: '👶', tags: ['onesie', 'romper', 'babywear'] },
    { baseName: 'Baby Bib', brands: ['Mee Mee', 'Luvlap', 'Babyhug', 'Pigeon', 'Chicco', 'Mothercare', 'BabyGo', 'Carter\'s'], variants: ['3 Pack', '6 Pack', '12 Pack'], priceRange: [80, 300], emoji: '🍼', tags: ['bib', 'baby bib', 'feeding'] },
    { baseName: 'Baby Rattle', brands: ['Fisher Price', 'Mee Mee', 'Luvlap', 'Chicco', 'Funskool', 'Babyhug', 'Infantino', 'BabyGo'], variants: ['Single', '3 Pack', 'Set'], priceRange: [80, 350], emoji: '🎵', tags: ['rattle', 'toy', 'baby', 'sound'] },
    { baseName: 'Stacking Toys', brands: ['Fisher Price', 'Mee Mee', 'Funskool', 'Chicco', 'Luvlap', 'Giggles', 'Babyhug', 'Infantino'], variants: ['Small Set', 'Medium Set', 'Large Set'], priceRange: [150, 500], emoji: '🧩', tags: ['stacking toys', 'ring tower', 'baby toy'] },
    { baseName: 'Building Blocks', brands: ['Fisher Price', 'Funskool', 'Mega Bloks', 'Lego Duplo', 'Mee Mee', 'Giggles', 'Babyhug', 'Fun Dough'], variants: ['12 pcs', '24 pcs', '50 pcs'], priceRange: [200, 800], emoji: '🧱', tags: ['building blocks', 'toy', 'educational'] },
    { baseName: 'Soft Toy', brands: ['Fisher Price', 'Mee Mee', 'Luvlap', 'Fun Zoo', 'Babyhug', 'Chicco', 'Disney Baby', 'Mothercare'], variants: ['Small', 'Medium', 'Large'], priceRange: [150, 700], emoji: '🧸', tags: ['soft toy', 'stuffed animal', 'teddy'] },
    { baseName: 'Bath Toy', brands: ['Mee Mee', 'Fisher Price', 'Luvlap', 'Babyhug', 'Chicco', 'Funskool', 'Infantino', 'BabyGo'], variants: ['Single', '3 Pack', 'Bath Set'], priceRange: [100, 400], emoji: '🦆', tags: ['bath toy', 'rubber duck', 'water toy'] },
    { baseName: 'Baby Mat', brands: ['Mee Mee', 'Luvlap', 'Fisher Price', 'Babyhug', 'Chicco', 'Infantino', 'BabyGo', 'Mothercare'], variants: ['Small', 'Medium', 'Large'], priceRange: [300, 1200], emoji: '🧸', tags: ['baby mat', 'play mat', 'activity mat'] },
    { baseName: 'Baby Carrier', brands: ['Luvlap', 'Mee Mee', 'Chicco', 'BabyBjorn', 'R for Rabbit', 'Ergobaby', 'Babyhug', 'Infantino'], variants: ['Basic', 'Ergonomic', 'Hip Seat'], priceRange: [600, 3000], emoji: '👶', tags: ['baby carrier', 'kangaroo bag', 'carrier'] }
  ];

  // ---- FROZEN FOODS ----
  TEMPLATES['frozen'] = [
    { baseName: 'Frozen Peas', brands: ['Safal', 'McCain', 'Mother Dairy', 'Godrej', 'Sumeru', 'ITC', 'BB Popular', 'Hyfun'], variants: ['200 g', '500 g', '1 kg'], priceRange: [30, 120], emoji: '🫛', tags: ['frozen peas', 'green peas', 'vegetable'] },
    { baseName: 'Frozen Corn', brands: ['Safal', 'McCain', 'Mother Dairy', 'Godrej', 'Sumeru', 'ITC', 'BB Popular', 'Hyfun'], variants: ['200 g', '500 g', '1 kg'], priceRange: [35, 130], emoji: '🌽', tags: ['frozen corn', 'sweet corn', 'vegetable'] },
    { baseName: 'Frozen Mixed Veggies', brands: ['Safal', 'McCain', 'Mother Dairy', 'Godrej', 'Sumeru', 'ITC', 'BB Popular', 'Hyfun'], variants: ['200 g', '500 g', '1 kg'], priceRange: [40, 150], emoji: '🥕', tags: ['frozen vegetables', 'mixed veggies', 'ready to cook'] },
    { baseName: 'Frozen French Fries', brands: ['McCain', 'ITC', 'Godrej', 'Hyfun', 'Sumeru', 'Safal', 'Harvest Gold', 'Farm Frites'], variants: ['200 g', '450 g', '750 g', '1.25 kg'], priceRange: [60, 250], emoji: '🍟', tags: ['french fries', 'fries', 'potato', 'snack'] },
    { baseName: 'Frozen Nuggets', brands: ['McCain', 'ITC', 'Godrej', 'Sumeru', 'Hyfun', 'Safal', 'Venky\'s', 'Zorabian'], variants: ['200 g', '450 g', '750 g'], priceRange: [80, 300], emoji: '🍗', tags: ['nuggets', 'chicken nuggets', 'snack'] },
    { baseName: 'Frozen Burger Patty', brands: ['McCain', 'ITC', 'Godrej', 'Sumeru', 'Hyfun', 'Venky\'s', 'Zorabian', 'Licious'], variants: ['2 pcs', '4 pcs', '8 pcs'], priceRange: [80, 350], emoji: '🍔', tags: ['burger patty', 'patty', 'frozen'] },
    { baseName: 'Frozen Samosa', brands: ['ITC', 'Haldiram\'s', 'McCain', 'Godrej', 'Sumeru', 'Safal', 'Bikano', 'Hyfun'], variants: ['4 pcs', '8 pcs', '12 pcs', '24 pcs'], priceRange: [50, 300], emoji: '🔺', tags: ['samosa', 'indian snack', 'frozen'] },
    { baseName: 'Frozen Spring Roll', brands: ['McCain', 'ITC', 'Sumeru', 'Godrej', 'Ching\'s', 'Hyfun', 'Venky\'s', 'Zorabian'], variants: ['4 pcs', '8 pcs', '12 pcs'], priceRange: [60, 250], emoji: '🥟', tags: ['spring roll', 'chinese', 'frozen snack'] },
    { baseName: 'Frozen Paratha', brands: ['ITC', 'McCain', 'Godrej', 'Sumeru', 'Safal', 'Haldiram\'s', 'Mother Dairy', 'Patanjali'], variants: ['3 pcs', '5 pcs', '10 pcs', '20 pcs'], priceRange: [40, 250], emoji: '🫓', tags: ['paratha', 'flatbread', 'breakfast'] },
    { baseName: 'Frozen Naan', brands: ['ITC', 'McCain', 'Godrej', 'Sumeru', 'Haldiram\'s', 'Mother Dairy', 'Safal', 'Hyfun'], variants: ['4 pcs', '8 pcs', '12 pcs'], priceRange: [50, 200], emoji: '🫓', tags: ['naan', 'bread', 'indian'] },
    { baseName: 'Frozen Pizza', brands: ['McCain', 'Dr. Oetker', 'ITC', 'Godrej', 'Sumeru', 'Amul', 'Pizza Hut', 'Dominos'], variants: ['Single (Small)', 'Single (Medium)', 'Single (Large)', '2 Pack'], priceRange: [80, 400], emoji: '🍕', tags: ['pizza', 'frozen pizza', 'cheese'] },
    { baseName: 'Frozen Momos', brands: ['ITC', 'Sumeru', 'Godrej', 'Ching\'s', 'Wo Momo', 'Hyfun', 'McCain', 'Mother Dairy'], variants: ['6 pcs', '12 pcs', '20 pcs'], priceRange: [60, 280], emoji: '🥟', tags: ['momos', 'dumplings', 'steamed'] },
    { baseName: 'Frozen Fish Fingers', brands: ['Sumeru', 'ITC', 'Godrej', 'FreshToHome', 'Licious', 'McCain', 'Venky\'s', 'Zorabian'], variants: ['200 g', '400 g', '1 kg'], priceRange: [120, 450], emoji: '🐟', tags: ['fish fingers', 'fish sticks', 'seafood'] },
    { baseName: 'Frozen Prawns', brands: ['Sumeru', 'Gadre', 'FreshToHome', 'Licious', 'ITC', 'Godrej', 'ZappFresh', 'Cambay Tiger'], variants: ['200 g', '500 g', '1 kg'], priceRange: [150, 800], emoji: '🦐', tags: ['prawns', 'shrimp', 'seafood'] },
    { baseName: 'Frozen Chicken Wings', brands: ['ITC', 'Sumeru', 'Godrej', 'Licious', 'Venky\'s', 'Zorabian', 'FreshToHome', 'Hyfun'], variants: ['250 g', '500 g', '1 kg'], priceRange: [120, 500], emoji: '🍗', tags: ['chicken wings', 'wings', 'frozen'] },
    { baseName: 'Frozen Kebab', brands: ['ITC', 'Sumeru', 'Godrej', 'Licious', 'Venky\'s', 'Zorabian', 'Haldiram\'s', 'FreshToHome'], variants: ['200 g', '400 g', '1 kg'], priceRange: [100, 450], emoji: '🥙', tags: ['kebab', 'seekh kebab', 'frozen'] },
    { baseName: 'Frozen Ice Cream Tub', brands: ['Amul', 'Kwality Walls', 'Baskin Robbins', 'Havmor', 'Vadilal', 'Mother Dairy', 'Naturals', 'Creambell'], variants: ['500 ml', '750 ml', '1 L', '2 L'], priceRange: [80, 500], emoji: '🍦', tags: ['ice cream', 'tub', 'frozen dessert'] },
    { baseName: 'Frozen Ice Cream Bar', brands: ['Amul', 'Kwality Walls', 'Havmor', 'Vadilal', 'Mother Dairy', 'Creambell', 'Cornetto', 'Magnum'], variants: ['Single', '3 Pack', '6 Pack'], priceRange: [20, 250], emoji: '🍦', tags: ['ice cream bar', 'popsicle', 'frozen'] },
    { baseName: 'Frozen Kulfi', brands: ['Amul', 'Mother Dairy', 'Havmor', 'Vadilal', 'Creambell', 'Giani\'s', 'Kwality Walls', 'Naturals'], variants: ['Single', '4 Pack', '6 Pack'], priceRange: [15, 180], emoji: '🍧', tags: ['kulfi', 'indian ice cream', 'malai'] },
    { baseName: 'Frozen Yogurt', brands: ['Cocoberry', 'Amul', 'Mother Dairy', 'Kwality Walls', 'Epigamia', 'Vadilal', 'Naturals', 'Baskin Robbins'], variants: ['100 ml', '250 ml', '500 ml'], priceRange: [50, 250], emoji: '🍦', tags: ['frozen yogurt', 'froyo', 'healthy'] },
    { baseName: 'Frozen Smoothie Pack', brands: ['Raw Pressery', 'True Elements', 'Kapiva', 'Mother Dairy', 'Safal', 'Fruiron', 'Del Monte', 'Tropicana'], variants: ['200 g', '400 g', '1 kg'], priceRange: [100, 350], emoji: '🥤', tags: ['smoothie', 'frozen fruit', 'blend'] },
    { baseName: 'Frozen Berries', brands: ['Safal', 'Mother Dairy', 'Sumeru', 'Del Monte', 'Fruiron', 'Tropicana', 'True Elements', 'Raw Pressery'], variants: ['200 g', '400 g', '1 kg'], priceRange: [120, 500], emoji: '🫐', tags: ['frozen berries', 'blueberry', 'strawberry'] },
    { baseName: 'Frozen Mango Chunks', brands: ['Safal', 'Mother Dairy', 'Sumeru', 'Del Monte', 'Fruiron', 'Tropicana', 'ITC', 'Godrej'], variants: ['200 g', '500 g', '1 kg'], priceRange: [60, 250], emoji: '🥭', tags: ['mango chunks', 'frozen fruit', 'tropical'] },
    { baseName: 'Frozen Roti', brands: ['ITC', 'Godrej', 'Sumeru', 'Safal', 'Mother Dairy', 'Haldiram\'s', 'Patanjali', 'Hyfun'], variants: ['5 pcs', '10 pcs', '20 pcs'], priceRange: [40, 200], emoji: '🫓', tags: ['roti', 'chapati', 'flatbread'] },
    { baseName: 'Frozen Aloo Tikki', brands: ['ITC', 'McCain', 'Godrej', 'Sumeru', 'Haldiram\'s', 'Safal', 'Bikano', 'Hyfun'], variants: ['4 pcs', '8 pcs', '16 pcs'], priceRange: [50, 200], emoji: '🥔', tags: ['aloo tikki', 'potato patty', 'snack'] },
    { baseName: 'Frozen Vada', brands: ['ITC', 'Sumeru', 'Godrej', 'Haldiram\'s', 'Safal', 'McCain', 'Mother Dairy', 'Bikano'], variants: ['4 pcs', '8 pcs', '16 pcs'], priceRange: [40, 180], emoji: '🟤', tags: ['vada', 'medu vada', 'south indian'] },
    { baseName: 'Frozen Cutlet', brands: ['ITC', 'Sumeru', 'Godrej', 'McCain', 'Venky\'s', 'Zorabian', 'Licious', 'Hyfun'], variants: ['4 pcs', '8 pcs', '12 pcs'], priceRange: [60, 250], emoji: '🟤', tags: ['cutlet', 'veg cutlet', 'frozen snack'] },
    { baseName: 'Frozen Cheese Balls', brands: ['McCain', 'ITC', 'Sumeru', 'Godrej', 'Hyfun', 'Amul', 'Cheese Burst', 'Safal'], variants: ['200 g', '400 g', '750 g'], priceRange: [80, 300], emoji: '🧀', tags: ['cheese balls', 'frozen snack', 'cheese'] },
    { baseName: 'Frozen Garlic Bread', brands: ['McCain', 'ITC', 'Godrej', 'Sumeru', 'Dr. Oetker', 'Amul', 'Pizza Hut', 'Hyfun'], variants: ['2 pcs', '4 pcs', '8 pcs'], priceRange: [60, 250], emoji: '🧄', tags: ['garlic bread', 'cheesy', 'frozen'] },
    { baseName: 'Frozen Waffle', brands: ['McCain', 'ITC', 'Godrej', 'Dr. Oetker', 'Hyfun', 'Pillsbury', 'Betty Crocker', 'Sumeru'], variants: ['4 pcs', '8 pcs', '12 pcs'], priceRange: [100, 350], emoji: '🧇', tags: ['waffle', 'breakfast', 'frozen'] },
    { baseName: 'Frozen Pancake', brands: ['ITC', 'Godrej', 'Dr. Oetker', 'Hyfun', 'McCain', 'Pillsbury', 'Betty Crocker', 'Sumeru'], variants: ['4 pcs', '8 pcs', '12 pcs'], priceRange: [80, 300], emoji: '🥞', tags: ['pancake', 'breakfast', 'frozen'] },
    { baseName: 'Frozen Dosa', brands: ['ITC', 'Sumeru', 'Godrej', 'Safal', 'Mother Dairy', 'Haldiram\'s', 'MTR', 'Hyfun'], variants: ['4 pcs', '8 pcs', '12 pcs'], priceRange: [50, 200], emoji: '🫓', tags: ['dosa', 'south indian', 'breakfast'] },
    { baseName: 'Frozen Idli', brands: ['ITC', 'Sumeru', 'Godrej', 'Safal', 'Mother Dairy', 'Haldiram\'s', 'MTR', 'Hyfun'], variants: ['6 pcs', '12 pcs', '24 pcs'], priceRange: [40, 180], emoji: '⚪', tags: ['idli', 'south indian', 'breakfast'] },
    { baseName: 'Frozen Dhokla', brands: ['ITC', 'Haldiram\'s', 'Gits', 'Sumeru', 'Godrej', 'Bikano', 'Mother Dairy', 'Safal'], variants: ['4 pcs', '8 pcs', '12 pcs'], priceRange: [40, 150], emoji: '🟡', tags: ['dhokla', 'gujarati', 'snack'] },
    { baseName: 'Frozen Ravioli', brands: ['ITC', 'Dr. Oetker', 'Godrej', 'Del Monte', 'Sumeru', 'Barilla', 'McCain', 'Hyfun'], variants: ['200 g', '400 g', '750 g'], priceRange: [120, 400], emoji: '🥟', tags: ['ravioli', 'pasta', 'italian'] }
  ];

  // ---- MEAT & SEAFOOD ----
  TEMPLATES['meat'] = [
    { baseName: 'Chicken Breast', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Godrej Real Good', 'Venky\'s', 'IB Group'], variants: ['250 g', '500 g', '1 kg'], priceRange: [120, 350], emoji: '🍗', tags: ['chicken', 'breast', 'boneless', 'protein'] },
    { baseName: 'Chicken Thigh', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Godrej Real Good', 'Venky\'s', 'IB Group'], variants: ['250 g', '500 g', '1 kg'], priceRange: [100, 280], emoji: '🍗', tags: ['chicken', 'thigh', 'bone-in', 'protein'] },
    { baseName: 'Chicken Wings', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Godrej Real Good', 'Venky\'s', 'IB Group'], variants: ['250 g', '500 g', '1 kg'], priceRange: [80, 250], emoji: '🍗', tags: ['chicken', 'wings', 'snack'] },
    { baseName: 'Whole Chicken', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Godrej Real Good', 'Venky\'s', 'IB Group'], variants: ['500 g', '1 kg', '1.5 kg'], priceRange: [150, 450], emoji: '🐔', tags: ['chicken', 'whole', 'roast'] },
    { baseName: 'Chicken Drumstick', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Godrej Real Good', 'Venky\'s', 'IB Group'], variants: ['250 g', '500 g', '1 kg'], priceRange: [80, 260], emoji: '🍗', tags: ['chicken', 'drumstick', 'leg'] },
    { baseName: 'Chicken Mince', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Godrej Real Good', 'Venky\'s', 'IB Group'], variants: ['250 g', '500 g', '1 kg'], priceRange: [100, 300], emoji: '🍖', tags: ['chicken', 'mince', 'keema'] },
    { baseName: 'Mutton Curry Cut', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Star Meats', 'TenderCuts', 'Meat Basket'], variants: ['250 g', '500 g', '1 kg'], priceRange: [200, 700], emoji: '🥩', tags: ['mutton', 'curry cut', 'goat'] },
    { baseName: 'Mutton Mince', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Star Meats', 'TenderCuts', 'Meat Basket'], variants: ['250 g', '500 g', '1 kg'], priceRange: [220, 750], emoji: '🥩', tags: ['mutton', 'mince', 'keema'] },
    { baseName: 'Mutton Chops', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Star Meats', 'TenderCuts', 'Meat Basket'], variants: ['250 g', '500 g', '1 kg'], priceRange: [250, 800], emoji: '🥩', tags: ['mutton', 'chops', 'premium'] },
    { baseName: 'Lamb Leg', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Star Meats', 'TenderCuts', 'Meat Basket'], variants: ['500 g', '1 kg', '2 kg'], priceRange: [300, 1200], emoji: '🍖', tags: ['lamb', 'leg', 'roast'] },
    { baseName: 'Goat Liver', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Star Meats', 'TenderCuts', 'Meat Basket'], variants: ['250 g', '500 g', '1 kg'], priceRange: [120, 400], emoji: '🥩', tags: ['goat', 'liver', 'organ meat'] },
    { baseName: 'Eggs (Farm)', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Kegg Farms', 'Happy Hens', 'Country Eggs'], variants: ['6 pcs', '12 pcs', '30 pcs'], priceRange: [50, 280], emoji: '🥚', tags: ['eggs', 'farm eggs', 'free range'] },
    { baseName: 'Fish Rohu', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Gadre', 'Star Fish', 'Cambay Tiger'], variants: ['250 g', '500 g', '1 kg'], priceRange: [80, 300], emoji: '🐟', tags: ['rohu', 'fish', 'freshwater'] },
    { baseName: 'Fish Pomfret', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Gadre', 'Star Fish', 'Cambay Tiger'], variants: ['250 g', '500 g', '1 kg'], priceRange: [200, 800], emoji: '🐟', tags: ['pomfret', 'fish', 'premium'] },
    { baseName: 'Fish Surmai', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Gadre', 'Star Fish', 'Cambay Tiger'], variants: ['250 g', '500 g', '1 kg'], priceRange: [250, 900], emoji: '🐟', tags: ['surmai', 'king fish', 'seer fish'] },
    { baseName: 'Prawns', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Gadre', 'Cambay Tiger', 'Star Fish'], variants: ['250 g', '500 g', '1 kg'], priceRange: [200, 800], emoji: '🦐', tags: ['prawns', 'shrimp', 'seafood'] },
    { baseName: 'Crab', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Gadre', 'Cambay Tiger', 'Star Fish'], variants: ['250 g', '500 g', '1 kg'], priceRange: [150, 600], emoji: '🦀', tags: ['crab', 'seafood', 'shellfish'] },
    { baseName: 'Squid', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Gadre', 'Cambay Tiger', 'Star Fish'], variants: ['250 g', '500 g', '1 kg'], priceRange: [150, 500], emoji: '🦑', tags: ['squid', 'calamari', 'seafood'] },
    { baseName: 'Salmon', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Cambay Tiger', 'Gadre', 'Pescafresh'], variants: ['200 g', '500 g', '1 kg'], priceRange: [500, 2500], emoji: '🐟', tags: ['salmon', 'fish', 'imported', 'premium'] },
    { baseName: 'Tuna', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Cambay Tiger', 'Gadre', 'Pescafresh'], variants: ['200 g', '500 g', '1 kg'], priceRange: [300, 1500], emoji: '🐟', tags: ['tuna', 'fish', 'protein'] },
    { baseName: 'Sardine', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Gadre', 'Cambay Tiger', 'Star Fish'], variants: ['250 g', '500 g', '1 kg'], priceRange: [80, 300], emoji: '🐟', tags: ['sardine', 'fish', 'omega 3'] },
    { baseName: 'Mackerel', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Gadre', 'Cambay Tiger', 'Star Fish'], variants: ['250 g', '500 g', '1 kg'], priceRange: [100, 350], emoji: '🐟', tags: ['mackerel', 'bangda', 'fish'] },
    { baseName: 'Pork Chop', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Star Meats', 'TenderCuts', 'Meat Basket'], variants: ['250 g', '500 g', '1 kg'], priceRange: [200, 600], emoji: '🥩', tags: ['pork', 'chop', 'meat'] },
    { baseName: 'Bacon', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Zorabian', 'Venky\'s', 'Godrej'], variants: ['150 g', '250 g', '500 g'], priceRange: [200, 600], emoji: '🥓', tags: ['bacon', 'pork', 'breakfast'] },
    { baseName: 'Sausages', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Zorabian', 'Venky\'s', 'Godrej'], variants: ['200 g', '400 g', '1 kg'], priceRange: [120, 450], emoji: '🌭', tags: ['sausages', 'hot dog', 'pork'] },
    { baseName: 'Salami', brands: ['Licious', 'FreshToHome', 'Zorabian', 'Godrej', 'Venky\'s', 'Meat Basket'], variants: ['100 g', '250 g', '500 g'], priceRange: [150, 500], emoji: '🥩', tags: ['salami', 'cold cuts', 'deli'] },
    { baseName: 'Ham', brands: ['Licious', 'FreshToHome', 'Zorabian', 'Godrej', 'Venky\'s', 'Meat Basket'], variants: ['100 g', '250 g', '500 g'], priceRange: [150, 500], emoji: '🥩', tags: ['ham', 'cold cuts', 'deli'] },
    { baseName: 'Turkey', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Godrej', 'Venky\'s', 'Star Meats'], variants: ['250 g', '500 g', '1 kg'], priceRange: [250, 900], emoji: '🦃', tags: ['turkey', 'poultry', 'lean meat'] },
    { baseName: 'Duck', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Star Meats', 'TenderCuts', 'Meat Basket'], variants: ['250 g', '500 g', '1 kg'], priceRange: [300, 1000], emoji: '🦆', tags: ['duck', 'poultry', 'gourmet'] },
    { baseName: 'Quail', brands: ['Licious', 'FreshToHome', 'ZappFresh', 'Star Meats', 'TenderCuts', 'Meat Basket'], variants: ['250 g', '500 g', '1 kg'], priceRange: [250, 800], emoji: '🐦', tags: ['quail', 'poultry', 'game bird'] }
  ];

  // ---- BAKERY ----
  TEMPLATES['bakery'] = [
    { baseName: 'White Bread', brands: ['Britannia', 'Harvest Gold', 'English Oven', 'Modern', 'Bonn', 'Wibs', 'Spencer\'s', 'Amul'], variants: ['200 g', '400 g', '800 g'], priceRange: [25, 55], emoji: '🍞', tags: ['bread', 'white bread', 'sandwich'] },
    { baseName: 'Brown Bread', brands: ['Britannia', 'Harvest Gold', 'English Oven', 'Modern', 'Bonn', 'Wibs', 'Spencer\'s', 'Amul'], variants: ['200 g', '400 g', '800 g'], priceRange: [30, 65], emoji: '🍞', tags: ['bread', 'brown bread', 'whole wheat'] },
    { baseName: 'Multigrain Bread', brands: ['Britannia', 'Harvest Gold', 'English Oven', 'Modern', 'Bonn', 'Wibs', 'Spencer\'s', 'Amul'], variants: ['200 g', '400 g', '800 g'], priceRange: [35, 75], emoji: '🍞', tags: ['bread', 'multigrain', 'healthy'] },
    { baseName: 'Pav Bun', brands: ['Britannia', 'Harvest Gold', 'Modern', 'English Oven', 'Bonn', 'Wibs'], variants: ['4 pcs', '6 pcs', '12 pcs'], priceRange: [20, 60], emoji: '🍔', tags: ['pav', 'bun', 'bread roll'] },
    { baseName: 'Burger Bun', brands: ['Britannia', 'Harvest Gold', 'English Oven', 'Modern', 'Bonn', 'Theobroma'], variants: ['2 pcs', '4 pcs', '8 pcs'], priceRange: [25, 80], emoji: '🍔', tags: ['burger bun', 'sesame', 'bread'] },
    { baseName: 'Hot Dog Roll', brands: ['Britannia', 'Harvest Gold', 'English Oven', 'Modern', 'Bonn', 'Wibs'], variants: ['2 pcs', '4 pcs', '8 pcs'], priceRange: [25, 70], emoji: '🌭', tags: ['hot dog roll', 'finger roll', 'bread'] },
    { baseName: 'Croissant', brands: ['Theobroma', 'English Oven', 'Britannia', 'Harvest Gold', 'French Loaf', 'Monginis'], variants: ['Single', '3 Pack', '6 Pack'], priceRange: [30, 250], emoji: '🥐', tags: ['croissant', 'french', 'pastry'] },
    { baseName: 'Muffin Chocolate', brands: ['Theobroma', 'Monginis', 'Britannia', 'Harvest Gold', 'Winkies', 'English Oven'], variants: ['Single', '4 Pack', '6 Pack'], priceRange: [25, 200], emoji: '🧁', tags: ['muffin', 'chocolate', 'cupcake'] },
    { baseName: 'Muffin Blueberry', brands: ['Theobroma', 'Monginis', 'Britannia', 'Harvest Gold', 'Winkies', 'English Oven'], variants: ['Single', '4 Pack', '6 Pack'], priceRange: [30, 220], emoji: '🧁', tags: ['muffin', 'blueberry', 'fruit'] },
    { baseName: 'Cupcake', brands: ['Theobroma', 'Monginis', 'Winkies', 'Britannia', 'Harvest Gold', 'Modern'], variants: ['Single', '4 Pack', '6 Pack'], priceRange: [25, 250], emoji: '🧁', tags: ['cupcake', 'frosted', 'decorated'] },
    { baseName: 'Birthday Cake', brands: ['Theobroma', 'Monginis', 'Cakezone', 'Ribbons & Balloons', 'FNP Cakes', 'Winni'], variants: ['500 g', '1 kg', '2 kg'], priceRange: [250, 1500], emoji: '🎂', tags: ['birthday cake', 'celebration', 'party'] },
    { baseName: 'Pastry', brands: ['Theobroma', 'Monginis', 'Winkies', 'Ribbons & Balloons', 'Modern', 'Harvest Gold'], variants: ['Single', '3 Pack', '6 Pack'], priceRange: [30, 300], emoji: '🍰', tags: ['pastry', 'cream', 'dessert'] },
    { baseName: 'Puff', brands: ['Monginis', 'Theobroma', 'Britannia', 'Modern', 'Winkies', 'Harvest Gold'], variants: ['Single', '4 Pack', '8 Pack'], priceRange: [15, 120], emoji: '🫓', tags: ['puff', 'veg puff', 'pastry'] },
    { baseName: 'Khari', brands: ['Monginis', 'Britannia', 'Modern', 'Bisk Farm', 'Harvest Gold', 'Parle'], variants: ['100 g', '200 g', '400 g'], priceRange: [25, 80], emoji: '🫓', tags: ['khari', 'puff biscuit', 'tea time'] },
    { baseName: 'Toast', brands: ['Britannia', 'Modern', 'Harvest Gold', 'English Oven', 'Bonn', 'Wibs'], variants: ['150 g', '300 g', '600 g'], priceRange: [25, 80], emoji: '🍞', tags: ['toast', 'milk toast', 'bread'] },
    { baseName: 'Rusk', brands: ['Britannia', 'Parle', 'Modern', 'Harvest Gold', 'Priyagold', 'English Oven'], variants: ['200 g', '400 g', '600 g'], priceRange: [30, 90], emoji: '🍞', tags: ['rusk', 'suji rusk', 'tea time'] },
    { baseName: 'Cookie Chocolate Chip', brands: ['Unibic', 'Britannia', 'Karachi Bakery', 'Theobroma', 'Milano', 'McVitie\'s'], variants: ['75 g', '150 g', '300 g'], priceRange: [40, 250], emoji: '🍪', tags: ['cookie', 'chocolate chip', 'baked'] },
    { baseName: 'Cookie Butter', brands: ['Unibic', 'Britannia Good Day', 'Karachi Bakery', 'Theobroma', 'Milano', 'McVitie\'s'], variants: ['75 g', '150 g', '300 g'], priceRange: [35, 200], emoji: '🍪', tags: ['cookie', 'butter', 'baked'] },
    { baseName: 'Brownie', brands: ['Theobroma', 'Monginis', 'Britannia', 'Unibic', 'Winkies', 'Modern'], variants: ['Single', '4 Pack', '6 Pack'], priceRange: [30, 300], emoji: '🟫', tags: ['brownie', 'chocolate', 'fudge'] },
    { baseName: 'Doughnut', brands: ['Monginis', 'Dunkin', 'Mad Over Donuts', 'Theobroma', 'Winkies', 'Modern'], variants: ['Single', '3 Pack', '6 Pack'], priceRange: [25, 300], emoji: '🍩', tags: ['doughnut', 'donut', 'glazed'] },
    { baseName: 'Danish Pastry', brands: ['Theobroma', 'Monginis', 'English Oven', 'French Loaf', 'Harvest Gold', 'Modern'], variants: ['Single', '3 Pack', '6 Pack'], priceRange: [40, 350], emoji: '🥐', tags: ['danish', 'pastry', 'flaky'] },
    { baseName: 'Focaccia', brands: ['Theobroma', 'English Oven', 'French Loaf', 'Harvest Gold', 'Modern', 'Monginis'], variants: ['200 g', '400 g', '600 g'], priceRange: [80, 300], emoji: '🍞', tags: ['focaccia', 'italian bread', 'olive'] },
    { baseName: 'Baguette', brands: ['English Oven', 'Theobroma', 'French Loaf', 'Harvest Gold', 'Modern', 'Monginis'], variants: ['Single', '2 Pack', '4 Pack'], priceRange: [40, 200], emoji: '🥖', tags: ['baguette', 'french bread', 'crusty'] },
    { baseName: 'Garlic Bread', brands: ['Britannia', 'English Oven', 'Monginis', 'Harvest Gold', 'Theobroma', 'Modern'], variants: ['2 pcs', '4 pcs', '8 pcs'], priceRange: [50, 200], emoji: '🧄', tags: ['garlic bread', 'cheesy', 'snack'] },
    { baseName: 'Pizza Base', brands: ['Dr. Oetker', 'Britannia', 'English Oven', 'Harvest Gold', 'Weikfield', 'Pillsbury'], variants: ['2 pcs', '4 pcs', '8 pcs'], priceRange: [60, 250], emoji: '🍕', tags: ['pizza base', 'crust', 'flatbread'] },
    { baseName: 'Cake Mix', brands: ['Betty Crocker', 'Pillsbury', 'Dr. Oetker', 'Weikfield', 'Morde', 'Britannia'], variants: ['225 g', '450 g', '1 kg'], priceRange: [80, 350], emoji: '🍰', tags: ['cake mix', 'baking', 'instant'] },
    { baseName: 'Pancake Mix', brands: ['Pillsbury', 'Betty Crocker', 'Dr. Oetker', 'Slurrp Farm', 'Weikfield', 'Gits'], variants: ['200 g', '400 g', '1 kg'], priceRange: [80, 300], emoji: '🥞', tags: ['pancake mix', 'breakfast', 'batter'] },
    { baseName: 'Waffle Mix', brands: ['Pillsbury', 'Betty Crocker', 'Dr. Oetker', 'Weikfield', 'Slurrp Farm', 'Gits'], variants: ['200 g', '400 g', '1 kg'], priceRange: [100, 350], emoji: '🧇', tags: ['waffle mix', 'breakfast', 'batter'] },
    { baseName: 'Bread Crumbs', brands: ['Urban Platter', 'Weikfield', 'Del Monte', 'Amazon Basics', 'Britannia', 'English Oven'], variants: ['200 g', '500 g', '1 kg'], priceRange: [50, 200], emoji: '🍞', tags: ['bread crumbs', 'coating', 'baking'] },
    { baseName: 'Pie Crust', brands: ['Pillsbury', 'Dr. Oetker', 'Weikfield', 'Betty Crocker', 'English Oven', 'Britannia'], variants: ['200 g', '400 g', '2 Pack'], priceRange: [80, 280], emoji: '🥧', tags: ['pie crust', 'tart', 'baking'] }
  ];

  // ---- HEALTH & WELLNESS ----
  TEMPLATES['health'] = [
    { baseName: 'Multivitamin', brands: ['MuscleBlaze', 'Oziva', 'Himalaya', 'HealthKart', 'Centrum', 'GNC', 'Nature Made', 'One A Day'], variants: ['30 Tablets', '60 Tablets', '120 Tablets'], priceRange: [200, 900], emoji: '💊', tags: ['multivitamin', 'supplement', 'daily'] },
    { baseName: 'Vitamin C', brands: ['Limcee', 'Oziva', 'HealthKart', 'Himalaya', 'Nature Made', 'NOW Foods', 'Amway', 'Fast&Up'], variants: ['30 Tablets', '60 Tablets', '120 Tablets'], priceRange: [120, 600], emoji: '🍊', tags: ['vitamin c', 'immunity', 'antioxidant'] },
    { baseName: 'Vitamin D', brands: ['HealthKart', 'Oziva', 'Himalaya', 'Nature Made', 'NOW Foods', 'GNC', 'Amway', 'Fast&Up'], variants: ['30 Tablets', '60 Tablets', '120 Tablets'], priceRange: [150, 700], emoji: '☀️', tags: ['vitamin d', 'bones', 'sunshine vitamin'] },
    { baseName: 'Calcium Tablets', brands: ['Shelcal', 'HealthKart', 'Himalaya', 'Oziva', 'Nature Made', 'GNC', 'Amway', 'Dabur'], variants: ['30 Tablets', '60 Tablets', '120 Tablets'], priceRange: [150, 600], emoji: '🦴', tags: ['calcium', 'bones', 'supplement'] },
    { baseName: 'Iron Supplement', brands: ['Fefol', 'HealthKart', 'Himalaya', 'Oziva', 'Nature Made', 'GNC', 'Dabur', 'Baidyanath'], variants: ['30 Tablets', '60 Tablets', '120 Tablets'], priceRange: [120, 500], emoji: '💪', tags: ['iron', 'anemia', 'supplement', 'hemoglobin'] },
    { baseName: 'Omega 3', brands: ['MuscleBlaze', 'HealthKart', 'Oziva', 'Himalaya', 'Nature Made', 'GNC', 'NOW Foods', 'TrueBasics'], variants: ['30 Softgels', '60 Softgels', '120 Softgels'], priceRange: [250, 1200], emoji: '🐟', tags: ['omega 3', 'fish oil', 'heart health'] },
    { baseName: 'Fish Oil', brands: ['MuscleBlaze', 'HealthKart', 'Nature Made', 'GNC', 'NOW Foods', 'TrueBasics', 'Oziva', 'Himalaya'], variants: ['60 Softgels', '120 Softgels', '180 Softgels'], priceRange: [200, 1000], emoji: '🐟', tags: ['fish oil', 'EPA DHA', 'supplement'] },
    { baseName: 'Biotin', brands: ['Oziva', 'HealthKart', 'Himalaya', 'WOW', 'MuscleBlaze', 'Fast&Up', 'Carbamide Forte', 'Nature Made'], variants: ['30 Tablets', '60 Tablets', '120 Tablets'], priceRange: [200, 800], emoji: '💇', tags: ['biotin', 'hair', 'nails', 'skin'] },
    { baseName: 'Zinc', brands: ['HealthKart', 'Oziva', 'Himalaya', 'Nature Made', 'NOW Foods', 'GNC', 'Fast&Up', 'Dabur'], variants: ['30 Tablets', '60 Tablets', '120 Tablets'], priceRange: [100, 450], emoji: '💊', tags: ['zinc', 'immunity', 'supplement'] },
    { baseName: 'Magnesium', brands: ['HealthKart', 'Oziva', 'Nature Made', 'NOW Foods', 'GNC', 'Fast&Up', 'Himalaya', 'MuscleBlaze'], variants: ['30 Tablets', '60 Tablets', '120 Tablets'], priceRange: [150, 600], emoji: '💊', tags: ['magnesium', 'muscle', 'sleep', 'supplement'] },
    { baseName: 'Probiotics', brands: ['Yakult', 'HealthKart', 'Oziva', 'Himalaya', 'GNC', 'Carbamide Forte', 'Dr. Morepen', 'Amway'], variants: ['15 Capsules', '30 Capsules', '60 Capsules'], priceRange: [200, 900], emoji: '🦠', tags: ['probiotics', 'gut health', 'digestive'] },
    { baseName: 'Digestive Enzyme', brands: ['Himalaya', 'Dabur', 'HealthKart', 'Oziva', 'NOW Foods', 'GNC', 'Zenith', 'Baidyanath'], variants: ['30 Tablets', '60 Tablets', '120 Tablets'], priceRange: [150, 600], emoji: '🫁', tags: ['digestive enzyme', 'digestion', 'supplement'] },
    { baseName: 'Protein Powder (Whey)', brands: ['MuscleBlaze', 'Oziva', 'ON (Optimum Nutrition)', 'MyProtein', 'MuscleTech', 'Dymatize', 'GNC', 'Isopure'], variants: ['500 g', '1 kg', '2 kg', '4 kg'], priceRange: [600, 5000], emoji: '💪', tags: ['whey protein', 'protein', 'gym', 'muscle'] },
    { baseName: 'Protein Powder (Plant)', brands: ['Oziva', 'MuscleBlaze', 'Organic India', 'Himalaya', 'True Elements', 'Plix', 'Kapiva', 'Boldfit'], variants: ['500 g', '1 kg', '2 kg'], priceRange: [700, 3500], emoji: '🌱', tags: ['plant protein', 'vegan', 'pea protein'] },
    { baseName: 'Mass Gainer', brands: ['MuscleBlaze', 'ON', 'MuscleTech', 'Dymatize', 'GNC', 'Labrada', 'BigMuscles', 'Myprotein'], variants: ['1 kg', '2.7 kg', '5 kg'], priceRange: [500, 4000], emoji: '💪', tags: ['mass gainer', 'weight gain', 'bulking'] },
    { baseName: 'BCAA', brands: ['MuscleBlaze', 'ON', 'MuscleTech', 'Scivation', 'Fast&Up', 'Big Muscles', 'GNC', 'Myprotein'], variants: ['250 g', '400 g', '1 kg'], priceRange: [400, 2000], emoji: '💪', tags: ['bcaa', 'amino acids', 'recovery', 'gym'] },
    { baseName: 'Pre Workout', brands: ['MuscleBlaze', 'ON', 'MuscleTech', 'C4', 'Fast&Up', 'Big Muscles', 'GNC', 'Myprotein'], variants: ['200 g', '400 g', '600 g'], priceRange: [400, 2500], emoji: '⚡', tags: ['pre workout', 'energy', 'gym', 'caffeine'] },
    { baseName: 'Protein Bar', brands: ['Yoga Bar', 'MuscleBlaze', 'RiteBite', 'Oziva', 'Max Protein', 'Mojo Bar', 'ON', 'MyProtein'], variants: ['Single', '6 Pack', '12 Pack'], priceRange: [40, 800], emoji: '💪', tags: ['protein bar', 'fitness snack', 'gym'] },
    { baseName: 'Energy Gel', brands: ['Fast&Up', 'GU', 'SiS', 'Endura', 'MuscleBlaze', 'Enerzal', 'Unived', 'GNC'], variants: ['Single', '6 Pack', '12 Pack'], priceRange: [60, 600], emoji: '⚡', tags: ['energy gel', 'running', 'endurance'] },
    { baseName: 'Electrolyte Powder', brands: ['Fast&Up', 'ORS', 'Enerzal', 'Glucon-D', 'MuscleBlaze', 'GNC', 'Unived', 'Gatorade'], variants: ['10 Sachets', '20 Sachets', '1 kg'], priceRange: [100, 600], emoji: '💧', tags: ['electrolyte', 'hydration', 'sports'] },
    { baseName: 'Green Tea Extract', brands: ['Organic India', 'Himalaya', 'WOW', 'HealthKart', 'Oziva', 'NOW Foods', 'GNC', 'True Elements'], variants: ['30 Capsules', '60 Capsules', '120 Capsules'], priceRange: [150, 700], emoji: '🍵', tags: ['green tea extract', 'antioxidant', 'fat burn'] },
    { baseName: 'Ashwagandha', brands: ['Himalaya', 'Dabur', 'Patanjali', 'Organic India', 'Kapiva', 'Baidyanath', 'HealthKart', 'WOW'], variants: ['30 Tablets', '60 Tablets', '120 Tablets'], priceRange: [120, 500], emoji: '🌿', tags: ['ashwagandha', 'adaptogen', 'stress', 'ayurvedic'] },
    { baseName: 'Turmeric Supplement', brands: ['Himalaya', 'Organic India', 'Dabur', 'Kapiva', 'WOW', 'HealthKart', 'NOW Foods', 'Nature Made'], variants: ['30 Capsules', '60 Capsules', '120 Capsules'], priceRange: [150, 600], emoji: '🟡', tags: ['turmeric', 'curcumin', 'anti inflammatory'] },
    { baseName: 'Tulsi Drops', brands: ['Organic India', 'Dabur', 'Himalaya', 'Patanjali', 'Kapiva', 'Baidyanath', 'Krishna\'s', 'Apollo'], variants: ['20 ml', '30 ml', '60 ml'], priceRange: [80, 250], emoji: '🌿', tags: ['tulsi', 'holy basil', 'immunity'] },
    { baseName: 'Giloy Juice', brands: ['Patanjali', 'Dabur', 'Kapiva', 'Baidyanath', 'Himalaya', 'Organic India', 'Krishna\'s', 'Jiva'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [80, 300], emoji: '🌿', tags: ['giloy', 'immunity', 'ayurvedic'] },
    { baseName: 'Amla Juice', brands: ['Patanjali', 'Dabur', 'Kapiva', 'Baidyanath', 'Himalaya', 'Organic India', 'Krishna\'s', 'Jiva'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [60, 250], emoji: '🟢', tags: ['amla', 'indian gooseberry', 'vitamin c'] },
    { baseName: 'Triphala', brands: ['Himalaya', 'Dabur', 'Patanjali', 'Baidyanath', 'Organic India', 'Kapiva', 'Jiva', 'Zandu'], variants: ['30 Tablets', '60 Tablets', '120 Tablets', '500 g Powder'], priceRange: [80, 350], emoji: '🌿', tags: ['triphala', 'digestive', 'ayurvedic'] },
    { baseName: 'Chyawanprash', brands: ['Dabur', 'Patanjali', 'Baidyanath', 'Zandu', 'Himalaya', 'Emami', 'Jiva', 'Multani'], variants: ['250 g', '500 g', '1 kg', '2 kg'], priceRange: [100, 550], emoji: '🫙', tags: ['chyawanprash', 'immunity', 'ayurvedic'] },
    { baseName: 'Honey (Organic)', brands: ['Dabur', 'Patanjali', '24 Mantra', 'Organic India', 'Under The Mango Tree', 'Societe Naturelle', 'Indigenous Honey', 'Conscious Food'], variants: ['250 g', '500 g', '1 kg'], priceRange: [200, 800], emoji: '🍯', tags: ['organic honey', 'raw honey', 'natural'] },
    { baseName: 'Apple Cider Vinegar', brands: ['WOW', 'Bragg', 'HealthKart', 'Kapiva', 'St.Botanica', 'Dabur', 'Neuherbs', 'Saffola'], variants: ['250 ml', '500 ml', '750 ml'], priceRange: [150, 550], emoji: '🍎', tags: ['apple cider vinegar', 'ACV', 'detox', 'weight loss'] },
    { baseName: 'Flax Seeds', brands: ['True Elements', 'Organic India', 'NourishVitals', 'Happilo', 'Farmley', 'Urban Platter', 'Nourish Vitals', 'Fitness Mantra'], variants: ['150 g', '300 g', '500 g', '1 kg'], priceRange: [80, 350], emoji: '🌾', tags: ['flax seeds', 'omega 3', 'fiber'] },
    { baseName: 'Chia Seeds', brands: ['True Elements', 'Organic India', 'NourishVitals', 'Happilo', 'Farmley', 'Urban Platter', 'Sorich Organics', 'Raw Essentials'], variants: ['150 g', '250 g', '500 g', '1 kg'], priceRange: [120, 600], emoji: '🌰', tags: ['chia seeds', 'superfood', 'omega 3'] },
    { baseName: 'Quinoa', brands: ['True Elements', 'Organic India', 'India Gate', 'Urban Platter', 'Happilo', 'NourishVitals', 'Fitness Mantra', 'Organic Tattva'], variants: ['250 g', '500 g', '1 kg'], priceRange: [150, 600], emoji: '🌾', tags: ['quinoa', 'superfood', 'protein', 'gluten free'] },
    { baseName: 'Brown Rice (Organic)', brands: ['India Gate', '24 Mantra', 'Organic Tattva', 'Pro Nature', 'True Elements', 'Daawat', 'Tata Sampann', 'Fortune'], variants: ['500 g', '1 kg', '5 kg'], priceRange: [60, 350], emoji: '🍚', tags: ['brown rice', 'organic', 'whole grain'] },
    { baseName: 'Organic Ghee', brands: ['Amul', 'Anveshan', 'Two Brothers', '24 Mantra', 'Organic India', 'Pro Nature', 'Praakritik', 'Farm Naturelle'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [200, 1200], emoji: '🧈', tags: ['organic ghee', 'A2 ghee', 'desi ghee'] },
    { baseName: 'Coconut Sugar', brands: ['True Elements', 'Urban Platter', 'Organic India', 'Conscious Food', '24 Mantra', 'Sorich Organics', 'NourishVitals', 'Pro Nature'], variants: ['250 g', '500 g', '1 kg'], priceRange: [150, 500], emoji: '🥥', tags: ['coconut sugar', 'natural sweetener', 'low GI'] },
    { baseName: 'Stevia', brands: ['So Sweet', 'Sugar Free', 'Truvia', 'Zindagi', 'Urban Platter', 'Stevia Natura', 'NourishVitals', 'Organic Tattva'], variants: ['100 Sachets', '200 Sachets', '100 g Powder'], priceRange: [100, 500], emoji: '🌿', tags: ['stevia', 'sugar substitute', 'zero calorie'] },
    { baseName: 'Herbal Tea', brands: ['Organic India', 'Typhoo', 'Tetley', 'Twinings', 'Lipton', 'Himalaya', 'Girnar', 'True Elements'], variants: ['25 Bags', '50 Bags', '100 Bags'], priceRange: [120, 450], emoji: '🍵', tags: ['herbal tea', 'caffeine free', 'wellness'] },
    { baseName: 'Detox Tea', brands: ['Organic India', 'Kapiva', 'True Elements', 'Typhoo', 'Twinings', 'WOW', 'Oziva', 'Neuherbs'], variants: ['25 Bags', '50 Bags', '100 Bags'], priceRange: [150, 500], emoji: '🍵', tags: ['detox tea', 'cleanse', 'green tea'] },
    { baseName: 'Immunity Booster', brands: ['Dabur', 'Himalaya', 'Kapiva', 'Oziva', 'WOW', 'Fast&Up', 'Amway', 'Herbalife'], variants: ['30 Tablets', '60 Tablets', '120 Tablets'], priceRange: [200, 800], emoji: '🛡️', tags: ['immunity', 'booster', 'wellness'] }
  ];

  // ---- PET SUPPLIES ----
  TEMPLATES['pets'] = [
    { baseName: 'Dog Food Dry', brands: ['Pedigree', 'Royal Canin', 'Drools', 'Farmina', 'Orijen', 'Acana', 'Hills', 'Arden Grange'], variants: ['1.2 kg', '3 kg', '7 kg', '15 kg'], priceRange: [250, 4500], emoji: '🐕', tags: ['dog food', 'dry food', 'kibble'] },
    { baseName: 'Dog Food Wet', brands: ['Pedigree', 'Royal Canin', 'Drools', 'Farmina', 'Hills', 'Cesar', 'Arden Grange', 'Sheba'], variants: ['70 g', '130 g', '400 g'], priceRange: [40, 250], emoji: '🐕', tags: ['dog food', 'wet food', 'gravy'] },
    { baseName: 'Dog Treats', brands: ['Pedigree', 'Drools', 'Farmina', 'Dogsee', 'Chip Chops', 'Gnawlers', 'Jerhigh', 'Arden Grange'], variants: ['70 g', '120 g', '250 g', '500 g'], priceRange: [50, 350], emoji: '🦴', tags: ['dog treats', 'snacks', 'training'] },
    { baseName: 'Dog Biscuits', brands: ['Pedigree', 'Drools', 'Chip Chops', 'Gnawlers', 'Farmina', 'Dogsee', 'Heads Up For Tails', 'Arden Grange'], variants: ['100 g', '250 g', '500 g'], priceRange: [50, 250], emoji: '🍪', tags: ['dog biscuits', 'treats', 'snack'] },
    { baseName: 'Dog Chew Sticks', brands: ['Pedigree Dentastix', 'Drools', 'Gnawlers', 'Chip Chops', 'Dogsee', 'Farmina', 'Jerhigh', 'SmartBones'], variants: ['3 pcs', '7 pcs', '14 pcs', '28 pcs'], priceRange: [60, 400], emoji: '🦴', tags: ['chew sticks', 'dental', 'dog'] },
    { baseName: 'Cat Food Dry', brands: ['Whiskas', 'Royal Canin', 'Drools', 'Farmina', 'Hills', 'Sheba', 'Me-O', 'Acana'], variants: ['450 g', '1.2 kg', '3 kg', '7 kg'], priceRange: [150, 3500], emoji: '🐈', tags: ['cat food', 'dry food', 'kibble'] },
    { baseName: 'Cat Food Wet', brands: ['Whiskas', 'Royal Canin', 'Sheba', 'Farmina', 'Hills', 'Me-O', 'Drools', 'Felix'], variants: ['70 g', '85 g', '400 g'], priceRange: [30, 200], emoji: '🐈', tags: ['cat food', 'wet food', 'gravy'] },
    { baseName: 'Cat Treats', brands: ['Whiskas', 'Drools', 'Sheba', 'Me-O', 'Farmina', 'Inaba', 'Temptations', 'Felix'], variants: ['55 g', '100 g', '200 g'], priceRange: [50, 300], emoji: '🐱', tags: ['cat treats', 'snacks', 'reward'] },
    { baseName: 'Cat Litter', brands: ['Tidy Cats', 'Drools', 'Me-O', 'Catsan', 'Ever Clean', 'Intersand', 'Fresh Step', 'World\'s Best'], variants: ['5 kg', '10 kg', '20 kg'], priceRange: [200, 1200], emoji: '🐈', tags: ['cat litter', 'litter box', 'clumping'] },
    { baseName: 'Pet Shampoo', brands: ['Himalaya', 'Beaphar', 'Drools', 'Captain Zack', 'Heads Up For Tails', 'Wahl', 'TropiClean', 'SPA Lavish'], variants: ['200 ml', '500 ml', '1 L'], priceRange: [120, 600], emoji: '🧴', tags: ['pet shampoo', 'dog shampoo', 'grooming'] },
    { baseName: 'Pet Conditioner', brands: ['Himalaya', 'Beaphar', 'Captain Zack', 'Heads Up For Tails', 'Wahl', 'TropiClean', 'SPA Lavish', 'Drools'], variants: ['200 ml', '500 ml'], priceRange: [150, 500], emoji: '🧴', tags: ['pet conditioner', 'grooming', 'coat care'] },
    { baseName: 'Flea Collar', brands: ['Seresto', 'Scalibor', 'Kiltix', 'Hartz', 'Adams', 'Beaphar', 'Bayer', 'Virbac'], variants: ['Small', 'Medium', 'Large'], priceRange: [200, 1500], emoji: '🐕', tags: ['flea collar', 'tick prevention', 'pest control'] },
    { baseName: 'Tick Spray', brands: ['Himalaya', 'Beaphar', 'Frontline', 'Captain Zack', 'Heads Up For Tails', 'Hartz', 'Virbac', 'Bayer'], variants: ['100 ml', '200 ml', '500 ml'], priceRange: [150, 600], emoji: '🦟', tags: ['tick spray', 'flea spray', 'pest control'] },
    { baseName: 'Pet Brush', brands: ['Wahl', 'Furminator', 'Heads Up For Tails', 'Captain Zack', 'Beaphar', 'Slicker', 'Safari', 'Hartz'], variants: ['Small', 'Medium', 'Large'], priceRange: [100, 800], emoji: '🐕', tags: ['pet brush', 'grooming', 'deshedding'] },
    { baseName: 'Pet Comb', brands: ['Wahl', 'Safari', 'Heads Up For Tails', 'Captain Zack', 'Furminator', 'Hartz', 'Andis', 'Beaphar'], variants: ['Small', 'Medium', 'Large'], priceRange: [80, 500], emoji: '🐕', tags: ['pet comb', 'grooming', 'flea comb'] },
    { baseName: 'Dog Leash', brands: ['Heads Up For Tails', 'Drools', 'Trixie', 'Lana Paws', 'Hartz', 'PetSafe', 'Ruffwear', 'Flexi'], variants: ['Small', 'Medium', 'Large', 'Extra Long'], priceRange: [150, 1200], emoji: '🐕', tags: ['dog leash', 'walking', 'lead'] },
    { baseName: 'Dog Collar', brands: ['Heads Up For Tails', 'Drools', 'Trixie', 'Lana Paws', 'Hartz', 'PetSafe', 'Ruffwear', 'Flexi'], variants: ['XS', 'Small', 'Medium', 'Large'], priceRange: [100, 800], emoji: '🐕', tags: ['dog collar', 'neck collar', 'id tag'] },
    { baseName: 'Dog Harness', brands: ['Heads Up For Tails', 'Ruffwear', 'PetSafe', 'Trixie', 'Drools', 'Lana Paws', 'Hartz', 'Julius K9'], variants: ['XS', 'Small', 'Medium', 'Large'], priceRange: [300, 2000], emoji: '🐕', tags: ['dog harness', 'walking', 'no pull'] },
    { baseName: 'Dog Bed', brands: ['Heads Up For Tails', 'Drools', 'Trixie', 'Hiputee', 'Lana Paws', 'SleepyPaws', 'PetsFella', 'Fluffy\'s Luxuries'], variants: ['Small', 'Medium', 'Large', 'XL'], priceRange: [400, 3000], emoji: '🛏️', tags: ['dog bed', 'pet bed', 'sleeping'] },
    { baseName: 'Dog Bowl', brands: ['Heads Up For Tails', 'Drools', 'Trixie', 'Hartz', 'PetSafe', 'KONG', 'Outward Hound', 'Lana Paws'], variants: ['Small', 'Medium', 'Large'], priceRange: [100, 600], emoji: '🥣', tags: ['dog bowl', 'feeding', 'water bowl'] },
    { baseName: 'Cat Toy', brands: ['Trixie', 'Heads Up For Tails', 'Drools', 'KONG', 'Catit', 'Jackson Galaxy', 'Petlinks', 'SmartyKat'], variants: ['Single', '3 Pack', 'Set'], priceRange: [80, 500], emoji: '🐱', tags: ['cat toy', 'mouse toy', 'feather'] },
    { baseName: 'Dog Toy', brands: ['KONG', 'Trixie', 'Heads Up For Tails', 'Drools', 'Hartz', 'Outward Hound', 'Chuckit', 'JW Pet'], variants: ['Small', 'Medium', 'Large'], priceRange: [100, 800], emoji: '🐕', tags: ['dog toy', 'chew toy', 'fetch'] },
    { baseName: 'Pet Carrier', brands: ['Heads Up For Tails', 'Trixie', 'Drools', 'Hiputee', 'PetSafe', 'Airline Approved', 'IATA', 'Amazon Basics'], variants: ['Small', 'Medium', 'Large'], priceRange: [500, 3000], emoji: '🧳', tags: ['pet carrier', 'travel', 'cage'] },
    { baseName: 'Aquarium Fish Food', brands: ['Taiyo', 'Optimum', 'Tetra', 'Ocean Free', 'Tubifex', 'Hikari', 'Sera', 'Fluval'], variants: ['20 g', '50 g', '100 g', '250 g'], priceRange: [30, 300], emoji: '🐠', tags: ['fish food', 'aquarium', 'tropical fish'] },
    { baseName: 'Bird Feed', brands: ['Taiyo', 'Petslife', 'Vitapol', 'Kaytee', 'Zupreem', 'Tropican', 'Volkman', 'Prestige'], variants: ['200 g', '500 g', '1 kg', '2 kg'], priceRange: [50, 400], emoji: '🐦', tags: ['bird feed', 'seed mix', 'parrot food'] },
    { baseName: 'Bird Cage', brands: ['Taiyo', 'Petslife', 'Petshop7', 'Amazon Basics', 'Jainsons', 'Hagen', 'Prevue', 'Yaheetech'], variants: ['Small', 'Medium', 'Large'], priceRange: [400, 3000], emoji: '🐦', tags: ['bird cage', 'aviary', 'cage'] },
    { baseName: 'Rabbit Food', brands: ['Taiyo', 'Vitapol', 'Oxbow', 'Kaytee', 'Petslife', 'Zupreem', 'Supreme', 'Burgess'], variants: ['500 g', '1 kg', '2 kg'], priceRange: [100, 600], emoji: '🐇', tags: ['rabbit food', 'pellets', 'hay'] },
    { baseName: 'Hamster Food', brands: ['Taiyo', 'Vitapol', 'Oxbow', 'Kaytee', 'Petslife', 'Tiny Friends Farm', 'Supreme', 'Burgess'], variants: ['250 g', '500 g', '1 kg'], priceRange: [80, 400], emoji: '🐹', tags: ['hamster food', 'rodent food', 'seeds'] },
    { baseName: 'Pet Vitamins', brands: ['Himalaya', 'Drools', 'Beaphar', 'Virbac', 'Nutri Vet', 'Heads Up For Tails', 'Royal Canin', 'Hills'], variants: ['30 Tablets', '60 Tablets', '120 ml Syrup'], priceRange: [150, 800], emoji: '💊', tags: ['pet vitamins', 'supplement', 'health'] },
    { baseName: 'Pet First Aid', brands: ['Himalaya', 'Heads Up For Tails', 'Beaphar', 'Virbac', 'Captain Zack', 'Hartz', 'Vetoquinol', 'Bayer'], variants: ['Kit Small', 'Kit Medium', 'Kit Large'], priceRange: [200, 1000], emoji: '🩹', tags: ['first aid', 'pet health', 'wound care'] }
  ];

  // ---- ELECTRONICS & APPLIANCES ----
  TEMPLATES['electronics'] = [
    { baseName: 'Power Bank', brands: ['Samsung', 'Mi', 'Ambrane', 'Syska', 'Portronics', 'Anker', 'Realme', 'Boat'], variants: ['5000 mAh', '10000 mAh', '20000 mAh', '30000 mAh'], priceRange: [400, 2500], emoji: '🔋', tags: ['power bank', 'portable charger', 'battery'] },
    { baseName: 'USB Cable', brands: ['Samsung', 'Mi', 'Ambrane', 'Portronics', 'Anker', 'Belkin', 'AmazonBasics', 'Boat'], variants: ['0.5 m', '1 m', '2 m', '3 m'], priceRange: [100, 600], emoji: '🔌', tags: ['usb cable', 'charging cable', 'type c'] },
    { baseName: 'Charging Adapter', brands: ['Samsung', 'Mi', 'Anker', 'Portronics', 'Belkin', 'Realme', 'OnePlus', 'Ambrane'], variants: ['10W', '18W', '33W', '65W'], priceRange: [300, 2000], emoji: '🔌', tags: ['charger', 'adapter', 'fast charging'] },
    { baseName: 'Earphones Wired', brands: ['Samsung', 'JBL', 'Sony', 'Boat', 'Realme', 'Mi', 'Sennheiser', 'Audio Technica'], variants: ['3.5mm', 'Type-C', 'With Mic'], priceRange: [150, 2000], emoji: '🎧', tags: ['earphones', 'wired', 'headphones'] },
    { baseName: 'Earbuds Wireless', brands: ['Boat', 'JBL', 'Samsung', 'Sony', 'Realme', 'OnePlus', 'Noise', 'Oppo'], variants: ['Basic', 'ANC', 'Pro', 'Sports'], priceRange: [500, 5000], emoji: '🎧', tags: ['earbuds', 'wireless', 'TWS', 'bluetooth'] },
    { baseName: 'Bluetooth Speaker', brands: ['JBL', 'Boat', 'Sony', 'Mi', 'Bose', 'Marshall', 'Ultimate Ears', 'Portronics'], variants: ['Mini', 'Portable', 'Party', 'Premium'], priceRange: [500, 8000], emoji: '🔊', tags: ['bluetooth speaker', 'wireless speaker', 'portable'] },
    { baseName: 'Smart Watch', brands: ['Samsung', 'Noise', 'Boat', 'Fire-Boltt', 'Amazfit', 'Realme', 'Mi', 'Apple'], variants: ['Basic', 'Pro', 'Ultra', 'Premium'], priceRange: [1000, 15000], emoji: '⌚', tags: ['smartwatch', 'fitness tracker', 'wearable'] },
    { baseName: 'Fitness Band', brands: ['Mi', 'Realme', 'Samsung', 'OnePlus', 'Noise', 'Boat', 'Amazfit', 'Honor'], variants: ['Basic', 'Standard', 'Pro'], priceRange: [800, 4000], emoji: '⌚', tags: ['fitness band', 'tracker', 'health'] },
    { baseName: 'Mouse', brands: ['Logitech', 'HP', 'Dell', 'Lenovo', 'Mi', 'Portronics', 'Zebronics', 'Boat'], variants: ['Wired', 'Wireless', 'Gaming', 'Ergonomic'], priceRange: [200, 3000], emoji: '🖱️', tags: ['mouse', 'computer', 'wireless mouse'] },
    { baseName: 'Keyboard', brands: ['Logitech', 'HP', 'Dell', 'Lenovo', 'Zebronics', 'Portronics', 'Cosmic Byte', 'Ant Esports'], variants: ['Wired', 'Wireless', 'Mechanical', 'Membrane'], priceRange: [300, 5000], emoji: '⌨️', tags: ['keyboard', 'computer', 'typing'] },
    { baseName: 'Webcam', brands: ['Logitech', 'HP', 'Lenovo', 'Mi', 'Portronics', 'iBall', 'Zebronics', 'AmazonBasics'], variants: ['720p', '1080p', '4K'], priceRange: [500, 5000], emoji: '📷', tags: ['webcam', 'camera', 'video call'] },
    { baseName: 'USB Hub', brands: ['Portronics', 'Anker', 'Belkin', 'HP', 'Dell', 'TP-Link', 'AmazonBasics', 'Mi'], variants: ['4 Port', '7 Port', 'USB-C Hub'], priceRange: [300, 2500], emoji: '🔌', tags: ['usb hub', 'port expansion', 'adapter'] },
    { baseName: 'Memory Card', brands: ['Samsung', 'SanDisk', 'Kingston', 'HP', 'Lexar', 'Transcend', 'Sony', 'Strontium'], variants: ['16 GB', '32 GB', '64 GB', '128 GB', '256 GB'], priceRange: [150, 2500], emoji: '💾', tags: ['memory card', 'micro sd', 'storage'] },
    { baseName: 'Pen Drive', brands: ['Samsung', 'SanDisk', 'Kingston', 'HP', 'Lexar', 'Transcend', 'Sony', 'Strontium'], variants: ['16 GB', '32 GB', '64 GB', '128 GB', '256 GB'], priceRange: [200, 2000], emoji: '💾', tags: ['pen drive', 'usb drive', 'flash drive'] },
    { baseName: 'Hard Drive External', brands: ['Seagate', 'WD', 'Samsung', 'Toshiba', 'LaCie', 'Transcend', 'ADATA', 'HP'], variants: ['500 GB', '1 TB', '2 TB', '4 TB'], priceRange: [2000, 10000], emoji: '💽', tags: ['external hard drive', 'HDD', 'storage'] },
    { baseName: 'Laptop Stand', brands: ['AmazonBasics', 'Portronics', 'Mi', 'Lenovo', 'HP', 'Zebronics', 'Gizga', 'Urban Infotech'], variants: ['Basic', 'Adjustable', 'With Fan', 'Aluminum'], priceRange: [300, 3000], emoji: '💻', tags: ['laptop stand', 'ergonomic', 'cooling'] },
    { baseName: 'Phone Case', brands: ['Samsung', 'Spigen', 'Ringke', 'Kapaver', 'Caseology', 'Noise', 'AmazonBasics', 'Portronics'], variants: ['Transparent', 'Rugged', 'Flip Cover', 'Bumper'], priceRange: [100, 1500], emoji: '📱', tags: ['phone case', 'cover', 'protection'] },
    { baseName: 'Screen Protector', brands: ['Spigen', 'Ringke', 'AmazonBasics', 'Kapaver', 'Mi', 'Samsung', 'Noise', 'iQOO'], variants: ['Single', '2 Pack', '3 Pack'], priceRange: [100, 800], emoji: '📱', tags: ['screen protector', 'tempered glass', 'protection'] },
    { baseName: 'Car Charger', brands: ['Mi', 'Samsung', 'Portronics', 'Ambrane', 'Anker', 'Belkin', 'Boat', 'AmazonBasics'], variants: ['Single Port', 'Dual Port', 'Triple Port'], priceRange: [200, 1500], emoji: '🚗', tags: ['car charger', 'auto', 'fast charging'] },
    { baseName: 'Wall Charger', brands: ['Samsung', 'Mi', 'Anker', 'Portronics', 'Belkin', 'Ambrane', 'OnePlus', 'Realme'], variants: ['10W', '18W', '33W', '65W', '100W'], priceRange: [300, 3000], emoji: '🔌', tags: ['wall charger', 'fast charger', 'adapter'] },
    { baseName: 'Smart Plug', brands: ['Mi', 'TP-Link', 'Amazon', 'Wipro', 'Philips', 'Syska', 'Portronics', 'Oakter'], variants: ['Single', '2 Pack', '4 Pack'], priceRange: [400, 2000], emoji: '🔌', tags: ['smart plug', 'WiFi', 'home automation'] },
    { baseName: 'Smart Bulb', brands: ['Philips Hue', 'Syska', 'Mi', 'Wipro', 'TP-Link', 'Amazon', 'Crompton', 'Havells'], variants: ['9W', '12W', '15W', 'Multicolor'], priceRange: [200, 2000], emoji: '💡', tags: ['smart bulb', 'LED', 'WiFi', 'RGB'] },
    { baseName: 'LED Strip', brands: ['Syska', 'Mi', 'Philips', 'Wipro', 'TP-Link', 'Crompton', 'Govee', 'DAYBETTER'], variants: ['1 m', '2 m', '5 m', '10 m'], priceRange: [200, 2000], emoji: '💡', tags: ['LED strip', 'RGB', 'ambient lighting'] },
    { baseName: 'Table Fan', brands: ['Bajaj', 'Crompton', 'Usha', 'Havells', 'Orient', 'V-Guard', 'Luminous', 'Anchor'], variants: ['9 inch', '12 inch', '16 inch'], priceRange: [600, 2500], emoji: '🌀', tags: ['table fan', 'fan', 'cooling', 'portable'] },
    { baseName: 'Heater', brands: ['Bajaj', 'Usha', 'Havells', 'Orient', 'Morphy Richards', 'Crompton', 'Orpat', 'V-Guard'], variants: ['800W', '1000W', '1500W', '2000W'], priceRange: [600, 3000], emoji: '🔥', tags: ['heater', 'room heater', 'winter'] },
    { baseName: 'Room Heater', brands: ['Bajaj', 'Usha', 'Havells', 'Orient', 'Morphy Richards', 'Crompton', 'Orpat', 'V-Guard'], variants: ['Fan Heater', 'Oil Filled', 'Infrared', 'Convector'], priceRange: [800, 6000], emoji: '🔥', tags: ['room heater', 'oil heater', 'winter'] },
    { baseName: 'Air Cooler', brands: ['Bajaj', 'Symphony', 'Crompton', 'Havells', 'Orient', 'Kenstar', 'Voltas', 'Usha'], variants: ['Personal', 'Tower', 'Desert', 'Window'], priceRange: [2000, 12000], emoji: '❄️', tags: ['air cooler', 'desert cooler', 'summer'] },
    { baseName: 'Humidifier', brands: ['Philips', 'Mi', 'Dyson', 'Honeywell', 'Dr Trust', 'Pure Enrichment', 'Agaro', 'Crane'], variants: ['Small (1 L)', 'Medium (3 L)', 'Large (5 L)'], priceRange: [800, 5000], emoji: '💧', tags: ['humidifier', 'mist maker', 'air quality'] },
    { baseName: 'Air Purifier', brands: ['Mi', 'Philips', 'Dyson', 'Honeywell', 'Blueair', 'Sharp', 'Coway', 'Havells'], variants: ['Room', 'Large Room', 'HEPA'], priceRange: [3000, 25000], emoji: '🌬️', tags: ['air purifier', 'HEPA filter', 'clean air'] },
    { baseName: 'Mixer Grinder', brands: ['Prestige', 'Bajaj', 'Philips', 'Butterfly', 'Preethi', 'Morphy Richards', 'Havells', 'Bosch'], variants: ['500W', '750W', '1000W'], priceRange: [1500, 6000], emoji: '🔄', tags: ['mixer grinder', 'blender', 'kitchen'] },
    { baseName: 'Blender', brands: ['Philips', 'Prestige', 'Bajaj', 'Morphy Richards', 'Bosch', 'Nutribullet', 'Hamilton Beach', 'Wonderchef'], variants: ['Personal', 'Standard', 'Professional'], priceRange: [800, 5000], emoji: '🔄', tags: ['blender', 'smoothie maker', 'kitchen'] },
    { baseName: 'Juicer', brands: ['Philips', 'Prestige', 'Bajaj', 'Morphy Richards', 'Bosch', 'Havells', 'Kuvings', 'Usha'], variants: ['Citrus Press', 'Centrifugal', 'Cold Press'], priceRange: [1000, 8000], emoji: '🧃', tags: ['juicer', 'juice extractor', 'cold press'] },
    { baseName: 'Electric Kettle', brands: ['Prestige', 'Bajaj', 'Philips', 'Havells', 'Pigeon', 'Morphy Richards', 'Bosch', 'Wonderchef'], variants: ['0.5 L', '1 L', '1.5 L', '2 L'], priceRange: [400, 2500], emoji: '☕', tags: ['electric kettle', 'kettle', 'hot water'] },
    { baseName: 'Toaster', brands: ['Philips', 'Prestige', 'Bajaj', 'Morphy Richards', 'Bosch', 'Havells', 'Wonderchef', 'Usha'], variants: ['2 Slice', '4 Slice', 'Oven Toaster'], priceRange: [600, 3000], emoji: '🍞', tags: ['toaster', 'bread toaster', 'kitchen'] },
    { baseName: 'Sandwich Maker', brands: ['Prestige', 'Bajaj', 'Philips', 'Morphy Richards', 'Bosch', 'Havells', 'Nova', 'Wonderchef'], variants: ['2 Slice', '4 Slice', 'Grill'], priceRange: [600, 3000], emoji: '🥪', tags: ['sandwich maker', 'grill', 'toaster'] },
    { baseName: 'Induction Cooktop', brands: ['Prestige', 'Bajaj', 'Philips', 'Pigeon', 'Havells', 'Butterfly', 'Usha', 'V-Guard'], variants: ['1200W', '1600W', '2000W', '2100W'], priceRange: [1000, 4000], emoji: '🍳', tags: ['induction', 'cooktop', 'cooking'] },
    { baseName: 'Rice Cooker', brands: ['Prestige', 'Bajaj', 'Pigeon', 'Panasonic', 'Havells', 'Preethi', 'Philips', 'Wonderchef'], variants: ['1 L', '1.8 L', '2.8 L'], priceRange: [800, 4000], emoji: '🍚', tags: ['rice cooker', 'electric cooker', 'cooking'] },
    { baseName: 'Pressure Cooker Electric', brands: ['Prestige', 'Bajaj', 'Instant Pot', 'Pigeon', 'Wonderchef', 'Havells', 'Nutricook', 'Preethi'], variants: ['3 L', '5 L', '6 L', '8 L'], priceRange: [2000, 8000], emoji: '♨️', tags: ['pressure cooker', 'instant pot', 'multi cooker'] },
    { baseName: 'Hand Blender', brands: ['Philips', 'Prestige', 'Bajaj', 'Morphy Richards', 'Bosch', 'Braun', 'Havells', 'Wonderchef'], variants: ['200W', '400W', '600W', '800W'], priceRange: [500, 3000], emoji: '🔄', tags: ['hand blender', 'immersion blender', 'kitchen'] },
    { baseName: 'Food Processor', brands: ['Philips', 'Prestige', 'Bajaj', 'Morphy Richards', 'Bosch', 'Inalsa', 'Havells', 'Wonderchef'], variants: ['500W', '750W', '1000W'], priceRange: [2000, 8000], emoji: '🔄', tags: ['food processor', 'chopper', 'kitchen'] },
    { baseName: 'Iron Box', brands: ['Philips', 'Bajaj', 'Prestige', 'Morphy Richards', 'Havells', 'Crompton', 'Usha', 'Black & Decker'], variants: ['Dry Iron', 'Steam Iron', 'Cordless'], priceRange: [400, 3000], emoji: '👔', tags: ['iron', 'steam iron', 'clothes iron'] },
    { baseName: 'Hair Dryer', brands: ['Philips', 'Havells', 'Syska', 'Vega', 'Panasonic', 'Nova', 'Dyson', 'Wahl'], variants: ['1000W', '1600W', '2000W', '2200W'], priceRange: [400, 5000], emoji: '💇', tags: ['hair dryer', 'blow dryer', 'styling'] },
    { baseName: 'Trimmer', brands: ['Philips', 'Mi', 'Havells', 'Nova', 'Syska', 'Panasonic', 'Wahl', 'Braun'], variants: ['Basic', 'Multi Groomer', 'Professional', 'Body Groomer'], priceRange: [400, 3500], emoji: '💈', tags: ['trimmer', 'beard trimmer', 'grooming'] },
    { baseName: 'Epilator', brands: ['Philips', 'Braun', 'Panasonic', 'Havells', 'Veet', 'Vega', 'Remington', 'Syska'], variants: ['Basic', 'Wet & Dry', 'Cordless', 'Premium'], priceRange: [800, 5000], emoji: '✨', tags: ['epilator', 'hair removal', 'grooming'] },
    { baseName: 'Water Purifier', brands: ['Kent', 'Aquaguard', 'Livpure', 'Pureit', 'Blue Star', 'Havells', 'Mi', 'AO Smith'], variants: ['RO', 'UV', 'RO+UV', 'RO+UV+UF'], priceRange: [5000, 20000], emoji: '💧', tags: ['water purifier', 'RO', 'filter'] },
    { baseName: 'Vacuum Cleaner', brands: ['Mi', 'Philips', 'Eureka Forbes', 'Dyson', 'Karcher', 'Havells', 'Prestige', 'Inalsa'], variants: ['Handheld', 'Stick', 'Canister', 'Robotic'], priceRange: [2000, 25000], emoji: '🧹', tags: ['vacuum cleaner', 'cleaning', 'robotic'] },
    { baseName: 'Sewing Machine', brands: ['Singer', 'Brother', 'Usha', 'Janome', 'Bernina', 'Juki', 'Husqvarna', 'Baby Lock'], variants: ['Basic', 'Portable', 'Automatic', 'Heavy Duty'], priceRange: [3000, 15000], emoji: '🧵', tags: ['sewing machine', 'stitching', 'tailoring'] },
    { baseName: 'Battery AA', brands: ['Duracell', 'Eveready', 'Panasonic', 'Energizer', 'Nippo', 'AmazonBasics', 'GP', 'Camelion'], variants: ['2 pcs', '4 pcs', '8 pcs', '12 pcs'], priceRange: [40, 350], emoji: '🔋', tags: ['battery', 'AA', 'alkaline'] },
    { baseName: 'Battery AAA', brands: ['Duracell', 'Eveready', 'Panasonic', 'Energizer', 'Nippo', 'AmazonBasics', 'GP', 'Camelion'], variants: ['2 pcs', '4 pcs', '8 pcs', '12 pcs'], priceRange: [40, 350], emoji: '🔋', tags: ['battery', 'AAA', 'alkaline'] },
    { baseName: 'Extension Board', brands: ['Anchor', 'Havells', 'Bajaj', 'GM', 'Belkin', 'Syska', 'Cona', 'Portronics'], variants: ['4 Socket', '6 Socket', '8 Socket', 'With USB'], priceRange: [200, 1500], emoji: '🔌', tags: ['extension board', 'power strip', 'surge protector'] }
  ];

  // ----------------------------------------------------------
  // Product Generation
  // ----------------------------------------------------------
  function getImageUrl(deptId, baseName, tags) {
    var name = baseName.toLowerCase();
    
    // Grocery keywords
    if (deptId === 'grocery') {
      if (name.indexOf('rice') !== -1) return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('flour') !== -1 || name.indexOf('atta') !== -1 || name.indexOf('maida') !== -1 || name.indexOf('besan') !== -1) return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('sugar') !== -1) return 'https://images.unsplash.com/photo-1581781870027-04212e231e96?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('dal') !== -1 || name.indexOf('lentil') !== -1 || name.indexOf('pulse') !== -1) return 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('oil') !== -1) return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('ghee') !== -1 || name.indexOf('butter') !== -1) return 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('salt') !== -1) return 'https://images.unsplash.com/photo-1604838606671-c4d8727144e5?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('spice') !== -1 || name.indexOf('masala') !== -1 || name.indexOf('powder') !== -1 || name.indexOf('seeds') !== -1) return 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('tea') !== -1) return 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('coffee') !== -1) return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('honey') !== -1) return 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('jam') !== -1) return 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('dry fruits') !== -1 || name.indexOf('almonds') !== -1 || name.indexOf('cashews') !== -1 || name.indexOf('walnuts') !== -1) return 'https://images.unsplash.com/photo-1596560548464-f040c5f970d2?auto=format&fit=crop&w=400&q=80';
      return 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
    }
    
    // Fruits & Vegetables keywords
    if (deptId === 'fruits') {
      if (name.indexOf('banana') !== -1) return 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('apple') !== -1) return 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('orange') !== -1) return 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('mango') !== -1) return 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('grapes') !== -1) return 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('tomato') !== -1) return 'https://images.unsplash.com/photo-1546470427-0a59cd35e6d5?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('potato') !== -1) return 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('onion') !== -1) return 'https://images.unsplash.com/photo-1508747705-3de10647a782?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('garlic') !== -1 || name.indexOf('ginger') !== -1 || name.indexOf('chili') !== -1) return 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('capsicum') !== -1 || name.indexOf('cucumber') !== -1 || name.indexOf('carrot') !== -1) return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('spinach') !== -1 || name.indexOf('lettuce') !== -1 || name.indexOf('cabbage') !== -1) return 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80';
      return 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80';
    }
    
    // Dairy keywords
    if (deptId === 'dairy') {
      if (name.indexOf('milk') !== -1) return 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('butter') !== -1) return 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('cheese') !== -1) return 'https://images.unsplash.com/photo-1486887396153-fa416526c13b?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('paneer') !== -1) return 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('curd') !== -1 || name.indexOf('yogurt') !== -1) return 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('egg') !== -1) return 'https://images.unsplash.com/photo-1516448424440-5dbf97754e48?auto=format&fit=crop&w=400&q=80';
      return 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=400&q=80';
    }
    
    // Beverages keywords
    if (deptId === 'beverages') {
      if (name.indexOf('juice') !== -1 || name.indexOf('drink') !== -1) return 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('soda') !== -1 || name.indexOf('cola') !== -1 || name.indexOf('pepsi') !== -1 || name.indexOf('coke') !== -1) return 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80';
      return 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80';
    }
    
    // Snacks keywords
    if (deptId === 'snacks') {
      if (name.indexOf('biscuit') !== -1 || name.indexOf('cookie') !== -1) return 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('chips') !== -1 || name.indexOf('wafer') !== -1 || name.indexOf('kurkure') !== -1 || name.indexOf('lays') !== -1) return 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('chocolate') !== -1 || name.indexOf('cadbury') !== -1) return 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=400&q=80';
      return 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=400&q=80';
    }
    
    // Personal care keywords
    if (deptId === 'personal') {
      if (name.indexOf('soap') !== -1 || name.indexOf('body wash') !== -1) return 'https://images.unsplash.com/photo-1607006342465-b44c6602187d?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('shampoo') !== -1 || name.indexOf('conditioner') !== -1) return 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80';
      if (name.indexOf('toothpaste') !== -1 || name.indexOf('brush') !== -1) return 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=400&q=80';
      return 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80';
    }
    
    // Home & Kitchen keywords
    if (deptId === 'home') {
      if (name.indexOf('detergent') !== -1 || name.indexOf('liquid') !== -1 || name.indexOf('cleaner') !== -1) return 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=400&q=80';
      return 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=400&q=80';
    }
    
    // Baby care keywords
    if (deptId === 'baby') {
      return 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80';
    }
    
    // Frozen foods keywords
    if (deptId === 'frozen') {
      return 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80';
    }
    
    // Meat & Seafood keywords
    if (deptId === 'meat') {
      return 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80';
    }
    
    // Bakery keywords
    if (deptId === 'bakery') {
      return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80';
    }
    
    // Health & Wellness keywords
    if (deptId === 'health') {
      return 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=400&q=80';
    }
    
    // Pet supplies keywords
    if (deptId === 'pets') {
      return 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80';
    }
    
    // Electronics keywords
    if (deptId === 'electronics') {
      return 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80';
    }
    
    return 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
  }

  var allProducts = [];
  var productIndex = 0;

  DEPARTMENTS.forEach(function(dept) {
    var templates = TEMPLATES[dept.id];
    if (!templates) return;

    templates.forEach(function(template, tIdx) {
      template.brands.forEach(function(brand, bIdx) {
        template.variants.forEach(function(variant, vIdx) {
          productIndex++;
          var rng = seededRandom(productIndex);

          // Calculate variant multiplier based on position
          var variantMultiplier = 1;
          var totalVariants = template.variants.length;
          if (totalVariants > 1) {
            variantMultiplier = 0.5 + (vIdx / (totalVariants - 1)) * 2.0;
          }

          // Price calculation
          var basePrice = template.priceRange[0] + rng() * (template.priceRange[1] - template.priceRange[0]);
          var price = Math.round(basePrice * variantMultiplier);
          if (price < 1) price = 1;

          // Original price (5-35% higher)
          var discountPct = Math.round(5 + rng() * 30);
          var originalPrice = Math.round(price * (100 / (100 - discountPct)));

          // Rating (3.2 - 5.0)
          var rating = Math.round((3.2 + rng() * 1.8) * 10) / 10;

          // Rating count (10 - 5000)
          var ratingCount = Math.round(10 + rng() * 4990);

          // In stock (92% chance)
          var inStock = rng() < 0.92;

          var productId = dept.id + '_' + tIdx + '_' + bIdx + '_' + vIdx;

          allProducts.push({
            id: productId,
            name: brand + ' ' + template.baseName + ' - ' + variant,
            brand: brand,
            department: dept.name,
            departmentId: dept.id,
            price: price,
            originalPrice: originalPrice,
            discount: discountPct,
            rating: rating,
            ratingCount: ratingCount,
            unit: variant,
            inStock: inStock,
            emoji: template.emoji,
            imageUrl: getImageUrl(dept.id, template.baseName, template.tags),
            tags: template.tags
          });
        });
      });
    });
  });

  // ----------------------------------------------------------
  // Store data on DMart namespace
  // ----------------------------------------------------------
  DMart.products = allProducts;
  DMart.departments = DEPARTMENTS;

  // Build lookup indexes
  DMart._productMap = new Map();
  DMart._deptIndex = new Map();

  DEPARTMENTS.forEach(function(dept) {
    DMart._deptIndex.set(dept.id, []);
  });

  allProducts.forEach(function(product) {
    DMart._productMap.set(product.id, product);
    var deptArr = DMart._deptIndex.get(product.departmentId);
    if (deptArr) {
      deptArr.push(product);
    }
  });

  // ----------------------------------------------------------
  // API Functions
  // ----------------------------------------------------------
  DMart.getProductById = function(id) {
    return DMart._productMap.get(id);
  };

  DMart.getDepartments = function() {
    return DMart.departments;
  };

  DMart.getProducts = function(options) {
    options = options || {};
    var department = options.department || null;
    var search = options.search ? options.search.toLowerCase().trim() : '';
    var sort = options.sort || 'relevance';
    var page = options.page || 1;
    var perPage = options.perPage || 24;
    var minPrice = options.minPrice != null ? options.minPrice : 0;
    var maxPrice = options.maxPrice != null ? options.maxPrice : Infinity;

    // Start with department filter or all products
    var results;
    if (department) {
      results = DMart._deptIndex.get(department);
      if (!results) results = [];
      results = results.slice(); // copy so we don't mutate the index
    } else {
      results = allProducts.slice();
    }

    // Search filter
    if (search) {
      var searchTerms = search.split(/\s+/);
      results = results.filter(function(p) {
        var haystack = (p.name + ' ' + p.brand + ' ' + p.tags.join(' ')).toLowerCase();
        return searchTerms.every(function(term) {
          return haystack.indexOf(term) !== -1;
        });
      });
    }

    // Price range filter
    if (minPrice > 0 || maxPrice < Infinity) {
      results = results.filter(function(p) {
        return p.price >= minPrice && p.price <= maxPrice;
      });
    }

    // Sort
    switch (sort) {
      case 'price-low':
        results.sort(function(a, b) { return a.price - b.price; });
        break;
      case 'price-high':
        results.sort(function(a, b) { return b.price - a.price; });
        break;
      case 'rating':
        results.sort(function(a, b) { return b.rating - a.rating || b.ratingCount - a.ratingCount; });
        break;
      case 'discount':
        results.sort(function(a, b) { return b.discount - a.discount; });
        break;
      case 'name-az':
        results.sort(function(a, b) { return a.name.localeCompare(b.name); });
        break;
      case 'name-za':
        results.sort(function(a, b) { return b.name.localeCompare(a.name); });
        break;
      case 'relevance':
      default:
        // For search results, keep relevance order; otherwise sort by rating
        if (!search) {
          results.sort(function(a, b) { return b.rating - a.rating || b.ratingCount - a.ratingCount; });
        }
        break;
    }

    // Pagination
    var total = results.length;
    var totalPages = Math.ceil(total / perPage);
    var startIdx = (page - 1) * perPage;
    var paged = results.slice(startIdx, startIdx + perPage);

    return {
      products: paged,
      total: total,
      page: page,
      totalPages: totalPages
    };
  };

  DMart.getProductVariants = function(id) {
    var parts = id.split('_');
    if (parts.length < 3) {
      var single = DMart.getProductById(id);
      return single ? [single] : [];
    }
    var prefix = parts[0] + '_' + parts[1] + '_' + parts[2] + '_';
    return allProducts.filter(function(p) {
      return p.id.indexOf(prefix) === 0;
    });
  };

  console.log('DMart products loaded: ' + DMart.products.length + ' products');

})();
