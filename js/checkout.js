/* ============================================================
   DMart Delivery – Checkout Module
   ============================================================ */
(function () {
  'use strict';

  var Checkout = {};
  var selectedPayment = '';

  function escHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---- render ---- */
  Checkout.render = function () {
    var items = DMart.state.cart || [];
    if (items.length === 0) {
      return '' +
        '<div class="checkout-empty">' +
          '<div class="cart-empty-icon">🛒</div>' +
          '<h2>Your cart is empty</h2>' +
          '<p>Add items to your cart before checking out.</p>' +
          '<button class="btn btn-primary btn-lg" onclick="DMart.navigate(\'store\')">Continue Shopping</button>' +
        '</div>';
    }

    var subtotal = DMart.getCartTotal();
    var delivery = subtotal >= 499 ? 0 : 49;
    var gst = Math.round(subtotal * 0.05 * 100) / 100;
    var discount = 0;
    var grandTotal = subtotal + delivery + gst - discount;
    var count = DMart.getCartCount();
    var user = DMart.state.user || {};

    var h = '';
    h += '<div class="checkout-container">';

    /* ========= LEFT COLUMN ========= */
    h += '<div class="checkout-left">';

    /* -- Step 1: Address -- */
    h += '<div class="checkout-section">';
    h += '<h2><span class="step-number">1</span> Delivery Address</h2>';
    h += '<div class="address-grid">';

    h += '<div class="input-group"><label>Full Name</label><input type="text" class="input-field" id="addr-name" placeholder="Enter full name" value="' + escHtml(user.name || '') + '"></div>';
    h += '<div class="input-group"><label>Phone Number</label><input type="tel" class="input-field" id="addr-phone" placeholder="10-digit mobile number"></div>';
    h += '<div class="input-group full-width"><label>Email Address</label><input type="email" class="input-field" id="addr-email" placeholder="name@example.com" value="' + escHtml(user.email || '') + '"></div>';
    h += '<div class="input-group full-width"><label>Address Line 1</label><input type="text" class="input-field" id="addr-line1" placeholder="Flat / House No. / Building / Street"></div>';
    h += '<div class="input-group full-width"><label>Address Line 2 (Optional)</label><input type="text" class="input-field" id="addr-line2" placeholder="Landmark / Area"></div>';

    h += '<div class="input-group"><label>City</label><input type="text" class="input-field" id="addr-city" placeholder="City" value="Mancherial"></div>';
    h += '<div class="input-group"><label>State</label><input type="text" class="input-field" id="addr-state" placeholder="State" value="Telangana"></div>';
    h += '<div class="input-group full-width"><label>Pincode</label><input type="text" class="input-field" id="addr-pincode" placeholder="6-digit postal code" value="504208" maxlength="6"></div>';

    h += '</div>'; /* /address-grid */
    h += '<label class="checkbox-label"><input type="checkbox" id="save-address" checked> Save this address for future orders</label>';
    h += '</div>'; /* /checkout-section */

    /* -- Step 2: Payment -- */
    h += '<div class="checkout-section">';
    h += '<h2><span class="step-number">2</span> Payment Method</h2>';

    /* Payment methods list */
    h += '<div class="payment-methods" id="payment-options">';

    /* a) Card */
    h += '<div class="payment-method" data-method="card">';
    h += '<div class="payment-method-header">';
    h += '<span class="payment-radio"></span>';
    h += '<span class="payment-icon">💳</span>';
    h += '<div class="payment-info">';
    h += '<h4>Credit / Debit Card</h4>';
    h += '<p>Pay securely with Visa, Mastercard, or RuPay</p>';
    h += '</div>';
    h += '</div>';
    h += '<div class="payment-form">';
    h += '<div class="input-group"><label>Card Number</label><input type="text" class="input-field" id="pay-card-number" placeholder="1234 5678 9012 3456" maxlength="19"></div>';
    h += '<div class="input-group"><label>Name on Card</label><input type="text" class="input-field" id="pay-card-name" placeholder="Cardholder name"></div>';
    h += '<div class="card-input-group">';
    h += '<div class="input-group"><label>Expiry Date</label><input type="text" class="input-field" id="pay-card-expiry" placeholder="MM/YY" maxlength="5"></div>';
    h += '<div class="input-group"><label>CVV</label><input type="password" class="input-field" id="pay-card-cvv" placeholder="•••" maxlength="4"></div>';
    h += '</div>';
    h += '<div class="card-brands">Accepted: Visa, Mastercard, RuPay</div>';
    h += '</div>';
    h += '</div>';

    /* b) UPI */
    h += '<div class="payment-method" data-method="upi">';
    h += '<div class="payment-method-header">';
    h += '<span class="payment-radio"></span>';
    h += '<span class="payment-icon">📱</span>';
    h += '<div class="payment-info">';
    h += '<h4>UPI Payment</h4>';
    h += '<p>Instant pay via GPay, PhonePe, or Paytm</p>';
    h += '</div>';
    h += '</div>';
    h += '<div class="payment-form">';
    h += '<div class="input-group"><label>UPI ID</label><input type="text" class="input-field" id="pay-upi-id" placeholder="username@upi"></div>';
    h += '<div class="upi-apps">';
    h += '<div class="upi-app" data-upi="gpay"><div class="upi-app-icon">📲</div><div class="upi-app-name">Google Pay</div></div>';
    h += '<div class="upi-app" data-upi="phonepe"><div class="upi-app-icon">📲</div><div class="upi-app-name">PhonePe</div></div>';
    h += '<div class="upi-app" data-upi="paytm"><div class="upi-app-icon">📲</div><div class="upi-app-name">Paytm</div></div>';
    h += '</div>';
    h += '</div>';
    h += '</div>';

    /* c) Net Banking */
    h += '<div class="payment-method" data-method="netbanking">';
    h += '<div class="payment-method-header">';
    h += '<span class="payment-radio"></span>';
    h += '<span class="payment-icon">🏦</span>';
    h += '<div class="payment-info">';
    h += '<h4>Net Banking</h4>';
    h += '<p>Direct payment from popular Indian banks</p>';
    h += '</div>';
    h += '</div>';
    h += '<div class="payment-form">';
    h += '<div class="input-group"><label>Select Bank</label>';
    h += '<select class="input-field" id="pay-bank">';
    h += '<option value="">Choose bank</option>';
    h += '<option value="SBI">State Bank of India</option>';
    h += '<option value="HDFC">HDFC Bank</option>';
    h += '<option value="ICICI">ICICI Bank</option>';
    h += '<option value="Axis">Axis Bank</option>';
    h += '<option value="Kotak">Kotak Mahindra Bank</option>';
    h += '<option value="PNB">Punjab National Bank</option>';
    h += '<option value="BOB">Bank of Baroda</option>';
    h += '<option value="Yes">Yes Bank</option>';
    h += '</select></div>';
    h += '</div>';
    h += '</div>';

    /* d) Digital Wallet */
    h += '<div class="payment-method" data-method="wallet">';
    h += '<div class="payment-method-header">';
    h += '<span class="payment-radio"></span>';
    h += '<span class="payment-icon">💰</span>';
    h += '<div class="payment-info">';
    h += '<h4>Digital Wallet</h4>';
    h += '<p>Link Paytm Wallet or Amazon Pay</p>';
    h += '</div>';
    h += '</div>';
    h += '<div class="payment-form">';
    h += '<div class="wallet-options">';
    h += '<div class="wallet-option" data-wallet="paytm"><span>💰</span><span>Paytm</span><small>Bal: ₹1,250</small></div>';
    h += '<div class="wallet-option" data-wallet="amazon"><span>📦</span><span>Amazon Pay</span><small>Bal: ₹800</small></div>';
    h += '<div class="wallet-option" data-wallet="mobikwik"><span>💳</span><span>Mobikwik</span><small>Bal: ₹450</small></div>';
    h += '<div class="wallet-option" data-wallet="freecharge"><span>⚡</span><span>Freecharge</span><small>Bal: ₹200</small></div>';
    h += '</div>';
    h += '</div>';
    h += '</div>';

    /* e) COD */
    h += '<div class="payment-method" data-method="cod">';
    h += '<div class="payment-method-header">';
    h += '<span class="payment-radio"></span>';
    h += '<span class="payment-icon">🚚</span>';
    h += '<div class="payment-info">';
    h += '<h4>Cash on Delivery (COD)</h4>';
    h += '<p>Pay via Cash, Card or UPI at delivery</p>';
    h += '</div>';
    h += '</div>';
    h += '<div class="payment-form">';
    h += '<div class="cod-info">';
    h += '<p>💵 Pay when your order arrives at your doorstep.</p>';
    h += '<p class="cod-note">Note: A convenience fee of ₹10 may apply for COD orders.</p>';
    h += '</div>';
    h += '</div>';
    h += '</div>';

    h += '</div>'; /* /payment-methods */
    h += '</div>'; /* /checkout-section */

    h += '</div>'; /* /checkout-left */

    /* ========= RIGHT COLUMN ========= */
    h += '<div class="checkout-right">';
    h += '<div class="order-summary">';
    h += '<h3>Order Summary</h3>';

    h += '<div class="order-items">';
    for (var i = 0; i < items.length; i++) {
      var ci = items[i];
      var product = DMart.getProductById(ci.productId);
      if (!product) continue;
      h += '<div class="order-item">';
      h += '<span class="order-item-emoji">' + product.emoji + '</span>';
      h += '<div class="order-item-info">';
      h += '<div class="order-item-name">' + escHtml(product.name) + '</div>';
      h += '<div class="order-item-qty">Qty: ' + ci.qty + '</div>';
      h += '</div>';
      h += '<span class="order-item-price">' + DMart.utils.formatCurrency(product.price * ci.qty) + '</span>';
      h += '</div>';
    }
    h += '</div>';

    h += '<div class="summary-divider"></div>';
    h += '<div class="summary-item"><span>Subtotal (' + count + ' items)</span><span>' + DMart.utils.formatCurrency(subtotal) + '</span></div>';
    h += '<div class="summary-item"><span>Delivery Charges</span><span class="' + (delivery === 0 ? 'free' : '') + '">' + (delivery === 0 ? 'FREE' : DMart.utils.formatCurrency(delivery)) + '</span></div>';
    h += '<div class="summary-item"><span>GST (5%)</span><span>' + DMart.utils.formatCurrency(gst) + '</span></div>';
    if (discount > 0) {
      h += '<div class="summary-item discount"><span>Discount</span><span>-' + DMart.utils.formatCurrency(discount) + '</span></div>';
    }
    h += '<div class="summary-divider"></div>';
    h += '<div class="summary-item summary-total"><span>Total</span><span>' + DMart.utils.formatCurrency(grandTotal) + '</span></div>';

    h += '<button class="place-order-btn" id="place-order-btn">Place Order</button>';
    h += '<div class="secure-badge">🔒 Secure & Encrypted Payment</div>';

    h += '</div>'; /* /order-summary */
    h += '</div>'; /* /checkout-right */

    h += '</div>'; /* /checkout-container */
    return h;
  };

  /* ---- init ---- */
  Checkout.init = function () {
    selectedPayment = '';

    /* Payment method selection */
    var paymentContainer = document.getElementById('payment-options');
    if (paymentContainer) {
      paymentContainer.addEventListener('click', function (e) {
        var header = e.target.closest('.payment-method-header');
        if (!header) return;
        var option = header.closest('.payment-method');
        if (!option) return;
        var method = option.getAttribute('data-method');

        /* deselect all */
        paymentContainer.querySelectorAll('.payment-method').forEach(function (el) {
          el.classList.remove('selected');
        });
        option.classList.add('selected');
        selectedPayment = method;
      });

      /* UPI app shortcuts */
      paymentContainer.querySelectorAll('.upi-app').forEach(function (app) {
        app.addEventListener('click', function () {
          paymentContainer.querySelectorAll('.upi-app').forEach(function (a) { a.classList.remove('selected'); });
          app.classList.add('selected');
          var upiId = document.getElementById('pay-upi-id');
          var upiName = app.getAttribute('data-upi');
          if (upiId) upiId.value = 'user@' + upiName;
        });
      });

      /* Wallet option clicks */
      paymentContainer.querySelectorAll('.wallet-option').forEach(function (w) {
        w.addEventListener('click', function () {
          paymentContainer.querySelectorAll('.wallet-option').forEach(function (x) { x.classList.remove('selected'); });
          w.classList.add('selected');
        });
      });
    }

    /* Place Order */
    var placeBtn = document.getElementById('place-order-btn');
    if (placeBtn) {
      placeBtn.addEventListener('click', function () {
        placeOrder();
      });
    }

    /* Card number formatting */
    var cardNum = document.getElementById('pay-card-number');
    if (cardNum) {
      cardNum.addEventListener('input', function () {
        var v = cardNum.value.replace(/\D/g, '').substring(0, 16);
        var formatted = v.replace(/(.{4})/g, '$1 ').trim();
        cardNum.value = formatted;
      });
    }

    /* Expiry formatting */
    var expiry = document.getElementById('pay-card-expiry');
    if (expiry) {
      expiry.addEventListener('input', function () {
        var v = expiry.value.replace(/\D/g, '').substring(0, 4);
        if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2);
        expiry.value = v;
      });
    }
  };

  /* ---- place order logic ---- */
  function placeOrder() {
    /* Validate address */
    var name    = (document.getElementById('addr-name')    || {}).value || '';
    var phone   = (document.getElementById('addr-phone')   || {}).value || '';
    var email   = (document.getElementById('addr-email')   || {}).value || '';
    var line1   = (document.getElementById('addr-line1')   || {}).value || '';
    var city    = (document.getElementById('addr-city')    || {}).value || '';
    var state   = (document.getElementById('addr-state')   || {}).value || '';
    var pincode = (document.getElementById('addr-pincode') || {}).value || '';

    if (!name.trim()) { DMart.utils.toast('Please enter your name', 'error'); return; }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) { DMart.utils.toast('Please enter a valid phone number', 'error'); return; }
    if (!email.trim() || email.indexOf('@') === -1) { DMart.utils.toast('Please enter a valid email', 'error'); return; }
    if (!line1.trim()) { DMart.utils.toast('Please enter your address', 'error'); return; }
    if (!city.trim()) { DMart.utils.toast('Please enter your city', 'error'); return; }
    if (!state.trim()) { DMart.utils.toast('Please enter your state', 'error'); return; }
    if (!pincode.trim() || pincode.replace(/\D/g, '').length < 6) { DMart.utils.toast('Please enter a valid 6-digit pincode', 'error'); return; }

    /* Validate location constraints: only Mancherial District */
    var lowerCity = city.toLowerCase();
    var cleanPin = pincode.trim().replace(/\D/g, '');
    var pins = ['504208', '504209', '504251', '504302', '504201', '504202', '504203', '504204', '504205', '504206', '504207', '504301'];
    var isMancherial = false;
    
    if (lowerCity.indexOf('mancherial') !== -1 || cleanPin.indexOf('5042') === 0 || cleanPin.indexOf('5043') === 0 || pins.indexOf(cleanPin) !== -1) {
      isMancherial = true;
    }
    
    if (!isMancherial) {
      DMart.utils.toast('Sorry, we only deliver to Mancherial (MNCL) District. Please enter a Mancherial address/pincode (e.g. 504208).', 'error');
      return;
    }

    /* Validate payment */
    if (!selectedPayment) { DMart.utils.toast('Please select a payment method', 'error'); return; }

    /* Build order */
    var items = DMart.state.cart || [];
    var subtotal = DMart.getCartTotal();
    var delivery = subtotal >= 499 ? 0 : 49;
    var gst = Math.round(subtotal * 0.05 * 100) / 100;
    var grandTotal = subtotal + delivery + gst;

    var orderItems = [];
    for (var i = 0; i < items.length; i++) {
      var p = DMart.getProductById(items[i].productId);
      if (!p) continue;
      orderItems.push({
        productId: p.id,
        name: p.name,
        emoji: p.emoji,
        brand: p.brand,
        price: p.price,
        qty: items[i].qty,
        total: p.price * items[i].qty
      });
    }

    var paymentLabels = {
      card: 'Credit/Debit Card',
      upi: 'UPI',
      netbanking: 'Net Banking',
      wallet: 'Digital Wallet',
      cod: 'Cash on Delivery'
    };

    var order = {
      id: 'ORD-' + DMart.utils.generateId().substring(0, 8).toUpperCase(),
      items: orderItems,
      subtotal: subtotal,
      delivery: delivery,
      gst: gst,
      total: grandTotal,
      address: {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        line1: line1.trim(),
        line2: ((document.getElementById('addr-line2') || {}).value || '').trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim()
      },
      payment: paymentLabels[selectedPayment] || selectedPayment,
      date: new Date().toISOString(),
      status: 'confirmed'
    };

    /* Save */
    if (!DMart.state.orders) DMart.state.orders = [];
    DMart.state.orders.unshift(order);
    DMart.state.cart = [];
    DMart.saveState();
    DMart.utils.emit('cart-updated');

    /* Show success */
    showOrderSuccess(order);
  }

  function showOrderSuccess(order) {
    var appEl = document.getElementById('app');
    if (!appEl) return;

    var navHtml = (typeof DMart.renderNavbar === 'function') ? DMart.renderNavbar() : '';
    var sidebarHtml = (DMart.Cart && DMart.Cart.renderSidebar) ? DMart.Cart.renderSidebar() : '';

    var h = '';
    h += '<div class="order-success">';
    h += '<div class="order-success-icon">✅</div>';
    h += '<h1>Order Placed Successfully!</h1>';
    h += '<p class="order-success-id">Order ID: <strong>' + order.id + '</strong></p>';
    h += '<p class="order-success-msg">Your order will be delivered within 2-3 business days.</p>';
    h += '<div class="order-success-details">';
    h += '<div class="order-success-row"><span>Items:</span><span>' + order.items.length + '</span></div>';
    h += '<div class="order-success-row"><span>Total:</span><span>' + DMart.utils.formatCurrency(order.total) + '</span></div>';
    h += '<div class="order-success-row"><span>Payment:</span><span>' + escHtml(order.payment) + '</span></div>';
    h += '<div class="order-success-row"><span>Deliver to:</span><span>' + escHtml(order.address.name) + ', ' + escHtml(order.address.city) + '</span></div>';
    h += '</div>';
    h += '<div class="order-success-actions">';
    h += '<button class="btn btn-primary btn-lg" onclick="DMart.navigate(\'store\')">Continue Shopping</button>';
    h += '<button class="btn btn-secondary btn-lg" onclick="DMart.utils.toast(\'Order tracking coming soon!\',\'info\')">Track Order</button>';
    h += '</div>';
    h += '</div>';

    appEl.innerHTML = navHtml + h + sidebarHtml;

    /* update badge */
    if (DMart.Cart && DMart.Cart.updateBadge) DMart.Cart.updateBadge();
  }

  /* expose */
  window.DMart = window.DMart || {};
  DMart.Checkout = Checkout;
})();
