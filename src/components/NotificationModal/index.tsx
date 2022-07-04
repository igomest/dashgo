import {
  ModalOverlay,
  useDisclosure,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  Text,
  ModalBody,
  ModalFooter,
  Icon,
  ModalCloseButton,
  Box,
  Stack,
  Textarea,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useUsers } from '../../services/hooks/useUsers';

interface User {
  id: string;
  name?: string;
  email?: string;
  createdAt?: string;
}

interface NotificationModalProps {
   users: User;
}

export function NotificationModal({ users }: NotificationModalProps) {
  console.log(users.name)
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.800"
      backdropFilter="blur(10px) hue-rotate(90deg)"
      w="100%"
      h="100%"
      display="flex"
      justify="center"
      align="center"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);


  return (
    <>
      <Button
        as="a"
        size="sm"
        fontSize="sm"
        colorScheme="green"
        cursor="pointer"
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        <Icon as={FaWhatsapp} fontSize="20" />
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="sm">
        {overlay}
        <ModalContent bg="gray.900" h="42%">
          <ModalHeader>Notificar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6}>
              <Box bg="gray.800" borderRadius={4} p={3}>
                <Stack>
                  <HStack>
                    <Heading fontSize="md">Usuário:</Heading>

                    <Text fontSize="sm">{users.name}</Text>
                  </HStack>
                </Stack>
              </Box>

              <Stack>
                <Text fontSize="sm" fontWeight="bold">
                  Mensagem
                </Text>
                <Textarea
                  borderColor="gray.700"
                  bg="gray.800"
                  size="sm"
                  borderRadius={4}
                />
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={2}>
              <Button onClick={onClose} colorScheme="pink" size="md">
                Enviar
              </Button>

              <Button onClick={onClose} bg="gray.500" size="md" w="20">
                Cancelar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
