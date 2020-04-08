import React,{Component}from 'react';
import Todos from './Todos'
import axios from 'axios'
import Progress from './Progress'
import Done from './Done'
import Modal from 'react-responsive-modal'
import Form from './Form';
class App extends Component{
  state={
      todos:[],
      open:false
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
        console.log(res.data)
    })
  }
  deleteTodo=(_id)=>{
    axios.delete('http://localhost:9000/notes/'+_id)
    .then(res=>{
      const todos=this.state.todos.filter(todo=>{
        return todo._id!==_id;
      })
      this.setState({todos});
  })
}
  addTodo=(todo)=>{
      axios.post('http://localhost:9000/notes',{
        content:todo.content,
        flag:1
      }).then(res=>{
        todo._id=res.data._id
        todo.flag=1
        const todos=[...this.state.todos,todo]
        this.setState({todos});
      })
  }
updateFlag=(todo)=>{
    axios.put('http://localhost:9000/notes/flag/'+todo._id,{
        flag:todo.flag+1
        }).then(res=>{
        const tod=[]
        this.state.todos.forEach(item=>{
          if(item._id===todo._id){
            item.flag=todo.flag+1
          }
          tod.push(item)
        })
        this.setState({
          todos:tod
        })
      })
  }
  finalUpdate=(todos)=>{
      this.setState({
         todos
      })
  }
  render(){
    const { open } = this.state;
    return (
      <div className="App container">
        <h1 className="center indigo-text">My TodoList </h1>
        <div className="Container">
          <div> 
            <div>
              <h4 className="indigo-text center">Open
                <i className="material-icons right" onClick={this.onOpenModal}>add_circle</i>
              </h4>
              <Modal open={open} onClose={this.onCloseModal}>
                <Form addTodo={this.addTodo} onCloseModal={this.onCloseModal}/>
              </Modal>
            </div>
            <Todos updateFlag={this.updateFlag} todos={this.state.todos} finalUpdate={this.finalUpdate} deleteTodo={this.deleteTodo} />
          </div>
          <div> 
            <h4 className="center indigo-text">Progress</h4>
            <Progress updateFlag={this.updateFlag} todos={this.state.todos} deleteTodo={this.deleteTodo} />
          </div>
          <div> <h4 className="center indigo-text">Done</h4><Done todos={this.state.todos} deleteTodo={this.deleteTodo} /></div>
        </div>
      </div>
    );
  }
}
export default App;
