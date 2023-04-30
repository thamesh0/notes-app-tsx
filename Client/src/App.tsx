import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Cards } from "./pages/Cards";
import { Decks } from "./pages/Decks";
import "./styles/App.css";
import { ErrorPage } from "./pages/Error";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Decks />,
			errorElement: <ErrorPage />,
		},
		{
			path: "/decks/:deckId",
			element: <Cards />,
			errorElement: <ErrorPage />,
		},
	]);

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
