import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { IContratoFormProps, IFormRHHandle, IListasSelect } from '../../../models/IProps'

const ContratoForm: React.ForwardRefRenderFunction<IFormRHHandle, IContratoFormProps> = ({ editaContrato, rHContratoId }, ref) => {

    useImperativeHandle(ref, () => ({
        funcionHandle1() {
            return validateForm()
        },
        funcionHandle2() {
            return resetForm()
        }
    }))

    const tiposDeContrato = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'INDEFINIDO', label: 'Termino indefinido' },
        { value: 'TERMINO_FIJO', label: 'Termino fijo' },
        { value: 'OBRA_LABOR', label: 'Obra labor' },
        { value: 'OPS', label: 'Prestación de Servicios (OPS)' },
    ]

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

    useEffect(() => {        
        if (editaContrato) {
            seteaValoresForm()
        }
    }, [])

    const seteaValoresForm = () => {
        const { contrato, zonaContrato, municipio,
            tipoContrato, fechaInicio, fechaFinalizacion,
        cargo, area, sueldo, auxilioTransporte, bono } = rHContratoId.contratoRHDto
        evaluateContratoCon(contrato)
        switch (contrato) {
            case 'RED_SALUD':
                evaluateEventZonaContrato(zonaContrato)
                break;
            case 'SALUD_YOPAl':
                break;
            default:
                break;
        }
        setMunicipio(municipio)
        evaluateTipoContrato(tipoContrato)
        setFechaInicio(fechaInicio)
        setFechaFinal(fechaFinalizacion)

        const resultadoCargo = filtrarPorValor(cargosList, cargo);
        if (resultadoCargo.length > 0) {
            setCargo(resultadoCargo[0].value)
        } else {
            setCargo('OTRO')
            setCargoCustom(cargo)
            setShowInputCargo(true)
        }

        setArea(area)
        setSueldo(sueldo)
        setAuxTransporte(auxilioTransporte)
        setBono(bono)
    }

    const filtrarPorValor = (lista: { value: string; label: string }[], valorBuscado: string) => {
        return lista.filter(item => item.value === valorBuscado);
    };

    const [constratoCon, setContratoCon] = useState('INITIAL');
    const [zona, setZona] = useState('INITIAL');
    const [municipio, setMunicipio] = useState('INITIAL');

    const [tipoContrato, setTipoContrato] = useState('INITIAL');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [cargo, setCargo] = useState('INITIAL');
    const [cargoCustom, setCargoCustom] = useState('');
    const [area, setArea] = useState('');
    const [sueldo, setSueldo] = useState('');
    const [auxTransporte, setAuxTransporte] = useState('');
    const [bono, setBono] = useState('');
    const [noContrato, setNoContrato] = useState('0');

    const [constratoConRef, setContratoConRef] = useState(false);
    const [zonaRef, setZonaRef] = useState(false);
    const [municipioRef, setMunicipioRef] = useState(false);

    const [tipoContratoRef, setTipoContratoRef] = useState(false);
    const [fechaInicioRef, setFechaInicioRef] = useState(false);
    const [fechaFinalRef, setFechaFinalRef] = useState(false);
    const [cargoRef, setCargoRef] = useState(false);
    const [cargoCustomRef, setCargoCustomRef] = useState(false);
    const [areaRef, setAreaRef] = useState(false);
    const [sueldoRef, setSueldoRef] = useState(false);
    const [auxTransporteRef, setAuxTransporteRef] = useState(false);
    const [bonoRef, setBonoRef] = useState(false);
    const [noContratoRef, setNoContratoRef] = useState(false);

    const [zonasList, setZonasList] = useState<IListasSelect[]>([]);
    const [municipiosList, setMunicipiosList] = useState<IListasSelect[]>([]);

    const [disableInputZona, setDisableInputZona] = useState(false);
    const [showInputCargo, setShowInputCargo] = useState(false);
    const [showInputFechaFinContrato, setShowInputFechaFinContrato] = useState(true);

    const resetForm = () => {
        setContratoCon('INITIAL');
        setZona('INITIAL');
        setMunicipio('INITIAL');
        setTipoContrato('INITIAL')
        setFechaInicio('');
        setFechaFinal('')
        setCargo('INITIAL');
        setArea('');
        setSueldo('');
        setAuxTransporte('');
        setBono('');
        setNoContrato('0')

        setContratoConRef(false)
        setZonaRef(false)
        setMunicipioRef(false)
        setTipoContratoRef(false)
        setFechaInicioRef(false)
        setFechaFinalRef(false)
        setCargoRef(false)
        setAreaRef(false)
        setSueldoRef(false)
        setAuxTransporteRef(false)
        setBonoRef(false)
        setNoContratoRef(false)

        setZonasList([])
        setMunicipiosList([])
        setDisableInputZona(false)
    }

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

        setTipoContratoRef(false)
        setFechaFinalRef(false)
        if (tipoContrato === 'INITIAL') {
            formValidado.push('tipoContrato');
            setTipoContratoRef(true)
        } else {
            if (tipoContrato !== 'INDEFINIDO') {
                if (fechaFinal.length === 0) {
                    formValidado.push('fechaFinal');
                    setFechaFinalRef(true)
                }
            }
        }

        setFechaInicioRef(false)
        if (fechaInicio.length === 0) {
            formValidado.push('fechaInicio');
            setFechaInicioRef(true)
        }

        setCargoRef(false)
        setCargoCustomRef(false)
        setAreaRef(false)
        setSueldoRef(false)
        setAuxTransporteRef(false)
        setBonoRef(false)
        setNoContratoRef(false)
        if (formValidado.length === 0) {
            let cargoValue = ''
            if (cargo !== 'INITIAL') {
                if (cargo === 'OTRO') {
                    cargoValue = cargoCustom
                } else {
                    cargoValue = cargo
                }
            }
            return {
                prop0: constratoCon,
                prop1: zona,
                prop2: municipio,
                prop10: tipoContrato,
                prop3: fechaInicio,
                prop11: fechaFinal,
                prop4: cargoValue,
                prop5: area,
                prop6: sueldo,
                prop7: auxTransporte,
                prop8: bono,
                prop9: noContrato,
            }
        } else {
            formValidado.splice(0, formValidado.length)
            return null
        }
    }

    const evaluateCargo = (cargo: string) => {
        setCargo(cargo)
        setShowInputCargo(false)
        if (cargo === 'OTRO') {
            setShowInputCargo(true)
        }
    }

    const evaluateTipoContrato = (tipoContrato: string) => {
        setTipoContrato(tipoContrato)
        setShowInputFechaFinContrato(true)
        if (tipoContrato === 'INDEFINIDO') {
            setFechaFinal('')
            setShowInputFechaFinContrato(false)
        }
    }

    return (
        <>
            {
                editaContrato ?
                    <></>
                    :
                    <>
                        <h4 >Información del Contrato:</h4>
                        <p>A continuación, ingresa la información del contrato:</p>
                    </>
            }
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
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
            </div>
            <hr />
            {
                editaContrato ?
                    <></>
                    :
                    <>
                        <h4 >Detalle del Contrato:</h4>
                    </>
            }
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Tipo de contrato: </p>
                        <select value={tipoContrato} onChange={(e) => evaluateTipoContrato(e.target.value)} className={tipoContratoRef ? 'form-control form-control-error' : 'form-control'} >
                            {
                                tiposDeContrato.map((key, i) => {
                                    return (
                                        <option key={i} value={key.value}>{key.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Fecha Inicio: </p>
                        <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className={fechaInicioRef ? 'form-control form-control-error' : 'form-control'} />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Fecha Final: </p>
                        {
                            showInputFechaFinContrato ?
                                <input type="date" value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)} className={fechaFinalRef ? 'form-control form-control-error' : 'form-control'} />
                                :
                                <input type="date" value={fechaFinal} className={fechaFinalRef ? 'form-control form-control-error' : 'form-control'} disabled />
                        }
                    </div>
                </div>
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
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    {
                        editaContrato ?
                            <></>
                            :
                            <>
                                <div className='div-form'>
                                    <p className='p-label-form'>No contrato: </p>
                                    <input type="text" value={noContrato} onChange={(e) => setNoContrato(e.target.value)} className={noContratoRef ? 'form-control form-control-error' : 'form-control'} />
                                </div>
                                <p>
                                    **Ingrese un número de contrato. Si deja el valor en 0, se asignará automáticamente el próximo número disponible. Si el número ingresado ya existe,
                                    no podrá crear el contrato.**
                                </p>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default forwardRef(ContratoForm)