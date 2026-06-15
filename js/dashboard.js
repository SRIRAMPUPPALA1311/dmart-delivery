// ============================================================
// DMart Delivery - Dashboard Module
// All 14 department dashboards with complete data
// ============================================================

(function() {
  'use strict';

  window.DMart = window.DMart || {};

  // ---- Seeded random helper ----
  var _seed = 42;
  function sRand() {
    if (typeof DMart.utils !== 'undefined' && DMart.utils.seededRandom) {
      return DMart.utils.seededRandom(_seed++);
    }
    _seed = (_seed * 16807 + 0) % 2147483647;
    return (_seed & 0x7fffffff) / 0x7fffffff;
  }
  function sRandInt(min, max) {
    return Math.floor(sRand() * (max - min + 1)) + min;
  }
  function sRandPick(arr) {
    return arr[Math.floor(sRand() * arr.length)];
  }
  function fmtCur(amt) {
    if (typeof DMart.utils !== 'undefined' && DMart.utils.formatCurrency) {
      return DMart.utils.formatCurrency(amt);
    }
    return '₹' + amt.toLocaleString('en-IN');
  }
  function fmtNum(n) {
    if (typeof DMart.utils !== 'undefined' && DMart.utils.formatNumber) {
      return DMart.utils.formatNumber(n);
    }
    return n.toLocaleString('en-IN');
  }

  // ---- Months / Name pools ----
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONTHS_SHORT = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  var FIRST_NAMES = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Ananya', 'Arjun', 'Kavita', 'Rohan', 'Meera', 'Suresh', 'Pooja', 'Arun', 'Deepa', 'Nikhil', 'Shreya', 'Sanjay', 'Neha', 'Ravi', 'Divya', 'Manish', 'Isha', 'Kiran', 'Swati', 'Ajay', 'Nisha', 'Prakash', 'Ritika'];
  var LAST_NAMES = ['Verma', 'Patel', 'Sharma', 'Gupta', 'Singh', 'Kumar', 'Joshi', 'Desai', 'Reddy', 'Iyer', 'Nair', 'Mehta', 'Shah', 'Rao', 'Malhotra', 'Bhat', 'Pillai', 'Agarwal', 'Chauhan', 'Tiwari'];
  var ACTIVITY_TIMES = ['2 min ago', '15 min ago', '1 hour ago', '3 hours ago', '5 hours ago'];
  var TEAM_COLORS = [
    ['#16a34a','#22c55e'], ['#4da6ff','#6ec6ff'], ['#00d2a0','#34d399'],
    ['#ffb347','#fbbf24'], ['#a78bfa','#c084fc'], ['#f472b6','#fb7185'],
    ['#60a5fa','#38bdf8'], ['#22d3ee','#06b6d4'], ['#818cf8','#a78bfa'],
    ['#f97316','#fb923c']
  ];

  function makeName(idx) {
    return FIRST_NAMES[idx % FIRST_NAMES.length] + ' ' + LAST_NAMES[idx % LAST_NAMES.length];
  }
  function makeInitials(name) {
    var parts = name.split(' ');
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  }
  function makeTeam(roles, count) {
    var team = [];
    var statuses = ['online','online','online','busy','offline'];
    for (var i = 0; i < count; i++) {
      var name = makeName(i + count);
      var colors = TEAM_COLORS[i % TEAM_COLORS.length];
      team.push({
        name: name,
        initials: makeInitials(name),
        role: roles[i % roles.length],
        status: statuses[i % statuses.length],
        colors: colors
      });
    }
    return team;
  }

  // ---- Sidebar Config ----
  var SIDEBAR_SECTIONS = [
    {
      label: 'ANALYTICS',
      items: [
        { id: 'sales', icon: '📊', name: 'Sales' },
        { id: 'analytics', icon: '📈', name: 'Analytics' },
        { id: 'finance', icon: '💰', name: 'Finance' }
      ]
    },
    {
      label: 'OPERATIONS',
      items: [
        { id: 'inventory', icon: '📦', name: 'Inventory' },
        { id: 'logistics', icon: '🚚', name: 'Logistics' },
        { id: 'operations', icon: '⚙️', name: 'Operations' },
        { id: 'procurement', icon: '🏷️', name: 'Procurement' }
      ]
    },
    {
      label: 'TEAMS',
      items: [
        { id: 'hr', icon: '👥', name: 'HR' },
        { id: 'marketing', icon: '📢', name: 'Marketing' },
        { id: 'support', icon: '🎧', name: 'Support' },
        { id: 'it', icon: '💻', name: 'IT' }
      ]
    },
    {
      label: 'GOVERNANCE',
      items: [
        { id: 'quality', icon: '✅', name: 'Quality' },
        { id: 'compliance', icon: '📋', name: 'Compliance' },
        { id: 'management', icon: '👔', name: 'Management' }
      ]
    }
  ];

  // ---- Dashboard Configurations ----

  var dashboardConfigs = {

    // ========== 1. SALES ==========
    sales: {
      title: 'Sales Dashboard',
      subtitle: 'Revenue, orders, and sales performance metrics',
      icon: '📊',
      kpis: [
        { label: 'Total Revenue', value: '₹2.4 Cr', change: '+12.5%', positive: true, icon: '💰', color: '#16a34a' },
        { label: 'Orders Today', value: '1,247', change: '+8.3%', positive: true, icon: '📦', color: '#4da6ff' },
        { label: 'Avg Order Value', value: '₹1,920', change: '+3.2%', positive: true, icon: '🛒', color: '#00d2a0' },
        { label: 'Conversion Rate', value: '3.8%', change: '-0.2%', positive: false, icon: '📈', color: '#ffb347' }
      ],
      charts: [
        {
          title: 'Revenue Trend',
          badge: 'Last 12 Months',
          type: 'line',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'Revenue (₹L)', data: [185, 198, 210, 225, 215, 240, 258, 272, 265, 290, 310, 340], color: '#16a34a' }]
          }
        },
        {
          title: 'Top Categories',
          badge: 'This Month',
          type: 'bar',
          data: {
            labels: ['Groceries', 'Snacks', 'Beverages', 'Dairy', 'Personal Care', 'Household'],
            datasets: [{ label: 'Revenue', data: [4500, 3200, 2800, 2100, 1900, 1500], colors: ['#16a34a', '#4da6ff', '#00d2a0', '#ffb347', '#a78bfa', '#f472b6'] }]
          }
        },
        {
          title: 'Sales by Region',
          badge: 'Current',
          type: 'doughnut',
          data: {
            labels: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Others'],
            datasets: [{ data: [35, 22, 18, 12, 8, 5], colors: ['#16a34a', '#4da6ff', '#00d2a0', '#ffb347', '#a78bfa', '#f472b6'] }]
          }
        },
        {
          title: 'Hourly Orders',
          badge: 'Today',
          type: 'area',
          data: {
            labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
            datasets: [{ label: 'Orders', data: [45, 120, 210, 340, 280, 310, 420, 380, 190], color: '#4da6ff' }]
          }
        }
      ],
      table: {
        title: 'Top 10 Products by Revenue',
        headers: ['Rank', 'Product', 'Category', 'Units Sold', 'Revenue', 'Growth'],
        rows: [
          ['1', 'Tata Salt 1kg', 'Groceries', '12,450', '₹3,11,250', '+15.2%'],
          ['2', 'Amul Butter 500g', 'Dairy', '9,870', '₹2,71,425', '+8.7%'],
          ['3', 'Maggi Noodles Pack', 'Snacks', '8,340', '₹2,08,500', '+22.1%'],
          ['4', 'Fortune Oil 1L', 'Groceries', '7,650', '₹1,91,250', '+5.4%'],
          ['5', 'Parle-G Biscuits', 'Snacks', '15,200', '₹1,52,000', '+3.8%'],
          ['6', 'Surf Excel 1kg', 'Household', '5,890', '₹1,47,250', '+11.3%'],
          ['7', 'Coca-Cola 2L', 'Beverages', '6,720', '₹1,34,400', '+18.6%'],
          ['8', 'Dettol Soap 3-Pack', 'Personal Care', '4,980', '₹1,24,500', '+7.9%'],
          ['9', 'Aashirvaad Atta 5kg', 'Groceries', '3,210', '₹1,12,350', '+4.2%'],
          ['10', 'Britannia Bread', 'Bakery', '8,900', '₹1,06,800', '+9.5%']
        ]
      },
      team: makeTeam(['Sales Lead', 'Account Manager', 'Sales Executive', 'Regional Head', 'BD Manager', 'Sales Analyst', 'Territory Manager', 'Sales Coordinator'], 8),
      activities: [
        { icon: '🎉', person: 'Rahul Verma', action: 'closed a ₹15L deal with Metro Mart', time: '2 min ago', color: '#16a34a' },
        { icon: '📊', person: 'Priya Patel', action: 'updated Q2 sales forecast', time: '15 min ago', color: '#4da6ff' },
        { icon: '🏆', person: 'Amit Sharma', action: 'achieved 120% of monthly target', time: '1 hour ago', color: '#00d2a0' },
        { icon: '📞', person: 'Sneha Gupta', action: 'scheduled demo with BigBasket', time: '3 hours ago', color: '#ffb347' },
        { icon: '📋', person: 'Vikram Singh', action: 'submitted weekly sales report', time: '5 hours ago', color: '#a78bfa' }
      ]
    },

    // ========== 2. INVENTORY ==========
    inventory: {
      title: 'Inventory Dashboard',
      subtitle: 'Stock levels, warehouse utilization, and supply chain',
      icon: '📦',
      kpis: [
        { label: 'Total SKUs', value: '10,247', change: '+124', positive: true, icon: '📋', color: '#4da6ff' },
        { label: 'Low Stock Items', value: '156', change: '-18', positive: true, icon: '⚠️', color: '#ffb347' },
        { label: 'Out of Stock', value: '23', change: '-5', positive: true, icon: '🚫', color: '#16a34a' },
        { label: 'Warehouse Utilization', value: '78%', change: '+2.1%', positive: true, icon: '🏭', color: '#00d2a0' }
      ],
      charts: [
        {
          title: 'Stock Levels by Department',
          badge: 'Current',
          type: 'bar',
          data: {
            labels: ['Groceries', 'Dairy', 'Snacks', 'Beverages', 'Personal Care', 'Household'],
            datasets: [{ label: 'Stock Units', data: [24500, 18200, 15800, 12400, 9800, 8600], colors: ['#4da6ff', '#00d2a0', '#ffb347', '#a78bfa', '#16a34a', '#f472b6'] }]
          }
        },
        {
          title: 'Inventory Turnover',
          badge: 'Last 12 Months',
          type: 'line',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'Turnover Ratio', data: [4.2, 4.5, 4.1, 4.8, 5.0, 4.7, 5.2, 5.5, 5.1, 5.4, 5.8, 6.1], color: '#00d2a0' }]
          }
        },
        {
          title: 'Stock Status Distribution',
          badge: 'Current',
          type: 'doughnut',
          data: {
            labels: ['Healthy', 'Low Stock', 'Overstock', 'Out of Stock'],
            datasets: [{ data: [78, 12, 7, 3], colors: ['#00d2a0', '#ffb347', '#4da6ff', '#16a34a'] }]
          }
        },
        {
          title: 'Reorder Alerts',
          badge: 'Urgent',
          type: 'horizontalBar',
          data: {
            labels: ['Atta & Flour', 'Cooking Oil', 'Rice', 'Sugar', 'Milk', 'Cleaning'],
            datasets: [{ data: [42, 38, 35, 28, 24, 18], colors: ['#16a34a', '#16a34a', '#ffb347', '#ffb347', '#00d2a0', '#00d2a0'] }]
          }
        }
      ],
      table: {
        title: 'Low Stock Items',
        headers: ['Product', 'Current Stock', 'Reorder Level', 'Status', 'Supplier', 'ETA'],
        rows: [
          ['Tata Salt 1kg', '45 units', '200 units', '🔴 Critical', 'Tata Consumer', '2 days'],
          ['Amul Milk 1L', '120 units', '500 units', '🔴 Critical', 'Amul India', '1 day'],
          ['Fortune Oil 1L', '89 units', '300 units', '🟡 Low', 'Adani Wilmar', '3 days'],
          ['Maggi 4-Pack', '230 units', '400 units', '🟡 Low', 'Nestle India', '2 days'],
          ['Dettol 250ml', '67 units', '250 units', '🔴 Critical', 'Reckitt', '4 days'],
          ['Britannia Bread', '34 units', '150 units', '🔴 Critical', 'Britannia', '1 day'],
          ['Surf Excel 1kg', '156 units', '300 units', '🟡 Low', 'HUL', '3 days'],
          ['Parle-G 800g', '189 units', '350 units', '🟡 Low', 'Parle Products', '2 days']
        ]
      },
      team: makeTeam(['Warehouse Manager', 'Inventory Analyst', 'Stock Controller', 'Supply Chain Lead', 'Logistics Coordinator', 'Procurement Aide'], 6),
      activities: [
        { icon: '📦', person: 'Suresh Kumar', action: 'received shipment from Tata Consumer (450 units)', time: '2 min ago', color: '#00d2a0' },
        { icon: '⚠️', person: 'Pooja Joshi', action: 'flagged 12 items below reorder level', time: '15 min ago', color: '#ffb347' },
        { icon: '🔄', person: 'Arun Desai', action: 'initiated stock transfer to Mumbai warehouse', time: '1 hour ago', color: '#4da6ff' },
        { icon: '📊', person: 'Deepa Reddy', action: 'completed monthly stock audit', time: '3 hours ago', color: '#a78bfa' },
        { icon: '🚛', person: 'Nikhil Iyer', action: 'confirmed PO #4521 with Amul India', time: '5 hours ago', color: '#16a34a' }
      ]
    },

    // ========== 3. MARKETING ==========
    marketing: {
      title: 'Marketing Dashboard',
      subtitle: 'Campaigns, customer acquisition, and engagement metrics',
      icon: '📢',
      kpis: [
        { label: 'Campaign ROI', value: '340%', change: '+45%', positive: true, icon: '🎯', color: '#00d2a0' },
        { label: 'New Customers', value: '4,520', change: '+18.2%', positive: true, icon: '👥', color: '#4da6ff' },
        { label: 'Email Open Rate', value: '24.5%', change: '+2.1%', positive: true, icon: '📧', color: '#a78bfa' },
        { label: 'Social Followers', value: '125K', change: '+5.8K', positive: true, icon: '📱', color: '#f472b6' }
      ],
      charts: [
        {
          title: 'Campaign Performance',
          badge: 'This Quarter',
          type: 'bar',
          data: {
            labels: ['Diwali Sale', 'Summer Blast', 'New User', 'Referral', 'Flash Sale', 'Weekend'],
            datasets: [{ label: 'ROI %', data: [420, 380, 340, 290, 250, 210], colors: ['#16a34a', '#4da6ff', '#00d2a0', '#ffb347', '#a78bfa', '#f472b6'] }]
          }
        },
        {
          title: 'Customer Acquisition Trend',
          badge: 'Last 12 Months',
          type: 'line',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'New Customers', data: [2200, 2450, 2800, 3100, 2900, 3400, 3800, 4100, 3700, 4200, 4500, 4520], color: '#4da6ff' }]
          }
        },
        {
          title: 'Channel Distribution',
          badge: 'Current',
          type: 'doughnut',
          data: {
            labels: ['Social Media', 'Email', 'Google Ads', 'Organic', 'Referral', 'Offline'],
            datasets: [{ data: [32, 24, 20, 12, 8, 4], colors: ['#16a34a', '#4da6ff', '#00d2a0', '#ffb347', '#a78bfa', '#f472b6'] }]
          }
        },
        {
          title: 'CTR by Campaign',
          badge: 'Active',
          type: 'horizontalBar',
          data: {
            labels: ['Diwali Sale', 'Summer Blast', 'Flash Friday', 'New User Offer', 'Loyalty Prog', 'Weekend Deal'],
            datasets: [{ data: [8.5, 7.2, 6.8, 5.9, 5.1, 4.3], colors: ['#00d2a0', '#00d2a0', '#4da6ff', '#4da6ff', '#ffb347', '#ffb347'] }]
          }
        }
      ],
      table: {
        title: 'Active Campaigns',
        headers: ['Campaign', 'Channel', 'Budget', 'Spent', 'Leads', 'ROI'],
        rows: [
          ['Diwali Mega Sale', 'Social + Email', '₹5,00,000', '₹3,80,000', '12,450', '420%'],
          ['Summer Blast 2026', 'Google Ads', '₹3,50,000', '₹2,90,000', '8,920', '380%'],
          ['New User Welcome', 'Email', '₹1,20,000', '₹98,000', '4,520', '340%'],
          ['Refer & Earn', 'In-App', '₹2,00,000', '₹1,45,000', '6,780', '290%'],
          ['Flash Friday', 'Social Media', '₹80,000', '₹72,000', '3,210', '250%'],
          ['Weekend Warriors', 'Push + SMS', '₹60,000', '₹48,000', '2,150', '210%']
        ]
      },
      team: makeTeam(['Marketing Head', 'Content Strategist', 'Social Media Mgr', 'SEO Specialist', 'Campaign Manager', 'Graphic Designer', 'Email Marketer'], 7),
      activities: [
        { icon: '🚀', person: 'Kavita Nair', action: 'launched Monsoon Sale campaign', time: '2 min ago', color: '#16a34a' },
        { icon: '📧', person: 'Rohan Mehta', action: 'sent newsletter to 45K subscribers', time: '15 min ago', color: '#4da6ff' },
        { icon: '📊', person: 'Meera Shah', action: 'submitted social media analytics report', time: '1 hour ago', color: '#00d2a0' },
        { icon: '🎨', person: 'Shreya Rao', action: 'designed new banner for homepage', time: '3 hours ago', color: '#a78bfa' },
        { icon: '🔗', person: 'Sanjay Malhotra', action: 'set up A/B test for landing page', time: '5 hours ago', color: '#ffb347' }
      ]
    },

    // ========== 4. HR ==========
    hr: {
      title: 'HR Dashboard',
      subtitle: 'Workforce management, hiring, and employee engagement',
      icon: '👥',
      kpis: [
        { label: 'Total Employees', value: '847', change: '+12', positive: true, icon: '👥', color: '#4da6ff' },
        { label: 'Open Positions', value: '23', change: '-4', positive: true, icon: '💼', color: '#a78bfa' },
        { label: 'Attendance Rate', value: '94.2%', change: '+1.1%', positive: true, icon: '✅', color: '#00d2a0' },
        { label: 'Avg Tenure', value: '3.2 yrs', change: '+0.3', positive: true, icon: '📅', color: '#ffb347' }
      ],
      charts: [
        {
          title: 'Headcount by Department',
          badge: 'Current',
          type: 'bar',
          data: {
            labels: ['Operations', 'Sales', 'Logistics', 'IT', 'Support', 'Marketing', 'Finance', 'HR'],
            datasets: [{ label: 'Employees', data: [210, 165, 142, 98, 87, 62, 48, 35], colors: ['#4da6ff', '#16a34a', '#00d2a0', '#ffb347', '#a78bfa', '#f472b6', '#34d399', '#60a5fa'] }]
          }
        },
        {
          title: 'Hiring Trend',
          badge: 'Last 12 Months',
          type: 'line',
          data: {
            labels: MONTHS,
            datasets: [
              { label: 'Hires', data: [8, 12, 15, 10, 18, 14, 22, 16, 11, 19, 13, 12], color: '#00d2a0' },
              { label: 'Exits', data: [4, 6, 5, 8, 3, 7, 5, 4, 6, 3, 5, 4], color: '#16a34a' }
            ]
          }
        },
        {
          title: 'Gender Distribution',
          badge: 'Current',
          type: 'doughnut',
          data: {
            labels: ['Male', 'Female', 'Non-Binary'],
            datasets: [{ data: [58, 39, 3], colors: ['#4da6ff', '#f472b6', '#a78bfa'] }]
          }
        },
        {
          title: 'Attrition by Department',
          badge: 'This Year',
          type: 'horizontalBar',
          data: {
            labels: ['Support', 'Logistics', 'Operations', 'Sales', 'IT', 'Marketing'],
            datasets: [{ data: [14, 12, 10, 8, 5, 3], colors: ['#16a34a', '#16a34a', '#ffb347', '#ffb347', '#00d2a0', '#00d2a0'] }]
          }
        }
      ],
      table: {
        title: 'Recent Hires',
        headers: ['Name', 'Department', 'Position', 'Start Date', 'Status', 'Manager'],
        rows: [
          ['Ankit Tiwari', 'Engineering', 'Sr. Developer', '10 Jun 2026', '🟢 Active', 'Vikram Singh'],
          ['Ritu Chauhan', 'Marketing', 'Content Writer', '08 Jun 2026', '🟢 Active', 'Kavita Nair'],
          ['Deepak Pillai', 'Operations', 'Shift Manager', '05 Jun 2026', '🟡 Onboarding', 'Suresh Kumar'],
          ['Megha Agarwal', 'Finance', 'Jr. Accountant', '01 Jun 2026', '🟢 Active', 'Sanjay Malhotra'],
          ['Harsh Bhat', 'Logistics', 'Rider Coordinator', '28 May 2026', '🟢 Active', 'Arun Desai'],
          ['Simran Kaur', 'Support', 'Support Agent', '25 May 2026', '🟢 Active', 'Priya Patel'],
          ['Varun Nair', 'IT', 'DevOps Engineer', '22 May 2026', '🟢 Active', 'Nikhil Iyer']
        ]
      },
      team: makeTeam(['HR Director', 'Talent Acquisition', 'HR Business Partner', 'Payroll Manager', 'L&D Specialist'], 5),
      activities: [
        { icon: '🎉', person: 'Divya Mehta', action: 'onboarded 3 new employees', time: '2 min ago', color: '#00d2a0' },
        { icon: '📋', person: 'Manish Gupta', action: 'updated leave policy for Q3', time: '15 min ago', color: '#4da6ff' },
        { icon: '🏆', person: 'Isha Sharma', action: 'announced Employee of the Month', time: '1 hour ago', color: '#ffb347' },
        { icon: '📊', person: 'Kiran Reddy', action: 'completed engagement survey analysis', time: '3 hours ago', color: '#a78bfa' },
        { icon: '💼', person: 'Swati Verma', action: 'posted 4 new job openings', time: '5 hours ago', color: '#16a34a' }
      ]
    },

    // ========== 5. FINANCE ==========
    finance: {
      title: 'Finance Dashboard',
      subtitle: 'Revenue, profitability, cash flow, and budget tracking',
      icon: '💰',
      kpis: [
        { label: 'Net Revenue', value: '₹18.5 Cr', change: '+14.2%', positive: true, icon: '💰', color: '#00d2a0' },
        { label: 'Gross Profit', value: '₹5.2 Cr', change: '+9.8%', positive: true, icon: '📈', color: '#4da6ff' },
        { label: 'Operating Margin', value: '28.1%', change: '+1.3%', positive: true, icon: '⚖️', color: '#a78bfa' },
        { label: 'Cash Flow', value: '₹3.1 Cr', change: '+18.5%', positive: true, icon: '🏦', color: '#ffb347' }
      ],
      charts: [
        {
          title: 'Monthly P&L',
          badge: 'FY 2025-26',
          type: 'bar',
          data: {
            labels: MONTHS,
            datasets: [
              { label: 'Revenue', data: [142, 148, 155, 162, 158, 170, 178, 185, 175, 190, 198, 210], color: '#00d2a0' },
              { label: 'Expenses', data: [105, 108, 112, 118, 115, 122, 128, 132, 126, 135, 140, 148], color: '#16a34a' }
            ]
          }
        },
        {
          title: 'Cash Flow Trend',
          badge: 'Last 12 Months',
          type: 'area',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'Cash Flow (₹L)', data: [210, 225, 240, 255, 235, 270, 290, 310, 295, 320, 340, 365], color: '#4da6ff' }]
          }
        },
        {
          title: 'Expense Breakdown',
          badge: 'This Month',
          type: 'doughnut',
          data: {
            labels: ['COGS', 'Salaries', 'Marketing', 'Operations', 'IT', 'Admin'],
            datasets: [{ data: [42, 28, 12, 8, 6, 4], colors: ['#16a34a', '#4da6ff', '#00d2a0', '#ffb347', '#a78bfa', '#f472b6'] }]
          }
        },
        {
          title: 'Budget vs Actual',
          badge: 'This Quarter',
          type: 'horizontalBar',
          data: {
            labels: ['Revenue', 'COGS', 'Marketing', 'Salaries', 'Operations', 'IT Infra'],
            datasets: [{ data: [105, 98, 92, 101, 88, 95], colors: ['#00d2a0', '#ffb347', '#ffb347', '#00d2a0', '#16a34a', '#4da6ff'] }]
          }
        }
      ],
      table: {
        title: 'Top Expenses',
        headers: ['Category', 'Budgeted', 'Actual', 'Variance', '% Var'],
        rows: [
          ['Cost of Goods Sold', '₹6,20,00,000', '₹6,48,00,000', '₹-28,00,000', '-4.5%'],
          ['Employee Salaries', '₹4,10,00,000', '₹4,15,00,000', '₹-5,00,000', '-1.2%'],
          ['Marketing & Ads', '₹1,80,00,000', '₹1,65,00,000', '₹15,00,000', '+8.3%'],
          ['Operations & Logistics', '₹1,20,00,000', '₹1,32,00,000', '₹-12,00,000', '-10.0%'],
          ['Technology & Infra', '₹90,00,000', '₹85,50,000', '₹4,50,000', '+5.0%'],
          ['Admin & Overhead', '₹60,00,000', '₹58,00,000', '₹2,00,000', '+3.3%'],
          ['Rent & Utilities', '₹45,00,000', '₹44,50,000', '₹50,000', '+1.1%']
        ]
      },
      team: makeTeam(['CFO', 'Financial Controller', 'Sr. Accountant', 'Tax Specialist', 'Accounts Payable', 'Financial Analyst'], 6),
      activities: [
        { icon: '💰', person: 'Ajay Agarwal', action: 'finalized Q2 financial statements', time: '2 min ago', color: '#00d2a0' },
        { icon: '📊', person: 'Nisha Chauhan', action: 'submitted GST returns for May', time: '15 min ago', color: '#4da6ff' },
        { icon: '🏦', person: 'Prakash Tiwari', action: 'processed vendor payments (₹42L)', time: '1 hour ago', color: '#a78bfa' },
        { icon: '📋', person: 'Ritika Sharma', action: 'updated FY26 budget projections', time: '3 hours ago', color: '#ffb347' },
        { icon: '⚖️', person: 'Rahul Verma', action: 'completed internal audit for Q1', time: '5 hours ago', color: '#16a34a' }
      ]
    },

    // ========== 6. LOGISTICS ==========
    logistics: {
      title: 'Logistics Dashboard',
      subtitle: 'Deliveries, fleet tracking, and route optimization',
      icon: '🚚',
      kpis: [
        { label: 'Deliveries Today', value: '892', change: '+6.4%', positive: true, icon: '📦', color: '#4da6ff' },
        { label: 'On-Time Rate', value: '96.3%', change: '+1.2%', positive: true, icon: '⏰', color: '#00d2a0' },
        { label: 'Avg Delivery Time', value: '42 min', change: '-3 min', positive: true, icon: '🚀', color: '#a78bfa' },
        { label: 'Active Riders', value: '156', change: '+8', positive: true, icon: '🏍️', color: '#ffb347' }
      ],
      charts: [
        {
          title: 'Delivery Volume',
          badge: 'Last 30 Days',
          type: 'bar',
          data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'This Week'],
            datasets: [{ label: 'Deliveries', data: [5200, 5800, 5450, 6100, 6400], colors: ['#4da6ff', '#4da6ff', '#4da6ff', '#4da6ff', '#00d2a0'] }]
          }
        },
        {
          title: 'Delivery Time Trend',
          badge: 'Last 12 Months',
          type: 'line',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'Avg Time (min)', data: [52, 50, 48, 47, 46, 45, 44, 43, 43, 42, 42, 42], color: '#a78bfa' }]
          }
        },
        {
          title: 'Fleet Status',
          badge: 'Real-time',
          type: 'doughnut',
          data: {
            labels: ['Active', 'Returning', 'On Break', 'Offline'],
            datasets: [{ data: [56, 22, 14, 8], colors: ['#00d2a0', '#4da6ff', '#ffb347', '#16a34a'] }]
          }
        },
        {
          title: 'Zone Performance',
          badge: 'Today',
          type: 'horizontalBar',
          data: {
            labels: ['Central', 'North', 'South', 'East', 'West', 'Suburbs'],
            datasets: [{ data: [97.5, 96.8, 96.2, 95.4, 94.8, 93.1], colors: ['#00d2a0', '#00d2a0', '#00d2a0', '#4da6ff', '#4da6ff', '#ffb347'] }]
          }
        }
      ],
      table: {
        title: 'Active Deliveries',
        headers: ['Order ID', 'Customer', 'Zone', 'Rider', 'Status', 'ETA'],
        rows: [
          ['#DM-89234', 'Rajesh Khanna', 'Central', 'Mohan K.', '🟢 En Route', '12 min'],
          ['#DM-89235', 'Sunita Devi', 'North', 'Raju S.', '🟡 Picking Up', '25 min'],
          ['#DM-89236', 'Anil Kumar', 'South', 'Vinod M.', '🟢 En Route', '8 min'],
          ['#DM-89237', 'Lakshmi R.', 'East', 'Ganesh P.', '🔵 Preparing', '35 min'],
          ['#DM-89238', 'Dinesh Patil', 'West', 'Sunil T.', '🟢 En Route', '15 min'],
          ['#DM-89239', 'Meena Kumari', 'Central', 'Ashok D.', '🟢 Arriving', '3 min'],
          ['#DM-89240', 'Ramesh Yadav', 'Suburbs', 'Deepak K.', '🟡 Picking Up', '30 min'],
          ['#DM-89241', 'Fatima B.', 'North', 'Imran A.', '🟢 En Route', '18 min']
        ]
      },
      team: makeTeam(['Fleet Manager', 'Route Optimizer', 'Dispatch Lead', 'Rider Coordinator', 'Last-Mile Lead', 'Logistics Analyst', 'Warehouse Liaison', 'Operations Coord'], 8),
      activities: [
        { icon: '🚚', person: 'Arjun Desai', action: 'dispatched 45 orders for South zone', time: '2 min ago', color: '#4da6ff' },
        { icon: '⏰', person: 'Kavita Pillai', action: 'resolved delay in East zone (accident)', time: '15 min ago', color: '#ffb347' },
        { icon: '📍', person: 'Rohan Bhat', action: 'optimized 12 delivery routes', time: '1 hour ago', color: '#00d2a0' },
        { icon: '🏍️', person: 'Meera Iyer', action: 'onboarded 5 new delivery riders', time: '3 hours ago', color: '#a78bfa' },
        { icon: '📊', person: 'Vikram Rao', action: 'generated daily fleet performance report', time: '5 hours ago', color: '#16a34a' }
      ]
    },

    // ========== 7. SUPPORT ==========
    support: {
      title: 'Customer Support Dashboard',
      subtitle: 'Tickets, resolution metrics, and customer satisfaction',
      icon: '🎧',
      kpis: [
        { label: 'Open Tickets', value: '87', change: '-12', positive: true, icon: '🎫', color: '#ffb347' },
        { label: 'Resolved Today', value: '234', change: '+18', positive: true, icon: '✅', color: '#00d2a0' },
        { label: 'Avg Resolution Time', value: '2.4 hrs', change: '-0.3 hrs', positive: true, icon: '⏱️', color: '#4da6ff' },
        { label: 'CSAT Score', value: '4.6/5', change: '+0.2', positive: true, icon: '⭐', color: '#a78bfa' }
      ],
      charts: [
        {
          title: 'Ticket Volume',
          badge: 'Last 30 Days',
          type: 'bar',
          data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'This Week'],
            datasets: [
              { label: 'Opened', data: [320, 345, 310, 295, 280], color: '#16a34a' },
              { label: 'Resolved', data: [310, 340, 325, 305, 290], color: '#00d2a0' }
            ]
          }
        },
        {
          title: 'Resolution Trend',
          badge: 'Last 12 Months',
          type: 'line',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'Avg Hours', data: [4.2, 3.8, 3.5, 3.2, 3.0, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.4], color: '#4da6ff' }]
          }
        },
        {
          title: 'Issue Categories',
          badge: 'This Month',
          type: 'doughnut',
          data: {
            labels: ['Delivery', 'Product Quality', 'Refund', 'App Issues', 'Payment', 'Other'],
            datasets: [{ data: [35, 22, 18, 12, 8, 5], colors: ['#16a34a', '#4da6ff', '#00d2a0', '#ffb347', '#a78bfa', '#f472b6'] }]
          }
        },
        {
          title: 'Agent Performance',
          badge: 'This Week',
          type: 'horizontalBar',
          data: {
            labels: ['Priya P.', 'Amit S.', 'Neha G.', 'Rahul V.', 'Sneha K.', 'Rohan M.'],
            datasets: [{ data: [48, 45, 42, 38, 36, 32], colors: ['#00d2a0', '#00d2a0', '#4da6ff', '#4da6ff', '#ffb347', '#ffb347'] }]
          }
        }
      ],
      table: {
        title: 'Recent Tickets',
        headers: ['ID', 'Customer', 'Issue', 'Priority', 'Status', 'Assigned To'],
        rows: [
          ['#TK-4521', 'Ramesh Kumar', 'Late delivery (2 hrs)', '🔴 High', '🟡 In Progress', 'Priya P.'],
          ['#TK-4520', 'Anita Sharma', 'Wrong item delivered', '🔴 High', '🟢 Resolved', 'Amit S.'],
          ['#TK-4519', 'Suresh Patel', 'Refund not received', '🟡 Medium', '🟡 In Progress', 'Neha G.'],
          ['#TK-4518', 'Meena Desai', 'App crash on checkout', '🟡 Medium', '🔵 Assigned', 'Rahul V.'],
          ['#TK-4517', 'Vikram Joshi', 'Payment failed twice', '🔴 High', '🟢 Resolved', 'Sneha K.'],
          ['#TK-4516', 'Pooja Nair', 'Missing item in order', '🟡 Medium', '🟡 In Progress', 'Rohan M.'],
          ['#TK-4515', 'Ajay Reddy', 'Damaged packaging', '🟢 Low', '🟢 Resolved', 'Priya P.'],
          ['#TK-4514', 'Nisha Mehta', 'Promo code not working', '🟢 Low', '🔵 Assigned', 'Amit S.']
        ]
      },
      team: makeTeam(['Support Manager', 'Sr. Agent', 'Support Agent', 'Support Agent', 'Support Agent', 'QA Reviewer', 'Escalation Lead', 'Chat Support', 'Email Support', 'Voice Support'], 10),
      activities: [
        { icon: '✅', person: 'Priya Patel', action: 'resolved 8 tickets in the last hour', time: '2 min ago', color: '#00d2a0' },
        { icon: '🔴', person: 'Amit Sharma', action: 'escalated ticket #TK-4521 to logistics', time: '15 min ago', color: '#16a34a' },
        { icon: '⭐', person: 'Neha Gupta', action: 'received 5-star CSAT from customer', time: '1 hour ago', color: '#ffb347' },
        { icon: '📞', person: 'Rahul Verma', action: 'handled 12 phone support calls', time: '3 hours ago', color: '#4da6ff' },
        { icon: '📋', person: 'Sneha Kumar', action: 'updated FAQ knowledge base (5 articles)', time: '5 hours ago', color: '#a78bfa' }
      ]
    },

    // ========== 8. IT ==========
    it: {
      title: 'IT Dashboard',
      subtitle: 'System health, incidents, deployments, and infrastructure',
      icon: '💻',
      kpis: [
        { label: 'System Uptime', value: '99.97%', change: '+0.02%', positive: true, icon: '🟢', color: '#00d2a0' },
        { label: 'Active Incidents', value: '3', change: '-2', positive: true, icon: '🔴', color: '#16a34a' },
        { label: 'Deployments This Week', value: '12', change: '+4', positive: true, icon: '🚀', color: '#4da6ff' },
        { label: 'API Response Time', value: '145ms', change: '-12ms', positive: true, icon: '⚡', color: '#a78bfa' }
      ],
      charts: [
        {
          title: 'Uptime History',
          badge: 'Last 12 Months',
          type: 'area',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'Uptime %', data: [99.92, 99.95, 99.90, 99.94, 99.96, 99.93, 99.97, 99.98, 99.95, 99.96, 99.97, 99.97], color: '#00d2a0' }]
          }
        },
        {
          title: 'Incident Trend',
          badge: 'Last 12 Months',
          type: 'bar',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'Incidents', data: [8, 6, 12, 5, 4, 7, 3, 2, 5, 4, 3, 3], colors: ['#16a34a', '#16a34a', '#16a34a', '#ffb347', '#ffb347', '#16a34a', '#00d2a0', '#00d2a0', '#ffb347', '#ffb347', '#00d2a0', '#00d2a0'] }]
          }
        },
        {
          title: 'Service Status',
          badge: 'Real-time',
          type: 'doughnut',
          data: {
            labels: ['Healthy', 'Degraded', 'Down', 'Maintenance'],
            datasets: [{ data: [85, 8, 2, 5], colors: ['#00d2a0', '#ffb347', '#16a34a', '#4da6ff'] }]
          }
        },
        {
          title: 'API Response Time',
          badge: 'Last 24 Hours',
          type: 'line',
          data: {
            labels: ['00:00', '04:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
            datasets: [{ label: 'Response (ms)', data: [120, 115, 135, 180, 210, 195, 165, 155, 140, 125], color: '#a78bfa' }]
          }
        }
      ],
      table: {
        title: 'Recent Incidents',
        headers: ['ID', 'Service', 'Severity', 'Status', 'Duration', 'Assigned To'],
        rows: [
          ['#INC-892', 'Payment Gateway', 'P1 - Critical', '🟢 Resolved', '12 min', 'Nikhil Iyer'],
          ['#INC-891', 'Search API', 'P2 - Major', '🟡 Investigating', '45 min', 'Arjun Bhat'],
          ['#INC-890', 'Push Notifications', 'P3 - Minor', '🟡 Monitoring', '2 hrs', 'Kavita Pillai'],
          ['#INC-889', 'Image CDN', 'P2 - Major', '🟢 Resolved', '28 min', 'Rohan Desai'],
          ['#INC-888', 'Order Service', 'P1 - Critical', '🟢 Resolved', '8 min', 'Meera Nair'],
          ['#INC-887', 'Auth Service', 'P3 - Minor', '🟢 Resolved', '1 hr', 'Vikram Rao'],
          ['#INC-886', 'Database Replica', 'P2 - Major', '🟢 Resolved', '35 min', 'Amit Kumar']
        ]
      },
      team: makeTeam(['CTO', 'Sr. Engineer', 'DevOps Lead', 'Backend Dev', 'Frontend Dev', 'SRE Engineer', 'DBA', 'Security Analyst'], 8),
      activities: [
        { icon: '🚀', person: 'Nikhil Iyer', action: 'deployed v2.14.3 to production', time: '2 min ago', color: '#4da6ff' },
        { icon: '🔴', person: 'Arjun Bhat', action: 'investigating Search API latency spike', time: '15 min ago', color: '#16a34a' },
        { icon: '🔧', person: 'Kavita Pillai', action: 'applied security patch to auth service', time: '1 hour ago', color: '#00d2a0' },
        { icon: '📊', person: 'Rohan Desai', action: 'completed infrastructure cost audit', time: '3 hours ago', color: '#ffb347' },
        { icon: '💾', person: 'Meera Nair', action: 'migrated database to new cluster', time: '5 hours ago', color: '#a78bfa' }
      ]
    },

    // ========== 9. PROCUREMENT ==========
    procurement: {
      title: 'Procurement Dashboard',
      subtitle: 'Purchase orders, vendor management, and sourcing',
      icon: '🏷️',
      kpis: [
        { label: 'Active POs', value: '156', change: '+12', positive: true, icon: '📋', color: '#4da6ff' },
        { label: 'Pending Approvals', value: '23', change: '-5', positive: true, icon: '⏳', color: '#ffb347' },
        { label: 'Avg Lead Time', value: '5.2 days', change: '-0.8 days', positive: true, icon: '⏰', color: '#00d2a0' },
        { label: 'Cost Savings', value: '₹45L', change: '+₹8L', positive: true, icon: '💰', color: '#a78bfa' }
      ],
      charts: [
        {
          title: 'Purchase Volume',
          badge: 'Last 12 Months',
          type: 'bar',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'POs (₹L)', data: [85, 92, 88, 105, 98, 110, 115, 122, 108, 125, 130, 140], colors: ['#4da6ff', '#4da6ff', '#4da6ff', '#00d2a0', '#4da6ff', '#00d2a0', '#00d2a0', '#00d2a0', '#4da6ff', '#00d2a0', '#00d2a0', '#00d2a0'] }]
          }
        },
        {
          title: 'Vendor Performance',
          badge: 'Top Vendors',
          type: 'horizontalBar',
          data: {
            labels: ['Tata Consumer', 'HUL', 'Nestle', 'P&G', 'ITC', 'Amul'],
            datasets: [{ data: [96, 94, 92, 90, 88, 87], colors: ['#00d2a0', '#00d2a0', '#4da6ff', '#4da6ff', '#ffb347', '#ffb347'] }]
          }
        },
        {
          title: 'Category Spend',
          badge: 'This Month',
          type: 'doughnut',
          data: {
            labels: ['FMCG', 'Fresh Produce', 'Dairy', 'Packaging', 'Cleaning', 'Others'],
            datasets: [{ data: [38, 22, 18, 10, 7, 5], colors: ['#16a34a', '#4da6ff', '#00d2a0', '#ffb347', '#a78bfa', '#f472b6'] }]
          }
        },
        {
          title: 'Lead Time Trend',
          badge: 'Last 12 Months',
          type: 'line',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'Days', data: [7.5, 7.2, 6.8, 6.5, 6.2, 6.0, 5.8, 5.6, 5.5, 5.4, 5.3, 5.2], color: '#a78bfa' }]
          }
        }
      ],
      table: {
        title: 'Recent Purchase Orders',
        headers: ['PO#', 'Vendor', 'Items', 'Amount', 'Status', 'ETA'],
        rows: [
          ['PO-7821', 'Tata Consumer', '12 SKUs', '₹8,50,000', '🟢 Delivered', 'Completed'],
          ['PO-7820', 'HUL', '8 SKUs', '₹6,20,000', '🟡 In Transit', '2 days'],
          ['PO-7819', 'Nestle India', '15 SKUs', '₹12,40,000', '🟡 Processing', '4 days'],
          ['PO-7818', 'P&G India', '6 SKUs', '₹4,80,000', '🔵 Approved', '5 days'],
          ['PO-7817', 'ITC Limited', '10 SKUs', '₹7,60,000', '🟢 Delivered', 'Completed'],
          ['PO-7816', 'Amul India', '5 SKUs', '₹3,20,000', '🟡 In Transit', '1 day'],
          ['PO-7815', 'Britannia', '7 SKUs', '₹5,10,000', '⏳ Pending', 'Awaiting Approval']
        ]
      },
      team: makeTeam(['Procurement Head', 'Sr. Buyer', 'Vendor Manager', 'Category Specialist', 'Purchase Coordinator'], 5),
      activities: [
        { icon: '📋', person: 'Ajay Chauhan', action: 'raised PO #7822 for Parle Products', time: '2 min ago', color: '#4da6ff' },
        { icon: '✅', person: 'Nisha Tiwari', action: 'approved 5 purchase requisitions', time: '15 min ago', color: '#00d2a0' },
        { icon: '🤝', person: 'Prakash Verma', action: 'negotiated 8% discount with HUL', time: '1 hour ago', color: '#ffb347' },
        { icon: '📊', person: 'Ritika Patel', action: 'completed vendor quarterly review', time: '3 hours ago', color: '#a78bfa' },
        { icon: '🚛', person: 'Kiran Sharma', action: 'confirmed delivery for PO-7820', time: '5 hours ago', color: '#16a34a' }
      ]
    },

    // ========== 10. QUALITY ==========
    quality: {
      title: 'Quality Assurance Dashboard',
      subtitle: 'Inspections, defects, compliance, and returns analysis',
      icon: '✅',
      kpis: [
        { label: 'Inspections Done', value: '456', change: '+34', positive: true, icon: '🔍', color: '#4da6ff' },
        { label: 'Defect Rate', value: '0.8%', change: '-0.2%', positive: true, icon: '⚠️', color: '#00d2a0' },
        { label: 'Customer Returns', value: '34', change: '-8', positive: true, icon: '📦', color: '#ffb347' },
        { label: 'Compliance Score', value: '97.5%', change: '+1.2%', positive: true, icon: '🏆', color: '#a78bfa' }
      ],
      charts: [
        {
          title: 'Quality Score Trend',
          badge: 'Last 12 Months',
          type: 'line',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'Score %', data: [94.2, 94.5, 95.0, 95.3, 95.8, 96.0, 96.2, 96.5, 96.8, 97.0, 97.3, 97.5], color: '#00d2a0' }]
          }
        },
        {
          title: 'Defects by Category',
          badge: 'This Month',
          type: 'bar',
          data: {
            labels: ['Packaging', 'Labeling', 'Freshness', 'Weight', 'Damage', 'Contam.'],
            datasets: [{ label: 'Count', data: [18, 14, 12, 9, 7, 4], colors: ['#16a34a', '#ffb347', '#4da6ff', '#a78bfa', '#f472b6', '#00d2a0'] }]
          }
        },
        {
          title: 'Inspection Results',
          badge: 'This Month',
          type: 'doughnut',
          data: {
            labels: ['Pass', 'Minor Issues', 'Major Issues', 'Failed'],
            datasets: [{ data: [82, 12, 4, 2], colors: ['#00d2a0', '#ffb347', '#16a34a', '#f472b6'] }]
          }
        },
        {
          title: 'Return Reasons',
          badge: 'Last 30 Days',
          type: 'horizontalBar',
          data: {
            labels: ['Wrong Item', 'Damaged', 'Expired', 'Quality Issue', 'Not as Shown', 'Other'],
            datasets: [{ data: [12, 8, 6, 4, 3, 1], colors: ['#16a34a', '#ffb347', '#16a34a', '#4da6ff', '#a78bfa', '#00d2a0'] }]
          }
        }
      ],
      table: {
        title: 'Recent Inspections',
        headers: ['ID', 'Product', 'Inspector', 'Result', 'Issues', 'Date'],
        rows: [
          ['#QA-1245', 'Amul Milk Batch #892', 'Deepa Reddy', '🟢 Pass', '0', '12 Jun 2026'],
          ['#QA-1244', 'Fortune Oil Lot #456', 'Arun Desai', '🟡 Minor', '2 labeling', '12 Jun 2026'],
          ['#QA-1243', 'Parle-G Batch #781', 'Pooja Joshi', '🟢 Pass', '0', '11 Jun 2026'],
          ['#QA-1242', 'Fresh Veggies Lot #23', 'Suresh Kumar', '🟡 Minor', '1 freshness', '11 Jun 2026'],
          ['#QA-1241', 'Tata Salt Batch #345', 'Nikhil Iyer', '🟢 Pass', '0', '10 Jun 2026'],
          ['#QA-1240', 'Maggi Noodles #567', 'Deepa Reddy', '🟢 Pass', '0', '10 Jun 2026'],
          ['#QA-1239', 'Dettol Soap Lot #89', 'Arun Desai', '🔴 Failed', '3 packaging', '09 Jun 2026']
        ]
      },
      team: makeTeam(['QA Manager', 'Sr. Inspector', 'Quality Analyst', 'Lab Technician', 'Compliance Lead', 'QA Inspector'], 6),
      activities: [
        { icon: '🔍', person: 'Deepa Reddy', action: 'completed 12 product inspections', time: '2 min ago', color: '#4da6ff' },
        { icon: '⚠️', person: 'Arun Desai', action: 'flagged packaging defect in Lot #89', time: '15 min ago', color: '#16a34a' },
        { icon: '✅', person: 'Pooja Joshi', action: 'certified organic produce batch', time: '1 hour ago', color: '#00d2a0' },
        { icon: '📋', person: 'Suresh Kumar', action: 'updated quality checklist for dairy', time: '3 hours ago', color: '#ffb347' },
        { icon: '📊', person: 'Nikhil Iyer', action: 'submitted monthly quality report', time: '5 hours ago', color: '#a78bfa' }
      ]
    },

    // ========== 11. ANALYTICS ==========
    analytics: {
      title: 'Analytics Dashboard',
      subtitle: 'User behavior, traffic analysis, and engagement metrics',
      icon: '📈',
      kpis: [
        { label: 'Daily Active Users', value: '45.2K', change: '+12.4%', positive: true, icon: '👥', color: '#4da6ff' },
        { label: 'Page Views', value: '320K', change: '+8.7%', positive: true, icon: '👁️', color: '#00d2a0' },
        { label: 'Bounce Rate', value: '32.1%', change: '-2.3%', positive: true, icon: '↩️', color: '#a78bfa' },
        { label: 'Session Duration', value: '4.2 min', change: '+0.4 min', positive: true, icon: '⏱️', color: '#ffb347' }
      ],
      charts: [
        {
          title: 'Traffic Trend',
          badge: 'Last 30 Days',
          type: 'area',
          data: {
            labels: ['W1 Mon', 'W1 Thu', 'W2 Mon', 'W2 Thu', 'W3 Mon', 'W3 Thu', 'W4 Mon', 'W4 Thu', 'This Mon', 'Today'],
            datasets: [{ label: 'Users', data: [38200, 42100, 39800, 44500, 41200, 43800, 40500, 45100, 43200, 45200], color: '#4da6ff' }]
          }
        },
        {
          title: 'User Acquisition',
          badge: 'This Month',
          type: 'bar',
          data: {
            labels: ['Organic', 'Direct', 'Social', 'Referral', 'Email', 'Paid Ads'],
            datasets: [{ label: 'Users', data: [12500, 9800, 8200, 5400, 4800, 4500], colors: ['#00d2a0', '#4da6ff', '#16a34a', '#ffb347', '#a78bfa', '#f472b6'] }]
          }
        },
        {
          title: 'Device Distribution',
          badge: 'Current',
          type: 'doughnut',
          data: {
            labels: ['Mobile', 'Desktop', 'Tablet', 'App'],
            datasets: [{ data: [52, 28, 8, 12], colors: ['#16a34a', '#4da6ff', '#ffb347', '#00d2a0'] }]
          }
        },
        {
          title: 'Funnel Analysis',
          badge: 'This Week',
          type: 'horizontalBar',
          data: {
            labels: ['Visit', 'Browse', 'Add to Cart', 'Checkout', 'Payment', 'Complete'],
            datasets: [{ data: [100, 72, 45, 28, 22, 18], colors: ['#4da6ff', '#4da6ff', '#00d2a0', '#00d2a0', '#ffb347', '#00d2a0'] }]
          }
        }
      ],
      table: {
        title: 'Top Pages',
        headers: ['Page', 'Views', 'Unique Visitors', 'Bounce Rate', 'Avg Time'],
        rows: [
          ['Homepage', '85,200', '42,100', '28.5%', '1:45'],
          ['Product Listing', '62,400', '38,900', '22.3%', '3:12'],
          ['Product Detail', '48,700', '32,100', '35.1%', '2:28'],
          ['Cart Page', '24,300', '18,500', '18.7%', '1:55'],
          ['Checkout', '18,200', '15,400', '12.4%', '4:20'],
          ['Category - Groceries', '32,100', '24,800', '25.6%', '2:45'],
          ['Category - Snacks', '28,400', '21,200', '27.8%', '2:30'],
          ['Search Results', '22,800', '19,500', '30.2%', '1:18']
        ]
      },
      team: makeTeam(['Data Science Lead', 'Sr. Data Analyst', 'Data Engineer', 'BI Analyst', 'Growth Analyst'], 5),
      activities: [
        { icon: '📊', person: 'Manish Gupta', action: 'published weekly analytics report', time: '2 min ago', color: '#4da6ff' },
        { icon: '🔬', person: 'Isha Sharma', action: 'completed A/B test analysis (checkout flow)', time: '15 min ago', color: '#00d2a0' },
        { icon: '📈', person: 'Kiran Reddy', action: 'identified 15% uplift in mobile conversions', time: '1 hour ago', color: '#a78bfa' },
        { icon: '🎯', person: 'Swati Verma', action: 'set up cohort tracking for new users', time: '3 hours ago', color: '#ffb347' },
        { icon: '💡', person: 'Ajay Patel', action: 'recommended search UX improvements', time: '5 hours ago', color: '#16a34a' }
      ]
    },

    // ========== 12. OPERATIONS ==========
    operations: {
      title: 'Operations Dashboard',
      subtitle: 'Order processing, efficiency, and capacity management',
      icon: '⚙️',
      kpis: [
        { label: 'Order Throughput', value: '2,450/hr', change: '+8.2%', positive: true, icon: '⚡', color: '#4da6ff' },
        { label: 'Efficiency', value: '94.7%', change: '+1.5%', positive: true, icon: '📊', color: '#00d2a0' },
        { label: 'Capacity Utilization', value: '82%', change: '+3.1%', positive: true, icon: '🏭', color: '#a78bfa' },
        { label: 'SLA Compliance', value: '98.2%', change: '+0.4%', positive: true, icon: '✅', color: '#ffb347' }
      ],
      charts: [
        {
          title: 'Throughput Trend',
          badge: 'Last 12 Months',
          type: 'line',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'Orders/hr', data: [1850, 1920, 2010, 2100, 2050, 2180, 2250, 2320, 2280, 2380, 2420, 2450], color: '#4da6ff' }]
          }
        },
        {
          title: 'Efficiency by Shift',
          badge: 'Today',
          type: 'bar',
          data: {
            labels: ['Morning (6-10)', 'Forenoon (10-2)', 'Afternoon (2-6)', 'Evening (6-10)', 'Night (10-2)', 'Early (2-6)'],
            datasets: [{ label: 'Efficiency %', data: [96.2, 95.8, 94.5, 93.8, 92.1, 91.5], colors: ['#00d2a0', '#00d2a0', '#4da6ff', '#4da6ff', '#ffb347', '#ffb347'] }]
          }
        },
        {
          title: 'Capacity Distribution',
          badge: 'Current',
          type: 'doughnut',
          data: {
            labels: ['Utilized', 'Available', 'Maintenance', 'Reserved'],
            datasets: [{ data: [82, 10, 5, 3], colors: ['#4da6ff', '#00d2a0', '#ffb347', '#16a34a'] }]
          }
        },
        {
          title: 'Process Times',
          badge: 'Average',
          type: 'horizontalBar',
          data: {
            labels: ['Order Picking', 'Packing', 'QC Check', 'Dispatch', 'Handover', 'Processing'],
            datasets: [{ data: [8.5, 5.2, 3.1, 2.8, 2.2, 1.5], colors: ['#16a34a', '#ffb347', '#4da6ff', '#4da6ff', '#00d2a0', '#00d2a0'] }]
          }
        }
      ],
      table: {
        title: 'Shift Performance',
        headers: ['Shift', 'Orders', 'Efficiency', 'Issues', 'Lead', 'Status'],
        rows: [
          ['Morning (6AM-10AM)', '2,450', '96.2%', '3', 'Suresh Kumar', '🟢 Active'],
          ['Forenoon (10AM-2PM)', '2,380', '95.8%', '5', 'Deepak Pillai', '🟢 Active'],
          ['Afternoon (2PM-6PM)', '2,210', '94.5%', '8', 'Meena Sharma', '🟢 Active'],
          ['Evening (6PM-10PM)', '2,180', '93.8%', '6', 'Ravi Patel', '🟡 Staffing Issue'],
          ['Night (10PM-2AM)', '1,850', '92.1%', '4', 'Ashok Kumar', '🟢 Normal'],
          ['Early (2AM-6AM)', '1,420', '91.5%', '2', 'Vinod Desai', '🟢 Normal']
        ]
      },
      team: makeTeam(['Operations Director', 'Shift Manager', 'Process Lead', 'Fulfillment Mgr', 'Capacity Planner', 'Ops Analyst', 'Quality Coord'], 7),
      activities: [
        { icon: '⚡', person: 'Suresh Kumar', action: 'achieved 96.2% efficiency on morning shift', time: '2 min ago', color: '#00d2a0' },
        { icon: '🔧', person: 'Deepak Pillai', action: 'resolved conveyor belt issue at Zone 3', time: '15 min ago', color: '#4da6ff' },
        { icon: '📊', person: 'Meena Sharma', action: 'submitted shift handover report', time: '1 hour ago', color: '#a78bfa' },
        { icon: '⚠️', person: 'Ravi Patel', action: 'flagged staffing shortage for evening shift', time: '3 hours ago', color: '#ffb347' },
        { icon: '🏭', person: 'Ashok Kumar', action: 'completed equipment maintenance checklist', time: '5 hours ago', color: '#16a34a' }
      ]
    },

    // ========== 13. COMPLIANCE ==========
    compliance: {
      title: 'Compliance Dashboard',
      subtitle: 'Audits, risk management, and regulatory compliance',
      icon: '📋',
      kpis: [
        { label: 'Audits Completed', value: '24', change: '+3', positive: true, icon: '🔍', color: '#4da6ff' },
        { label: 'Pending Actions', value: '8', change: '-4', positive: true, icon: '⏳', color: '#ffb347' },
        { label: 'Risk Score', value: 'Low - 2.1', change: '-0.3', positive: true, icon: '🛡️', color: '#00d2a0' },
        { label: 'Regulatory Updates', value: '5', change: '+2', positive: false, icon: '📜', color: '#a78bfa' }
      ],
      charts: [
        {
          title: 'Audit Timeline',
          badge: 'This Year',
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{ label: 'Audits', data: [3, 4, 5, 3, 5, 4], colors: ['#4da6ff', '#4da6ff', '#00d2a0', '#4da6ff', '#00d2a0', '#4da6ff'] }]
          }
        },
        {
          title: 'Risk Trend',
          badge: 'Last 12 Months',
          type: 'line',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'Risk Score', data: [3.8, 3.5, 3.2, 3.0, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1], color: '#00d2a0' }]
          }
        },
        {
          title: 'Compliance by Area',
          badge: 'Current',
          type: 'doughnut',
          data: {
            labels: ['FSSAI', 'GST', 'Labor Laws', 'Data Privacy', 'Fire Safety', 'Environment'],
            datasets: [{ data: [99, 98, 97, 96, 95, 94], colors: ['#00d2a0', '#00d2a0', '#4da6ff', '#4da6ff', '#ffb347', '#ffb347'] }]
          }
        },
        {
          title: 'Action Items',
          badge: 'Open',
          type: 'horizontalBar',
          data: {
            labels: ['Policy Updates', 'Training', 'Documentation', 'System Changes', 'Certifications'],
            datasets: [{ data: [3, 2, 2, 1, 0], colors: ['#16a34a', '#ffb347', '#ffb347', '#4da6ff', '#00d2a0'] }]
          }
        }
      ],
      table: {
        title: 'Recent Audits',
        headers: ['ID', 'Area', 'Auditor', 'Findings', 'Status', 'Due Date'],
        rows: [
          ['#AUD-124', 'FSSAI Compliance', 'Ritika Patel', '0 Major, 2 Minor', '🟢 Closed', 'Completed'],
          ['#AUD-123', 'Fire Safety', 'External Auditor', '1 Major, 3 Minor', '🟡 In Progress', '30 Jun 2026'],
          ['#AUD-122', 'Data Privacy (DPDP)', 'Nisha Chauhan', '0 Major, 1 Minor', '🟢 Closed', 'Completed'],
          ['#AUD-121', 'GST Returns', 'Prakash Verma', '0 Findings', '🟢 Closed', 'Completed'],
          ['#AUD-120', 'Labor Law Review', 'External Auditor', '2 Major, 1 Minor', '🟡 Remediation', '15 Jul 2026'],
          ['#AUD-119', 'Environmental', 'Ritika Patel', '0 Major, 2 Minor', '🟢 Closed', 'Completed']
        ]
      },
      team: makeTeam(['Compliance Director', 'Regulatory Analyst', 'Internal Auditor', 'Legal Counsel'], 4),
      activities: [
        { icon: '🔍', person: 'Ritika Patel', action: 'completed FSSAI compliance audit', time: '2 min ago', color: '#00d2a0' },
        { icon: '📜', person: 'Nisha Chauhan', action: 'reviewed new DPDP Act amendments', time: '15 min ago', color: '#4da6ff' },
        { icon: '⚠️', person: 'Prakash Verma', action: 'flagged fire safety finding for resolution', time: '1 hour ago', color: '#16a34a' },
        { icon: '📋', person: 'Ajay Agarwal', action: 'updated compliance training materials', time: '3 hours ago', color: '#ffb347' },
        { icon: '✅', person: 'Ritika Patel', action: 'closed 3 audit action items', time: '5 hours ago', color: '#a78bfa' }
      ]
    },

    // ========== 14. MANAGEMENT ==========
    management: {
      title: 'Management Dashboard',
      subtitle: 'Executive overview, KPIs, and strategic metrics',
      icon: '👔',
      kpis: [
        { label: 'Total Revenue', value: '₹18.5 Cr', change: '+14.2%', positive: true, icon: '💰', color: '#00d2a0' },
        { label: 'Total Orders', value: '38.4K', change: '+11.5%', positive: true, icon: '📦', color: '#4da6ff' },
        { label: 'Customer Base', value: '125K', change: '+18.2%', positive: true, icon: '👥', color: '#a78bfa' },
        { label: 'Employee Count', value: '847', change: '+12', positive: true, icon: '🏢', color: '#ffb347' }
      ],
      charts: [
        {
          title: 'Revenue Overview',
          badge: 'FY 2025-26',
          type: 'area',
          data: {
            labels: MONTHS,
            datasets: [{ label: 'Revenue (₹Cr)', data: [1.2, 1.3, 1.4, 1.5, 1.4, 1.6, 1.7, 1.8, 1.7, 1.9, 2.0, 2.1], color: '#00d2a0' }]
          }
        },
        {
          title: 'Department Performance',
          badge: 'This Quarter',
          type: 'bar',
          data: {
            labels: ['Sales', 'Operations', 'Logistics', 'Marketing', 'Support', 'IT'],
            datasets: [{ label: 'Score', data: [92, 95, 96, 88, 90, 98], colors: ['#16a34a', '#4da6ff', '#00d2a0', '#ffb347', '#a78bfa', '#f472b6'] }]
          }
        },
        {
          title: 'Revenue by Department',
          badge: 'Current',
          type: 'doughnut',
          data: {
            labels: ['Groceries', 'FMCG', 'Fresh', 'Dairy', 'Personal Care', 'Others'],
            datasets: [{ data: [35, 25, 15, 12, 8, 5], colors: ['#16a34a', '#4da6ff', '#00d2a0', '#ffb347', '#a78bfa', '#f472b6'] }]
          }
        },
        {
          title: 'Goal Progress',
          badge: 'FY Targets',
          type: 'horizontalBar',
          data: {
            labels: ['Revenue', 'Customers', 'NPS Score', 'Market Share', 'Efficiency', 'Expansion'],
            datasets: [{ data: [92, 88, 95, 78, 94, 72], colors: ['#00d2a0', '#4da6ff', '#00d2a0', '#ffb347', '#00d2a0', '#16a34a'] }]
          }
        }
      ],
      table: {
        title: 'Department Scorecards',
        headers: ['Department', 'KPI', 'Target', 'Actual', 'Status'],
        rows: [
          ['Sales', 'Revenue', '₹20 Cr', '₹18.5 Cr', '🟡 92.5%'],
          ['Operations', 'Efficiency', '95%', '94.7%', '🟡 99.7%'],
          ['Logistics', 'On-Time Delivery', '95%', '96.3%', '🟢 101.4%'],
          ['Marketing', 'New Customers', '5,000', '4,520', '🟡 90.4%'],
          ['Support', 'CSAT Score', '4.5/5', '4.6/5', '🟢 102.2%'],
          ['IT', 'Uptime', '99.95%', '99.97%', '🟢 100.0%'],
          ['HR', 'Retention Rate', '90%', '92.1%', '🟢 102.3%'],
          ['Finance', 'Operating Margin', '27%', '28.1%', '🟢 104.1%']
        ]
      },
      team: makeTeam(['CEO', 'COO', 'CFO', 'CTO', 'VP Sales', 'VP Marketing'], 6),
      activities: [
        { icon: '📊', person: 'Vikram Singh', action: 'presented Q2 results to board', time: '2 min ago', color: '#4da6ff' },
        { icon: '🎯', person: 'Ananya Kumar', action: 'updated FY27 strategic roadmap', time: '15 min ago', color: '#00d2a0' },
        { icon: '💰', person: 'Arjun Mehta', action: 'approved ₹2Cr budget for expansion', time: '1 hour ago', color: '#ffb347' },
        { icon: '🤝', person: 'Kavita Shah', action: 'finalized partnership with BigBasket', time: '3 hours ago', color: '#a78bfa' },
        { icon: '👥', person: 'Rohan Joshi', action: 'reviewed senior hiring pipeline', time: '5 hours ago', color: '#16a34a' }
      ]
    }
  };

  // ============================================================
  // Render Functions
  // ============================================================

  function renderSidebar(activeDept) {
    var html = '<div class="sidebar-section" style="padding:16px 20px 8px;font-size:11px;letter-spacing:1.5px;color:var(--text-muted);font-weight:600;">DASHBOARD</div>';

    for (var s = 0; s < SIDEBAR_SECTIONS.length; s++) {
      var section = SIDEBAR_SECTIONS[s];
      html += '<div class="sidebar-section" style="padding:16px 20px 6px;font-size:10px;letter-spacing:1.5px;color:var(--text-muted);font-weight:600;margin-top:4px;">' + section.label + '</div>';
      for (var i = 0; i < section.items.length; i++) {
        var item = section.items[i];
        var active = (item.id === activeDept) ? ' active' : '';
        html += '<a class="sidebar-link' + active + '" onclick="DMart.navigate(\'dashboard\',{dept:\'' + item.id + '\'})" style="display:flex;align-items:center;gap:10px;padding:10px 20px;cursor:pointer;color:var(--text-secondary);text-decoration:none;font-size:13px;transition:all 0.2s;border-left:3px solid transparent;' + (active ? 'color:var(--primary);background:rgba(22, 163, 74, 0.08);border-left-color:var(--primary);font-weight:600;' : '') + '">';
        html += '<span style="font-size:16px;">' + item.icon + '</span> ' + item.name;
        html += '</a>';
      }
    }
    return html;
  }

  function renderKPIs(kpis) {
    var html = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin-bottom:28px;">';
    for (var i = 0; i < kpis.length; i++) {
      var kpi = kpis[i];
      var changeClass = kpi.positive ? 'color:var(--success);' : 'color:var(--error);';
      var arrow = kpi.positive ? '↑' : '↓';
      html += '<div class="kpi-card" style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:22px;transition:all 0.3s;box-shadow:var(--shadow);">';
      html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">';
      html += '<div class="kpi-icon" style="width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;background:' + kpi.color + '15;color:' + kpi.color + ';flex-shrink:0;">' + kpi.icon + '</div>';
      html += '<div class="kpi-label" style="font-size:12px;color:var(--text-muted);font-weight:500;letter-spacing:0.3px;">' + kpi.label + '</div>';
      html += '</div>';
      html += '<div class="kpi-value" style="font-size:26px;font-weight:700;color:var(--text-primary);margin-bottom:6px;letter-spacing:-0.5px;">' + kpi.value + '</div>';
      html += '<div class="kpi-change" style="font-size:12px;font-weight:500;' + changeClass + '">' + arrow + ' ' + kpi.change + ' vs last month</div>';
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  function renderCharts(charts, dept) {
    var html = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:20px;margin-bottom:28px;">';
    for (var i = 0; i < charts.length; i++) {
      var chart = charts[i];
      var canvasId = 'chart-' + dept + '-' + i;
      html += '<div class="chart-card" style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:22px;box-shadow:var(--shadow);">';
      html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">';
      html += '<h3 style="font-size:15px;font-weight:600;color:var(--text-primary);margin:0;">' + chart.title + '</h3>';
      html += '<span class="badge badge-info" style="font-size:10px;padding:4px 10px;border-radius:20px;background:var(--info-bg);color:var(--info);font-weight:500;">' + chart.badge + '</span>';
      html += '</div>';
      html += '<div class="chart-canvas-wrapper" style="width:100%;height:260px;position:relative;">';
      html += '<canvas id="' + canvasId + '" style="width:100%;height:100%;"></canvas>';
      html += '</div>';
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  function renderTable(table) {
    var html = '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:28px;overflow-x:auto;box-shadow:var(--shadow);">';
    html += '<h3 style="font-size:15px;font-weight:600;color:var(--text-primary);margin:0 0 16px 0;">' + table.title + '</h3>';
    html += '<table style="width:100%;border-collapse:collapse;">';
    html += '<thead><tr>';
    for (var h = 0; h < table.headers.length; h++) {
      html += '<th style="text-align:left;padding:10px 14px;font-size:11px;color:var(--text-muted);font-weight:600;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid var(--border);">' + table.headers[h] + '</th>';
    }
    html += '</tr></thead><tbody>';
    for (var r = 0; r < table.rows.length; r++) {
      var row = table.rows[r];
      html += '<tr style="border-bottom:1px solid var(--border-light);transition:background 0.2s;" onmouseover="this.style.background=\'var(--glass)\'" onmouseout="this.style.background=\'transparent\'">';
      for (var c = 0; c < row.length; c++) {
        var cellStyle = 'padding:12px 14px;font-size:13px;color:var(--text-secondary);white-space:nowrap;';
        if (c === 0) cellStyle += 'font-weight:600;color:var(--text-primary);';
        // Color growth/status cells
        var cellVal = row[c];
        if (typeof cellVal === 'string' && cellVal.indexOf('+') === 0) cellStyle += 'color:var(--success);font-weight:500;';
        if (typeof cellVal === 'string' && cellVal.indexOf('-') === 0 && cellVal.indexOf('₹-') !== -1) cellStyle += 'color:var(--error);font-weight:500;';
        html += '<td style="' + cellStyle + '">' + cellVal + '</td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table></div>';
    return html;
  }

  function renderTeam(team) {
    var html = '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:28px;box-shadow:var(--shadow);">';
    html += '<h3 style="font-size:15px;font-weight:600;color:var(--text-primary);margin:0 0 16px 0;">Team Members</h3>';
    html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;">';
    for (var i = 0; i < team.length; i++) {
      var member = team[i];
      var statusColor = member.status === 'online' ? 'var(--success)' : (member.status === 'busy' ? 'var(--warning)' : 'var(--text-muted)');
      var statusLabel = member.status === 'online' ? 'Online' : (member.status === 'busy' ? 'Busy' : 'Offline');
      html += '<div class="team-card" style="display:flex;align-items:center;gap:12px;padding:14px;border-radius:12px;background:var(--bg-card);border:1px solid var(--border);transition:all 0.2s;" onmouseover="this.style.background=\'var(--bg-card-hover)\'" onmouseout="this.style.background=\'var(--bg-card)\'">';
      html += '<div class="team-avatar" style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:white;background:linear-gradient(135deg,' + member.colors[0] + ',' + member.colors[1] + ');flex-shrink:0;">' + member.initials + '</div>';
      html += '<div class="team-info" style="flex:1;min-width:0;">';
      html += '<h4 style="font-size:13px;font-weight:600;color:var(--text-primary);margin:0 0 2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + member.name + '</h4>';
      html += '<p style="font-size:11px;color:var(--text-muted);margin:0;">' + member.role + '</p>';
      html += '</div>';
      html += '<div class="team-status" style="display:flex;align-items:center;gap:5px;font-size:11px;color:' + statusColor + ';font-weight:500;">';
      html += '<span style="width:7px;height:7px;border-radius:50%;background:' + statusColor + ';display:inline-block;"></span> ' + statusLabel;
      html += '</div>';
      html += '</div>';
    }
    html += '</div></div>';
    return html;
  }

  function renderActivities(activities) {
    var html = '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:28px;box-shadow:var(--shadow);">';
    html += '<h3 style="font-size:15px;font-weight:600;color:var(--text-primary);margin:0 0 16px 0;">Recent Activity</h3>';
    for (var i = 0; i < activities.length; i++) {
      var act = activities[i];
      html += '<div class="activity-item" style="display:flex;align-items:flex-start;gap:12px;padding:12px 0;' + (i < activities.length - 1 ? 'border-bottom:1px solid var(--border-light);' : '') + '">';
      html += '<div class="activity-icon" style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;background:' + act.color + '15;color:' + act.color + ';flex-shrink:0;">' + act.icon + '</div>';
      html += '<div class="activity-content" style="flex:1;">';
      html += '<p style="font-size:13px;color:var(--text-secondary);margin:0 0 4px 0;line-height:1.4;"><strong style="color:var(--text-primary);">' + act.person + '</strong> ' + act.action + '</p>';
      html += '<div class="activity-time" style="font-size:11px;color:var(--text-muted);">' + act.time + '</div>';
      html += '</div>';
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  // ============================================================
  // Main Render
  // ============================================================

  function render(params) {
    var user = DMart.state.user || {};
    if (user.role === 'delivery') {
      return renderDeliveryDashboard();
    }
    if (user.role === 'sales') {
      return renderSalesDashboard();
    }

    params = params || {};
    var dept = params.dept || 'sales';
    var config = dashboardConfigs[dept];
    if (!config) {
      dept = 'sales';
      config = dashboardConfigs[dept];
    }

    var html = '';

    // Layout: sidebar + main
    html += '<div style="display:flex;min-height:calc(100vh - 70px); animation: fadeIn 0.4s ease;">';

    // Sidebar
    html += '<div class="sidebar" id="dashboard-sidebar" style="width:260px;min-width:260px;background:var(--bg-surface);border-right:1px solid var(--border);overflow-y:auto;flex-shrink:0;">';
    html += renderSidebar(dept);
    html += '</div>';

    // Main content
    html += '<div class="main-with-sidebar" style="flex:1;padding:28px 32px;overflow-y:auto;min-width:0;">';

    // Header
    html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:16px;">';
    html += '<div>';
    h += ''; // placeholder to avoid syntax errors
    html += '<h1 style="font-size:26px;font-weight:700;color:var(--text-primary);margin:0 0 6px 0;display:flex;align-items:center;gap:10px;">';
    html += '<span style="font-size:28px;">' + config.icon + '</span> ' + config.title;
    html += '</h1>';
    html += '<p style="font-size:13px;color:var(--text-muted);margin:0;">' + config.subtitle + '</p>';
    html += '</div>';
    html += '<div style="display:flex;align-items:center;gap:10px;">';
    html += '<select style="padding:8px 14px;border-radius:10px;background:var(--bg-card);border:1px solid var(--border);color:var(--text-secondary);font-size:12px;cursor:pointer;outline:none;">';
    html += '<option>Last 30 Days</option><option>Last 7 Days</option><option>This Month</option><option>This Quarter</option><option>This Year</option>';
    html += '</select>';
    html += '<button style="padding:8px 16px;border-radius:10px;background:linear-gradient(135deg,var(--primary),var(--primary-dark));border:none;color:white;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;box-shadow:var(--shadow);">Export Report</button>';
    html += '</div>';
    html += '</div>';

    // If support tab is selected, render Ticket Resolver instead of standard table/charts
    if (dept === 'support' && DMart.Tickets) {
      html += DMart.Tickets.render();
    } else {
      // KPI Cards
      html += renderKPIs(config.kpis);

      // Charts
      html += renderCharts(config.charts, dept);

      // Data Table
      html += renderTable(config.table);

      // Team + Activity side by side
      html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:20px;">';
      html += renderTeam(config.team);
      html += renderActivities(config.activities);
      html += '</div>';
    }

    html += '</div>'; // main-with-sidebar
    html += '</div>'; // outer flex

    return html;
  }

  /* ---- Delivery Partner Dashboard ---- */
  function renderDeliveryDashboard() {
    var orders = DMart.state.orders || [];
    var pendingOrders = orders.filter(function(o) { return o.status !== 'delivered'; });
    var completedOrders = orders.filter(function(o) { return o.status === 'delivered'; });

    var h = '';
    h += '<div style="max-width:1000px; margin:0 auto; padding:32px 16px; animation:fadeIn 0.4s ease;">';
    h += '<h1 style="font-family:var(--font-display); font-size:26px; font-weight:800; color:var(--text-primary); margin-bottom:4px;">🚴 Delivery Partner Hub</h1>';
    h += '<p style="font-size:14px; color:var(--text-secondary); margin-bottom:24px;">Manage deliveries, check directions, and update drop-off statuses in Mancherial District.</p>';

    /* Stats Grid */
    h += '<div class="audit-stats-grid" style="margin-bottom:24px; display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">';
    h += '<div class="audit-stat-card" style="background:white; border-radius:10px; border:1px solid var(--border); padding:16px; box-shadow:var(--shadow);"><strong>Pending Runs</strong><div style="font-size:24px; font-weight:800; color:var(--primary); margin-top:8px;">' + pendingOrders.length + ' Orders</div></div>';
    h += '<div class="audit-stat-card" style="background:white; border-radius:10px; border:1px solid var(--border); padding:16px; box-shadow:var(--shadow);"><strong>Delivered Today</strong><div style="font-size:24px; font-weight:800; color:var(--success); margin-top:8px;">' + completedOrders.length + ' Orders</div></div>';
    h += '<div class="audit-stat-card" style="background:white; border-radius:10px; border:1px solid var(--border); padding:16px; box-shadow:var(--shadow);"><strong>Earnings Today</strong><div style="font-size:24px; font-weight:800; color:var(--text-primary); margin-top:8px;">' + fmtCur(completedOrders.length * 40 + 120) + '</div></div>';
    h += '</div>';

    /* Map & Run Sheet */
    h += '<div class="audit-grid" style="display:grid; grid-template-columns:1.8fr 1.2fr; gap:24px;">';
    
    /* Left: Run Sheet list */
    h += '<div class="audit-table-card" style="background:white; border-radius:12px; border:1px solid var(--border); padding:24px; box-shadow:var(--shadow);">';
    h += '<h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:var(--text-primary); margin-bottom:16px;">Assigned Run Sheet</h3>';
    if (orders.length === 0) {
      h += '<div style="padding:32px; text-align:center; color:var(--text-secondary);">No orders have been placed yet. Go to shop and place orders first!</div>';
    } else {
      orders.forEach(function (order) {
        h += '<div style="padding:16px; border:1px solid var(--border); border-radius:12px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; background:#fafbfc;">';
        h += '<div>';
        h += '<div style="font-weight:800; font-size:14px; color:var(--text-primary);">' + order.id + ' · ' + escHtml(order.address.name) + '</div>';
        h += '<div style="font-size:12px; color:var(--text-secondary); margin:4px 0;">📍 ' + escHtml(order.address.line1) + ', ' + escHtml(order.address.city) + ' (Pin: ' + escHtml(order.address.pincode) + ')</div>';
        h += '<div style="font-size:11px; color:var(--text-muted);">Payment: ' + order.payment + ' · Total: ' + fmtCur(order.total) + '</div>';
        h += '</div>';
        
        h += '<div style="display:flex; gap:8px;">';
        if (order.status === 'confirmed') {
          h += '<button class="btn btn-secondary btn-sm" onclick="DMart.Dashboard.updateDeliveryStatus(\'' + order.id + '\', \'out_for_delivery\')" style="background:var(--primary); color:white; border:none; padding:6px 12px; border-radius:6px; font-weight:700; cursor:pointer;">Mark Dispatched</button>';
        } else if (order.status === 'out_for_delivery') {
          h += '<button class="btn btn-success btn-sm" onclick="DMart.Dashboard.updateDeliveryStatus(\'' + order.id + '\', \'delivered\')" style="background:var(--success); color:white; border:none; padding:6px 12px; border-radius:6px; font-weight:700; cursor:pointer;">Mark Delivered</button>';
        } else {
          h += '<span style="background:rgba(65, 212, 48, 0.1); color:#2b931d; font-size:11px; font-weight:700; padding:4px 10px; border-radius:40px;">✅ Completed</span>';
        }
        h += '</div>';
        h += '</div>';
      });
    }
    h += '</div>';

    /* Right: Route Directions Map Mock */
    h += '<div class="audit-table-card" style="background:white; border-radius:12px; border:1px solid var(--border); padding:24px; box-shadow:var(--shadow); text-align:center;">';
    h += '<h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:var(--text-primary); margin-bottom:12px;">Active Route Guidance</h3>';
    h += '<div style="width:100%; height:200px; background:#e4e9f0; border-radius:12px; display:flex; align-items:center; justify-content:center; color:var(--text-secondary); font-size:13px; font-weight:700; flex-direction:column; gap:8px; border:1px solid var(--border);">';
    h += '<span style="font-size:28px;">🗺️</span> <span>Mancherial Hub Route Mapping</span>';
    h += '<small style="color:var(--primary)">Region: MNCL Central, Telangana</small>';
    h += '</div>';
    h += '<div style="text-align:left; margin-top:16px; font-size:12px; line-height:1.6; color:var(--text-secondary);">';
    h += '<strong>Delivery Instructions:</strong>';
    h += '<ul style="margin-left:16px; padding-left:0;">';
    h += '<li>Only deliver within the designated Mancherial district boundary lines.</li>';
    h += '<li>Collect cash/UPI payment on delivery for COD orders.</li>';
    h += '<li>Maintain cold storage lock temperatures under 5°C.</li>';
    h += '</ul>';
    h += '</div>';
    h += '</div>';

    h += '</div>'; /* /audit-grid */
    h += '</div>';
    return h;
  }

  /* ---- Sales Man Dashboard ---- */
  function renderSalesDashboard() {
    var products = DMart.products.slice(0, 40); // Preview first 40 products
    var h = '';
    h += '<div style="max-width:1000px; margin:0 auto; padding:32px 16px; animation:fadeIn 0.4s ease;">';
    h += '<h1 style="font-family:var(--font-display); font-size:26px; font-weight:800; color:var(--text-primary); margin-bottom:4px;">🏷️ Sales Man - Inventory & Price Controls</h1>';
    h += '<p style="font-size:14px; color:var(--text-secondary); margin-bottom:24px;">Manage stock levels, edit listing prices, and apply instant discount coupons for DMart stores.</p>';

    h += '<div class="audit-table-card" style="background:white; border-radius:12px; border:1px solid var(--border); padding:24px; box-shadow:var(--shadow);">';
    h += '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">';
    h += '<h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:var(--text-primary); margin:0;">Item Listings Manager</h3>';
    h += '<input type="text" id="sales-search-field" onkeyup="DMart.Dashboard.filterSalesItems()" placeholder="Filter items..." style="padding:8px 12px; border-radius:8px; border:1px solid var(--border); font-size:13px; outline:none; width:220px; background:#f8fafc; color:var(--text-primary);">';
    h += '</div>';

    h += '<div style="overflow-x:auto; max-height:480px; overflow-y:auto; border:1px solid var(--border); border-radius:8px;">';
    h += '<table class="data-table" style="width:100%; border-collapse:collapse; text-align:left;">';
    h += '<thead style="background:#f8fafc; position:sticky; top:0; z-index:1;">';
    h += '<tr style="font-size:11px; color:var(--text-secondary); text-transform:uppercase;">';
    h += '<th style="padding:12px 16px; border-bottom:1px solid var(--border)">Item Name</th>';
    h += '<th style="padding:12px 16px; border-bottom:1px solid var(--border)">Brand</th>';
    h += '<th style="padding:12px 16px; border-bottom:1px solid var(--border)">Price</th>';
    h += '<th style="padding:12px 16px; border-bottom:1px solid var(--border)">Discount</th>';
    h += '<th style="padding:12px 16px; border-bottom:1px solid var(--border)">Stock Status</th>';
    h += '<th style="padding:12px 16px; border-bottom:1px solid var(--border)">Actions</th>';
    h += '</tr>';
    h += '</thead>';
    h += '<tbody id="sales-items-body">';
    
    products.forEach(function (p) {
      h += renderSalesItemRow(p);
    });

    h += '</tbody>';
    h += '</table>';
    h += '</div>';
    h += '</div>';
    h += '</div>';
    return h;
  }

  function renderSalesItemRow(p) {
    var h = '';
    h += '<tr style="font-size:13px; color:var(--text-primary)" class="sales-item-row" data-name="' + p.name.toLowerCase() + '" data-brand="' + p.brand.toLowerCase() + '">';
    h += '<td style="padding:12px 16px; border-bottom:1px solid var(--border); font-weight:700;">' + p.emoji + ' ' + escHtml(p.name) + '</td>';
    h += '<td style="padding:12px 16px; border-bottom:1px solid var(--border); color:var(--text-secondary)">' + escHtml(p.brand) + '</td>';
    h += '<td style="padding:12px 16px; border-bottom:1px solid var(--border); font-weight:800;">' + fmtCur(p.price) + '</td>';
    h += '<td style="padding:12px 16px; border-bottom:1px solid var(--border); color:var(--secondary); font-weight:800;">' + p.discount + '%</td>';
    h += '<td style="padding:12px 16px; border-bottom:1px solid var(--border);">';
    h += '<span style="background:' + (p.inStock ? 'rgba(65, 212, 48, 0.1); color:#2b931d;' : 'rgba(255, 75, 74, 0.1); color:#FF4B4A;') + ' padding:4px 10px; border-radius:4px; font-size:11px; font-weight:700;">' + (p.inStock ? 'In Stock' : 'Out of Stock') + '</span>';
    h += '</td>';
    h += '<td style="padding:12px 16px; border-bottom:1px solid var(--border);">';
    h += '<div style="display:flex; gap:6px;">';
    h += '<button class="btn btn-secondary btn-sm" onclick="DMart.Dashboard.editItemPrice(\'' + p.id + '\')" style="padding:4px 8px; font-size:11px; font-weight:700; border-radius:6px; cursor:pointer;">Price</button>';
    h += '<button class="btn btn-secondary btn-sm" onclick="DMart.Dashboard.toggleItemStock(\'' + p.id + '\')" style="padding:4px 8px; font-size:11px; font-weight:700; border-radius:6px; cursor:pointer;">Stock</button>';
    h += '</div>';
    h += '</td>';
    h += '</tr>';
    return h;
  }

  // ============================================================
  // Init - Draw Charts
  // ============================================================

  function init(params) {
    var user = DMart.state.user || {};
    if (user.role === 'delivery' || user.role === 'sales') {
      return; // No charts for custom role views
    }

    params = params || {};
    var dept = params.dept || 'sales';
    
    // If support tab is selected, run Ticket resolution initializer instead of Chart.js drawing
    if (dept === 'support' && DMart.Tickets) {
      DMart.Tickets.init();
      return;
    }

    var config = dashboardConfigs[dept];
    if (!config) {
      dept = 'sales';
      config = dashboardConfigs[dept];
    }

    // Small delay to ensure DOM is ready
    setTimeout(function() {
      for (var i = 0; i < config.charts.length; i++) {
        var chart = config.charts[i];
        var canvasId = 'chart-' + dept + '-' + i;
        var type = chart.type;
        var data = chart.data;

        if (DMart.Charts && DMart.Charts[type]) {
          DMart.Charts[type](canvasId, data, {});
        }
      }
    }, 100);

    // Add hover effects for sidebar links
    var sidebarLinks = document.querySelectorAll('.sidebar-link:not(.active)');
    for (var j = 0; j < sidebarLinks.length; j++) {
      sidebarLinks[j].addEventListener('mouseenter', function() {
        this.style.background = 'var(--glass)';
        this.style.color = 'var(--text-primary)';
      });
      sidebarLinks[j].addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
        this.style.color = 'var(--text-secondary)';
      });
    }

    // Add hover effects for KPI cards
    var kpiCards = document.querySelectorAll('.kpi-card');
    for (var k = 0; k < kpiCards.length; k++) {
      kpiCards[k].addEventListener('mouseenter', function() {
        this.style.background = 'var(--bg-card-hover)';
        this.style.transform = 'translateY(-2px)';
        this.style.borderColor = 'var(--border-light)';
        this.style.boxShadow = 'var(--shadow-lg)';
      });
      kpiCards[k].addEventListener('mouseleave', function() {
        this.style.background = 'var(--bg-card)';
        this.style.transform = 'translateY(0)';
        this.style.borderColor = 'var(--border)';
        this.style.boxShadow = 'var(--shadow)';
      });
    }

    // Handle window resize for charts
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        for (var i = 0; i < config.charts.length; i++) {
          var chart = config.charts[i];
          var canvasId = 'chart-' + dept + '-' + i;
          if (DMart.Charts && DMart.Charts[chart.type]) {
            DMart.Charts[chart.type](canvasId, chart.data, {});
          }
        }
      }, 250);
    });
  }

  // ============================================================
  // Delivery & Sales Helpers
  // ============================================================

  DMart.Dashboard = {
    render: render,
    init: init,
    updateDeliveryStatus: function(orderId, nextStatus) {
      var order = DMart.state.orders.find(function(o) { return o.id === orderId; });
      if (order) {
        order.status = nextStatus;
        DMart.saveState();
        DMart.utils.toast('Order ' + orderId + ' status updated to ' + nextStatus.replace(/_/g, ' ') + '!', 'success');
        DMart.navigate('dashboard');
      }
    },
    editItemPrice: function(productId) {
      var p = DMart.getProductById(productId);
      if (!p) return;
      var newPrice = prompt('Enter new price for ' + p.name + ':', p.price);
      if (newPrice !== null && !isNaN(newPrice) && newPrice.trim() !== '') {
        p.price = Math.round(Number(newPrice));
        if (p.originalPrice) {
          p.originalPrice = Math.round(p.price * (100 / (100 - p.discount)));
        }
        // Save back to localstorage if we want changes to persist
        DMart.utils.toast(p.name + ' price updated to ' + fmtCur(p.price) + '!', 'success');
        DMart.navigate('dashboard');
      }
    },
    toggleItemStock: function(productId) {
      var p = DMart.getProductById(productId);
      if (!p) return;
      p.inStock = !p.inStock;
      DMart.utils.toast(p.name + ' is now ' + (p.inStock ? 'In Stock' : 'Out of Stock') + '!', 'success');
      DMart.navigate('dashboard');
    },
    filterSalesItems: function() {
      var query = document.getElementById('sales-search-field').value.toLowerCase().trim();
      var rows = document.querySelectorAll('.sales-item-row');
      rows.forEach(function(row) {
        var name = row.getAttribute('data-name');
        var brand = row.getAttribute('data-brand');
        if (name.indexOf(query) !== -1 || brand.indexOf(query) !== -1) {
          row.style.display = 'table-row';
        } else {
          row.style.display = 'none';
        }
      });
    }
  };

})();
