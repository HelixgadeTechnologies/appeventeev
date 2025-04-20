import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Center,
  Image,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import EventContext from "../../contexts/EventContext";

const ImageDisplayBanner = ({ thirdPageData, removeImage }) => {
  const [imagePercentage, setImagePercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImagePercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // const lastModifiedDate = thirdPageData?.thumbnail?.lastModifiedDate
  //   ? new Date(thirdPageData.thumbnail.lastModifiedDate)
  //   : null;

    const today = new Date();
    const formattedToday = today.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    
    const formattedNowTime = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });


  // const fileSizeInBytes = thirdPageData?.imageSize ?? 0;
    
  // const formatFileSize = (sizeInBytes) => {
  //   if (sizeInBytes < 1024) {
  //     return `${sizeInBytes} Bytes`; // Less than 1KB
  //   } else if (sizeInBytes < 1024 * 1024) {
  //     return `${(sizeInBytes / 1024).toFixed(2)} KB`; // Less than 1MB
  //   } else if (sizeInBytes < 1024 * 1024 * 1024) {
  //     return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`; // Less than 1GB
  //   } else {
  //     return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`; // 1GB or more
  //   }
  // };

  return (
    <Center padding={"40px"}>
      <Flex
        borderBottomWidth={"1px"}
        height={"72px"}
        width={"450px"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        gap={"5"}
        px={"8"}
      >
        {/* <Image src={thirdPageData.thumbnail.name} /> */}
        <Image
          src={thirdPageData.thumbnail}
          height={"48px"}
          width={"48px"}
        />
        <Box>
          <Heading fontWeight={"semibold"} fontSize={"16px"}>
            Event Banner
          </Heading>
          <Flex
            fontSize={"small"}
            fontWeight={"normal"}
            color={"#98A2B3"}
            gap={"1"}
            alignItems={"center"}
          >
            <Text>{formattedToday}</Text>
            <Text>{formattedNowTime}</Text>
            {/* <div className="h-1 w-1 rounded-full bg-gray-400 mx-1"></div>
            <Text>{formatFileSize(fileSizeInBytes)}</Text> */}
          </Flex>
        </Box>
        <CircularProgress value={imagePercentage} color="#F56630">
          <CircularProgressLabel>{imagePercentage}%</CircularProgressLabel>
        </CircularProgress>
        <IoClose
          onClick={() => removeImage()}
          className="text-2xl text-gray-500 hover:cursor-pointer"
        />
      </Flex>
    </Center>
  );
};

export default ImageDisplayBanner;
