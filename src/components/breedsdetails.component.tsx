import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Card, Row, Col } from 'react-bootstrap';
import { getBreedDetails } from '../services/cats';

interface breedDetails {
    weight: {
        imperial: string;
        metric: string;
    };
    id: string;
    name: string;
    cfa_url: string;
    vetstreet_url: string;
    vcahospitals_url: string;
    temperament: string;
    origin: string;
    country_codes: string;
    country_code: string;
    description: string;
    life_span: string;
    indoor: number;
    lap: number;
    alt_names: string;
    adaptability: number;
    affection_level: number;
    child_friendly: number;
    dog_friendly: number;
    energy_level: number;
    grooming: number;
    health_issues: number;
    intelligence: number;
    shedding_level: number;
    social_needs: number;
    stranger_friendly: number;
    vocalisation: number;
    experimental: number;
    hairless: number;
    natural: number;
    rare: number;
    rex: number;
    suppressed_tail: number;
    short_legs: number;
    wikipedia_url: string;
    hypoallergenic: number;
}
const BreedDetails = withRouter(({ history, location }) => {
    const [details, setDetails] = useState<breedDetails>();

    const [imgUrl, setImgUrl] = useState('');
    const [breedId, setBreedId] = useState('');

    const handleClick = () => {
        history.push(`/breeds?breed=${breedId}`);
    }

    useEffect(() => {
        let path = location.pathname.split('/');
        if (path.length === 3) {
            getBreedDetails(path[2]).then(({ data }) => {
                setImgUrl(data.url);
                setDetails(data.breeds[0]);
                setBreedId(data.breeds[0].id);
            })
        }
    }, [location]);

    return (
        <div>
            <Row >
                <Col>
                    <Card bg="dark" text="white" style={{ textAlign: 'left', width: 1100, marginTop: 15 }} >
                        <Card.Header >
                            <Button variant='primary' onClick={handleClick} >Back</Button>
                        </Card.Header>
                        <Card.Img variant="top" src={imgUrl} />
                        <Card.Body>
                            <h4>{details ? details.name : ''}</h4>
                            <h5>{details ? details.origin : ''}</h5>
                            <h6>{details ? details.temperament : ''}</h6>
                            <p style={{ fontSize: '1rem', fontWeight: 400 }}>{details ? details.description : ''}</p>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </div>
    );
})

export default BreedDetails;