import React from 'react';
import {render} from 'react-dom';
import {Search,Slider,DateRange,SelectSlider} from './components/entry';


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
                <SelectSlider />
                
                <h2>3. 日期选择组建</h2>
                <div style={{height:35,width:400}}>
                    <DateRange />
                </div>
                
                <h2>4. 时间轴</h2> 
            </div>
        )
    }
}

    
render(<App />, document.getElementById('container'));

