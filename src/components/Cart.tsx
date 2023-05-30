import { For, ParentComponent, Resource, Show, Suspense, createResource, createSignal } from "solid-js";
import { FormProps } from "solid-start";
import { createServerAction$, createServerData$ } from "solid-start/server";
import { getCart, removeFromCart } from "~/cart";

type CartItemProps = {
    Form: ParentComponent<FormProps>;
    product: any;
}
function CartItem({ Form, product }: CartItemProps) {
    return (
        <div class="flex flex-row space-x-4">
            <img src={product.thumbnail} class="w-10 h-10 object-cover" />
            <div class="w-40">
                { product.title }
            </div>
            <Form>
                <input type="hidden" name="id" value={product.id} />
                <button type="submit" class="text-red-800 font-bold">X</button>
            </Form>
        </div>
    )
}

export default function Cart() {
    const [isOpen, setIsOpen] = createSignal(false);

    const products = createServerData$(
        getCart,
        { key: ["cart"] }
    )    

    const [_, { Form }] = createServerAction$(async (form: FormData, { request }) => {
        const productId = Number(form.get("id"));
        removeFromCart(productId);
      }, {
        invalidate: 'cart'
      });

    return (
        <div class="text-orange-600" >
            <svg onClick={() => setIsOpen((open) => !open)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <Show when={isOpen()}>
                <div class="absolute right-10 mt-4 bg-white p-6 border-gray-500 shadow-lg space-y-4">
                    <Suspense fallback={<p>Un instant...</p>}>
                        <For each={products()}>
                            {(product) => (
                                <CartItem Form={Form} product={product} />
                            )}
                        </For>
                    </Suspense>
                </div>
            </Show>
        </div>
    );
}
