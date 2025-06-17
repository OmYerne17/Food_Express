const UserHeader = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4 text-white gap-4 md:gap-[100px]">
              <div className="w-full md:w-[400px] h-[50px] bg-transparent"></div>
              <div className="w-full md:w-[700px] h-[50px] bg-transparent flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="bg-transparent">
                  <img
                    src="/Resto_Logo2.png"
                    alt="Logo"
                    className="w-[80px] md:w-[100px]"
                  />
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <button 
                    className="w-full md:w-auto flex justify-center items-center border rounded-3xl px-4 md:px-6 py-3 md:py-5 bg-custom-red text-white font-bold hover:bg-red-600 transition-colors"
                    onClick={() => (window.location.href = "/user/signup")}
                  >
                    SignUp
                  </button>
                  <button 
                    className="w-full md:w-auto flex justify-center items-center border rounded-3xl px-4 md:px-6 py-3 md:py-5 bg-white text-black font-bold hover:bg-gray-100 transition-colors"
                    onClick={() => (window.location.href = "/user/login")}
                  >
                    SignIn
                  </button>
                </div>
              </div>
            </div>
        </div>
    )
}

export default UserHeader;