import React, { Component } from 'react'
import { Row,Col,Card ,Button} from 'react-bootstrap'

export class CardFav extends Component {
    render() {
        return (
            <div>
                <Row xs={1} md={2} className="g-4">
                    {this.props.coffee.map((item, idx) => (
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={item.strDrinkThumb}/>
                                <Card.Body>
                                    <Card.Title>
                                        {item.strDrink}
                                    </Card.Title>
                                    <Card.Text>
                                      {item.idDrink}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => { this.props.deleteFun(idx) }}>
                                       Delete                              
                                         </Button>
                                         <Button variant="primary" onClick={() => { this.props.showModal(idx) }}>
                                       Update                             
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

export default CardFav
