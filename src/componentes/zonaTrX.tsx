import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IZoneProps } from '../models/IProps';

const ZonaTrX:  React.FC<IZoneProps> = () => {

    const navigate = useNavigate();

    return (
        <div className='div-container'>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-8" >
                    <div className='div-logo'></div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                    <div className='div-menu-principal'>
                        <button className='btn btn-link a-link-custom' onClick={() => navigate('/registra-rh')} >Registrar RH</button>
                        <button className='btn btn-link a-link-custom-active' >Gestionar RH</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ZonaTrX