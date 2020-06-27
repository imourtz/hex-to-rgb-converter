import React from "react";

export const Header = (props) => {
  const { disabled, demo } = props;
  return (
    <div className='container'>
      <div className='jumbotron mt-3'>
        <h1 className='display-4 text-center '>
          Welcome to HEX to RGB Converter!
        </h1>
        <p className='text-center'>
          To get started enter a hex code or click the button below to see an
          example of converted values
        </p>
        <div className='d-flex justify-content-center mt-3'>
          <button
            className='btn btn-outline-primary'
            disabled={disabled}
            onClick={demo}
          >
            DEMO
          </button>
        </div>
      </div>
    </div>
  );
};
