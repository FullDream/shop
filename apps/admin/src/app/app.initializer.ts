import { Actions } from '@ngneat/effects-ng'
import { devTools } from '@ngneat/elf-devtools'

export const appInitializer = (actions: Actions): any => {
	return devTools({
		name: 'Shop Admin',
		actionsDispatcher: actions,
	})
}
