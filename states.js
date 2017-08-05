/*
  Component sin state
*/

/*// Recuerda siempre la primera letra en mayuscula es una buena practica
const Hello = props => {
  return (
    <h1 className="holaMundo">{props.saludo}</h1>
  )
}

ReactDOM.render(
  <Hello saludo="Hola mundo"/>,
  document.getElementById('app')
);*/

/*
  Example 1
  Componente con estado extendido en clases
  (statefull components) -> Componentes con estados
*/

/*class Hello extends React.Component {
  // El constructor es por defecto de React.Component ay que agregarlo tal cual como esta con super(props)
  constructor(props){
    super(props);

    // Estados iniciales es decir por defecto
    this.state = {
      name: 'John Andrey'
    }
  }

  render(){
    // Como estamos en una clase ay que usar this para poder acceder a la propiedad props
    return(
      <h1 className="holaMundo">{`Saludando: ${this.props.saludo}`} - {this.state.name}</h1>
    )
  }
}

// El estado se define dentro de la misma clase solo vive en ese componente
// Recordar el estado solo vive en esa clase o componente, 
// No es necesario pasar una propiedad si solo se va usar el estado
ReactDOM.render(
  <Hello saludo="Hola"/>,
  document.getElementById('app')
);*/

/*
  Example 2
*/

/*class Hello extends React.Component {
  // El constructor es por defecto de React.Component ay que agregarlo tal cual como esta con super(props)
  constructor(props){
    super(props);

    // Estados iniciales es decir por defecto
    this.state = {
      name: 'John Andrey',
      edad: 24
    }

    // Bindamos el this le indicamos a la function changeName que su this es el this del componente,
    // Es decir que su nuevo this es el this de la clase Hello para que se pueda hacer el this.setState
    this.changeName = this.changeName.bind(this);
  }

  changeName(){
    // console.log('Esto es this -> ', this);
    // Si no hacemos bind de esta function el this.setSate nunca funciona porque toma es el this local de la funcion,
    // Osea su propio this o mas bien su scope que es su alcanze.
    this.setState(function(prevState){
      return {
        name: 'Andrey'
        edad: prevState.edad + 1
      }
    });
  }

  render(){
    // Como estamos en una clase ay que usar this para poder acceder a la propiedad props
    return(
      <h1 className="holaMundo" onClick={this.changeName}>
        {`Hola ${this.state.name}`}
        <aside>{` - Tengo ${this.state.edad}`}</aside>
      </h1>
    )
  }
}

// El estado se define dentro de la misma clase solo vive en ese componente
// Recordar el estado solo vive en esa clase o componente, 
// No es necesario pasar una propiedad si solo se va usar el estado
ReactDOM.render(
  <Hello />,
  document.getElementById('app')
);*/


/*
  Example 3
*/

class Counter extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      count: 0
    }

    this.upCount = this.upCount.bind(this);
    this.downCount = this.downCount.bind(this);
    this.resetCount = this.resetCount.bind(this);
  }

  upCount(e){
    e.preventDefault();
    // Cuando se quieren acumular un valor o aumentar se recomienda,
    // Enviar una function con parametro prevState y retorna un object
    this.setState(function(prevState){
      return {
        count: prevState.count + 1
      }
    });
  }

  downCount(e){
    e.preventDefault();
    // Enviar una function con parametro prevState y retorna un object
    this.setState(function(prevState){
      if(prevState.count > 0){
        return {
          count: prevState.count - 1
        }
      }
    });
  }

  resetCount(e){
    e.preventDefault();

    this.setState({
      count: 0
    });
  }

  render(){
    return(
      <div className="counter">
        <div className="count">{this.state.count}</div>
        <div className="changeCounter">
          <a href="#" onClick={this.upCount}>Up</a>
          <a href="#" onClick={this.downCount}>Down</a>
          <a href="#" onClick={this.resetCount}>Reset</a>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('app')
);