import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    isLoading: true,
};

export const cartReducer = createReducer(initialState, {
    cartCreateRequest: (state) => {
        state.isLoading = true;
    },
    cartCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        state.success = true;
    },
    cartCreateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    //update cart
    cartUpdateRequest: (state) => {
        state.isLoading = true;
    },
    cartUpdateSuccess: (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        state.success = true;
    },
    cartUpdateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },
    // get carts for update
    getCartByUserIdRequest: (state) => {
        state.isLoading = true;
    },
    // get carts for update
    getCartByUserIdSuccess: (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        state.success = true;
    },
    // get carts for update
    getCartByUserIdFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    // get carts for update
    getCartsForUpdateRequest: (state) => {
        state.isLoading = true;
    },
    // get carts for update
    getCartsForUpdateSuccess: (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        state.success = true;
    },
    // get carts for update
    getCartsForUpdateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },


    // delete cart of a shop
    deleteCartRequest: (state) => {
        state.isLoading = true;
    },
    deleteCartSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteCartFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    // get all carts
    getAllCartsRequest: (state) => {
        state.isLoading = true;
    },
    getAllCartsSuccess: (state, action) => {
        state.isLoading = false;
        state.allCarts = action.payload;
    },
    getAllCartsFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});