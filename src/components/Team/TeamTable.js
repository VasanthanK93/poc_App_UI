import React, { Component} from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { addPoc, editPoc, getPocList} from '../../actions/index';
class TeamTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'POC ID', field: 'pocId', editable: 'never' },
        { title: 'Team', field: 'team',editable: 'never' },
        { title: 'POC Description', field: 'pocDesc' },
        { title: 'Wiki Link', field: 'wikiLink' },
        {
          title: 'Status',
          field: 'status',
          lookup: { 'New Idea': 'New Idea', 'Shortlisted': 'Shortlisted', 'InProgress': 'In Progress', 'Blocked': 'Blocked', 'Completed': 'Completed', 'Demo Shown to Customer': 'Demo Shown to Customer' },
        },
        { title: 'Remarks', field: 'remarks' }
      ],
      data: [],
      loading: false
    }
  }

  componentDidMount(){
    this.props.getPocList();
  }

  static getDerivedStateFromProps(nextProps){
    return { data: nextProps.pocList , loading: nextProps.loading}
  }

  render(){
    return (
        <MaterialTable
          title="Registered POCS"
          columns={this.state.columns}
          data={this.state.data}
          isLoading={this.state.loading}
          options={{headerStyle: {'font-weight': 'bold'}}}
          editable={{
            onRowAdd: this.props.team !== 'All' ? (newData) =>
              new Promise((resolve, reject) => {
                if(newData && newData.pocDesc.trim()){
                  let poc = {...newData,"team": this.props.team,"deleteStatus" : false}
                  this.props.addPoc(poc)  
                  resolve();  
                }else{
                  reject()
                }
              }) : null,
            onRowUpdate: this.props.team !== 'All' ? (newData, oldData) =>
              new Promise((resolve, reject) => {  
                if(newData && newData.pocDesc.trim()){
                  this.props.editPoc(newData,oldData)  
                  resolve();   
                }else{
                  reject()
                }
              }) : null
          }}
        />
    );
  }
}

const mapStateToProps = state => {
  return {
      pocList: state.pocs.pocList,
      team: state.pocs.team,
      loading: state.pocs.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addPoc: (poc) => dispatch(addPoc(poc)),
      editPoc: (newData,oldData) => dispatch(editPoc(newData,oldData)),
      getPocList: () => dispatch(getPocList())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TeamTable);

