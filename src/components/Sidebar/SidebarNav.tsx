import { Box, Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
        <NavLink icon={RiContactsLine}>Usuários</NavLink>
      </NavSection>

      <Box>
        <Stack spacing="4" mt="8" align="stretch">
          <NavSection title="AUTOMAÇÃO">
            <NavLink icon={RiInputMethodLine}>Dashboard</NavLink>
            <NavLink icon={RiGitMergeLine}>Usuários</NavLink>
          </NavSection>
        </Stack>
      </Box>
    </Stack>
  );
}
