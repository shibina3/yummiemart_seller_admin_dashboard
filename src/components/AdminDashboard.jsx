import React from 'react'
import LeftSidebar from './Dashboard/LeftSidebar'
import RightSidebar from './Dashboard/RightSidebar' 

export default function AdminDashboard({userType, fetchCategories}) {
  return (
    <div style={{ display: "flex" }}>
    <LeftSidebar userType={userType}/>
    <RightSidebar userType={userType} fetchCategories={fetchCategories}/>
  </div>
  )
}
