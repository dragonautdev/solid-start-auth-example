import {
  action,
  cache,
  createAsync,
  redirect,
  RouteDefinition,
  RouteSectionProps,
  useAction,
} from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { auth } from "~/lib/server";

const login = action(async (email: string, password: string) => {
  "use server";
  try {
    await auth.authenticate(email, password);
  } catch (err) {
    return err as Error;
  }
  throw redirect("/", {
    revalidate: "session",
  });
});

export default function Auth() {
  const loginAction = useAction(login);

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log(email(), password());
    try {
      const result = await loginAction(email(), password());
      if (result instanceof Error) {
        setError(result.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div class="flex flex-col w-full h-full items-center justify-center align-middle">
        <div class="">
          <form onSubmit={handleSubmit}>
            <div class="flex flex-col gap-4">
              {error() && <p class="text-red-500">{error()}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              class="text-black "
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              class="text-black "
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <button type="submit" class="py-4 px-8 rounded-sm bg-green-800">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
