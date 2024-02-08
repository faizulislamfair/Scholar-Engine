import Image from 'next/image'
import { Inter } from 'next/font/google'
import Scholarship from './../components/Scholarship';
import Link from 'next/link';
import MultiFilters from './../components/MultiFilters';
import Form from './../components/Form';


export default function Home() {
  return (
    <div>

      <div className='grid grid-cols-1 place-content-center content-center place-items-center p-3'>
        <img className='' src='/logo.svg' alt='Logo' />
      </div>

      <div className='text-center text-5xl pt-8 pb-5 font-bold'>
        <div className=''>
          <img className='w-[250px] ml-20 translate-x-[300px] translate-y-[25px]' src="/airplane.svg" alt="Airplane" />
          Unlock Your Dream of
        </div>

        <div>
          Academic Excellence with <img className='w-[100px] translate-x-[1010px] -translate-y-[90px]' src="/hat.svg" alt="Hat" />
        </div>

        <div className='-translate-y-[90px]'>
          Tailored Pathways
        </div>

      </div>


      <Form></Form>
    </div>
  )
}
