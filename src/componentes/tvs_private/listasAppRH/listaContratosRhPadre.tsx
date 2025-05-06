import React, { useState } from 'react'
import { IGenericResponse, IListaContratosRhPadreProps, IModalProps } from '../../../models/IProps'
import Modal from '../../tvs/modal/modal'
import { Cargando } from '../../tvs/loader/cargando'
import ListaContratosRh from './listaContratosRh'
import DetalleContratoRh from './detalleContratoRh'
import { AuthServices } from '../../../services/authServices'

const ListaContratosRhPadre: React.FC<IListaContratosRhPadreProps> = ({ zonaConsulta }) => {

    const [cargando, setCargando] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [propsModalForm, setPropsModalForm] = useState<IModalProps>({
        tipoModal: '',
        modalSi: () => { },
        modalNo: () => { },
        propsModal: {
            resultForm1: {},
            resultForm2: {},
            resultForm3: []
        }
    })

    const [controlExecute, setControlExecute] = useState(false)

    const [redirect, setRedirect] = useState('VISTA_LISTA_CONTRATO_RH');
    const [rHContratoId, setRHContratoId] = useState<any>({});

    const validateRedirect = () => {
        switch (redirect) {
            case 'VISTA_LISTA_CONTRATO_RH':
                return (
                    <ListaContratosRh ejecutaModalComponent={ejecutaModalComponent} setCargando={setCargando} setRedirect={setRedirect} setRHContratoId={setRHContratoId} zonaConsulta={zonaConsulta}
                        setControlExecute={setControlExecute} controlExecute={controlExecute}
                    />
                )
            case 'VISTA_DETALLE_CONTRATO_RH':
                return (
                    <DetalleContratoRh ejecutaModalComponent={ejecutaModalComponent} rHContratoId={rHContratoId} setRedirect={setRedirect} />
                )
            default:
                return (
                    <></>
                )
        }
    }

    const ejecutaModalComponent = (titulo: string, descripicion: string, tipoModal: string, idPropExecute?: any) => {
        if (idPropExecute) {
            if (idPropExecute.action === 'ELIMINAR') {
                setPropsModalForm({
                    tipoModal: tipoModal,
                    modalNo: () => { cancelaOperacionModal() },
                    modalSi: () => { ejecutaOperacionEliminarContrato(idPropExecute) },
                    propsModal: {
                        resultForm1: {
                            prop0: titulo,
                            prop1: descripicion,
                        },
                        resultForm2: {},
                        resultForm3: []
                    }
                })
            }
            if (idPropExecute.action === 'RELOAD') {
                setPropsModalForm({
                    tipoModal: tipoModal,
                    modalNo: () => {
                        cancelaOperacionModal()
                        setControlExecute(!controlExecute)
                    },
                    modalSi: () => { },
                    propsModal: {
                        resultForm1: {
                            prop0: titulo,
                            prop1: descripicion,
                        },
                        resultForm2: {},
                        resultForm3: []
                    }
                })
            }
            if (idPropExecute.action === 'FINALIZARH') {
                setPropsModalForm({
                    tipoModal: tipoModal,
                    modalNo: () => { cancelaOperacionModal() },
                    modalSi: () => { ejecutaOperacionTerminarContrato(idPropExecute) },
                    propsModal: {
                        resultForm1: {
                            prop0: titulo,
                            prop1: descripicion,
                        },
                        resultForm2: {},
                        resultForm3: []
                    }
                })
            }
            if (idPropExecute.action === 'FINALIZAOK') {
                setPropsModalForm({
                    tipoModal: tipoModal,
                    modalNo: () => { 
                        setRedirect('VISTA_LISTA_CONTRATO_RH')
                        cancelaOperacionModal() 
                    },
                    modalSi: () => { },
                    propsModal: {
                        resultForm1: {
                            prop0: titulo,
                            prop1: descripicion,
                        },
                        resultForm2: {},
                        resultForm3: []
                    }
                })
            }
        } else {
            setPropsModalForm({
                tipoModal: tipoModal,
                modalNo: () => { cancelaOperacionModal() },
                modalSi: () => { },
                propsModal: {
                    resultForm1: {
                        prop0: titulo,
                        prop1: descripicion,
                    },
                    resultForm2: {},
                    resultForm3: []
                }
            })
        }
        setModalOpen(true)
    }

    const ejecutaOperacionTerminarContrato = async (idPropExecute: any) => {
        setCargando(true)
        const body = {
            "noContrato": idPropExecute.idProp.idContratoRh,
            "causalFinalizaContrato": idPropExecute.causalFinalizaContrato,
            "fechaFinalizacion": idPropExecute.fechaFinalizacion
        }        
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 14);
            if (response.estado) {
                const idPropExecute = {
                    "action": "FINALIZAOK",
                    "idProp": "",
                }
                ejecutaModalComponent('Contrato finalizado con éxito', response.mensaje, 'MODAL_CONTROL_1', idPropExecute)
            } else {
                ejecutaModalComponent('Valla algo salió mal¡¡', response.mensaje, 'MODAL_CONTROL_1')
            }
            setCargando(false)
        } catch (error) {
            setCargando(false)
            ejecutaModalComponent('Valla algo salió mal¡¡', 'No fue posible consultar la información, contacte al administrador', 'MODAL_CONTROL_1')
        }
    }

    const ejecutaOperacionEliminarContrato = async (idPropExecute: any) => {
        setCargando(true)
        const body = {
            "noContrato": idPropExecute.idProp,
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 13);
            if (response.estado) {
                const idPropExecute = {
                    "action": "RELOAD",
                    "idProp": "",
                }
                ejecutaModalComponent('Contrato eliminado con éxito', response.mensaje, 'MODAL_CONTROL_1', idPropExecute)
            } else {
                ejecutaModalComponent('Valla algo salió mal¡¡', response.mensaje, 'MODAL_CONTROL_1')
            }
            setCargando(false)
        } catch (error) {
            setCargando(false)
            ejecutaModalComponent('Valla algo salió mal¡¡', 'No fue posible consultar la información, contacte al administrador', 'MODAL_CONTROL_1')
        }
    }

    const cancelaOperacionModal = () => {
        setPropsModalForm({
            tipoModal: '',
            modalNo: () => { },
            modalSi: () => { },
            propsModal: {
                resultForm1: {},
                resultForm2: {},
                resultForm3: []
            }
        })
        setModalOpen(false)
    }

    return (
        <>
            {
                validateRedirect()
            }
            {
                modalOpen ?
                    <Modal tipoModal={propsModalForm.tipoModal} modalSi={propsModalForm.modalSi} modalNo={propsModalForm.modalNo} propsModal={propsModalForm.propsModal} />
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

export default ListaContratosRhPadre