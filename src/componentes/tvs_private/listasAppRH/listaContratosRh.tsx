import React, { useEffect, useState } from 'react'
import { IGenericResponse, IListaContratosRhProps } from '../../../models/IProps'
import { AuthServices } from '../../../services/authServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const ListaContratosRh: React.FC<IListaContratosRhProps> = ({ ejecutaModalComponent, setCargando, setRedirect, setRHContratoId }) => {

    const contratosCon = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'RED_SALUD', label: 'Red Salud' },
        { value: 'SALUD_YOPAl', label: 'Salud Yopal' }
    ]

    const [contratoFiltro, setContratoFiltro] = useState('INITIAL')
    const [identificacionFiltro, setIdentificacionFiltro] = useState('')
    const [controlExecute, setControlExecute] = useState(false)

    const [contratosRhList, setContratosRhList] = useState<any[]>([])

    useEffect(() => {
        getRHContratosInfo()
    }, [controlExecute])

    const getRHContratosInfo = async () => {
        setCargando(true)
        const body = {
            "contratoFiltro": contratoFiltro,
            "identificacionFiltro": identificacionFiltro
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 12);
            if (response.estado) {
                setContratosRhList(response.objeto)
            } else {
                ejecutaModalComponent('Valla algo salió mal¡¡', response.mensaje, 'MODAL_CONTROL_1')
            }
            setCargando(false)
        } catch (error) {
            setCargando(false)
            ejecutaModalComponent('Valla algo salió mal¡¡', 'No fue posible consultar la información, contacte al administrador', 'MODAL_CONTROL_1')
        }
    }

    const detalleContrato = (rHContratoId: any) => {
        setRHContratoId(rHContratoId)
        setRedirect('VISTA_DETALLE_CONTRATO_RH')
    }

    const limpiarFiltros = () => {
        setContratoFiltro('INITIAL')
        setIdentificacionFiltro('')
        setControlExecute(!controlExecute)
    }

    return (
        <>
            <div className='div-style-form'>
                <h4>Aplicar filtros: </h4>
                <div className="row mb-5">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Por contrato: </p>
                            <select value={contratoFiltro} onChange={(e) => setContratoFiltro(e.target.value)} className='form-control' >
                                {
                                    contratosCon.map((key, i) => {
                                        return (
                                            <option key={i} value={key.value}>{key.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Por No. identificación </p>
                            <input value={identificacionFiltro} onChange={(e) => setIdentificacionFiltro(e.target.value)} type="text" className='form-control' placeholder='' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <p className='p-info-filtros'>Para reiniciar la búsqueda, bastará con limpiar los filtros*</p>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-bottom-custom'>
                            <button className='btn btn-primary bottom-custom' onClick={() => { setControlExecute(!controlExecute) }} >Buscar</button>
                            <button className='btn btn-secondary bottom-custom-secondary' onClick={() => limpiarFiltros()} >Limpiar filtros</button>
                        </div>
                    </div>
                </div>
                <hr />
                <h4>Contratos: </h4>
                {
                    contratosRhList.length > 0 ?
                        <>
                            <div className='div-style-form-whit-table'>
                                <table className='table-info'>
                                    <thead>
                                        <tr>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Id</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Contrato</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Nombre</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Fecha inicio</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Cargo</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Acciones</p>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            contratosRhList.map((rHContratoId, key) => {
                                                return (
                                                    <tr key={key} className='tr-tablet'>
                                                        <td className='td-info'>
                                                            <p className=''>{rHContratoId.idContratoRh}</p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''>{rHContratoId.contratoRHDto.contrato}</p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''>{rHContratoId.recursoHumanoDto.nombres} {rHContratoId.recursoHumanoDto.apellidos}</p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''> {rHContratoId.contratoRHDto.fechaInicio} </p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''> {rHContratoId.contratoRHDto.cargo} </p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <div className='mt-3'>
                                                                <button className='btn btn-link bottom-custom-link p-0' onClick={() => detalleContrato(rHContratoId)}>
                                                                    <FontAwesomeIcon className='icons-table-ds' icon={faEye} /><p className='margin-icons'>Detalle</p>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                        :
                        <p className=''>No hay información</p>
                }
            </div>
        </>
    )
}

export default ListaContratosRh