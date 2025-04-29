import React, { useState } from 'react'
import { IPropsModal } from '../../../models/IProps'
import Modal from '../../tvs/modal/modal'
import { Cargando } from '../../tvs/loader/cargando'
import ListaContratosRh from './listaContratosRh'
import DetalleRhInfo from '../gestionRH/detalleRhInfo'
import DetalleContratoRh from './detalleContratoRh'

const ListaContratosRhPadre = () => {

    const [cargando, setCargando] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [tipoModal, setTipoModal] = useState('')
    const [propsModalForm, setPropsModalForm] = useState<IPropsModal>({
        resultForm1: {},
        resultForm2: {},
        resultForm3: []
    })

    const [redirect, setRedirect] = useState('VISTA_LISTA_CONTRATO_RH');
    const [rHContratoId, setRHContratoId] = useState<any>({});

    const validateRedirect = () => {
        switch (redirect) {
            case 'VISTA_LISTA_CONTRATO_RH':
                return (
                    <ListaContratosRh ejecutaModalComponent={ejecutaModalComponent} setCargando={setCargando} setRedirect={setRedirect} setRHContratoId={setRHContratoId} />
                )
            case 'VISTA_DETALLE_CONTRATO_RH':
                return (
                    <DetalleContratoRh rHContratoId={rHContratoId} setRedirect={setRedirect} />
                )
            default:
                return (
                    <></>
                )
        }
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

    const cancelaOperacionModal = () => {
        setTipoModal('')
        setModalOpen(false)
    }

    return (
        <>
            {
                validateRedirect()
            }
            {
                modalOpen ?
                    <Modal tipoModal={tipoModal} modalSi={() => { }} modalNo={() => { cancelaOperacionModal() }} propsModal={propsModalForm} />
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