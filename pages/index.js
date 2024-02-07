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

      <div className='text-center text-5xl p-5'>
        Unlock Your Dream of <br />
        Academic Excellence with <br />
        Tailored Pathways
      </div>


      <Form></Form>
    </div>
  )
}
