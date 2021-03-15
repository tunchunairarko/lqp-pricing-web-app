import React, {Fragment} from 'react'
import { Row, Col, Card} from 'react-bootstrap'
import "../../../components/assets/style.css";
import { FaClock, FaUndo } from 'react-icons/fa';


export default function DashCard({title, value, image}) {
    return (
        <Fragment>
            <Card className="card-stats">
            <Card.Body align="right">
                <Row>
                    <Col className="col-5">
                        <Card.Img
                        align="left"
                        src={image}
                        className="dashboard-card-img"                  
                        alt="Card image cap"
                        />
                    </Col>
                    <Col className="col-7">
                        <div className="numbers">
                            <Card.Title className="dashboard-card-title">{title}</Card.Title>
                            <Card.Subtitle className="dashboard-card-subtitle">{value}</Card.Subtitle>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
            {/* <Card.Footer className="dashboard-card-footer">
                <small className="text-muted"><FaClock /> updated 5 minutes ago. </small>
            </Card.Footer> */}
            
          </Card>
        </Fragment>
    )
}
