// src/services/authService.ts
export const login = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await fetch(
      'https://my-login-api.free.beeceptor.com/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      return data.token;
    } else {
      throw new Error(data.error || 'Login failed');
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const getProfile = async (token: string): Promise<string> => {
  try {
    const response = await fetch(
      'https://my-login-api.free.beeceptor.com/profile',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      return data.message;
    } else {
      throw new Error(data.error || 'Failed to fetch profile');
    }
  } catch (error) {
    console.error('Profile fetch failed:', error);
    throw error;
  }
};
