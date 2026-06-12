// ============================================================
// DMart Delivery - Canvas Charting Library
// Lightweight, zero-dependency chart renderer
// ============================================================

(function() {
  'use strict';

  window.DMart = window.DMart || {};

  var CHART_COLORS = [
    '#16a34a', '#4da6ff', '#00d2a0', '#ffb347', '#a78bfa',
    '#f472b6', '#34d399', '#60a5fa', '#fbbf24', '#c084fc',
    '#fb7185', '#38bdf8', '#22d3ee', '#818cf8', '#f97316'
  ];

  // ---- Helpers ----

  function getColor(colors, index) {
    if (typeof colors === 'string') return colors;
    if (Array.isArray(colors)) return colors[index % colors.length];
    return CHART_COLORS[index % CHART_COLORS.length];
  }

  function setupCanvas(canvasId) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    var ctx = canvas.getContext('2d');
    var parent = canvas.parentElement;
    if (!parent) return null;
    var rect = parent.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);
    return { canvas: canvas, ctx: ctx, w: rect.width, h: rect.height };
  }

  function niceMax(values) {
    if (!values || values.length === 0) return 100;
    var m = Math.max.apply(null, values);
    if (m <= 0) return 100;
    return m * 1.15;
  }

  function formatAxisVal(val) {
    if (typeof DMart.utils !== 'undefined' && DMart.utils.formatNumber) {
      return DMart.utils.formatNumber(Math.round(val));
    }
    if (val >= 10000000) return (val / 10000000).toFixed(1) + 'Cr';
    if (val >= 100000) return (val / 100000).toFixed(1) + 'L';
    if (val >= 1000) return (val / 1000).toFixed(1) + 'K';
    return Math.round(val).toString();
  }

  function hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  function defaultPad(options) {
    return options.padding || { top: 30, right: 25, bottom: 45, left: 60 };
  }

  function drawGridLines(ctx, pad, chartW, chartH, w, maxVal, gridCount) {
    gridCount = gridCount || 5;
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1;
    for (var i = 0; i <= gridCount; i++) {
      var y = pad.top + (chartH / gridCount) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();

      var val = maxVal - (maxVal / gridCount) * i;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.font = '11px Inter, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(formatAxisVal(val), pad.left - 10, y);
    }
  }

  function drawTitle(ctx, title, w) {
    if (!title) return;
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.font = 'bold 13px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(title, w / 2, 6);
  }

  function drawLegend(ctx, datasets, w, h) {
    if (!datasets || datasets.length <= 1) return;
    ctx.font = '11px Inter, system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    var totalWidth = 0;
    var items = [];
    for (var i = 0; i < datasets.length; i++) {
      var label = datasets[i].label || 'Dataset ' + (i + 1);
      var color = datasets[i].color || CHART_COLORS[i % CHART_COLORS.length];
      var tw = ctx.measureText(label).width + 24;
      items.push({ label: label, color: color, width: tw });
      totalWidth += tw;
    }
    var startX = (w - totalWidth) / 2;
    var ly = h - 8;
    for (var j = 0; j < items.length; j++) {
      ctx.fillStyle = items[j].color;
      ctx.fillRect(startX, ly - 5, 10, 10);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.textAlign = 'left';
      ctx.fillText(items[j].label, startX + 14, ly);
      startX += items[j].width;
    }
  }

  // ---- Bar Chart ----

  function drawBar(canvasId, data, options) {
    options = options || {};
    if (!data || !data.labels || data.labels.length === 0) return;
    if (!data.datasets || data.datasets.length === 0) return;

    var setup = setupCanvas(canvasId);
    if (!setup) return;
    var ctx = setup.ctx, w = setup.w, h = setup.h;

    var pad = defaultPad(options);
    if (data.datasets.length > 1) pad.bottom = 55;
    var chartW = w - pad.left - pad.right;
    var chartH = h - pad.top - pad.bottom;

    var labels = data.labels;
    var numDatasets = data.datasets.length;

    // Find max across all datasets
    var allVals = [];
    for (var d = 0; d < numDatasets; d++) {
      for (var v = 0; v < data.datasets[d].data.length; v++) {
        allVals.push(data.datasets[d].data[v]);
      }
    }
    var maxVal = niceMax(allVals);

    drawTitle(ctx, options.title, w);
    drawGridLines(ctx, pad, chartW, chartH, w, maxVal);

    var groupWidth = chartW / labels.length;
    var barWidth = (groupWidth * 0.7) / numDatasets;
    var groupGap = groupWidth * 0.3;

    for (var di = 0; di < numDatasets; di++) {
      var ds = data.datasets[di];
      var dsColor = ds.color || CHART_COLORS[di % CHART_COLORS.length];
      var dsColors = ds.colors;

      for (var i = 0; i < labels.length; i++) {
        var val = ds.data[i] || 0;
        var barH = (val / maxVal) * chartH;
        var x = pad.left + groupWidth * i + groupGap / 2 + barWidth * di;
        var y = pad.top + chartH - barH;
        var color = dsColors ? getColor(dsColors, i) : dsColor;
        var radius = Math.min(barWidth / 2, 6);

        if (barH < 2) continue;

        ctx.beginPath();
        ctx.moveTo(x, pad.top + chartH);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.lineTo(x + barWidth - radius, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
        ctx.lineTo(x + barWidth, pad.top + chartH);
        ctx.closePath();

        var grad = ctx.createLinearGradient(x, y, x, pad.top + chartH);
        grad.addColorStop(0, color);
        grad.addColorStop(1, hexToRgba(color, 0.25));
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    // X-axis labels
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.font = '11px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (var k = 0; k < labels.length; k++) {
      var lbl = labels[k];
      var lx = pad.left + groupWidth * k + groupWidth / 2;
      if (lbl.length > 10) lbl = lbl.substring(0, 9) + '..';
      ctx.fillText(lbl, lx, pad.top + chartH + 8);
    }

    drawLegend(ctx, data.datasets, w, h);
  }

  // ---- Line Chart ----

  function drawLine(canvasId, data, options) {
    options = options || {};
    if (!data || !data.labels || data.labels.length === 0) return;
    if (!data.datasets || data.datasets.length === 0) return;

    var setup = setupCanvas(canvasId);
    if (!setup) return;
    var ctx = setup.ctx, w = setup.w, h = setup.h;

    var pad = defaultPad(options);
    if (data.datasets.length > 1) pad.bottom = 55;
    var chartW = w - pad.left - pad.right;
    var chartH = h - pad.top - pad.bottom;

    var labels = data.labels;

    // Find max across all datasets
    var allVals = [];
    for (var d = 0; d < data.datasets.length; d++) {
      for (var v = 0; v < data.datasets[d].data.length; v++) {
        allVals.push(data.datasets[d].data[v]);
      }
    }
    var maxVal = niceMax(allVals);

    drawTitle(ctx, options.title, w);
    drawGridLines(ctx, pad, chartW, chartH, w, maxVal);

    // X-axis labels
    var stepX = chartW / Math.max(labels.length - 1, 1);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.font = '11px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    var labelSkip = labels.length > 12 ? Math.ceil(labels.length / 12) : 1;
    for (var li = 0; li < labels.length; li++) {
      if (li % labelSkip !== 0 && li !== labels.length - 1) continue;
      var lbl = labels[li];
      if (lbl.length > 8) lbl = lbl.substring(0, 7) + '..';
      ctx.fillText(lbl, pad.left + stepX * li, pad.top + chartH + 8);
    }

    // Draw each dataset
    for (var di = 0; di < data.datasets.length; di++) {
      var ds = data.datasets[di];
      var color = ds.color || CHART_COLORS[di % CHART_COLORS.length];
      var values = ds.data;
      var points = [];

      for (var i = 0; i < values.length; i++) {
        var px = pad.left + stepX * i;
        var py = pad.top + chartH - (values[i] / maxVal) * chartH;
        points.push({ x: px, y: py });
      }

      if (points.length === 0) continue;

      // Draw line with bezier curves
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      if (points.length === 1) {
        ctx.lineTo(points[0].x, points[0].y);
      } else {
        for (var j = 0; j < points.length - 1; j++) {
          var cp1x = points[j].x + (points[j + 1].x - points[j].x) / 3;
          var cp1y = points[j].y;
          var cp2x = points[j + 1].x - (points[j + 1].x - points[j].x) / 3;
          var cp2y = points[j + 1].y;
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, points[j + 1].x, points[j + 1].y);
        }
      }
      ctx.stroke();

      // Optional fill
      if (options.fill) {
        ctx.lineTo(points[points.length - 1].x, pad.top + chartH);
        ctx.lineTo(points[0].x, pad.top + chartH);
        ctx.closePath();
        var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
        grad.addColorStop(0, hexToRgba(color, 0.3));
        grad.addColorStop(1, hexToRgba(color, 0.02));
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw dots
      for (var k = 0; k < points.length; k++) {
        ctx.beginPath();
        ctx.arc(points[k].x, points[k].y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(points[k].x, points[k].y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
    }

    drawLegend(ctx, data.datasets, w, h);
  }

  // ---- Doughnut Chart ----

  function drawDoughnut(canvasId, data, options) {
    options = options || {};
    if (!data || !data.labels || data.labels.length === 0) return;
    if (!data.datasets || data.datasets.length === 0) return;

    var setup = setupCanvas(canvasId);
    if (!setup) return;
    var ctx = setup.ctx, w = setup.w, h = setup.h;

    var values = data.datasets[0].data;
    var colors = data.datasets[0].colors || CHART_COLORS;
    var labels = data.labels;

    var total = 0;
    for (var t = 0; t < values.length; t++) total += values[t];
    if (total === 0) return;

    drawTitle(ctx, options.title, w);

    var centerX = w / 2;
    var centerY = h / 2 - 5;
    var radius = Math.min(w, h) / 2 - 45;
    var holeRadius = radius * 0.6;
    var startAngle = -Math.PI / 2;

    for (var i = 0; i < values.length; i++) {
      var sliceAngle = (values[i] / total) * Math.PI * 2;
      var endAngle = startAngle + sliceAngle;
      var color = getColor(colors, i);

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.arc(centerX, centerY, holeRadius, endAngle, startAngle, true);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();

      // Subtle separator
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      startAngle = endAngle;
    }

    // Center text
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.font = 'bold 18px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(formatAxisVal(total), centerX, centerY - 2);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.font = '11px Inter, system-ui, sans-serif';
    ctx.fillText('Total', centerX, centerY + 16);

    // Legend below
    var legendY = h - 30;
    var legendItems = [];
    var totalLegendW = 0;
    ctx.font = '10px Inter, system-ui, sans-serif';
    for (var j = 0; j < labels.length && j < 6; j++) {
      var lbl = labels[j].length > 12 ? labels[j].substring(0, 11) + '..' : labels[j];
      var tw = ctx.measureText(lbl).width + 20;
      legendItems.push({ label: lbl, color: getColor(colors, j), width: tw });
      totalLegendW += tw;
    }

    var lx = (w - totalLegendW) / 2;
    for (var l = 0; l < legendItems.length; l++) {
      ctx.fillStyle = legendItems[l].color;
      ctx.fillRect(lx, legendY - 4, 8, 8);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(legendItems[l].label, lx + 12, legendY);
      lx += legendItems[l].width;
    }
  }

  // ---- Horizontal Bar Chart ----

  function drawHorizontalBar(canvasId, data, options) {
    options = options || {};
    if (!data || !data.labels || data.labels.length === 0) return;
    if (!data.datasets || data.datasets.length === 0) return;

    var setup = setupCanvas(canvasId);
    if (!setup) return;
    var ctx = setup.ctx, w = setup.w, h = setup.h;

    var pad = options.padding || { top: 30, right: 50, bottom: 20, left: 100 };
    var chartW = w - pad.left - pad.right;
    var chartH = h - pad.top - pad.bottom;

    var labels = data.labels;
    var values = data.datasets[0].data;
    var colors = data.datasets[0].colors || data.datasets[0].color || CHART_COLORS;
    var maxVal = niceMax(values);

    drawTitle(ctx, options.title, w);

    // Vertical grid lines
    var gridCount = 4;
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1;
    for (var g = 0; g <= gridCount; g++) {
      var gx = pad.left + (chartW / gridCount) * g;
      ctx.beginPath();
      ctx.moveTo(gx, pad.top);
      ctx.lineTo(gx, pad.top + chartH);
      ctx.stroke();

      // Bottom axis label
      var gVal = (maxVal / gridCount) * g;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.font = '10px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(formatAxisVal(gVal), gx, pad.top + chartH + 5);
    }

    var barHeight = (chartH / labels.length) * 0.65;
    var gap = (chartH / labels.length) * 0.35;

    for (var i = 0; i < labels.length; i++) {
      var barW = (values[i] / maxVal) * chartW;
      var x = pad.left;
      var y = pad.top + (chartH / labels.length) * i + gap / 2;
      var color = getColor(colors, i);
      var radius = Math.min(barHeight / 2, 5);

      if (barW < 2) barW = 2;

      // Draw rounded horizontal bar
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + barW - radius, y);
      ctx.quadraticCurveTo(x + barW, y, x + barW, y + radius);
      ctx.lineTo(x + barW, y + barHeight - radius);
      ctx.quadraticCurveTo(x + barW, y + barHeight, x + barW - radius, y + barHeight);
      ctx.lineTo(x, y + barHeight);
      ctx.closePath();

      var grad = ctx.createLinearGradient(x, y, x + barW, y);
      grad.addColorStop(0, hexToRgba(color, 0.4));
      grad.addColorStop(1, color);
      ctx.fillStyle = grad;
      ctx.fill();

      // Value at end
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.font = '11px Inter, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(formatAxisVal(values[i]), x + barW + 8, y + barHeight / 2);

      // Y-axis label
      var lbl = labels[i].length > 12 ? labels[i].substring(0, 11) + '..' : labels[i];
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.font = '11px Inter, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(lbl, pad.left - 8, y + barHeight / 2);
    }
  }

  // ---- Area Chart ----

  function drawArea(canvasId, data, options) {
    options = options || {};
    // Area is just a line chart with fill enabled
    var areaOpts = {};
    for (var k in options) {
      if (options.hasOwnProperty(k)) areaOpts[k] = options[k];
    }
    areaOpts.fill = true;
    drawLine(canvasId, data, areaOpts);
  }

  // ---- Public API ----

  DMart.Charts = {
    bar: drawBar,
    line: drawLine,
    doughnut: drawDoughnut,
    horizontalBar: drawHorizontalBar,
    area: drawArea
  };

})();
