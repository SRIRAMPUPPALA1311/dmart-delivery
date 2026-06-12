/* ============================================================
   DMart Delivery – Auth Module (Login / Signup)
   ============================================================ */
(function () {
  'use strict';

  var Auth = {};

  /* ---- helpers ---- */
  Auth.togglePassword = function (fieldId) {
    var inp = document.getElementById(fieldId);
    if (!inp) return;
    inp.type = inp.type === 'password' ? 'text' : 'password';
  };

  Auth.demoLogin = function (role) {
    var users = {
      customer: { email: 'customer@dmart.com', name: 'Priya Sharma', role: 'customer', avatar: 'PS' },
      admin:    { email: 'admin@dmart.com',    name: 'Rajesh Kumar', role: 'admin',    avatar: 'RK' }
    };
    var u = users[role] || users.customer;
    DMart.state.user = u;
    DMart.saveState();
    DMart.utils.toast('Welcome, ' + u.name + '!', 'success');
    DMart.navigate('store');
  };

  /* ---- render ---- */
  Auth.render = function (params) {
    var mode = (params && params.mode) || 'login';
    return mode === 'signup' ? renderSignup() : renderLogin();
  };

  function renderLogin() {
    return '' +
      '<div class="auth-container">' +
        '<div class="auth-card">' +
          '<div class="auth-logo">🛒 <span>D</span>Mart</div>' +
          '<h1 class="auth-title">Welcome Back</h1>' +
          '<p class="auth-subtitle">Sign in to your account to continue shopping</p>' +
          '<div class="auth-error" id="auth-error"></div>' +
          '<form id="login-form">' +
            '<div class="input-group">' +
              '<label>Email Address</label>' +
              '<input type="email" class="input-field" id="login-email" placeholder="you@example.com" required>' +
            '</div>' +
            '<div class="input-group">' +
              '<label>Password</label>' +
              '<div class="input-with-icon">' +
                '<input type="password" class="input-field" id="login-password" placeholder="Enter your password" required>' +
                '<button type="button" class="password-toggle" onclick="DMart.Auth.togglePassword(\'login-password\')">👁</button>' +
              '</div>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary btn-lg" style="width:100%">Sign In</button>' +
          '</form>' +
          '<div class="auth-divider">or continue with</div>' +
          '<div style="display:flex;gap:12px">' +
            '<button class="btn btn-secondary" style="flex:1" onclick="DMart.Auth.demoLogin(\'customer\')">👤 Demo Customer</button>' +
            '<button class="btn btn-secondary" style="flex:1" onclick="DMart.Auth.demoLogin(\'admin\')">👑 Demo Admin</button>' +
          '</div>' +
          '<div class="auth-footer">' +
            'Don\'t have an account? <a onclick="DMart.navigate(\'signup\')">Sign Up</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderSignup() {
    return '' +
      '<div class="auth-container">' +
        '<div class="auth-card">' +
          '<div class="auth-logo">🛒 <span>D</span>Mart</div>' +
          '<h1 class="auth-title">Create Account</h1>' +
          '<p class="auth-subtitle">Join DMart for the best grocery deals</p>' +
          '<div class="auth-error" id="auth-error"></div>' +
          '<form id="signup-form">' +
            '<div class="input-group">' +
              '<label>Full Name</label>' +
              '<input type="text" class="input-field" id="signup-name" placeholder="Enter your full name" required>' +
            '</div>' +
            '<div class="input-group">' +
              '<label>Email Address</label>' +
              '<input type="email" class="input-field" id="signup-email" placeholder="you@example.com" required>' +
            '</div>' +
            '<div class="input-group">' +
              '<label>Password</label>' +
              '<div class="input-with-icon">' +
                '<input type="password" class="input-field" id="signup-password" placeholder="Create a password" required>' +
                '<button type="button" class="password-toggle" onclick="DMart.Auth.togglePassword(\'signup-password\')">👁</button>' +
              '</div>' +
            '</div>' +
            '<div class="input-group">' +
              '<label>Confirm Password</label>' +
              '<div class="input-with-icon">' +
                '<input type="password" class="input-field" id="signup-confirm" placeholder="Confirm your password" required>' +
                '<button type="button" class="password-toggle" onclick="DMart.Auth.togglePassword(\'signup-confirm\')">👁</button>' +
              '</div>' +
            '</div>' +
            '<div class="input-group">' +
              '<label>Role</label>' +
              '<div class="role-selector" id="role-selector">' +
                '<div class="role-option selected" data-role="customer">' +
                  '<span class="role-icon">👤</span>' +
                  '<span class="role-label">Customer</span>' +
                '</div>' +
                '<div class="role-option" data-role="manager">' +
                  '<span class="role-icon">📋</span>' +
                  '<span class="role-label">Manager</span>' +
                '</div>' +
                '<div class="role-option" data-role="admin">' +
                  '<span class="role-icon">👑</span>' +
                  '<span class="role-label">Admin</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary btn-lg" style="width:100%">Create Account</button>' +
          '</form>' +
          '<div class="auth-divider">or continue with</div>' +
          '<div style="display:flex;gap:12px">' +
            '<button class="btn btn-secondary" style="flex:1" onclick="DMart.Auth.demoLogin(\'customer\')">👤 Demo Customer</button>' +
            '<button class="btn btn-secondary" style="flex:1" onclick="DMart.Auth.demoLogin(\'admin\')">👑 Demo Admin</button>' +
          '</div>' +
          '<div class="auth-footer">' +
            'Already have an account? <a onclick="DMart.navigate(\'login\')">Sign In</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ---- init ---- */
  Auth.init = function (params) {
    var mode = (params && params.mode) || 'login';

    if (mode === 'signup') {
      initSignup();
    } else {
      initLogin();
    }
  };

  function showAuthError(msg) {
    var el = document.getElementById('auth-error');
    if (el) {
      el.textContent = msg;
      el.style.display = 'block';
    }
  }

  function hideAuthError() {
    var el = document.getElementById('auth-error');
    if (el) el.style.display = 'none';
  }

  function makeInitials(name) {
    if (!name) return 'U';
    var parts = name.trim().split(/\s+/);
    if (parts.length >= 2 && parts[0] && parts[1]) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase() || 'U';
  }

  function initLogin() {
    var form = document.getElementById('login-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideAuthError();
      var email = document.getElementById('login-email').value.trim();
      var password = document.getElementById('login-password').value;
      if (!email || email.indexOf('@') === -1) {
        showAuthError('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        showAuthError('Password must be at least 6 characters.');
        return;
      }
      
      var usersList = JSON.parse(localStorage.getItem('dmart_users') || '[]');
      var found = usersList.find(function(u) { return u.email === email && u.password === password; });
      
      var user;
      if (found) {
        user = found;
      } else {
        // Fallback for new demo users or incorrect passwords for demo emails
        var name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
        if (!name) name = "User";
        
        var role = 'customer';
        if (email.toLowerCase().indexOf('admin') !== -1) role = 'admin';
        else if (email.toLowerCase().indexOf('manager') !== -1) role = 'manager';
        
        user = {
          email: email,
          name: name,
          role: role,
          avatar: makeInitials(name)
        };
      }
      
      DMart.state.user = user;
      DMart.saveState();
      DMart.utils.toast('Welcome back, ' + user.name + '!', 'success');
      DMart.navigate('store');
    });
  }

  function initSignup() {
    /* role selector */
    var selectedRole = 'customer';
    var roleSelector = document.getElementById('role-selector');
    if (roleSelector) {
      roleSelector.addEventListener('click', function (e) {
        var opt = e.target.closest('.role-option');
        if (!opt) return;
        roleSelector.querySelectorAll('.role-option').forEach(function (el) { el.classList.remove('selected'); });
        opt.classList.add('selected');
        selectedRole = opt.getAttribute('data-role');
      });
    }

    var form = document.getElementById('signup-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideAuthError();
      var name     = document.getElementById('signup-name').value.trim();
      var email    = document.getElementById('signup-email').value.trim();
      var password = document.getElementById('signup-password').value;
      var confirm  = document.getElementById('signup-confirm').value;

      if (!name || name.length < 2) {
        showAuthError('Please enter your full name.');
        return;
      }
      if (!email || email.indexOf('@') === -1) {
        showAuthError('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        showAuthError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirm) {
        showAuthError('Passwords do not match.');
        return;
      }

      var user = {
        email: email,
        name: name,
        role: selectedRole,
        password: password,
        avatar: makeInitials(name)
      };
      
      var usersList = JSON.parse(localStorage.getItem('dmart_users') || '[]');
      if (usersList.some(function(u) { return u.email === email; })) {
        showAuthError('An account with this email already exists.');
        return;
      }
      usersList.push(user);
      localStorage.setItem('dmart_users', JSON.stringify(usersList));

      DMart.state.user = user;
      DMart.saveState();
      DMart.utils.toast('Account created! Welcome, ' + user.name + '!', 'success');
      DMart.navigate('store');
    });
  }

  /* expose */
  window.DMart = window.DMart || {};
  DMart.Auth = Auth;
})();
