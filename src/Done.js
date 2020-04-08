import React, { Component } from 'react';
import axios from 'axios'
class Done extends Component{
    state={
        todos:[]
    }
    componentDidMount(){
        axios.get('http://localhost:9000/notes')
        .then(res=>{
            this.setState({
               todos:res.data
            })
        })
    }
    render(){
        return(
            <div className="todos collection" key={this.props.todos.id}>
                {this.props.todos.length?(
                    this.props.todos.map(todo=>{
                        if(todo.flag===3){
                        return (      
                            <div>  
                                <div className="collection-item" key={todo._id}>
                                    <span>{todo.content}
                                    <i className="material-icons red-text right" onClick={()=> {this.props.deleteTodo(todo._id)}}>delete_forever</i>
                                    </span>
                                </div>
                            </div>
                        )}
                        else{
                            return null
                        }
                    })
                ):(<p className="center">No more todo left</p>)}   
            </div>
        )
    } 
    
}
export default Done;