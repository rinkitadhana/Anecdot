import { useContext } from "react"
import { RiLinkM } from "react-icons/ri"
import { UserContext } from "../components/context/UserContext"
import { CgCalendarDates } from "react-icons/cg"
import PostLoading from "./../components/PostLoading"

const UserProfile = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const username = userInfo?.username
  const fullName = userInfo?.fullName
  return (
    <section>
      <div className="  flex flex-col gap-3 my-5">
        <div className="  w-full md:h-52 h-30  ">
          <div className="relative md:h-48 h-32  ">
            <img
              src=""
              alt="Cover"
              className="w-full object-cover md:h-52 h-32 rounded-md"
              onError={(e) =>
                (e.target.src =
                  "https://i.pinimg.com/736x/86/f4/63/86f463995f71aa9c87dd934ca927ef24.jpg")
              }
            />

            <div className="absolute -bottom-[3rem] md:-bottom-[5rem] left-4 flex items-center">
              <img
                src=""
                alt="Profile"
                className=" md:size-32 size-24 rounded-full border-4 border-mainWhite dark:border-mainBlack"
                onError={(e) =>
                  (e.target.src =
                    "https://i.pinimg.com/736x/d9/d8/8e/d9d88e3d1f74e2b8ced3df051cecb81d.jpg")
                }
              />
            </div>
          </div>
        </div>
        <div className=" flex justify-end  w-full  px-2 ">
          <button className=" font-sans font-medium  rounded-md px-2 py-2 md:hover:bg-mainBlack md:hover:text-mainWhite md:dark:hover:text-mainBlack  dark:md:hover:bg-mainWhite transition-all bg-primary dark:bg-primaryDark">
            Edit Profile
          </button>
        </div>
        <div className=" flex flex-col gap-2  w-full md:px-3 md:py-1 px-2">
          <div>
            <h1 className="text-[1.5rem] font-semibold">
              {fullName || "Anoumnous"}
            </h1>
            <p className=" text-sm text-primaryDark dark:text-primary">
              @{username || "Anoumnous"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="">{userInfo?.bio || "No bio"}</p>
          </div>
          <div className="flex items-center font-sans text-sm gap-3 text-primaryDark dark:text-primary ">
            <a className=" flex items-center justify-center gap-0.5">
              <RiLinkM />
              <p className=" md:hover:underline text-blue-500 md:hover:text-blue-600 cursor-pointer transition-all">
                therinkit.online
              </p>
            </a>
            <p className=" flex  items-center gap-0.5">
              <CgCalendarDates />
              Joined Novemeber 2024
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">Posts</h1>
          <div className=" border-b border-primary dark:border-primaryDark" />
          <div>
            <PostLoading />
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserProfile
