import React from 'react';
import Button from './Button';


class Calculator extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            input: '0',
        };
        this.memory = 0;
    }


    onClick = (value) => {

        let expr = String(this.state.input);
        if (expr.search(/[error|NaN|Infinity]/g) !== -1) {
            this.state.input = "0";
        }

        switch (value) {
            case 'C': {
                this.setState({ input: '0' });
                break;
            }
            case '%': {
                let expr = String(this.state.input);
                let percentage = "";

                for (let i = expr.length - 1; i >= 0; i--) {
                    let flag = /[-+/*\s]/.test(expr[i])
                    if (flag) {
                        break;
                    } else {
                        percentage += expr[i];
                        expr = expr.slice(0, -1);
                    }
                }
                percentage = percentage.split('').reverse().join('');
                try {

                    if (expr === '') {
                        this.state.input = this.state.input + `/100`;
                        this.setState({ input: eval(this.state.input) });
                    } else {
                        let lastOperation = expr.slice(-1);
                        expr = expr.slice(0, -1);
                        let percentageAnswer;
                        switch (lastOperation) {
                            case '/':
                            case '*': {
                                percentageAnswer = percentage / 100;
                                break;
                            }
                            case '+':
                            case '-': {
                                let finalExpr = eval(expr);
                                percentageAnswer = Math.abs(finalExpr*percentage/100);
                                if(finalExpr<0) {
                                    if (lastOperation === '+') {
                                        lastOperation = '-';
                                    } else if (lastOperation === '-') {
                                        lastOperation = '+';
                                    }
                                }
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        this.setState({ input: expr + lastOperation + percentageAnswer });
                    }
                } catch (ex) {
                    this.setState({ input: ex.name });
                }
                break;
            }
            case '.': {
                let expr = this.state.input;
                let number = '';
                for (let i = expr.length - 1; i >= 0; i--) {
                    if (/[-+/*\s]/.test(expr[i])) {
                        break;
                    } else {
                        number += expr[i];
                        expr = expr.slice(0, -1);
                    }
                }
                if (/[.]/.test(number) && /[.]/.test(value)) {
                    break;
                } else {
                    if (/[-+/*]/.test(this.state.input.slice(-1))) {
                        this.setState({ input: this.state.input + '0' + value });
                    } else {
                        this.setState({ input: this.state.input + value });
                    }
                }
                break;
            }
            case '+/-': {
                if (/[-+/*]/.test(this.state.input.slice(-1))) {
                    break;
                } else {
                    this.setState({ input: this.state.input + `*(-1)` })
                }
                break;
            }
            case '0': {
                if (this.state.input === '0') {
                    break;
                }
                if ((this.state.input.slice(-1) === '0' && /[-+/*\s]/.test(this.state.input[this.state.input.length - 2])) || this.state.input.slice(-1) === ')') {
                    break;
                } else {
                    this.setState({ input: this.state.input + value });
                }
                break;
            }
            case '=': {
                try {
                    let answer = String(eval(this.state.input));
                    this.setState({ input: answer });
                } catch (ex) {
                    this.setState({ input: ex.name });
                }
                break;
            }
            case 'sqrt': {

                let expr = this.state.input;
                let sqrt = Math.sqrt((expr));
                if (isNaN(sqrt)) {
                    this.setState({ input: 'error' });

                }
                else {
                    this.setState({ input: sqrt })
                }

                break;
            }

            case 'MRC': {

                this.setState({
                    input: String(this.memory)
                })

                break;
            }

            case 'M-': {

                let expr = this.state.input;
                if (!isNaN(expr)) {
                    this.memory = (1*this.memory - 1*expr);
                }
                else {
                    this.setState({ input: 'error' });
                }

                break;
            }

            case 'M+': {

                let expr = this.state.input;
                if (!isNaN(expr)) {
                    this.memory = (1*this.memory + 1*expr);
                }
                else {
                    this.setState({ input: 'error' });
                }

                break;
            }



            default: {
                let lastChar = Array.from(this.state.input);
                lastChar = lastChar.slice(-1);

                if (/[0]/.test(lastChar) && !/[-+/*]/.test(value)) {
                    this.setState({ input: this.state.input.slice(0, -1) + value });
                    break;
                }
                if ((/[-+/*]/.test(lastChar) && /[-+/*]/.test(value))) {
                    this.setState({ input: this.state.input.slice(0, -1) + value });
                } else {
                    if (/[)]/.test(lastChar) && !/[-+/*]/.test(value)) {
                        break;
                    }
                    this.setState({ input: this.state.input + value });
                }
                break;
            }
        }
    }


    render() {


        return (
            <div className='calculator-body'>
                <div className='wrapper'>
                    <div className='result'>
                        <div className=''>
                            <p> {this.state.input } </p>
                        </div>
                    </div>
                </div>
                <div className='btn_field'>

                    <aside className='left_block'>

                        <Button className='button_narrow' value='OFF' onClick={() => this.onClick('C')}/>
                        <Button className='button_narrow' value='+/-' onClick={() => this.onClick('+/-')}/>
                        <Button className='button_narrow' value='sqrt' onClick={() => this.onClick('sqrt')} />

                        <Button value='MRC' onClick={() => this.onClick('MRC')}/>
                        <Button value='M-' onClick={() => this.onClick('M-')}/>
                        <Button value='M+' onClick={() => this.onClick('M+')}/>
                        <Button value='7' onClick={() => this.onClick('7')}/>
                        <Button value='8' onClick={() => this.onClick('8')}/>
                        <Button value='9' onClick={() => this.onClick('9')}/>
                        <Button value='4' onClick={() => this.onClick('4')}/>
                        <Button value='5' onClick={() => this.onClick('5')}/>
                        <Button value='6' onClick={() => this.onClick('6')}/>
                        <Button value='1' onClick={() => this.onClick('1')}/>
                        <Button value='2' onClick={() => this.onClick('2')}/>
                        <Button value='3' onClick={() => this.onClick('3')}/>
                        <Button value='.' onClick={() => this.onClick('.')}/>
                        <Button value='0' onClick={() => this.onClick('0')}/>
                        <Button value='=' onClick={() => this.onClick('=')}/>
                    </aside>

                    <aside className='right_block'>
                        <Button className='button_narrow' value="%" onClick={() => this.onClick('%')}/>
                        <Button value='/' onClick={() => this.onClick('/')}/>
                        <Button value='*' onClick={() => this.onClick('*')}/>
                        <Button value='-' onClick={() => this.onClick('-')}/>
                        <Button className="button_plus" value="+" onClick={() => this.onClick('+')}/>
                    </aside>



                </div>
            </div>
        );
    }
}

export default Calculator;
