import React, {Component} from 'react';
import './assets/App.css';
import './assets/media.css';
import _ from "lodash";
import {Helmet} from "react-helmet";
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            data: JSON.parse(localStorage.getItem('data')) || [],
            hide: false,
            toggleMenu: false,
        }
    }

    changed = (event) => {
        this.setState({value: event.target.value});
    }
    add = () => {
        const {value, data} = this.state;
        data.push({
            id: _.uniqueId(),
            value,
            done: false,
            hide: false
        })
        localStorage.setItem("data", JSON.stringify(data));
        this.setState({data, value: ''});
    }
    clear = (id) => {
        let {data} = this.state;
        data = data.filter(item => item.id !== id);
        this.setState({data});
    }
    done = (id) => {
        let {data} = this.state;
        data = data.map(item => {
            if (item.id === id) {
                item.done = !item.done;
            }
            return item;
        })
        this.setState({data});
    }
    hider = () => {
        let {hide} = this.state;
        this.setState({hide: !hide});
    }
    toggle = () => {
        let {toggleMenu} = this.state;
        this.setState({toggleMenu: !toggleMenu});
    }
    deleteCancel = () => {
        this.setState({toggleMenu: false});
    }

    render() {
        const {value, data, hide, toggleMenu} = this.state;
        return (
            <div>
                <div id='todo'>
                    <div className={"hide_div"}>
                        <input onClick={this.hider} type={"checkbox"}/>
                        <h4 className={"hide_h4"}>Hide completed</h4>
                    </div>
                    <h3 className={"input_place_h3"}>Task</h3>
                    <div className='input_place'>
                        <div className={"input_div"}>
                            <input className='todo_input' type={'search'} value={value} onChange={this.changed}
                                   placeholder={"Write here"}
                                   style={value.length > 54 ? {"border": "1px solid red"} : null}
                            />
                            {value.length > 54 ?
                                <p className={"valid_danger"}>Task content can contain max 54 character</p> : null}
                        </div>
                        <div className={"add_div"}>
                            <button className='adder'
                                    onClick={value.length < 54 && value.length > 0 ? this.add : null}>Add
                            </button>
                        </div>
                    </div>

                    {
                        data.length > 0 ?
                            <div className='submit_place'>
                                <ul className='list_ul'>
                                    {data.map(item => (

                                        <li className='list_li' key={item.id}
                                            style={hide && item.done ? {"display": "none"} : null}>
                                            <div>
                                                <input className={"done"} type={"checkbox"}
                                                       onClick={() => this.done(item.id)}/>
                                                {item.done ? <span style={{color: "#ACACAC"}}> {item.value}</span> :
                                                    <span> {item.value}</span>}
                                            </div>
                                            <button className='delete' onClick={this.toggle}>X</button>
                                            {
                                                toggleMenu ?
                                                    <div className={"delete_request"}>
                                                        <Helmet>
                                                            <style>{'body { background: rgba(0, 0, 0, 0.25); }'}</style>
                                                        </Helmet>
                                                        <h3 className={"delete_h3"}>Are you sure you want to
                                                            delete?</h3>
                                                        <button className={"delete_yes"}
                                                                onClick={() => this.clear(item.id)}>Yes
                                                        </button>
                                                        <button className={"delete_no"} onClick={this.deleteCancel}>No
                                                        </button>
                                                    </div> : null
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            :
                            <div>
                                <h2 className={"empty_h2"}>Your life is a blank page. You write on it</h2>
                                <h1 className={"empty_h1"}>So start by adding your tasks here.</h1>
                            </div>}

                </div>
            </div>
        )
    }
}

export default App;

