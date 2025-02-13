import React, { useState } from 'react'

function Login() {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')


    const handleLoginIn = async () => {

        


    }
  return (
    <>
    <div className='py-25'>

        <form onSubmit={handleLoginIn} >
        <div>
        <input 
        placeholder='Email'
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
         />
         </div>

         <div>
        <input 
        placeholder='password'
        type='password'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
         </div>

         <div>

            <button 
            type='submit'
            className='' >
                Login
            </button>

         </div>
         </form>
    </div>
    </>
  )
}

export default Login