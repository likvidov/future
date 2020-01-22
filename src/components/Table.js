import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import '../css/Table.css';
import LoadingMessage from './Loading';
import ErrorMessage from './Error';


export default class Table extends Component {

    state = {
        error: false,
        loading: false,
        users: []
    }

    getResourse = async (count) => {
        this._apiBase = 'http://www.filltext.com/?rows=500&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
        this.setState({
            loading:true,
            error:false
        })
        return await fetch(this._apiBase).then(response => response.json());
    }

    componentDidMount(){
        this.updateTable();
    }

    updateTable(count){
        this.getResourse(count)
            .then(this.onTableUpdate)
            .catch(this.onError)
    }

    onTableUpdate = (users) =>{
        this.setState({
            error:false,
            loading:false,
            users
        })
    }

    onError = () =>{
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {
        const {users, error, loading} = this.state;

        if(error){
            return <ErrorMessage/>;
        }

        if(loading){
            return <LoadingMessage/>;
        }

        

        function getCaret(direction) {
            if (direction === 'asc') {
              return (
                <span>&darr;</span>
              );
            }
            if (direction === 'desc') {
              return (
                <span>&uarr;</span>
              );
            }
            return (
              <span> &uarr;&darr;</span>
            );
          }

        function isExpandableRow(row) {
            return row['email'];
        }
    
        function expandRow(row) {
            return (
                <div className="description">
                    Выбран пользователь <b>{row['firstName'] + " " + row['lastName']}</b>
                    Описание: <textarea value={row['description']} readOnly/>
                    Адрес проживания: <b>{row['address']['streetAddress']}</b>
                    Город: <b>{row['address']['city']}</b>
                    Провинция/штат: <b>{row['address']['state']}</b>
                    Индекс: <b>{row['address']['zip']}</b>
                </div>
            );
        }

        this.options = {
            defaultSortName: 'id',
            defaultSortOrder: 'asc'
        };


        return (
            <div class="table-responsive-lg">
                <BootstrapTable
                                 expandableRow={isExpandableRow}
                                 expandComponent={expandRow}
                                 data={users}
                                 pagination={true} 
                                 options={ this.options }>
                    <TableHeaderColumn dataField='id'dataSort caretRender={ getCaret } filter={ { type: 'TextFilter' } }>
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='firstName' dataSort caretRender={ getCaret } filter={ { type: 'TextFilter' } }>
                        FirstName
                    </TableHeaderColumn>
                    <TableHeaderColumn  dataField='lastName' dataSort caretRender={ getCaret } filter={ { type: 'TextFilter' } }>
                        LastName
                    </TableHeaderColumn>
                    <TableHeaderColumn isKey dataField='email' dataSort caretRender={ getCaret } filter={ { type: 'TextFilter' } }>
                        Email
                    </TableHeaderColumn>
                    <TableHeaderColumn  dataField='phone' dataSort caretRender={ getCaret } filter={ { type: 'TextFilter' } }>
                        Phone
                    </TableHeaderColumn>
                    
                </BootstrapTable>
            </div>
        );
    }
}