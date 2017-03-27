import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/Layout'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Navigation from './components/Navigation'
import Services from './pages/Services'
import injectTapEventPlugin from 'react-tap-event-plugin'
import injectAws from './services/injectAws'
import ua from 'universal-analytics'

// touch plugin

injectTapEventPlugin()

// theme

const theme = getMuiTheme({
  flatButton: {
    textColor: '#e6e6e6',
    primaryTextColor: '#fbe923',
  },
  textField: {
    focusColor: '#675a48'
  },
  toggle: {
    trackOnColor: '#93846e',
    trackOffColor: '#93846e',
    thumbOnColor: '#fbe923'
  }
})

// component

const getGaUid = client => (
  new Promise((resolve, reject) => {
    client.openOrCreateDataset('analytics', (err, dataset) => {
      if (err) reject(err)
      dataset.get('gaUid', (err, gaUid) => {
        if (err) reject(err)
        resolve(gaUid)
      })
    })
  })
)

const createUaInstance = gaUid => (
  new Promise((resolve, reject) => {
    resolve(ua(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID, gaUid, {https: true}))
  })
)

const storeGaUid = (client, gaUid) => (
  new Promise((resolve, reject) => {
    client.openOrCreateDataset('analytics', (err, dataset) => {
      if (err) reject(err)
      dataset.put('gaUid', gaUid, (err) => {
        if (err) reject(err)
        resolve(gaUid)
      })
    })
  })
)

let firstLoad = true

function setupTracking(cognitoSync) {
  if (firstLoad) {
    firstLoad = !firstLoad
    cognitoSync.then(getGaUid).then(createUaInstance).then(visitor => {
      visitor.pageview(browserHistory.getCurrentLocation().pathname).send()

      cognitoSync.then(getGaUid).then(gaUid => {
        if (gaUid === null) {
          cognitoSync.then(client => {
            storeGaUid(client, visitor.cid)
          })
        }
      })

      browserHistory.listen(event => {
        let { pathname, action } = event
        if (action === 'PUSH') {
          visitor.pageview(pathname).send()
        }
      })
    })
  }
}

class App extends Component {
  componentDidMount() {
    setupTracking(this.props.cognitoSync)
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <Router history={browserHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute components={{navigation: Navigation, content: Home}}/>
            <Route path="services" components={{navigation: Navigation, content: Services}}/>
            <Route path="blog" components={{navigation: Navigation, content: Blog}}/>
            <Route path="portfolio" components={{navigation: Navigation, content: Portfolio}}/>
            <Route path="contact" components={{navigation: Navigation, content: Contact}}/>
          </Route>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default injectAws(App)
