import React from 'react';
import {render} from 'react-dom';
import Search from './components/Search/Search';
import Slider from './components/Slider/Slider';
import SelectSlider from './components/Slider/SelectSlider';
import DateRange from './components/DateRange/DateRange';


export default class App extends React.Component{
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h2>搜索组建</h2>
                <Search />
                <h2>slider组建</h2>
                <h3>1. normal slider</h3>
                <Slider />
                <h3>2. Select slider</h3>
                <SelectSlider name="美食" type="food" /> 
                
                <h2>date range picker</h2>
                <DateRange />
            </div>
        )
    }
}

    
render(<App />, document.getElementById('container'));

