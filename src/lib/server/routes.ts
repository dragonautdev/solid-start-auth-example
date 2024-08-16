import { cache, redirect } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";

export const protectedRoute = cache(() => {
  "use server";
  const session = getRequestEvent()?.locals.session;

  if (!session) {
    return redirect('/login', {
      revalidate: ['session', 'user']
    });
  }

  return session
}, 'session')