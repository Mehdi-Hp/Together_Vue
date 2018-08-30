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
const GoToConversation = () => {
	return import('./components/GoToConversation.vue');
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
const NotFound = () => {
	return import('./components/NotFound.vue');
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
		name: 'created',
		meta: {
			navbar: ['new']
		}
	},
	{
		path: '/go',
		component: GoToConversation,
		props: true,
		name: 'go',
		meta: {
			navbar: ['new']
		}
	},
	{
		path: '/conversations',
		component: Conversations,
		name: 'conversations',
		meta: {
			navbar: []
		}
	},
	{
		path: '/conversations/:id',
		alias: '/conversation/:id',
		component: Conversation,
		name: 'conversation',
		meta: {
			navbar: ['new', 'conversations']
		}
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
		component: NotFound,
		name: 'notFound'
	}
];
