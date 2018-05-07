const Start = () => {
	return import('./components/Start.vue');
};
const NewConversation = () => {
	return import('./components/NewConversation.vue');
};
const CreatedConversation = () => {
	return import('./components/CreatedConversation.vue');
};
const Conversation = () => {
	return import('./components/Conversation.vue');
};
const Search = () => {
	return import('./components/Search.vue');
};

export default [
	{
		path: '/',
		alias: '/index',
		component: Start
	},
	{
		path: '/new',
		component: NewConversation
	},
	{
		path: '/created',
		name: 'created',
		component: CreatedConversation,
		props: true
	},
	{
		path: '/conversation/:id',
		component: Conversation
	},
	{
		path: '/search',
		component: Search
	},
	{
		path: '*'
	}
];
