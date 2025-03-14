import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Text, Circle, Image, Divider, AbsoluteCenter } from "@chakra-ui/react";
import { SlCloudUpload } from "react-icons/sl";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile)); // Generate preview URL
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/svg+xml": [],
      "image/gif": [],
    },
  });

  return (
    <Box className="flex flex-col items-center gap-3 p-6 border-2 border-dashed rounded-2xl border-gray-300">
      {!preview ? (
        // Upload Box (only shows when no file is uploaded)
        <Box
          {...getRootProps()}
          className="w-full flex flex-col items-center justify-center p-3 cursor-pointer"
        >
          <input {...getInputProps()} />
          <Circle size={"50px"} bg={"#F0F2F5"}>
            <SlCloudUpload className="text-[#475367] text-xl"/>
          </Circle>
          <Text className="text-gray-600 mt-2">
            <span className="text-orange-500 font-medium">Click to upload</span> or drag and drop
          </Text>
          <Text className="text-xs text-gray-400">SVG, PNG, JPG or GIF (max. 800×400px)</Text>
        </Box>
      ) : (
        // Image Preview
        <Box className="w-full flex flex-col items-center">
          <Image src={preview} alt="Uploaded preview" className="w-60 h-auto rounded-lg shadow-md" />
          <Text className="text-gray-500 mt-2">{file.name}</Text>
          <Button colorScheme={"red"} size="sm" mt={2} onClick={() => { setFile(null); setPreview(null); }}>
            Remove
          </Button>
        </Box>
      )}

      {!preview && (
        <Box position='relative' padding='2' color={"gray.500"} width={"full"}>
            <Divider/>
            <AbsoluteCenter bg='white' px='4'>
                OR
            </AbsoluteCenter>
        </Box>
        )}
      {!preview && (
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
        onClick={() => document.querySelector("input").click()}
        >
          Browse Files
        </Button>
      )}
    </Box>
  );
};

export default ImageUploader;
