import React, { Component} from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { addPoc, editPoc, removePoc, getPocList} from '../../actions/index';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

class TeamTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'POC ID', field: 'pocId', editable: 'never'},
        { title: 'Team', field: 'team',editable: 'never'},
        { title: 'POC Description', field: 'pocDesc' },
        { title: 'Wiki Link', field: 'wikiLink' },
        {
          title: 'Status',
          field: 'status',
          lookup: { 'New Idea': 'New Idea', 'Shortlisted': 'Shortlisted', 'InProgress': 'In Progress', 'Blocked': 'Blocked', 'Completed': 'Completed', 'Demo Shown to Customer': 'Demo Shown to Customer' },
        },
        { title: 'Remarks', field: 'remarks' }
      ],
      data: []
    }
  }

  componentDidMount(){
    this.props.getPocList();
  }

  static getDerivedStateFromProps(nextProps){
    return { data: nextProps.pocList }
  }

  render(){
    return (
      <MaterialTable
        title=""
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              resolve();
              this.props.addPoc(newData,this.props.team)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              resolve();
              const index = this.props.pocList.indexOf(oldData)
              this.props.editPoc(newData,index,this.props.team)
            }),
            // new Promise((resolve) => {
            //   setTimeout(() => {
            //     resolve();
            //     if (oldData) {
            //       this.setState((prevState) => {
            //         const data = [...prevState.data];
            //         data[data.indexOf(oldData)] = newData;
            //         this.props.addPoc(newData); 
            //         return { ...prevState, data };
            //       });
            //     }
            //   }, 600);
            // }),
          // onRowDelete: (oldData) =>
          //   new Promise((resolve) => {
          //     setTimeout(() => {
          //       resolve();
          //       this.setState((prevState) => {
          //         const data = [...prevState.data];
          //         data.splice(data.indexOf(oldData), 1);
          //         this.props.removePoc(oldData.id)
          //         return { ...prevState, data };
          //       });
          //     }, 600);
          //   }),
        }}
      />
    );
  }
}


const mapStateToProps = state => {
  return {
      poc: state.pocs.poc,
      pocList: state.pocs.pocList,
      team: state.pocs.team
  }

}

const mapDispatchToProps = dispatch => {
  return {
      addPoc: (poc,team) => dispatch(addPoc(poc,team)),
      removePoc: (poc) => dispatch(removePoc(poc)),
      editPoc: (poc,index,team) => dispatch(editPoc(poc,index,team)),
      getPocList: () => dispatch(getPocList())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TeamTable);

