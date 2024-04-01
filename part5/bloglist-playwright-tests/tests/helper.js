const login = async (page, username, password) => {
	const usernameInput = await page.locator('input[name="username"]');
	const passwordInput = await page.locator('input[name="password"]');

	await usernameInput.fill(username);
	await passwordInput.fill(password);
	await page.getByRole('button', { name: 'Login' }).click();
};

const createBlog = async (page, blog) => {
	await page.getByRole('button', { name: 'New Blog' }).click();

	const titleInput = await page.locator('input[name="title"]');
	const authorInput = await page.locator('input[name="author"]');
	const urlInput = await page.locator('input[name="url"]');

	await titleInput.fill(blog.title);
	await authorInput.fill(blog.author);
	await urlInput.fill(blog.url);
	await page.getByRole('button', { name: 'Create' }).click();
	await page.getByText(`${blog.title} - ${blog.author}`).waitFor();
};

module.exports = { login, createBlog };
