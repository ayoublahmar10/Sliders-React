import * as React from 'react'
import { BrowserView, isMobile, MobileView } from 'react-device-detect'
import { useParams } from 'react-router'
import AppToolbar from './AppToolbar'
import SlideView from './SlideView'
import Slide from './type'

interface Props {
  slides: Slide[];
}

type RouteParams = {
  id: string;
};

const Present: React.FC<Props> = ({ slides }) => {
  const params = useParams<RouteParams>()

  return (
    <BrowserView>
      <div
        className="min-h-screen antialiased
        bg-gradient-to-r
        from-pink-300
        via-purple-300
        to-indigo-400 p-20 text-blue-800"
      >
      <div>
        <SlideView slide={slides[Number(params.id)]}></SlideView>
      </div>
      </div>
    </BrowserView>
  )
}

export default Present
