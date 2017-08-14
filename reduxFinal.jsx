/*
  Versión final de los examples de redux se eliminaron algunos comentarios.
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
const { connect } = ReactRedux;
// import { connect } from 'react-redux';

let nextTodoId = 0;
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  };
};

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
};

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

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

const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};

// Con esto ya no necesitamos el Component FilterLink
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);

// Recordar que este es un component function y solo se pasa el props y se ejecuta con el mismo nombre.
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

let  AddTodo = ({ dispatch }) => {
  let input;
  // Lo que devuelve ref en el unput es el value lo guardamos en una variable input
  return (
    <div>
      <input ref={text => {
        input = text;
      }} />
      <button onClick={ () => {
          dispatch(addTodo(input.value))
          input.value = '';
        }}>
          Add Todo
      </button>
    </div>
  )
}
// Como AddTodo no tiene components hijos se envia el connect a el mismo.
AddTodo = connect()(AddTodo);

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

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};

const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  };
};

// Se creo un component basado en connect de ReactRedux para pasar los state y el dispatch
// Con esto no necesitamos el component VisibleTodoList
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

// Con el dispatch despachamos el reducer todos
const TodoApp = () => {
  // text como tiene el mismo nombre se envia solo text en el object
  return (
    <div className='container'>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  );
}

// Necesitamos tener instalado React-redux para usar provider de Redux
const { Provider } = ReactRedux;

// Creamos el store del los reducers
const { createStore } = Redux;

// Cada vez que hacemos render de TodoApp usamos el componentDidMount(),
// para subscribe el nuevo state o reducer
// Pasamos el store como una prop para no tenerla como global
ReactDOM.render(
  <Provider store={ createStore(todoApp) }>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);

/*
  Nota: En los JSX { } no se puede colocar ; al final de cada sentencia de código.
*/
