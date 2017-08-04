/*
  Componentes y propiedades React.js
*/

// Esto es un componente con propiedades,
// Por defecto de react se escribe con mayuscula la primera letra del componente,
// Este componente se puede usar muchas veces
/*function Saludar(props){
  // Se puede escribir todo el código que se quiera,
  // Pero tener en cuenta que siempre se tiene que devolver algo en el return.
  // En este caso un elemento con JSX
  return <h1>Hola {props.name} </h1>
}

ReactDOM.render(
  <div>
    <Saludar name='John Serrano'/>
    <Saludar name='Eduardo'/>
    <Saludar name='Andrey'/>
  </div>,
  document.getElementById('app')
);*/


/*
  Example 2
*/

/*const User = props =>{
  return (
    <div>
      <img src={props.img} alt={props.name}/>
      <p>{props.name}</p>
    </div>
  )
};

ReactDOM.render(
  <User img="https://avatars0.githubusercontent.com/u/2974447?v=4&u=34d9fdc885d305dc858896529ce896023f6ead2a&s=400" name="John Serrano" />,
  document.getElementById('app')
);*/

/*
  Example 3
*/

/*// Componentes hijos
const Avatar = props => <img src={ props.userChild.img } alt={ props.userChild.name }/>;
const UserName = props => <p>{ props.userChild.name }</p>;

// Componente padre
const User = props => {
  return (
    <div>
      <Avatar userChild={ props.userFather } />
      <UserName userChild={ props.userFather }/>
    </div>
  )
};

// Objeto user
const user = {
  name: 'John Serrano',
  img: 'https://avatars0.githubusercontent.com/u/2974447?v=4&u=34d9fdc885d305dc858896529ce896023f6ead2a&s=400'
}

ReactDOM.render(
  <User userFather={user} />,
  document.getElementById('app')
);*/

/*
  Example 4

  Existen dos tipos de componentes, con estado (statefull components) y sin estado (stateless components),
  En estos ejemlpos son stateless -> componentes sin estado,
  Simplemente sirven para dibujar componente no van a tener ningun cambio de estado, 
  No existe ninguna accion o evento
*/

// Esto es un array de objetos como un JSON
const teachers = [
  {
    name: 'John Andrey',
    img: 'https://avatars0.githubusercontent.com/u/2974447?v=4&u=34d9fdc885d305dc858896529ce896023f6ead2a&s=400'
  },
  {
    name: 'John Serrano',
    img: 'http://lorempixel.com/250/250/people/color/'
  },
  {
    name: 'Eduardo',
    img: 'http://lorempixel.com/250/250/people/color/'
  },
  {
    name: 'Roberto',
    img: 'http://lorempixel.com/250/250/people/color/'
  },
  {
    name: 'Jhonatan',
    img: 'http://lorempixel.com/250/250/people/color/'
  },
];

// Componentes hijos
const Avatar = props => <img src={ props.userChild.img } alt={ props.userChild.name }/>;
const UserName = props => <p>{ props.userChild.name }</p>;

// Componente padre
const User = props => {
  return (
    <div className="user-item">
      <Avatar userChild={ props.userFather } />
      <UserName userChild={ props.userFather }/>
    </div>
  )
};

const UsersList = props => {
  // mapeamos el array de objetos y lo guardamos en un nuevo array pero ya listo de componentes.,
  // Se recomienda que el key sea el id que venga del request o de la base de datos y no el id que se genera del map,
  // Porque react se basa en el key para direfenciar a un componente de otro para hacer cambios.
  // const listUser = props.list.map( (user, i) => <User userFather={ user } key={ i } /> );
  // Cuando es una funcion así recordar escribir el return
  const listUser = props.list.map( (user, i) => {
                      return <User userFather={ user } key={ i } />
                    });

  // Retornamos un JSX con el nuevo array que es un array de componentes <User />
  return (
    <div className="users-list">
      {listUser}
    </div>
  )
}

ReactDOM.render(
  <UsersList list={teachers} />,
  document.getElementById('app')
);