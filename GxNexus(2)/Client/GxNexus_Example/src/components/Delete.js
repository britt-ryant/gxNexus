import React from 'react';

import { connect } from 'react-redux';


const stateToProps = (state) => {
    return state;
}

class Delete extends React.Component{
    // constructor(props){
    //     super(props);

    // }


    render(){
        return(
            <>
            <button onClick={() => this.props.handleDelete(this.props.id, this.props.i)}>Delete</button>
            </>
        )
    }
}


export default connect(stateToProps)(Delete)