import Image from 'next/image'
import { Inter } from 'next/font/google'
import Scholarship from './../components/Scholarship';
import Link from 'next/link';
import MultiFilters from './../components/MultiFilters';
import Form from './../components/Form';


export default function Home() {
  return (
    <div>
      Scholar Engine

      <Form></Form>
    </div>
  )
}
