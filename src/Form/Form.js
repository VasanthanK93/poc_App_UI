import React, { Component } from 'react';

export default class Form extends Component {
    state = {addExtraRow : false}

    addExtraRow = () =>{
        this.setState({addExtraRow: true})
    }
render(){
return(
<div id="Form">
<form onSubmit={this.props.handleFormSubmit}>
    <br/>
<input type="text" name="id" placeholder="POC ID" value={this.props.newId} onChange={this.props.handleInputChange} />
<span>    </span>
<input type="text" name="pocDesc" placeholder="POC Description" value={this.props.newDesc} onChange={this.props.handleInputChange} />
 <span>   </span>
<input type="text" name="wikiLink" placeholder="Wiki Link" value={this.props.newLink} onChange={this.props.handleInputChange} />
<span>   </span>
{/* <input type="text" name="status" placeholder="Status" value={this.props.newStatus} onChange={this.props.handleInputChange} /> */}
<select style = {{width : '10em', height:'1.85em'}} value={this.props.newStatus} onChange={this.props.handleDropChange} placeholder="Status">
            <option value="">Select Status</option>
              <option value="New Idea">New Idea</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="InProgress">InProgress</option>
              <option value="Blocked">Blocked</option>
              <option value="Completed">Completed</option>
              <option value="Demo Shown to Customer">Demo Shown to Customer</option>
      </select>
 <span>   </span>
<input type="text" name="remarks" placeholder="Remarks" value={this.props.newRemark} onChange={this.props.handleInputChange} />
<span>   </span>
<br/>
<br/>
<button type="submit" value="Submit">Add Task</button>
</form>
</div>
);
}
}