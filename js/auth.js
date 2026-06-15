/* ============================================================
   DMart Delivery – Auth Module (Login / Signup)
   ============================================================ */
(function () {
  'use strict';

  var Auth = {};
  var loginTab = 'email'; // 'email' or 'mobile'
  var generatedOtp = null;
  var enteredOtp = '';

  /* ---- helpers ---- */
  Auth.togglePassword = function (fieldId) {
    var inp = document.getElementById(fieldId);
    if (!inp) return;
    inp.type = inp.type === 'password' ? 'text' : 'password';
  };

  Auth.demoLogin = function (role) {
    var users = {
      customer: { email: 'customer@dmart.com', name: 'Priya Sharma', role: 'customer', avatar: 'PS' },
      super_manager: { email: 'supermanager@dmart.com', name: 'Karan Johar', role: 'super_manager', avatar: 'KJ' },
      manager:    { email: 'manager@dmart.com',    name: 'Rajesh Kumar', role: 'manager',    avatar: 'RK' },
      sales:      { email: 'salesman@dmart.com',   name: 'Arjun Singh',  role: 'sales',      avatar: 'AS' },
      delivery:   { email: 'delivery@dmart.com',   name: 'Vijay Kumar',  role: 'delivery',   avatar: 'VK' }
    };
    var u = users[role] || users.customer;
    DMart.state.user = u;
    DMart.saveState();
    DMart.utils.toast('Welcome back, ' + u.name + ' (' + u.role.replace('_', ' ') + ')!', 'success');
    DMart.navigate('store');
  };

  /* ---- render ---- */
  Auth.render = function (params) {
    var mode = (params && params.mode) || 'login';
    return mode === 'signup' ? renderSignup() : renderLogin();
  };

  function renderLogin() {
    var h = '';
    h += '<div class="auth-container" style="min-height: calc(100vh - 68px); display: flex; align-items: center; justify-content: center; padding: 40px 16px;">';
    h += '<div class="auth-card" style="width: 100%; max-width: 420px; background: white; border-radius: var(--radius-lg); border: 1px solid var(--border); padding: 32px; box-shadow: var(--shadow-lg);">';
    h += '<div class="auth-logo" style="text-align: center; margin-bottom: 24px; font-family: var(--font-display); font-size: 28px; font-weight: 800; color: var(--primary);">🛒 <span style="color:var(--text-primary)">DMart</span></div>';
    h += '<h1 class="auth-title" style="font-family: var(--font-display); font-size: 22px; font-weight: 800; text-align: center; color: var(--text-primary); margin-bottom: 8px;">Welcome Back</h1>';
    h += '<p class="auth-subtitle" style="text-align: center; font-size: 13px; color: var(--text-secondary); margin-bottom: 24px;">Sign in to check out fresh groceries and manage delivery options</p>';
    
    h += '<div class="auth-error" id="auth-error" style="background: var(--error-bg); color: var(--error); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; margin-bottom: 16px; display: none;"></div>';
    
    /* Login Tabs */
    h += '<div class="auth-tabs">';
    h += '<div class="auth-tab' + (loginTab === 'email' ? ' active' : '') + '" id="tab-email">📧 Email</div>';
    h += '<div class="auth-tab' + (loginTab === 'mobile' ? ' active' : '') + '" id="tab-mobile">📱 Mobile OTP</div>';
    h += '</div>';

    /* Email Form */
    h += '<form id="login-form-email" style="display: ' + (loginTab === 'email' ? 'block' : 'none') + ';">';
    h += '<div class="input-group" style="margin-bottom: 16px;">';
    h += '<label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Email Address</label>';
    h += '<input type="email" class="input-field" id="login-email" placeholder="you@example.com" value="customer@dmart.com" required style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;">';
    h += '</div>';
    h += '<div class="input-group" style="margin-bottom: 20px;">';
    h += '<label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Password</label>';
    h += '<div class="input-with-icon" style="position: relative;">';
    h += '<input type="password" class="input-field" id="login-password" placeholder="••••••" value="password" required style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; padding-right:40px; font-size:14px;">';
    h += '<button type="button" class="password-toggle" onclick="DMart.Auth.togglePassword(\'login-password\')" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-secondary); font-size: 16px;">👁</button>';
    h += '</div>';
    h += '</div>';
    h += '<button type="submit" class="btn btn-primary" style="width:100%; height:46px; border-radius:8px; font-size:15px; font-weight:700;">Sign In</button>';
    h += '</form>';

    /* Mobile OTP Form */
    h += '<div id="login-form-mobile" style="display: ' + (loginTab === 'mobile' ? 'block' : 'none') + ';">';
    h += '<div class="input-group" style="margin-bottom: 16px;" id="phone-input-group">';
    h += '<label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">10-Digit Mobile Number</label>';
    h += '<div style="display:flex; gap:8px;">';
    h += '<span style="display:flex; align-items:center; background:#f8fafc; border:1px solid var(--border); border-radius:8px; padding:0 10px; font-weight:700; font-size:14px; color:var(--text-primary)">+91</span>';
    h += '<input type="tel" maxlength="10" class="input-field" id="login-phone" placeholder="9876543210" style="flex:1; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;">';
    h += '</div>';
    h += '<button type="button" id="btn-send-otp" class="btn btn-secondary" style="width:100%; height:40px; margin-top:12px; font-size:13px; font-weight:700;">Send Verification OTP</button>';
    h += '</div>';

    h += '<div class="input-group" id="otp-input-group" style="margin-bottom: 20px; display: none;">';
    h += '<label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Enter 4-Digit OTP Code</label>';
    h += '<input type="text" maxlength="4" class="input-field" id="login-otp" placeholder="1234" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:16px; font-weight:800; letter-spacing:8px; text-align:center;">';
    h += '<button type="button" id="btn-verify-otp" class="btn btn-primary" style="width:100%; height:46px; margin-top:16px; font-size:15px; font-weight:700;">Verify OTP & Login</button>';
    h += '</div>';
    h += '</div>';

    h += '<div class="auth-divider" style="display: flex; align-items: center; gap: 10px; margin: 24px 0; font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--text-secondary);">';
    h += '<span style="flex: 1; height: 1px; background: var(--border);"></span>';
    h += 'or continue with';
    h += '<span style="flex: 1; height: 1px; background: var(--border);"></span>';
    h += '</div>';

    /* Google Sign In */
    h += '<button class="btn-google" id="btn-google-login">';
    h += '<svg style="width:18px;height:18px" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 15.02 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.86 3C6.26 7.55 8.91 5.04 12 5.04z"/><path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.47-1.11 2.72-2.36 3.56l3.65 2.83c2.14-1.97 3.76-4.87 3.76-8.49z"/><path fill="#FBBC05" d="M5.36 10.5C5.07 11.43 4.9 12.42 4.9 13.5s.17 2.07.46 3l-3.86 3C.54 17.58 0 15.6 0 13.5s.54-4.08 1.5-6l3.86 3z"/><path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.65-2.83c-1.1.74-2.51 1.18-4.31 1.18-3.09 0-5.74-2.51-6.64-5.46l-3.86 3C3.4 20.35 7.35 23 12 23z"/></svg>';
    h += 'Sign in with Google';
    h += '</button>';

    /* Demo Logins */
    h += '<div style="margin-top:20px;">';
    h += '<div style="font-size:11px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;margin-bottom:8px;text-align:center;">Quick Role Testing (Demos)</div>';
    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">';
    h += '<button class="btn btn-secondary btn-sm" onclick="DMart.Auth.demoLogin(\'customer\')">👤 Customer</button>';
    h += '<button class="btn btn-secondary btn-sm" onclick="DMart.Auth.demoLogin(\'super_manager\')">👑 Super Mgr</button>';
    h += '<button class="btn btn-secondary btn-sm" onclick="DMart.Auth.demoLogin(\'manager\')">📋 Store Mgr</button>';
    h += '<button class="btn btn-secondary btn-sm" onclick="DMart.Auth.demoLogin(\'sales\')">🏷️ Sales Man</button>';
    h += '</div>';
    h += '<button class="btn btn-secondary btn-sm" style="width:100%" onclick="DMart.Auth.demoLogin(\'delivery\')">🚴 Delivery Partner</button>';
    h += '</div>';

    h += '<div class="auth-footer" style="text-align: center; margin-top: 24px; font-size: 13px; color: var(--text-secondary);">';
    h += 'Don\'t have an account? <a onclick="DMart.navigate(\'signup\')" style="color: var(--primary); font-weight: 700; cursor: pointer; text-decoration: none;">Sign Up</a>';
    h += '</div>';
    h += '</div>';
    h += '</div>';
    return h;
  }

  function renderSignup() {
    var h = '';
    h += '<div class="auth-container" style="min-height: calc(100vh - 68px); display: flex; align-items: center; justify-content: center; padding: 40px 16px;">';
    h += '<div class="auth-card" style="width: 100%; max-width: 440px; background: white; border-radius: var(--radius-lg); border: 1px solid var(--border); padding: 32px; box-shadow: var(--shadow-lg);">';
    h += '<div class="auth-logo" style="text-align: center; margin-bottom: 24px; font-family: var(--font-display); font-size: 28px; font-weight: 800; color: var(--primary);">🛒 <span style="color:var(--text-primary)">DMart</span></div>';
    h += '<h1 class="auth-title" style="font-family: var(--font-display); font-size: 22px; font-weight: 800; text-align: center; color: var(--text-primary); margin-bottom: 8px;">Create Account</h1>';
    h += '<p class="auth-subtitle" style="text-align: center; font-size: 13px; color: var(--text-secondary); margin-bottom: 24px;">Join DMart to receive groceries in Mancherial District</p>';
    
    h += '<div class="auth-error" id="auth-error" style="background: var(--error-bg); color: var(--error); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; margin-bottom: 16px; display: none;"></div>';
    
    h += '<form id="signup-form">';
    h += '<div class="input-group" style="margin-bottom: 12px;">';
    h += '<label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Full Name</label>';
    h += '<input type="text" class="input-field" id="signup-name" placeholder="Enter your full name" required style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;">';
    h += '</div>';

    h += '<div class="input-group" style="margin-bottom: 12px;">';
    h += '<label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Email Address</label>';
    h += '<input type="email" class="input-field" id="signup-email" placeholder="you@example.com" required style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;">';
    h += '</div>';

    h += '<div class="input-group" style="margin-bottom: 12px;">';
    h += '<label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Password</label>';
    h += '<div class="input-with-icon" style="position: relative;">';
    h += '<input type="password" class="input-field" id="signup-password" placeholder="At least 6 characters" required style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; padding-right:40px; font-size:14px;">';
    h += '<button type="button" class="password-toggle" onclick="DMart.Auth.togglePassword(\'signup-password\')" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-secondary); font-size: 16px;">👁</button>';
    h += '</div>';
    h += '</div>';

    h += '<div class="input-group" style="margin-bottom: 16px;">';
    h += '<label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Confirm Password</label>';
    h += '<div class="input-with-icon" style="position: relative;">';
    h += '<input type="password" class="input-field" id="signup-confirm" placeholder="Re-enter password" required style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; padding-right:40px; font-size:14px;">';
    h += '<button type="button" class="password-toggle" onclick="DMart.Auth.togglePassword(\'signup-confirm\')" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-secondary); font-size: 16px;">👁</button>';
    h += '</div>';
    h += '</div>';

    h += '<div class="input-group" style="margin-bottom: 20px;">';
    h += '<label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Select User Role</label>';
    h += '<div class="role-selector" id="role-selector" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">';
    h += '<div class="role-option selected" data-role="customer" style="border: 1px solid var(--border); border-radius: 8px; padding: 10px 4px; text-align: center; cursor: pointer; font-size: 11px; font-weight: 700; color: var(--text-primary);">';
    h += '<span style="display:block;font-size:18px;margin-bottom:4px;">👤</span>Customer';
    h += '</div>';
    h += '<div class="role-option" data-role="manager" style="border: 1px solid var(--border); border-radius: 8px; padding: 10px 4px; text-align: center; cursor: pointer; font-size: 11px; font-weight: 700; color: var(--text-primary);">';
    h += '<span style="display:block;font-size:18px;margin-bottom:4px;">📋</span>Manager';
    h += '</div>';
    h += '<div class="role-option" data-role="sales" style="border: 1px solid var(--border); border-radius: 8px; padding: 10px 4px; text-align: center; cursor: pointer; font-size: 11px; font-weight: 700; color: var(--text-primary);">';
    h += '<span style="display:block;font-size:18px;margin-bottom:4px;">🏷️</span>Sales Man';
    h += '</div>';
    h += '</div>';
    h += '</div>';

    h += '<button type="submit" class="btn btn-primary" style="width:100%; height:46px; border-radius:8px; font-size:15px; font-weight:700;">Create Account</button>';
    h += '</form>';

    h += '<div class="auth-footer" style="text-align: center; margin-top: 24px; font-size: 13px; color: var(--text-secondary);">';
    h += 'Already have an account? <a onclick="DMart.navigate(\'login\')" style="color: var(--primary); font-weight: 700; cursor: pointer; text-decoration: none;">Sign In</a>';
    h += '</div>';
    h += '</div>';
    h += '</div>';
    return h;
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
    /* Bind Auth tabs */
    var tEmail = document.getElementById('tab-email');
    var tMobile = document.getElementById('tab-mobile');
    var formEmail = document.getElementById('login-form-email');
    var formMobile = document.getElementById('login-form-mobile');

    if (tEmail && tMobile) {
      tEmail.addEventListener('click', function () {
        loginTab = 'email';
        tEmail.classList.add('active');
        tMobile.classList.remove('active');
        formEmail.style.display = 'block';
        formMobile.style.display = 'none';
        hideAuthError();
      });
      tMobile.addEventListener('click', function () {
        loginTab = 'mobile';
        tMobile.classList.add('active');
        tEmail.classList.remove('active');
        formMobile.style.display = 'block';
        formEmail.style.display = 'none';
        hideAuthError();
      });
    }

    /* Email Sign In */
    if (formEmail) {
      formEmail.addEventListener('submit', function (e) {
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

        var usersList = JSON.parse(DMart.storage.getItem('dmart_users') || '[]');
        var found = usersList.find(function(u) { return u.email === email && u.password === password; });

        var user;
        if (found) {
          user = found;
        } else {
          // Demo fallback
          var name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
          if (!name) name = "User";

          var role = 'customer';
          if (email.toLowerCase().indexOf('admin') !== -1) role = 'admin';
          else if (email.toLowerCase().indexOf('supermanager') !== -1) role = 'super_manager';
          else if (email.toLowerCase().indexOf('manager') !== -1) role = 'manager';
          else if (email.toLowerCase().indexOf('salesman') !== -1) role = 'sales';
          else if (email.toLowerCase().indexOf('delivery') !== -1) role = 'delivery';

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

    /* Mobile OTP Verification */
    var btnSendOtp = document.getElementById('btn-send-otp');
    var btnVerifyOtp = document.getElementById('btn-verify-otp');
    var phoneInputGroup = document.getElementById('phone-input-group');
    var otpInputGroup = document.getElementById('otp-input-group');

    if (btnSendOtp) {
      btnSendOtp.addEventListener('click', function () {
        hideAuthError();
        var phone = document.getElementById('login-phone').value.trim();
        if (phone.length !== 10 || isNaN(phone)) {
          showAuthError('Please enter a valid 10-digit mobile number.');
          return;
        }

        // Generate OTP
        generatedOtp = String(Math.floor(1000 + Math.random() * 9000));
        DMart.utils.toast('OTP Sent! Code: ' + generatedOtp, 'warning');
        
        // Switch views
        phoneInputGroup.style.display = 'none';
        otpInputGroup.style.display = 'block';
        document.getElementById('login-otp').focus();
      });
    }

    if (btnVerifyOtp) {
      btnVerifyOtp.addEventListener('click', function () {
        hideAuthError();
        var otp = document.getElementById('login-otp').value.trim();
        if (otp !== generatedOtp) {
          showAuthError('Incorrect OTP. Please check the code and try again.');
          return;
        }

        var phone = document.getElementById('login-phone').value.trim();
        var user = {
          email: phone + '@dmart-otp.com',
          name: 'User ' + phone.substring(6),
          role: 'customer',
          avatar: 'U' + phone.substring(8)
        };

        DMart.state.user = user;
        DMart.saveState();
        DMart.utils.toast('Phone Verified! Welcome, ' + user.name + '!', 'success');
        DMart.navigate('store');
      });
    }

    /* Google Login Mock Modal */
    var btnGoogle = document.getElementById('btn-google-login');
    if (btnGoogle) {
      btnGoogle.addEventListener('click', function () {
        var overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        
        var h = '';
        h += '<div class="modal" style="max-width: 380px; width: 90%; background: white; border-radius: 16px; border: 1px solid var(--border); padding: 24px; text-align: center;">';
        h += '<div style="display:flex; justify-content:center; margin-bottom:12px;">';
        h += '<svg style="width:36px;height:36px" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 15.02 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.86 3C6.26 7.55 8.91 5.04 12 5.04z"/><path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.47-1.11 2.72-2.36 3.56l3.65 2.83c2.14-1.97 3.76-4.87 3.76-8.49z"/><path fill="#FBBC05" d="M5.36 10.5C5.07 11.43 4.9 12.42 4.9 13.5s.17 2.07.46 3l-3.86 3C.54 17.58 0 15.6 0 13.5s.54-4.08 1.5-6l3.86 3z"/><path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.65-2.83c-1.1.74-2.51 1.18-4.31 1.18-3.09 0-5.74-2.51-6.64-5.46l-3.86 3C3.4 20.35 7.35 23 12 23z"/></svg>';
        h += '</div>';
        h += '<h3 style="font-size:16px; font-weight:800; color:var(--text-primary); margin-bottom:4px;">Sign in with Google</h3>';
        h += '<p style="font-size:12px; color:var(--text-secondary); margin-bottom:20px;">Select an account to sign in to DMart Delivery</p>';

        var accounts = [
          { name: 'Priya Sharma', email: 'priya.sharma@gmail.com', avatar: 'PS', role: 'customer' },
          { name: 'Rajesh Kumar', email: 'rajesh.kumar@gmail.com', avatar: 'RK', role: 'manager' },
          { name: 'Karan Johar', email: 'karan.johar@gmail.com', avatar: 'KJ', role: 'super_manager' }
        ];

        accounts.forEach(function (acc, index) {
          h += '<div class="google-modal-account" data-idx="' + index + '">';
          h += '<span style="width:32px;height:32px;border-radius:50%;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:var(--text-primary)">' + acc.avatar + '</span>';
          h += '<div style="text-align:left;flex:1;min-width:0;">';
          h += '<div style="font-size:13px;font-weight:700;color:var(--text-primary)">' + acc.name + '</div>';
          h += '<div style="font-size:11px;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + acc.email + '</div>';
          h += '</div>';
          h += '</div>';
        });

        h += '<button class="btn btn-secondary btn-sm" id="google-modal-cancel" style="width:100%;margin-top:12px;">Cancel</button>';
        h += '</div>';

        overlay.innerHTML = h;
        document.body.appendChild(overlay);

        overlay.querySelectorAll('.google-modal-account').forEach(function (accEl) {
          accEl.addEventListener('click', function () {
            var idx = parseInt(accEl.getAttribute('data-idx'), 10);
            var acc = accounts[idx];
            
            DMart.state.user = {
              email: acc.email,
              name: acc.name,
              role: acc.role,
              avatar: acc.avatar
            };
            DMart.saveState();
            overlay.remove();
            DMart.utils.toast('Google Sign-In Success! Welcome, ' + acc.name + '!', 'success');
            DMart.navigate('store');
          });
        });

        document.getElementById('google-modal-cancel').addEventListener('click', function () {
          overlay.remove();
        });
      });
    }
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

      var usersList = JSON.parse(DMart.storage.getItem('dmart_users') || '[]');
      if (usersList.some(function(u) { return u.email === email; })) {
        showAuthError('An account with this email already exists.');
        return;
      }
      usersList.push(user);
      DMart.storage.setItem('dmart_users', JSON.stringify(usersList));

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
