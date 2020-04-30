import React, { Component} from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { addPoc, editPoc, getPocList } from '../../actions/index';
import TextField from '@material-ui/core/TextField';
import LogTable from '../Log/LogTable';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
class TeamTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'POC ID', field: 'pocId', editable: 'never' },
        { title: 'Team', field: 'team',editable: 'never' },
        { title: 'POC Description',
          field: 'pocDesc',
          editComponent: props => (
            <TextField
              multiline
              rowsMax={4}
              value={props.rowData.pocDesc}
              onChange={(e)=> props.onChange(e.target.value)}
            />
          )
         },
        { title: 'Wiki Link', field: 'wikiLink' },
        {
          title: 'Status',
          field: 'status',
          lookup: { 'New Idea': 'New Idea', 'Shortlisted': 'Shortlisted', 'InProgress': 'In Progress', 'Blocked': 'Blocked', 'Completed': 'Completed', 'Demo Shown to Customer': 'Demo Shown to Customer' },
        },
        { title: 'Notes', field: 'remarks' }
      ],
      data: [],
      loading: false,
      open: false,
      remarks:""
    }
  }

  handleChange = (e) => {
    this.setState({remarks:e.target.value})
  }; 

  handleClose = () => {
    this.setState({open:false})
  }; 
  handleUpdate = () => {
    if(this.state.remarks.trim()){
      let newPoc = {...this.state.newData,"remarks": this.state.remarks}
      this.setState({
        open:false,
        remarks:""
      })
      this.props.editPoc(newPoc,this.state.oldData)
    }  
  }; 

  componentDidMount(){
    this.props.getPocList();
  }

  static getDerivedStateFromProps(nextProps){
    return { data: nextProps.pocList , loading: nextProps.loading}
  }

  render(){
    const dialog = this.state.open ?
    (<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Remarks</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="remarks"
            value={this.state.remarks}
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleUpdate} color="primary">
            Update
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>) : null
    return (
        <div>
        <MaterialTable
          title="Registered POCS"
          columns={this.state.columns}
          data={this.state.data}
          isLoading={this.state.loading}
          options={{headerStyle: {'fontWeight': 'bold'}}}
          editable={{
            onRowAdd: this.props.user && this.props.user.teams &&  this.props.user.teams.includes(this.props.team) ? (newData) =>
              new Promise((resolve, reject) => {
                if(newData && newData.pocDesc.trim()){
                  let poc = {...newData,"team": this.props.team,"deleteStatus" : false}
                  this.props.addPoc(poc)  
                  resolve();  
                }else{
                  reject()
                }
              }) : null,
            onRowUpdate: this.props.user && this.props.user.teams && this.props.user.teams.includes(this.props.team) ? (newData, oldData) =>
              new Promise((resolve, reject) => {  
                if(newData && newData.pocDesc.trim()){
                  this.setState({
                    open:true,
                    newData,
                    oldData,
                    remarks:""
                  })
                  resolve()
                  // this.props.editPoc(newData,oldData)  
                  // resolve();   
                }else{
                  reject()
                }
              }) : null
          }}
          detailPanel={[
            {
              icon: 'history',
              tooltip: 'Show History',
              render: rowData => {
                return (
                  <LogTable key={rowData.pocId} pocId={rowData.pocId}/>
                )
              },
            },
          ]}
        />
        {dialog}
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      pocList: state.pocs.pocList,
      team: state.pocs.team,
      loading: state.pocs.loading,
      user: state.users.user.user,
      pocLog: state.pocs.pocLog,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addPoc: (poc) => dispatch(addPoc(poc)),
      editPoc: (newData,oldData) => dispatch(editPoc(newData,oldData)),
      getPocList: () => dispatch(getPocList()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TeamTable);

