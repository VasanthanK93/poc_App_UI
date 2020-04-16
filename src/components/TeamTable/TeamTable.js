import React, { Component} from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { addPoc, editPoc, removePoc, getPocList} from '../../actions/index';
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
          onRowAdd: this.props.team !== 'All' ? (newData) =>
            new Promise((resolve) => {
              let poc = {...newData,"team": this.props.team,"deleteStatus" : false}
              this.props.addPoc(poc)
              setTimeout(() => {  
                resolve();  
              },1000)
            }) : null,
          onRowUpdate: this.props.team !== 'All' ? (newData, oldData) =>
            new Promise((resolve) => {  
              this.props.editPoc(newData,oldData)
              setTimeout(() => {  
                resolve();  
              },1000) 
            }) : null,
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
      pocList: state.pocs.pocList,
      team: state.pocs.team
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addPoc: (poc) => dispatch(addPoc(poc)),
      removePoc: (poc) => dispatch(removePoc(poc)),
      editPoc: (newData,oldData) => dispatch(editPoc(newData,oldData)),
      getPocList: () => dispatch(getPocList())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TeamTable);

