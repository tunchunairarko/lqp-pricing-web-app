import React, { Fragment } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import "../../../components/assets/style.css";
import { FaClock, FaUndo } from 'react-icons/fa';


export default function LocationCard({ locationNo, ipins}) {
    return (
        <Fragment>
            <Card className="card-locations">
                <Card.Body align="right">
                    <div className="numbers">
                        <Card.Title className="location-card-title">{locationNo}</Card.Title>
                        <Card.Subtitle >Total pallets: {ipins}</Card.Subtitle>
                    </div>
                </Card.Body>
                {/* <Card.Footer className="dashboard-card-footer">
                <small className="text-muted"><FaClock /> updated 5 minutes ago. </small>
            </Card.Footer> */}

            </Card>
        </Fragment>
    )
}
