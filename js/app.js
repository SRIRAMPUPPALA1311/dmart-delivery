/* ============================================================
   DMart Delivery – App Shell / Router  (loads LAST)
   ============================================================ */
(function () {
  'use strict';

  var userMenuOpen = false;

  /* ============================================================
     Navbar
     ============================================================ */
  function renderNavbar() {
    var user = DMart.state.user;
    var loggedIn = DMart.isLoggedIn();
    var cartCount = DMart.getCartCount();
    var page = DMart.state.currentPage || '';
    var isAdmin = loggedIn && (user.role === 'admin' || user.role === 'manager');

    var h = '';
    h += '<nav class="navbar">';
    h += '<div class="navbar-inner">';

    /* Logo */
    h += '<a class="navbar-logo" onclick="DMart.navigate(\'store\')" style="display:flex;align-items:center;gap:8px;text-decoration:none;cursor:pointer;">';
    h += '<div class="logo-d" style="background:#16a34a;color:white;width:32px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:800;font-size:20px;">D</div>';
    h += '<span style="font-family:var(--font-display);font-weight:800;letter-spacing:-0.5px;color:var(--text-primary);font-size:20px;">DMart</span>';
    h += '<span style="font-family:var(--font-body);font-size:11px;font-weight:600;background:#fef3c7;color:#d97706;padding:2px 8px;border-radius:12px;margin-left:4px;">Delivery</span>';
    h += '</a>';

    /* Location Badge */
    h += '<div class="navbar-location" style="display:flex;align-items:center;gap:6px;margin-left:20px;border-left:1px solid var(--border);padding-left:20px;font-size:13px;">';
    h += '<span style="color:#16a34a;font-weight:700;">⚡ 10 mins</span>';
    h += '<span style="color:var(--text-muted);">|</span>';
    h += '<span style="color:var(--text-secondary);">📍 Mumbai, MH</span>';
    h += '</div>';

    /* Nav links */
    h += '<div class="nav-links" style="display:flex;align-items:center;gap:8px;margin-left:auto;margin-right:16px;">';
    h += '<a class="nav-link' + (page === 'store' ? ' active' : '') + '" onclick="DMart.navigate(\'store\')">🏪 Shop</a>';
    h += '<a class="nav-link' + (page === 'orders' ? ' active' : '') + '" onclick="DMart.navigate(\'orders\')">📦 Orders</a>';
    if (isAdmin) {
      h += '<a class="nav-link' + (page === 'dashboard' ? ' active' : '') + '" onclick="DMart.navigate(\'dashboard\')">📊 Dashboard</a>';
    }
    h += '</div>';

    /* Actions */
    h += '<div class="nav-actions" style="display:flex;align-items:center;gap:12px;">';

    /* Cart */
    h += '<button class="btn cart-badge" onclick="DMart.Cart.toggleSidebar()" style="background:#16a34a;color:white;padding:10px 16px;border-radius:8px;font-weight:700;display:flex;align-items:center;gap:8px;border:none;box-shadow:none;position:relative;">';
    h += '🛒 Cart';
    h += '<span class="cart-count" id="cart-count" style="background:#ffffff;color:#16a34a;font-size:11px;font-weight:800;min-width:18px;height:18px;border-radius:9px;display:' + (cartCount > 0 ? 'flex' : 'none') + ';align-items:center;justify-content:center;margin-left:2px;">' + cartCount + '</span>';
    h += '</button>';

    /* User */
    if (loggedIn) {
      h += '<div class="user-menu-wrapper" id="user-menu-wrapper">';
      h += '<button class="user-avatar-btn" id="user-avatar-btn" onclick="DMart.toggleUserMenu()" style="background:none;border:none;cursor:pointer;">';
      h += '<span class="user-avatar" style="width:36px;height:36px;border-radius:50%;background:#16a34a;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:14px;">' + escHtml(user.avatar || '??') + '</span>';
      h += '</button>';
      h += '<div class="user-dropdown" id="user-dropdown">';
      h += '<div class="user-dropdown-header">';
      h += '<span class="user-avatar lg">' + escHtml(user.avatar || '??') + '</span>';
      h += '<div><strong>' + escHtml(user.name) + '</strong><br><small>' + escHtml(user.email) + '</small></div>';
      h += '</div>';
      h += '<div class="user-dropdown-divider"></div>';
      h += '<a class="user-dropdown-item" onclick="DMart.utils.toast(\'Profile page coming soon!\',\'info\');DMart.closeUserMenu()">👤 Profile</a>';
      h += '<a class="user-dropdown-item" onclick="DMart.navigate(\'orders\');DMart.closeUserMenu()">📦 My Orders</a>';
      h += '<div class="user-dropdown-divider"></div>';
      h += '<a class="user-dropdown-item logout" onclick="DMart.logout()">🚪 Logout</a>';
      h += '</div>';
      h += '</div>';
    } else {
      h += '<button class="btn btn-primary btn-sm" onclick="DMart.navigate(\'login\')">Sign In</button>';
    }

    h += '</div>'; /* /nav-actions */
    h += '</div>'; /* /navbar-inner */
    h += '</nav>';
    return h;
  }

  /* Expose renderNavbar globally so other modules can use it during re-render */
  DMart.renderNavbar = renderNavbar;

  function escHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---- User Menu ---- */
  DMart.toggleUserMenu = function () {
    userMenuOpen = !userMenuOpen;
    var dd = document.getElementById('user-dropdown');
    if (dd) dd.classList.toggle('open', userMenuOpen);
  };

  DMart.closeUserMenu = function () {
    userMenuOpen = false;
    var dd = document.getElementById('user-dropdown');
    if (dd) dd.classList.remove('open');
  };

  DMart.logout = function () {
    DMart.state.user = null;
    DMart.state.cart = [];
    DMart.state.wishlist = [];
    DMart.state.orders = [];
    DMart.saveState();
    DMart.utils.toast('You have been logged out', 'info');
    DMart.navigate('login');
  };

  /* ============================================================
     Orders page (simple built-in)
     ============================================================ */
  var OrdersPage = {};

  OrdersPage.render = function () {
    var orders = DMart.state.orders || [];
    var h = '';
    h += '<div class="orders-page">';
    h += '<h1 class="page-title">📦 My Orders</h1>';

    if (orders.length === 0) {
      h += '<div class="orders-empty">';
      h += '<div class="cart-empty-icon">📦</div>';
      h += '<h2>No orders yet</h2>';
      h += '<p>When you place orders, they will appear here.</p>';
      h += '<button class="btn btn-primary btn-lg" onclick="DMart.navigate(\'store\')">Start Shopping</button>';
      h += '</div>';
    } else {
      for (var i = 0; i < orders.length; i++) {
        var order = orders[i];
        var d = new Date(order.date);
        var dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

        h += '<div class="order-card">';
        h += '<div class="order-card-header">';
        h += '<div>';
        h += '<strong>' + escHtml(order.id) + '</strong>';
        h += '<span class="order-date"> · ' + dateStr + '</span>';
        h += '</div>';
        h += '<span class="order-status status-' + order.status + '">' + capitalise(order.status) + '</span>';
        h += '</div>';
        h += '<div class="order-card-items">';
        var showItems = order.items.slice(0, 4);
        for (var j = 0; j < showItems.length; j++) {
          var it = showItems[j];
          h += '<div class="order-card-item">';
          h += '<span>' + it.emoji + '</span>';
          h += '<span>' + escHtml(it.name) + ' × ' + it.qty + '</span>';
          h += '<span>' + DMart.utils.formatCurrency(it.total) + '</span>';
          h += '</div>';
        }
        if (order.items.length > 4) {
          h += '<div class="order-card-more">+' + (order.items.length - 4) + ' more items</div>';
        }
        h += '</div>';
        h += '<div class="order-card-footer">';
        h += '<span>Payment: ' + escHtml(order.payment) + '</span>';
        h += '<strong>Total: ' + DMart.utils.formatCurrency(order.total) + '</strong>';
        h += '</div>';
        h += '</div>';
      }
    }

    h += '</div>';
    return h;
  };

  OrdersPage.init = function () { /* no special listeners needed */ };

  function capitalise(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  }

  /* ============================================================
     Dashboard placeholder (simple built-in if no external module)
     ============================================================ */
  var DashboardFallback = {};
  DashboardFallback.render = function (params) {
    var h = '';
    h += '<div class="dashboard-page">';
    h += '<h1 class="page-title">📊 Dashboard</h1>';
    h += '<div class="dashboard-placeholder">';
    h += '<div class="cart-empty-icon">📊</div>';
    h += '<h2>Dashboard</h2>';
    h += '<p>Admin dashboard module is loading…</p>';
    h += '</div>';
    h += '</div>';
    return h;
  };
  DashboardFallback.init = function () {};

  /* ============================================================
     Router / Navigation
     ============================================================ */
  var authPages = ['login', 'signup'];
  var noNavPages = ['login', 'signup'];

  DMart.navigate = function (page, params) {
    params = params || {};

    /* Auth redirect */
    var protectedPages = ['checkout', 'orders', 'dashboard'];
    if (protectedPages.indexOf(page) !== -1 && !DMart.isLoggedIn()) {
      DMart.navigate('login');
      return;
    }

    DMart.state.currentPage = page;

    var module = null;
    var renderParams = params;

    switch (page) {
      case 'login':
        module = DMart.Auth;
        renderParams = { mode: 'login' };
        break;
      case 'signup':
        module = DMart.Auth;
        renderParams = { mode: 'signup' };
        break;
      case 'store':
        module = DMart.Store;
        break;
      case 'cart':
        module = DMart.Cart;
        break;
      case 'checkout':
        module = DMart.Checkout;
        break;
      case 'dashboard':
        module = DMart.Dashboard || DashboardFallback;
        break;
      case 'orders':
        module = OrdersPage;
        break;
      default:
        module = DMart.Store;
        page = 'store';
        break;
    }

    if (!module) {
      console.warn('[DMart] No module found for page:', page);
      return;
    }

    var appEl = document.getElementById('app');
    if (!appEl) return;

    var showNav = noNavPages.indexOf(page) === -1;
    var navHtml = showNav ? renderNavbar() : '';
    var sidebarHtml = showNav && DMart.Cart && DMart.Cart.renderSidebar ? DMart.Cart.renderSidebar() : '';

    var content = '';
    if (page === 'cart' && module.renderPage) {
      content = module.renderPage();
    } else if (module.render) {
      content = module.render(renderParams);
    }

    appEl.innerHTML = navHtml + '<main class="main-content">' + content + '</main>' + sidebarHtml;

    /* Init module */
    if (module.init) {
      module.init(renderParams);
    }

    /* Active nav link */
    var links = document.querySelectorAll('.nav-link');
    links.forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('data-page') === page);
    });

    /* Cart badge */
    if (DMart.Cart && DMart.Cart.updateBadge) {
      DMart.Cart.updateBadge();
    }

    /* Scroll to top */
    window.scrollTo(0, 0);

    /* Push history */
    var stateObj = { page: page, params: params };
    var url = '#' + page;
    if (history.state && history.state.page === page) {
      history.replaceState(stateObj, '', url);
    } else {
      history.pushState(stateObj, '', url);
    }
  };

  /* ============================================================
     Browser Back / Forward
     ============================================================ */
  window.addEventListener('popstate', function (e) {
    if (e.state && e.state.page) {
      DMart.navigate(e.state.page, e.state.params || {});
    }
  });

  /* ============================================================
     Cart badge updates
     ============================================================ */
  window.addEventListener('cart-updated', function () {
    if (DMart.Cart && DMart.Cart.updateBadge) DMart.Cart.updateBadge();
  });

  /* ============================================================
     Close user menu on outside click
     ============================================================ */
  document.addEventListener('click', function (e) {
    if (userMenuOpen && !e.target.closest('#user-menu-wrapper')) {
      DMart.closeUserMenu();
    }
  });

  /* ============================================================
     Boot
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    /* Initialise state if needed */
    if (!DMart.state) {
      DMart.state = { user: null, cart: [], wishlist: [], orders: [], currentPage: 'login', currentDept: '' };
    }

    /* Initial navigation */
    var hash = window.location.hash.replace('#', '') || '';
    if (DMart.isLoggedIn()) {
      DMart.navigate(hash || 'store');
    } else {
      DMart.navigate('login');
    }
  });
})();
