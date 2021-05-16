export class MenuMohConfig {
	constructor() { }
	public defaults: any = {
		header: {
			self: {},
			items: [],
		},
		aside: {
			self: {},
			items: [
				{
					title: "USER_MANAGEMENT.LIST.USER_MANAGEMENT",
					root: true,
					icon: "flaticon2-user-outline-symbol",
					permission: ["admin"],
					submenu: [
						{
							icon: "flaticon-user",
							title: "USER_MANAGEMENT.LIST.USERS",
							page: "/users",
						},
					],
				},
				{
					title: "MENU.GENERAL_SETTINGS",
					root: true,
					icon: "flaticon-settings",
					permission: ["admin"],
					submenu: [
						{
							title: "MENU.PREDEFINED_MESSAGES",
							root: true,
							icon: "flaticon-email",
							page: "/predefined-messages",
						},
						{
							title: "MENU.BANKING",
							page: "/banking",
							icon: "flaticon-graph",
						},
						{
							title: "MENU.BANKING",
							page: "/bankMoh",
							icon: "flaticon-graph",
						},

					],
				},

			],
		},
	};
	public get configs(): any {
		return this.defaults;
	}
}
