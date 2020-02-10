import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import { getBreeds, searchBreedImage } from '../services/cats';
import _ from 'lodash';

const Breeds = withRouter(({ history, location }) => {
    const [breeds, setBreeds] = useState([]);
    const [breedImages, setBreedImages] = useState([]);
    const [page, setPage] = useState(1);
    const [breedId, setBreedId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisplay, setButtonDisplay] = useState('');

    const handleClick = (item_id: string) => {
        history.push(`/breed-details/${item_id}`);
    }

    const handleLoadMoreClick = () => {
        if (isLoading)
            return;
        setPage(page + 1);
        searchBreedFromAPI(breedId, page + 1, false);
    }

    const handleSelectChange = (e: any) => {
        setButtonDisplay('block');
        setBreedId(e.target.value);
        searchBreedFromAPI(e.target.value, page, true);
    }

    const searchBreedFromAPI = (breed_id: string, page_no: number, newBreed: boolean) => {
        setIsLoading(true);
        if (breed_id === '') {
            setIsLoading(false);
            setBreedImages([]);
            return;
        }

        searchBreedImage(breed_id, page_no).then(({ data }) => {
            if (breedImages.length === 0 || newBreed) {
                setBreedImages(data);
                setButtonDisplay('block');
            }
            else {
                let didAddRecord = false;
                data.map((apidata: never) => {
                    if (_.isEmpty(_.find(breedImages, apidata))) {
                        didAddRecord = true;
                        breedImages.push(apidata);
                    }
                });
                setButtonDisplay(didAddRecord ? 'block' : 'none');
            }
            setIsLoading(false);
        });
    }

    const renderImages = () => {
        return (
            <Row>
                {breedImages.map((item: any) => {
                    return (
                        <Col md={3} sm={6} key={item.id}>
                            <Card bg="dark">
                                <Card.Img variant="top" src={`${item.url}`} style={{ width: `${item.width}`, height: `${item.height}` }} />
                                <Card.Body>
                                    <Button variant="primary" onClick={() => handleClick(item.id)}>View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row >
        );
    }
    useEffect(() => {
        let qparams = location.search.split('=');
        if (qparams.length === 2) {
            setBreedId(qparams[1]);
            searchBreedFromAPI(qparams[1], 1, true);
        }

        getBreeds().then(({ data }) => {
            setBreeds(data);
        })
    }, [location]);

    return (
        <div style={{ position: 'absolute', top: 30, left: 100, textAlign: 'left' }}>
            <h1> Cat Browser</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Breed</Form.Label>
                    <Form.Control as="select" onChange={handleSelectChange} style={{ width: 330 }} value={breedId} disabled={isLoading} >
                        <option value="">Select breed</option>
                        {
                            breeds.map((item: any) => (
                                <option value={item.id} key={item.id}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>
            </Form>
            {
                breedImages.length > 0 ?
                    renderImages()
                    :
                    <span style={{ fontSize: '1rem', fontWeight: 400 }}>No Cats Available</span>
            }
            <br />
            <Button variant="success" disabled={isLoading || breedImages.length === 0} onClick={handleLoadMoreClick} style={{ display: buttonDisplay }} >{isLoading ? 'Loading…' : 'Load More'}</Button>
        </div>
    );
})

export default Breeds