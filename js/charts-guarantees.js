/* =========================================================
   SDWH – Innovation in government loan guarantees
   Plotly chart initialisation  |  July 2026  (v3)
   ========================================================= */

(function () {
  'use strict';

  /* ── Palette ─────────────────────────────────────────── */
  var C = {
    blue:   '#12436D',
    teal:   '#28A197',
    pink:   '#801650',
    lblue:  '#1d70b8',
    orange: '#f47738',
    grey:   '#b1b4b6',
    lgrey:  '#f3f2f1',
    text:   '#0b0c0c'
  };

  var FONT = { family: 'Inter, Arial, sans-serif', size: 12, color: C.text };
  var BASE_LAYOUT = {
    paper_bgcolor: 'transparent',
    plot_bgcolor:  'transparent',
    font: FONT,
    margin: { t: 20, r: 20, b: 50, l: 60 },
    legend: { orientation: 'h', yanchor: 'bottom', y: -0.28, xanchor: 'left', x: 0, font: { size: 11 } }
  };
  var CONFIG = { responsive: true, displayModeBar: false };

  function cleanPlaceholder(id) {
    var el = document.getElementById(id);
    if (!el) return null;
    el.classList.remove('chart-placeholder');
    el.innerHTML = '';
    el.style.minHeight = '';
    return el;
  }

  /* ── Filter button helper ────────────────────────────── */
  function insertFilterBtns(containerEl, labels, callback) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;';
    labels.forEach(function (lbl, i) {
      var btn = document.createElement('button');
      btn.textContent = lbl.text;
      btn.dataset.key = lbl.key;
      btn.style.cssText = 'padding:5px 13px;font-size:12px;font-family:Inter,Arial,sans-serif;' +
        'cursor:pointer;border:1px solid #b1b4b6;border-radius:3px;transition:background 0.1s;' +
        'background:' + (i === 0 ? C.blue : '#fff') + ';' +
        'color:' + (i === 0 ? '#fff' : C.text) + ';';
      btn.addEventListener('click', function () {
        wrap.querySelectorAll('button').forEach(function (b) {
          b.style.background = '#fff'; b.style.color = C.text;
        });
        btn.style.background = C.blue; btn.style.color = '#fff';
        callback(lbl.key);
      });
      wrap.appendChild(btn);
    });
    containerEl.parentNode.insertBefore(wrap, containerEl);
  }

  /* ── Fig 3: GGS sectors horizontal bar ──────────────── */
  function fig3() {
    var el = cleanPlaceholder('chart-fig3');
    if (!el) return;

    var PRIORITY = ['Advanced Manufacturing', 'Digital & Technologies', 'Life Sciences & Health',
      'Professional & Business Svcs', 'Financial Services', 'Creative Industries',
      'Clean Energy Industries', 'Defence'];

    var allRows = [
      { s: 'Advanced Manufacturing',       v: 522.75 },
      { s: 'Built Environment',            v: 543.74 },
      { s: 'Other / Non-priority',         v: 902.04 },
      { s: 'Food & Agriculture',           v: 272.09 },
      { s: 'Professional & Business Svcs', v: 274.25 },
      { s: 'Financial Services',           v: 130.82 },
      { s: 'Transport & Logistics',        v: 150.43 },
      { s: 'Digital & Technologies',       v: 154.09 },
      { s: 'Life Sciences & Health',       v: 120.62 },
      { s: 'Creative Industries',          v:  88.60 },
      { s: 'Clean Energy Industries',      v:  58.09 },
      { s: 'Education & Skills',           v:  33.54 },
      { s: 'Defence',                      v:   1.78 }
    ].map(function (r) {
      r.p = PRIORITY.indexOf(r.s) >= 0;
      return r;
    });

    function render(filter) {
      var rows = allRows.filter(function (r) {
        if (filter === 'pri') return r.p;
        if (filter === 'non') return !r.p;
        return true;
      });
      rows.sort(function (a, b) { return b.v - a.v; }); /* largest → bottom */
      var h = Math.max(300, rows.length * 34 + 80);
      Plotly.react(el, [{
        type: 'bar', orientation: 'h',
        y: rows.map(function (r) { return r.s; }),
        x: rows.map(function (r) { return r.v; }),
        marker: { color: rows.map(function (r) { return r.p ? C.blue : C.grey; }) },
        text: rows.map(function (r) { return '£' + r.v.toFixed(0) + 'm'; }),
        textposition: 'outside',
        hovertemplate: '<b>%{y}</b><br>Drawn: £%{x:.1f}m<extra></extra>'
      }], Object.assign({}, BASE_LAYOUT, {
        xaxis: { title: 'GGS drawn facilities (£m)', tickprefix: '£', range: [0, 1150] },
        yaxis: { automargin: true, tickfont: { size: 10 } },
        margin: { t: 20, r: 80, b: 50, l: 205 },
        showlegend: false,
        height: h
      }), CONFIG);
    }

    insertFilterBtns(el, [
      { text: 'All sectors',         key: 'all' },
      { text: 'Priority sectors',    key: 'pri' },
      { text: 'Non-priority',        key: 'non' }
    ], render);
    render('all');
  }

  /* ── Fig 4: GEF sectors horizontal bar ──────────────── */
  function fig4() {
    var el = cleanPlaceholder('chart-fig4');
    if (!el) return;

    var PRIORITY = ['Advanced Manufacturing', 'Digital & Technologies', 'Life Sciences & Health',
      'Professional & Business Svcs', 'Financial Services', 'Creative Industries',
      'Clean Energy', 'Defence'];

    var allRows = [
      { s: 'Advanced Manufacturing',       v: 213.51 },
      { s: 'Other / Non-priority',         v: 166.04 },
      { s: 'Creative Industries',          v:  89.91 },
      { s: 'Digital & Technologies',       v:  82.21 },
      { s: 'Professional & Business Svcs', v:  73.29 },
      { s: 'Food & Agriculture',           v:  57.96 },
      { s: 'Clean Energy',                 v:  36.00 },
      { s: 'Built Environment',            v:  17.77 },
      { s: 'Defence',                      v:  11.00 },
      { s: 'Life Sciences & Health',       v:  10.25 },
      { s: 'Transport & Logistics',        v:   9.56 },
      { s: 'Education & Skills',           v:   3.87 }
    ].map(function (r) {
      r.p = PRIORITY.indexOf(r.s) >= 0;
      return r;
    });

    function render(filter) {
      var rows = allRows.filter(function (r) {
        if (filter === 'pri') return r.p;
        if (filter === 'non') return !r.p;
        return true;
      });
      rows.sort(function (a, b) { return b.v - a.v; });
      var h = Math.max(280, rows.length * 34 + 80);
      Plotly.react(el, [{
        type: 'bar', orientation: 'h',
        y: rows.map(function (r) { return r.s; }),
        x: rows.map(function (r) { return r.v; }),
        marker: { color: rows.map(function (r) { return r.p ? C.blue : C.grey; }) },
        text: rows.map(function (r) { return '£' + r.v.toFixed(0) + 'm'; }),
        textposition: 'outside',
        hovertemplate: '<b>%{y}</b><br>Max liability: £%{x:.1f}m<extra></extra>'
      }], Object.assign({}, BASE_LAYOUT, {
        xaxis: { title: 'GEF max liability (£m)', tickprefix: '£', range: [0, 280] },
        yaxis: { automargin: true, tickfont: { size: 10 } },
        margin: { t: 20, r: 70, b: 50, l: 205 },
        showlegend: false,
        height: h
      }), CONFIG);
    }

    insertFilterBtns(el, [
      { text: 'All sectors',         key: 'all' },
      { text: 'Priority sectors',    key: 'pri' },
      { text: 'Non-priority',        key: 'non' }
    ], render);
    render('all');
  }

  /* ── Fig 7: GGS annual flow and settled rate ─────────── */
  function fig7() {
    var el = cleanPlaceholder('chart-fig7');
    if (!el) return;

    var periods = ['Sep 2025', 'Mar 2026'];
    var flow    = [1.12, 1.29];      /* £bn new lending */
    var pct     = [3.290, 4.007];    /* settled / new lending % */

    var data = [
      {
        type: 'bar',
        name: 'Annual guaranteed lending (£bn)',
        x: periods, y: flow,
        marker: { color: C.blue, opacity: 0.85 },
        yaxis: 'y',
        hovertemplate: '<b>%{x}</b><br>New lending: £%{y:.2f}bn<extra></extra>'
      },
      {
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Settled / new lending %',
        x: periods, y: pct,
        marker: { color: C.orange, size: 10, symbol: 'circle' },
        line: { color: C.orange, width: 2.5 },
        yaxis: 'y2',
        hovertemplate: '<b>%{x}</b><br>Flow rate: %{y:.1f}%<extra></extra>'
      }
    ];

    var layout = Object.assign({}, BASE_LAYOUT, {
      yaxis: {
        title: 'Annual guaranteed lending (£bn)',
        side: 'left',
        range: [0, 4],
        dtick: 1,
        tickprefix: '£',
        ticksuffix: 'bn'
      },
      yaxis2: {
        title: 'Settled amount / new lending %',
        overlaying: 'y',
        side: 'right',
        showgrid: false,
        ticksuffix: '%',
        tickformat: '.1f',
        range: [0, 6],
        dtick: 1
      },
      margin: { t: 20, r: 90, b: 70, l: 120 },
      height: 340
    });
    Plotly.newPlot(el, data, layout, CONFIG);
  }

  /* ── Fig 9: UKEF new business (stacked area) + claims % */
  function fig9() {
    var el = cleanPlaceholder('chart-fig9');
    if (!el) return;

    var years  = ['2020/21', '2021/22', '2022/23', '2023/24', '2024/25'];
    var nonGEF = [12.298, 7.236, 6.129, 8.255, 13.761]; /* £bn */
    var gef    = [0.004,  0.178, 0.325, 0.576,  0.771]; /* £bn */
    var claims = [0.87,   1.39,  1.89,  0.55,   0.17];  /* % */

    var data = [
      {
        type: 'scatter', mode: 'lines',
        name: 'New UKEF business excl. GEF (£bn)',
        x: years, y: nonGEF,
        stackgroup: 'ukef',
        fillcolor: 'rgba(18,67,109,0.65)',
        line: { color: '#12436D', width: 1.5 },
        yaxis: 'y',
        hovertemplate: '<b>%{x}</b><br>UKEF excl. GEF: £%{y:.3f}bn<extra></extra>'
      },
      {
        type: 'scatter', mode: 'lines',
        name: 'New GEF business (£bn)',
        x: years, y: gef,
        stackgroup: 'ukef',
        fillcolor: 'rgba(40,161,151,0.85)',
        line: { color: '#28A197', width: 1.5 },
        yaxis: 'y',
        hovertemplate: '<b>%{x}</b><br>New GEF: £%{y:.3f}bn<extra></extra>'
      },
      {
        type: 'scatter', mode: 'lines+markers',
        name: 'Claims paid / new business (%)',
        x: years, y: claims,
        marker: { color: C.orange, size: 7 },
        line: { color: C.orange, width: 2 },
        yaxis: 'y2',
        hovertemplate: '<b>%{x}</b><br>Claims ratio: %{y:.1f}%<extra></extra>'
      }
    ];

    var layout = Object.assign({}, BASE_LAYOUT, {
      yaxis: {
        title: 'New UKEF business (£bn)',
        side: 'left',
        range: [0, 16],
        tickprefix: '£',
        ticksuffix: 'bn'
      },
      yaxis2: {
        title: 'Claims paid / new business (%)',
        overlaying: 'y', side: 'right',
        ticksuffix: '%',
        tickformat: '.1f',
        showgrid: false,
        range: [0, 3]
      },
      margin: { t: 20, r: 90, b: 60, l: 80 },
      height: 360
    });
    Plotly.newPlot(el, data, layout, CONFIG);
  }

  /* ── Fig 11: SBA 7(a) 35-year series ─────────────────── */
  function fig11() {
    var el = cleanPlaceholder('chart-fig11');
    if (!el) return;

    /* [approval_fy, gross_approved ($bn), chargeoff_rate (%)] */
    var raw = [
      [1991,4.33,0.903],[1992,5.88,0.566],[1993,6.69,0.403],[1994,8.14,0.371],
      [1995,8.25,0.429],[1996,7.69,0.658],[1997,9.46,0.946],[1998,9.02,1.645],
      [1999,10.15,2.430],[2000,10.52,3.064],[2001,9.89,3.413],[2002,12.21,3.298],
      [2003,11.27,3.736],[2004,13.57,4.895],[2005,15.22,8.109],[2006,14.53,12.563],
      [2007,14.29,15.455],[2008,12.67,12.192],[2009,9.19,5.265],[2010,12.41,2.843],
      [2011,19.64,2.151],[2012,15.15,2.195],[2013,17.87,2.025],[2014,19.19,2.279],
      [2015,23.58,2.428],[2016,24.13,2.439],[2017,25.45,2.548],[2018,25.37,2.328],
      [2019,23.18,1.788],[2020,22.55,0.846],[2021,36.54,0.522],[2022,25.69,0.718],
      [2023,27.52,0.522],[2024,31.12,0.106],[2025,37.29,0.003]
    ];

    var years  = raw.map(function (r) { return r[0]; });
    var lent   = raw.map(function (r) { return r[1]; });
    var charge = raw.map(function (r) { return r[2]; });

    var data = [
      {
        type: 'bar',
        name: 'Gross amount approved ($bn)',
        x: years, y: lent,
        marker: { color: C.blue, opacity: 0.85 },
        yaxis: 'y',
        hovertemplate: '<b>FY%{x}</b><br>Approved: $%{y:.1f}bn<extra></extra>'
      },
      {
        type: 'scatter', mode: 'lines',
        name: 'Charge-off ratio (%)',
        x: years, y: charge,
        line: { color: C.orange, width: 2.5 },
        yaxis: 'y2',
        hovertemplate: '<b>FY%{x}</b><br>Charge-off: %{y:.1f}%<extra></extra>'
      }
    ];

    var layout = Object.assign({}, BASE_LAYOUT, {
      xaxis:  { title: 'SBA fiscal year', dtick: 5 },
      yaxis:  {
        title: 'Gross amount approved ($bn)',
        side: 'left', showgrid: true,
        tickprefix: '$',
        ticksuffix: 'bn',
        range: [0, 40], dtick: 5
      },
      yaxis2: {
        title: 'Charge-off ratio (%)',
        overlaying: 'y', side: 'right',
        showgrid: false,
        ticksuffix: '%',
        tickformat: '.1f'
      },
      margin: { t: 20, r: 80, b: 60, l: 80 },
      height: 380,
      annotations: [{
        x: 2007, y: 15.455, xref: 'x', yref: 'y2',
        text: 'GFC peak 15.5%', showarrow: true, arrowhead: 2,
        ax: 40, ay: -30, font: { size: 10, color: C.orange }
      }]
    });
    Plotly.newPlot(el, data, layout, CONFIG);
  }

  /* ── Fig 16: SBA secondary market ────────────────────── */
  function fig16() {
    var el = cleanPlaceholder('chart-fig16');
    if (!el) return;

    var years = ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'];
    var vol   = [10.82, 12.47, 9.25, 10.73, 12.46];       /* $bn */
    var avg   = [826230, 746340, 585150, 462760, 476360];   /* $ */

    var data = [
      {
        type: 'bar',
        name: 'Secondary market value ($bn)',
        x: years, y: vol,
        marker: { color: C.blue, opacity: 0.85 },
        yaxis: 'y',
        hovertemplate: '<b>%{x}</b><br>Volume: $%{y:.2f}bn<extra></extra>'
      },
      {
        type: 'scatter', mode: 'lines+markers',
        name: 'Avg guaranteed portion sold ($)',
        x: years, y: avg,
        marker: { color: C.orange, size: 8 },
        line: { color: C.orange, width: 2.5 },
        yaxis: 'y2',
        hovertemplate: '<b>%{x}</b><br>Avg portion: $%{y:,.0f}<extra></extra>'
      }
    ];

    var layout = Object.assign({}, BASE_LAYOUT, {
      yaxis: {
        title: 'Secondary market value ($bn)',
        side: 'left',
        tickprefix: '$',
        ticksuffix: 'bn',
        range: [0, 15]
      },
      yaxis2: {
        title: 'Average value of individual guarantee sold ($)',
        overlaying: 'y', side: 'right',
        showgrid: false,
        range: [400000, 950000],
        tickformat: '$,.0f'
      },
      margin: { t: 20, r: 120, b: 60, l: 80 },
      height: 360
    });
    Plotly.newPlot(el, data, layout, CONFIG);
  }

  /* ── Fig 17: UK securitisation – horizontal bars ─────── */
  function fig17() {
    var el = cleanPlaceholder('chart-fig17');
    if (!el) return;

    /* sorted descending → largest at bottom of chart */
    var rows = [
      { s: 'RMBS',                      v: 0.43 },
      { s: 'UK managed CLOs',           v: 0.38 },
      { s: 'Auto loans',                v: 0.05 },
      { s: 'Credit card receivables',   v: 0.05 },
      { s: 'Esoterics',                 v: 0.04 },
      { s: 'CMBS',                      v: 0.03 },
      { s: 'Consumer loans',            v: 0.01 }
    ].sort(function (a, b) { return b.v - a.v; });

    var data = [{
      type: 'bar', orientation: 'h',
      y: rows.map(function (r) { return r.s; }),
      x: rows.map(function (r) { return r.v; }),
      marker: { color: C.blue },
      text: rows.map(function (r) { return (r.v * 100).toFixed(1) + '%'; }),
      textposition: 'outside',
      hovertemplate: '<b>%{y}</b><br>Share: %{x:.1%}<extra></extra>'
    }];

    var layout = Object.assign({}, BASE_LAYOUT, {
      xaxis: { title: '% of UK £347bn securitisation market', tickformat: '.1%', range: [0, 0.55] },
      yaxis: { automargin: true, tickfont: { size: 11 } },
      margin: { t: 20, r: 60, b: 50, l: 220 },
      showlegend: false,
      height: 300
    });
    Plotly.newPlot(el, data, layout, CONFIG);
  }

  /* ── Fig 18: SBOLT programme (8 deals) ───────────────── */
  function fig18() {
    var el = cleanPlaceholder('chart-fig18');
    if (!el) return;

    var periods = ['Apr-19', 'Jul-19', 'Nov-19', 'Sep-21', 'Apr-23', 'Feb-24', 'Jan-25', 'Mar-26'];
    var sizes   = [187, 234.2, 250, 223.4, 232.5, 225.3, 384.7, 353];
    var loans   = [2618, 3030, 2973, 4040, 3955, 3552, 5244, 3558];

    var data = [
      {
        type: 'bar',
        name: 'Issue size (£m)',
        x: periods, y: sizes,
        marker: { color: C.blue, opacity: 0.85 },
        yaxis: 'y',
        hovertemplate: '<b>%{x}</b><br>Deal size: £%{y}m<extra></extra>'
      },
      {
        type: 'scatter', mode: 'lines+markers',
        name: 'Number of loans',
        x: periods, y: loans,
        marker: { color: C.orange, size: 8 },
        line: { color: C.orange, width: 2.5 },
        yaxis: 'y2',
        hovertemplate: '<b>%{x}</b><br>Loans in pool: %{y:,.0f}<extra></extra>'
      }
    ];

    var layout = Object.assign({}, BASE_LAYOUT, {
      yaxis:  {
        title: 'Issue size (£m)',
        side: 'left',
        tickprefix: '£',
        ticksuffix: 'm',
        range: [0, 450]
      },
      yaxis2: { title: 'Number of loans', overlaying: 'y', side: 'right', showgrid: false, range: [0, 6500] },
      margin: { t: 20, r: 80, b: 60, l: 80 },
      height: 360
    });
    Plotly.newPlot(el, data, layout, CONFIG);
  }

  /* ── Fig 20: Funding Circle – min/max range + avg/median */
  function fig20() {
    var el = cleanPlaceholder('chart-fig20');
    if (!el) return;

    var yrs  = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
    var maxV = [3.5,   8.0,  10.5,  11.5,  12.0];
    var minV = [0.0,   2.0,   3.5,   4.8,   6.8];
    var avgV = [0.744, 4.064, 6.304, 7.705, 8.800];
    var medV = [0.500, 4.000, 6.000, 7.150, 8.000];

    /* floating bar height = max – min, base at min */
    var boxH = maxV.map(function (m, i) { return m - minV[i]; });

    var data = [
      /* Grey box: min to max */
      {
        type: 'bar',
        x: yrs,
        y: boxH,
        base: minV,
        name: 'Min-Max range',
        marker: { color: 'rgba(177,180,182,0.45)', line: { color: '#888', width: 1.5 } },
        width: 0.48,
        customdata: maxV,
        hovertemplate: '<b>%{x}</b><br>Range: %{base:.1f}% - %{customdata:.1f}%<extra></extra>'
      },
      /* Average - horizontal tick mark */
      {
        type: 'scatter', x: yrs, y: avgV,
        mode: 'markers',
        name: 'Average',
        marker: {
          symbol: 'line-ew',
          size: 20,
          color: C.blue,
          line: { color: C.blue, width: 3 }
        },
        hovertemplate: '<b>%{x}</b><br>Average: %{y:.1f}%<extra></extra>'
      },
      /* Median - shorter horizontal tick mark */
      {
        type: 'scatter', x: yrs, y: medV,
        mode: 'markers',
        name: 'Median',
        marker: {
          symbol: 'line-ew',
          size: 14,
          color: C.teal,
          line: { color: C.teal, width: 3 }
        },
        hovertemplate: '<b>%{x}</b><br>Median: %{y:.1f}%<extra></extra>'
      }
    ];

    var layout = Object.assign({}, BASE_LAYOUT, {
      xaxis: { title: 'Year from origination' },
      yaxis: {
        title: 'Cumulative default rate (%)',
        ticksuffix: '%',
        tickformat: '.1f',
        range: [0, 15]
      },
      margin: { t: 20, r: 20, b: 60, l: 75 },
      height: 380
    });
    Plotly.newPlot(el, data, layout, CONFIG);
  }

  /* ── Initialise ──────────────────────────────────────── */
  function init() {
    if (typeof Plotly === 'undefined') {
      setTimeout(init, 1000);
      return;
    }
    fig3(); fig4(); fig7(); fig9();
    fig11(); fig16(); fig17(); fig18(); fig20();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
