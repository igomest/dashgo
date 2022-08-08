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
  Flex,
  List,
  ListItem,
  ListIcon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillCheckCircle, AiOutlineMail } from "react-icons/ai";
import { useUsersData } from "../../contexts/UsersDataContext";
import { Input } from "../Form/Input";

interface User {
  id: string;
  name?: string;
  email?: string;
  createdAt?: string;
}

export function SendEmailModal() {
  const { filteredUsers } = useUsersData();

  const userName = filteredUsers?.map((user) => user.name);

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
        colorScheme="purple"
        cursor="pointer"
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        <Icon as={AiOutlineMail} fontSize="md" />
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="sm">
        {overlay}
        <ModalContent bg="gray.900" maxH="auto">
          <ModalHeader>Enviar e-mail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6}>
              {filteredUsers.length > 1 ? (
                <>
                  <Box bg="gray.800" borderRadius={4} p={3}>
                    <Heading fontSize={["sm", "md"]} marginBottom="10px">
                      Deseja enviar e-mails para os usuários abaixo?
                    </Heading>

                    {filteredUsers.map((user) => (
                      <Flex key={user.id} marginTop="4px">
                        <List spacing={3}>
                          <ListItem fontSize="sm">
                            <ListIcon
                              as={AiFillCheckCircle}
                              color="green.500"
                              fontSize="md"
                            />
                            {user.name}
                          </ListItem>
                        </List>
                      </Flex>
                    ))}
                  </Box>

                  <Box bg="gray.800" borderRadius={4} p={3}>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={
                          <AiOutlineMail color="gray.300" fontSize="18px" />
                        }
                      />
                      <Input
                        type="email"
                        paddingLeft={10}
                        name="phone"
                        borderRadius={8}
                        placeholder="fulano@email.com"
                        // {...register("phone")}
                        // error={errors.phone}
                        variant="filled"
                      />
                    </InputGroup>
                  </Box>

                  <Box bg="gray.800" borderRadius={4} p={3}>
                    <Stack>
                      <Text fontSize="sm" fontWeight="bold">
                        Mensagem
                      </Text>

                      <Textarea
                        label="Mensagem"
                        borderColor="gray.700"
                        bg="gray.800"
                        size="sm"
                        borderRadius={4}
                      />
                    </Stack>
                  </Box>
                </>
              ) : (
                <>
                  <Box bg="gray.800" borderRadius={4} p={3}>
                    <Stack>
                      <HStack>
                        <Heading fontSize="md">Nome:</Heading>

                        <Text fontSize="sm">{userName}</Text>
                      </HStack>
                    </Stack>
                  </Box>

                  <Box bg="gray.800" borderRadius={4} p={3}>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={
                          <AiOutlineMail color="gray.300" fontSize="18px" />
                        }
                      />
                      <Input
                        type="email"
                        paddingLeft={10}
                        name="phone"
                        borderRadius={8}
                        placeholder="fulano@email.com"
                        // {...register("phone")}
                        // error={errors.phone}
                        variant="filled"
                      />
                    </InputGroup>
                  </Box>

                  <Box bg="gray.800" borderRadius={4} p={3}>
                    <Stack>
                      <Text fontSize="sm" fontWeight="bold">
                        Mensagem
                      </Text>

                      <Textarea
                        label="Mensagem"
                        borderColor="gray.700"
                        bg="gray.900"
                        size="sm"
                        borderRadius={4}
                        variant="unstyled"
                      />
                    </Stack>
                  </Box>
                </>
              )}
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
