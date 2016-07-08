import React from 'react';
import {render} from 'react-dom';
import Search from './components/Search/Search';
import Slider from './components/Slider/Slider';
import SelectSlider from './components/Slider/SelectSlider';
import DateRange from './components/DateRange/DateRange';
import Timeline from './components/Timeline/Timeline';


export default class App extends React.Component{
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h2>1. 搜索组建</h2>
                <Search />
                
                <h2>2. slider组建</h2>
                <h3>1. normal slider</h3>
                <Slider />
                <h3>2. Select slider</h3>
                <SelectSlider name="美食" type="food" /> 
                
                <h2>3. 日期选择组建</h2>
                <div style={{height:35,width:400}}>
                    <DateRange />
                </div>
                
                <h2>4. 时间轴</h2> 
                <Timeline />
            </div>
        )
    }
}

    
render(<App />, document.getElementById('container'));

