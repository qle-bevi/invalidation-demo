import { useRouteData } from "@solidjs/router";
import { For, Suspense, createEffect } from "solid-js";
import { Title } from "solid-start";
import { createServerAction$, createServerData$ } from "solid-start/server";
import { addToCart } from "~/cart";

export function routeData() {
  return createServerData$(
    () =>
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((json) => json.products),
    { key: () => ["products"] }
  );
}

export default function Products() {
  const products = useRouteData<typeof routeData>();

  const [_, { Form }] = createServerAction$(
    async (form: FormData) => {
      const productId = form.get("id") as string;
      const product = await fetch(
        `https://dummyjson.com/products/${productId}`
      ).then((res) => res.json());
      addToCart(product);
    },
    {
      invalidate: "cart",
    }
  );

  createEffect(() => {
    if (products()) {
      console.log(products()[0]);
    }
  });

  return (
    <div class="p-10 max-w-5xl mx-auto grid grid-cols-3 gap-4">
      <Title>Products</Title>
      <Suspense fallback={<p>loading...</p>}>
        <For each={products()}>
          {(product) => (
            <div class="p-4 bg-white shadow-lg border-gray-500 rounded-md flex flex-col justify-between">
              <div class="space-y-2">
                <img
                  class="w-full h-44 object-cover object-top"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <h3 class="text-lg font-bold">{product.title}</h3>
                <p class="text-sm">{product.description}</p>
              </div>
              <Form>
                <input type="hidden" name="id" value={product.id} />
                <button
                  type="submit"
                  class="bg-orange-600 text-white py-2 w-full text-center mt-6"
                >
                  Add to cart
                </button>
              </Form>
            </div>
          )}
        </For>
      </Suspense>
    </div>
  );
}
