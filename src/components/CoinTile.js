import React, { 
    useCallback,
    useContext,
    useEffect,
    useState,
    useMemo,
    useRef
} from 'react';
import { 
    Jumbotron,
    FormControl,
    InputGroup,
    Spinner,
    Dropdown,
    DropdownButton
} from 'react-bootstrap';
import { Context } from '../store/CustomProvider'
import "./CoinTile.scss"

export default function CoinTile(props) {
    // context / reducer
    const { store } = useContext(Context);
    
    // states
    const [coinState, setCoinState] = useState({})
    const [coinValue, setCoinValue] = useState(0)
    const [currency, setCurrency] = useState("CAD")
    const [loading, setLoading] = useState(true)

    // refs
    const oneDay = useRef(null)
    const sevenDay = useRef(null)
    const oneHour = useRef(null)

    // console.log("render this coin", props.coinType)
    const coinInfo = useCallback(async () => {

        const results = await fetch("https://api.nomics.com/v1/currencies/ticker?key=" 
            + store.nomicAPIKey + "&ids=" + props.coinType + "&convert=" + currency + "&interval=1h,1d,7d")

        
        const resultAsJson = await results.json();       
        console.log(resultAsJson)
        let result = {
            price: parseFloat(resultAsJson[0].price),
            rank: resultAsJson[0].rank,
            logo: resultAsJson[0].logo_url,
            name: resultAsJson[0].name,
            symbol: resultAsJson[0].currency,
            oneDayChangePrice: parseFloat(resultAsJson[0]["1d"].price_change),
            oneHourChangePrice: parseFloat(resultAsJson[0]["1h"].price_change),
            sevenDayChangePrice: parseFloat(resultAsJson[0]["7d"].price_change),
            oneDayChangePercent: parseFloat(resultAsJson[0]["1d"].price_change_pct)*100,
            oneHourChangePercent: parseFloat(resultAsJson[0]["1h"].price_change_pct)*100,
            sevenDayChangePercent: parseFloat(resultAsJson[0]["7d"].price_change_pct)*100,
        }

        return result;


    }, [currency])

    useEffect(async () => {
        // console.log("coin", props.coinType, "re-render")
        setCoinState(await coinInfo())
        setLoading(false)

        // TODO AUTO-UPDATE
        // const interval = setInterval(async () => {
        //     setCoinState(await coinInfo())
        // }, 60000)

        // return () => {
        //     clearInterval(interval)
        // }
    }, [coinInfo])

    // // update the coin info every 10 seconds
    // useEffect(async () => {

    // })


    useEffect(() => {
        if (!loading) {
            if (coinState.oneDayChangePrice > 0) {
                oneDay.current.style.color = "rgb(52 151 27)"
            } else {
                oneDay.current.style.color = "#f00"
            }
            if (coinState.oneHourChangePrice > 0) {
                oneHour.current.style.color = "rgb(52 151 27)"
            } else {
                oneHour.current.style.color = "#f00"
            }
            if (coinState.sevenDayChangePrice > 0) {
                sevenDay.current.style.color = "rgb(52 151 27)"
            } else {
                sevenDay.current.style.color = "#f00"
            }
        }
    }, [loading])

    const coinComponent = useMemo(() => {
        if (loading) {
            return(
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        } else {
            console.log("memoize check: render again")
            return (
                <React.Fragment>
                    <div className="logo">
                        <img
                            alt=""
                            src={coinState.logo}
                            width="75"
                            height="75"
                            className="d-inline-block align-top"
                        />
                    </div>
                    <div className="coinInfo">
                        <h2>{coinState.name} ({coinState.symbol})</h2>
                        <h4>Rank: {coinState.rank}</h4>
                        <p>Price: {coinState.price.toFixed(2)}</p>
                    </div>
                    <div className="coinHistory">
                        <div className="historyLeft">
                            <p>Past Hour: </p>
                            <p>Past 24 Hours: </p>
                            <p>Past 7 Days: </p>
                        </div>

                        <div>
                            <p ref={oneDay}>{coinState.oneDayChangePrice.toFixed(2)} ({coinState.oneDayChangePercent.toFixed(2)}%)</p>
                            <p ref={oneHour}>{coinState.oneHourChangePrice.toFixed(2)} ({coinState.oneHourChangePercent.toFixed(2)}%)</p>
                            <p ref={sevenDay}>{coinState.sevenDayChangePrice.toFixed(2)} ({coinState.sevenDayChangePercent.toFixed(2)}%)</p>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }, [currency, loading, ]) 

    const unit = useMemo(() => {
        return (
            <DropdownButton
                id="dropdown-basic-button"
                title={currency}
                onSelect={(event) => {
                    setCurrency(event)
                }}>
                <Dropdown.Item eventKey="CAD">CAD</Dropdown.Item>
                <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
                <Dropdown.Item eventKey="EUR">EUR</Dropdown.Item>
            </DropdownButton>
        )

    }, [currency])
    return (
        <Jumbotron className="tile">

            {coinComponent}
            {!loading &&
            <React.Fragment>
                <div className="convertor">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        
                        <InputGroup.Text>
                                {currency} $
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="number" onChange={(event) => {
                            setCoinValue(event.target.value / coinState.price)
                        }}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl value={coinValue} />
                        <InputGroup.Append>
                        <InputGroup.Text>{coinState.symbol}</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                {unit}
            </React.Fragment>
            }

        </Jumbotron>
    )

}