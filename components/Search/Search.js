import React from "react";
import $ from "jquery";
import styles from "./seacrh.css";

export default class Search extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            searchText: '',
            hasRes: true,
            clear: false,
            resList: []
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.onUserClear  = this.onUserClear.bind(this);
        this.onHandleError = this.onHandleError.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount () {
        this.setState = ({
            searchText: '',
            hasRes: true,
            clear: false,
            resList: []
        });
    }

    handleUserInput(searchText, hasRes, clear, resList) {
        this.setState({
            searchText: searchText,
            hasRes: hasRes,
            clear: clear,
            resList : resList
        });
        if(searchText.trim()) {
            $.ajax({
                url: 'http://api.map.baidu.com/place/v2/search?callback=?',
                dataType: 'json',
                type: 'GET',
                data: {
                    q: searchText,
                    region: '北京',
                    output: 'json',
                    ak: '49a6b40a5317c53bf50fe94976b928b4'
                },
                success: function(rs) {
                    var lists = rs.results;
                    if(lists && lists.length) {
                        this.setState({
                            hasRes: hasRes,
                            clear: true,
                            resList : lists
                        });
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                }.bind(this)
            })
        }else {
            this.setState({
                hasRes: hasRes,
                clear: false,
                resList : []
            });
        }
    }


    onUserClear(searchText, hasRes, clear, resList) {
        this.setState({
            searchText: searchText,
            hasRes: hasRes,
            clear: clear,
            resList : [],
        });
    }

    onHandleError() {
        this.setState({
            error: '',
            noSearch: false
        });
    }

    render() {
        return (
            <div className={styles.search}>
                <div className="analysisItem">
                    <SearchInput selects={this.state.selects} searchText={this.state.searchText}
                                 resList={this.state.resList} hasRes={this.state.hasRes} clear={this.state.clear}
                                 error={this.state.error} noSearch={this.state.noSearch}
                                 onUserInput   = {this.handleUserInput}
                                 onUserClear   = {this.onUserClear}
                                 onHandleError = {this.onHandleError}
                    />
                </div>
            </div>
        );
    }
};

var SearchInput = React.createClass({
    handleChange() {
        this.props.onUserInput(
            this.refs.searchText.value,
            true,
            false,
            []
        )
    },

    handleClear(event) {
        event.preventDefault();
        this.props.onUserClear(
            this.refs.searchText.value,
            true,
            false,
            []
        )
    },

    handleError() {
        event.preventDefault();
        this.props.onHandleError();
    },

    render() {
        return (
            <div>
                <div className={styles.item}>
                    {this.props.clear ? <span className={styles.clear} onClick={this.handleClear}>x</span> : null}
                    <input className={this.props.error} type="text" placeholder="输入地址" value={this.props.searchText} ref="searchText" onChange={this.handleChange} onClick={this.handleError}/>
                    <button className={styles.searchBtn} onClick={this.handleNodata}>查询</button>
                    <ResultList filterText={this.props.filterText} searchText={this.props.searchText} resList={this.props.resList} onUserSelect={this.props.onUserSelect} />
                </div>
            </div>
        );
    }
});

var ResultList = React.createClass({
    handleAdd(event) {
        var choseNode = {
            name: event.currentTarget.innerText,
            id: event.currentTarget.id
        };
    },

    render() {
        var rsLis = [];
        this.props.resList.forEach(function (re, i) {
            rsLis.push(<li key={i} onClick={this.handleAdd} id={re.region_id}>{re.address}</li>);
        }.bind(this));
        return (
            <ul className={styles.responseList}>{rsLis}</ul>
        )
    }
});