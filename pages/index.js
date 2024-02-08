import Image from 'next/image'
import { Inter } from 'next/font/google'
import Scholarship from './../components/Scholarship';
import Link from 'next/link';
import MultiFilters from './../components/MultiFilters';
import Form from './../components/Form';


export default function Home() {
  return (
    <div className='w-full'>

      <div className='max-w-[1280px] mx-auto'>

        <div className='grid grid-cols-1 place-content-center content-center place-items-center p-3 z-99'>
          <img className='' src='/logo.svg' alt='Logo' />
        </div>

        <div className='ml-10'>
          <img src="/divider.svg" alt="" />
        </div>

        <div className='text-center text-5xl pt-8 pb-5 font-bold z-55'>
          <div className='z-1'>
            <img className='w-[250px] ml-20 translate-x-[185px] translate-y-[20px] z-1' src="/airplane.svg" alt="Airplane" />
            Unlock Your Dream of
          </div>

          <div className='z-99'>
            Academic Excellence with <img className='w-[100px] translate-x-[905px] -translate-y-[90px] z-99' src="/hat.svg" alt="Hat" />
          </div>

          <div className='-translate-y-[90px] z-1'>
            Tailored Pathways
          </div>

        </div>

        <div className=''>
          <img src="/ellipse_1.svg" className='-translate-x-[120px] -translate-y-[500px]' alt="Ellipse 1" />
          <img src="/ellipse_2.svg" className='translate-x-[640px] -translate-y-[1580px]' alt="Ellipse 2" />
        </div>

      </div>

      <Form></Form>
    </div>
  )
}
