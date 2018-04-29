import Start from './components/Start.vue';
import NewConversation from './components/NewConversation.vue';
import Sent from './components/Sent.vue';
import Conversation from './components/Conversation.vue';
import Search from './components/Search.vue';

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
		path: '/sent',
		component: Sent
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
