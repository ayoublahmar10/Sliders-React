import React from 'react'
import { BrowserView, isMobile } from 'react-device-detect'
import { useParams } from 'react-router-dom'
import SlideView from './SlideView'
import Slide from './type'

interface Props{
  slides : Slide[];
}
type RouteParams = {
  id: string;
};

export const SlideShow : React.FC<Props> = ({ slides }) => {
  const params = useParams<RouteParams>()

  const isVisible = slides[Number(params.id)].visible
  const opacity: string = isVisible ? 'opacity-100' : 'opacity-10'

  if (slides[Number(params.id)].type === 'content') {
    return (<BrowserView>
    <div className={opacity}>
  <div>
      <SlideView slide = { slides[Number(params.id)]}></SlideView>
    </div>
    </div>
    </BrowserView>

    )
  } else {
    return (
      <BrowserView>
      <div className={opacity}>
          <div className="grid place-items-center -mt-500 text-6xl">{slides[Number(params.id)].title}</div>
          </div>
          </BrowserView>
    )
  }
}
