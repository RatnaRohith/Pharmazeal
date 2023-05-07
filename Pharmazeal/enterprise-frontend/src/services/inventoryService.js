import http from './httpService';

export function getAllMedicines() {
    return http.get(
      process.env.REACT_APP_API_URL + '/api/medicines',
    );
}
export function getTotalNumberOfMedicines() {
    return http.get(
      process.env.REACT_APP_API_URL + '/api/medicines/get/get-total-medicines',
    );
}

export function createInventory(body) {
    return http.post(
      process.env.REACT_APP_API_URL + '/api/medicines', {
       body
      }
    );
}
