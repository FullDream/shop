import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthState, AUTH_STATE } from './auth/state/auth.state'
import { RxState } from '@rx-angular/state'

const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./auth/components/login/login.component').then(c => c.LoginComponent),
	},
	{
		path: '',
		redirectTo: '',
		pathMatch: 'full',
	},
]

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		HttpClientModule,
		MatSidenavModule,
		MatListModule,
		MatTooltipModule,
		MatIconModule,
		BrowserAnimationsModule,
	],
	providers: [{ provide: AUTH_STATE, useFactory: () => new RxState<AuthState>() }],
	bootstrap: [AppComponent],
})
export class AppModule {}
