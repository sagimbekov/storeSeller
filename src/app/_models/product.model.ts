import {User} from './user.model';

export class Product {
	name: string;
	category: number;
	weight: number;
	price: number;
	tags: string;
	content: string;
	seller: User;
	available: number;
}