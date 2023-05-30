import { A, AnchorProps } from "@solidjs/router";
import { Outlet } from "solid-start";
import Cart from "~/components/Cart";

function NavLink({ children, ...restProps }: AnchorProps) {
  return (
    <A
      activeClass="text-black"
      inactiveClass="text-orange-600 hover:underline underline-offset-2"
      {...restProps}
    >
      {children}
    </A>
  );
}

export default function RootLayout() {
  return (
    <main class="bg-[#e7e7e7] w-full min-h-screen text-gray-800 flex flex-col">
      <header class="border-b border-gray-800 flex flex-row justify-between items-center py-5 px-10">
        <div>
          <h1 class="text-lg font-bold">Little Shop</h1>
        </div>
        <div>
          <nav class="flex flex-row space-x-4">
            <Cart />
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
          </nav>
        </div>
      </header>
      <Outlet />
    </main>
  );
}
