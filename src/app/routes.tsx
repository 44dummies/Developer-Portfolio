import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { CaseStudy } from "./pages/CaseStudy";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "projects", Component: Projects },
      { path: "projects/:slug", Component: CaseStudy },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
