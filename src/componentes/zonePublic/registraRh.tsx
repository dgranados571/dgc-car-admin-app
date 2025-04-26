import React, { useRef, useState } from 'react'
import { IContratoRHDto, ICursosRHDto, IFormRHHandle, IGenericResponse, IPropsModal, IRecursoHumanoDto, IZoneProps } from '../../models/IProps'
import { useNavigate } from 'react-router-dom';
import RegistraRhForm from './registraRhForm';
import ContratoForm from './contratoForm';
import CursosForm from './cursosForm';
import Modal from '../tvs/modal/modal';
import { Cargando } from '../tvs/loader/cargando';
import { AuthServices } from '../../services/authServices';

const RegistraRh: React.FC<IZoneProps> = () => {

    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false)
    const [tipoModal, setTipoModal] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [propsModalForm, setPropsModalForm] = useState<IPropsModal>({
        resultForm1: {},
        resultForm2: {},
        resultForm3: []
    })

    const registraRhFormRef = useRef<IFormRHHandle>(null);
    const contratoFormRef = useRef<IFormRHHandle>(null);
    const cursosFormRef = useRef<IFormRHHandle>(null);

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
            setTipoModal('MODAL_RESUMEN_FORM')
            setModalOpen(true)
        } else {
            formValidado.splice(0, formValidado.length)
        }
    }

    const registraRHService = async () => {
        setModalOpen(false)
        setCargando(true)
        const infoForm1: IRecursoHumanoDto = {
            nombres: propsModalForm.resultForm1.prop1 || '',
            apellidos: propsModalForm.resultForm1.prop0 || '',
            fechaNacimiento: propsModalForm.resultForm1.prop2 || '',
            numeroIdentificacion: propsModalForm.resultForm1.prop3 || '',
            celular: propsModalForm.resultForm1.prop6 || '',
            correoPersonal: propsModalForm.resultForm1.prop4 || '',
            correoCorporativo: propsModalForm.resultForm1.prop5 || '',
            perfilProfesional: propsModalForm.resultForm1.prop7 || '',
        }

        const infoForm2: IContratoRHDto = {
            contrato: propsModalForm.resultForm2.prop0 || '',
            zonaContrato: propsModalForm.resultForm2.prop1 || '',
            municipio: propsModalForm.resultForm2.prop2 || '',
            fechaInicio: propsModalForm.resultForm2.prop3 || '',
            fechaFinalizacion: '',
            cargo: propsModalForm.resultForm2.prop4 || '',
            area: propsModalForm.resultForm2.prop5 || '',
            sueldo: propsModalForm.resultForm2.prop6 || '',
            auxilioTransporte: propsModalForm.resultForm2.prop7 || '',
            bono: propsModalForm.resultForm2.prop8 || ''
        }

        const infoForm3: ICursosRHDto[] = propsModalForm.resultForm3.map((curso) => ({
            nombreCurso: curso.nombreCurso,
            fechaCurso: curso.fechaCertificacion,
            estado: curso.estado
        }));

        const body = {
            "recursoHumano": infoForm1,
            "contratoRH": infoForm2,
            "cursosRH": infoForm3,
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 1);
            let tituloModal = 'Valla algo salió mal¡¡'
            if (response.estado) {
                tituloModal = '¡Registro exitoso del nuevo talento!'
                resetForms()
            }
            setCargando(false)
            ejecutaModalComponent(tituloModal, response.mensaje, 'MODAL_CONTROL_1')
        } catch (error) {
            setCargando(false)
            ejecutaModalComponent('Valla algo salió mal¡¡', 'No fue posible el registro de la información, contacte al administrador', 'MODAL_CONTROL_1')
        }
    }

    const resetForms = () => {
        if (registraRhFormRef.current) {
            registraRhFormRef.current.funcionHandle2()
        }
        if (contratoFormRef.current) {
            contratoFormRef.current.funcionHandle2()
        }
        if (cursosFormRef.current) {
            cursosFormRef.current.funcionHandle2()
        }
    }

    const cancelaOperacionModal = () => {
        setTipoModal('')
        setModalOpen(false)
    }

    const ejecutaModalComponent = (titulo: string, descripicion:string, tipoModal:string)=>{
        setPropsModalForm({
            resultForm1: {
                prop0: titulo,
                prop1: descripicion,
            },
            resultForm2: {},
            resultForm3: []
        })            
        setTipoModal(tipoModal)
        setModalOpen(true)
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
                            <button className='btn btn-link a-link-custom' onClick={() => navigate('/login-rh')} >Gestionar RH</button>
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
                    <Modal tipoModal={tipoModal} modalSi={() => { registraRHService() }} modalNo={() => { cancelaOperacionModal() }} propsModal={propsModalForm} />
                    :
                    <></>
            }
            {
                cargando ?
                    <Cargando />
                    :
                    <></>
            }
        </>
    )
}

export default RegistraRh