import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { store } from './app/store'
import App from './components/App'
import './style.css'

declare global {
  interface Window {
      mystore: unknown
  }
}
window.mystore = store

const Index = () => {
  return (
    <Provider store={store}>
      <div>
          <HashRouter ><App/></HashRouter >
      </div>
    </Provider>

  )
}
ReactDOM.render(<Index />, document.getElementById('root'))
