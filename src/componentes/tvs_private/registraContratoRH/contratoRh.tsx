import React, { useRef, useState } from 'react'
import { IContratoRHDto, IContratoRhProps, ICursosRHDto, IFormRHHandle, IGenericResponse, IPropsModal } from '../../../models/IProps'
import Modal from '../../tvs/modal/modal'
import { Cargando } from '../../tvs/loader/cargando'
import ContratoForm from './contratoForm'
import CursosForm from './cursosForm'
import { AuthServices } from '../../../services/authServices'
import DetalleRhInfo from '../gestionRH/detalleRhInfo'

const ContratoRH: React.FC<IContratoRhProps> = ({ rHContract, setRedirectZone }) => {

    const [cargando, setCargando] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpen1, setModalOpen1] = useState(false)
    const [tipoModal, setTipoModal] = useState('')
    const [propsModalForm, setPropsModalForm] = useState<IPropsModal>({
        resultForm1: {},
        resultForm2: {},
        resultForm3: []
    })

    const contratoFormRef = useRef<IFormRHHandle>(null);
    const cursosFormRef = useRef<IFormRHHandle>(null);

    const registraContratoRH = () => {
        let formValidado = [];
        let resultForm2 = null;
        let resultForm3 = null;
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
                resultForm1: {},
                resultForm2,
                resultForm3
            })
            setTipoModal('MODAL_RESUMEN_FORM_2')
            setModalOpen(true)
        } else {
            formValidado.splice(0, formValidado.length)
        }
    }

    const registraContratoRHService = async () => {
        setCargando(true)

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

        const body = {
            "recursoHumano": rHContract.id,
            "contratoRH": infoForm2,
            "cursosRH": infoForm3,
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 10);
            let tituloModal = 'Valla algo salió mal¡¡'
            if (response.estado) {
                tituloModal = 'Creación exitosa del contrato'
                resetForms()
                ejecutaModalComponent1(tituloModal, response.mensaje, 'MODAL_CONTROL_1')
            } else if (!!response.objeto) {
                tituloModal = response.objeto
                ejecutaModalComponent(tituloModal, response.mensaje, 'MODAL_CONTROL_1')
            } else {
                ejecutaModalComponent(tituloModal, response.mensaje, 'MODAL_CONTROL_1')
            }
            setCargando(false)
        } catch (error) {
            setCargando(false)
            ejecutaModalComponent('Valla algo salió mal¡¡', 'No fue posible el registro de la información, contacte al administrador', 'MODAL_CONTROL_1')
        }
    }

    const resetForms = () => {
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
                <DetalleRhInfo rHContract={rHContract} />
                <hr />
                <ContratoForm ref={contratoFormRef} />
                <hr />
                <CursosForm ref={cursosFormRef} />
                <hr />
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                        <div className='div-bottom-custom m-0'>
                            <button className='btn btn-primary bottom-custom' onClick={() => { registraContratoRH() }} >Crear contrato</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                modalOpen ?
                    <Modal tipoModal={tipoModal} modalSi={() => { registraContratoRHService() }} modalNo={() => { cancelaOperacionModal() }} propsModal={propsModalForm} />
                    :
                    <></>
            }
            {
                modalOpen1 ?
                    <Modal tipoModal={tipoModal} modalSi={() => { }} modalNo={() => { setRedirectZone('VIEW_LISTA_RH') }} propsModal={propsModalForm} />
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

export default ContratoRH