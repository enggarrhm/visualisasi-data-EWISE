// ============================================================
// DATA EWISE
// ============================================================

// Data 2025
const data2025 = {
    Karawang: { Gini: 0.36, TPT: 7.99, IPM: 74.59, PMA: 58.26, Lahan: 6400 },
    Subang: { Gini: 0.32, TPT: 6.80, IPM: 73.00, PMA: 5.50, Lahan: 3900 },
    RataProv: { Gini: 0.332, TPT: 6.86, IPM: 73.42, PMA: 8.87, Lahan: 5150 }
};

// Data untuk Comparison Bar Chart
const comparisonData = {
    labels: ['Gini Ratio', 'TPT (%)', 'IPM', 'PMA (T)', 'Lahan (Ha)'],
    Karawang: [0.36, 7.99, 74.59, 58.26, 6400],
    Subang: [0.32, 6.80, 73.00, 5.50, 3900],
    RataProv: [0.332, 6.86, 73.42, 8.87, 5150]
};

// Data Gini Bar Chart
const dataGiniBar = {
    labels: ['Karawang', 'Subang', 'Rata-rata Provinsi'],
    values: [0.36, 0.32, 0.332],
    colors: ['#e74c3c', '#3498db', '#2ecc71']
};

// Data TPT Bar Chart
const dataTPTBar = {
    labels: ['Karawang', 'Subang', 'Rata-rata Provinsi'],
    values: [7.99, 6.80, 6.86],
    colors: ['#e74c3c', '#3498db', '#2ecc71']
};

// Data Trend IPM
const trendIPM = {
    labels: ['2023', '2024', '2025'],
    Karawang: [73.25, 73.82, 74.59],
    Subang: [71.42, 72.05, 73.00],
    Rata: [74.24, 74.92, 75.90]
};

// Data Trend Lahan
const trendLahan = {
    labels: ['2021', '2022', '2023', '2024', '2025'],
    Karawang: [8200, 7400, 7000, 6700, 6400],
    Subang: [5100, 4600, 4300, 4100, 3900],
    Rata: [6650, 6000, 5650, 5400, 5150]
};

// Data PMA
const dataPMA = {
    labels: ['Karawang', 'Subang', 'Rata-rata Provinsi'],
    values: [58.26, 5.50, 8.87],
    colors: ['#e74c3c', '#3498db', '#2ecc71']
};

// Data Status Risiko
const statusData = {
    Karawang: {
        skor: 3,
        status: 'WASPADA',
        deskripsi: '3 indikator lebih buruk dari rata-rata provinsi',
        detail: 'Gini (0.360 > 0.332), TPT (7.99% > 6.86%), Lahan (6400Ha > 5150Ha)',
        rekomendasi: 'Segera evaluasi kebijakan di sektor-sektor yang bermasalah, libatkan pemangku kepentingan.'
    },
    Subang: {
        skor: 2,
        status: 'PERHATIAN',
        deskripsi: '2 indikator lebih buruk dari rata-rata provinsi',
        detail: 'IPM (73.00 < 73.42), PMA (Rp5.50T < Rp8.87T)',
        rekomendasi: 'Evaluasi kebijakan di sektor bermasalah, libatkan pemangku kepentingan.'
    }
};

// Skala Risiko
const skalaRisiko = {
    0: { label: 'SEHAT', kelas: 'sehat', desc: 'Semua indikator lebih baik dari rata-rata provinsi', rekomendasi: 'Pertahankan kebijakan yang ada' },
    1: { label: 'AMAN', kelas: 'aman', desc: '1 indikator lebih buruk dari rata-rata provinsi', rekomendasi: 'Pantau sektor yang bermasalah' },
    2: { label: 'PERHATIAN', kelas: 'perhatian', desc: '2 indikator lebih buruk dari rata-rata provinsi', rekomendasi: 'Evaluasi kebijakan di sektor bermasalah, libatkan pemangku kepentingan' },
    3: { label: 'WASPADA', kelas: 'waspada', desc: '3 indikator lebih buruk dari rata-rata provinsi', rekomendasi: 'Segera evaluasi kebijakan di sektor-sektor yang bermasalah, libatkan pemangku kepentingan' },
    4: { label: 'BAHAYA', kelas: 'bahaya', desc: '4 indikator lebih buruk dari rata-rata provinsi', rekomendasi: 'Intervensi kebijakan segera, bentuk tim khusus penanganan ketimpangan' },
    5: { label: 'KRITIS', kelas: 'kritis', desc: 'SEMUA indikator lebih buruk dari rata-rata provinsi', rekomendasi: 'Moratorium industri baru, perbaiki seluruh sektor secara darurat' }
};

// Label Indikator
const labelMap = {
    Gini: 'Gini Ratio',
    TPT: 'TPT (%)',
    IPM: 'IPM',
    PMA: 'PMA (Triliun)',
    Lahan: 'Lahan Hilang (Ha)'
};