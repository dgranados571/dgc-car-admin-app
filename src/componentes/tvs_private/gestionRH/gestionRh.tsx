import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVcard, faList, faCodeFork } from '@fortawesome/free-solid-svg-icons'
import RegistraRh from '../registraRH/registraRh'

import ContratoRH from '../registraContratoRH/contratoRh'
import ListaRh from '../listasAppRH/listaRh'

const GestionRh = () => {

    const [redirectZone, setRedirectZone] = useState('VIEW_LISTA_RH')
    const [rHContract, setRHContract] = useState<any>({})


    const validateRedirect = () => {
        switch (redirectZone) {
            case 'VIEW_LISTA_RH':
                return (
                    <ListaRh setRedirectZone={setRedirectZone} setRHContract={setRHContract} />
                )
            case 'VIEW_REGISTRA_RH':
                return (
                    <RegistraRh setRedirectZone={setRedirectZone}/>
                )            
            case 'VIEW_CONTRATO_RH':
                return (
                    <ContratoRH setRedirectZone={setRedirectZone} rHContract={rHContract} />
                )
            default:
                return (
                    <></>
                )
        }
    }

    return (
        <>
                <div className="row m-0">
                    <div className="col-6 col-sm-6 col-md-4 col-lg-4 div-targer-admin-padre" >
                        <div className='div-targer-admin' onClick={() => { setRedirectZone('VIEW_LISTA_RH') }}>
                            <FontAwesomeIcon className='icon-menu-principal' icon={faList} />
                            <div className='div-targer-action'>
                                <p className={redirectZone === 'VIEW_LISTA_RH' ? 'p-menu-label-active' : 'p-menu-label'}>Lista RH</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-4 col-lg-4 div-targer-admin-padre" >
                        <div className='div-targer-admin' onClick={() => { setRedirectZone('VIEW_REGISTRA_RH') }}>
                            <FontAwesomeIcon className='icon-menu-principal' icon={faVcard} />
                            <div className='div-targer-action'>
                                <p className={redirectZone === 'VIEW_REGISTRA_RH' ? 'p-menu-label-active' : 'p-menu-label'}>Registrar RH</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 div-targer-admin-padre" >
                        <div className='div-targer-admin-sin-hover'>
                            <FontAwesomeIcon className='icon-menu-principal' icon={faCodeFork} />
                            <div className='div-targer-action'>
                                <p className={redirectZone === 'VIEW_CONTRATO_RH' ? 'p-menu-label-active' : 'p-menu-label'}>Asociar contrato</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    {
                        validateRedirect()
                    }
                </div>
        </>
    )
}

export default GestionRh