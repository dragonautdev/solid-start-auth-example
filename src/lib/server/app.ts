
import { getQuery } from 'vinxi/http'
import { cache, redirect } from '@solidjs/router'
// import { installations } from '@glue/apps-common/lib'
import { INTERNAL_APP_ID } from '../constants'
import { getRequestEvent } from 'solid-js/web'
import { logout } from './auth'

const accountChanged = (sessionAccountId: string, accountId?: string) => {
  return (accountId && sessionAccountId !== accountId)
}

export const loadInstallation = cache(async () => {
  'use server';
  const request = getRequestEvent()
  const { accountId } = getQuery()
  try {
    let session = request?.locals.session
    if (!session?.appId || !session?.accountId) {
      throw new Error('Unauthorized')
    }
    if (accountChanged(session.accountId!, accountId as string)) {
      throw new Error('Account changed')
    }
    
    const result = {
      appId: INTERNAL_APP_ID,
      accountId: 'y0suibytp7w2c0y',
      enabled: true,
      data: {}
    }
    // await installations.getInstallation(session.data.accountId!, session.data.appId!)
    return result 
  } catch (error: any) {
    console.log('found an error')
    console.log(error)
    await logout()
    
    if (accountId) {
      console.log(`redirecting to auth page with account ${accountId}`)
      return redirect(`/auth?accountId=${accountId}`)
    } else {
      const errorMessage = 'appId and accountId not provided'
      return redirect(`/error?message=${errorMessage}`)
    }
  }
}, 'installation')
