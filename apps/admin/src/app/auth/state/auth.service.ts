import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthRequest, UserWithToken } from '@shop/types'
import { Observable, tap } from 'rxjs'
import { AuthRepository } from './auth.repository'
import { trackRequestResult } from '@ngneat/elf-requests'
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private http = inject(HttpClient)
	private authRepository = inject(AuthRepository)
	register(data: AuthRequest): Observable<UserWithToken> {
		return this.http.post<UserWithToken>('/api/auth/register', data)
	}

	login(data: AuthRequest): Observable<UserWithToken> {
		return this.http.post<UserWithToken>('/api/auth/login', data).pipe(
			tap(res => this.authRepository.login({ ...res, loggedIn: true })),
			trackRequestResult(['auth']),
		)
	}
}
