import { UserWithToken } from '@shop/types'
import { createStore, select, setProps, withProps } from '@ngneat/elf'
import { Injectable } from '@angular/core'

interface AuthProps extends Partial<UserWithToken> {
	loggedIn: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthRepository {
	private store = createStore({ name: 'auth' }, withProps<AuthProps>({ loggedIn: false }))

	user$ = this.store.pipe(select(state => state.user))
	token$ = this.store.pipe(select(state => state.token))

	login(data: AuthProps): void {
		this.store.update(setProps(state => ({ ...state, ...data })))
	}
}
