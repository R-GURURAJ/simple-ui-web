import React from 'react'
import HeroRight from './Hero/HeroRight'
import HeroLeft from './Hero/HeroLeft'

function Hero() {
    return (
        <div className='flex flex-1 justify-around items-center overflow-y-scroll bg-red-200'>
            <HeroRight/>
            <HeroLeft/>
        </div>
    )
}

export default Hero


// {/* <span className="countdown font-mono text-2xl">
//                     <span style={{ "--value": 10 }}></span>:
//                     <span style={{ "--value": 24 }}></span>:
//                     <span style={{ "--value": 17 }}></span>
//                 </s
//                 <div className="diff aspect-[16/9]">
//                     <div className="diff-item-1">
//                         <div className="bg-primary text-primary-content text-9xl font-black grid place-content-center">Harish</div>
//                     </div>
//                     <div className="diff-item-2">
//                         <div className="bg-base-200 text-9xl font-black grid place-content-center">Harish</div>
//                     </div>
//                     <div className="diff-resizer"></div>
//                 </div> */
// {/* <input type="checkbox" value="synthwave" className="toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2" /> */ }