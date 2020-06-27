import React from "react";
import styled from "styled-components";
import CopyIcon from "../../CopyIcon";

const Confirmation = styled.div`
  display: flex;
  font-size: 16px;
  min-width: 4.5rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  color: #4d9032;
  top: 20%;
  left: 140%;
`;

export class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  render() {
    const { item, index } = this.props;
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
                  setTimeout(() => this.setState({ modal: false }), 1500);
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
                <img src='/checkIcon.svg' alt='check' /> Copied
              </Confirmation>
            )}
          </button>
        </div>
      </div>
    );
  }
}
