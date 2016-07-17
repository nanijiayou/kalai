import React from 'react';
import { render } from 'react-dom';
import { Search } from "./index";

export default class Test extends React.Component{
    constructor(props) {
        super(props);
    } 
    
    componentDidMount() {
         
    }
    
    render() {
        return (
            <div>
                <h1>搜索</h1>
                <Search />
            </div>
        )
    }
}

render(<Test />, document.getElementById("container"));
