import React from 'react';
import hexRgb from 'hex-rgb';
import IconCopy from './IconCopy';

class HexInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            inputValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.demoDisplay = this.demoDisplay.bind(this); 
    }
       
    handleChange(e) {
        this.setState({inputValue: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        try {
            const hex = this.state.inputValue;
            const rgb = hexRgb(hex);
            const newHistory = [...this.state.history];

            newHistory.unshift({
                hex,
                rgb
            });

            this.setState({
                inputValue: '',
                history: newHistory,
                copySuccess: ''
            })
            const storeString = JSON.stringify(newHistory);
            localStorage.setItem('History', storeString)  
        }
        catch (error) {
           alert(error);
        }
    }

    handleClear() {
        this.setState({history: []});
        localStorage.clear('History')
    }

    demoDisplay() {
        const demoHistory = [...this.state.history];
        demoHistory.unshift(
            {"hex": "ccc", "rgb": {"red": 204, "green": 204, "blue": 204, "alpha": 1}},
            {"hex": "bbb", "rgb": {"red": 187, "green": 187, "blue": 187, "alpha": 1}},
            {"hex": "333", "rgb": {"red": 51, "green": 51, "blue": 51, "alpha": 1}}
            )
        this.setState({history: demoHistory})
    }

    componentDidMount() {
        const storage = localStorage.getItem('History');
        const storageObject = JSON.parse(storage) || [];
        this.setState({history:storageObject})
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="jumbotron mt-3">
                        <h1 className="display-4">Welcome to HEX to RGB Converter!</h1>
                        <p>To convert your HEX color code to RGB please insert your code below.</p>
                        <div>
                            <button className="btn btn-outline-primary" disabled={this.state.history.length !== 0} onClick={this.demoDisplay}>DEMO</button>
                        </div>
                    </div>   
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6">
                            <div className="input-group mb-3">
                                <input className="form-control" type="text" value={this.state.inputValue} onChange={this.handleChange} required placeholder="HEX:" />                
                                <div className="input-group-append">
                                    <button className="btn btn-outline-primary" type="submit" value="Submit">Convert</button>
                                </div> 
                            </div>
                        </div>
                    </div>
                    {this.state.history.length !== 0 ? (
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6">
                                <div className="d-block p-2 bg-dark text-white">
                                    <p>Your History:</p>
                                </div>
                                <ul>
                                    {this.state.history.map((item, index) => {
                                        const color = `rgba(${item.rgb.red}, ${item.rgb.green}, ${item.rgb.blue}, ${item.rgb.alpha})`
                                        return (
                                            <div key={index} style={{padding: 10}}>
                                                <div>
                                                    <li className="history-color"><span>{`${item.hex} = ${color}`}</span></li>
                                                     <span className="d-flex justify-content-center align-items-center colorLink" onClick={() => {
                                                         window.navigator.clipboard.writeText(color)
                                                            .then(() => {})
                                                            .catch(() => {alert('Ooops! Something went wrong!')})
                                                     }} style={{backgroundColor: color}}><IconCopy /></span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </ul>
                                <button className="btn btn-outline-primary" onClick={this.handleClear}>Clear History</button>
                            </div>                    
                        </div>
                    ) : null}
                </form>
            </div>
        );
    }
}

export default HexInput;