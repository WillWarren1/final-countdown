const main = () => {
  if (document.querySelector('h1.hello-world')) {
    document.querySelector('h1.hello-world').textContent =
      'Explore your universe.'
  }
  getNasaImage()
}

const getNasaImage = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(resp => {
      return resp.json()
    })
    .then(pic => {
      console.log(pic)
      let hero = pic.url
      document
        .querySelector('.hero-image')
        .setAttribute('style', `background-image: url("${hero}")`)
    })
}

document.addEventListener('DOMContentLoaded', main)
