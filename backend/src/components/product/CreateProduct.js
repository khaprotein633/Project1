import React from 'react'

const CreateProduct = () => {
  return (
    
    <form className="form-horizontal" onSubmit=''>
    <legend>PRODUCTS</legend>

    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="product_id">
        PRODUCT ID
      </label>
      <div className="col-md-4">
        <input
          id="product_id"
          name="product_id"
          placeholder="Enter PRODUCT ID"
          className="form-control input-md"
          required
          type="text"
        />
      </div>
    </div>

    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="product_name">
        PRODUCT NAME
      </label>
      <div className="col-md-4">
        <input
          id="product_name"
          name="product_name"
          placeholder="Enter PRODUCT NAME"
          className="form-control input-md"
          required
          type="text"
        />
      </div>
    </div>

    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="product_description">
        PRODUCT DESCRIPTION
      </label>
      <div className="col-md-4">
        <textarea
          className="form-control"
          id="product_description"
          name="product_description"
          placeholder="Enter PRODUCT DESCRIPTION"
          required
        />
      </div>
    </div>

    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="product_category">
        PRODUCT CATEGORY
      </label>
      <div className="col-md-4">
        <select id="product_category" name="product_category" className="form-control" required>
          <option value="">Select a category</option>
          {/* Add options here */}
        </select>
      </div>
    </div>

    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="available_quantity">
        AVAILABLE QUANTITY
      </label>
      <div className="col-md-4">
        <input
          id="available_quantity"
          name="available_quantity"
          placeholder="Enter AVAILABLE QUANTITY"
          className="form-control input-md"
          required
          type="number"
        />
      </div>
    </div>

    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="product_weight">
        PRODUCT WEIGHT
      </label>
      <div className="col-md-4">
        <input
          id="product_weight"
          name="product_weight"
          placeholder="Enter PRODUCT WEIGHT"
          className="form-control input-md"
          required
          type="number"
        />
      </div>
    </div>

    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="percentage_discount">
        PERCENTAGE DISCOUNT
      </label>
      <div className="col-md-4">
        <input
          id="percentage_discount"
          name="percentage_discount"
          placeholder="Enter PERCENTAGE DISCOUNT"
          className="form-control input-md"
          required
          type="number"
        />
      </div>
    </div>

    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="stock_alert">
        STOCK ALERT
      </label>
      <div className="col-md-4">
        <input
          id="stock_alert"
          name="stock_alert"
          placeholder="Enter STOCK ALERT"
          className="form-control input-md"
          required
          type="number"
        />
      </div>
    </div>

    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="stock_critical">
        STOCK CRITICAL
      </label>
      <div className="col-md-4">
        <input
          id="stock_critical"
          name="stock_critical"
          placeholder="Enter STOCK CRITICAL"
          className="form-control input-md"
          required
          type="number"
        />
      </div>
    </div>

    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="tutorial">
        TUTORIAL
      </label>
      <div className="col-md-4">
        <input
          id="tutorial"
          name="tutorial"
          placeholder="Enter TUTORIAL"
          className="form-control input-md"
          required
          type="text"
        />
      </div>
    </div>

    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="author">
        AUTHOR
      </label>
      <div className="col-md-4">
        <input
          id="author"
          name="author"
          placeholder="Enter AUTHOR"
          className="form-control input-md"
          required
          type="text"
        />
      </div>
    </div>

    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="file_main_image">
        MAIN IMAGE
      </label>
      <div className="col-md-4">
        <input id="file_main_image" name="file_main_image" className="input-file" type="file" />
      </div>
    </div>

    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="file_auxiliary_images">
        AUXILIARY IMAGES
      </label>
      <div className="col-md-4">
        <input id="file_auxiliary_images" name="file_auxiliary_images" className="input-file" type="file" />
      </div>
    </div>

    <div className="form-group">
      <div className="col-md-4 col-md-offset-4">
        <button id="singlebutton" name="singlebutton" className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </div>
  </form>
  )
}

export default CreateProduct
