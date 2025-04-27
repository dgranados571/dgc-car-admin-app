import React, { useRef, useState } from 'react'
import { IFormRHHandle, IGenericResponse, IPropsModal, IRecursoHumanoDto, IRegistraRhProps, IZoneProps } from '../../../models/IProps'


import Modal from '../../tvs/modal/modal';
import { Cargando } from '../../tvs/loader/cargando';
import { AuthServices } from '../../../services/authServices';
import RegistraRhForm from './registraRhForm';

const RegistraRh: React.FC<IRegistraRhProps> = ({setRedirectZone}) => {

    const [cargando, setCargando] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpen1, setModalOpen1] = useState(false)
    const [tipoModal, setTipoModal] = useState('')
    const [propsModalForm, setPropsModalForm] = useState<IPropsModal>({
        resultForm1: {},
        resultForm2: {},
        resultForm3: []
    })

    const registraRhFormRef = useRef<IFormRHHandle>(null);

    const registraRH = () => {
        let formValidado = [];
        let resultForm1 = null;
        if (registraRhFormRef.current) {
            resultForm1 = registraRhFormRef.current.funcionHandle1()
            if (!resultForm1) {
                formValidado.push('Errores en resultForm1');
            }
        } else {
            formValidado.push('Errores en resultForm1');
        }
        if (formValidado.length === 0) {
            setPropsModalForm({
                resultForm1,
                resultForm2: {},
                resultForm3: []
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
        const body = {
            "recursoHumano": infoForm1
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 1);
            let tituloModal = 'Valla algo salió mal¡¡'
            if (response.estado) {
                tituloModal = '¡Registro exitoso del nuevo talento!'
                resetForms()
                ejecutaModalComponent1(tituloModal, response.mensaje, 'MODAL_CONTROL_1')
            } else if (!!response.objeto) {
                tituloModal = response.objeto
                ejecutaModalComponent(tituloModal, response.mensaje, 'MODAL_CONTROL_1')
            }
            setCargando(false)
        } catch (error) {
            setCargando(false)
            ejecutaModalComponent('Valla algo salió mal¡¡', 'No fue posible el registro de la información, contacte al administrador', 'MODAL_CONTROL_1')
        }
    }

    const resetForms = () => {
        if (registraRhFormRef.current) {
            registraRhFormRef.current.funcionHandle2()
        }
    }

    const cancelaOperacionModal = () => {
        setTipoModal('')
        setModalOpen(false)
    }

    const ejecutaModalComponent = (titulo: string, descripicion: string, tipoModal: string) => {
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

    const ejecutaModalComponent1 = (titulo: string, descripicion: string, tipoModal: string) => {
        setPropsModalForm({
            resultForm1: {
                prop0: titulo,
                prop1: descripicion,
            },
            resultForm2: {},
            resultForm3: []
        })
        setTipoModal(tipoModal)
        setModalOpen1(true)
    }

    return (
        <>
            <div className='div-style-form'>
                <RegistraRhForm ref={registraRhFormRef} />
                <hr />
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                        <div className='div-bottom-custom m-0'>
                            <button className='btn btn-primary bottom-custom' onClick={() => registraRH()} >Registrar RH</button>
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
                modalOpen1 ?
                    <Modal tipoModal={tipoModal} modalSi={() => {}} modalNo={() => { setRedirectZone('VIEW_LISTA_RH') }} propsModal={propsModalForm} />
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