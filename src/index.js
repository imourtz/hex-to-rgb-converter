import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import HexInput from "./HexInput";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<HexInput />, document.getElementById("root"));

serviceWorker.unregister();
