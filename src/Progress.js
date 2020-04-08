import React, { Component } from 'react';

class Progress extends Component{

    render(){
        return(
            <div className="todos collection" key={this.props.todos.id}>
                {this.props.todos.length?(
                    this.props.todos.map(todo=>{
                        if(todo.flag===2){
                        return (      
                            <div>  
                                <div className="collection-item" key={todo._id}>
                                    <span>{todo.content}
                                    <i onClick={()=>{this.props.updateFlag(todo)}} className="material-icons green-text right" >check_circle</i>
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
export default Progress;