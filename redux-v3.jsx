/*
  Versión 3 de los ejercicios de ejemmplo en redux.
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
    const { store } = this.props;
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
    const { store } = this.props;
    // Cuando usamos esto estamos usando los reducers ya definidos
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

// Recordar que este es un component function y solo se pasa el props y se ejecuta con el mismo nombre.
const Footer = ({ store }) => (
  // {/* Con el { ' ' } dejamos un espacio al lado. */}
  <p>
    Show:
    { ' ' }
    <FilterLink
      filter='SHOW_ALL'
      store={ store }
    >
      All
    </FilterLink>
    { ', ' }
    <FilterLink
      filter='SHOW_ACTIVE'
      store={ store }
    >
      Activate
    </FilterLink>
    { ', ' }
    <FilterLink
      filter='SHOW_COMPLETED'
      store={ store }
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

// Recordar que este es un component function y solo se pasa el props y se ejecuta con el mismo nombre.
const AddTodo = ({ store }) => {
  let input;
  // Lo que devuelve ref en el unput es el value lo guardamos en una variable input
  return (
    <div>
      <input ref={text => {
        input = text;
      }} />
      <button onClick={ () => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: input.value
          })
          input.value = '';
        }}>
          Add Todo
      </button>
    </div>
  )
}

// Un reducer donde manejamos los types de filters
// Realmente no es un reducer porque no esta en createStore es solo una function
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

/*
  El store contiene todo el árbol de estado de tu aplicación. La única forma de cambiar el estado que contiene es despachando una acción.
*/

class VisibleTodoList extends Component {
  // Montamos el resultado del store.subscribe
  componentDidMount(){
    const { store } = this.props;
  // Cuando damos un enter y no colocamos nada en la @ function le indicamos que es solo una linea.
  // Por eso no podemos agregar ; al final de this.forceUpdate
  // El componente necesita volver a renderizar llamando a forceUpdate ().
  /*
    Example:
    const render = () => {
      ReactDOM.render(....);
    };
    store.subscribe(render);
  */
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
    const { store } = this.props;
    // getState() regresa el actual árbol de estado de tu aplicación. Es igual al último valor regresado por los reducers del store.
    const state = store.getState();
    /*
    El dispatch
    Despacha una acción. Esta es la única forma de realizar un cambio de estado.
    */
    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    );
  }
}

// Con el dispatch despachamos el reducer todos
let nextTodoId = 0;
const TodoApp = ({ store }) => {
  // text como tiene el mismo nombre se envia solo text en el object
  return (
    <div className='container'>
      <AddTodo store={ store }/>
      <VisibleTodoList store={ store }/>
      <Footer store={ store }/>
    </div>
  );
}

// Creamos el stote del los reducers
const { createStore } = Redux;

// Cada vez que hacemos render de TodoApp usamos el componentDidMount(),
// para subscribe el nuevo state o reducer
// Pasamos el store como una prop para no tenerla como global
ReactDOM.render(
  <TodoApp store={ createStore(todoApp) }/>,
  document.getElementById('app')
);

/*
  Nota: En los JSX { } no se puede colocar ; al final de cada sentencia de código.
*/
