import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

export function Profile() {
    return (
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
    )
}