const main = () => {
  if (document.querySelector('h1.hello-world')) {
    document.querySelector('h1.hello-world').textContent =
      'Explore your universe.'
  }
  getNasaImage()
  getLaunchData()
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
      let copyright = pic.copyright
      if (copyright == null) {
        copyright = 'no copyright'
      }
      let title = pic.title
      document.querySelector(
        '.credit'
      ).textContent = `copyright: ${copyright} | title: ${title}`
    })
}

//calculate current time and current time in Unix,
//there's probably a simpler way to do this.
let time = new Date(1550522440 * 1000)
console.log(time)
let today = new Date()
let dd = today.getDate()
let mm = today.getMonth()
let yyyy = today.getFullYear()
let hour = today.getHours()
let minute = today.getMinutes()
let seconds = today.getSeconds()
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}
today = mm + '.' + dd + '.' + yyyy + '.' + hour + '.' + minute + '.' + seconds
console.log(today)

let todayUnix =
  new Date(Date.UTC(yyyy, mm, dd, hour, minute, seconds)).getTime() / 1000

console.log(todayUnix)
console.log(new Date(todayUnix * 1000))

const getLaunchData = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(resp => {
      return resp.json()
    })
    .then(launchData => {
      console.log(launchData)
      let detail = launchData[0].details
      let launchSite = launchData[0].launch_site.site_name_long
      console.log(detail)
      console.log(launchSite)
    })
  if ((detail = null)) {
    detail = 'No Description Available yet.'
  }
}

document.addEventListener('DOMContentLoaded', main)
