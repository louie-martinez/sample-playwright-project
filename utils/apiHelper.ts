import axios from 'axios';

export async function createUser(): Promise<{ email: string; password: string }> {
  const email = `user_${Date.now()}@test.com`;
  const password = 'Test123!';

  const response = await axios.post('https://yourapi.com/api/users', {
    email,
    password,
  });

  if (response.status !== 201) {
    throw new Error(`User creation failed: ${response.statusText}`);
  }

  return { email, password };
}

export async function deleteUser(email: string): Promise<void> {
  const response = await axios.delete(`https://yourapi.com/api/users/${encodeURIComponent(email)}`);

  if (response.status !== 200) {
    throw new Error(`User deletion failed: ${response.statusText}`);
  }
}