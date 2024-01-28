import React, {useState} from 'react'
import {Container, Row} from "react-bootstrap";

interface PropsInterface {
    params: Param[]
    model: Model
}

interface ParamValue {
    paramId: number
    value: string
}

interface Model {
    paramValues: ParamValue[]
}

interface Param {
    id: number
    name: string | number | boolean | string[] //any
}

interface PropsInterface {
    params: Param[]
    model: Model
}

const TestPage2 = () => {
    const [propName, setPropName] = useState<string>("")
    const [props, setProps] = useState<PropsInterface>({
        model: {
            paramValues: [
                {paramId: 1, value: "повседневное"},
                {paramId: 2, value: "макси"},
            ]
        },
        params: [
            {id: 1, name: "Назначение"},
            {id: 2, name: "Длина"},
        ]
    })

    const getLastId = (): number => {
        let id = props.params.at(-1)?.id
        if (!!id) return id + 1

        return 0
    }

    const addProp = () => {
        if (!propName) return

        const newParam: Param = {
            id: getLastId(),
            name: propName
        }

        const newParamValue: ParamValue = {
            paramId: newParam.id,
            value: ""
        }

        setProps({
            params: [...props.params].concat(newParam),
            model: {paramValues: [...props.model.paramValues].concat(newParamValue)}
        })
    }

    const setPropVal = (val: string, id: number) => {
        const paramValues: ParamValue[] = props.model.paramValues.map(el => {
            if (el.paramId === id) el.value = val
            return el
        })

        setProps({
            params: [...props.params],
            model: {paramValues: [...paramValues]}
        })
    }

    const getModel = (): Model => {
        return props.model
    }

    return (
        <Container className={`TestPage2`}>
            <h1 style={{marginBottom: 10}}>Параметры</h1>
            <Container className={`p-2 d-flex align-items-center justify-content-between`}
                       style={{marginBottom: 20, border: "1px solid black"}}>
                <div className={`d-flex`}>
                    <div style={{marginRight: 20}}>
                        <input
                            type={`text`}
                            placeholder={`|Параметр`}
                            onKeyUp={(event) => setPropName((event.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div>
                        <button onClick={() => addProp()}>Добавить</button>
                    </div>
                </div>
                <div>
                    <button style={{marginRight:5}} onClick={() => console.warn(getModel())}>getModel</button>
                    <button onClick={() => console.log(props)}>PropsToConsole</button>
                </div>
            </Container>
            {props.params.map(el => (
                <Container fluid key={el.id} className={`d-flex align-items-center m-2`}>
                    <div style={{marginRight: 20}}><h4>{el.name}</h4></div>
                    <div>
                        <input
                            type={`text`}
                            defaultValue={props.model.paramValues.find(el2 => el.id === el2.paramId)?.value}
                            onChange={(event) => setPropVal((event.target as HTMLInputElement).value, el.id)}
                        />
                    </div>
                </Container>
            ))}
        </Container>
    )
}

export default TestPage2