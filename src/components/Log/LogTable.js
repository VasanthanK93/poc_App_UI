
import React, { Component} from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { getPocLog } from '../../actions/index';

class LogTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: [
          { title: 'Modified Date',
            field: 'modifiedDate',
            defaultSort: 'desc',
            render: rowData => {
              const date = new Date(rowData.modifiedDate)
              return date.toString()
            }
          },
          { title: 'Remarks', field: 'remarks'},
          { title: 'Status', field: 'status' }
        ],
        data: [],
        loading: false,
      }
    }

  componentDidMount(){
    this.props.getPocLog(this.props.pocId);
  }

  static getDerivedStateFromProps(nextProps){
    if(nextProps.pocLog.length && nextProps.pocLog[0].pocId === nextProps.pocId ){
        return { 
            data: nextProps.pocLog ,
            loading: nextProps.loading
          }
    }else{
        return null
    }  
  }

  render(){
    return (
        <MaterialTable
          columns={this.state.columns}
          data={this.state.data}
          isLoading={this.state.loading}
          options={
            {
                search: false,
                paging: false,
                toolbar: false,
                headerStyle: { backgroundColor: 'lightgrey',fontWeight: 'bold'},
                rowStyle:{backgroundColor: 'lightgrey'}
            }  
          }
          localization={
            {
                body: {
                    emptyDataSourceMessage: "No Logs to display"
                }
            }
          }
        />
    );
  }
}

const mapStateToProps = state => {
  return {
      pocLog: state.pocs.pocLog,
      loading: state.users.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getPocLog: (pocId) => dispatch(getPocLog(pocId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LogTable);



