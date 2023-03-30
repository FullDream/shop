import { APP_INITIALIZER, NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideEffectsManager } from '@ngneat/effects-ng'
import { appInitializer } from './app.initializer'
import { Actions } from '@ngneat/effects'

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
	providers: [
		provideEffectsManager(),
		Actions,
		{
			provide: APP_INITIALIZER,
			multi: true,
			useFactory: () => appInitializer,
			deps: [Actions],
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
