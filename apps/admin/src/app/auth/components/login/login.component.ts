import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { AuthService } from '../../state/auth.service'
import { Subject } from 'rxjs'
import { AuthEffects } from '../../state/auth.effects'
@Component({
	selector: 'admin-login',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
	providers: [AuthEffects],
	templateUrl: './login.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	form!: FormGroup

	readonly formSubmit$ = new Subject()

	private fb = inject(FormBuilder)
	private authService = inject(AuthService)
	constructor(private authEffects: AuthEffects) {
		this.form = this.fb.nonNullable.group({
			email: ['', [Validators.email, Validators.required]],
			password: ['', [Validators.required]],
		})

		// this.authState.hold(
		// 	this.formSubmit$.pipe(
		// 		concatMap(() => {
		// 			if (this.form.invalid) return EMPTY
		// 			return this.authService.login(this.form.value)
		// 		}),
		// 	),
		// )
	}

	onSubmit(): void {
		this.authEffects.searchTodo(this.form.value)
	}
}
