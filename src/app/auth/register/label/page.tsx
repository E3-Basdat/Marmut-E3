const label : React.FC = () => {
    return (
        <div className='flex flex-col text-white-100 text-center items-center gap-16 px-8 py-32 bg-white font-bold min-h-screen '>
            <h1 className="text-3xl">Register Form Label</h1>
            <form className='flex flex-col w-1/2 ' >
                <div className='mb-4 text-left'>
                    <label>Email</label>
                    <input type="text" placeholder="Email" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>

                <div className='mb-4 text-left '>
                    <label>Password</label>
                    <input type="password" placeholder="Password" className="bg-primary border-2 border-gray-200 rounded-lg w-full py-4 px-4" />
                </div>
                <div className='mb-4 '>
                </div>

                <div className='flex flex-row gap-4 justify-center'>
                    <button type="submit" className="font-bold bg-green-100  text-white-100 rounded-lg w-1/4 py-4 mt-4">
                        Register
                    </button>
                </div>  
            </form>

        </div>
    )
}

export default label;