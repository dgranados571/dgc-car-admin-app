import React from 'react'
import './modal.css'
import { IListasCursos, IModalProps } from '../../../models/IProps'

const Modal: React.FC<IModalProps> = ({ tipoModal, modalSi, modalNo, propsModal }) => {

    const detalleCursosList = (resultForm3: IListasCursos[]) => {

        if (resultForm3.length === 0) {
            return (
                <>
                    <p className='p-label-form m-0'>Sin registros de cursos</p>
                </>
            )
        } else {
            return resultForm3.map((cursoId, ind) => {
                return (
                    <>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 div-lista-cursos" >
                            <div className='d-flex justify-content-start align-items-start' >
                                <p className='p-label-form m-0'> Curso: </p>
                                <p className='mx-2'> {cursoId.nombreCurso} </p>
                            </div>
                            <div className='d-flex justify-content-start' >
                                <p className='p-label-form m-0'>Fecha certificación: </p>
                                <p className='mx-2'> {cursoId.fechaCertificacion} </p>
                            </div>
                            <div className='d-flex justify-content-start' >
                                <p className='p-label-form m-0'>Fecha vencimiento: </p>
                                <p className='mx-2'> {cursoId.fechaVencimiento} </p>
                            </div>
                            <div className='d-flex justify-content-start' >
                                <p className='p-label-form m-0'>Estado: </p>
                                <p className='mx-2'> {cursoId.estado} - {cursoId.diasPorVencer} Dias </p>
                            </div>
                        </div>
                    </>
                )
            })
        }
    }

    const showModal = () => {
        switch (tipoModal) {
            case 'MODAL_RESUMEN_FORM':
                return (
                    <>
                        <div className='div-modal-active'>
                            <div className='div-content-element-padre'>
                                <div className='div-content-element'>
                                    <div className='div-size-content'>
                                        <div className="d-flex justify-content-between">
                                            <h4>Resumen de registro</h4>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Nombre: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm1.prop1} {propsModal.resultForm1.prop0} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>No documento: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm1.prop3} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Fecha de nacimiento: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm1.prop2} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Correo personal: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm1.prop4} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Correo corporativo: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm1.prop5} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Celular: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm1.prop6} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Perfil profesional: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm1.prop7} </p>
                                        </div>
                                        <hr />
                                        <p className='p-label-form'>Es correcta la información?:</p>
                                        <div className='d-flex justify-content-around mt-3'>
                                            <button className='btn btn-secondary bottom-custom-secondary' onClick={() => modalNo()}>Cancelar</button>
                                            <button className='btn btn-primary bottom-custom' onClick={() => modalSi()} >Aceptar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'MODAL_RESUMEN_FORM_2':
                return (
                    <>
                        <div className='div-modal-active'>
                            <div className='div-content-element-padre'>
                                <div className='div-content-element'>
                                    <div className='div-size-content'>
                                        <div className="d-flex justify-content-between">
                                            <h4>Resumen de registro contrato</h4>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Contrato: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm2.prop0} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Zona: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm2.prop1} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Municipio: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm2.prop2} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Fecha de inicio: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm2.prop3} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Cargo: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm2.prop4} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Area: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm2.prop5} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Sueldo: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm2.prop6} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Auxilio de transporte: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm2.prop7} </p>
                                        </div>
                                        <div className='div-info-item'>
                                            <p className='p-label-form-text m-1'>Bono: </p>
                                            <p className='p-label-form m-1'>{propsModal.resultForm2.prop8} </p>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            {
                                                detalleCursosList(propsModal.resultForm3)
                                            }
                                        </div>
                                        <hr />
                                        <p className='p-label-form'>Es correcta la información?:</p>
                                        <div className='d-flex justify-content-around mt-3'>
                                            <button className='btn btn-secondary bottom-custom-secondary' onClick={() => modalNo()}>Cancelar</button>
                                            <button className='btn btn-primary bottom-custom' onClick={() => modalSi()} >Aceptar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'MODAL_CONTROL_1':
                return (
                    <>
                        <div className='div-modal-active'>
                            <div className='div-content-element-padre'>
                                <div className='div-content-element'>
                                    <div className='div-size-content'>
                                        <h4>{propsModal.resultForm1.prop0} </h4>
                                        <p className='mt-2'>{propsModal.resultForm1.prop1} </p>
                                        <div className='d-flex justify-content-around mt-3'>
                                            <button className='btn btn-primary bottom-custom' onClick={() => modalNo()} >Aceptar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'MODAL_CONTROL_2':
                return (
                    <>
                        <div className='div-modal-active'>
                            <div className='div-content-element-padre'>
                                <div className='div-content-element'>
                                    <div className='div-size-content'>
                                        <h4>{propsModal.resultForm1.prop0} </h4>
                                        <p className='mt-2'>{propsModal.resultForm1.prop1} </p>
                                        <div className='d-flex justify-content-around mt-3'>
                                            <button className='btn btn-secondary bottom-custom-secondary' onClick={() => modalNo()}>Cancelar</button>
                                            <button className='btn btn-primary bottom-custom' onClick={() => modalSi()} >Aceptar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            default:
                break;
        }
    }

    return (
        <>
            {
                showModal()
            }
        </>
    )
}

export default Modal