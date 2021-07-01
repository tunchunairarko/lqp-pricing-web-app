import React, {Fragment,useState} from 'react'
import { Nav, Navbar, Button, Row} from 'react-bootstrap'
import { FaGem,FaPlus } from 'react-icons/fa';
import { useCookies } from "react-cookie";
import { useDidMount } from "react-hooks-lib";


export default function ModuleHeader({moduleName}) {
    
    const [curTime, setCurTime] = useState();
    const [dispName, setDispName]=useState("");
    // const { userData } = useContext(UserContext);
    const [cookies] = useCookies(["user"]);


    useDidMount(() => {
        setInterval(() => {
            setCurTime(new Date().toLocaleTimeString())
            if(!dispName){
                if(cookies.username){
                    setDispName(cookies.username)
                }
            }
        }, 1000)    
        
    })
    return (
        <Fragment>
            <Button variant="success" href="/listing"><FaPlus /> New Manifest</Button>
            
            <Navbar collapseOnSelect expand="lg" variant="light" bg="light" className="moduleHeader">
                <Navbar.Brand href="/Dashboard">{moduleName}</Navbar.Brand>
                <Navbar.Toggle />
                
                <Navbar.Collapse className="justify-content-end">
                
                    <Navbar.Text className="navText">
                        Current time: {curTime}
                    </Navbar.Text>
                    <Navbar.Text className="navText">
                        Signed in as: <a href="/login">{dispName}</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    )
}
