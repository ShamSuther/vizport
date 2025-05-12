import {
  ActionBar,
  Button,
  Checkbox,
  Badge,
  Portal,
  Table,
  Link,
  Presence,
} from "@chakra-ui/react";
import { ExternalLink, Trash, Pencil } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const ProjectTable = () => {
  const [selection, setSelection] = useState([]);
  const [projekts, setProjekts] = useState([]);
  const { user } = useAuth();
  const MotionBtn = motion(Button);
  const MotionActionBarContent = motion(ActionBar.Content);

  const copyToClipboard = () => {
    const URL = `http://localhost:5173/project/${selection[0]}`;
    navigator.clipboard
      .writeText(URL)
      .then(() => {
        console.log("Copied to clipboard:", URL);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  const actions = [
    // {
    //   text: "Edit",
    //   icon: <Pencil />,
    //   onClick: () => console.log(selection),
    // },
    {
      text: "Delete",
      icon: <Trash />,
      onClick: () => console.log(selection),
    },
    {
      text: "Share",
      icon: <ExternalLink />,
      onClick: () => copyToClipboard(),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5050/api/projects/user/${user?._id}`
        );
        if (res.ok) {
          const data = await res.json();
          setProjekts(data);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.clerkId) fetchData();
  }, [user]);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < projekts.length;

  console.log(selection);

  const rows = projekts.map((item) => (
    <Table.Row
      key={item._id}
      data-selected={selection.includes(item._id) ? "" : undefined}
    >
      <Table.Cell p={1} px={2}>
        <Checkbox.Root
          size="sm"
          top="0.5"
          aria-label="Select row"
          checked={selection.includes(item._id)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item._id]
                : prev.filter((id) => id !== item._id)
            );
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
      <Table.Cell p={2}>{item.title}</Table.Cell>
      <Table.Cell p={2}>
        <Link
          color={{ _hover: "orange.500" }}
          transition={"all 150ms ease-in"}
          variant={"underline"}
          href={item.liveLink}
        >
          {item.liveLink}
        </Link>
      </Table.Cell>
      <Table.Cell p={2}>
        <Link
          color={{ _hover: "orange.500" }}
          transition={"all 150ms ease-in"}
          variant={"underline"}
          href={item.githubLink}
        >
          {item.githubLink}
        </Link>
      </Table.Cell>
      <Table.Cell p={2}>
        <Badge p={1} px={2}>{`${item.isPublished}`}</Badge>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Table.ScrollArea height="50%">
        <Table.Root size="sm" stickyHeader>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w={"2%"} p={1} px={2}>
                <Checkbox.Root
                  size="sm"
                  top="0.5"
                  aria-label="Select all rows"
                  checked={
                    indeterminate ? "indeterminate" : selection.length > 0
                  }
                  onCheckedChange={(changes) => {
                    setSelection(
                      changes.checked ? projekts.map((item) => item._id) : []
                    );
                  }}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>
              </Table.ColumnHeader>
              <Table.ColumnHeader p={2}>Title</Table.ColumnHeader>
              <Table.ColumnHeader p={2}>Live</Table.ColumnHeader>
              <Table.ColumnHeader p={2}>Github</Table.ColumnHeader>
              <Table.ColumnHeader p={2}>PUBLIC</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>{rows}</Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <MotionActionBarContent p={2} px={4} pr={2} rounded={"2xl"}>
              <ActionBar.SelectionTrigger border={"none"}>
                {selection.length} selected
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <AnimatePresence layout>
                {actions.map((action, idx) => {
                  if (action.text == "Share" && selection.length != 1)
                    return null;
                  return (
                    <MotionBtn
                      p={2}
                      px={4}
                      key={idx}
                      size="sm"
                      rounded={"lg"}
                      variant="outline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      color={{ _hover: "orange.500" }}
                      transition={"all 150ms ease"}
                      onClick={action.onClick}
                    >
                      {action.text} {action.icon}
                    </MotionBtn>
                  );
                })}
              </AnimatePresence>
            </MotionActionBarContent>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  );
};

export default ProjectTable;
