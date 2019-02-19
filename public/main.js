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
let second = today.getSeconds()
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}
today = mm + '.' + dd + '.' + yyyy + '.' + hour + '.' + minute + '.' + second
console.log(today)

let todayUnix =
  new Date(Date.UTC(yyyy, mm, dd, hour, minute, second)).getTime() / 1000

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
      let launchTime = launchData[0].launch_date_unix
      let timeDifference = Math.abs(launchTime - todayUnix) / 1000
      //days
      let days = Math.floor(timeDifference / 86400)
      timeDifference -= days * 86400
      //hours
      let hours = Math.floor(timeDifference / 3600) % 24
      timeDifference -= hours * 3600
      //minutes
      let minutes = Math.floor(timeDifference / 60) % 60
      timeDifference -= minutes * 60
      //seconds
      let seconds = Math.floor(timeDifference % 60)
      console.log(detail)
      console.log(launchSite)
      if (detail == null) {
        detail = 'No Description Available yet.'
      }
      document.querySelector('.details').textContent = detail
      document.querySelector('.launch-time').textContent =
        days + ' days, ' + minutes + ' mins, ' + seconds + 'seconds'
      document.querySelector('.launch-site').textContent = launchSite
    })
}

document.addEventListener('DOMContentLoaded', main)
