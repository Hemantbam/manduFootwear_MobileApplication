import { UserRegistrationDetails } from '@/context/Context'
import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
function Sample() {
    const{userDetails}=useContext(UserRegistrationDetails)
    useEffect(()=>{
        console.log(userDetails)
    })
  return (
    <>
      <View>
        <Text>
            This is testing
        </Text>
      </View>
    </>
  )
}

export default Sample
