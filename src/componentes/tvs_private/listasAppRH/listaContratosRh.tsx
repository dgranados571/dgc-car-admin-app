import React, { useEffect, useState } from 'react'
import { IGenericResponse, IListaContratosRhProps } from '../../../models/IProps'
import { AuthServices } from '../../../services/authServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Paginador } from '../../tvs/paginacion/paginador'

const ListaContratosRh: React.FC<IListaContratosRhProps> = ({ ejecutaModalComponent, setCargando, setRedirect, setRHContratoId, zonaConsulta, setControlExecute,
    controlExecute, setContratoFiltro, setPaginacionLista, paginacionLista, contratoFiltro, setIdentificacionFiltro, identificacionFiltro
}) => {

    const rolesPermitenEliminar = ['ROLE_ROOT']
    const [showBotomElimina, setShowBotomElimina] = useState(false);

    const contratosCon = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'RED_SALUD', label: 'Red Salud' },
        { value: 'SALUD_YOPAl', label: 'Salud Yopal' }
    ]

    const [contratosRhList, setContratosRhList] = useState<any[]>([])

    useEffect(() => {
        if (rolesPermitenEliminar.includes(zonaConsulta)) {
            setShowBotomElimina(true)
        }
        getRHContratosInfo()
    }, [controlExecute])

    const getRHContratosInfo = async () => {
        setCargando(true)
        const body = {
            "contratoFiltro": contratoFiltro,
            "identificacionFiltro": identificacionFiltro,
            "elementosPorPagina": paginacionLista.elementosPorPagina,
            "paginaActual": paginacionLista.paginaActual,
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 12);

            if (response.estado) {
                setContratosRhList(response.objeto.contratosRHList)
                setPaginacionLista({
                    ...paginacionLista,
                    totalElementos: response.objeto.totalElementos
                })
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
        setRHContratoId(rHContratoId.idContratoRh)
        setRedirect('VISTA_DETALLE_CONTRATO_RH')
    }

    const limpiarFiltros = () => {
        setContratoFiltro('INITIAL')
        setIdentificacionFiltro('')
        setPaginacionLista({
            ...paginacionLista,
            paginaActual: '1'
        })
        setControlExecute(!controlExecute)
    }

    const eliminarContrato = (rHContratoId: any) => {
        const idPropExecute = {
            "action": "ELIMINAR",
            "idProp": rHContratoId.idContratoRh,
        }
        ejecutaModalComponent('Advertencia: Eliminación del contrato', 'Eliminar este contrato es una acción irreversible. Todos los datos asociados serán eliminados permanentemente del sistema y no podrán ser recuperados. Esto podría afectar procesos relacionados a la gestión contractual. Por favor, asegúrate de haber revisado toda la información antes de proceder.', 'MODAL_CONTROL_2', idPropExecute)
    }

    const ejecutaFiltros = () => {
        setPaginacionLista({
            ...paginacionLista,
            paginaActual: '1'
        })
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
                            <button className='btn btn-primary bottom-custom' onClick={() => { ejecutaFiltros() }} >Buscar</button>
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
                                                <p className='p-label-form'>Contrato</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Nombre</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>No documento</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Tipo contrato</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Fecha inicio</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Fecha finalización</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Estado</p>
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
                                                            <p className=''>{rHContratoId.contratoRHDto.contrato}</p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''>{rHContratoId.recursoHumanoDto.nombres} {rHContratoId.recursoHumanoDto.apellidos}</p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''>{rHContratoId.recursoHumanoDto.numeroIdentificacion}</p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''> {rHContratoId.contratoRHDto.tipoContrato} </p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''> {rHContratoId.contratoRHDto.fechaInicio} </p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''> {rHContratoId.contratoRHDto.fechaFinalizacion} </p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''> {rHContratoId.contratoRHDto.estado} </p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <div className=''>
                                                                <button className='btn btn-link bottom-custom-link p-0' onClick={() => detalleContrato(rHContratoId)}>
                                                                    <FontAwesomeIcon className='icons-table-ds' icon={faEye} /><p className='margin-icons'>Gestionar</p>
                                                                </button>
                                                            </div>
                                                            {
                                                                showBotomElimina ?
                                                                    <>
                                                                        <button className='btn btn-link bottom-custom-link p-0' onClick={() => eliminarContrato(rHContratoId)}>
                                                                            <FontAwesomeIcon className='icons-table-ds' icon={faTrash} /><p className='margin-icons'>Eliminar</p>
                                                                        </button>
                                                                    </>
                                                                    :
                                                                    <></>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-1 col-md-1 col-lg-2" ></div>
                                <div className="col-12 col-sm-10 col-md-10 col-lg-8" >
                                    <Paginador elementsPaginacion={paginacionLista} setElementsPaginacion={setPaginacionLista}
                                        setExecuteConsultaList={setControlExecute} executeConsultaList={controlExecute} />
                                </div>
                                <div className="col-12 col-sm-1 col-md-1 col-lg-2" ></div>
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