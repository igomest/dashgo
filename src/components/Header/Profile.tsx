import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Menu>
        <MenuButton transition="all 0.2s">
          <Avatar size="md" name="Klein" />
        </MenuButton>

        <MenuList bg="gray.800">
          <MenuGroup title="Perfil">
            <MenuItem
              _hover={{
                bg: "gray.700",
              }}
            >
              Minha conta
            </MenuItem>

            <MenuItem
              _hover={{
                bg: "gray.700",
              }}
            >
              Pagamentos
            </MenuItem>
          </MenuGroup>

          <MenuDivider />

          <MenuItem
            _hover={{
              bg: "gray.700",
            }}
          >
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
