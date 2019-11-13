import React, {Component} from 'react';
import _ from 'lodash'
import './App.css';
import TableComponent from './TableComponent';

class App extends Component {

    constructor(props){
        super(props);
    }

    


    render(){
        return(
        <TableComponent />
        );
    }
}

export default App;