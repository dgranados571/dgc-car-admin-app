import React, { forwardRef } from 'react'
import { IZoneProps } from '../models/IProps'
import { useNavigate } from 'react-router-dom';
import RegistraRhForm from './registraRhForm';
import ContratoForm from './contratoForm';
import CursosForm from './cursosForm';

const RegistraRh: React.FC<IZoneProps> = () => {

    const navigate = useNavigate();

    const registraRH = ()=>{

    }

    return (
        <>
            <div className='div-container'>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8" >
                        <div className='div-logo'></div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                        <div className='div-menu-principal'>
                            <button className='btn btn-link a-link-custom-active' >Registrar RH</button>
                            <button className='btn btn-link a-link-custom' onClick={() => navigate('/zona-trx')} >Gestionar RH</button>
                        </div>
                    </div>
                </div>
                <div className='div-style-form'>
                    <RegistraRhForm />
                    <hr />
                    <ContratoForm />
                    <hr />
                    <CursosForm />                    
                    <hr />
                    <div className="row mb-5 mt-5">                        
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                            <div className='div-bottom-custom'>
                                <button className='btn btn-primary bottom-custom' onClick={() => registraRH()} >Registrar RH</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default RegistraRh