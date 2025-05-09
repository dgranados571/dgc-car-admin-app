import React, { useState } from 'react'
import { IOtroSiProps } from '../../../models/IProps';

const OtroSiSalarial: React.FC<IOtroSiProps> = ({ rHContratoId }) => {

    const cargosList = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'ADMINISTRATIVA', label: 'Administrativa' },
        { value: 'ADMISIONES', label: 'Admisiones' },
        { value: 'APOYO_LIDER_DE_FACTURACION', label: 'Apoyo lider de facturacion' },
        { value: 'AUDITORIA', label: 'Auditoria' },
        { value: 'AUXILIAR_ADMINISTRATIVO', label: 'Auxiliar administrativo' },
        { value: 'AUXILIAR_FACTURACION', label: 'Auxiliar facturacion' },
        { value: 'CX_MATERNO_INFANTIL', label: 'C.X Materno infantil' },
        { value: 'COORDINADOR', label: 'Coordinador' },
        { value: 'FACTURADOR', label: 'Facturador' },
        { value: 'HOSPITALIZACION', label: 'Hospitalización' },
        { value: 'JUAN_LUIS_Y_HOSPI', label: 'Juan luis y Hospi' },
        { value: 'LIDER_FACTURACION', label: 'Lider facturacion' },
        { value: 'LIDER_TALENTO_HUMANO', label: 'Lider talento humano' },
        { value: 'RADICADOR', label: 'Radicador' },
        { value: 'SUPERVISOR_CONSULTA_EXTERNA', label: 'Supervisor - consulta externa' },
        { value: 'TECNICO_AUDITORIA', label: 'Tecnico auditoria' },
        { value: 'OTRO', label: 'Otro' },
    ];

    const [cargo, setCargo] = useState('INITIAL');
    const [cargoCustom, setCargoCustom] = useState('');
    const [area, setArea] = useState('');
    const [sueldo, setSueldo] = useState('');
    const [auxTransporte, setAuxTransporte] = useState('');
    const [bono, setBono] = useState('');

    const [cargoRef, setCargoRef] = useState(false);
    const [cargoCustomRef, setCargoCustomRef] = useState(false);
    const [areaRef, setAreaRef] = useState(false);
    const [sueldoRef, setSueldoRef] = useState(false);
    const [auxTransporteRef, setAuxTransporteRef] = useState(false);
    const [bonoRef, setBonoRef] = useState(false);

    const [showInputCargo, setShowInputCargo] = useState(false);

    const evaluateCargo = (cargo: string) => {
        setCargo(cargo)
        setShowInputCargo(false)
        if (cargo === 'OTRO') {
            setShowInputCargo(true)
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Cargo: </p>
                        {
                            <select value={cargo} onChange={(e) => evaluateCargo(e.target.value)} className={cargoRef ? 'form-control form-control-error' : 'form-control'} >
                                {
                                    cargosList.map((key, i) => {
                                        return (
                                            <option key={i} value={key.value}>{key.label}</option>
                                        )
                                    })
                                }
                            </select>
                        }
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Indique el cargo: </p>
                        {
                            showInputCargo ?
                                <>
                                    <input type="text" value={cargoCustom} onChange={(e) => setCargoCustom(e.target.value)} className={cargoCustomRef ? 'form-control form-control-error' : 'form-control'} />
                                </>
                                :
                                <>
                                    <input type="text" disabled className={cargoCustomRef ? 'form-control form-control-error' : 'form-control'} />
                                </>
                        }
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Area: </p>
                        <input type="text" value={area} onChange={(e) => setArea(e.target.value)} className={areaRef ? 'form-control form-control-error' : 'form-control'} />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Sueldo: </p>
                        <input type="text" value={sueldo} onChange={(e) => setSueldo(e.target.value)} className={sueldoRef ? 'form-control form-control-error' : 'form-control'} />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Auxilio transporte: </p>
                        <input type="text" value={auxTransporte} onChange={(e) => setAuxTransporte(e.target.value)} className={auxTransporteRef ? 'form-control form-control-error' : 'form-control'} />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Bono: </p>
                        <input type="text" value={bono} onChange={(e) => setBono(e.target.value)} className={bonoRef ? 'form-control form-control-error' : 'form-control'} />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                    <div className='div-bottom-custom'>
                        <button className='btn btn-primary bottom-custom' onClick={() => { }} >Actualizar contrato</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OtroSiSalarial