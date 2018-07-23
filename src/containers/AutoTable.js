import React, {Component} from 'react';
import getData from '../actions/get';
import TableRow from '../components/TableRow';

export default class AutoTable extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
            loading: true,
            errorMsg: ''
        }
    }

    componentDidMount() {
        getData()
            .then(item => {
                this.setState({
                    data: item,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({
                    data: {},
                    loading: false,
                    errorMsg: error
                })
            })
    }

    render() {
        if (this.state.loading) {
            return (
                <div>PRELOADING...</div>
            )
        }
        if (this.state.errorMsg) {
            return (
                <div color="red">Ошибка {this.state.errorMsg}</div>
            )
        }

        const Rows = this.state.data.map((item, i) => (<TableRow key={i} {...item} />));
        return (
            <table bgcolor="#AAA" border="1" width="100%" cellPadding="0" cellSpacing="0">
                <tbody>
                    {Rows}
                </tbody>
            </table>
        );
    }
}