import React from 'react'
import { isMobile } from 'react-device-detect'
import Slide from './type'

interface Props {
    slide: Slide
}
const fullscreen = () => {
  const elem = document.querySelector('#fullscreen')
  if (!document.fullscreenElement) {
    elem.requestFullscreen()
  }
}

const SlideView : React.FC<Props> = ({ slide }) => {
  React.useEffect(() => {
    if (location.hash.includes('present')) {
      fullscreen()
    }
  }
  )
  return (
    <div id="fullscreen" className="bg-gray-200">

      <div className="grid-rows-1 gap-2 grid place-items-center  ">
        <h1 className="order-1 text-4xl border-2 border-indigo-300  ">{slide?.title}</h1>
        <p className="order-2 text-3xl mr-15  ml-3">{slide?.text}</p>
        <ul className="order-3 border-2 border-indigo-400 text-3xl">
          {slide.items?.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
        <img className="order-4 shadow rounded max-w-full h-auto  border-none " src={slide?.image}/>
        </div>
      </div>

  )
}

export default SlideView
