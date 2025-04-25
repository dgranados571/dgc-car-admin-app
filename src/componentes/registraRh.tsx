import React, { useRef, useState } from 'react'
import { IFormRHHandle, IPropsModalRegistra, IZoneProps } from '../models/IProps'
import { useNavigate } from 'react-router-dom';
import RegistraRhForm from './registraRhForm';
import ContratoForm from './contratoForm';
import CursosForm from './cursosForm';
import Modal from './modal/modal';

const RegistraRh: React.FC<IZoneProps> = () => {

    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false)

    const registraRhFormRef = useRef<IFormRHHandle>(null);
    const contratoFormRef = useRef<IFormRHHandle>(null);
    const cursosFormRef = useRef<IFormRHHandle>(null);

    const [propsModalForm, setPropsModalForm] = useState<IPropsModalRegistra>({
        resultForm1: {},
        resultForm2: {},
        resultForm3: []
    })

    const registraRH = () => {
        let formValidado = [];
        let resultForm1 = null;
        let resultForm2 = null;
        let resultForm3 = null;
        if (registraRhFormRef.current) {
            resultForm1 = registraRhFormRef.current.funcionHandle1()
            if (!resultForm1) {
                formValidado.push('Errores en resultForm1');
            }
        } else {
            formValidado.push('Errores en resultForm1');
        }
        if (contratoFormRef.current) {
            resultForm2 = contratoFormRef.current.funcionHandle1()
            if (!resultForm2) {
                formValidado.push('Errores en resultForm2');
            }
        } else {
            formValidado.push('Errores en resultForm2');
        }
        if (cursosFormRef.current) {
            resultForm3 = cursosFormRef.current.funcionHandle1()
            if (!resultForm3) {
                formValidado.push('Errores en resultForm3');
            }
        } else {
            formValidado.push('Errores en resultForm3');
        }
        if (formValidado.length === 0) {
            setPropsModalForm({
                resultForm1,
                resultForm2,
                resultForm3
            })
            setModalOpen(true)
        } else {
            formValidado.splice(0, formValidado.length)
        }
    }

    const registraRHService = () => {
        
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
                    <RegistraRhForm ref={registraRhFormRef} />
                    <hr />
                    <ContratoForm ref={contratoFormRef} />
                    <hr />
                    <CursosForm ref={cursosFormRef} />
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
            {
                modalOpen ?
                    <Modal tipoModal={'MODAL_RESUMEN_FORM'} modalSi={() => { }} modalNo={() => { setModalOpen(false) }} propsModal={propsModalForm} />
                    :
                    <></>
            }
        </>
    )
}

export default RegistraRh