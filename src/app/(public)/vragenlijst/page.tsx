'use client'; 

import React from 'react'

import { motion } from 'framer-motion' 
import { TestContaxt } from '@/website/features/contact/multistep/test-contact';

const Page = () => {

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9}}
      animate={{ opacity: 1, scale: 1}}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=' h-screen w-full'
      // className='w-screen h-screen'
    >
      <TestContaxt />
    </motion.div>
  )
}

export default Page