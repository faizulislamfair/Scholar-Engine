import Image from 'next/image'
import { Inter } from 'next/font/google'
import Scholarship from './../components/Scholarship';
import Link from 'next/link';
import MultiFilters from './../components/MultiFilters';
import Form from './../components/Form';


export default function Home() {
  return (
    <div>

      <p className='text-center text-lg p-5'>Scholar Engine</p>

      <div className='text-center text-5xl p-5 font-bold'>
        <div className=''>
          <img className='w-[250px] ml-20 translate-x-[300px] translate-y-[25px]' src="/airplane.svg" alt="Airplane" />
          Unlock Your Dream of
        </div>

        <div>
          Academic Excellence with <img className='w-[100px] translate-x-[995px] -translate-y-[90px]' src="/hat.svg" alt="Hat" />
        </div>

        <div className='-translate-y-[90px]'>
          Tailored Pathways
        </div>

      </div>


      <Form></Form>
    </div>
  )
}
