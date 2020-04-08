import React,{Component} from 'react'

class Update extends Component{
    state={
        id:1,
        content:""
    }
    handleChange=(e)=>{
        this.setState({
            id:this.props.data,
            content:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault(); 
        this.props.updateTodo(this.state);
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h4>Update todo</h4>
                    <label>Type your Updated todo content</label>
                    <input type="text" onChange={this.handleChange} value={this.state.content}/>
                    <button className="indigo btn-small" onClick={this.props.onCloseModal}>Submit</button>
                </form>
            </div>
        )
    }
}
export default Update;
