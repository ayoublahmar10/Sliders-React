import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Slide from '../components/type'
import data from '../data/slides.json'

interface Slides {
    slides: Slide[]
    currentSlide: number

  }

const initialState: Slides = {
  slides: data,
  currentSlide: 0

}

export const slideshowSlice = createSlice({
  name: 'slidesApp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    nextSlide: (state) => {
      if (state.currentSlide + 1 > state.slides.length - 1) {
        state.currentSlide = 0
      } else {
        state.currentSlide += 1
      }
    },
    previousSlide: (state) => {
      // TODO
      if (state.currentSlide - 1 < 0) {
        state.currentSlide = state.slides.length - 1
      } else {
        state.currentSlide -= 1
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSlide: {
      reducer: (state, action: PayloadAction<number, string, boolean>) => {
        state.currentSlide = action.payload
      },
      prepare (payload: number, meta: boolean) {
        return { payload, meta: meta }
      }

    },

    changeVisibilitySlide: {
      reducer: (state, action: PayloadAction<number, string, boolean>) => {
        state.slides[action.payload].visible = !state.slides[action.payload].visible
      },
      prepare (payload: number, meta: boolean) {
        return { payload, meta: meta }
      }
    }

  }

})

export const { nextSlide, previousSlide, setSlide, changeVisibilitySlide } = slideshowSlice.actions
export default slideshowSlice.reducer
