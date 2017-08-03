/*
  <div id="app">
    <h1 id="title">Hola <span>mundo</span></h1>
  </div>
*/

/*
  Vanilla js
*/

/*
// Ejemplo con vanilla js -> javaScript puro
const el = document.createElement('h1');
const child = document.createElement('span');

el.setAttribute('id', 'title');
el.textContent = 'Hola ';
child.textContent = 'mundo';

el.appendChild(child)

document.getElementById('app').appendChild(el);

*/


/*
  Con React.js
*/


/*
// Esto es gracias a React
const el = React.createElement(
  'h1', 
  { id: 'title' }, 
  'Hola ',
  React.createElement('span', null, 'mundo')
);
// Esto es gracias a React-dom
ReactDOM.render(el, document.getElementById('app'));
*/

/*
  Con React y JSX

  JSX no es string ni html.
  entre { } se puede escribir javaScript,
  JSX no usa - en la propiedades ej: <div id="holaMundo"></div>,
  la propiedad class es reservada de JSX se usa className,
  No se pueden tener dos elementos en el mismo nivel de la declaracion de JSX
*/

// Creamos el elemento JSX
// const el = (
//   <h1 id="title" className="title">
//     Hola { 2 * 9 } 
//     <span>mundo</span> 
//   </h1>
// );

/*
  No se puede tener dos elementos en el mismo nivel

  const el = (
  <h1 id="title" className="title">
    Hola { 2 * 9 } 
    <span>mundo</span> 
  </h1>
  <h2 className="title"></h2>
);
*/

// Renderizamos la variable JSX y le indicamos en que elemento lo enviamos.
// Gracias a React-dom
// ReactDOM.render(
//   el, 
//   document.getElementById('app')
// );

/*
  Reloj con vanilla js
*/

// const app = document.getElementById('app');

// function reloj(){
//   app.textContent = new Date().toLocaleTimeString();
// }

// setInterval(reloj, 1000);

/*
  React
*/
const app = document.getElementById('app');

function reloj(){
  let now = new Date().toLocaleTimeString();

  const el = <span>{ now }</span>;
  ReactDOM.render(
    el,
    app
  );
}

setInterval(reloj, 1000);

/*
  Ejemplo de JSX con React
*/

/*

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);

*/
