import { A, createAsync, RouteDefinition } from "@solidjs/router";
import { Show, Suspense } from "solid-js";
import { loadInstallation } from "~/lib/server/app";

export const route = {
  preload: async () => {
    loadInstallation()
  }
} satisfies RouteDefinition;

export default function Home() {

  const installation = createAsync(() => loadInstallation(), { deferStream: true });

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Hello world!</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Show when={installation()}>
          <div>
            <h1>Welcome {installation()?.accountId}</h1> 
          </div>  
        </Show> 
      </Suspense>
    </main>
  );
}
