import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    isLoading: true,
};

export const wishListReducer = createReducer(initialState, {
    wishListCreateRequest: (state) => {
        state.isLoading = true;
    },
    wishListCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.wishList = action.payload;
        state.success = true;
    },
    wishListCreateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },
    wishListUpdateRequest: (state) => {
        state.isLoading = true;
    },
    wishListUpdateSuccess: (state, action) => {
        state.isLoading = false;
        state.wishList = state.wishList.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.success = true;
    },
    wishListUpdateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },
      
    //update wishList
    wishListUpdateRequest: (state) => {
        state.isLoading = true;
    },
    wishListUpdateSuccess: (state, action) => {
        state.isLoading = false;
        state.wishList = action.payload;
        state.success = true;
    },
    wishListUpdateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },
    // get wishLists for update
    getWishListByUserIdRequest: (state) => {
        state.isLoading = true;
    },
    // get wishLists for update
    getWishListByUserIdSuccess: (state, action) => {
        state.isLoading = false;
        state.wishList = action.payload;
        state.success = true;
    },
    // get wishLists for update
    getWishListByUserIdFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    // get wishLists for update
    getWishListsForUpdateRequest: (state) => {
        state.isLoading = true;
    },
    // get wishLists for update
    getWishListsForUpdateSuccess: (state, action) => {
        state.isLoading = false;
        state.wishList = action.payload;
        state.success = true;
    },
    // get wishLists for update
    getWishListsForUpdateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },


    // delete wishList of a shop
    deleteWishListRequest: (state) => {
        state.isLoading = true;
    },
    deleteWishListSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteWishListFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    // get all wishLists
    getAllWishListsRequest: (state) => {
        state.isLoading = true;
    },
    getAllWishListsSuccess: (state, action) => {
        state.isLoading = false;
        state.allWishLists = action.payload;
    },
    getAllWishListsFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});