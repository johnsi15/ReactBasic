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
// var createStore = Redux.createStore;
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

const render = () => {
  ReactDOM.render(
    <Counter
      value={ store.getState() }
      onIncrement={ () =>
        store.dispatch({
          type: 'INCREMENT'
        })
      }
      onDecrement={ () =>
        store.dispatch({
          type: 'DECREMENT'
        })
      }
    />,
    document.getElementById('app')
  )
}

store.subscribe(render);
render();
