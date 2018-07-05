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
		component: Start,
		name: 'start'
	},
	{
		path: '/new',
		component: NewConversation,
		name: 'new'
	},
	{
		path: '/created',
		component: CreatedConversation,
		props: true,
		name: 'created'
	},
	{
		path: '/conversations',
		component: Conversations,
		name: 'conversations'
	},
	{
		path: '/conversations/:id',
		component: Conversation,
		name: 'conversation'
	},
	{
		path: '/search',
		component: Search,
		name: 'search'
	},
	{
		path: '/login',
		component: Login,
		props: true,
		name: 'login'
	},
	{
		path: '*',
		component: Error,
		name: 'error'
	}
];
