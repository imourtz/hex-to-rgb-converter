import React from "react";
import { Output } from "../Output/Output";

export class Results extends React.Component {
  render() {
    const { handleClear, history } = this.props;
    return (
      <div className='row justify-content-center'>
        <div className='col-12 col-md-6'>
          <div className='d-block p-2 bg-dark text-white mt-4 mb-4'>
            <p>Your Results:</p>
          </div>
          <ul className='pl-0'>
            {history?.map((item, index) => {
              return <Output item={item} index={index} />;
            })}
          </ul>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-outline-primary' onClick={handleClear}>
              Clear Results
            </button>
          </div>
        </div>
      </div>
    );
  }
}
