import { Modal, ModalBody, ModalContent } from '@nextui-org/react'

type Props = {
    isOpen?: any
    onClose?: any
    children?: React.ReactNode
    closeButton?: boolean
}

const ModalDefault = ({ isOpen, onClose, children, closeButton }: Props) => {
    return (
        <Modal
            size={'xl'}
            isOpen={isOpen}
            onClose={onClose}
            isDismissable={false} isKeyboardDismissDisabled={true}
            hideCloseButton={closeButton}
        >
            <ModalContent>
                <>
                    <ModalBody>
                        {children}
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    )
}

export default ModalDefault