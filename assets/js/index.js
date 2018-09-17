var React = require('react')
var ReactDOM = require('react-dom')

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {name:'',age:10,address:'',data:[]};
		this.call_me = this.call_me.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}
	call_me(){
		alert('hello how are you?  ')
	}
	componentDidMount(){
				$.ajax({
		      url: '/customer/list/',
		      dataType: 'json',
		      cache: false,
		      contentType: "application/json",
		      success: function(data) {
		        this.setState({data:JSON.parse(data)});
		        console.log(this.state.data);
		      }.bind(this),
		      error: function(xhr, status, err) {
		        alert('error')
		        console.error(this.props.url, status, err.toString());
		       
		      }.bind(this)
    		});
	}
	 handleSubmit(event){
	  	event.preventDefault();
      var csrftoken = document.cookie.split('=')[1];
      var url = '/customer/list/'
    	$.ajax({
    		url: url,
    		type: 'POST',
    		data: {
    			name : this.state.name,
    			age : this.state.age,
    			address:this.state.address
    		},
    			success:function(data){
    				
    				this.componentDidMount();		
    			}.bind(this),
    			beforeSend:function(xhr){
    				xhr.setRequestHeader("X-CSRFToken", csrftoken)
    			}.bind(this)
    	});
    	
	  }
	 handleChange(event) {
	 	const name = event.target.name;
    this.setState({[name]: event.target.value});
  }
	render(){
		let data = this.state.data;
		let d = [];
		Object.values(data).map(function(v){
			d.push(
				<tr>
				<td>{v['name']}</td>
				<td>{v['age']}</td>
				<td>{v['address']}</td>
				</tr>
				)
		})

		console.log(d)

		return(
			<div>
			<p className='bg-danger'>Hello my name is BISHAL </p>
			<button className='btn btn-primary'  onClick={this.call_me}>click</button><br/><br/>
			<div className="container">
			
			<div className="row">
			
			<div className="col-md-6">
							<form onSubmit={this.handleSubmit.bind(this)}>
				  <div class="form-group">
				    <label for="name">Name</label>
				    <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.handleChange} />
				  </div>
				  <div class="form-group">
				    <label for="age">Age</label>
				    <input type="number" class="form-control"  name="age" value={this.state.age} onChange={this.handleChange} />
				  </div>
				  <div class="form-group">
				    <label for="add">Address</label>
				    <input type="text" class="form-control"  name="address" value={this.state.address} onChange={this.handleChange} />
				  </div>
				  <button type="submit" class="btn btn-default">Submit</button>
				</form>
			</div>

			<div className="col-md-6">
			<table class='table'>
				<thead>
				<tr>
				<th>Name</th>
				<th>Age</th>
				<th>Address</th>
				</tr>
				</thead>
				<tbody>
				{d}
				</tbody>
			</table>
			</div>
			
			</div>
			
			</div>
			</div>
			);
	}
}

ReactDOM.render(<Home />,document.getElementById('hme'));