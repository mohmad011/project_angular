export const environment = {
	production: true,
	isMockEnabled: true, // You have to switch this, when your real back-end is done
	baseUrl: '/api',
	socketUrl: '/',
	socketServer: '/socket',
	defaultLanguage: 'en',
	supportedLanguages: [
		{
			'name': 'English',
			'code': 'en'
		},
		{
			'name': 'العربية',
			'code': 'ar'
		}
	]
};
