import React from 'react';
import { render } from 'react-dom';
import { Search, Slider, SelectSlider, DateRange } from "./index";

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
                <h1>slider</h1>
                <h2>normal slider</h2>
                <Slider />
                <h2>select slider</h2>
                <SelectSlider name="购物中心" type="mall"/>
                <h1>日期组建</h1>
                <DateRange />
            </div>
        )
    }
}

render(<Test />, document.getElementById("container"));
