// Este en teoria es el reducer donde estas las opciones dependiendo del type de action.
const counter = (state = 0, action) => {
  switch (action.type){
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const { createStore } = Redux;
// var createStore = Redux.createStore(counter);
// import { createStore } from 'redux';
const store = createStore(counter);

// console.log(store.getState());
// store.dispatch({ type: 'INCREMENT' });
// console.log(store.getState());

/*
 // Example 1
const render = () => {
  document.body.innerHTML = store.getState();
}

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});*/

/*
  Example 2
*/

// Podemos usar parentesis en vez de llaves para no usar el return
// const Counter = (props) => (
//   <h1>{props.value}</h1>
// );

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{ value }</h1>
    <button onClick={ onIncrement }>+</button>
    <button onClick={ onDecrement }>-</button>
  </div>
);

const increment = {
  type: 'INCREMENT'
}

const decrement = {
  type: 'DECREMENT'
}

const render = () => {
  // ReactDOM.render(
  //   <Counter
  //     value={ store.getState() }
  //     onIncrement={ () =>
  //       store.dispatch({
  //         type: 'INCREMENT'
  //       })
  //     }
  //     onDecrement={ () =>
  //       store.dispatch({
  //         type: 'DECREMENT'
  //       })
  //     }
  //   />,
  //   document.getElementById('app')
  // );

  ReactDOM.render(
    <Counter
      value={ store.getState() }
      onIncrement={ () =>
        store.dispatch(increment)
      }
      onDecrement={ () =>
        store.dispatch(decrement)
      }
    />,
    document.getElementById('app')
  )
}

store.subscribe(render);
render();

// Nota: El estado deberia siempre mantenerse es decir nunca mutarlo sino que el estado anterior permanesca,
// Y solo se agregue un nuevo estado a un array.

/*
  Example 3
*/

// Mantemos siempre el state anterior en este caso.
const reducer = (state = [], action) => {
  switch (action.type){
    case 'add_to_array':
      return [action.payload];
    case 'add_one_more':
      return [...state, action.payload];
    default:
      return state;
  }
}

const { createStore } = Redux;
// var createStore = Redux.createStore(counter);
// import { createStore } from 'redux';
const store = createStore(reducer);

store.getState();

const action = {
  type: 'add_to_array',
  payload: 'ReduxIsAwesome'
}
const action2 = {
  type: 'add_one_more',
  payload: 'And fun'
}
store.dispatch(action);
store.dispatch(action2);
document.body.innerHTML = store.getState();
