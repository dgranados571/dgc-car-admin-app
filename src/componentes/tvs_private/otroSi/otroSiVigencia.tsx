import React, { useState } from 'react'
import { IContratoRHDto, IGenericResponse, IOtroSiProps, IPropsModal } from '../../../models/IProps';
import Modal from '../../tvs/modal/modal';
import { Cargando } from '../../tvs/loader/cargando';
import { AuthServices } from '../../../services/authServices';

const OtroSiVigencia: React.FC<IOtroSiProps> = ({ rHContratoId, setTipoOtroSi }) => {

  const [cargando, setCargando] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpen1, setModalOpen1] = useState(false)
  const [tipoModal, setTipoModal] = useState('')
  const [propsModalForm, setPropsModalForm] = useState<IPropsModal>({
    resultForm1: {},
    resultForm2: {},
    resultForm3: []
  })

  const [fechaFinal, setFechaFinal] = useState('');
  const [fechaFinalRef, setFechaFinalRef] = useState(false);

  const validateForm = () => {
    let formValidado = [];

    setFechaFinalRef(false)
    if (fechaFinal.length === 0) {
      setFechaFinalRef(true)
      formValidado.push('fechaFinal');
    }

    if (formValidado.length === 0) {
      ejecutaModalComponent('Otro si modificatorio', 'Se procederá con la generación del Otrosí debido a la modificación en la vigencia del contrato. ¿Está de acuerdo con este ajuste? Si requiere algún cambio adicional, por favor notifíquelo antes de finalizar el proceso.', 'MODAL_CONTROL_2', 0)
    } else {
      formValidado.splice(0, formValidado.length)
    }
  }

  const otroSiExecuteService = async () => {
    setCargando(true)
    const infoForm2: IContratoRHDto = {
      contrato: '',
      zonaContrato: '',
      municipio: '',
      tipoContrato: '',
      fechaInicio: '',
      fechaFinalizacion: fechaFinal,
      cargo: '',
      area: '',
      sueldo: '',
      auxilioTransporte: '',
      bono: '',
      noContrato: ''
    }

    const body = {
      "idContratoRh": rHContratoId.idContratoRh,
      "contratoRHDto": infoForm2,
      "tipoOtroSi": 'OTRO_SI_VIGENCIA'
    }
    const authServices = new AuthServices();
    try {
      const response: IGenericResponse = await authServices.requestPost(body, 15);
      let tituloModal = 'Valla algo salió mal¡¡'
      let indexModal = 0;
      if (response.estado) {
        tituloModal = 'Creación exitosa del Otro Si'
        indexModal = 1;
      }
      ejecutaModalComponent(tituloModal, response.mensaje, 'MODAL_CONTROL_1', indexModal)
      setCargando(false)
    } catch (error) {
      setCargando(false)
      ejecutaModalComponent('Valla algo salió mal¡¡', 'No fue posible el registro de la información, contacte al administrador', 'MODAL_CONTROL_1', 0)
    }
  }

  const ejecutaModalComponent = (titulo: string, descripicion: string, tipoModal: string, indexModal: number) => {
    setPropsModalForm({
      resultForm1: {
        prop0: titulo,
        prop1: descripicion,
      },
      resultForm2: {},
      resultForm3: []
    })
    setTipoModal(tipoModal)
    switch (indexModal) {
      case 1:
        setModalOpen1(true)
        break;
      default:
        setModalOpen(true)
        break;
    }
  }

  const cancelaOperacionModal = () => {
    setTipoModal('')
    setModalOpen(false)
  }

  return (
    <>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
          <div className='div-form'>
            <p className="">
              Esta modificación contractual permitirá prolongar la vigencia del acuerdo dentro de los términos establecidos acontinuación, garantizando la continuidad de las condiciones pactadas entre las partes.
            </p>
            <p className="">
              Para proceder con la formalización de este ajuste, a continuacion selecccione la fecha a la sera extendida la vigencia del contrato:
            </p>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
          <div className='div-form my-4'>
            <p className='p-label-form'>Fecha Final: </p>
            <input type="date" value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)} className={fechaFinalRef ? 'form-control form-control-error' : 'form-control'} />
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
          <div className='div-bottom-custom'>
            <button className='btn btn-primary bottom-custom' onClick={() => { validateForm() }} >Actualizar</button>
          </div>
        </div>
      </div>
      {
        modalOpen ?
          <Modal tipoModal={tipoModal} modalSi={() => { otroSiExecuteService() }} modalNo={() => { cancelaOperacionModal() }} propsModal={propsModalForm} />
          :
          <></>
      }
      {
        modalOpen1 ?
          <Modal tipoModal={tipoModal} modalSi={() => { }} modalNo={() => { setTipoOtroSi('INITIAL') }} propsModal={propsModalForm} />
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

export default OtroSiVigencia