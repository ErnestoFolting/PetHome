import React from 'react'
export default function convertDate(date){
    return new Date(Date.parse(date)).toLocaleDateString() 
}
