import React, { Component } from 'react';
import './styles.css';
import Button from '../Button/';
import Display from '../Display/';

const initialState = {
    displayValue: '0',
    clearDisplay: true,
    operation: null,
    values: [0, null],
    current: 0,
};

export default class Calculator extends Component {
    state = { ...initialState };

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory() {
        this.setState({ ...initialState });
    }

    setOperation(operation) {
        const finish = operation === '=';

        const values = [...this.state.values];

        if (this.state.current === 0 && !finish) {
            values[1] = null;
            this.setState({
                operation,
                current: 1,
                clearDisplay: true,
                values,
            });
        } else {
            if (values[1] != null) {
                const currentOperation = this.state.operation;
                const operations = {
                    '+': () => values[0] + values[1],
                    '-': () => values[0] - values[1],
                    '*': () => values[0] * values[1],
                    '/': () => values[0] / values[1],
                };

                values[0] = operations[currentOperation]();
                this.setState({
                    displayValue: values[0],
                    current: finish ? 0 : 1,
                    clearDisplay: !finish,
                    values,
                });
            }

            if (!finish) {
                this.setState({ operation });
            }
        }
    }

    addDigit(n) {
        const displayValue = this.state.displayValue;

        if (n === '.' && displayValue.includes('.')) return;

        const clearDisplay = displayValue === '0' || this.state.clearDisplay;
        const currentValue =
            (clearDisplay ? (n === '.' ? '0' : '') : displayValue) + n;

        this.setState({
            displayValue: currentValue,
            clearDisplay: false,
        });

        if (n !== '.') {
            const i = this.state.current;
            const newValue = parseFloat(currentValue);
            const values = [...this.state.values];
            values[i] = newValue;

            this.setState({ values });
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button
                    label="AC"
                    operation
                    type="triple"
                    click={this.clearMemory}
                />
                <Button label="/" operation click={this.setOperation} />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" operation click={this.setOperation} />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" operation click={this.setOperation} />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" operation click={this.setOperation} />
                <Button label="0" type="double" click={this.addDigit} />
                <Button label="." click={this.addDigit} />
                <Button label="=" operation click={this.setOperation} />
            </div>
        );
    }
}
