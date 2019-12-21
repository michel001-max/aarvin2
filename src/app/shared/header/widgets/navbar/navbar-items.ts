// Menu
export interface Menu {
  path?: string;
  title?: string;
  type?: string;
  megaMenu?: boolean;
  megaMenuType?: string; // small, medium, large
  image?: string;
  children?: Menu[];
}

export const MENUITEMS: Menu[] = [
	{
		title: 'home', type: 'sub'
	},
	{
		title: 'products', type: 'subb', megaMenu: true, megaMenuType: 'medium'
	},
]