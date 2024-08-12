import { redirect } from '@solidjs/router'
import { RequestMiddleware } from '@solidjs/start/middleware'
import { auth } from '~/lib/server'
import { SessionData } from '~/lib/server/auth'

declare module "@solidjs/start/server" {
  interface RequestEventLocals {
    session?: SessionData
  }
}

const protectedRoutes = ['/', '/settings/', '/_server/']

const _isProtectedRoute = (url: string):boolean => {
  const actualUrl = new URL(url)

  console.log('actualUrl', actualUrl.pathname)
  
  return protectedRoutes.some(route => route.startsWith(actualUrl.pathname))
}

const authMiddleware: RequestMiddleware = async ({ locals, request, response, clientAddress }) => {

  if (_isProtectedRoute(request.url)) {
  
    const session = await auth.getSession()

    if (!session.data.appId || !session.data.appId) {
      console.log('unauthorized')
      return redirect(`/auth`)
    }

    locals.session = session.data
  }
}

export default authMiddleware
