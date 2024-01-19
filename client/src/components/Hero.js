import React from 'react'
import Cards from './Cards'

function Hero() {
    return (
        
        <div className='flex items-center w-full gap-10'>
             <div className='w-[30%] h-[80vh] bg-gray-300 rounded-lg'>

            </div> 
            <div className=''>
                <div className='flex flex-wrap py-10 justify-center gap-10'>
                    <Cards name={'Groups'} descr={"Subject chat groups.."} url={'https://img.freepik.com/free-vector/illustration-speech-bubble_53876-5625.jpg?w=740&t=st=1705642143~exp=1705642743~hmac=b999f1260376c4fe4efd52640d14dc631b051a816a5aa626dc08192ce1f8ecf2'} />
                    <Cards name={'Internal Marks'} descr={"Can view internal marks"} />
                    <Cards name={'Attendance'} descr={"Attandance for all students"} />
                    <Cards name={'Video Meet'} descr={"Group call to all"} />
                    
                </div>
                {/* <span className="countdown font-mono text-2xl">
                    <span style={{ "--value": 10 }}></span>:
                    <span style={{ "--value": 24 }}></span>:
                    <span style={{ "--value": 17 }}></span>
                </s
                <div className="diff aspect-[16/9]">
                    <div className="diff-item-1">
                        <div className="bg-primary text-primary-content text-9xl font-black grid place-content-center">Harish</div>
                    </div>
                    <div className="diff-item-2">
                        <div className="bg-base-200 text-9xl font-black grid place-content-center">Harish</div>
                    </div>
                    <div className="diff-resizer"></div>
                </div> */}
                {/* <input type="checkbox" value="synthwave" className="toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2" /> */}

            </div>
        </div>
    )
}

export default Hero
