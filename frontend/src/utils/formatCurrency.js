export const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return "₫0";  // Return "₫0" for invalid input
    }
    
    return parseInt(amount).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};