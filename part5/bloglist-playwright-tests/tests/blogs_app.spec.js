const { describe, beforeEach, test, expect } = require('@playwright/test');
const { login, createBlog } = require('./helper');

const blogs = [
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 0,
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 0,
	},
	{
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 0,
	},
];

describe('Blogs app', () => {
	beforeEach(async ({ page, request }) => {
		await request.post('/api/testing/reset');
		await request.post('/api/users/', {
			data: {
				name: 'Superuser',
				username: 'root',
				password: '12345',
			},
		});

		await request.post('/api/users/', {
			data: {
				name: 'TestUser',
				username: 'test',
				password: 'test',
			},
		});

		await page.goto('/');
	});

	test('Login form is shown', async ({ page }) => {
		await expect(page.getByText('Log in to application')).toBeVisible();
		await expect(page.getByText('Username')).toBeVisible();
		await expect(page.getByText('Password')).toBeVisible();
		await expect(page.getByText('Login')).toBeVisible();
	});

	describe('Login', () => {
		test('succeeds with correct credentials', async ({ page }) => {
			await login(page, 'root', '12345');
			await expect(page.getByText('Superuser logged in')).toBeVisible();
		});

		test('fails with wrong credentials', async ({ page }) => {
			await login(page, 'roott', '1234');
			await expect(page.getByText('Superuser logged in')).not.toBeVisible();
		});
	});

	describe('When logged in', () => {
		beforeEach(async ({ page }) => {
			await login(page, 'root', '12345');
		});

		test('a new blog can be created', async ({ page }) => {
			await createBlog(page, blogs[0]);
			await expect(
				page.getByText(`${blogs[0].title} - ${blogs[0].author}`)
			).toBeVisible();
		});

		describe('when there are blogs', () => {
			beforeEach(async ({ page }) => {
				await createBlog(page, blogs[0]);
				await createBlog(page, blogs[1]);
				await createBlog(page, blogs[2]);
			});

			test('a blog can be edited', async ({ page }) => {
				await page.getByRole('button', { name: 'view' }).first().click();
				await page.getByRole('button', { name: 'like' }).click();

				const element = await page.getByText(`${blogs[0].likes + 1} likes`);
				await expect(element).toBeVisible();
			});

			test('a blog can be deleted', async ({ page }) => {
				page.on('dialog', (dialog) => dialog.accept());
				await page.getByRole('button', { name: 'view' }).first().click();
				await page.getByRole('button', { name: 'remove' }).click();

				await expect(
					page.getByText(`${blogs[0].title} - ${blogs[0].author}`)
				).not.toBeVisible();
			});

			test('a blog cant be delted by a different user', async ({ page }) => {
				await page.getByRole('button', { name: 'Logout' }).click();
				await login(page, 'test', 'test');

				await page.getByRole('button', { name: 'view' }).first().click();
				await expect(
					page.getByRole('button', { name: 'remove' })
				).not.toBeVisible();
			});

			test('blogs are sorted according to likes', async ({ page }) => {
				await expect(
					page
						.getByTestId('blog_container')
						.first()
						.locator('[data-testid=blog_title] > p')
				).toHaveText(`${blogs[0].title} - ${blogs[0].author}`);

				await page.getByRole('button', { name: 'view' }).nth(2).click();

				await page.getByRole('button', { name: 'like' }).click();
				await page.getByText(`${blogs[0].likes + 1} likes`).waitFor();

				await page.getByRole('button', { name: 'like' }).click();
				await page.getByText(`${blogs[0].likes + 2} likes`).waitFor();

				await page.getByRole('button', { name: 'like' }).click();
				await page.getByText(`${blogs[0].likes + 3} likes`).waitFor();

				await expect(
					page
						.getByTestId('blog_container')
						.first()
						.locator('[data-testid=blog_title] > p')
				).toHaveText(`${blogs[2].title} - ${blogs[2].author}`);
			});
		});
	});
});
