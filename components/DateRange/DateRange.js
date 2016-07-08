import React from "react";
import PickerDateRange from "./pickerDateRange";
import formatDate from "./formatDate";
import styles from "./dateRange.css";

export default class DateRange extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var startDate = formatDate(new Date(new Date() - 86400000));
        var endDate = formatDate(new Date());
        function getDateDiff(startDate,endDate) {
            var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
            var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
            var dates = Math.abs((startTime - endTime))/(1000*60*60*24);
            return dates;
        }
        
        var option = {
            theme: 'ta', // 日期选择器TA主题
            autoCommit: false, //自动提交，完成日期初始化，以及图表的展示拉取
            target: 'datePicker',
            startDate: startDate,
            endDate: endDate,
            isTodayValid: true,
            ableCertainDays:['2015-05-01', '2015-06-12'],
            success: function(rs) {
                var daysDiff = getDateDiff(rs.startDate, rs.endDate);
                var dateRange = {
                    startDate: rs.startDate + ' 00:00:00',
                    endDate: rs.endDate + ' 23:00:00'
                }
                
            }
        }
        var dateRange = new PickerDateRange("date", option);
    }

    
    render() {
        return (
            <div className="date" id="div_date">
                <span className="date_title" id="date"></span>
                <a className="opt_sel" id="input_trigger" href="#">
                    <i className="i_orderd"></i>
                </a>
            </div>
        )
    }
};
