import React, { useState } from 'react'
import './zoneRoot.css'
import { IMenuLateral, IZoneRootProps } from '../../models/IProps'
import MenuLateralComponent from '../tvs/headerLateral/menuLateral'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBars, faPieChart, faVcard } from '@fortawesome/free-solid-svg-icons'
import UsuariosApp from '../tvs_private/usuarios/usuariosApp'
import RegistraRh from '../zonePublic/registraRh'
import Dashboard from '../zonePublic/dashboard'

const ZoneRoot: React.FC<IZoneRootProps> = ({ infoMenuUsuario, setCargando, zonaConsulta }) => {

    const [openMenu, setOpenMenu] = useState(false);

    const [redirect, setRedirect] = useState('');

    const [menuLateral, setMenuLateral] = useState<IMenuLateral[]>([
        {
            nombreItem: 'Dashboard',
            className: 'div-item-menu active',
            iconMenu: faPieChart,
            controlVista: ''
        },
        {
            nombreItem: 'Gestión RH',
            className: 'div-item-menu',
            iconMenu: faVcard,
            controlVista: 'VISTA_GESTION_RH'
        },
        {
            nombreItem: 'Usuarios app',
            className: 'div-item-menu',
            iconMenu: faUsers,
            controlVista: 'VISTA_USUARIOS_APP'
        }
    ])

    const selecionaMenu = (itemSeleccionado: IMenuLateral) => {
        setRedirect(itemSeleccionado.controlVista)
        const nuevoMenuLateral = menuLateral.map(itemMenu => {
            if (itemMenu.nombreItem === itemSeleccionado.nombreItem) {
                return { ...itemMenu, className: 'div-item-menu active' };
            } else {
                return { ...itemMenu, className: 'div-item-menu' };
            }
        });
        setMenuLateral(nuevoMenuLateral);
    };

    const validateRedirect = () => {
        switch (redirect) {
            case 'VISTA_GESTION_RH':
                return (
                    <>
                        <div className='div-container'>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                                    <MenuLateralComponent setOpenMenu={setOpenMenu} selecionaMenu={selecionaMenu} menuLateral={menuLateral} openMenu={openMenu} infoMenuUsuario={infoMenuUsuario} />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-9" >
                                    <div className='div-dashboard-header-busqueda-padre'>
                                        <div className="div-dashboard-header-busqueda">
                                            <FontAwesomeIcon icon={faBars} className='dasboard-icon-header-menu' onClick={() => setOpenMenu(true)} />
                                        </div>
                                    </div>
                                    <div className="div-dashboard-content">
                                        <RegistraRh />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'VISTA_USUARIOS_APP':
                return (
                    <>
                        <div className='div-container'>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                                    <MenuLateralComponent setOpenMenu={setOpenMenu} selecionaMenu={selecionaMenu} menuLateral={menuLateral} openMenu={openMenu} infoMenuUsuario={infoMenuUsuario} />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-9" >
                                    <div className='div-dashboard-header-busqueda-padre'>
                                        <div className="div-dashboard-header-busqueda">
                                            <FontAwesomeIcon icon={faBars} className='dasboard-icon-header-menu' onClick={() => setOpenMenu(true)} />
                                        </div>
                                    </div>
                                    <div className="div-dashboard-content">
                                        <UsuariosApp setCargando={setCargando} zonaConsulta={zonaConsulta} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            default:
                return (
                    <>
                        <div className='div-container'>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                                    <MenuLateralComponent setOpenMenu={setOpenMenu} selecionaMenu={selecionaMenu} menuLateral={menuLateral} openMenu={openMenu} infoMenuUsuario={infoMenuUsuario} />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-9" >
                                    <div className='div-dashboard-header-busqueda-padre'>
                                        <div className="div-dashboard-header-busqueda">
                                            <FontAwesomeIcon icon={faBars} className='dasboard-icon-header-menu' onClick={() => setOpenMenu(true)} />
                                        </div>
                                    </div>
                                    <div className="div-dashboard-content">
                                        <div className="div-style-form">
                                            <Dashboard />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
        }
    }

    return (
        <>
            {
                validateRedirect()
            }
        </>
    )
}

export default ZoneRoot