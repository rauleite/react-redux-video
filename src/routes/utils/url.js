import { browserHistory } from 'react-router'

export function redirectToPrevUrl () {
  // change the current URL
  let redirectPrevUrl = localStorage.getItem('urlPrevLogin')
  console.log('redirectPrevUrl', redirectPrevUrl)
  if (redirectPrevUrl) {
    browserHistory.push(redirectPrevUrl)
  } else {
    browserHistory.push('/')
  }
}