import React, { useEffect, useState } from 'react'
import { IZoneProps } from '../../models/IProps';
import ZoneRoot from '../zoneRoot/zoneRoot';
import { Cargando } from '../tvs/loader/cargando';
import ZoneAdmin from '../zoneAdmin/zoneAdmin';

const ZonaTrX: React.FC<IZoneProps> = () => {

    const [cargando, setCargando] = useState(false)

    const [redirectZone, setRedirectZone] = useState('')

    const [infoMenuUsuario, setInfoMenuUsuario] = useState({
        usuario: '',
        nombre_completo: '',
        id_procesamiento: ''
    })

    useEffect(() => {
        setCargando(true);
        let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        if (!!usuarioLocalStorage) {
            const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage)
            setInfoMenuUsuario({
                usuario: usuarioLocalStorageObj.usuario,
                nombre_completo: usuarioLocalStorageObj.nombre + ' ' + usuarioLocalStorageObj.apellidos,
                id_procesamiento: usuarioLocalStorageObj.id_procesamiento
            })
            setRedirectZone(usuarioLocalStorageObj.role)
            setCargando(false);
        } else {
            setCargando(false);
        }
    }, [])

    const validateRedirect = () => {
        switch (redirectZone) {
            case 'USUARIO_ROOT':
                return (
                    <ZoneRoot infoMenuUsuario={infoMenuUsuario} setCargando={setCargando} zonaConsulta='ROLE_ROOT' />
                )
            case 'ROLE_ADMIN':
                return (
                    <ZoneAdmin infoMenuUsuario={infoMenuUsuario} />
                )
            default:
                return (
                    <></>
                )
        }
    }

    return (
        <>
            {
                validateRedirect()
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

export default ZonaTrX