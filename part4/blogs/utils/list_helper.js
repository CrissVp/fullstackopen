const dummy = blogs => {
	return 1;
};

const totalLikes = blogs => {
	return blogs.reduce((acc, curr) => {
		acc += curr.likes;
		return acc;
	}, 0);
};

const favoriteBlog = blogs => {
	const maxLikes = Math.max(...blogs.map(blog => blog.likes));
	const mostLiked = blogs.find(blog => blog.likes === maxLikes);

	return {
		title: mostLiked.title,
		author: mostLiked.author,
		likes: mostLiked.likes,
	};
};

const mostBlogs = blogs => {
	const authorBlogs = blogs.reduce((acc, curr) => {
		if (!acc[curr.author]) acc[curr.author] = 0;
		acc[curr.author] += 1;
		return acc;
	}, {});

	const maxBlogs = Math.max(...Object.values(authorBlogs));
	const result = Object.entries(authorBlogs).find(
		([author, blogs]) => blogs === maxBlogs
	);

	return {
		author: result[0],
		blogs: result[1],
	};
};

const mostLikes = blogs => {
	const authorLikes = blogs.reduce((acc, curr) => {
		if (!acc[curr.author]) acc[curr.author] = 0;
		acc[curr.author] += curr.likes;
		return acc;
	}, {});

	const maxLikes = Math.max(...Object.values(authorLikes));
	const result = Object.entries(authorLikes).find(
		([author, likes]) => likes === maxLikes
	);

	return {
		author: result[0],
		likes: result[1],
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
