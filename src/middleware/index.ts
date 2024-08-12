import { createMiddleware } from '@solidjs/start/middleware'
import authMiddleware from './auth'


export default createMiddleware({
  onRequest: [authMiddleware]
})