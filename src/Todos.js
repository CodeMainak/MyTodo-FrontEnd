import React,{Component} from 'react';
import Modal from 'react-responsive-modal'
import Update from './Update'
import axios from 'axios'
class Todos extends Component{
    state={
        open:false,
        todos:[],
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };
    onCloseModal = () => {
        this.setState({ open: false });
    };
    componentDidMount(){
        axios.get('http://localhost:9000/notes')
        .then(res=>{
            this.setState({
               todos:res.data   
            })
        })
    }
    setId=(todo)=>{
        this.setState({
            id:todo._id
        })
    }
    updateTodo=(todo)=>{
        axios.put('http://localhost:9000/notes/update/'+todo.id,{
            content:todo.content,
            flag:1
            }).then(res=>{
            const tod=[]
            this.state.todos.forEach(item=>{
                if(item._id===todo.id){
                    item.content=todo.content
                }
                tod.push(item)
              })
            this.props.finalUpdate(this.state.todos)
            })
    }
    render(){
        return(
            <div className="todos collection" key={this.props.todos.id}>
                {this.props.todos.length?(
                    this.props.todos.map(todo=>{
                        if(todo.flag===1){
                        return (     
                            <div>  
                                <div className="collection-item" key={todo._id}>
                                    <span>{todo.content}
                                    <i onClick={()=>{this.props.updateFlag(todo)}} className="material-icons green-text right" >check_circle</i>
                                    <i className="material-icons red-text right" onClick={()=> {this.props.deleteTodo(todo._id)}}>delete_forever</i>
                                    <i onClick={()=>{this.setId(todo);this.onOpenModal()}} className="material-icons indigo-text right">edit</i>
                                    <Modal open={this.state.open} onClose={this.onCloseModal}>
                                        <Update  updateTodo={this.updateTodo} data={this.state.id} onCloseModal={this.onCloseModal}/>
                                    </Modal>
                                    </span>
                                </div>
                            </div>
                        )}else{
                            return null
                        }
                    })
                ):(<p className="center">No more todo left</p>)}   
            </div>
        )
    } 
    
}
export default Todos;
//{()=>{this.updateTodo(todo._id);this.helloWorld()}}...{this.updateTodo(todo._id)}
