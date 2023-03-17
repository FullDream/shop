import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { AuthService } from '../../state/auth.service'
import { AuthState, AUTH_STATE } from '../../state/auth.state'
import { concatMap, EMPTY, exhaustMap, mergeMap, Subject, tap } from 'rxjs'
import { RxState } from '@rx-angular/state'
@Component({
	selector: 'admin-login',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
	templateUrl: './login.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	form!: FormGroup

	authState$ = this.authState.select('token')

	readonly formSubmit$ = new Subject()

	private fb = inject(FormBuilder)
	private authService = inject(AuthService)
	constructor(@Inject(AUTH_STATE) private authState: RxState<AuthState>) {
		this.form = this.fb.nonNullable.group({
			email: ['', [Validators.email, Validators.required]],
			password: ['', [Validators.required]],
		})

		this.authState.hold(
			this.formSubmit$.pipe(
				exhaustMap(() => {
					if (this.form.invalid) return EMPTY
					return this.authService.login(this.form.value)
				}),
			),
		)
	}

	onSubmit(): void {
		this.authService.login(this.form.value).subscribe(res => console.log(res))
	}
}
