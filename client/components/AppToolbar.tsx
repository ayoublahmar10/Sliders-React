import React from 'react'
import { useHistory } from 'react-router'
import {
  changeVisibilitySlide,
  nextSlide,
  previousSlide,
  setSlide
} from '../slices/slideshowSlice'
import Slide from './type'
import { useAppDispatch } from '../app/hooks'

interface Props {
  slides: Slide[];
  currentSlide: number;
}

type RouteParams = {
  id: string;
};

export const AppToolbar: React.FC<Props> = ({ slides, currentSlide }) => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const goFull = () => {
    history.push('/present/' + currentSlide)
  }

  const s = '/edit/' + currentSlide
  // Back to edit page when the user quit the present mode
  document.addEventListener('fullscreenchange', function (e) {
    if (!document.fullscreenElement) {
      history.push('/edit/' + currentSlide)
    }
  })

  // lors du click sur le bouton
  return (
    <div>
      <nav className="fixed bottom-0 inset-x-0 bg-blue-100 flex justify-between text-sm text-blue-900 uppercase font-mono">
        <div
          className="w-full block py-5 px-3 text-center hover:bg-blue-200 hover:text-blue-800 transition duration-300"
          onClick={() => {
            dispatch(changeVisibilitySlide(currentSlide, true))
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mb-2 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>

        <div className="relative inline-flex inline-flex flex-col bg-transparent items-center text-xs font-medium text-white py-3 px-3 flex-grow">
          <select
            onChange={(event) => {
              dispatch(setSlide(Number(event.target.value), true))
            }}
            className="bg-white rounded-full text-blue-600 h-8 w-8 pl-5 pr-10 hover:border-gray-400 border-blue-600 focus:outline-none appearance-none"
          >
            {slides.map((key, number) => (
              <option key={number}>{number}</option>
            ))}
          </select>
        </div>

        <div
          className="w-full block py-5 px-3 text-center hover:bg-blue-200 hover:text-blue-800 transition duration-300"
          onClick={goFull}
        >
            <svg
            className="w-6 h-6 mb-2 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
            )
          </svg>{' '}

        </div>

        <div
          className="w-full block py-5 px-3 text-center hover:bg-blue-200 hover:text-blue-800 transition duration-300"
          onClick={() => {
            dispatch(previousSlide())
          }}
        >
          &#x276E;
        </div>
        <div
          className="w-full block py-5 px-3 text-center hover:bg-blue-200 hover:text-blue-800 transition duration-300"
          onClick={() => {
            dispatch(nextSlide())
          }}
        >
          &#x276F;
        </div>
      </nav>
    </div>
  )
}

export default AppToolbar
