import React, {Component} from 'react';

export default class tableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.mark}</td>
                <td>{this.props.model}</td>
                <td>{this.props.type}</td>
                <td>{this.props.year}</td>
                <td>{this.props.country}</td>
                <td>{this.props.colors.join(', ') || 'Нет доступных цветов'}</td>
                <td>{this.props.options.join(', ') || 'Нет доступных опций'}</td>
            </tr>
        )
    }
}