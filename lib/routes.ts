const BASE_URL = `http://localhost:3000`;

export const API_ROUTES = {
  AUTH: {
    SIGNUP: `${BASE_URL}/api/signup`,
    VERIFY_OTP: `${BASE_URL}/api/otp/verify`,
  },
  USER: {
    GETALL: `${BASE_URL}/api/user/get-all`,
    GETONE: `${BASE_URL}/api/user/get-one`,
  },
} as const;
