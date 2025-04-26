import React, { useRef, useState } from 'react'
import { IFormRHHandle, IGenericResponse, IPropsModal, IRecursoHumanoDto, IZoneProps } from '../../models/IProps'
import RegistraRhForm from './registraRhForm';

import Modal from '../tvs/modal/modal';
import { Cargando } from '../tvs/loader/cargando';
import { AuthServices } from '../../services/authServices';

const RegistraRh: React.FC<IZoneProps> = () => {

    const [cargando, setCargando] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
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
        /*
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
            bono: propsModalForm.resultForm2.prop8 || '',
            noContrato: propsModalForm.resultForm2.prop9 || ''
        }

        const infoForm3: ICursosRHDto[] = propsModalForm.resultForm3.map((curso) => ({
            nombreCurso: curso.nombreCurso,
            fechaCurso: curso.fechaCertificacion,
            estado: curso.estado
        }));

        */
        const body = {
            "recursoHumano": infoForm1,
            "contratoRH": {},
            "cursosRH": [],
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 1);
            let tituloModal = 'Valla algo salió mal¡¡'
            if (response.estado) {
                tituloModal = '¡Registro exitoso del nuevo talento!'
                resetForms()
            } else if (!!response.objeto) {
                tituloModal = response.objeto
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

    return (
        <>
            <div className='div-style-form mt-3'>
                <RegistraRhForm ref={registraRhFormRef} />
                <hr />
                <div className="row mb-5 mt-2">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                        <div className='div-bottom-custom'>
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
                cargando ?
                    <Cargando />
                    :
                    <></>
            }
        </>
    )
}

export default RegistraRh