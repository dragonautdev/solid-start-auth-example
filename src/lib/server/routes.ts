import { redirect } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";

export function protectedRoute() {
  const session = getRequestEvent()?.locals.session;

  if (!session) {
    return redirect('/auth');
  }
}