import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Textarea as ChakraTextarea,
    TextareaProps as ChakraTextareaProps,
  } from "@chakra-ui/react";
  import { forwardRef, ForwardRefRenderFunction } from "react";
  import { FieldError } from "react-hook-form";
  
  interface TextAreaProps extends ChakraTextareaProps {
    name: string;
    label?: string;
    error?: FieldError;
  }
  
  const TextareaBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = (
    { name, label, error = null, ...rest },
    ref
  ) => {
    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
  
        <ChakraTextarea
          id={name}
          name={name}
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          _hover={{
            bgColor: "gray.900",
          }}
          size="lg"
          {...rest}
          ref={ref}
        />
  
        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  };
  
  export const TextArea = forwardRef(TextareaBase);
  