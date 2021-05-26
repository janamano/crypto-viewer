import React, { useContext, useEffect, useState } from 'react';
import {
    Button,
    Dropdown,
    DropdownButton,
    ListGroup,
    Modal,
} from 'react-bootstrap';
import "./Dashboard.scss"
import { Context } from '../store/CustomProvider'
import CoinTile from "../components/CoinTile"

export default function Dashboard(props) {
    const [listOfCoins, setCoins] = useState(["BTC"]);
    const { store, dispatch } = useContext(Context);

    return (
        <React.Fragment>
            <Modal show={store.showCoinsList} onHide={() => { dispatch({type: "TOGGLE_COINS_LIST"}) }}>
                <Modal.Header closeButton>
                <Modal.Title>Choose a Coin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ListGroup>
                    {["ETH", "XRP", "DOGE", "USDT", "BNB"].map((symbol) => {
                        return (
                            <ListGroup.Item onClick={() => {
                                if (!listOfCoins.includes(symbol)) {
                                    let newList = listOfCoins
                                    newList.push(symbol)
                                    setCoins(newList);
                                    
                                }
                                dispatch({type: "TOGGLE_COINS_LIST"})
                            }} >{symbol}</ListGroup.Item>
                        )
                    })}
                </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => { dispatch({type: "TOGGLE_COINS_LIST"}) }}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <div className="dashboard">
                <div className="header">
                    <h4>
                        Keep track of your crypto... Use the Add Currency button add your favorite coins to your dashboard
                    </h4>
                </div>
                <div className="ops">
                    <Button onClick={() => {
                        dispatch({type: "TOGGLE_COINS_LIST"})
                    }}
                    className="addButton">Add Currency</Button>
                </div>
                <div className="coinTiles">
                    {listOfCoins.map((value) => {
                        return(<CoinTile coinType={value} />)
                    })}
                </div>
            </div>
        </React.Fragment>

    )
}