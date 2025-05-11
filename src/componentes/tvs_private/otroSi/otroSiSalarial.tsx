import React, { useEffect, useState } from 'react'
import { IContratoRHDto, IGenericResponse, IOtroSiProps, IPropsModal } from '../../../models/IProps';
import { AuthServices } from '../../../services/authServices';
import Modal from '../../tvs/modal/modal';
import { Cargando } from '../../tvs/loader/cargando';

const OtroSiSalarial: React.FC<IOtroSiProps> = ({ rHContratoId, setTipoOtroSi }) => {

    useEffect(() => {
        setValuesElements()
    }, [])


    const [cargando, setCargando] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpen1, setModalOpen1] = useState(false)
    const [tipoModal, setTipoModal] = useState('')
    const [propsModalForm, setPropsModalForm] = useState<IPropsModal>({
        resultForm1: {},
        resultForm2: {},
        resultForm3: []
    })

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

    const setValuesElements = () => {
        const { cargo, area, sueldo, auxilioTransporte, bono } = rHContratoId.contratoRHDto
        const resultadoCargo = filtrarPorValor(cargosList, cargo);
        if (resultadoCargo.length > 0) {
            setCargo(resultadoCargo[0].value)
        } else {
            setCargo('OTRO')
            setCargoCustom(cargo)
        }
        setArea(area)
        setSueldo(sueldo)
        setAuxTransporte(auxilioTransporte)
        setBono(bono)
    }

    const filtrarPorValor = (lista: { value: string; label: string }[], valorBuscado: string) => {
        return lista.filter(item => item.value === valorBuscado);
    };

    const evaluateCargo = (cargo: string) => {
        setCargo(cargo)
        setShowInputCargo(false)
        if (cargo === 'OTRO') {
            setShowInputCargo(true)
        }
    }

    const validateForm = () => {
        let formValidado = [];

        setCargoRef(false)
        setCargoCustomRef(false)
        if (cargo === 'INITIAL') {
            setCargoRef(true)
            formValidado.push('cargo');
        } else {
            if (cargo === 'OTRO') {
                if (cargoCustom.length === 0) {
                    setCargoCustomRef(true)
                    formValidado.push('cargoCustom');
                }
            }
        }

        setAreaRef(false)
        if (area.length === 0) {
            setAreaRef(true)
            formValidado.push('area');
        }

        setSueldoRef(false)
        if (sueldo.length === 0) {
            setSueldoRef(true)
            formValidado.push('sueldo');
        }

        setAuxTransporteRef(false)
        if (auxTransporte.length === 0) {
            setAuxTransporteRef(true)
            formValidado.push('auxTransporte');
        }

        setBonoRef(false)
        if (bono.length === 0) {
            setBonoRef(true)
            formValidado.push('bono');
        }

        if (formValidado.length === 0) {
            ejecutaModalComponent('Otro si modificatorio', 'Se procederá con la generación del Otrosí debido a la modificación en las condiciones salariales. ¿Está de acuerdo con este ajuste? Si requiere algún cambio adicional, por favor notifíquelo antes de finalizar el proceso.', 'MODAL_CONTROL_2', 0)
        } else {
            formValidado.splice(0, formValidado.length)
        }
    }

    const otroSiExecuteService = async () => {
        setCargando(true)
        let cargoValue = ''
        if (cargo === 'OTRO') {
            cargoValue = cargoCustom
        } else {
            cargoValue = cargo
        }

        const infoForm2: IContratoRHDto = {
            contrato: '',
            zonaContrato: '',
            municipio: '',
            tipoContrato: '',
            fechaInicio: '',
            fechaFinalizacion: '',
            cargo: cargoValue,
            area: area,
            sueldo: sueldo,
            auxilioTransporte: auxTransporte,
            bono: bono,
            noContrato: ''
        }

        const body = {
            "idContratoRh": rHContratoId.idContratoRh,
            "contratoRHDto": infoForm2,
            "tipoOtroSi": 'OTRO_SI_SALARIAL'
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

export default OtroSiSalarial