import { cache, redirect } from '@solidjs/router'
import { ensureAuthenticated, logout } from './auth'

export const loadUserData = cache(async () => {
  'use server';
  try {
    const session = ensureAuthenticated()
    const result = {
      ...session,
      name: 'John Doe',
      avatar: 'https://avatars.githubusercontent.com/u/123456?v=4',
    }
    return result 
  } catch (error: any) {
    await logout()
    return redirect(`/login`, {
      revalidate: ['session', 'user']
    })
  }
}, 'user')
