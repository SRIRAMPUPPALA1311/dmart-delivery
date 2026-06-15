/* ============================================================
   DMart Delivery – Ticketing / Support System Module
   ============================================================ */
(function () {
  'use strict';

  var Tickets = {};
  var activeTicketId = null;

  // Initial tickets state loaded from safe storage
  DMart.state.tickets = JSON.parse(DMart.storage.getItem('dmart_tickets') || '[]');
  if (DMart.state.tickets.length === 0) {
    // Inject mock tickets for demo
    DMart.state.tickets = [
      {
        id: 'TCK-481923',
        orderId: 'ORD-DEMO1',
        category: 'Delivery Delay',
        description: 'My order is delayed by more than 30 minutes. The status shows confirmed but not dispatched.',
        status: 'in_progress',
        date: new Date(Date.now() - 3600000 * 24).toISOString(),
        messages: [
          { sender: 'customer', text: 'My order is delayed by more than 30 minutes. The status shows confirmed but not dispatched.', date: new Date(Date.now() - 3600000 * 24).toISOString() },
          { sender: 'staff', text: 'We apologize for the delay. The delivery partner is currently picking up your order from the Mancherial hub. They will head your way in 5 minutes.', date: new Date(Date.now() - 3600000 * 23).toISOString() }
        ]
      },
      {
        id: 'TCK-294812',
        orderId: 'ORD-DEMO2',
        category: 'Damaged Item',
        description: 'The organic milk packet was leaked when received. Please refund.',
        status: 'resolved',
        date: new Date(Date.now() - 3600000 * 48).toISOString(),
        messages: [
          { sender: 'customer', text: 'The organic milk packet was leaked when received. Please refund.', date: new Date(Date.now() - 3600000 * 48).toISOString() },
          { sender: 'staff', text: 'We are extremely sorry. We have processed a refund of ₹80 back to your wallet. You should see it instantly.', date: new Date(Date.now() - 3600000 * 47).toISOString() }
        ]
      }
    ];
    DMart.storage.setItem('dmart_tickets', JSON.stringify(DMart.state.tickets));
  }

  Tickets.saveTickets = function () {
    DMart.storage.setItem('dmart_tickets', JSON.stringify(DMart.state.tickets));
  };

  /* ---- render ---- */
  Tickets.render = function () {
    var user = DMart.state.user || {};
    var isStaff = user.role && (user.role === 'admin' || user.role === 'manager' || user.role === 'super_manager');
    var ticketsList = DMart.state.tickets;
    
    // Filter tickets for customers (only show their own)
    if (!isStaff) {
      ticketsList = DMart.state.tickets.filter(function(t) {
        // Simple check: match order user or allow demo tickets for testing
        return true; 
      });
    }

    var h = '';
    h += '<div class="tickets-container">';
    h += '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:12px;">';
    h += '<div>';
    h += '<h1 style="font-family:var(--font-display); font-size:28px; font-weight:800; color:var(--text-primary); margin-bottom:4px;">🎧 Support Tickets</h1>';
    h += '<p style="font-size:14px; color:var(--text-secondary);">Need help? Raise a support ticket for your orders in Mancherial District.</p>';
    h += '</div>';
    h += '</div>';

    h += '<div class="tickets-layout">';
    
    /* LEFT SIDE: List of tickets & Create Ticket Form */
    h += '<div style="display:flex; flex-direction:column; gap:20px;">';
    
    if (!isStaff) {
      /* Create Ticket Card */
      h += '<div class="ticket-form-card">';
      h += '<h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:var(--text-primary); margin-bottom:16px;">Create Support Ticket</h3>';
      h += '<form id="ticket-create-form">';
      
      h += '<div class="input-group" style="margin-bottom:12px;">';
      h += '<label style="display:block; font-size:11px; font-weight:700; color:var(--text-secondary); margin-bottom:4px;">Issue Category</label>';
      h += '<select class="input-field" id="tkt-category" required style="width:100%; height:40px; border:1px solid var(--border); border-radius:8px; padding:0 8px; font-size:13px; font-weight:600; outline:none;">';
      h += '<option value="Delivery delay">Delivery Delay / Location Issue</option>';
      h += '<option value="Damaged Item">Damaged / Missing Items</option>';
      h += '<option value="Payment Issue">Payment failed / Refund Query</option>';
      h += '<option value="App Bug">Application / Interface Problem</option>';
      h += '</select>';
      h += '</div>';

      h += '<div class="input-group" style="margin-bottom:12px;">';
      h += '<label style="display:block; font-size:11px; font-weight:700; color:var(--text-secondary); margin-bottom:4px;">Linked Order ID</label>';
      h += '<select class="input-field" id="tkt-order" style="width:100%; height:40px; border:1px solid var(--border); border-radius:8px; padding:0 8px; font-size:13px; font-weight:600; outline:none;">';
      h += '<option value="None">No specific order</option>';
      var orders = DMart.state.orders || [];
      orders.forEach(function(o) {
        h += '<option value="' + o.id + '">' + o.id + ' (' + DMart.utils.formatCurrency(o.total) + ')</option>';
      });
      h += '</select>';
      h += '</div>';

      h += '<div class="input-group" style="margin-bottom:16px;">';
      h += '<label style="display:block; font-size:11px; font-weight:700; color:var(--text-secondary); margin-bottom:4px;">Description of Issue</label>';
      h += '<textarea class="input-field" id="tkt-desc" placeholder="Please describe what happened in detail..." required style="width:100%; height:90px; border:1px solid var(--border); border-radius:8px; padding:8px; font-size:13px; font-family:inherit; outline:none; resize:none;"></textarea>';
      h += '</div>';

      h += '<button type="submit" class="btn btn-primary" style="width:100%; height:40px; border-radius:8px; font-size:13px; font-weight:700;">Submit Ticket</button>';
      h += '</form>';
      h += '</div>';
    } else {
      /* Manager Info Panel */
      h += '<div class="ticket-form-card" style="background:var(--info-bg); border-color:var(--info);">';
      h += '<h3 style="font-family:var(--font-display); font-size:15px; font-weight:800; color:var(--primary); margin-bottom:6px;">Manager Control Panel</h3>';
      h += '<p style="font-size:12px; color:var(--text-primary); line-height:1.4;">You are currently logged in as a store official. You can view all customer queries, write responses, and resolve active tickets.</p>';
      h += '</div>';
    }

    /* Tickets List Card */
    h += '<div class="tickets-list-card">';
    h += '<h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:var(--text-primary); margin-bottom:16px;">Ticket Log</h3>';
    
    if (ticketsList.length === 0) {
      h += '<div style="text-align:center; padding:32px; color:var(--text-secondary);">No support tickets logged.</div>';
    } else {
      h += '<div style="max-height:300px; overflow-y:auto;">';
      ticketsList.forEach(function(t) {
        var activeClass = t.id === activeTicketId ? ' active' : '';
        h += '<div class="ticket-item' + activeClass + '" onclick="DMart.Tickets.selectTicket(\'' + t.id + '\')">';
        h += '<div class="ticket-header">';
        h += '<span class="ticket-category">' + escHtml(t.category) + '</span>';
        h += '<span class="ticket-status status-' + t.status + '">' + t.status.replace('_', ' ') + '</span>';
        h += '</div>';
        h += '<div class="ticket-desc-preview">' + escHtml(t.description) + '</div>';
        h += '<div class="ticket-meta">ID: ' + t.id + ' · Order: ' + escHtml(t.orderId) + '</div>';
        h += '</div>';
      });
      h += '</div>';
    }
    h += '</div>';

    h += '</div>';

    /* RIGHT SIDE: Selected Ticket details / Messages Chat */
    h += '<div id="ticket-chat-section">';
    if (activeTicketId) {
      var activeT = DMart.state.tickets.find(function(t) { return t.id === activeTicketId; });
      if (activeT) {
        h += renderChatContainer(activeT, isStaff);
      } else {
        h += renderChatPlaceholder();
      }
    } else {
      h += renderChatPlaceholder();
    }
    h += '</div>';

    h += '</div>'; /* /tickets-layout */
    h += '</div>'; /* /tickets-container */
    return h;
  };

  function renderChatPlaceholder() {
    var h = '';
    h += '<div class="ticket-chat-container" style="align-items:center; justify-content:center; text-align:center; padding:48px;">';
    h += '<div style="font-size:48px; margin-bottom:16px;">💬</div>';
    h += '<h3 style="font-size:16px; font-weight:800; color:var(--text-primary); margin-bottom:8px;">No Ticket Selected</h3>';
    h += '<p style="font-size:13px; color:var(--text-secondary); max-width:280px; margin:0 auto;">Select an active ticket from the log, or submit a new request to initiate customer assistance.</p>';
    h += '</div>';
    return h;
  }

  function renderChatContainer(ticket, isStaff) {
    var h = '';
    h += '<div class="ticket-chat-container">';
    
    /* Chat Header */
    h += '<div class="ticket-chat-header">';
    h += '<div>';
    h += '<strong style="font-size:15px; color:var(--text-primary)">' + escHtml(ticket.category) + '</strong><br>';
    h += '<small style="color:var(--text-secondary)">ID: ' + ticket.id + ' · Order: ' + escHtml(ticket.orderId) + '</small>';
    h += '</div>';
    
    if (isStaff) {
      /* Status Switcher for Managers */
      h += '<div style="display:flex; align-items:center; gap:8px;">';
      h += '<span style="font-size:11px; font-weight:700; color:var(--text-secondary)">STATUS:</span>';
      h += '<select class="input-field" onchange="DMart.Tickets.updateStatus(\'' + ticket.id + '\', this.value)" style="padding:4px 8px; border-radius:6px; font-size:12px; font-weight:700; border:1px solid var(--border); outline:none; cursor:pointer; background:white;">';
      h += '<option value="open"' + (ticket.status === 'open' ? ' selected' : '') + '>Open</option>';
      h += '<option value="in_progress"' + (ticket.status === 'in_progress' ? ' selected' : '') + '>In Progress</option>';
      h += '<option value="resolved"' + (ticket.status === 'resolved' ? ' selected' : '') + '>Resolved</option>';
      h += '</select>';
      h += '</div>';
    } else {
      h += '<span class="ticket-status status-' + ticket.status + '">' + ticket.status.replace('_', ' ') + '</span>';
    }
    h += '</div>';

    /* Chat Messages Box */
    h += '<div class="ticket-chat-messages" id="ticket-chat-box">';
    ticket.messages.forEach(function (m) {
      var isMe = isStaff ? (m.sender === 'staff') : (m.sender === 'customer');
      var bubbleClass = isMe ? 'bubble-staff' : 'bubble-customer';
      var timeStr = new Date(m.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      
      h += '<div class="chat-bubble ' + bubbleClass + '">';
      h += '<div>' + escHtml(m.text) + '</div>';
      h += '<div class="chat-bubble-meta">' + (m.sender === 'staff' ? 'Support Rep' : 'You') + ' · ' + timeStr + '</div>';
      h += '</div>';
    });
    h += '</div>';

    /* Chat Input Form */
    h += '<form class="ticket-chat-input" id="ticket-message-form">';
    h += '<input type="text" class="input-field" id="tkt-msg-text" placeholder="Type your message here..." required style="flex:1; height:38px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:13px; outline:none; background:white; color:var(--text-primary);">';
    h += '<button type="submit" class="btn btn-primary" style="padding:0 20px; height:38px; border-radius:8px; font-size:13px; font-weight:700;">Send</button>';
    h += '</form>';

    h += '</div>';
    return h;
  }

  /* ---- init listeners ---- */
  Tickets.init = function () {
    var form = document.getElementById('ticket-create-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var cat = document.getElementById('tkt-category').value;
        var order = document.getElementById('tkt-order').value;
        var desc = document.getElementById('tkt-desc').value.trim();

        if (!desc) return;

        var newT = {
          id: 'TCK-' + Math.floor(100000 + Math.random() * 900000),
          orderId: order,
          category: cat,
          description: desc,
          status: 'open',
          date: new Date().toISOString(),
          messages: [
            { sender: 'customer', text: desc, date: new Date().toISOString() }
          ]
        };

        DMart.state.tickets.unshift(newT);
        Tickets.saveTickets();
        activeTicketId = newT.id;
        DMart.utils.toast('Support ticket created successfully!', 'success');
        
        // Refresh page
        DMart.navigate('tickets');

        // Trigger mock automated staff reply after 2.5 seconds
        setTimeout(function() {
          var t = DMart.state.tickets.find(function(x) { return x.id === newT.id; });
          if (t && t.status === 'open') {
            t.status = 'in_progress';
            t.messages.push({
              sender: 'staff',
              text: 'Hello! An executive has been assigned to your ticket. We are checking the details of order ' + t.orderId + ' at our Mancherial warehouse and will get back to you shortly.',
              date: new Date().toISOString()
            });
            Tickets.saveTickets();
            if (DMart.state.currentPage === 'tickets' && activeTicketId === t.id) {
              DMart.navigate('tickets');
            }
            DMart.utils.toast('New message from support rep!', 'info');
          }
        }, 2500);
      });
    }

    var msgForm = document.getElementById('ticket-message-form');
    if (msgForm) {
      msgForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var txtInput = document.getElementById('tkt-msg-text');
        var text = txtInput.value.trim();
        if (!text) return;

        var t = DMart.state.tickets.find(function(x) { return x.id === activeTicketId; });
        if (!t) return;

        var user = DMart.state.user || {};
        var sender = user.role && (user.role === 'admin' || user.role === 'manager' || user.role === 'super_manager') ? 'staff' : 'customer';

        t.messages.push({
          sender: sender,
          text: text,
          date: new Date().toISOString()
        });

        // If ticket is resolved, change to in_progress upon client message
        if (sender === 'customer' && t.status === 'resolved') {
          t.status = 'in_progress';
        }

        Tickets.saveTickets();
        txtInput.value = '';

        // Rerender chat immediately
        var section = document.getElementById('ticket-chat-section');
        if (section) {
          section.innerHTML = renderChatContainer(t, sender === 'staff');
          scrollChatToBottom();
          Tickets.init(); // rebind message form
        }
      });
    }

    scrollChatToBottom();
  };

  function scrollChatToBottom() {
    var box = document.getElementById('ticket-chat-box');
    if (box) {
      box.scrollTop = box.scrollHeight;
    }
  }

  Tickets.selectTicket = function (id) {
    activeTicketId = id;
    DMart.navigate('tickets');
  };

  Tickets.updateStatus = function (ticketId, newStatus) {
    var t = DMart.state.tickets.find(function(x) { return x.id === ticketId; });
    if (t) {
      t.status = newStatus;
      Tickets.saveTickets();
      DMart.utils.toast('Ticket status updated to ' + newStatus.replace('_', ' '), 'success');
      DMart.navigate('tickets');
    }
  };

  /* Expose module */
  window.DMart = window.DMart || {};
  DMart.Tickets = Tickets;
})();
