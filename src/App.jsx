import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Center, Spinner, Text } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

const TaskList = lazy(() => import("./components/TaskList"));
const TaskForm = lazy(() => import("./components/TaskForm"));
const CalendarView = lazy(() => import("./components/CalendarView"));
const TrashView = lazy(() => import("./components/TrashView"));

export default function App() {
  return (
    <>
      <NavBar />
      <Container maxW="container.lg" py={6}>
        <Suspense
          fallback={
            <Center flexDirection="column" py={10}>
              <Spinner size="xl" mb={4} />
              <Text fontSize="lg" color="gray.500">
                Cargando vista, por favor espera…
              </Text>
            </Center>
          }
        >
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/new" element={<TaskForm />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/trash" element={<TrashView />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}
