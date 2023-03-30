import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { devTools } from '@ngneat/elf-devtools'
import { AppModule } from './app/app.module'

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.then(() => devTools())
	.catch(err => console.error(err))
