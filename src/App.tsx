import ModernLayout from "./layouts/ModernLayout.tsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login.tsx"
import Register from "./pages/Register.tsx"
import Contact from "./pages/Contact.tsx"
import AboutUs from "./pages/AboutUs.tsx"
import MenuPage from "./pages/MenuPage.tsx"
import OrderTestPage from "./pages/OrderTestPage.tsx"
import OrderListPage from "./pages/OrderListPage.tsx"
import { CartProvider } from "./components/ui/Cart/CartContext"
import CartBubble from "./components/ui/Cart/CartBubble"
import "./App.css"
import CartPage from "./pages/CartPage.tsx";
import RestaurantsPage from "./pages/RestaurantsPage.tsx";

function App() {
    return (
        <CartProvider>
                <Router>
                    <div className="app">
                        <CartBubble />
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/menu" element={<MenuPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/restaurants" element={<RestaurantsPage />} />
                            <Route path="/order-test" element={<OrderTestPage />} />
                            <Route path="/orders" element={<OrderListPage />} />
                            <Route path="*" element={<ModernLayout />} />
                        </Routes>
                    </div>
                </Router>
        </CartProvider>
    )
}

export default App

