import React, { useState } from 'react'
import { Estudiante, Profesor } from '../types'
type LoginProps = {
    ChangeUser: (newUser: Estudiante | Profesor) => void
}

function Login(props: LoginProps) {
    const [email, SetEmail] = useState<string>("")
    const [clave, SetClave] = useState<string>("")
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (email != "" && clave != "") {
            const loginResponse = await fetch("/api/login", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, clave: clave })
            })
            type lr = {
                msg: string,
                user: Estudiante | Profesor

            }
            const loginResult: lr = await loginResponse.json()
            props.ChangeUser(loginResult.user)


        }
    }

    return (
        <div className='flex flex-col justify-center items-center w-screen h-screen overflow-hidden'>
            <h1 className=' text-2xl font-bold p-2'>Iniciar Sesion</h1>
            <form className='w-96 h-96 bg-primary rounded-md flex flex-col items-center justify-evenly' onSubmit={(e) => handleSubmit(e)}>
                <input className='input w-3/4' placeholder='Email' onChange={(e) => SetEmail(e.target.value)} />
                <input type="password" className='input w-3/4' placeholder='Contraseña' onChange={e => SetClave(e.target.value)} />
                <button className=' btn '>Iniciar Session</button>
            </form>
        </div>
    )
}

export default Login
