import Image from 'next/image'
import { Inter } from 'next/font/google'
import Scholarship from './../components/Scholarship';
import Link from 'next/link';
import MultiFilters from './../components/MultiFilters';
import Search from './../components/Search';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >

      <div className='grid grid-cols-1 gap-4 place-content-center bg-black text-white w-1/4 h-10 text-center rounded'>
        <MultiFilters></MultiFilters>
        <Search></Search>
      </div>
    </main>
  )
}
