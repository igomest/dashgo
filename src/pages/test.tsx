import React, { useState } from "react";
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
  const [openCard, setOpenCard] = useState(null);

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

  const userAction = (id) => {
    setOpenCard((prev) => {
      return prev === id ? null : id;
    });
  };

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

            {fields.map((field, index) => (
              <Flex key={field.id} p={4} bg="gray.400" mt="8px">
                <Collapse
                  in={fields.length < 2 ? true : openCard === field.id}
                  animateOpacity
                >
                  <Stack>
                    <input name="name" type="text" placeholder="Nome" />
                    <input name="email" type="e-mail" placeholder="E-mail" />
                  </Stack>
                </Collapse>

                <Button onClick={() => userAction(field.id)}>Abrir</Button>
              </Flex>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
