import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthRequest, UserWithToken } from '@shop/types'
import { Observable, tap } from 'rxjs'
import { AUTH_STATE } from './auth.state'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private http = inject(HttpClient)
	private authState = inject(AUTH_STATE)
	register(data: AuthRequest): Observable<UserWithToken> {
		return this.http.post<UserWithToken>('/api/auth/register', data)
	}

	login(data: AuthRequest): Observable<UserWithToken> {
		return this.http
			.post<UserWithToken>('/api/auth/login', data)
			.pipe(tap(res => this.authState.set(res)))
	}
}
