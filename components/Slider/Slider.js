import React from "react";
import styles from "./slider.css";

export default class Slider extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isDown: false
        };

        this.handleMousedown = this.handleMousedown.bind(this);
        this.handleMousemove = this.handleMousemove.bind(this);
        this.handleMouseup   = this.handleMouseup.bind(this);
        this.handleClick     = this.handleClick.bind(this);
        this.getElementLeft  = this.getElementLeft.bind(this);
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMousemove, false);
        window.addEventListener('mouseup', this.handleMouseup, false);
    }


    getElementLeft(element) {
        var actualLeft  = element.offsetLeft;
        var currentElem= element.offsetParent;
        while(currentElem !== null) {
            actualLeft += currentElem.offsetLeft;
            currentElem = currentElem.offsetParent;
        }
        return actualLeft;
    }

    handleMousedown(e) {
        this.setState({
            isDown  : true,
            offsetX : e.clientX - this.getElementLeft(e.currentTarget)
        });
    }

    handleMousemove(e) {
        if(this.state.isDown) {
            var handle = this.refs.handle;
            var range  = this.refs.handle.parentNode;
            var fill   = this.refs.handle.previousSibling;
            var left   = this.getElementLeft(range);
            
            var r      = handle.clientWidth / 2;
            var max    = range.clientWidth - 2 * r;
            var  x   = e.clientX - this.state.offsetX  - left;
            
            if(x <= 0) {
                x = 0
            }else if (x >= max) {
                x = max
            }
            var result = Math.floor( (x / max).toFixed(2) * 10);
            if(result >= 10) {
                result = 10;
            }
            this.setState({
                result:  result,
            });
            handle.style.left = x + 'px';
            fill.style.width = x + r + 'px';
        }
    }

    handleMouseup() {
        this.setState({
            isDown: false
        })
    }

    handleClick(e) {
        var handle = this.refs.handle;
        var range  = this.refs.handle.parentNode;
        var fill   = this.refs.handle.previousSibling;
        var left   = this.getElementLeft(range);

        var r      = handle.clientWidth / 2;
        var max    = range.clientWidth - 2 * r;
        var  x     = e.clientX - r - left;
        
        if(x < 0) {
            handle.style.left = 0  + 'px';
            fill.style.width = r + 'px';
        }else if( x > max) {
            handle.style.left = max  + 'px';
            fill.style.width = max + r + 'px';
        }else {
            handle.style.left = x  + 'px';
            fill.style.width = x + r + 'px';
        }
        var result = Math.floor( (x / max).toFixed(2) * 10);
        if(result >= 10) {
            result = 10;
        }
        if(result < 0) {
            result = 0;
        }
        this.setState({
            result:  result,
        });
    }

    render() {
        return (
            <div className={styles.slider}>
                <div className={styles.slider_range} onClick={this.handleClick}>
                    <div className={styles.slider_fill}></div>
                    <div className={styles.slider_handle} id="slider_handle" ref="handle" onMouseDown={this.handleMousedown} onMouseUp={this.handleMouseup}></div>
                </div>
                <input className={styles.slider_result} type="text" value={this.state.result}/>
            </div>
        )
    }
}