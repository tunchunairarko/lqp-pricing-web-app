import React, { Fragment, useContext } from 'react';
// import { useIntl } from 'react-intl';
import {
  ProSidebar,
  Menu,
  SubMenu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { Link, useHistory } from "react-router-dom";

import { FaTachometerAlt, FaSignOutAlt, FaDashcube, FaTruck, FaMapMarked, FaTable } from 'react-icons/fa';
import sidebarBg from '../../assets/bg1.jpg';
import UserContext from "../../../context/UserContext";

const Aside = ({ collapsed, toggled, handleToggleSidebar }) => {
  const { setUserData } = useContext(UserContext);
  const history = useHistory(); //history is all events that had happened in the url bar
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem("auth-token", "");
    history.push("/login");
  }

  // const intl = useIntl();
  return (
    <Fragment>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar} 
        className="sidebar-main"
      >
        <SidebarHeader setstyle={{ border: 'none' }}>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            Main Menu
        </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">

            <MenuItem

              icon={<FaDashcube />}
            // suffix={<span className="badge red">Dashboard</span>}
            >
              <Link className="nav-link" to={`/`}>
                Dashboard
              </Link>
            </MenuItem>


            {/* <MenuItem
              icon={<FaGem />}>
              <Link className="nav-link" to={`/posting`}>
                Posting Module
              </Link>
            </MenuItem> */}

            <MenuItem
              icon={<FaTachometerAlt />} >

              <Link className="nav-link" to={`/settings`}>
                Settings
              </Link>
            </MenuItem>


          </Menu>
          
          <Menu iconShape="circle">

            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              title="Location"
              icon={<FaMapMarked />}
            >
              <MenuItem>
                <Link className="nav-link" to={`/location/new`}>
                  Create New Location
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to={`/settings`}>
                  Location Report
                </Link>
              </MenuItem>

            </SubMenu>
            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              title="Truckloads"
              icon={<FaTruck />}
            >
              <MenuItem>
                <Link className="nav-link" to={`/truckload/new`}>
                  Create New Truckload
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to={`/inboundpallet/new`}>
                  Register a pallet
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to={`/settings`} >
                  List Truckloads
                </Link>
              </MenuItem>
            </SubMenu>
            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              title="Manifest"
              icon={<FaTable />}
            >
              <MenuItem>
                <Link className="nav-link" to={`/outboundpallet/new`} >
                  Register outbound pallet
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to={`/listing`} style={{ color: '#f9ca24' }}>
                  Manifest Maker
                </Link>
              </MenuItem>

              <MenuItem>
                <Link className="nav-link" to={`/settings`} >
                  Outbound report
                </Link>
              </MenuItem>

              <MenuItem>
                <Link className="nav-link" to={`/settings`} >
                  Item inventory
                </Link>
              </MenuItem>
            </SubMenu>

          </Menu>
          {/* <h6
          style={{
            position: 'relative',
            display: 'flex',
            padding: '8px 35px 8px 20px',
            cursor: 'pointer',
          }}
          >Outbound</h6>
          <Menu iconShape="circle">
            
            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              title="Location"
              icon={<FaMapMarked />}
            >
              <MenuItem>Create New Location</MenuItem>
              <MenuItem>Location Report</MenuItem>
              
            </SubMenu>
            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              title="Truckloads"
              icon={<FaTruck />}
            >
              <MenuItem>Create New Truckload</MenuItem>
              <MenuItem>Register a pallet</MenuItem>
              <MenuItem>List Truckloads</MenuItem>              
            </SubMenu>
            <MenuItem
              icon={<FaTable />} style={{color:'#f9ca24'}}>
              <Link className="nav-link" to={`/settings`} style={{color:'#f9ca24'}}>
                Manifest Maker
              </Link>
            </MenuItem>
          </Menu> */}
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 24px',
            }}
          >
            <a href="#" className="sidebar-btn" rel="noopener noreferrer" onClick={logout} >
              <FaSignOutAlt />
              <span> Logout</span>
            </a>
          </div>

        </SidebarFooter>
      </ProSidebar>
    </Fragment>
  );
};

export default Aside;