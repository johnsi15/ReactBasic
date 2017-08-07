/*
  Ejercicio 1
*/


// Nota estos components se pueden tener en varios files,
// para no hacer tan grande this file.
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  // Nota: los props se pueden pasar a los hijos.
  render(){
    // Me muestra todo el object data
    // console.log(this.props.list)
    return(
      <section className="container">
        <h1> Hola mundo </h1>
      <MovieList list={ this.props.list }/>
        <Footer />
      </section>
    );
  }
}

class MovieList extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    // console.log(this.props.list)
    // Le enviamos al component Movie por los props la data,
    // Ej: title={this.props.list.title} description={this.props.list.description},
    // Con los ... se envian todos esos props { ...movie }
    const listMovies = this.props.list.map((movie, index) => {
                        // console.log('Hola movie -> ', movie)
                        return <Movie { ...movie } key={ index }/>
                      });
    return(
      <ul className="movieList">
        { listMovies }
      </ul>
    );
  }
}

// Puedo llevarme un component a otro project
class Movie extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    // Aya aca con this.props podemos usar directamente this.props.title etc...
    // console.log(this.props);

    // Cuando se declarar objects de esta forma deben tener el mismo nombre en ambos lados.
    const { title, description, image } = this.props;
    return(
      <li className="Movie">
        <figure className="Movie-image">
          <img height="160px" width="110" src={ image } />
        </figure>
        <div className="Movie-content">
          <div className="Movie-meta">
            <h2>{ title }</h2>
            <p>{ description}</p>
          </div>
          <div className="Movie-actions">
            <span className="icon-like">&#10003;</span>
          <span className="icon-unlike">&#10005;</span>
          </div>
        </div>
      </li>
    );
  }
}

const Footer = () => {
  return(
    <footer className="footer">
      <p>Likes: <span className="likes">9</span></p>
      <p>Unlikes: <span className="unlikes">3</span></p>
      <p>Total: <span className="total">12</span></p>
    </footer>
  )
}

// Un array de objects
const data = [
  {
    title: "Wonder Woman",
    description: "Antes de ser Wonder Woman ...",
    image: "https://image.tmdb.org/t/p/w300/yjzHtHSAPDdRQejnTyFbifX2gef.jpg"
  },
  {
    title: "The Mummy",
    description: "A pesar de estar enterrada en ...",
    image: "https://image.tmdb.org/t/p/w300/6kCPiZ0eG3BoWvxgTq2Z8AYnEo.jpg"
  },
  {
    title: "Piratas del caribe",
    description: "Empujado hacia una nueva aventura ...",
    image: "https://image.tmdb.org/t/p/w300/gB3cNhpfxEWSjiKSGOv8nlmVdeu.jpg"
  },
  {
    title: "Logan",
    description: "Sin sus poderes, por primera vez ...",
    image: "https://image.tmdb.org/t/p/w300//5pAGnkFYSsFJ99ZxDIYnhQbQFXs.jpg"
  },
  {
    title: "John Wick",
    description: "Sin sus poderes, por primera vez ...",
    image: "https://image.tmdb.org/t/p/w300/sl3QSDb7rB6dS4wzJoTJbhCVvVF.jpg"
  },
  {
    title: "Guardianes de la Galaxia",
    description: "Sin sus poderes, por primera vez ...",
    image: "https://image.tmdb.org/t/p/w300/9Ju7p4daJi5rcTUghYZxHlP15ia.jpg"
  },
  {
    title: "Alien: Covenant",
    description: "Sin sus poderes, por primera vez ...",
    image: "https://image.tmdb.org/t/p/w300/ewVHnq4lUiovxBCu64qxq5bT2lu.jpg"
  }
]

const app = document.getElementById('app');

ReactDOM.render(
  <App list={ data } />,
  app
);
