import React, { useState } from 'react'
import './zoneRoot.css'
import { IMenuLateral, IZoneRootProps } from '../../models/IProps'
import MenuLateralComponent from '../tvs/headerLateral/menuLateral'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faBars, } from '@fortawesome/free-solid-svg-icons'
import UsuariosApp from '../tvs_private/usuarios/usuariosApp'

const ZoneRoot: React.FC<IZoneRootProps> = ({ infoMenuUsuario, setCargando, zonaConsulta }) => {

    const [openMenu, setOpenMenu] = useState(false);

    const [redirect, setRedirect] = useState('');

    const [menuLateral, setMenuLateral] = useState<IMenuLateral[]>([
        {
            nombreItem: 'Gestión',
            className: 'div-item-menu active',
            iconMenu: faHome,
            controlVista: ''
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
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12" >

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
                                        <>DEFAUTL MENU</>
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