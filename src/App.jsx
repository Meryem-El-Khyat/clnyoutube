"use client"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import AppLayout from "./components/AppLayout"

export default function App() {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  )
}