import React, { forwardRef, useImperativeHandle, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { FormRHHandle } from '../models/IProps';

const RegistraRhForm: React.ForwardRefRenderFunction<FormRHHandle> = ({}, ref) => {

    useImperativeHandle(ref, () => ({
        funcionHandle1() {
            return validateForm()
        }
    }))

    const [apellidos, setApellidos] = useState('');
    const [nombres, setNombres] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [correoPersonal, setCorreoPersonal] = useState('');
    const [correoCorporativo, setCorreoCorporativo] = useState('');
    const [celular, setCelular] = useState('');
    const [perfilProfesional, setPerfilProfesional] = useState('');

    const [apellidosRef, setApellidosRef] = useState(false);
    const [nombresRef, setNombresRef] = useState(false);
    const [fechaNacimientoRef, setFechaNacimientoRef] = useState(false);
    const [numeroIdentificacionRef, setNumeroIdentificacionRef] = useState(false);
    const [correoPersonalRef, setCorreoPersonalRef] = useState(false);
    const [correoCorporativoRef, setCorreoCorporativoRef] = useState(false);    
    const [celularRef, setCelularRef] = useState(false);

    const validateForm = ()=>{
        return "MI VALIDACION FORM RegistraRhForm"
    }

    return (
        <>
                <h4 >Información del recurso humano</h4>
                <p>A continuación, ingresa la información del recurso humano:</p>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Apellidos: </p>
                            <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} className={apellidosRef ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Nombres: </p>
                            <input type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} className={nombresRef ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Fecha nacimiento: </p>
                            <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} className={fechaNacimientoRef ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Cédula: </p>
                            <input type="text" value={numeroIdentificacion} onChange={(e) => setNumeroIdentificacion(e.target.value)} className={numeroIdentificacionRef ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Correo personal: </p>
                            <input type="text" value={correoPersonal} onChange={(e) => setCorreoPersonal(e.target.value)} className={correoPersonalRef ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Correo corporativo: </p>
                            <input type="text" value={correoCorporativo} onChange={(e) => setCorreoCorporativo(e.target.value)} className={correoCorporativoRef ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Celular: </p>
                            <input type="text" value={celular} onChange={(e) => setCelular(e.target.value)} className={celularRef ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Perfil profesional</p>
                            <textarea className='form-control' value={perfilProfesional} onChange={(e) => setPerfilProfesional(e.target.value)} autoComplete='off' />
                        </div>
                    </div>
                </div>
        </>
    )
}

export default forwardRef(RegistraRhForm)