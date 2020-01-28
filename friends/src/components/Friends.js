import React from 'react';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import { axiosWithAuth } from '../utils/axiosWithAuth.js';
class Friends extends React.Component {
    state = {friends: []};
    componentDidMount() {this.getData();}
    getData = () => {
        // fetch initial data - but it's protected! Use axiosWithAuth to send the token on the header of the request
        axiosWithAuth()
            .get('/api/friends')
            .then(res => {
                // res.data.data
                this.setState({
                    friends: res.friends.friends
                        .filter(
                            price =>
                            price.location === 'US' || price.location === 'State of Hawaii'
                        )
                        .filter(price => price.type === 'Gasoline - Regular')
                })})
            .catch(err => console.log(err))};
    formatData = () => {
        const formattedData = [];
        console.log(this.state.friends);
        this.state.friends.forEach((age, index, arr) => {
            if (age.location === 'US') {
                formattedData.push({
                    name: moment().format(),
                    age: age.age,
                })}});
        return formattedData};
    render() {
        const friends = this.formatData();
        console.log(friends);
        return (
            <div className="gas-prices">
                <div className="title-wrapper">
                    <div className="title">
                        <div className="inner-wrapper">
                            <div className="top-title">Gas Comparison</div>
                            <div className="bottom-title">Continental US vs Hawaii</div>
                        </div>
                    </div>
                </div>
                <div className="key">
                    <div className="US-key" />
                    <p className="US-key-text">Continental US Prices</p>
                    <div className="Hawaii-key" />
                    <p className="Hawaii-key-text">Hawaii Prices</p>
                </div>
                {this.props.fetchingData && (
                    <div className="key spinner">
                        <Loader type="Puff" color="#204963" height="60" width="60" />
                        <p>Loading Data</p>
                    </div>
                )}
                {friends.length > 0 && (
                    <div className="gas-wrapper">
                        <div className="columns">
                            <div className="months">
                                <div className="year">2006</div>
                                <div className="year">2007</div>
                                <div className="year">2008</div>
                                <div className="year">2009</div>
                                <div className="year">2010</div>
                                <div className="year">2011</div>
                                <div className="year">2012</div>
                            </div>
                            <div>
                                {friends.map(price => (
                                    <div className="price-graph">
                                        <div className="date">
                                            <p>{price.date}</p>
                                        </div>
                                        <div className="hawaii-graph">
                                            <div
                                                className="hawaii-line"
                                                style={{
                                                width: `${(Number(price.HawaiiPrice) / 5) * 100}%`
                                                }}/>
                                            <p>${price.HawaiiPrice}</p>
                                        </div>
                                        <div className="us-graph">
                                            <div
                                                className="us-line"
                                                style={{
                                                width: `${(Number(price.USPrice) / 5) * 100}%`
                                                }}>
                                                <p>${price.USPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}}
export default Friends;