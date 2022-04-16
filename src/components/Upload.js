import {
    Box,
    Stack,
    Heading,
    Text,
    Link,
    Input,
    Button,
    useBreakpointValue,
    Icon,
    useToast,
    Image,
    HStack,
    useDisclosure,
    VStack
} from "@chakra-ui/react"
import { useState } from "react"
import ReactPlayer from "react-player"
import axios from "axios"
import React from "react"
import Modal from "./Modal"
import Carousel from "./Carousel"

export default function Upload() {
    const toast = useToast()
    const toastIdRef = React.useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const createToast = (title, status) =>
        toast({
            title: title,
            status: status,
            duration: 1000,
            isClosable: true
        })
    const [videoFilePath, setVideoFilePath] = useState(null)
    const [videoLink, setVideoLink] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [videoFromUrl, setVideoFromUrl] = useState(null)
    const [data, setData] = useState({ keys: [] })
    const [modal, setModal] = useState(false)

    const handleVideoUploadChange = (event) => {
        const [file] = event.target.files
        setVideoFilePath(URL.createObjectURL(file))
        setVideoLink(URL.createObjectURL(file))
    }
    const handleFieldChange = (event) => {
        const url = event.target.value
        setVideoFromUrl(event.target.value)
    }

    // confirming to load video from URL
    const confirmVideo = () => {
        setModal(false)
        if (!videoFromUrl) {
            createToast("Please enter a video URL.", "error")
            return
        }
        setVideoFilePath(videoFromUrl)
        setVideoLink(videoFromUrl)
        createToast("Video selected successfully.", "success")
    }

    const handleOnSubmit = async () => {
        if (!videoFilePath) {
            createToast("Please select a video.", "error")
            return
        }
        setVideoLink(videoFilePath)
        setIsUploading(true)

        const r1 = await axios.get(`/api/video?url=${videoLink.toString()}`)
        console.log(r1.data)
        if (r1.data.statusCode !== 201) {
            createToast("Unknown error.", "error")
            setIsUploading(false)
        } else {
            let status = "0"
            while (status === "0" || status === "in_progress") {
                let r2 = await axios.get(
                    `/api/status?id=${JSON.parse(r1.data.response).jobId}`
                )
                console.log(r2.data)
                status = r2.data.status
            }
            if (status === "completed") {
                let r3 = await axios.get(
                    `/api/conversation?id=${
                        JSON.parse(r1.data.response).conversationId
                    }`
                )
                console.log(r3.data)
                let r4 = await axios.post(`/api/model`, { data: r3.data })
                console.log(r4.data)
                setData(r4.data)
                setModal(true)
                setIsUploading(false)
            } else {
                createToast("Unknown error.", "error")
                setIsUploading(false)
            }
        }
    }
    return (
        <VStack>
            <HStack
                spacing={{ base: 10, lg: 32 }}
                p={12}
                position={"relative"}
                w="100%">
                <Stack spacing={8} w="50%">
                    <center>
                        <Heading
                            lineHeight={1.1}
                            fontSize={{ base: "3xl", sm: "4xl" }}
                            color="white">
                            Your Video
                        </Heading>
                    </center>
                    <ReactPlayer url={videoFilePath} controls width="100%" />
                    <Text
                        color={"gray.400"}
                        fontSize={{ base: "sm", sm: "md" }}
                        textAlign="center">
                        <span>
                            <strong>
                                The URL provided must be a publicly available
                                URL. Currently we do not support any redirected
                                links, shortened links (e.g. bit.ly), YouTube,
                                Vimeo, or links from any audio/video platforms.
                            </strong>
                        </span>{" "}
                        The application uses AI enabled methods to automatically
                        generate highlights data feed from an input video file.
                        The expected output data feed contains start/end time
                        stamps of interesting clips from the given video feed.
                    </Text>
                </Stack>
                <Stack
                    bgColor="gray.900"
                    rounded={"xl"}
                    p={{ base: 4, sm: 6 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: "lg" }}
                    w="50%">
                    <Stack spacing={4}>
                        <Image
                            src="logo.png"
                            w="200px"
                            mx="auto"
                            alt="Sportlight"
                        />
                    </Stack>
                    <Box as={"form"} mt={10}>
                        <Stack spacing={4}>
                            <Input
                                placeholder="Paste Video Link..."
                                bg={"gray.100"}
                                border={0}
                                color={"gray.500"}
                                _placeholder={{
                                    color: "gray.500"
                                }}
                                onChange={handleFieldChange}
                            />
                            <Button
                                fontFamily={"heading"}
                                bg={"gray.200"}
                                color={"gray.800"}
                                onClick={confirmVideo}>
                                Select Video
                            </Button>
                            {/* <center><Text fontSize='xl' color="gray.300">or</Text></center>
                        <input type="file" name="video_link" id="video_link" style={{ display: "none" }} onChange={handleVideoUploadChange} />
                        <Button fontFamily={'heading'} bg={'gray.200'} color={'gray.800'} onClick={() => { document.getElementById('video_link').click() }}>
                            Upload Video
                        </Button> */}
                            <Text fontSize="xs" color={"red.500"}></Text>
                            <Button
                                isLoading={isUploading}
                                loadingText="Uploading Video..."
                                fontFamily={"heading"}
                                mt={8}
                                w={"full"}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                color={"white"}
                                onClick={handleOnSubmit}
                                _hover={{
                                    bgGradient:
                                        "linear(to-r, red.400,pink.400)",
                                    boxShadow: "xl"
                                }}>
                                Submit Video
                            </Button>
                            <Text
                                color={"gray.400"}
                                fontSize="sm"
                                fontWeight="semibold"
                                textAlign="center">
                                Uploading may take time due to processing by
                                multiple models via an API
                            </Text>
                            {modal && (
                                <Button as={Link} href="#highlights">
                                    View Results
                                </Button>
                            )}
                        </Stack>
                    </Box>
                    form
                </Stack>
                {/* <Blur
                position={'absolute'}
                top={-10}
                left={-10}
                style={{ filter: 'blur(70px)' }}
            /> */}
            </HStack>
            {modal && (
                <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "4xl", sm: "5xl" }}
                    color="white"
                    mb={4}>
                    Highlights
                </Heading>
            )}
            {modal && <Carousel data={data} video={videoLink.toString()} />}
        </VStack>
    )
}

export const Blur = (props) => {
    return (
        <Icon
            width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
            zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <circle cx="71" cy="61" r="111" fill="#F56565" />
            <circle cx="244" cy="106" r="139" fill="#ED64A6" />
            <circle cy="291" r="139" fill="#ED64A6" />
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
        </Icon>
    )
}
