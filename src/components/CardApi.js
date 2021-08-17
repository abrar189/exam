import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'


export class CardApi extends Component {
    render() {
        return (
            <div>
                <Row xs={1} md={3} className="g-4">
                    {this.props.coffee.map((item, idx) => (
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={item.strDrinkThumb} />
                                <Card.Body>
                                    <Card.Title>
                                        {item.strDrink}
                                    </Card.Title>
                                    <Card.Text>
                                        {item.idDrink}
                                    </Card.Text>

                                    <Button variant="primary" onClick={() => { this.props.addToFavfun(idx) }}>
                                        Add to fav                               
                                         </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}

export default CardApi
