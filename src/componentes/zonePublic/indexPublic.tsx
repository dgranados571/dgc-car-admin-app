import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpWideShort, faUser, faFile } from '@fortawesome/free-solid-svg-icons'
import Login from '../login/login'
import RegistraRh from './registraRh'


const IndexPublic = () => {

    const [redirectZone, setRedirectZone] = useState('VIEW_LOGIN')

    const validateRedirect = () => {
        switch (redirectZone) {
            case 'VIEW_LOGIN':
                return (
                    <Login />
                )
            case 'VIEW_REGISTRA_RH':
                return (
                    <RegistraRh />
                )
            case 'VIEW_REGISTRA_RH_MASIVO':
                return (
                    <>REGISTRA MASIVO</>
                )
            default:
                return (
                    <></>
                )
        }
    }
    return (
        <>
            <div className='div-container'>
                <div className="row m-0">
                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 div-targer-admin-padre" >
                        <div className='div-targer-admin' onClick={() => { setRedirectZone('VIEW_LOGIN') }}>
                            <FontAwesomeIcon className='icon-menu-principal' icon={faUser} />
                            <div className='div-targer-action'>
                                <p className={redirectZone === 'VIEW_LOGIN'? 'p-menu-label-active' : 'p-menu-label'}>Ingresar</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 div-targer-admin-padre" >
                        <div className='div-targer-admin' onClick={() => { setRedirectZone('VIEW_REGISTRA_RH') }}>
                            <FontAwesomeIcon className='icon-menu-principal' icon={faArrowUpWideShort} />
                            <div className='div-targer-action'>
                                <p className={redirectZone === 'VIEW_REGISTRA_RH'? 'p-menu-label-active' : 'p-menu-label'}>Registrar RH</p>
                            </div>
                        </div>
                    </div>
                    {
                        /*
                    }
                    <div className="col-6 col-sm-4 col-md-4 col-lg-4 div-targer-admin-padre" >
                        <div className='div-targer-admin' onClick={() => { setRedirectZone('VIEW_REGISTRA_RH_MASIVO') }}>
                            <FontAwesomeIcon className='icon-menu-principal' icon={faFile} />
                            <div className='div-targer-action'>
                                <p className={redirectZone === 'VIEW_REGISTRA_RH_MASIVO'? 'p-menu-label-active' : 'p-menu-label'}>Registro masivo</p>
                            </div>
                        </div>
                    </div>
                    {
                        */
                    }
                </div>
                {
                    validateRedirect()
                }
            </div>

        </>
    )
}

export default IndexPublic