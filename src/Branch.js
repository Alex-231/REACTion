import React, { Component } from 'react';
import './App.css';
import Script from './data/game'

class Branch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            disabled: false
        }
    }

    progress(next) {
        this.props.progress(next)
    }

    getBranch(name) {
        for (var branchName in Script) {
            if (branchName === name)
                return Script[branchName]
        }
    }

    getChoices() {
        var branch = this.getBranch(this.props.position)
        var buttons = []
        if (branch["choice"]) {
            branch.choice.forEach(element => {
                buttons = buttons.concat([<button onClick={() => this.props.onSubmit(element.next)}>{element.text}</button>])
            });
        }
        else if (branch["next"])
            buttons = <button onClick={() => this.props.onSubmit(branch.next)}>Continue</button>
        else buttons = null

        return buttons
    }

    render() {
        return (
            <div>
                <p><p dangerouslySetInnerHTML={{ __html: "<p>" + this.getBranch(this.props.position).text + "</p>" }}></p></p>
                {this.props.disabled ? null : <div>
                    {this.getChoices()}
                </div>}
            </div>
        );
    }
}

export default Branch;
