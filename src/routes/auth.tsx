import {
  cache,
  createAsync,
  redirect,
  RouteDefinition,
  RouteSectionProps,
} from "@solidjs/router";
import { Show } from "solid-js";
import { auth } from "~/lib/server";

export const route = {
  preload(params) {
    return authenticate(params.location.query.accountId!);
  },
} satisfies RouteDefinition;

const authenticate = cache(async (accountId: string) => {
  "use server";
  try {
    console.log("running authentication");
    await auth.authenticate(accountId);
  } catch (err) {
    return err as Error;
  }
  console.log('returning redirect')
  throw redirect("/", {
    revalidate: "installation",
  });
}, 'session')

export default function Auth(props: RouteSectionProps) {
  const authenticated = createAsync(() => authenticate(props.location.query.accountId!), { deferStream: true });

  return (
    <>
      <Show
        when={props.location.query.accountId}
        fallback={
          <div>
            <h1>FATAL ERROR</h1>
            <p>Missing accountId and/or appId query parameters</p>
          </div>
        }
      >
        <p>Hello auth</p>
      </Show>
    </>
  );
}
