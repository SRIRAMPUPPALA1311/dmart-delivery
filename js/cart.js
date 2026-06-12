/* ============================================================
   DMart Delivery – Cart Module (Sidebar + Full Page)
   ============================================================ */
(function () {
  'use strict';

  var Cart = {};
  var sidebarOpen = false;

  /* ---- toggle sidebar ---- */
  Cart.toggleSidebar = function () {
    sidebarOpen = !sidebarOpen;
    var overlay  = document.getElementById('cart-overlay');
    var sidebar  = document.getElementById('cart-sidebar');
    if (overlay) overlay.classList.toggle('open', sidebarOpen);
    if (sidebar) sidebar.classList.toggle('open', sidebarOpen);
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    if (sidebarOpen) Cart.updateSidebar();
  };

  Cart.closeSidebar = function () {
    sidebarOpen = false;
    var overlay = document.getElementById('cart-overlay');
    var sidebar = document.getElementById('cart-sidebar');
    if (overlay) overlay.classList.remove('open');
    if (sidebar) sidebar.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ---- sidebar HTML (always in app shell) ---- */
  Cart.renderSidebar = function () {
    var items = DMart.state.cart || [];
    var count = DMart.getCartCount();
    var total = DMart.getCartTotal();

    var h = '';
    h += '<div class="cart-overlay" id="cart-overlay" onclick="DMart.Cart.closeSidebar()"></div>';
    h += '<div class="cart-sidebar" id="cart-sidebar">';

    /* header */
    h += '<div class="cart-header">';
    h += '<h3>🛒 Shopping Cart (' + count + ')</h3>';
    h += '<button class="cart-close-btn" onclick="DMart.Cart.toggleSidebar()">✕</button>';
    h += '</div>';

    /* items */
    h += '<div class="cart-items" id="cart-sidebar-items">';
    if (items.length === 0) {
      h += '<div class="cart-empty">';
      h += '<div class="cart-empty-icon">🛒</div>';
      h += '<h4>Your cart is empty</h4>';
      h += '<p>Add some products to get started!</p>';
      h += '<button class="btn btn-primary" onclick="DMart.Cart.closeSidebar();DMart.navigate(\'store\')">Browse Products</button>';
      h += '</div>';
    } else {
      for (var i = 0; i < items.length; i++) {
        var ci = items[i];
        var product = DMart.getProductById(ci.productId);
        if (!product) continue;
        h += '<div class="cart-item" data-cart-id="' + product.id + '">';
        h += '<div class="cart-item-image">' + product.emoji + '</div>';
        h += '<div class="cart-item-details">';
        h += '<div class="cart-item-name">' + escHtml(product.name) + '</div>';
        h += '<div class="cart-item-price">' + DMart.utils.formatCurrency(product.price) + '</div>';
        h += '<div class="cart-item-qty">';
        h += '<button class="qty-btn" onclick="DMart.Cart.changeQty(\'' + product.id + '\',-1)">−</button>';
        h += '<span class="qty-value">' + ci.qty + '</span>';
        h += '<button class="qty-btn" onclick="DMart.Cart.changeQty(\'' + product.id + '\',1)">+</button>';
        h += '</div>';
        h += '</div>';
        h += '<div class="cart-item-total">' + DMart.utils.formatCurrency(product.price * ci.qty) + '</div>';
        h += '<button class="cart-item-remove" onclick="DMart.Cart.removeItem(\'' + product.id + '\')">✕</button>';
        h += '</div>';
      }
    }
    h += '</div>';

    /* footer */
    if (items.length > 0) {
      h += '<div class="cart-footer">';
      h += '<div class="cart-total"><span>Total</span><span>' + DMart.utils.formatCurrency(total) + '</span></div>';
      h += '<button class="cart-checkout-btn" onclick="DMart.Cart.closeSidebar();DMart.navigate(\'checkout\')">Proceed to Checkout</button>';
      h += '<button class="btn btn-secondary" style="width:100%;margin-top:8px" onclick="DMart.Cart.closeSidebar();DMart.navigate(\'cart\')">View Full Cart</button>';
      h += '</div>';
    }

    h += '</div>';
    return h;
  };

  /* ---- helper ---- */
  function escHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---- qty / remove helpers ---- */
  Cart.changeQty = function (productId, delta) {
    var items = DMart.state.cart || [];
    var item = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].productId === productId) { item = items[i]; break; }
    }
    if (!item) return;
    var newQty = item.qty + delta;
    if (newQty <= 0) {
      DMart.removeFromCart(productId);
    } else {
      DMart.updateCartQty(productId, newQty);
    }
  };

  Cart.removeItem = function (productId) {
    DMart.removeFromCart(productId);
    DMart.utils.toast('Item removed from cart', 'info');
  };

  /* ---- update sidebar in place ---- */
  Cart.updateSidebar = function () {
    var container = document.getElementById('cart-sidebar');
    if (!container) return;
    /* re-build entire sidebar inner content */
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = Cart.renderSidebar();
    var newSidebar = tempDiv.querySelector('.cart-sidebar');
    if (newSidebar) {
      container.innerHTML = newSidebar.innerHTML;
      /* keep it open */
      if (sidebarOpen) container.classList.add('open');
    }
  };

  /* ---- update badge ---- */
  Cart.updateBadge = function () {
    var el = document.getElementById('cart-count');
    if (el) {
      var count = DMart.getCartCount();
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    }
  };

  /* ---- Full Cart Page ---- */
  Cart.render = function () {
    return Cart.renderPage();
  };

  Cart.renderPage = function () {
    var items = DMart.state.cart || [];
    var total = DMart.getCartTotal();
    var count = DMart.getCartCount();
    var h = '';

    h += '<div class="cart-page">';
    h += '<h1 class="page-title">🛒 Shopping Cart</h1>';

    if (items.length === 0) {
      h += '<div class="cart-page-empty">';
      h += '<div class="cart-empty-icon">🛒</div>';
      h += '<h2>Your cart is empty</h2>';
      h += '<p>Looks like you haven\'t added anything to your cart yet.</p>';
      h += '<button class="btn btn-primary btn-lg" onclick="DMart.navigate(\'store\')">Continue Shopping</button>';
      h += '</div>';
    } else {
      h += '<div class="cart-page-layout">';

      /* Left: items */
      h += '<div class="cart-page-items">';
      h += '<div class="cart-page-header">';
      h += '<span>' + count + ' item' + (count !== 1 ? 's' : '') + ' in your cart</span>';
      h += '<button class="btn btn-ghost" onclick="DMart.Cart.clearAll()">Clear Cart</button>';
      h += '</div>';

      for (var i = 0; i < items.length; i++) {
        var ci = items[i];
        var product = DMart.getProductById(ci.productId);
        if (!product) continue;
        h += '<div class="cart-page-item" data-cart-id="' + product.id + '">';
        h += '<div class="cart-page-item-image">' + product.emoji + '</div>';
        h += '<div class="cart-page-item-info">';
        h += '<div class="cart-page-item-brand">' + escHtml(product.brand) + '</div>';
        h += '<div class="cart-page-item-name">' + escHtml(product.name) + '</div>';
        h += '<div class="cart-page-item-unit">' + escHtml(product.unit || '') + '</div>';
        h += '<div class="cart-page-item-price">' + DMart.utils.formatCurrency(product.price) + '</div>';
        h += '</div>';
        h += '<div class="cart-page-item-qty">';
        h += '<button class="qty-btn" onclick="DMart.Cart.changeQty(\'' + product.id + '\',-1)">−</button>';
        h += '<span class="qty-value">' + ci.qty + '</span>';
        h += '<button class="qty-btn" onclick="DMart.Cart.changeQty(\'' + product.id + '\',1)">+</button>';
        h += '</div>';
        h += '<div class="cart-page-item-total">' + DMart.utils.formatCurrency(product.price * ci.qty) + '</div>';
        h += '<button class="cart-page-item-remove" onclick="DMart.Cart.removeItem(\'' + product.id + '\')" title="Remove">🗑</button>';
        h += '</div>';
      }
      h += '</div>';

      /* Right: summary */
      var subtotal = total;
      var delivery = subtotal >= 499 ? 0 : 49;
      var gst = Math.round(subtotal * 0.05 * 100) / 100;
      var grandTotal = subtotal + delivery + gst;

      h += '<div class="cart-page-summary">';
      h += '<h3>Order Summary</h3>';
      h += '<div class="summary-row"><span>Subtotal (' + count + ' items)</span><span>' + DMart.utils.formatCurrency(subtotal) + '</span></div>';
      h += '<div class="summary-row"><span>Delivery Charges</span><span class="' + (delivery === 0 ? 'free' : '') + '">' + (delivery === 0 ? 'FREE' : DMart.utils.formatCurrency(delivery)) + '</span></div>';
      if (delivery === 0) {
        h += '<div class="summary-note">🎉 You saved ₹49 on delivery!</div>';
      } else {
        h += '<div class="summary-note">Add ₹' + (499 - subtotal).toFixed(0) + ' more for free delivery</div>';
      }
      h += '<div class="summary-row"><span>GST (5%)</span><span>' + DMart.utils.formatCurrency(gst) + '</span></div>';
      h += '<div class="summary-divider"></div>';
      h += '<div class="summary-row summary-total"><span>Total</span><span>' + DMart.utils.formatCurrency(grandTotal) + '</span></div>';
      h += '<button class="btn btn-primary btn-lg" style="width:100%;margin-top:16px" onclick="DMart.navigate(\'checkout\')">Proceed to Checkout</button>';
      h += '<button class="btn btn-secondary" style="width:100%;margin-top:8px" onclick="DMart.navigate(\'store\')">Continue Shopping</button>';
      h += '</div>';

      h += '</div>'; /* /cart-page-layout */
    }

    h += '</div>'; /* /cart-page */
    return h;
  };

  /* ---- clear all ---- */
  Cart.clearAll = function () {
    if (!confirm('Are you sure you want to clear your entire cart?')) return;
    DMart.state.cart = [];
    DMart.saveState();
    DMart.utils.emit('cart-updated');
    DMart.utils.toast('Cart cleared', 'info');
    DMart.navigate('cart');
  };

  /* ---- init (for full page) ---- */
  Cart.init = function () {
    /* Most actions use onclick handlers; nothing extra needed */
  };

  /* ---- Listen for cart-updated events ---- */
  window.addEventListener('cart-updated', function () {
    Cart.updateBadge();
    if (sidebarOpen) Cart.updateSidebar();
    /* If currently on the cart page, re-render */
    if (DMart.state.currentPage === 'cart') {
      DMart.navigate('cart');
    }
  });

  /* expose */
  window.DMart = window.DMart || {};
  DMart.Cart = Cart;
})();
