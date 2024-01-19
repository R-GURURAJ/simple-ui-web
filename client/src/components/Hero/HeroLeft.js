import React from 'react'
import Cards from '../Cards'

function HeroLeft() {
  return (
    <div className='w-[70%] bg-slate-300'>
      <div className='flex flex-wrap py-10 justify-center gap-10'>
        <Cards name={'Groups'} descr={"Subject chat groups.."} />
        <Cards name={'Internal Marks'} descr={"Can view internal marks.."} />
        <Cards name={'Attendance'} descr={"Attandance for all students.."} />
        <Cards name={'Video Meet'} descr={"Group call to all.."} />

      </div>
    </div>

  )
}

export default HeroLeft
