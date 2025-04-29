import React, { useEffect, useState } from 'react'
import PieChart from '../tvs/pieChart/pieChart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { AuthServices } from '../../services/authServices'
import { IGenericResponse, IPropsModal, IResultDashBoardInfo } from '../../models/IProps'
import Modal from '../tvs/modal/modal'
import { Cargando } from '../tvs/loader/cargando'

const Dashboard = () => {

    const [cargando, setCargando] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [tipoModal, setTipoModal] = useState('')
    const [propsModalForm, setPropsModalForm] = useState<IPropsModal>({
        resultForm1: {},
        resultForm2: {},
        resultForm3: []
    })

    const [resultDashBoard, setResultDashBoard] = useState<IResultDashBoardInfo>({
        tasaDeContratacion: [],
        totalContratos:'0',
        totalRH: '0'
    })

    useEffect(() => {
        getDashboardInfo()
    }, [])

    const getDashboardInfo = async () => {
        setCargando(true)
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost({}, 9);
            if(response.estado){
                setResultDashBoard(response.objeto)
            } else {
                ejecutaModalComponent('Valla algo salió mal¡¡', response.mensaje, 'MODAL_CONTROL_1')
            }
            setCargando(false)
        } catch (error) {
            setCargando(false)
            ejecutaModalComponent('Valla algo salió mal¡¡', 'No fue posible consultar la información, contacte al administrador', 'MODAL_CONTROL_1')
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
            <div className="row">
                <div className="col-12 col-sm-1 col-md-2 col-lg-3" ></div>
                <div className="col-6 col-sm-5 col-md-4 col-lg-3" >
                    <div className="div-total1-dashboard">
                        <FontAwesomeIcon className='icon-menu-principal' icon={faUsers} />
                        <div className="div-elementos-total1">                            
                            <p className='p-label-dashboard'>Recursos en operación:</p>
                            <p className='p-info-total1'>{resultDashBoard.totalRH} </p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-sm-5 col-md-4 col-lg-3" >
                    <div className="div-total1-dashboard">
                        <FontAwesomeIcon className='icon-menu-principal' icon={faBriefcase} />
                        <div className="div-elementos-total1">                            
                            <p className='p-label-dashboard'>Contratos de servicios:</p>
                            <p className='p-info-total1'>2</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-1 col-md-2 col-lg-3" ></div>

                <div className="col-12 col-sm-2 col-md-4 col-lg-4" ></div>
                <div className="col-12 col-sm-8 col-md-4 col-lg-4" >
                    <div className="div-pie-view">
                        <h4 className='mb-3'>Taza de distribución operativa</h4>
                        <PieChart data={resultDashBoard.tasaDeContratacion} width={120} height={120} />
                    </div>
                </div>
                <div className="col-12 col-sm-2 col-md-4 col-lg-4" ></div>
            </div>
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

export default Dashboard