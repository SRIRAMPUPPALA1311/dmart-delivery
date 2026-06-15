/* ============================================================
   DMart Delivery – Auditing / Compliance Module
   ============================================================ */
(function () {
  'use strict';

  var Auditing = {};
  var isUnlocked = false;

  function escHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---- render ---- */
  Auditing.render = function () {
    if (!isUnlocked) {
      return renderLockScreen();
    }
    return renderAuditDashboard();
  };

  function renderLockScreen() {
    var h = '';
    h += '<div class="audit-container">';
    h += '<div class="audit-lock-screen">';
    h += '<div class="audit-lock-icon">🛡️</div>';
    h += '<h2 style="font-family:var(--font-display); font-size:20px; font-weight:800; color:var(--text-primary); margin-bottom:6px;">DMart Auditing System</h2>';
    h += '<p style="font-size:12px; color:var(--text-secondary); margin-bottom:24px;">Enter authorization credentials to unlock compliance logs, warehouse background checks, and quality audits.</p>';
    
    h += '<div class="auth-error" id="audit-error" style="background: var(--error-bg); color: var(--error); padding: 8px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; margin-bottom: 16px; display: none;"></div>';

    h += '<form id="audit-lock-form" style="text-align:left; display:flex; flex-direction:column; gap:12px; max-width:280px; margin:0 auto;">';
    h += '<div>';
    h += '<label style="font-size:11px; font-weight:700; color:var(--text-primary); display:block; margin-bottom:4px;">Username</label>';
    h += '<input type="text" class="input-field" id="audit-user" placeholder="admin@123" required style="width:100%; height:40px; border:1px solid var(--border); border-radius:8px; padding:0 10px; font-size:13px; outline:none; background:white;">';
    h += '</div>';
    h += '<div>';
    h += '<label style="font-size:11px; font-weight:700; color:var(--text-primary); display:block; margin-bottom:4px;">Security Password</label>';
    h += '<input type="password" class="input-field" id="audit-pass" placeholder="Password" required style="width:100%; height:40px; border:1px solid var(--border); border-radius:8px; padding:0 10px; font-size:13px; outline:none; background:white;">';
    h += '</div>';
    h += '<button type="submit" class="btn btn-primary" style="height:42px; font-size:13px; font-weight:700; border-radius:8px; margin-top:8px;">Unlock System</button>';
    h += '</form>';

    h += '</div>';
    h += '</div>';
    return h;
  }

  function renderAuditDashboard() {
    var h = '';
    h += '<div class="audit-container">';
    
    /* Audit Header */
    h += '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:12px;">';
    h += '<div>';
    h += '<h1 style="font-family:var(--font-display); font-size:28px; font-weight:800; color:var(--text-primary); margin-bottom:4px;">🛡️ Auditing & Compliance</h1>';
    h += '<p style="font-size:14px; color:var(--text-secondary);">Compliance scorecard and background logs for DMart Mancherial District operations.</p>';
    h += '</div>';
    h += '<button class="btn btn-secondary" onclick="DMart.Auditing.lock()" style="height:36px; border-radius:8px; font-size:12px; font-weight:700;">🔒 Lock Dashboard</button>';
    h += '</div>';

    /* Stats Cards Grid */
    h += '<div class="audit-stats-grid">';
    
    /* 1. Compliance Score */
    h += '<div class="audit-stat-card" style="display:flex; align-items:center; gap:16px;">';
    h += '<div style="width:48px; height:48px; border-radius:50%; background:rgba(65, 212, 48, 0.1); display:flex; align-items:center; justify-content:center; font-size:24px;">📈</div>';
    h += '<div>';
    h += '<div style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase;">Compliance Grade</div>';
    h += '<div style="font-size:20px; font-weight:800; color:var(--text-primary)">98.6% (A+)</div>';
    h += '</div>';
    h += '</div>';

    /* 2. Warehouse Audits */
    h += '<div class="audit-stat-card" style="display:flex; align-items:center; gap:16px;">';
    h += '<div style="width:48px; height:48px; border-radius:50%; background:rgba(25, 20, 243, 0.1); display:flex; align-items:center; justify-content:center; font-size:24px;">🏬</div>';
    h += '<div>';
    h += '<div style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase;">Warehouse Audits</div>';
    h += '<div style="font-size:20px; font-weight:800; color:var(--text-primary)">12 Passed</div>';
    h += '</div>';
    h += '</div>';

    /* 3. Partner Checks */
    h += '<div class="audit-stat-card" style="display:flex; align-items:center; gap:16px;">';
    h += '<div style="width:48px; height:48px; border-radius:50%; background:rgba(255, 187, 56, 0.1); display:flex; align-items:center; justify-content:center; font-size:24px;">🕵️‍♂️</div>';
    h += '<div>';
    h += '<div style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase;">Background Checks</div>';
    h += '<div style="font-size:20px; font-weight:800; color:var(--text-primary)">142 Partners</div>';
    h += '</div>';
    h += '</div>';

    h += '</div>'; /* /audit-stats-grid */

    /* Split Layout: Audit Logs & Quality Scores */
    h += '<div class="audit-grid">';
    
    /* Left: Recent Audits Table */
    h += '<div class="audit-table-card">';
    h += '<h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:var(--text-primary); margin-bottom:16px;">System Auditing Log</h3>';
    h += '<div style="overflow-x:auto;">';
    h += '<table class="data-table" style="width:100%; border-collapse:collapse; text-align:left;">';
    h += '<thead>';
    h += '<tr>';
    h += '<th style="padding:10px; border-bottom:1px solid var(--border); font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-secondary)">Audit Target</th>';
    h += '<th style="padding:10px; border-bottom:1px solid var(--border); font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-secondary)">Type</th>';
    h += '<th style="padding:10px; border-bottom:1px solid var(--border); font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-secondary)">Inspector</th>';
    h += '<th style="padding:10px; border-bottom:1px solid var(--border); font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-secondary)">Status</th>';
    h += '<th style="padding:10px; border-bottom:1px solid var(--border); font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-secondary)">Time</th>';
    h += '</tr>';
    h += '</thead>';
    h += '<tbody>';
    
    var logs = [
      { target: 'Warehouse Temp Logs', type: 'Sanitation', inspector: 'Suresh Kumar', status: 'Passed', time: '10 mins ago' },
      { target: 'Delivery Background (Vijay K.)', type: 'Background Check', inspector: 'HR Team', status: 'Passed', time: '2 hours ago' },
      { target: 'Expiration Audit (Dairy Dept)', type: 'Product Expiry', inspector: 'Ramesh Singh', status: 'Passed', time: '5 hours ago' },
      { target: 'Water Quality Inspection', type: 'Health', inspector: 'Inspector Rao', status: 'Passed', time: '1 day ago' },
      { target: 'Weighing Balance Calibration', type: 'Weights & Meas.', inspector: 'Govt Auditor', status: 'Passed', time: '2 days ago' },
      { target: 'Pest Control (Grocery Section)', type: 'Hygiene', inspector: 'SafeGuard Corp', status: 'Passed', time: '3 days ago' }
    ];

    logs.forEach(function(log) {
      h += '<tr style="font-size:13px; color:var(--text-primary)">';
      h += '<td style="padding:12px 10px; border-bottom:1px solid var(--border); font-weight:700;">' + escHtml(log.target) + '</td>';
      h += '<td style="padding:12px 10px; border-bottom:1px solid var(--border); color:var(--text-secondary)">' + escHtml(log.type) + '</td>';
      h += '<td style="padding:12px 10px; border-bottom:1px solid var(--border); color:var(--text-secondary)">' + escHtml(log.inspector) + '</td>';
      h += '<td style="padding:12px 10px; border-bottom:1px solid var(--border);"><span style="background:rgba(65, 212, 48, 0.1); color:#2b931d; padding:2px 8px; border-radius:4px; font-weight:700; font-size:11px;">' + log.status + '</span></td>';
      h += '<td style="padding:12px 10px; border-bottom:1px solid var(--border); color:var(--text-muted)">' + log.time + '</td>';
      h += '</tr>';
    });

    h += '</tbody>';
    h += '</table>';
    h += '</div>';
    h += '</div>';

    /* Right: Warehouse Temperature Live Monitoring */
    h += '<div style="display:flex; flex-direction:column; gap:20px;">';
    
    h += '<div class="audit-table-card">';
    h += '<h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:var(--text-primary); margin-bottom:12px;">Cold Chain Monitoring</h3>';
    h += '<p style="font-size:12px; color:var(--text-secondary); margin-bottom:16px;">Real-time temperature feedback for dairy, frozen, and meat lockers at Mancherial hub.</p>';
    
    h += '<div style="display:flex; flex-direction:column; gap:12px;">';
    
    h += '<div>';
    h += '<div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:4px;"><span>Dairy Cold Room (Target: 4°C)</span><span>3.8°C ✅</span></div>';
    h += '<div style="height:6px; background:#f1f5f9; border-radius:4px; overflow:hidden;"><div style="width:90%; height:100%; background:var(--primary);"></div></div>';
    h += '</div>';

    h += '<div>';
    h += '<div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:4px;"><span>Ice Cream Freezer (Target: -18°C)</span><span>-17.5°C ✅</span></div>';
    h += '<div style="height:6px; background:#f1f5f9; border-radius:4px; overflow:hidden;"><div style="width:95%; height:100%; background:var(--primary);"></div></div>';
    h += '</div>';

    h += '<div>';
    h += '<div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:4px;"><span>Fresh Meat Locker (Target: 0°C)</span><span>0.5°C ✅</span></div>';
    h += '<div style="height:6px; background:#f1f5f9; border-radius:4px; overflow:hidden;"><div style="width:85%; height:100%; background:var(--primary);"></div></div>';
    h += '</div>';

    h += '</div>';
    h += '</div>';

    h += '</div>';

    h += '</div>'; /* /audit-grid */
    h += '</div>'; /* /audit-container */
    return h;
  }

  /* ---- init ---- */
  Auditing.init = function () {
    var form = document.getElementById('audit-lock-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var user = document.getElementById('audit-user').value.trim();
        var pass = document.getElementById('audit-pass').value;

        if (user === 'admin@123' && pass === 'admin@123') {
          isUnlocked = true;
          DMart.utils.toast('Security cleared! Auditing portal unlocked.', 'success');
          DMart.navigate('auditing');
        } else {
          var err = document.getElementById('audit-error');
          if (err) {
            err.textContent = 'Invalid credentials. Access denied.';
            err.style.display = 'block';
            
            // Add shake animation
            var card = document.querySelector('.audit-lock-screen');
            if (card) {
              card.style.animation = 'none';
              setTimeout(function () {
                card.style.animation = 'pulse 0.3s ease 2';
              }, 10);
            }
          }
        }
      });
    }
  };

  Auditing.lock = function () {
    isUnlocked = false;
    DMart.navigate('auditing');
  };

  /* Expose module */
  window.DMart = window.DMart || {};
  DMart.Auditing = Auditing;
})();
