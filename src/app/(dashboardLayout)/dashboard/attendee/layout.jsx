import { roleValidator } from '@/lib/api/session';
import React from 'react'

const AttandeeLayout = async ({children}) => {

   await roleValidator('attendee');

  return children;
}

export default AttandeeLayout
