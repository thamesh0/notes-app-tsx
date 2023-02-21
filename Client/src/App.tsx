import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Deck } from "./components/Deck";
import { Home } from "./pages/Home";
import "./styles/App.css";
import { ErrorPage } from "./pages/Error";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
			errorElement: <ErrorPage />,
		},
		{
			path: "/decks/:deckId",
			element: <Deck />,
			errorElement: <ErrorPage />,
		},
	]);

	return (
		<div className='App'>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
