import React,{Component} from 'react'
class Form extends Component{
    state={
        content:""
    }
    handleChange=(e)=>{
        this.setState({
            content:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.addTodo(this.state);
        this.setState({
            content:""
        })
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h4>Add new todo</h4>
                    <label>Type your todo content</label>
                    <input type="text" onChange={this.handleChange} value={this.state.content}/>
                    <button className="indigo btn-small" onClick={this.props.onCloseModal}>Submit</button>
                </form>
            </div>
        )
    }
}
    export default Form;
