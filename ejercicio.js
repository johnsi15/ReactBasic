/*
  Ejercicio 1
*/


// Nota estos components se pueden tener en varios files,
// para no hacer tan grande this file.
class App extends React.Component {
  constructor(props) {
    super(props);
    const { list } = this.props;
    // Esto es un ejemplo de como tener un stado padre y pasar ese cambio de estado a sus hijos,
    // Nota: no es muy recomendable para proyectos grandes ya que se maneja el index por callbacks
    this.state = {
      list: list,
      moviesLength: list.length,
      likeCount: 0,
      unlikeCount: 0
    };
    this.onLike = this.onLike.bind(this);
    this.onUnlike = this.onUnlike.bind(this);
  }

  // index por callbacks hace referencia a cada movie unica
  onLike(index) {
    const { list, likeCount, unlikeCount } = this.state;
    const newList = list;
    const { like, unlike } = newList[index];
    newList[index].like = !like;
    newList[index].unlike = !like && unlike ? false : unlike;
    this.setState({
      list: newList,
      likeCount: !like ? likeCount + 1 : likeCount - 1,
      unlikeCount: !like && unlike ? unlikeCount - 1 : unlikeCount
    })
  }

  onUnlike(index) {
    const { list, likeCount, unlikeCount } = this.state;
    const newList = list;
    const { unlike, like } = newList[index];
    newList[index].unlike = !unlike;
    newList[index].like = !unlike && like ? false : like;
    this.setState({
      list: newList,
      unlikeCount: !unlike ? unlikeCount + 1 : unlikeCount - 1,
      likeCount: !unlike && like ? likeCount - 1 : likeCount
    })
  }
  // Nota: los props se pueden pasar a los hijos.
  render(){
    // Me muestra todo el object data
    // console.log(this.props.list)
    const {
      moviesLength,
      likeCount,
      unlikeCount
    } = this.state;
    // Se puede usar this.props.list O this.state.list porque al final se esta modificando el list.
    return(
      <section className="container">
        <MovieList list={ this.state.list }
            onLike={ this.onLike }
            onUnlike={ this.onUnlike }/>

        <Footer all={ moviesLength }
           likeCount={ likeCount }
           unlikeCount={ unlikeCount }/>
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
    const { list, onLike, onUnlike } = this.props;
    // Le enviamos al component Movie por los props la data,
    // Ej: title={this.props.list.title} description={this.props.list.description},
    // Con los ... se envian todos esos props { ...movie }
    const listMovies = this.props.list.map((movie, index) => {
                        // console.log('Hola movie -> ', movie)
                        return <Movie { ...movie } key={ index }
                                        onLike={ onLike }
                                        onUnlike={ onUnlike }
                                        index={ index } />
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

  // onLike(e){
  //   e.preventDefault();
  //   this.setState(function(prevState){
  //     const like = !prevState.like;
  //     return {
  //       like: like,
  //       unlike: like ? false : this.state.unlike
  //     }
  //   })
  // }
  //
  // onUnLike(e){
  //   e.preventDefault();
  //   this.setState(function(prevState){
  //     const unlike = !prevState.unlike;
  //     return {
  //       like: unlike ? false : this.state.like,
  //       unlike: unlike
  //     }
  //   })
  // }

  // Esto se puede mejorar con redux.
  onLike = (event) => {
    event.preventDefault();
    this.props.onLike(this.props.index);
  }

  onUnlike = (event) => {
    event.preventDefault();
    this.props.onUnlike(this.props.index);
  }

  // Tener en cuenta que hacer los eventos handler click o cualquier tipo de evento,
  // No es recomendado hacer los eventos de estar manera ya que el render vuelve a dibujar todo el elemento,
  // No tiene un perfomance.
  render(){
    // Aya aca con this.props podemos usar directamente this.props.title etc...
    // console.log(this.props);

    // Cuando se declarar objects de esta forma deben tener el mismo nombre en ambos lados.
    const {
      image,
      description,
      title,
      like = false,
      unlike = false
    } = this.props;

    return(
      <li className="Movie">
        <figure className="Movie-image">
          <img height="160px" width="110" src={ image } />
        </figure>
        <div className="Movie-content">
          <div className="Movie-meta">
            <h2>{ title }</h2>
            <p>{ description }</p>
          </div>
          <div className="Movie-actions">
            <span onClick={this.onLike} className={`icon-like ${like ? 'is-liked' : '' }`}>&#10003;</span>
            <span onClick={this.onUnlike} className={`icon-unlike ${unlike ? 'is-unliked' : '' }`}>&#10005;</span>
          </div>
        </div>
      </li>
    );
  }
}

// Otra forma de pasar los objectos directamente como si fueran los props
const Footer = ({ likeCount, unlikeCount, all }) => {
  // const { likeCount, unlikeCount, all } = this.props;
  return(
    <footer className="footer">
      <p>Likes: <span className="likes">{ likeCount }</span></p>
      <p>Unlikes: <span className="unlikes">{ unlikeCount }</span></p>
      <p>Total: <span className="total">{ all }</span></p>
    </footer>
  )
}

// Un array de objects
const data = [
  {
    title: "Wonder Woman",
    description: "Antes de ser Wonder Woman ...",
    like: false,
    unlike: false,
    image: "https://image.tmdb.org/t/p/w300/yjzHtHSAPDdRQejnTyFbifX2gef.jpg"
  },
  {
    title: "The Mummy",
    like: false,
    unlike: false,
    description: "A pesar de estar enterrada en ...",
    image: "https://image.tmdb.org/t/p/w300/6kCPiZ0eG3BoWvxgTq2Z8AYnEo.jpg"
  },
  {
    title: "Piratas del caribe",
    like: false,
    unlike: false,
    description: "Empujado hacia una nueva aventura ...",
    image: "https://image.tmdb.org/t/p/w300/gB3cNhpfxEWSjiKSGOv8nlmVdeu.jpg"
  },
  {
    title: "Logan",
    like: false,
    unlike: false,
    description: "Sin sus poderes, por primera vez ...",
    image: "https://image.tmdb.org/t/p/w300//5pAGnkFYSsFJ99ZxDIYnhQbQFXs.jpg"
  },
  {
    title: "John Wick",
    like: false,
    unlike: false,
    description: "Sin sus poderes, por primera vez ...",
    image: "https://image.tmdb.org/t/p/w300/sl3QSDb7rB6dS4wzJoTJbhCVvVF.jpg"
  },
  {
    title: "Guardianes de la Galaxia",
    like: false,
    unlike: false,
    description: "Sin sus poderes, por primera vez ...",
    image: "https://image.tmdb.org/t/p/w300/9Ju7p4daJi5rcTUghYZxHlP15ia.jpg"
  },
  {
    title: "Alien: Covenant",
    like: false,
    unlike: false,
    description: "Sin sus poderes, por primera vez ...",
    image: "https://image.tmdb.org/t/p/w300/ewVHnq4lUiovxBCu64qxq5bT2lu.jpg"
  }
]

const app = document.getElementById('app');

ReactDOM.render(
  <App list={ data } />,
  app
);
