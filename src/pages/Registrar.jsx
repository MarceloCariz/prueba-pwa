import {Link} from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import axios from 'axios'
const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  console.log(process.env.REACT_APP_BACKEND_URL)

  const handleSubmit= async(e) =>{
    e.preventDefault();
    console.log(process.env.REACT_APP_BACKEND_URL)
 
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg:'Todos los campos son obligatorios', error: true});
      return
    }

    if(password !== repetirPassword){
      setAlerta({msg:'Los passwords deben ser iguales', error: true});
      return
    }
    if(password.length < 6){
      setAlerta({msg:'El password es muy corto, agrega minimo 6 caracteres', error: true});
      return
    }

    setAlerta({})

    /// Crear usuario desde api
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/usuarios`,{ nombre, password, email});

      setAlerta({msg: data.msg, error: false})
      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('')
    } catch (e) {
      setAlerta({msg: e.response.data.msg, error: true})
    }

  }


  const {msg, error} = alerta;
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
      Crea Tu Cuenta y administra tus {''}
      <span className="text-slate-700">proyectos</span>
    </h1>
    {msg && <Alerta alerta={alerta}/>}
    <form action="" onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
    <div className="my-5">
        <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">nombre</label>
        <input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" placeholder="Tu nombre" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
      </div>
      <div className="my-5">
        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
        <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
      </div>
      <div className="my-5">
        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">password</label>
        <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
      </div>
      <div className="my-5">
        <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">repetir password</label>
        <input id="password2" value={repetirPassword} onChange={(e) => setRepetirPassword(e.target.value)} type="password" placeholder="Repetir tu password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
      </div>
      <input type="submit" value="Crear tu cuenta" className="bg-sky-700 mb-5 py-3 w-full text-white uppercase font-bold rouned hover:cursor-pointer hover:bg-sky-800 transition-colors" />
    </form>

    <nav className="lg:flex lg:justify-between ">
        <Link to="/" className='block my-5 text-center uppercase text-slate-500 text-sm'>
          ya tienes una cuenta? Inicia Sesion </Link>
        
    </nav>
  </>
  )
}

export default Registrar