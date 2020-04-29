
import React, { Component} from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { getPocLog } from '../../actions/index';

class LogTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: [
          { title: 'Changed Time', field: 'pocId'},
          { title: 'Remarks', field: 'team'},
          { title: 'POC Description',field: 'pocDesc'},
          { title: 'Wiki Link', field: 'wikiLink' },
          { title: 'Status', field: 'status' },
          { title: 'Notes', field: 'notes' }
        ],
        data: [],
        loading: false
      }
    }

  componentDidMount(){
    this.props.getPocLog();
  }

  static getDerivedStateFromProps(nextProps){
    return { 
      data: nextProps.usersList ,
      loading: nextProps.loading
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



