import { test as base } from '@playwright/test';

// Simulate an API helper to create and delete a user
async function createUser() {
  // Imagine this calls your backend API to create a user
  const user = {
    email: `user_${Date.now()}@test.com`,
    password: 'Test123!',
  };
  console.log(`User created: ${user.email}`);
  // In real scenario: await apiCallCreateUser(user)
  return user;
}

async function deleteUser(email: string) {
  // Imagine this calls your backend API to delete the user
  console.log(`User deleted: ${email}`);
  // In real scenario: await apiCallDeleteUser(email)
}

export const test = base.extend<{
  testUser: { email: string; password: string };
}>({
  testUser: async ({}, use) => {
    // Setup: create the user before the test
    const user = await createUser();

    // Provide the user to the test
    await use(user);

    // Teardown: delete the user after the test finishes
    await deleteUser(user.email);
  },
});

export { expect } from '@playwright/test';
