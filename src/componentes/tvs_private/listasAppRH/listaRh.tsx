import React, { useEffect, useState } from 'react'
import { IGenericResponse, IListaRhProps, IPropsModal, IPropsResultForm } from '../../../models/IProps'
import { AuthServices } from '../../../services/authServices'
import Modal from '../../tvs/modal/modal'
import { Cargando } from '../../tvs/loader/cargando'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeFork, faEye } from '@fortawesome/free-solid-svg-icons'

const ListaRh: React.FC<IListaRhProps> = ({ setRedirectZone, setRHContract }) => {

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
  }, [])

  const getRHsInfo = async () => {
    setCargando(true)
    const authServices = new AuthServices();
    try {
      const response: IGenericResponse = await authServices.requestPost({}, 11);
      if (response.estado) {
        setRHList(response.objeto)
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
      resultForm3: []
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

  return (
    <>
      <div className='div-style-form'>

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

export default ListaRh