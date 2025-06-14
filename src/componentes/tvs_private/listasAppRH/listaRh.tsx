import React, { useEffect, useState } from 'react'
import { IGenericResponse, IListaRhProps, IPropsModal, IPropsResultForm } from '../../../models/IProps'
import { AuthServices } from '../../../services/authServices'
import Modal from '../../tvs/modal/modal'
import { Cargando } from '../../tvs/loader/cargando'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeFork, faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Paginador } from '../../tvs/paginacion/paginador'

const ListaRh: React.FC<IListaRhProps> = ({ setRedirectZone, setRHContract, setRHEdita, setControlExecute, controlExecute, setPaginacionLista, paginacionLista,
  setIdentificacionFiltro, identificacionFiltro
}) => {

  const [cargando, setCargando] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [tipoModal, setTipoModal] = useState('')
  const [propsModalForm, setPropsModalForm] = useState<IPropsModal>({
    resultForm1: {},
    resultForm2: {},
    resultForm3: []
  })

  const [rHList, setRHList] = useState<any[]>([])

  useEffect(() => {
    getRHsInfo()
  }, [controlExecute])

  const getRHsInfo = async () => {
    setCargando(true)
    const body = {
      "identificacionFiltro": identificacionFiltro,
      "elementosPorPagina": paginacionLista.elementosPorPagina,
      "paginaActual": paginacionLista.paginaActual,
    }
    const authServices = new AuthServices();
    try {
      const response: IGenericResponse = await authServices.requestPost(body, 11);
      if (response.estado) {
        setRHList(response.objeto.recursoHumanoDtoList)
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

  const registrarContrato = async (rHId: any) => {
    setRedirectZone('VIEW_CONTRATO_RH')
    setRHContract(rHId)
  }

  const editarRhAction = async (rHId: any) => {
    setRedirectZone('VIEW_REGISTRA_RH')
    setRHEdita(rHId)
  }

  const verDetalleRh = async (rHId: any) => {
    const propsModalInfo: IPropsResultForm = {
      prop0: rHId.recursoHumanoDto.apellidos,
      prop1: rHId.recursoHumanoDto.nombres,
      prop2: rHId.recursoHumanoDto.fechaNacimiento,
      prop3: rHId.recursoHumanoDto.numeroIdentificacion,
      prop4: rHId.recursoHumanoDto.correoPersonal,
      prop5: rHId.recursoHumanoDto.correoCorporativo,
      prop6: rHId.recursoHumanoDto.celular,
      prop7: rHId.recursoHumanoDto.perfilProfesional,
    }
    setPropsModalForm({
      resultForm1: propsModalInfo,
      resultForm2: {},
      resultForm3: [],
      rHContracts: rHId.contratosRHDto
    })
    setTipoModal('MODAL_DETALLE_INFO')
    setModalOpen(true)

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

  const limpiarFiltros = () => {
    setIdentificacionFiltro('')
    setPaginacionLista({
      ...paginacionLista,
      paginaActual: '1'
    })
    setControlExecute(!controlExecute)
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
              <p className='p-label-form'>Por No. identificación </p>
              <input value={identificacionFiltro} onChange={(e) => setIdentificacionFiltro(e.target.value)} type="text" className='form-control' placeholder='' autoComplete='off' />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
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
        {
          rHList.length > 0 ?
            <>
              <div className='div-style-form-whit-table'>
                <table className='table-info'>
                  <thead>
                    <tr>
                      <td className='td-info'>
                        <p className='p-label-form'>Nombres</p>
                      </td>
                      <td className='td-info'>
                        <p className='p-label-form'>No. identificación </p>
                      </td>
                      <td className='td-info'>
                        <p className='p-label-form'>Celular</p>
                      </td>
                      <td className='td-info'>
                        <p className='p-label-form'>Correo personal</p>
                      </td>
                      <td className='td-info'>
                        <p className='p-label-form'>Perfil</p>
                      </td>
                      <td className='td-info'>
                        <p className='p-label-form'>Acciones</p>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      rHList.map((rHId, key) => {
                        return (
                          <tr key={key} className='tr-tablet'>
                            <td className='td-info'>
                              <p className=''>{rHId.recursoHumanoDto.nombres} {rHId.recursoHumanoDto.apellidos}</p>
                            </td>
                            <td className='td-info'>
                              <p className=''>{rHId.recursoHumanoDto.numeroIdentificacion}</p>
                            </td>
                            <td className='td-info'>
                              <p className=''>{rHId.recursoHumanoDto.celular}</p>
                            </td>
                            <td className='td-info'>
                              <p className=''> {rHId.recursoHumanoDto.correoPersonal} </p>
                            </td>
                            <td className='td-info'>
                              <p className=''> {rHId.recursoHumanoDto.perfilProfesional} </p>
                            </td>
                            <td className='td-info'>
                              <div className='mt-3'>
                                <button className='btn btn-link bottom-custom-link p-0' onClick={() => { registrarContrato(rHId) }}>
                                  <FontAwesomeIcon className='icons-table-ds' icon={faCodeFork} /><p className='margin-icons'>Contrato</p>
                                </button>
                                <button className='btn btn-link bottom-custom-link p-0' onClick={() => { verDetalleRh(rHId) }}>
                                  <FontAwesomeIcon className='icons-table-ds' icon={faEye} /><p className='margin-icons'>Detalle</p>
                                </button>
                                <button className='btn btn-link bottom-custom-link p-0' onClick={() => editarRhAction(rHId)}>
                                  <FontAwesomeIcon className='icons-table-ds' icon={faPencilAlt} /><p className='margin-icons'>Editar</p>
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
              <div className="row">
                <div className="col-12 col-sm-1 col-md-1 col-lg-2" ></div>
                <div className="col-12 col-sm-10 col-md-10 col-lg-8" >
                  <Paginador elementsPaginacion={paginacionLista} setElementsPaginacion={setPaginacionLista}
                    setExecuteConsultaList={setControlExecute} executeConsultaList={controlExecute} />
                </div>
                <div className="col-12 col-sm-1 col-md-1 col-lg-2" >
                  <p className="p-info-elementos-paginador">Total elementos {paginacionLista.totalElementos} </p>
                </div>
              </div>
            </>
            :
            <p className=''>No hay información</p>
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
      </div>
    </>
  )
}

export default ListaRh