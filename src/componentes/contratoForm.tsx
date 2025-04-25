import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { IFormRHHandle, IListasSelect } from '../models/IProps'
import { set } from 'react-datepicker/dist/date_utils'

const ContratoForm: React.ForwardRefRenderFunction<IFormRHHandle> = ({ }, ref) => {


    useImperativeHandle(ref, () => ({
        funcionHandle1() {
            return validateForm()
        }
    }))

    const contratosCon = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'RED_SALUD', label: 'Red Salud' },
        { value: 'SALUD_YOPAl', label: 'Salud Yopal' }
    ]

    const zonasRedSalud = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'ZONA_CENTRO', label: 'Zona Centro' },
        { value: 'ZONA_SUR', label: 'Zona Sur' },
        { value: 'ZONA_NORTE', label: 'Zona Norte' },
        { value: 'OFICINA_ADMINISTRATIVA', label: 'Oficina administrativa' }
    ]

    const ciudadesZC = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'NUNCHIA', label: 'NUNCHIA' },
        { value: 'OROCUE', label: 'OROCUE' },
        { value: 'TRINIDAD', label: 'TRINIDAD' },
        { value: 'SAN_LUIS_DE_PALENQUE', label: 'SAN LUIS DE PALENQUE' },
        { value: 'TAMARA', label: 'TAMARA' }
    ]

    const ciudadesZS = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'CHAMEZA', label: 'CHAMEZA' },
        { value: 'MANI', label: 'MANI' },
        { value: 'MONTERREY', label: 'MONTERREY' },
        { value: 'RECETOR', label: 'RECETOR' },
        { value: 'VILLANUEVA', label: 'VILLANUEVA' },
        { value: 'SABANALARGA', label: 'SABANALARGA' }
    ]

    const ciudadesZN = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'PAZ_DE_ARIPORO', label: 'PAZ DE ARIPORO' },
        { value: 'PORE', label: 'PORE' },
        { value: 'HATO_COROZAL', label: 'HATO COROZAL' },
        { value: 'LA_SALINA', label: 'LA SALINA' },
        { value: 'SACAMA', label: 'SACAMA' }
    ]

    const ciudadesOA = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'YOPAL', label: 'YOPAL' }
    ]

    const [constratoCon, setContratoCon] = useState('INITIAL');
    const [zona, setZona] = useState('INITIAL');
    const [municipio, setMunicipio] = useState('INITIAL');
    const [fechaInicio, setFechaInicio] = useState('');
    const [cargo, setCargo] = useState('');
    const [area, setArea] = useState('');
    const [sueldo, setSueldo] = useState('');
    const [auxTransporte, setAuxTransporte] = useState('');
    const [bono, setBono] = useState('');


    const [constratoConRef, setContratoConRef] = useState(false);
    const [zonaRef, setZonaRef] = useState(false);
    const [municipioRef, setMunicipioRef] = useState(false);
    const [fechaInicioRef, setFechaInicioRef] = useState(false);
    const [cargoRef, setCargoRef] = useState(false);
    const [areaRef, setAreaRef] = useState(false);
    const [sueldoRef, setSueldoRef] = useState(false);
    const [auxTransporteRef, setAuxTransporteRef] = useState(false);
    const [bonoRef, setBonoRef] = useState(false);

    const [zonasList, setZonasList] = useState<IListasSelect[]>([]);
    const [municipiosList, setMunicipiosList] = useState<IListasSelect[]>([]);

    const [disableInputZona, setDisableInputZona] = useState(false);

    const evaluateContratoCon = (contratoCon: string) => {
        switch (contratoCon) {
            case 'RED_SALUD':
                setContratoCon(contratoCon)
                setZonasList(zonasRedSalud)
                setMunicipiosList([])
                setZona('INITIAL')
                setMunicipio('INITIAL')
                setDisableInputZona(false)
                break;
            case 'SALUD_YOPAl':
                setContratoCon(contratoCon)
                setZonasList([])
                setMunicipiosList(ciudadesOA)
                setZona('INITIAL')
                setMunicipio('INITIAL')
                setDisableInputZona(true)
                break;
            default:
                setContratoCon('INITIAL')
                setZonasList([])
                setMunicipiosList([])
                setZona('INITIAL')
                setMunicipio('INITIAL')
                setDisableInputZona(false)
                break;
        }
    }

    const evaluateEventZonaContrato = (zona: string) => {
        setMunicipio('INITIAL')
        switch (zona) {
            case 'ZONA_CENTRO':
                setMunicipiosList(ciudadesZC)
                setZona(zona)
                break;
            case 'ZONA_SUR':
                setMunicipiosList(ciudadesZS)
                setZona(zona)
                break;
            case 'ZONA_NORTE':
                setMunicipiosList(ciudadesZN)
                setZona(zona)
                break;
            case 'OFICINA_ADMINISTRATIVA':
                setMunicipiosList(ciudadesOA)
                setZona(zona)
                break;
            default:
                setMunicipiosList([])
                setZona('INITIAL')
                break;
        }
    }

    const validateForm = () => {
        let formValidado = [];
        setContratoConRef(false)
        setZonaRef(false)
        setMunicipioRef(false)
        if (constratoCon === 'INITIAL') {
            formValidado.push('constratoCon');
            setContratoConRef(true)
        } else if (constratoCon === 'RED_SALUD') {
            if (zona === 'INITIAL') {
                formValidado.push('zona');
                setZonaRef(true)
            } else {
                if (municipio === 'INITIAL') {
                    formValidado.push('municipio');
                    setMunicipioRef(true)
                }
            }
        } else if (constratoCon === 'SALUD_YOPAl') {
            if (municipio === 'INITIAL') {
                formValidado.push('municipio');
                setMunicipioRef(true)
            }
        }
        setFechaInicioRef(false)
        if(fechaInicio.length === 0){
            formValidado.push('fechaInicio');
            setFechaInicioRef(true)
        }
        if (formValidado.length === 0) {
            return {
                prop0: constratoCon,
                prop1: zona,
                prop2: municipio,
                prop3: fechaInicio,
                prop4: cargo,
                prop5: area,
                prop6: sueldo,
                prop7: auxTransporte,
                prop8: bono,
            }
        } else {
            formValidado.splice(0, formValidado.length)
            return null
        }
    }

    return (
        <>
            <h4 >Información del Contrato</h4>
            <p>A continuación, ingresa la información del contrato:</p>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Contrato: </p>
                        <select value={constratoCon} onChange={(e) => evaluateContratoCon(e.target.value)} className={constratoConRef ? 'form-control form-control-error' : 'form-control'} >
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
                        <p className='p-label-form'>Zona:</p>
                        {
                            disableInputZona ?
                                <>
                                    <select value={zona} onChange={(e) => evaluateEventZonaContrato(e.target.value)} className={zonaRef ? 'form-control form-control-error' : 'form-control'} disabled ></select>
                                </>
                                :
                                <>
                                    <select value={zona} onChange={(e) => evaluateEventZonaContrato(e.target.value)} className={zonaRef ? 'form-control form-control-error' : 'form-control'} >
                                        {
                                            zonasList.map((key, i) => {
                                                return (
                                                    <option key={i} value={key.value}>{key.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </>
                        }
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Municipio: </p>
                        <select value={municipio} onChange={(e) => setMunicipio(e.target.value)} className={municipioRef ? 'form-control form-control-error' : 'form-control'} >
                            {
                                municipiosList.map((key, i) => {
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
                        <p className='p-label-form'>Fecha Inicio: </p>
                        <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className={fechaInicioRef ? 'form-control form-control-error' : 'form-control'} />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Cargo: </p>
                        <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} className={cargoRef ? 'form-control form-control-error' : 'form-control'} />
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
            </div>
        </>
    )
}

export default forwardRef(ContratoForm)