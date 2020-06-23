import React from "react";
import styled from "styled-components";
import CopyIcon from "../../CopyIcon";

const Confirmation = styled.div`
  display: flex;
  font-size: 16px;
  position: absolute;
  top: 20%;
  left: 120%;
`;

export class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

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
              const color = `rgba(${item.rgb.red}, ${item.rgb.green}, ${item.rgb.blue}, ${item.rgb.alpha})`;
              return (
                <div className='mb-3' key={index} style={{ padding: 10 }}>
                  <div>
                    <li className='history-color'>
                      <span>{`${item.hex} = ${color}`}</span>
                    </li>
                    <button
                      className='btn position-relative d-flex justify-content-center align-items-center colorLink'
                      onClick={() => {
                        window.navigator.clipboard
                          .writeText(color)
                          .then(() => {
                            this.setState({ modal: true });
                            setTimeout(
                              () => this.setState({ modal: false }),
                              1500
                            );
                          })
                          .catch(() => {
                            alert("Ooops! Something went wrong!");
                          });
                      }}
                      style={{ backgroundColor: color }}
                    >
                      <CopyIcon />
                      {this.state.modal && (
                        <Confirmation>
                          <img src='/check.svg' alt='check' /> Copied
                        </Confirmation>
                      )}
                    </button>
                  </div>
                </div>
              );
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
