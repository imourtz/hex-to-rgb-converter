import React from "react";
import hexRgb from "hex-rgb";
import { Header } from "./components/Header/Header";
import { HexInputField } from "./components/HexInputField/HexInputField";
import { Results } from "./components/Results/Results";

class HexInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      inputValue: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.demoDisplay = this.demoDisplay.bind(this);
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    try {
      const hex = this.state.inputValue;
      const rgb = hexRgb(hex);
      const newHistory = [...this.state.history];

      newHistory.unshift({
        hex,
        rgb,
      });

      this.setState({
        inputValue: "",
        history: newHistory,
        copySuccess: "",
      });
      const storeString = JSON.stringify(newHistory);
      localStorage.setItem("History", storeString);
    } catch (error) {
      alert(error);
    }
  }

  handleClear() {
    this.setState({ history: [] });
    localStorage.clear("History");
  }

  demoDisplay() {
    const demoHistory = [...this.state.history];
    demoHistory.unshift(
      { hex: "ccc", rgb: { red: 204, green: 204, blue: 204, alpha: 1 } },
      { hex: "bbb", rgb: { red: 187, green: 187, blue: 187, alpha: 1 } },
      { hex: "333", rgb: { red: 51, green: 51, blue: 51, alpha: 1 } }
    );
    this.setState({ history: demoHistory });
  }

  componentDidMount() {
    const storage = localStorage.getItem("History");
    const storageObject = JSON.parse(storage) || [];
    this.setState({ history: storageObject });
  }

  render() {
    return (
      <div>
        <Header disabled={this.state.history.length} demo={this.demoDisplay} />
        <HexInputField
          handleSubmit={this.handleSubmit}
          value={this.state.inputValue}
          handleChange={this.handleChange}
        />
        {this.state.history.length !== 0 && (
          <Results
            history={this.state.history}
            handleClear={this.handleClear}
          />
        )}
      </div>
    );
  }
}

export default HexInput;
