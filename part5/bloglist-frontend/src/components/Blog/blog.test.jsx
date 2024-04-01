import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Blog from '.';
import userEvent from '@testing-library/user-event';

describe('<Blog />', () => {
	const blog = {
		title: 'React patterns',
		url: 'https://reactpatterns.com/',
		author: 'Michael Chan',
		likes: 9,
		user: '65f91d40f4e1e99730440d0f',
		id: '65f938687f09e839d90d1e92',
	};

	test('renders blog title and author, but does not render url and likes by default', () => {
		render(<Blog blog={blog} />);

		const titleElement = screen.queryByTestId('blog_container');
		const infoElement = screen.queryByTestId('blog_info');

		expect(titleElement).toHaveTextContent(`${blog.title} - ${blog.author}`);
		expect(infoElement).toBeNull();
	});

	test('likes and url are shown when clicking view button', async () => {
		render(<Blog blog={blog} />);

		const button = screen.getByText('view');
		const user = userEvent.setup();
		await user.click(button);

		const infoElement = screen.getByTestId('blog_info');
		expect(infoElement).toHaveTextContent(blog.url);
		expect(infoElement).toHaveTextContent(`${blog.likes} likes`);
	});

	test('if like button is clicked twice, event handler is called twice', async () => {
		const handleLike = vi.fn();
		const user = userEvent.setup();

		render(<Blog blog={blog} likeBlog={handleLike} />);

		const button = screen.getByText('view');
		await user.click(button);

		const likesButton = screen.getByText('like');
		await user.click(likesButton);
		await user.click(likesButton);

		expect(handleLike.mock.calls).toHaveLength(2);
	});
});
