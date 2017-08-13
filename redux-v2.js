/*
  Versión 2 de los ejercicios de ejemmplo en redux.
*/

const todo = (state, action) => {
  switch (action.type){
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      // !== no es igual o no es del mismo type
      // Esto se hace para verificar que es id si existe,
      // Si no es igual va dar true
      if(state.id !== action.id){
        return state;
      }
      // Cambiamos el completed que esta como false a true
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

// Llamos un reducer todo para agregar el nuevo state,
// En este reducer todos vamos guardando todos los estados anteriores
const todos = (state = [], action) => {
  switch (action.type){
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

// Un reducer para filtrar
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type){
    case 'SET_VISIBILITY_FILTER':
      // console.log(action.filter)
      // Aca llega el tipo de filtro Ej: SHOW_ACTIVE
      return action.filter;
    default:
      return state;
  }
};

// Con esto podemos tener varios reducers
const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos,
  visibilityFilter
});
// Creamos el stote del los reducers
const { createStore } = Redux;
const store = createStore(todoApp);

const { Component } = React;

// Un Component basado en function resivimos los props directamente
// children o props.children le indicamos que es el hijo de ese component
// children es una palabra reservada para lo hijos de los components
const Link = ({
  active,
  children,
  onClick
}) => {
  // Validamos que sea el filtro active true
  // Si es así enviamos es un span en vez de un <a>.
  if(active){
    return <span>{children}</span>
  }
  return <a href='#'
            onClick={ e => {
              e.preventDefault();
              onClick()
            }}
          >
            { children }
        </a>
};

class FilterLink extends Component {
  // Montamos el resultado del store.subscribe
  componentDidMount(){
    // Cuando damos un enter y no colocamos nada en la @ function le indicamos que es solo una linea.
    // Por eso no podemos agregar ; al final de this.forceUpdate
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  // Desmontamos el subscribe
  componentWillUnmount(){
    this.unsubscribe();
  }

  render(){
    const props = this.props;
    const state = store.getState();

    return (
      <Link
        active={ props.filter === state.visibilityFilter }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        { props.children }
      </Link>
    )
  }
}

const Footer = () => (
  // {/* Con el { ' ' } dejamos un espacio al lado. */}
  <p>
    Show:
    { ' ' }
    <FilterLink
      filter='SHOW_ALL'
    >
      All
    </FilterLink>
    { ', ' }
    <FilterLink
      filter='SHOW_ACTIVE'
    >
      Activate
    </FilterLink>
    { ', ' }
    <FilterLink
      filter='SHOW_COMPLETED'
    >
      Completed
    </FilterLink>
  </p>
);

// Pasando a components
const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}>
    {text}
  </li>
);

// Otro component llamando al component <Todo />
const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

const AddTodo = ({ onAddClick }) => {
  let input;
  return (
    <div>
      <input ref={text => {
        input = text;
      }} />
      <button onClick={ () => {
          onAddClick(input.value);
          input.value = '';
        }}>
          Add Todo
      </button>
    </div>
  )
}

// Un reducer donde manejamos los types de filters
const getVisibleTodos = (todos, filter) => {
  switch (filter){
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      // Este filter es una function propia de JavaScript
      // Entonces donde t.completed sea true
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      // Aca es lo mismo si es true lo cambia a false entonces ese no es Activate
      return todos.filter(t => !t.completed);
  }
}

// Con el dispatch despachamos el reducer todos
let nextTodoId = 0;
const TodoApp = ({ todos, visibilityFilter }) => {
  // text como tiene el mismo nombre se envia solo text en el object
  return (
    <div className='container'>
      <AddTodo onAddClick={text =>
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text,
          })
        }
      />
      <TodoList
        todos={
          getVisibleTodos(
            todos,
            visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
      <Footer />
    </div>
  );

}

/*
  Nota: Cada vez que dispara el dispatch se activa o vuelve a correr
    el store.subscribe(render);
  Todo lo que venga ... todos={store.getState().todos} visibilityFilter={store.getState().visibilityFilter}
*/
const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()}/>,
    document.getElementById('app')
  );
};
// Suscribimos la funcion render.
store.subscribe(render);
render();
