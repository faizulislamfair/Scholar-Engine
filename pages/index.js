import Form from './../components/Form';


export default function Home() {
  return (
    <div className='w-full'>

      <div className="max-w-[1280px] mx-auto">

        <div className="bg-cover bg-no-repeat h-screen  pt-8 pb-5 bg-[url('/imagine.png')]">
          <div className='mt-[190px]'>

            <div className='font-bold text-5xl text-center '>
              Unlock Your Dream of <br />
              Academic Excellence with <br />
              Tailored Pathways
            </div>

            <div className='mt-[100px]'>
              <Form></Form>
            </div>

          </div>

        </div>

      </div >



    </div >
  )
}
