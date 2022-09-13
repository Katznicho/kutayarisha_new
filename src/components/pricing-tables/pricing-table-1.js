import React from 'react'

import {FiCheck} from 'react-icons/fi'

import data from './data.json'
import {useHistory} from 'react-router-dom'

const PricingTable = ({title, price, items}) => {

  //useHistory
  const history = useHistory();

  return (
    <div className="w-full flex flex-col items-center justify-end mb-8 lg:mb-0">
      <div className="flex flex-row items-center justify-center h-16">
        <span className="text-grey-500">shs</span>
        <span className="text-6xl text-blue-500">{new Intl.NumberFormat().format(price)}</span>
        <span className="text-grey-500">/9months</span>
      </div>
      <div className="flex flex-row items-center justify-center h-16 uppercase font-bold text-base">
        {title}
      </div>
      <>
        {items.map((item, i) => (
          <div className="flex flex-row w-full items-center justify-start h-10">
            <div className="flex-shrink-0 w-8">
              <FiCheck
                className={`stroke-current stroke-2 text-base ${item.color}`}
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="text-sm">{item.title}</div>
            </div>
          </div>
        ))}
      </>
      <div className="flex flex-row w-full items-center justify-center mt-8">
        <button className="btn btn-lg btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => history.push({
            pathname: '/checkout',
            state: { 
              title: title,
              price: price 
            }
          })}
         >
          Get Started
        </button>
      </div>
    </div>
  )
}

const PricingTableComponent = () => {
  const title = "Our Pricing Plans"
  const description = "Below are the pricing plans for our services."
  return (
    <>
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="text-lg">{title}</div>
        <div className="text-sm text-grey-500">{description}</div>
        {/* <div className="w-full">
          <Switch />
        </div> */}
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 p-2">
          <PricingTable {...data[0]} />
        </div>
        <div className="w-full lg:w-1/4 p-2">
          <PricingTable {...data[1]} />
        </div>
        <div className="w-full lg:w-1/4 p-2">
          <PricingTable {...data[2]} />
        </div>

      </div>
    </>
  )
}
export default PricingTableComponent
