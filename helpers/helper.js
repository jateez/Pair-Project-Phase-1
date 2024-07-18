function formattedRupiah(value) {
    return new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: 'IDR'
    }).format(value);
};

function formatDate(date) {
    return date.toISOString().split("T")[0];
}
module.exports = { formattedRupiah, formatDate };