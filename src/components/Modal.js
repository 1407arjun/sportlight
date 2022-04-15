import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    Button,
    Text
} from "@chakra-ui/react"

export default function ModalData(props) {
    return (
        <>
            <Button onClick={props.onOpen}>View Results</Button>

            <Modal
                isOpen={props.isOpen}
                onClose={props.onClose}
                closeOnOverlayClick={false}
                size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Highlights</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            {props.data.keys.map((i, j) => {
                                return (
                                    <Text
                                        key={i}
                                        color={"white"}
                                        fontSize="md"
                                        fontWeight="semibold"
                                        textAlign="center">
                                        {(j + 1).toString() +
                                            ". " +
                                            (Number(i) - 5).toString() +
                                            "-" +
                                            (Number(i) + 5).toString()}
                                    </Text>
                                )
                            })}
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={props.onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
