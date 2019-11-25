import React, { Component } from 'react';
import Password from './Login_Password';

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupSelected: false,
            selectedRow: null,
        }
    }

    gotoPasswordForm = (row) => {
        this.setState({
            groupSelected: true,
            selectedRow: row,
        })
    }

    generateTrTag = (array) => {
        return array.map((row) => {
            return (<tr onClick={() => this.gotoPasswordForm(row)} data-item={row} key={row.id}><td>{row.group}</td></tr>);
            // return (<li key={row.id} onClick={() => this.gotoPasswordForm(row)}>{row.group}</li>)
        })
    }


    render() {
        if (this.state.groupSelected === true) {
            return <Password row={this.state.selectedRow} />
        }

        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>GroupList</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateTrTag(this.props.groupList)}
                    </tbody>
                </table>
                {/* <ul>
                    {this.generateTrTag(this.props.groupList)}
                </ul> */}
            </div>
        );
    }
}

export default GroupList;