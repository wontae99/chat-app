import axios from "axios";

const API_KEY = "AIzaSyADhPI7RQRdD1Q7e6C39VbO-ShejiyZXxw";

export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}
      `;
      
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = response.data;

  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

export async function refreshToken(refreshToken) {
  const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

  const response = await axios.post(url, {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  return response.data;
}

export async function changeEmail(idToken, newEmail) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}
  `,
    {
      idToken,
      email: newEmail,
      returnSecureToken: true,
    }
  );

  return response.data;
}
