const UserHeader = () => {
    return (
        <div>
            <div className=" flex justify-between mt-[-150px] mb-[100px] text-white gap-[100px]">
              <div className="w-[400px] h-[50px] bg-transparent"></div>
              <div className="w-[700px] h-[50px] bg-transparent flex justify-between">
                <div className=" bg-transparent -mt-6">
                  <img
                    src="/Resto_Logo2.png"
                    alt="Logo"
                    className="w-[100px]"
                  />
                </div>
                <div className="flex justify-between  gap-4 ">
                  <button className="flex justify-center items-center border rounded-3xl px-6 py-5 bg-rose-600 text-white">
                    SignUp
                  </button>
                  <button className="flex justify-center items-center border rounded-3xl px-6 py-5 bg-white text-black" onClick={() => (window.location.href = "/user")}>
                    SignIn
                  </button>
                </div>
              </div>
            </div>
        </div>
    )
}

export default UserHeader;