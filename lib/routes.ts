const BASE_URL = `http://localhost:3000`;

export const API_ROUTES = {
  AUTH: {
    SIGNUP: `${BASE_URL}/api/signup`,
    VERIFY_OTP: `${BASE_URL}/api/otp/verify`,
  },

  USER: {},
} as const;
