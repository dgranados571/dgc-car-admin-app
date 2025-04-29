import React from 'react'
import { IDetalleCursosRhInfoProps } from '../../../models/IProps'

const DetalleCursosRhInfo: React.FC<IDetalleCursosRhInfoProps> = ({rHContract}) => {
    return (
        <>
            <div className="div-lista-cursos">
                <div className="row">
                    {
                        rHContract.map((cursoId, ind) => {
                            return (
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4 div-lista-cursos" >
                                    <div className='d-flex justify-content-start align-items-start' >
                                        <p className='p-label-form m-0'> Curso: </p>
                                        <p className='mx-2'> {cursoId.nombreCurso} </p>
                                    </div>
                                    <div className='d-flex justify-content-start' >
                                        <p className='p-label-form m-0'>Fecha certificación: </p>
                                        <p className='mx-2'> {cursoId.fechaCurso} </p>
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
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetalleCursosRhInfo