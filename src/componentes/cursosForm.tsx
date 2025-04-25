import React, { useState } from 'react'
import { IListasCursos } from '../models/IProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const CursosForm = () => {

    const cursosRHList = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'HUMANIZACION', label: 'HUMANIZACION' },
        { value: 'FACT_ SERVICIOS_DE_SALUD', label: 'FACT_ SERVICIOS DE SALUD' },
        { value: 'SERVICIO_AL_CLIENTE', label: 'SERVICIO AL CLIENTE' },
        { value: 'IAMI_2024', label: 'IAMI 2024' },
    ]

    const [curso, setCurso] = useState('INITIAL');
    const [fechaInicio, setFechaInicio] = useState('');

    const [cursoRef, setCursoRef] = useState(false);
    const [fechaInicioRef, setFechaInicioRef] = useState(false);

    const [cursosList, setCursosList] = useState<IListasCursos[]>([]);

    const agregarCurso = () => {

        if (validaFormularioSolicitud()) {
            const fechaCertificacion = new Date(fechaInicio);
            fechaCertificacion.setFullYear(fechaCertificacion.getFullYear() + 2)
            let estadoCurso = 'Sin validar';
            let diferenciaDias = 0;
            const hoy = new Date();
            if (hoy > fechaCertificacion) {
                estadoCurso = 'Vencido';
                const diferenciaMilisegundos = hoy.getTime() - fechaCertificacion.getTime();
                diferenciaDias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
            } else if (hoy < fechaCertificacion) {
                estadoCurso = 'Vigente';
                const diferenciaMilisegundos = fechaCertificacion.getTime() - hoy.getTime();
                diferenciaDias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24))
            } else {
                estadoCurso = 'Por vencer';
            }
            const fechaCertificacionStr = fechaCertificacion.toISOString().split('T')[0];
            const cursoObj: IListasCursos = {
                idList: cursosList.length + 1,
                nombreCurso: curso,
                fechaCertificacion: fechaInicio,
                fechaVencimiento: fechaCertificacionStr,
                estado: estadoCurso,
                diasPorVencer: diferenciaDias,
            }
            setCursosList([...cursosList, cursoObj])
            setCurso('INITIAL')
            setFechaInicio('')
        }
    }

    const eliminaCurso = (cursoId: IListasCursos) => {
        setCursosList((prevCursos) =>
            prevCursos.filter((curso) => curso.idList !== cursoId.idList)
        );
    }

    const validaFormularioSolicitud = () => {
        let formValidado = [];
        setCursoRef(false)
        if (curso === 'INITIAL') {
            formValidado.push('curso');
            setCursoRef(true)
        }
        setFechaInicioRef(false)
        if (fechaInicio.length === 0) {
            formValidado.push('fechaValidacion');
            setFechaInicioRef(true)
        }
        if (formValidado.length === 0) {
            return true
        } else {
            formValidado.splice(0, formValidado.length)
            return false
        }
    }

    return (
        <>
            <h4 >Información de los cursos realizados</h4>
            <p>A continuación, selecciona la información del curso realizado por el recurso humano:</p>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-4 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Curso: </p>
                        <select value={curso} onChange={(e) => setCurso(e.target.value)} className={cursoRef ? 'form-control form-control-error' : 'form-control'} >
                            {
                                cursosRHList.map((key, i) => {
                                    return (
                                        <option key={i} value={key.value}>{key.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-4 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Fecha de certificación: </p>
                        <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className={fechaInicioRef ? 'form-control form-control-error' : 'form-control'} />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-4 col-lg-4" >
                    <div className='div-bottom-custom'>
                        <button className='btn btn-primary bottom-custom' onClick={() => agregarCurso()} >Agregar</button>
                    </div>
                </div>
            </div>
            <div className="div-lista-cursos">
                <div className="row">
                    {
                        cursosList.map((cursoId, ind) => {
                            return (
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
                                        <button className='btn btn-link py-0' onClick={() => eliminaCurso(cursoId)}>
                                        <FontAwesomeIcon className='icons-table' icon={faTrash} />
                                    </button>
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

export default CursosForm