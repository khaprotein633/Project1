import axios from "axios";
import { server } from "../../Config/server";
// create product
export const createProduct =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });
      // const config = {headers :{"Content-Type":"multipart/form-data"}};

      // const {data }= await axios.post(`${server }/product/create-product`,newForm, config);
      const { data } = await axios.post(
        `${server}/product/create-product`,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images
      );
      dispatch({
        type: "productCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// create product
export const updateProduct =
  ({
    id,
    name,
    description,
    category,
    size,
    storage,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productUpdateRequest",
      });
      // const config = {headers :{"Content-Type":"multipart/form-data"}};
      console.log("id", id, name, description, shopId, images);
      // const {data }= await axios.post(`${server }/product/create-product`,newForm, config);

      const { data } = await axios.put(`${server}/product/update-product`, {
        id,
        name,
        description,
        category,
        tags,
        size,
        storage,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images,
      });
      dispatch({
        type: "productUpdateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "productUpdateFail",
        payload: error.response.data.message,
      });
    }
  };

// get Product for update
export const getProductForUpdate = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getProductsForUpdateRequest",
    });

    const { data } = await axios.get(`${server}/product/get-product/${id}`, {
      withCredentials: true,
    });
    console.log("check data", data);
    dispatch({
      type: "getProductsForUpdateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "getProductsForUpdateFail",
      payload: error.response.data.message,
    });
  }
};

// get Product for update
export const getOneProductById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getProductsForUpdateRequest",
    });

    const { data } = await axios.get(`${server}/product/get/${id}`, {
      withCredentials: true,
    });
    console.log("check data", data);
    dispatch({
      type: "getProductsForUpdateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "getProductsForUpdateFail",
      payload: error.response.data.message,
    });
  }
};

//get all products of a shop
// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    console.log("check data", data);
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get`);
    // console.log('data', data);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: "error"
    });
  }
};