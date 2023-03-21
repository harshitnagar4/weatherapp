import { configureStore } from '@reduxjs/toolkit'
import locationSlicDataReducer from './location/Location'
export const store = configureStore({
  reducer: {
    locationSlicData:locationSlicDataReducer
  },
})