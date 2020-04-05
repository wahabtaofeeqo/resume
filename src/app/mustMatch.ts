import { FormGroup } from '@angular/forms';

export function PasswordValidator(password: string, cPassword: string) {
	return (formGroup: FormGroup) => {
		const pass = formGroup.controls[password];
		const cpass = formGroup.controls[cPassword];

		if (cpass.errors) {
			return;
		}

		if (pass.value !== cpass.value) {
			cpass.setErrors({mustMatch: true})
		}
		else {
			cpass.setErrors(null);
		}
	}
}