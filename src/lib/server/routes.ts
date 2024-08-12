import { redirect } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";

export function protectedRoute() {
  "use server";
  const session = getRequestEvent()?.locals.session;

  if (!session) {
    return redirect('/login');
  }

  console.log(`Session found ${session.accountId}`)
}