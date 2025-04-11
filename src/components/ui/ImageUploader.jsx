import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Text,
  Circle,
  Image,
  Divider,
  AbsoluteCenter,
  Flex,
} from "@chakra-ui/react";
import { SlCloudUpload } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";

const ImageUploader = ({ onFileChange, initialPreview = null }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initialPreview || null); // Ensure preview is handled properly

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return; // Avoid breaking if no file is selected

      const uploadedFile = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(uploadedFile);

      setFile(uploadedFile);
      setPreview(previewUrl);

      // Pass the file back to the parent component
      onFileChange(uploadedFile, previewUrl);
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/svg+xml": [],
      "image/gif": [],
    },
  });

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    onFileChange(null, null);
  };

  return (
    <Box className="flex flex-col items-center gap-3 p-6 border-2 border-dashed rounded-2xl border-gray-300">
      {!preview ? (
        <Box
          {...getRootProps()}
          className="w-full flex flex-col items-center justify-center p-3 cursor-pointer"
        >
          <input {...getInputProps()} />
          <Circle size={"50px"} bg={"#F0F2F5"}>
            <SlCloudUpload className="text-[#475367] text-xl" />
          </Circle>
          <Text className="text-gray-600 mt-2">
            <span className="text-orange-500 font-medium">Click to upload</span>{" "}
            or drag and drop
          </Text>
          <Text className="text-xs text-gray-400">
            SVG, PNG, JPG or GIF (max. 800×400px)
          </Text>
        </Box>
      ) : (
        <Box className="w-full flex flex-col items-center">
          {/* Check if preview exists before rendering the image */}
          {preview && (
            <Image
              src={preview}
              alt="Uploaded preview"
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
          )}
          <Text className="text-gray-500 mt-2">{file?.name || "Uploaded Image"}</Text>
          <Flex
            bg={"red.500"}
            color={"white"}
            size="md"
            mt={2}
            borderRadius={"full"}
            onClick={handleRemove}
            height={"40px"}
            width={"40px"}
            justifyContent={"center"}
            alignItems={"center"}
            _hover={{ cursor: "pointer", bg: "red.400" }}
          >
            <IoMdClose className="text-xl" />
          </Flex>
        </Box>
      )}

      {!preview && (
        <>
          <Box position="relative" padding="2" color={"gray.500"} width={"full"}>
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              OR
            </AbsoluteCenter>
          </Box>
          <Button
            bg={"#EB5017"}
            size={"md"}
            _hover={{ bg: "#e84a11" }}
            variant={"solid"}
            paddingY={"16px"}
            paddingX={"24px"}
            borderRadius={"lg"}
            color={"white"}
            fontWeight={"medium"}
            onClick={() => document.querySelector("input[type='file']").click()}
          >
            Browse Files
          </Button>
        </>
      )}
    </Box>
  );
};

export default ImageUploader;
