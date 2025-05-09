import React, { useState } from 'react'
import { IOtroSiProps } from '../../../models/IProps';

const OtroSiVigencia: React.FC<IOtroSiProps> = ({ rHContratoId }) => {

  const [fechaFinal, setFechaFinal] = useState('');
  const [fechaFinalRef, setFechaFinalRef] = useState(false);

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
            <button className='btn btn-primary bottom-custom' onClick={() => { }} >Actualizar</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default OtroSiVigencia