import { A, createAsync, RouteDefinition } from "@solidjs/router";
import { Show, Suspense } from "solid-js";
import { loadUserData } from "~/lib/server/app";
import { protectedRoute } from "~/lib/server/routes";

export const route = {
  preload: async () => {
    protectedRoute()
    loadUserData()
  }
} satisfies RouteDefinition;

export default function Home() {

  const userData = createAsync(() => loadUserData(), { deferStream: true });

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Hello world!</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Show when={userData()}>
          <div>
            <h1>Welcome {userData()?.name}</h1> 
          </div>  
        </Show> 
      </Suspense>
    </main>
  );
}
