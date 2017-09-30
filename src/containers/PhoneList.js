import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPhoneList } from '../actions/index.js'
//you need to display all the contacts and add basic filters for searching and sorting -
// pease describe in a readme file how to run your application 
// We strongly recommend you use frameworks to solve the challenge if you added frameworks to your hackajob profile.

class PhoneList extends Component {
    constructor(props) {
        super(props);
        const { numbers } = props;
        this.state = {
            numbers: numbers,
            name: true,
            phone_number: true,
            address: true
        }
        this._sortList = this._sortList.bind(this);
    }

    _sortList(prop, e) {
        e.preventDefault()
        let effect = this.state[prop];
        if (this.state.numbers.length) {
            const numbers = this.state.numbers.sort(this.dynamicSort(prop, this.state[prop]));
            effect = effect ? false : true;
            this.setState({ numbers, [prop]: effect })
        }
        if (this.props.numbers.length) {
            const numbers = this.props.numbers[0].sort(this.dynamicSort(prop, this.state[prop]));
            this.setState({ numbers })
        }
        return;
    }

    componentWillMount() {
        this.props.fetchPhoneList();
    }

    dynamicSort(property, dir) {
        let sortOrder = 1
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        if (dir === true) {
            return function (a, b) {
                const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }
        return function (a, b) {
            const result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    renderPhoneList(number) {
        return (<tr key={number.phone_number}>
            <td>
                {number.name}
            </td>
            <td>
                {number.phone_number}
            </td>
            <td>
                {number.address}
            </td>
        </tr>);
    }

    filterList(event) {
        let filteredNumbers = this.props.numbers[0];
        filteredNumbers = filteredNumbers.filter(function (number) {
            return number.name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1
                || number.address.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1
                || number.phone_number.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
        });
        this.setState({ numbers: filteredNumbers });
    }

    renderTable(numbers) {
        return (<div>
            <input type='text' onChange={(e) => this.filterList(e)} />
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th onClick={(e) => this._sortList('name', e)}>Name</th>
                        <th onClick={(e) => this._sortList('phone_number', e)}>Number</th>
                        <th onClick={(e) => this._sortList('address', e)}>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {numbers.map(this.renderPhoneList)}
                </tbody>
            </table>
        </div>)
    }

    render() {
        if (!this.props.numbers.length) return (<div>Loading...</div>);
        if (this.state.numbers.length) return this.renderTable(this.state.numbers)
        return this.renderTable(this.props.numbers[0]);
    };
};

function mapStateToProps(state) {
    return { numbers: state.numbers };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPhoneList }, dispatch);
};
window.store = fetchPhoneList;

export default connect(mapStateToProps, mapDispatchToProps)(PhoneList);