import { Injectable } from '@angular/core'
import { EffectFn } from '@ngneat/effects-ng'
import { AuthRequest } from '@shop/types'
import { Observable, switchMap } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable()
export class AuthEffects extends EffectFn {
	searchTodo = this.createEffectFn((searchTerm$: Observable<AuthRequest>) =>
		searchTerm$.pipe(switchMap(searchTerm => this.authService.login(searchTerm))),
	)

	constructor(private readonly authService: AuthService) {
		super()
	}
}
