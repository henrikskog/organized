import NewItemForm from '../components/NewItemForm'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-[65ch] mx-auto my-12">
        <NewItemForm />
      </div>
    </>
  )
}

export default Home
