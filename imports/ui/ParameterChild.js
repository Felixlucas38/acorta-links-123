import React from 'react';

export default class ParameterChild extends React.Component {
    render() {
        return (
            <div>
                <h1>ParameterChild Component. paramsId: {this.props.match.params.paramsId}</h1>
            </div>
        );
    }
}