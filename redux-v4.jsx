/*
  Versión 4 de los ejercicios de ejemmplo en redux.
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

// class FilterLink extends Component {
//   // Montamos el resultado del store.subscribe
//   componentDidMount(){
//     const { store } = this.context;
//     // Cuando damos un enter y no colocamos nada en la @ function le indicamos que es solo una linea.
//     // Por eso no podemos agregar ; al final de this.forceUpdate
//     this.unsubscribe = store.subscribe(() =>
//       this.forceUpdate()
//     );
//   }
//
//   // Desmontamos el subscribe
//   componentWillUnmount(){
//     this.unsubscribe();
//   }
//
//   render(){
//     const props = this.props;
//     const { store } = this.context;
//     // Cuando usamos esto estamos usando los reducers ya definidos
//     const state = store.getState();
//
//     return (
//       <Link
//         active={ }
//         onClick={() =>
//           store.
//         }
//       >
//         { props.children }
//       </Link>
//     )
//   }
// }
//
// FilterLink.contextTypes = {
//   store: React.PropTypes.object
// }

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

// Recordar que este es un component function y solo se pasa el props y se ejecuta con el mismo nombre.
// Podemos pasarle mas props y el context que en este caso es store

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
/* Internamente esto es lo que hace el connect o podriamos hacerlo manualmente*/
// AddTodo = connect(
//   state => {
//     return {};
//   },
//   dispatch => {
//     return { dispatch };
//   }
// )(AddTodo);

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

/*
  El store contiene todo el árbol de estado de tu aplicación. La única forma de cambiar el estado que contiene es despachando una acción.
*/

// class VisibleTodoList extends Component {
//   // Montamos el resultado del store.subscribe
//   componentDidMount(){
//     const { store } = this.context;
//   // Cuando damos un enter y no colocamos nada en la @ function le indicamos que es solo una linea.
//   // Por eso no podemos agregar ; al final de this.forceUpdate
//   // El componente necesita volver a renderizar llamando a forceUpdate ().
//   /*
//     Example:
//     const render = () => {
//       ReactDOM.render(....);
//     };
//     store.subscribe(render);
//   */
//     this.unsubscribe = store.subscribe(() =>
//       this.forceUpdate()
//     );
//   }
//
//   // Desmontamos el subscribe
//   componentWillUnmount(){
//     this.unsubscribe();
//   }
//
//   render(){
//     const props = this.props;
//     const { store } = this.context;
//     // getState() regresa el actual árbol de estado de tu aplicación. Es igual al último valor regresado por los reducers del store.
//     const state = store.getState();
//     /*
//     El dispatch
//     Despacha una acción. Esta es la única forma de realizar un cambio de estado.
//     */
//     return (
//       <TodoList
//         todos={
//
//         }
//         onTodoClick={
//         }
//       />
//     );
//   }
// }
// // Declaramos el context
// VisibleTodoList.contextTypes = {
//   store: React.PropTypes.object
// }

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
/* Todo esto es lo mismo que la linea de abajo con ReactRedux
class Provider extends Component {
  getChildContext(){
    return {
      store: this.props.store
    };
  }

  // Renderizamos el <TodoApp />
  render (){
    return this.props.children;
  }
}
// Declaramos el contexto hijo que vamos a usar en los demas components
Provider.childContextTypes = {
  store: React.PropTypes.object
};*/

// Necesitamos tener instalado React-redux para usar provider de Redux
const { Provider } = ReactRedux;
// import { Provider } from 'react-redux';
// var Provider = require('react-redux').Provider;

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
