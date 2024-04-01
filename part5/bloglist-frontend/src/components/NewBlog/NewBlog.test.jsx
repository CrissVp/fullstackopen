import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import NewBlog from '.';
import userEvent from '@testing-library/user-event';

test('calls event handler with right details', async () => {
	const blog = {
		title: 'React patterns',
		url: 'https://reactpatterns.com/',
		author: 'Michael Chan',
		likes: 9,
		user: '65f91d40f4e1e99730440d0f',
		id: '65f938687f09e839d90d1e92',
	};

	const handleNewBlog = vi.fn();
	const user = userEvent.setup();
	render(<NewBlog addBlog={handleNewBlog} />);

	const button = screen.getByText('Create');
	const titleInput = screen.getByPlaceholderText('Blog title');
	const authorInput = screen.getByPlaceholderText('Blog author');
	const urlInput = screen.getByPlaceholderText('Blog url');

	await user.type(titleInput, blog.title);
	await user.type(authorInput, blog.author);
	await user.type(urlInput, blog.url);
	await user.click(button);

	expect(handleNewBlog.mock.calls).toHaveLength(1);
	expect(handleNewBlog.mock.calls[0][0]).toStrictEqual({
		title: blog.title,
		author: blog.author,
		url: blog.url,
	});
});
