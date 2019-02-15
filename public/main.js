const main = () => {
  if (document.querySelector('h1.hello-world')) {
    document.querySelector('h1.hello-world').textContent =
      'Explore your universe.'
  }
}

document.addEventListener('DOMContentLoaded', main)
