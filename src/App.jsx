import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Center, Spinner, Text } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ColorModeToggle from "./components/ColorModeToggle";

const TaskList = lazy(() => import("./components/TaskList"));
const TaskForm = lazy(() => import("./components/TaskForm"));
const CalendarView = lazy(() => import("./components/CalendarView"));
const TrashView = lazy(() => import("./components/TrashView"));
// Forzamos un delay de 500ms para que el fallback siempre se vea
const ThankYouSoMuchPage = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import("./pages/ThankYouSoMuchPage")), 500);
    })
);

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
            <Route path="/thank-you" element={<ThankYouSoMuchPage />} />
          </Routes>
        </Suspense>
      </Container>

      {/* Toggle de tema, pero ahora fijo en esquina inferior derecha porque no me gustaba cómo se veía en la esquina superior derecha */}
      <ColorModeToggle
        position="fixed"
        bottom={{ base: "1rem", md: "1rem" }}
        right={{ base: "1rem", md: "1rem" }}
        size="lg"
        aria-label="Toggle color mode"
      />
    </>
  );
}
