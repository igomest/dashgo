import { Box, Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
  RiMailLine,
  RiTaskLine
} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={RiMailLine} href="/submit">E-mail</NavLink>
      </NavSection>

      <Box>
        <Stack spacing="4" mt="8" align="stretch">
          <NavSection title="KANBAN">
            <NavLink icon={RiTaskLine} href="/forms">Tarefas</NavLink>
          </NavSection>
        </Stack>
      </Box>
    </Stack>
  );
}
