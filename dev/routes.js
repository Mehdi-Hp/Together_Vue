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
const Conversations = () => {
	return import('./components/Conversations.vue');
};
const Search = () => {
	return import('./components/Search.vue');
};
const Login = () => {
	return import('./components/Login.vue');
};
const Error = () => {
	return import('./components/Error.vue');
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
		path: '/conversations',
		component: Conversations
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
		path: '/login',
		component: Login,
		name: 'login',
		props: true
	},
	{
		path: '*',
		component: Error,
		name: 'error'
	}
];
