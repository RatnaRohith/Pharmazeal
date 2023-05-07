import http from './httpService';

export function getAllSales() {
    return http.get(
      process.env.REACT_APP_API_URL + '/api/sales',
    );
}

export function processSale(data) {
    return http.post(
      process.env.REACT_APP_API_URL + '/api/risks/medicines/verify', { data },
    );
}

export function getTotalNumberOfSales() {
    return http.get(
      process.env.REACT_APP_API_URL + '/api/sales/get-total-sales'
    );
}

export function checkLowQuantity() {
    return http.get(
      process.env.REACT_APP_API_URL + '/api/risks//medicines/low-stock'
    );
}
