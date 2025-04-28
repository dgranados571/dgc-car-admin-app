import React from 'react'
import { IDetalleRhInfoProps } from '../../../models/IProps'

const DetalleRhInfo: React.FC<IDetalleRhInfoProps> = ({ rHContract }) => {

    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'> Nombres: </p>
                        <p> {rHContract.nombres + ' ' + rHContract.apellidos} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'> No. Identificación: </p>
                        <p> {rHContract.numeroIdentificacion} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Correo personal:</p>
                        <p> {rHContract.correoPersonal} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Celular: </p>
                        <p> {rHContract.celular} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Fecha de nacimiento: </p>
                        <p> {rHContract.fechaNacimiento} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Perfil: </p>
                        <p> {rHContract.perfilProfesional} </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetalleRhInfo