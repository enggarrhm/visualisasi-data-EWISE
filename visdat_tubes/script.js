// ============================================================
// FUNGSI UTILITY
// ============================================================

function lebihBuruk(indikator, nilai) {
    const rata = data2025.RataProv;
    if (!rata) return false;
    if (nilai === null || nilai === undefined) return false;

    const burukJika = {
        Gini: nilai > rata.Gini,
        TPT: nilai > rata.TPT,
        IPM: nilai < rata.IPM,
        PMA: nilai < rata.PMA,
        Lahan: nilai > rata.Lahan
    };
    return burukJika[indikator] || false;
}

function getStatusLabel(skor) {
    return skalaRisiko[skor] || skalaRisiko[0];
}

// ============================================================
// RENDER FUNGSI
// ============================================================

function renderIndikator(wilayah, containerId) {
    const d = data2025[wilayah];
    if (!d) return;

    const container = document.getElementById(containerId);
    const indikatorList = ['Gini', 'TPT', 'IPM', 'PMA', 'Lahan'];
    let html = '';

    indikatorList.forEach(ind => {
        const val = d[ind];
        if (val === null || val === undefined) {
            html += `
                <div class="ind-item" style="border-left-color:#95a5a6; background:#f4f6f7;">
                    <span class="name">${labelMap[ind]}</span>
                    <span class="value" style="color:#95a5a6;">Data tidak tersedia</span>
                </div>
            `;
            return;
        }

        const buruk = lebihBuruk(ind, val);
        const statusClass = buruk ? 'buruk' : 'baik';
        const label = labelMap[ind] || ind;

        let displayVal = val;
        if (ind === 'PMA') displayVal = val.toFixed(2);
        if (ind === 'Lahan') displayVal = val.toLocaleString();

        let sourceNote = '';
        if (ind === 'PMA') {
            sourceNote = ' (2024)';
        }

        html += `
            <div class="ind-item ${statusClass}">
                <span class="name">${label}${sourceNote}</span>
                <span class="value">${displayVal}</span>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderTabel() {
    const tbody = document.getElementById('dataTableBody');
    const wilayahs = ['Karawang', 'Subang'];
    let html = '';

    const r = data2025.RataProv;
    html += `
        <tr style="background:#eef2f7; font-weight:600;">
            <td>Rata-rata Provinsi</td>
            <td>${r.Gini}</td>
            <td>${r.TPT}</td>
            <td>${r.IPM}</td>
            <td>${r.PMA.toFixed(2)}</td>
            <td>${r.Lahan.toLocaleString()}</td>
        </tr>
    `;

    wilayahs.forEach(w => {
        const d = data2025[w];
        if (!d) return;
        html += `
            <tr>
                <td><strong>${w}</strong></td>
                <td>${d.Gini}</td>
                <td>${d.TPT}</td>
                <td>${d.IPM}</td>
                <td>${d.PMA.toFixed(2)}</td>
                <td>${d.Lahan.toLocaleString()}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function renderStatusTable() {
    const tbody = document.getElementById('statusTableBody');
    const wilayahs = ['Karawang', 'Subang'];
    const rata = data2025.RataProv;
    let html = '';

    wilayahs.forEach(w => {
        const d = data2025[w];
        if (!d) return;

        const indikatorList = ['Gini', 'TPT', 'IPM', 'PMA', 'Lahan'];
        let cells = '';
        let burukCount = 0;

        indikatorList.forEach(ind => {
            const val = d[ind];
            const buruk = lebihBuruk(ind, val);
            if (buruk) burukCount++;
            const color = buruk ? '#e74c3c' : '#27ae60';
            let displayVal = val;
            if (ind === 'PMA') displayVal = val.toFixed(2);
            if (ind === 'Lahan') displayVal = val.toLocaleString();
            cells += `<td style="color:${color}; font-weight:600;">${displayVal}</td>`;
        });

        const status = statusData[w];
        const statusColor = status.status === 'WASPADA' ? '#f39c12' : '#3498db';

        html += `
            <tr>
                <td><strong>${w}</strong></td>
                ${cells}
                <td style="background:${statusColor}; color:white; font-weight:700; text-align:center; border-radius:4px;">
                    ${status.status} (${burukCount}/5)
                </td>
            </tr>
        `;
    });

    html += `
        <tr style="background:#eef2f7; font-weight:600;">
            <td>Rata-rata Provinsi</td>
            <td>${rata.Gini}</td>
            <td>${rata.TPT}</td>
            <td>${rata.IPM}</td>
            <td>${rata.PMA.toFixed(2)}</td>
            <td>${rata.Lahan.toLocaleString()}</td>
            <td style="text-align:center;">-</td>
        </tr>
    `;

    tbody.innerHTML = html;
}

function updateStatusCards() {
    const statusKarawang = statusData.Karawang;
    const cardKarawang = document.getElementById('statusKarawang');
    cardKarawang.className = `status-card ${statusKarawang.status.toLowerCase()}`;
    cardKarawang.innerHTML = `
        <div class="status-label">${statusKarawang.status}</div>
        <div class="status-score">${statusKarawang.skor} / 5</div>
        <div class="status-desc">${statusKarawang.deskripsi}</div>
        <div style="margin-top:0.5rem; font-size:0.85rem; opacity:0.85;">
            ${statusKarawang.detail}
        </div>
        <div class="rekomendasi">
            <strong>Rekomendasi:</strong><br />
            ${statusKarawang.rekomendasi}
        </div>
    `;

    const statusSubang = statusData.Subang;
    const cardSubang = document.getElementById('statusSubang');
    cardSubang.className = `status-card ${statusSubang.status.toLowerCase()}`;
    cardSubang.innerHTML = `
        <div class="status-label">${statusSubang.status}</div>
        <div class="status-score">${statusSubang.skor} / 5</div>
        <div class="status-desc">${statusSubang.deskripsi}</div>
        <div style="margin-top:0.5rem; font-size:0.85rem; opacity:0.85;">
            ${statusSubang.detail}
        </div>
        <div class="rekomendasi">
            <strong>Rekomendasi:</strong><br />
            ${statusSubang.rekomendasi}
        </div>
    `;
}

// ============================================================
// NAVBAR
// ============================================================

function updateNavbarActive() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
            current = section.getAttribute('id');
        }
    });

    if (window.scrollY < 200) {
        current = 'beranda';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === current) {
            link.classList.add('active');
        }
    });
}

// ============================================================
// CHARTS
// ============================================================

let comparisonBarInstance = null;
let giniBarInstance = null;
let tptBarInstance = null;
let ipmLineInstance = null;
let pmaBarInstance = null;
let lahanLineInstance = null;

function initComparisonBarChart() {
    const ctx = document.getElementById('comparisonBarChart').getContext('2d');
    if (comparisonBarInstance) comparisonBarInstance.destroy();

    const maxValues = {
        'Gini Ratio': 0.5,
        'TPT (%)': 15,
        'IPM': 85,
        'PMA (T)': 70,
        'Lahan (Ha)': 10000
    };

    const keys = ['Gini Ratio', 'TPT (%)', 'IPM', 'PMA (T)', 'Lahan (Ha)'];

    const karawangNorm = comparisonData.Karawang.map((v, i) => (v / maxValues[keys[i]]) * 100);
    const subangNorm = comparisonData.Subang.map((v, i) => (v / maxValues[keys[i]]) * 100);
    const rataNorm = comparisonData.RataProv.map((v, i) => (v / maxValues[keys[i]]) * 100);

    comparisonBarInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: keys,
            datasets: [{
                label: 'Karawang',
                data: karawangNorm,
                backgroundColor: 'rgba(231,76,60,0.75)',
                borderColor: '#e74c3c',
                borderWidth: 2,
                borderRadius: 4
            }, {
                label: 'Subang',
                data: subangNorm,
                backgroundColor: 'rgba(52,152,219,0.75)',
                borderColor: '#3498db',
                borderWidth: 2,
                borderRadius: 4
            }, {
                label: 'Rata-rata Provinsi',
                data: rataNorm,
                backgroundColor: 'rgba(46,204,113,0.75)',
                borderColor: '#2ecc71',
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { boxWidth: 12, padding: 15, font: { size: 12 } }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const index = context.dataIndex;
                            const key = keys[index];
                            const actualValues = {
                                'Karawang': comparisonData.Karawang,
                                'Subang': comparisonData.Subang,
                                'Rata-rata Provinsi': comparisonData.RataProv
                            };
                            const actual = actualValues[context.dataset.label][index];
                            const percent = context.raw.toFixed(0);
                            let display = actual;
                            if (key === 'Lahan (Ha)') display = actual.toLocaleString();
                            if (key === 'PMA (T)') display = actual.toFixed(2);
                            return label + ' (' + key + '): ' + display + ' (' + percent + '%)';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Normalized Value (%)',
                        color: '#7f8c8d'
                    }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function initGiniBarChart() {
    const ctx = document.getElementById('giniBarChart').getContext('2d');
    if (giniBarInstance) giniBarInstance.destroy();

    giniBarInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataGiniBar.labels,
            datasets: [{
                label: 'Gini Ratio',
                data: dataGiniBar.values,
                backgroundColor: dataGiniBar.colors.map(c => c + 'CC'),
                borderColor: dataGiniBar.colors,
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { beginAtZero: true, max: 0.5, ticks: { callback: v => v.toFixed(3) } }
            }
        }
    });
}

function initTPTBarChart() {
    const ctx = document.getElementById('tptBarChart').getContext('2d');
    if (tptBarInstance) tptBarInstance.destroy();

    tptBarInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataTPTBar.labels,
            datasets: [{
                label: 'TPT (%)',
                data: dataTPTBar.values,
                backgroundColor: dataTPTBar.colors.map(c => c + 'CC'),
                borderColor: dataTPTBar.colors,
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { beginAtZero: true, max: 10, ticks: { callback: v => v + '%' } }
            }
        }
    });
}

function initIPMLineChart() {
    const ctx = document.getElementById('ipmChart').getContext('2d');
    if (ipmLineInstance) ipmLineInstance.destroy();

    ipmLineInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: trendIPM.labels,
            datasets: [{
                label: 'Karawang',
                data: trendIPM.Karawang,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231,76,60,0.1)',
                tension: 0.3,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: '#e74c3c'
            }, {
                label: 'Subang',
                data: trendIPM.Subang,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52,152,219,0.1)',
                tension: 0.3,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: '#3498db'
            }, {
                label: 'Rata-rata Provinsi',
                data: trendIPM.Rata,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46,204,113,0.1)',
                tension: 0.3,
                fill: true,
                borderDash: [5, 5],
                pointRadius: 4,
                pointBackgroundColor: '#2ecc71'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 10 } } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

function initPMAChart() {
    const ctx = document.getElementById('pmaChart').getContext('2d');
    if (pmaBarInstance) pmaBarInstance.destroy();

    pmaBarInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataPMA.labels,
            datasets: [{
                label: 'PMA (Triliun Rupiah)',
                data: dataPMA.values,
                backgroundColor: dataPMA.colors.map(c => c + 'CC'),
                borderColor: dataPMA.colors,
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, ticks: { callback: v => 'Rp' + v.toFixed(1) + 'T' } }
            }
        }
    });
}

function initLahanChart() {
    const ctx = document.getElementById('lahanChart').getContext('2d');
    if (lahanLineInstance) lahanLineInstance.destroy();

    lahanLineInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: trendLahan.labels,
            datasets: [{
                label: 'Karawang',
                data: trendLahan.Karawang,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231,76,60,0.1)',
                tension: 0.3,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: '#e74c3c'
            }, {
                label: 'Subang',
                data: trendLahan.Subang,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52,152,219,0.1)',
                tension: 0.3,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: '#3498db'
            }, {
                label: 'Rata-rata Provinsi',
                data: trendLahan.Rata,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46,204,113,0.1)',
                tension: 0.3,
                fill: true,
                borderDash: [5, 5],
                pointRadius: 4,
                pointBackgroundColor: '#2ecc71'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 10 } } },
            scales: {
                y: { beginAtZero: true, ticks: { callback: v => v.toLocaleString() + ' Ha' } }
            }
        }
    });
}

// ============================================================
// KALKULATOR
// ============================================================

function hitungEWISE() {
    const gini = parseFloat(document.getElementById('inputGini').value);
    const tpt = parseFloat(document.getElementById('inputTPT').value);
    const ipm = parseFloat(document.getElementById('inputIPM').value);
    const pma = parseFloat(document.getElementById('inputPMA').value);
    const lahan = parseFloat(document.getElementById('inputLahan').value);

    if (isNaN(gini) || isNaN(tpt) || isNaN(ipm) || isNaN(pma) || isNaN(lahan)) {
        document.getElementById('kalkulatorHasil').innerHTML = `
            <div style="color:#e74c3c; padding:1rem;">
                <strong>Harap masukkan semua nilai indikator!</strong>
            </div>
        `;
        return;
    }

    const inputData = { Gini: gini, TPT: tpt, IPM: ipm, PMA: pma, Lahan: lahan };
    const rata = data2025.RataProv;

    const indikatorList = ['Gini', 'TPT', 'IPM', 'PMA', 'Lahan'];
    const bermasalah = indikatorList.filter(ind => {
        const burukJika = {
            Gini: inputData.Gini > rata.Gini,
            TPT: inputData.TPT > rata.TPT,
            IPM: inputData.IPM < rata.IPM,
            PMA: inputData.PMA < rata.PMA,
            Lahan: inputData.Lahan > rata.Lahan
        };
        return burukJika[ind];
    });

    const skor = bermasalah.length;
    const status = getStatusLabel(skor);
    const kelas = status.kelas;

    document.getElementById('kalkulatorHasil').innerHTML = `
        <div class="result-card ${kelas}">
            <div class="result-status">${status.label}</div>
            <div class="result-score">${skor} / 5</div>
            <div class="result-detail">${status.desc}</div>
            <div style="margin-top:0.5rem; font-size:0.85rem; opacity:0.85;">
                Indikator bermasalah: ${bermasalah.length > 0 ? bermasalah.join(', ') : 'Tidak ada'}
            </div>
            <div class="result-rekomendasi">
                <strong>Rekomendasi:</strong><br />
                ${status.rekomendasi}
            </div>
        </div>
    `;
}

// ============================================================
// INISIALISASI
// ============================================================

function initDashboard() {
    renderIndikator('Karawang', 'karawangIndicators');
    renderIndikator('Subang', 'subangIndicators');
    renderTabel();
    renderStatusTable();
    updateStatusCards();
}

function initCharts() {
    initComparisonBarChart();
    initGiniBarChart();
    initTPTBarChart();
    initIPMLineChart();
    initPMAChart();
    initLahanChart();
}

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
    initCharts();

    window.addEventListener('scroll', updateNavbarActive);
    setTimeout(updateNavbarActive, 100);
});