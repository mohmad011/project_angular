export class PageMohConfig {
	public defaults: any = {
		dashboard: {
			page: {
				title: 'Dashboard',
				desc: 'Latest updates and statistic charts'
			},
		},
		service: {
			users: {
				page: {title: 'Users', desc: ''}
			},
			settings: {
				lookups:{
					vendors: {
						page: {title: 'vendors', desc: ''}
					},
					models: {
						page: {title: 'models', desc: ''}
					},
					'complaint-categories': {
						page: {title: 'complaint categories', desc: ''}
					},
					'complaint-types': {
						page: {title: 'complaint types', desc: ''}
					}
				}
			}
		},
		header: {
			actions: {
				page: {title: 'Actions', desc: 'Actions example page'}
			}
		},
		profile: {
			page: {title: 'User Profile', desc: ''}
		},
		error: {
			404: {
				page: {title: '404 Not Found', desc: '', subheader: false}
			},
			403: {
				page: {title: '403 Access Forbidden', desc: '', subheader: false}
			}
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
