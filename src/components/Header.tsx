import { Flex, Icon, Input, HStack, Text, Box, Avatar } from '@chakra-ui/react'
import { RiNotificationLine, RiSearchLine, RiUserAddLine } from 'react-icons/ri'

export function Header() {
    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h="20"
            marginX="auto"
            mt="4"
            px="6"
            align="center"
        >
            <Text // o componente Text é sempre utilizado para qualquer tipo de texto
                fontSize="3xl"
                fontWeight="bold"
                letterSpacing="tight"
                w="64"
            >
                dashgo
                <Text as="span" ml="1" color="pink.500">.</Text>
            </Text>

            <Flex
                as="label"
                flex="1"
                py="4"
                px="8"
                maxWidth={400}
                alignSelf="center"
                color="gray.200"
                position="relative"
                bg="gray.800"
                borderRadius="full"
            >
                <Input
                    color="gray.50"
                    variant="unstyled"
                    placeholder="Buscar na plataforma"
                    px="4"
                    mr="4"
                    _placeholder={{ color: 'gray.400' }} // aplica cor apenas no texto do placeholder
                />

                <Icon as={RiSearchLine} fontSize="20" />
            </Flex>

            <Flex
                align="center"
                ml="auto"
            >
                <HStack
                    mx="8"
                    spacing="4"
                    pr="8"
                    py="1"
                    color="gray.300"
                    borderRightWidth={1}
                    borderColor="gray.700"
                >
                    <Icon as={RiNotificationLine} fontSize="20" />
                    <Icon as={RiUserAddLine} fontSize="20" />
                </HStack>

                <Flex align="center" textAlign="right">
                    <Box mr="4" textAlign="right">
                        <Text>Klein Moretti</Text>
                        <Text color="gray.300" fontSize="small"
                        >
                            tarotclub@gmail.com
                        </Text>
                    </Box>

                    <Avatar size="md" name="Klein Moretti" />
                </Flex>
            </Flex>

        </Flex>
    )
}