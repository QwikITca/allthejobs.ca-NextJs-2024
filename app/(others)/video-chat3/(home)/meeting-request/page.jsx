import React from 'react'
import CallList from '../../Components/CallList'

const page = () => {
  return (
    <section className='flex size-full flex-col gap10 '>
    <h1 className='text-3xl font-bold'>Request</h1>
    <CallList type="request"></CallList>
  </section>
  )
}

export default page