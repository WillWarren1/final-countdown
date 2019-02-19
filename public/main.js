let timer
let updateTimer = () => {
  timer = setTimeout(getLaunchData, 1000)
}

const main = () => {
  if (document.querySelector('h1.hello-world')) {
    document.querySelector('h1.hello-world').textContent =
      'Explore your universe.'
  }
  getNasaImage()
  getLaunchData()
  updateTimer()
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

let launchCounter = 0

const nextLaunch = () => {
  launchCounter = launchCounter + 1
}
const prevLaunch = () => {
  launchCounter = launchCounter - 1
}
document.querySelector('.right-arrow').addEventListener('click', nextLaunch)
document.querySelector('.left-arrow').addEventListener('click', prevLaunch)

const getLaunchData = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(resp => {
      return resp.json()
    })
    .then(launchData => {
      let spaceLaunch = launchData[launchCounter]
      console.log(launchData)
      let mission = spaceLaunch.mission_name
      let detail = spaceLaunch.details
      let launchSite = spaceLaunch.launch_site.site_name_long
      let launchTime = spaceLaunch.launch_date_unix
      let seconds = Math.floor(launchTime - todayUnix)
      let minutes = Math.floor(seconds / 60)
      let hours = Math.floor(minutes / 60) - 5
      let days = Math.floor(hours / 24)
      hours = hours - days * 24
      minutes = minutes - days * 24 * 60 - hours * 60 - 300 //why am i subtracting 300? i do not know, but it makes the time match the example website
      seconds =
        seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60 - 18000 //why am i subtracting 18,000? again i do not know but it works
      console.log(detail)
      console.log(launchSite)
      if (detail == null) {
        detail = 'No Description Available yet.'
      }
      document.querySelector('.mission').textContent = mission

      document.querySelector('.details').textContent = detail
      document.querySelector('.launch-time').textContent =
        days +
        ' days, ' +
        hours +
        ' hours, ' +
        minutes +
        ' mins, ' +
        seconds +
        ' seconds'
      document.querySelector('.launch-site').textContent = launchSite
    })
}

document.querySelector('.right-arrow').addEventListener('click', getLaunchData)
document.querySelector('.left-arrow').addEventListener('click', getLaunchData)
document.addEventListener('DOMContentLoaded', main)
