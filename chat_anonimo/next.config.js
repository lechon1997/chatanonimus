module.exports = {
  reactStrictMode: true,
  env: {
    URL_BACKEND: 'http://localhost:4000',
    URL_FRONTEND: 'http://localhost:3000'
    //URL_BACKEND: 'https://backend-chat-anonimus.herokuapp.com',
    //URL_FRONTEND: 'https://chatanonimus2.vercel.app' 
  },async redirects() {
    return [
      {
        source: '/inicio/ver-grupo',
        destination: '/inicio',
        permanent: false,
      },
      {
        source: '/inicio/agregar-miembro',
        destination: '/inicio',
        permanent: false,
      },
      {
        source: '/inicio/comentarios-nuevos',
        destination: '/inicio',
        permanent: false,
      },
      {
        source: '/inicio/comentarios-leidos',
        destination: '/inicio',
        permanent: false,
      },
      {
        source: '/inicio/crear-comentario',
        destination: '/inicio',
        permanent: false,
      },
    ]
  }
}
