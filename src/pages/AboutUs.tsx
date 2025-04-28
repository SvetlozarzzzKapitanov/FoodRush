import React from "react";
import "./AboutUs.css";
import MHeader from "../components/ui/Headers/MHeader.tsx";
import PageWrapper from "../components/ui/Other/PageWrapper.tsx";

const AboutUs: React.FC = () => {
    return (
        <div className="bg-container">
            <MHeader />
            <PageWrapper>
                <div className="aboutus-card">
                    <div className="aboutus-content">
                        <h2>За нас</h2>
                        <img src="/delivery.jpg" alt="Доставка на храна" className="aboutus-img" />
                        <p>
                            Добре дошли във FoodRush — вашето любимо приложение за доставка на храна!
                            Създадохме платформата с една цел: да улесним връзката между гладните клиенти и
                            любимите им ресторанти. Независимо дали сте у дома, в офиса или в движение —
                            FoodRush ви гарантира бърза, удобна и надеждна доставка.
                        </p>
                        <p>
                            Нашият екип се стреми да предоставя отлично обслужване, като работим с най-добрите
                            заведения във вашия район. Избираме партньори, които ценят качеството и свежестта,
                            за да ви предложим най-доброто изживяване при поръчка на храна.
                        </p>
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
};

export default AboutUs;
