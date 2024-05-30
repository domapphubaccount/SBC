"use client"
import React, { useEffect, useState } from 'react'
import Header from '@/layout/Header/Header'
import axios from 'axios'

function DashLayout() {



  return (
    <div>        
        <Header code={code}/>
        <DashLayout />
    </div>
  )
}

export default DashLayout