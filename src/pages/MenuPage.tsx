import './MenuPage.css';
import MHeader from "../components/ui/Headers/MHeader.tsx";
import MenuSection from "../components/ui/Menu/MenuSection.tsx";

const MenuPage: React.FC = () => {
    const testMenuItems  = [
        {
            id: 1,
            name: "Classic Burger",
            description: "A juicy beef patty with lettuce, tomato, and cheese.",
            price: 9.99,
            imageUrl: "src/assets/Burger.jpg",
        },
        {
            id: 2,
            name: "Margherita Pizza",
            description: "Fresh mozzarella, tomatoes, and basil on a crispy crust.",
            price: 12.49,
            imageUrl: "src/assets/Margherita.jpg",
        },
        {
            id: 3,
            name: "Chicken Caesar Salad",
            description: "Grilled chicken with romaine, croutons, and Caesar dressing.",
            price: 8.75,
            imageUrl: "src/assets/Chicken_Salad.jpg",
        },
        {
            id: 4,
            name: "Sushi Platter",
            description: "Assorted fresh sushi with soy sauce and wasabi.",
            price: 15.00,
            imageUrl: "src/assets/Sushi.png",
        },
    ];
    return (
        <div className="menu-page">
            <MHeader />
            <MenuSection items={testMenuItems} />
        </div>
    );
};

export default MenuPage;
