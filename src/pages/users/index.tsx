import { useUsers } from "../../services/hooks/useUsers";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Spinner,
  Link,
  HStack,
  Center,
  Divider,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import { RiAddLine } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";


import NextLink from "next/link";
import { useEffect, useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { useUsersData } from "../../contexts/UsersDataContext";
import { SendEmailModal } from "../../components/SendEmailModal";

export default function UserList() {
  const { users, ids, setIds, isChecked, setIsChecked } = useUsersData();
  const { isLoading, isFetching, error } = useUsers();

  function selectUser(e) {
    const selectedId = e.target.value;

    if (ids.includes(selectedId)) {
      const newIds = ids.filter((id) => id !== selectedId);
      setIds(newIds);
    } else {
      const newIds = [...ids];
      newIds.push(selectedId);
      setIds(newIds);
    }
  }

  function selectAllUsers(e) {
    setIsChecked(!isChecked);

    const allUsers = users.map((user) => {
      return user.id;
    });

    if (!isChecked) {
      setIds(allUsers);
    } else {
      setIds([]);
    }
  }

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10,
      }
    );
  }

  return (
    <Box>
      <Header />

      <Flex my="6" maxWidth={1480} mx="auto" w="94%">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8" overflow="hidden">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <HStack spacing={4}>
              <NextLink href="/users/create" passHref>
                <Button as="a" size="sm" fontSize="sm" colorScheme="pink">
                  <Icon as={RiAddLine} fontSize="20" />
                </Button>
              </NextLink>

              {ids.length > 0 && (
                <>
                  <Center height="40px">
                    <Divider orientation="vertical" />
                  </Center>

                  <SendEmailModal />
                </>
              )}
            </HStack>
          </Flex>

          {isLoading ? (
            <Flex justify="center" align="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha" overflow="none" size="md">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300">
                      <Checkbox
                        colorScheme="pink"
                        isChecked={isChecked}
                        onChange={(e) => selectAllUsers(e)}
                      />
                    </Th>

                    <Th w="100%">Selecionar todos</Th>
                    {/* <Th w="8"></Th> */}
                  </Tr>
                </Thead>

                <Tbody>
                  {users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox
                          colorScheme="pink"
                          key={user.id}
                          value={user.id}
                          isChecked={ids.includes(user.id) ? true : false}
                          onChange={selectUser}
                        />
                      </Td>

                      <Td>
                        <Box>
                          <Link
                            colorScheme="purple"
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                          >
                            <Text fontWeight="bold" fontSize={["sm", "md"]}>
                              {user.name}
                            </Text>
                          </Link>
                        </Box>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              {/* <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              /> */}
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
