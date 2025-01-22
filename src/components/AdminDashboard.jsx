import React from 'react'
import LeftSidebar from './Dashboard/LeftSidebar'
import RightSidebar from './Dashboard/RightSidebar' 
import Navbar from './Navbar/Navbar'

export default function AdminDashboard({userType, fetchCategories}) {
  return <>
  <Navbar />
    <div style={{ display: "flex" }}>
    <LeftSidebar userType={userType}/>
    <RightSidebar userType={userType} fetchCategories={fetchCategories}/>
  </div>
  </>
}
