import React from "react";

export const HexInputField = ({ handleSubmit, value, handleChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-6'>
          <label className='h4'>HEX:</label>
          <div className='input-group mb-3'>
            <input
              className='form-control'
              type='text'
              value={value}
              onChange={handleChange}
              required
              placeholder='eg.#f0f0f0'
            />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-primary'
                type='submit'
                value='Submit'
              >
                Convert
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
