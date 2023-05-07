import http from './httpService';

export function getAllCustomers() {
    return http.get(
      process.env.REACT_APP_API_URL + '/api/customers',
    );
}

export function getTotalNumberOfCustomers() {
    return http.get(
      process.env.REACT_APP_API_URL + '/api/customers/get/total-number-of-customers',
    );
}
