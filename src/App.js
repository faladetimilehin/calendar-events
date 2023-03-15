import React, { useState } from 'react'

import Section from './components/Section'
import { generateDate, months } from './utils /calendar'
import cn from './utils /cn'
import dayjs from 'dayjs'
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import axios from 'axios'

const App = () => {
  const [token, setToken] = useState('')

  console.log(generateDate())

  const days = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"]
  const currentDate = dayjs()
  const [today, setToday] = useState(currentDate)
  const [selectDate, setSelectDate] = useState(currentDate)
  const [expired, setExpired] = useState(false)
  const [events, setEvents] = useState('')

  const getToken = () => {
    const config = {
      headers: {
        'Authorization': 'Bearer 264c77f740cc1f02cac8f0a7e30ccdcd2f20dcf5'
      }
    }
    axios.post(`https://api.arenaracingcompany.co.uk/auth`, null, config)
      .then(res => {
        console.log(res, 'hghvjckk')
        setToken(res.data)
        setExpired(true)
      }).catch(err => {
        console.log(err)
      })

  }

  const getDateEvents = () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    console.log(config)
    axios.get(`https://api.arenaracingcompany.co.uk/event/month/1318/0${today.month() + 1}`, config)
      .then(res => {
        console.log(res.data, 'Events')
        setEvents(res.data)
      }).catch(err => {
        console.log(err)
      })
  }
  const getPreviousDateEvents = () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    console.log(config)
    axios.get(`https://api.arenaracingcompany.co.uk/event/month/1318/${(today.month())}`, config)
      .then(res => {
        console.log(res.data, 'Events')
        setEvents(res.data)
      }).catch(err => {
        console.log(err)
      })
  }
  const getNextDateEvents = () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    console.log(config)
    axios.get(`https://api.arenaracingcompany.co.uk/event/month/1318/${(today.month() + 2)}`, config)
      .then(res => {
        console.log(res.data, 'Events')
        setEvents(res.data)
      }).catch(err => {
        console.log(err)
      })
  }
  return (
    <div className=' '>
      <Section />
      {expired ?
        < div className='flex w-1/2 mx-auto divide-x-2 gap-10 h-screen items-center'>
          <div className='w-96 h-96'>
            <div className='flex justify-between'>
              <h1>
                {months[today.month()]},{today.year()}
              </h1>

              <div className='flex items-center gap-5'>
                <GrFormPrevious className='h-5 w-5 cursor-pointer' onClick={() => {
                  setToday(today.month(today.month() - 1)); getPreviousDateEvents()
                }}
                />

                <h1 className='cursor-pointer ' onClick={() => {
                  setToday(currentDate)
                }}>
                  Today
                </h1>
                {/* <h1 className='cursor-pointer ' onClick={getDateEvents}>
                  Today
                </h1> */}

                <GrFormNext className='h-5 w-5 cursor-pointer'
                  onClick={() => {
                    setToday(today.month(today.month() + 1)); getNextDateEvents()
                  }} />
              </div>
            </div>
            <div className='w-full grid grid-cols-7  text-[#083A80]'>
              {days.map((day, index) => {
                return <h1 key={index} className="h-14 grid place-content-center">
                  {day}
                </h1>
              })}
            </div>
            <div className='w-full grid grid-cols-7 '>
              {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => {
                return (
                  <div
                    key={index} className="h-14 border-t grid place-content-center text-sm">
                    <h1 className={cn(currentMonth ? "" : "text-gray-400",
                      today ? "bg-[#990422] text-white" : "",
                      selectDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-[#083A80] text-white" : "",
                      "h-10 w-10 grid place-content-center rounded-full hover:bg-[#083A80] hover:text-white transition-all cursor-pointer"
                    )}
                      onClick={() => {
                        setSelectDate(date)
                      }}>{date.date()}</h1>
                  </div>

                )
              })}
            </div>

          </div>
          <div className='w-96 h-96 px-5'>
            <h1 className='font-semibold'>Schedule for {months[today.month()]}, {today.year()} </h1>
            <button className='cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
             ' onClick={getDateEvents}>
              Click To Get Events For The Month
            </button>
            {/* <h1 className='font-semibold'>Schedule for {selectDate.toDate().toDateString()} </h1> */}

            {events && events.map((event, index) => {

              return <h1 key={index} className="">
                <div className="border-b pb-4 border-gray-400 border-dashed pt-5">
                  {event.title}
                </div>
                <p>
                  {/* {event.description} */}
                </p>

              </h1>


            })}

          </div>
        </div>
        : <>
          <div
            class="px-6 text-center text-neutral-800">
            <button
              onClick={getToken}
              class="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Click to Get Token
            </button>
          </div>
        </>
      }


    </div >
  )
}

export default App 