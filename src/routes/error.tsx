import { A, useLocation } from "@solidjs/router";
import { Show } from "solid-js";

export default function BadRequest() {

  const location = useLocation()

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Bad request</h1>
      <Show when={location.query.message} >
        <p>{location.query.message}</p>
      </Show>
      <p class="my-4">
        <A href="/" class="text-sky-600 hover:underline">
          Home
        </A>
        {" - "}
      </p>
    </main>
  );
}
