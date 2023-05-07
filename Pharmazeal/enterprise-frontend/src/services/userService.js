import http from './httpService';

export function getAllUsers() {
  return http.get(process.env.REACT_APP_API_URL + '/api/users');
}

export function getAllActivities() {
  return http.get(process.env.REACT_APP_API_URL + '/api/users/track-activity/all-activities');
}

export function register(user) {
  return http.post(process.env.REACT_APP_API_URL + '/api/users/create-user', {
    name: user.name,
    email: user.email,
    password: user.password
  });
}

export function deleteUser(userID) {
  return http.delete(process.env.REACT_APP_API_URL + `/api/users/${userID}`);
}