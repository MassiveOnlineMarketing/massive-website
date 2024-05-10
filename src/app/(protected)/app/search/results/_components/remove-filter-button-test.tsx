'use client';

import { useGoogleFilter } from '@/dashboard/google-result/hooks/useGoogleFilter'
import { GoogleResultFilterWithUrls } from '@/dashboard/types'
import React from 'react'


const filter: GoogleResultFilterWithUrls = {
  "id": "clw149poy0009gmyxwawb9b6i",
  "name": "test 5 ",
  "websiteId": "clvl59uf400682isdjbg7j0qc",
  "urls": [
      {
          "url": "fiveelephant.com/",
      }
  ]
}

const RemoveFilterButtonTest = () => {
  const { deleteFilterAndToast } = useGoogleFilter()

  const handleClick = async () => {
    deleteFilterAndToast(filter)
  }

  return (
    <div><button
    onClick={handleClick}>
      remove filter
      </button></div>
  )
}

export default RemoveFilterButtonTest