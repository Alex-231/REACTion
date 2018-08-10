import React, { Component } from 'react';
import './App.css';
import Script from './data/game'

class Branch extends Component {

    getBranch(name) {
        for (var branchName in Script) { // For each branch in the script...
            if (branchName === name) // If the branch is the branch I'm looking for...
                return Script[branchName] //Return it.
        }
    }

    getChoices() {
        //Get the branch.
        var branch = this.getBranch(this.props.position)
        //Make an empty array to put the buttons in.
        var buttons = []
        //If the branch has choices...
        if (branch["choice"]) {
            //For each choice...
            branch.choice.forEach(element => {
                //Make a button
                buttons = buttons.concat([<button onClick={() => this.props.onSubmit(element.next)}>{element.text}</button>])
            });
        }
        //If the branch doesn't have choices but does have a next position...
        else if (branch["next"]) {
            // Make a continue button...
            buttons = <button onClick={() => this.props.onSubmit(branch.next)}>Continue</button>
        }
        // If there's no choices and no next, don't show a button.
        else buttons = null

        return buttons
    }

    render() {
        return (
            <div>
                <p><p dangerouslySetInnerHTML={{ __html: "<p>" + this.getBranch(this.props.position).text + "</p>" }}></p></p>
                {/* Ternary Operator (condition ? true : false) */}
                {/* if this.props.disabled ? don't show buttons : else do show buttons*/}
                {
                    this.props.disabled
                        ? null
                        : <div> {this.getChoices()}</div>
                }
            </div>
        );
    }
}

export default Branch;
