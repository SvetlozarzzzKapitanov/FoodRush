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
import { Product } from "./types"
import "./App.css"
import CartPage from "./pages/CartPage.tsx";

const mockProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Mock Product ${i + 1}`,
    price: parseFloat((Math.random() * 20 + 5).toFixed(2)),
    imageUrl: 'https://via.placeholder.com/150',
    description: 'Delicious mock item.',
}))

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
                        <Route path="/menu" element={<MenuPage mockProducts={mockProducts} />} />
                        <Route path="/cart" element={<CartPage />} />
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
