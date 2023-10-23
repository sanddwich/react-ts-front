import React from 'react'
import './CustomModal.scss'
import {Button, Modal} from "react-bootstrap";
import {ButtonVariant} from "react-bootstrap/types";

interface CustomModalProps {
    title: string
    show: boolean
    handleClose: () => void
    keyboard: boolean
    backdrop?: boolean | "static" | undefined
    children: JSX.Element
    applyButtonFunction?: () => void
    applyButtonVariant?: ButtonVariant
}

const CustomModal = (props: CustomModalProps) => {
    return (
        <div
            className="modal show CustomModal"
            style={{display: 'block', position: 'initial'}}
        >
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop={props.backdrop}
                keyboard={props.keyboard}
            >
                <Modal.Header closeButton className={`CustomModal__header`}>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`CustomModal__body`}>
                    {props.children}
                </Modal.Body>
                <Modal.Footer className={`CustomModal__footer`}>
                    {!!props.applyButtonFunction && (
                        <Button
                            variant={!!props.applyButtonVariant ? props.applyButtonVariant : "danger"}
                            onClick={props.applyButtonFunction}
                        >
                            Применить
                        </Button>
                    )}
                    <Button variant="secondary" onClick={props.handleClose}>
                        Отмена
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default CustomModal