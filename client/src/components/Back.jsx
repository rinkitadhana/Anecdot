import { useNavigate } from "react-router-dom"
import { IoArrowBack } from "react-icons/io5"

const Back = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <>
      <div
        onClick={handleGoBack}
        className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity w-fit my-6"
      >
        <IoArrowBack className="text-lg" />
        <span className="font-medium">Back</span>
      </div>
    </>
  )
}

export default Back
