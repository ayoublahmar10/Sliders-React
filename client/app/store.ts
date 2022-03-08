import { AnyAction, applyMiddleware, configureStore, Middleware, Store, Dispatch } from '@reduxjs/toolkit'
import slideshowReducer, { changeVisibilitySlide, setSlide } from '../slices/slideshowSlice'
import { io } from 'socket.io-client'

const myLoggerMiddleware: Middleware<Dispatch<AnyAction>> = (store: Store) => (next) => {
  return (action: AnyAction) => {
    console.log('State Before:', store.getState())
    return next(action)
  }
}

const socket = io()

export const SocketReceiveAction:Middleware<Dispatch> =
(store: Store) => (next) => (action: AnyAction) => {
  socket.on('action', (msg) => {
    console.log('action Succefully received from the server', msg)
    switch (
      msg.type // ajuster le msg.type pour qu'il corresponde bien à celui dédifit pour l'action votre reducer
    ) {
      case 'slidesApp/setSlide': // <- probablement autre chose à vous de trouver
        // console.log('slide****', msg.payload)
        store.dispatch(setSlide(msg.payload, false))
        break

      case 'slidesApp/changeVisibilitySlide':
        store.dispatch(changeVisibilitySlide(msg.payload, false))
        break
    }
  })

  next(action)
}

export const propagateSocketMiddleware: Middleware<Dispatch> =
  () => (next) => (action: AnyAction) => {
    // Explorez la structure de l'objet action :
    // console.log('propagateSocketMiddleware', action)

    // TODO traiter et propager les actions au serveur.
    // Vous pourrez utiliser
    if (action.meta) { socket.emit('action', action) }

    // Après diffusion au serveur on fait suivre l'action au prochain middleware
    next(action)
  }

export const store = configureStore({
  reducer: {
    slidetest: slideshowReducer

  },
  middleware: [propagateSocketMiddleware, SocketReceiveAction]

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
