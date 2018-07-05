export default (moodId) => {
	const imageSource = {
		0: '/images/emoji--pure.png',
		1: '/images/emoji--happy.png',
		2: '/images/emoji--gratefull.png',
		3: '/images/emoji--cry.png',
		4: '/images/emoji--frustrated.png',
		5: '/images/emoji--angry.png'
	};
	if (moodId) {
		return imageSource[moodId];
	}
	return '/images/emoji--pure.png';
};
