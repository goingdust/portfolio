export class ContactFormValues {
	name: string;
	email: string;
	message: string;
	constructor() {
		this.name = '';
		this.email = '';
		this.message = '';
	}
}

export enum ContactFormId {
	Name = 'name',
	Email = 'email',
	Message = 'message',
}

export class ContactFormFocus {
	name: boolean;
	email: boolean;
	message: boolean;
	constructor() {
		this.name = false;
		this.email = false;
		this.message = false;
	}
}
