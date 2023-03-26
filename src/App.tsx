import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./ui/NotFound";
import { withRoot } from "./component";
import { Landing } from "./ui/Landing";
import { Bookmark, DetailArticle } from "./ui/News";
import "./App.css";

const LandingPage = withRoot(Landing);
const DetailPage = withRoot(DetailArticle);
const BookmarkPage = withRoot(Bookmark);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFound />,
  },
  {
    path: "article/:articleId",
    element: <DetailPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/bookmark",
    element: <BookmarkPage />,
    errorElement: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
