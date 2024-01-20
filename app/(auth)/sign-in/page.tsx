'use client'
import React, { useState } from 'react'
import SignIn from './form'
import userStore from '@/store';

const Page = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedA, setIsFocusedA] = useState(false);
    const { isLoading, setIsLoading, initials, setInitials } = userStore();

  return (
    <div>
        <SignIn isFocused={[isFocused, isFocusedA]} setIsFocused={[setIsFocused, setIsFocusedA]} isLoading={isLoading} />
    </div>
  )
}

export default Page
