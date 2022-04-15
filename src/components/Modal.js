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
                <ModalContent bgColor="#000717">
                    <ModalHeader color="white">Highlights</ModalHeader>
                    <ModalBody>
                        <VStack>
                            {props.data.keys.map((i, j) => {
                                return (
                                    <Text
                                        key={j}
                                        color={"white"}
                                        fontSize="md"
                                        fontWeight="semibold">
                                        {"Highlight 1" +
                                            (Number(j) + 1).toString() +
                                            ": " +
                                            (
                                                Math.round(Number(i)) - 5
                                            ).toString() +
                                            "s to " +
                                            Math.round(
                                                Number(i) + 5
                                            ).toString() +
                                            "s"}
                                    </Text>
                                )
                            })}
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="pink"
                            mr={3}
                            onClick={props.onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
