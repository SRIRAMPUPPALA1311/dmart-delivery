// Initialize global namespace
window.DMart = window.DMart || {};

// Safe localStorage wrapper to prevent crashes in blocked/private browsing environments
DMart.storage = {
  getItem: function(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("localStorage.getItem blocked:", e);
      return null;
    }
  },
  setItem: function(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (e) {
      console.warn("localStorage.setItem blocked:", e);
    }
  }
};

// State management
DMart.state = {
  user: JSON.parse(DMart.storage.getItem('dmart_user') || 'null'),
  cart: JSON.parse(DMart.storage.getItem('dmart_cart') || '[]'),
  wishlist: JSON.parse(DMart.storage.getItem('dmart_wishlist') || '[]'),
  orders: JSON.parse(DMart.storage.getItem('dmart_orders') || '[]'),
  currentPage: 'store',
  currentDept: null
};

// Save state to localStorage
DMart.saveState = function() {
  DMart.storage.setItem('dmart_user', JSON.stringify(DMart.state.user));
  DMart.storage.setItem('dmart_cart', JSON.stringify(DMart.state.cart));
  DMart.storage.setItem('dmart_wishlist', JSON.stringify(DMart.state.wishlist));
  DMart.storage.setItem('dmart_orders', JSON.stringify(DMart.state.orders));
};

// Utility functions under DMart.utils
DMart.utils = {
  formatCurrency: function(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  },
  formatNumber: function(num) {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + ' Cr';
    if (num >= 100000) return (num / 100000).toFixed(1) + ' L';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  },
  debounce: function(fn, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },
  generateId: function() {
    return 'ORD-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
  },
  // Show toast notification
  toast: function(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = '<span>' + (type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ') + '</span><span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; setTimeout(() => toast.remove(), 300); }, 3000);
  },
  // Get random integer
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  // Get random element from array
  randomPick: function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  // Shuffle array
  shuffle: function(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  // Seeded random for consistent product data
  seededRandom: function(seed) {
    let s = seed;
    return function() {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  },
  // Dispatch custom event
  emit: function(eventName, detail) {
    document.dispatchEvent(new CustomEvent(eventName, { detail }));
  }
};

// Cart operations
DMart.addToCart = function(productId, qty = 1) {
  const product = DMart.getProductById(productId);
  if (!product) return;
  const existing = DMart.state.cart.find(item => item.productId === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    DMart.state.cart.push({ productId, qty: qty });
  }
  DMart.saveState();
  DMart.utils.emit('cart-updated');
  DMart.utils.toast(product.name + ' added to cart', 'success');
};

DMart.removeFromCart = function(productId) {
  DMart.state.cart = DMart.state.cart.filter(item => item.productId !== productId);
  DMart.saveState();
  DMart.utils.emit('cart-updated');
};

DMart.updateCartQty = function(productId, qty) {
  const item = DMart.state.cart.find(item => item.productId === productId);
  if (item) {
    if (qty <= 0) {
      DMart.removeFromCart(productId);
    } else {
      item.qty = qty;
      DMart.saveState();
      DMart.utils.emit('cart-updated');
    }
  }
};

DMart.getCartTotal = function() {
  return DMart.state.cart.reduce((total, item) => {
    const product = DMart.getProductById(item.productId);
    return total + (product ? product.price * item.qty : 0);
  }, 0);
};

DMart.getCartCount = function() {
  return DMart.state.cart.reduce((count, item) => count + item.qty, 0);
};

// Wishlist
DMart.toggleWishlist = function(productId) {
  const idx = DMart.state.wishlist.indexOf(productId);
  if (idx > -1) {
    DMart.state.wishlist.splice(idx, 1);
    DMart.utils.toast('Removed from wishlist', 'info');
  } else {
    DMart.state.wishlist.push(productId);
    DMart.utils.toast('Added to wishlist', 'success');
  }
  DMart.saveState();
};

DMart.isInWishlist = function(productId) {
  return DMart.state.wishlist.includes(productId);
};

// Auth helpers (stubs - auth.js fills these in)
DMart.isLoggedIn = function() {
  return !!DMart.state.user;
};

// Navigate function stub (app.js fills this in)
DMart.navigate = function() {};

console.log('DMart utils loaded');
