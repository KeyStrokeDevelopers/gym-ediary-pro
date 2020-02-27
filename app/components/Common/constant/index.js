export const SERVER_URL = 'http://localhost:4000/';
export const API_URL = 'http://localhost:4000/api';

export function getConfig() {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json; charset=utf-8',
      Authorization: window.localStorage.getItem('token')
    }
  };
}

export function configForFilePost() {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'multipart/form-data',
      Authorization: window.localStorage.getItem('token')
    }
  };
}

export function configWithoutToken() {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json; charset=utf-8',
    }
  };
}

export const allIndianState = [
  { value: 'Andhra Pradesh' },
  { value: 'Arunachal Pradesh' },
  { value: 'Assam' },
  { value: 'Bihar' },
  { value: 'Goa' },
  { value: 'Gujarat' },
  { value: 'Haryana' },
  { value: 'Himachal Pradesh' },
  { value: 'Jammu and Kashmir' },
  { value: 'Karnataka' },
  { value: 'Kerala' },
  { value: 'Madhya Pradesh' },
  { value: 'Maharashtra' },
  { value: 'Manipur' },
  { value: 'Meghalaya' },
  { value: 'Mizoram' },
  { value: 'Nagaland' },
  { value: 'Orissa' },
  { value: 'Punjab' },
  { value: 'Rajasthan' },
  { value: 'Sikkim' },
  { value: 'Tamil Nadu' },
  { value: 'Tripura' },
  { value: 'Uttar Pradesh' },
  { value: 'West Bengal' },
  { value: 'Chhattisgarh' },
  { value: 'Uttarakhand' },
  { value: 'Jharkhand' },
  { value: 'Telangana' },
  { value: 'Delhi' },
  { value: 'Andaman and Nicobar Islands' },
  { value: 'Chandigarh' },
  { value: 'Dadra and Nagar Haveli' },
  { value: 'Daman and Diu' },
  { value: 'Lakshadweep' },
  { value: 'Puducherry' }
];
