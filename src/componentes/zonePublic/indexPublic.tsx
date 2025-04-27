import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPieChart } from '@fortawesome/free-solid-svg-icons'
import Login from '../login/login'
import Dashboard from './dashboard'

const IndexPublic = () => {

    const [redirectZone, setRedirectZone] = useState('VIEW_DASHBOARD')

    const validateRedirect = () => {
        switch (redirectZone) {
            case 'VIEW_LOGIN':
                return (
                    <Login />
                )
            case 'VIEW_DASHBOARD':
                return (
                    <div className='div-style-form mt-3'>
                        <Dashboard />
                    </div>
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
                        <div className='div-targer-admin' onClick={() => { setRedirectZone('VIEW_DASHBOARD') }}>
                            <FontAwesomeIcon className='icon-menu-principal' icon={faPieChart} />
                            <div className='div-targer-action'>
                                <p className={redirectZone === 'VIEW_DASHBOARD' ? 'p-menu-label-active' : 'p-menu-label'}>Dashboard</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 div-targer-admin-padre" >
                        <div className='div-targer-admin' onClick={() => { setRedirectZone('VIEW_LOGIN') }}>
                            <FontAwesomeIcon className='icon-menu-principal' icon={faUser} />
                            <div className='div-targer-action'>
                                <p className={redirectZone === 'VIEW_LOGIN' ? 'p-menu-label-active' : 'p-menu-label'}>Ingresar</p>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    validateRedirect()
                }
            </div>
        </>
    )
}

export default IndexPublic