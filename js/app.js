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
    h += '<div class="logo-d" style="background:#ffffff;color:var(--primary);width:32px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:800;font-size:20px;">D</div>';
    h += '<span style="font-family:var(--font-display);font-weight:800;letter-spacing:-0.5px;color:#ffffff;font-size:20px;">DMart</span>';
    h += '<span style="font-family:var(--font-body);font-size:11px;font-weight:600;background:var(--secondary);color:#212121;padding:2px 8px;border-radius:12px;margin-left:4px;">Delivery</span>';
    h += '</a>';

    /* Location Badge */
    h += '<div class="navbar-location" style="display:flex;align-items:center;gap:6px;margin-left:20px;border-left:1px solid rgba(255,255,255,0.2);padding-left:20px;font-size:13px;color:#ffffff;">';
    h += '<span style="color:var(--secondary);font-weight:700;">⚡ 10 mins</span>';
    h += '<span style="color:rgba(255,255,255,0.3);">|</span>';
    h += '<span style="color:rgba(255,255,255,0.9);">📍 Mancherial District, TS</span>';
    h += '</div>';

    /* Nav links */
    h += '<div class="nav-links" style="display:flex;align-items:center;gap:8px;margin-left:auto;margin-right:16px;">';
    h += '<a class="nav-link' + (page === 'store' ? ' active' : '') + '" onclick="DMart.navigate(\'store\')">🏪 Shop</a>';
    h += '<a class="nav-link' + (page === 'orders' ? ' active' : '') + '" onclick="DMart.navigate(\'orders\')">📦 Orders</a>';
    h += '<a class="nav-link' + (page === 'tickets' ? ' active' : '') + '" onclick="DMart.navigate(\'tickets\')">🎧 Support</a>';
    h += '<a class="nav-link' + (page === 'auditing' ? ' active' : '') + '" onclick="DMart.navigate(\'auditing\')">🛡️ Auditing</a>';
    if (isAdmin || user.role === 'sales' || user.role === 'delivery') {
      h += '<a class="nav-link' + (page === 'dashboard' ? ' active' : '') + '" onclick="DMart.navigate(\'dashboard\')">📊 Dashboard</a>';
    }
    h += '</div>';

    /* Actions */
    h += '<div class="nav-actions" style="display:flex;align-items:center;gap:12px;">';

    /* Cart */
    h += '<button class="btn cart-badge" onclick="DMart.Cart.toggleSidebar()" style="background:var(--secondary);color:#212121;padding:8px 16px;border-radius:6px;font-weight:800;display:flex;align-items:center;gap:8px;border:none;box-shadow:none;position:relative;">';
    h += '🛒 Cart';
    h += '<span class="cart-count" id="cart-count" style="background:#ffffff;color:var(--primary);font-size:11px;font-weight:800;min-width:18px;height:18px;border-radius:9px;display:' + (cartCount > 0 ? 'flex' : 'none') + ';align-items:center;justify-content:center;margin-left:2px;">' + cartCount + '</span>';
    h += '</button>';

    /* User */
    if (loggedIn) {
      h += '<div class="user-menu-wrapper" id="user-menu-wrapper">';
      h += '<button class="user-avatar-btn" id="user-avatar-btn" onclick="DMart.toggleUserMenu()" style="background:none;border:none;cursor:pointer;">';
      h += '<span class="user-avatar" style="width:36px;height:36px;border-radius:50%;background:var(--secondary);color:#212121;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;">' + escHtml(user.avatar || '??') + '</span>';
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
      h += '<button class="btn btn-secondary btn-sm" onclick="DMart.navigate(\'login\')" style="background:#ffffff;color:var(--primary);border:none;font-weight:700;padding:8px 16px;border-radius:6px;">Sign In</button>';
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
     Orders page (with step-by-step progress workflow tracking)
     ============================================================ */
  var OrdersPage = {};

  function renderOrderWorkflow(status) {
    var step1 = true;
    var step2 = true;
    var step3 = status === 'out_for_delivery' || status === 'delivered';
    var step4 = status === 'delivered';

    var h = '';
    h += '<div class="order-workflow-timeline" style="margin-top:20px; padding:20px 0 10px; border-top:1px dashed var(--border); display:flex; flex-direction:column; gap:16px; animation:fadeInUp 0.3s ease;">';
    h += '<h4 style="font-size:12px; font-weight:800; color:var(--text-primary); margin-bottom:4px; text-transform:uppercase; letter-spacing:0.5px; text-align:left;">📍 Delivery Progress Timeline</h4>';
    
    h += '<div style="display:flex; justify-content:space-between; position:relative; padding:10px 0; min-height:80px;">';
    
    // Progress line behind circles
    var lineWidth = '0%';
    if (step4) lineWidth = '100%';
    else if (step3) lineWidth = '66%';
    else lineWidth = '33%';
    
    h += '<div style="position:absolute; top:24px; left:10%; right:10%; height:4px; background:#e2e8f0; z-index:1; border-radius:2px;"></div>';
    h += '<div style="position:absolute; top:24px; left:10%; width:calc(' + lineWidth + ' - 0px); height:4px; background:var(--primary); z-index:2; border-radius:2px; transition:width 0.4s ease;"></div>';
    
    // Step 1: Placed
    h += renderWorkflowStep('Placed', '🛒', step1, 'Order Confirmed');
    // Step 2: Packed
    h += renderWorkflowStep('Packed', '📦', step2, 'At Store Depot');
    // Step 3: Dispatched
    h += renderWorkflowStep('Dispatched', '🚚', step3, 'Out for Delivery');
    // Step 4: Delivered
    h += renderWorkflowStep('Delivered', '🏠', step4, 'Order Received');

    h += '</div>'; // close flex timeline
    h += '</div>'; // close workflow
    return h;
  }

  function renderWorkflowStep(label, emoji, active, subtitle) {
    var circleBg = active ? 'var(--primary)' : '#e2e8f0';
    var textColor = active ? 'var(--text-primary)' : 'var(--text-muted)';
    var fontWeight = active ? '800' : '500';
    var checkmark = active ? '✓' : emoji;
    
    var h = '';
    h += '<div style="display:flex; flex-direction:column; align-items:center; width:22%; text-align:center; z-index:3; position:relative;">';
    h += '<div style="width:30px; height:30px; border-radius:50%; background:' + circleBg + '; color:white; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; box-shadow:0 2px 4px rgba(0,0,0,0.08); transition:background 0.3s;">';
    h += checkmark;
    h += '</div>';
    h += '<span style="font-size:12px; font-weight:' + fontWeight + '; color:' + textColor + '; margin-top:8px; display:block;">' + label + '</span>';
    h += '<span style="font-size:9px; color:var(--text-muted); display:block; margin-top:2px; line-height:1.2;">' + subtitle + '</span>';
    h += '</div>';
    return h;
  }

  DMart.toggleOrderTracking = function(orderId) {
    var el = document.getElementById('tracking-container-' + orderId);
    var btn = document.getElementById('track-btn-' + orderId);
    if (el) {
      var isHidden = el.style.display === 'none';
      el.style.display = isHidden ? 'block' : 'none';
      if (btn) {
        btn.textContent = isHidden ? '🔼 Hide Tracker' : '🔍 Track Order';
      }
    }
  };

  OrdersPage.render = function () {
    var orders = DMart.state.orders || [];
    var h = '';
    h += '<div class="orders-page" style="max-width:800px; margin:0 auto; padding:32px 16px; animation:fadeIn 0.4s ease;">';
    h += '<h1 class="page-title" style="font-family:var(--font-display); font-size:26px; font-weight:800; color:var(--text-primary); margin-bottom:24px;">📦 My Orders</h1>';

    if (orders.length === 0) {
      h += '<div class="orders-empty" style="text-align:center; padding:48px 24px; background:white; border:1px solid var(--border); border-radius:12px; box-shadow:var(--shadow);">';
      h += '<div class="cart-empty-icon" style="font-size:64px; margin-bottom:16px;">📦</div>';
      h += '<h2 style="font-size:18px; font-weight:800; color:var(--text-primary); margin-bottom:8px;">No orders yet</h2>';
      h += '<p style="color:var(--text-secondary); font-size:13px; margin-bottom:20px;">When you place orders, they will appear here.</p>';
      h += '<button class="btn btn-primary btn-lg" onclick="DMart.navigate(\'store\')" style="background:var(--primary); color:white; font-weight:700; border-radius:8px; border:none; padding:12px 24px; cursor:pointer;">Start Shopping</button>';
      h += '</div>';
    } else {
      for (var i = 0; i < orders.length; i++) {
        var order = orders[i];
        var d = new Date(order.date);
        var dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

        h += '<div class="order-card" style="background:white; border:1px solid var(--border); border-radius:12px; padding:20px; margin-bottom:20px; box-shadow:var(--shadow); transition:transform 0.2s;" onmouseover="this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.transform=\'translateY(0)\'">';
        h += '<div class="order-card-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-light); padding-bottom:12px; margin-bottom:12px;">';
        h += '<div>';
        h += '<strong style="font-size:14px; color:var(--text-primary);">' + escHtml(order.id) + '</strong>';
        h += '<span class="order-date" style="font-size:12px; color:var(--text-muted);"> · ' + dateStr + '</span>';
        h += '</div>';
        
        var statusLabel = order.status === 'confirmed' ? 'Packed' : (order.status === 'out_for_delivery' ? 'Out for Delivery' : 'Delivered');
        var statusColor = order.status === 'delivered' ? 'var(--success)' : (order.status === 'out_for_delivery' ? 'var(--warning)' : 'var(--primary)');
        var statusBg = order.status === 'delivered' ? 'var(--success-bg)' : (order.status === 'out_for_delivery' ? 'var(--warning-bg)' : 'var(--info-bg)');
        
        h += '<span class="order-status" style="background:' + statusBg + '; color:' + statusColor + '; font-size:11px; font-weight:700; padding:4px 10px; border-radius:20px;">' + statusLabel + '</span>';
        h += '</div>';
        
        h += '<div class="order-card-items" style="display:flex; flex-direction:column; gap:8px; margin-bottom:12px;">';
        var showItems = order.items.slice(0, 4);
        for (var j = 0; j < showItems.length; j++) {
          var it = showItems[j];
          h += '<div class="order-card-item" style="display:flex; justify-content:space-between; font-size:13px; color:var(--text-secondary);">';
          h += '<span style="flex:1;">' + it.emoji + ' ' + escHtml(it.name) + ' × ' + it.qty + '</span>';
          h += '<span style="font-weight:700; color:var(--text-primary);">' + DMart.utils.formatCurrency(it.total) + '</span>';
          h += '</div>';
        }
        if (order.items.length > 4) {
          h += '<div class="order-card-more" style="font-size:11px; color:var(--text-muted); font-weight:600; margin-top:4px;">+' + (order.items.length - 4) + ' more items</div>';
        }
        h += '</div>';
        
        h += '<div class="order-card-footer" style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-light); padding-top:12px; margin-top:12px;">';
        h += '<span style="font-size:12px; color:var(--text-muted);">Payment: ' + escHtml(order.payment) + '</span>';
        h += '<div style="display:flex; align-items:center; gap:12px;">';
        h += '<strong style="font-size:15px; color:var(--text-primary);">Total: ' + DMart.utils.formatCurrency(order.total) + '</strong>';
        h += '<button class="btn btn-secondary btn-sm" id="track-btn-' + order.id + '" onclick="DMart.toggleOrderTracking(\'' + order.id + '\')" style="background:var(--primary); color:white; border:none; padding:6px 12px; border-radius:6px; font-weight:700; cursor:pointer; font-size:11px;">🔍 Track Order</button>';
        h += '</div>';
        h += '</div>';
        
        // Collapsible tracking timeline container
        h += '<div id="tracking-container-' + order.id + '" style="display:none;">';
        h += renderOrderWorkflow(order.status);
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

    /* Stop store slideshow if active */
    if (DMart.Store && DMart.Store.stopSlideShow) {
      DMart.Store.stopSlideShow();
    }

    /* Auth redirect */
    var protectedPages = ['checkout', 'orders', 'dashboard', 'tickets', 'auditing'];
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
      case 'tickets':
        module = DMart.Tickets;
        break;
      case 'auditing':
        module = DMart.Auditing;
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

    /* Render floating role switcher */
    if (typeof renderRoleSwitcher === 'function') {
      renderRoleSwitcher();
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
  function renderRoleSwitcher() {
    var existing = document.getElementById('role-switcher-widget');
    if (existing) existing.remove();

    var user = DMart.state.user;
    if (!user) return; // Only show if logged in

    var container = document.createElement('div');
    container.id = 'role-switcher-widget';
    container.className = 'role-switcher-container';
    
    var h = '';
    h += '<button class="role-switcher-pill" onclick="DMart.toggleRoleDropdown()">';
    h += '🔑 Role: <strong style="text-transform:capitalize">' + user.role.replace('_', ' ') + '</strong> ▾';
    h += '</button>';
    h += '<div class="role-switcher-dropdown" id="role-switcher-dropdown">';
    h += '<div style="padding:4px 12px; font-size:10px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Switch Role (Test)</div>';
    h += '<div class="role-switcher-item" onclick="DMart.setRole(\'customer\')">👤 Customer</div>';
    h += '<div class="role-switcher-item" onclick="DMart.setRole(\'super_manager\')">👑 Super Manager</div>';
    h += '<div class="role-switcher-item" onclick="DMart.setRole(\'manager\')">📋 Store Manager</div>';
    h += '<div class="role-switcher-item" onclick="DMart.setRole(\'sales\')">🏷️ Sales Man</div>';
    h += '<div class="role-switcher-item" onclick="DMart.setRole(\'delivery\')">🚴 Delivery Partner</div>';
    h += '</div>';

    container.innerHTML = h;
    document.body.appendChild(container);
  }

  DMart.toggleRoleDropdown = function() {
    var dd = document.getElementById('role-switcher-dropdown');
    if (dd) dd.classList.toggle('open');
  };

  DMart.setRole = function(role) {
    if (!DMart.state.user) return;
    DMart.state.user.role = role;
    
    var roleNames = {
      customer: 'Priya Sharma',
      super_manager: 'Karan Johar',
      manager: 'Rajesh Kumar',
      sales: 'Arjun Singh',
      delivery: 'Vijay Kumar'
    };
    DMart.state.user.name = roleNames[role];
    
    var initials = {
      customer: 'PS',
      super_manager: 'KJ',
      manager: 'RK',
      sales: 'AS',
      delivery: 'VK'
    };
    DMart.state.user.avatar = initials[role];
    
    DMart.saveState();
    DMart.utils.toast('Switched role to ' + role.replace('_', ' ') + '!', 'success');
    
    // Close dropdown
    var dd = document.getElementById('role-switcher-dropdown');
    if (dd) dd.classList.remove('open');
    
    // Refresh page
    DMart.navigate(DMart.state.currentPage || 'store');
  };

  /* Close role dropdown on outside click */
  document.addEventListener('click', function (e) {
    var dd = document.getElementById('role-switcher-dropdown');
    if (dd && dd.classList.contains('open') && !e.target.closest('#role-switcher-widget')) {
      dd.classList.remove('open');
    }
  });

  function boot() {
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
