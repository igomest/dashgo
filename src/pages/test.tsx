import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ModalHeader,
  useDisclosure,
  Collapse,
  Flex,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";

interface FormValues {
  responsible: {
    name: string;
    email: string;
  }[];
}

export default function Test() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const { register, formState, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      responsible: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "responsible",
    control,
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <>
      <Button onClick={onOpen}>Trigger modal</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              size="md"
              colorScheme="pink"
              onClick={() =>
                append({
                  name: "",
                  email: "",
                })
              }
            >
              +
            </Button>

            <Flex direction="column" mt="5">
              {fields[1] && <Flex bg="gray.400" onClick={onToggle}>Teste 1</Flex>}
              <Collapse in={fields[1] ? !isOpen : isOpen} animateOpacity>
                <Stack>
                  <input name="name" type="text" placeholder="Nome" />
                  <input name="email" type="e-mail" placeholder="E-mail" />
                </Stack>
              </Collapse>
              
              {fields[2] && <Flex bg="gray.400">Teste 2</Flex>}
              {fields[1] && (
                <Collapse in={fields[2] ? !isOpen : isOpen} animateOpacity>
                  <Stack>
                    <input name="name" type="text" placeholder="Nome" />
                    <input name="email" type="e-mail" placeholder="E-mail" />
                  </Stack>
                </Collapse>
              )}

              <Collapse in={fields[2] && isOpen} animateOpacity>
                <Stack>
                  <input name="name" type="text" placeholder="Nome" />
                  <input name="email" type="e-mail" placeholder="E-mail" />
                </Stack>
              </Collapse>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
