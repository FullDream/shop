import { InjectionToken } from '@angular/core'
import { UserWithToken } from '@shop/types'
import { RxState } from '@rx-angular/state'

export interface AuthState extends UserWithToken {}

export const AUTH_STATE = new InjectionToken<RxState<AuthState>>('GLOBAL_RX_STATE')
