import { createServerData$ } from "solid-start/server";

const cart: Array<any> = [];

export const getCart = () => {
    console.log("GETTING CART...");
    return [...cart]
};

export const addToCart = (item: any) => {
    cart.push(item);
}

export const removeFromCart = (id: number) => {
    const index = cart.findIndex(c => c.id === id);
    cart.splice(index, 1);
}