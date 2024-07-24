import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

export const NotFound = () => {
  return (
    <main className='not-found-page'>
      <section className='not-found-content'>
        <h1 className='not-found-header'>Page not found</h1>
        <h3>Use navigation bar to navigate</h3>
      </section>
    </main>
  )
}