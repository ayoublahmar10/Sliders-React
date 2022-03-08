import React from 'react'
import { SlideShow } from './SlideShow'
import { AppToolbar } from './AppToolbar'
import { Redirect, Route, Switch } from 'react-router'
import { RootState, store } from '../app/store'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setSlide } from '../slices/slideshowSlice'
import { isMobile } from 'react-device-detect'
import Controller from './Controller'
import Present from './Present'

const App: React.FC = () => {
  const slides = useAppSelector((state: RootState) => state.slidetest)

  const dispatch = useAppDispatch()

  window.onpopstate = function (event) {
    // console.log(
    //   'location: ' +
    //     document.location +
    //     ', state: ' +
    //     JSON.stringify(slides.currentSlide)
    // )
    const currentSlide = Number(window.location.href.split('/')[5])

    dispatch(setSlide(currentSlide, true))
  }

  const url = isMobile ? 'control' : 'edit'
  const hash = '#/' + url + '/' + slides.currentSlide

  if (location.hash !== hash) {
    window.location.hash = hash
    // Force scroll to top this is what browsers normally do when
    // navigating by clicking a link.
    // Without this, scroll stays wherever it was which can be quite odd.
    document.body.scrollTop = 0
  }

  const renderContent = () => {
    return (
      isMobile
        ? (
        <Redirect to="/control/0" />
          )
        : (
        <Redirect to="/edit/0" />
          )
    )
  }

  const renderMobile = () => {
    return <div
    className="min-h-screen antialiased
    bg-gradient-to-r
    from-pink-300
    via-purple-300
    to-indigo-400 p-20 text-blue-800"
  >
    <Controller slides={slides.slides} /> <br />
    <AppToolbar slides={slides.slides} currentSlide={slides.currentSlide} />
  </div>
  }

  const renderDesktop = () => {
    return (
      <div
        className="min-h-screen antialiased
        bg-gradient-to-r
        from-pink-300
        via-purple-300
        to-indigo-400 p-20 text-blue-800"
      >
        <SlideShow slides={slides.slides} /> <br />
        <AppToolbar slides={slides.slides} currentSlide={slides.currentSlide} />
      </div>
    )
  }

  return (
    <Switch>
      {isMobile
        ? <Route exact path="/control/:id" render={renderMobile}></Route>
        : <Route exact path="/edit/:id" render={renderDesktop}></Route>
        }
        <Route exact path="/present/:id" render={
        () => (
          <Present slides={slides.slides}/>
        )}/>
      <Route exact path="*" render={renderContent}></Route>

    </Switch>
  )
}

export default App
