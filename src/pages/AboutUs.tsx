import React from "react";
import "./AboutUs.css";
import MHeader from "../components/ui/Headers/MHeader.tsx";

const AboutUs: React.FC = () => {
  return (
    <div className="aboutus-bg">
      <MHeader />
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
            за да може всяка поръчка да бъде наслада.
          </p>
          <p>
            Благодарим, че избрахте нас. Очакваме с нетърпение да ви сервираме следващото вкусно изживяване!
          </p>
          <h3 className="team-title">Екип</h3>
          <ul className="team-list">
                <li><strong>Мартин Бакалов</strong> – Back-end Developer</li>
                <li><strong>Преслав Борисов</strong> – Back-end Developer</li>
                <li><strong>Светлозар Капитанов</strong> – Front-end Developer</li>
                <li><strong>Ивайло Илиев</strong> – Front-end Developer</li>
                <li><strong>Валерия Станимирова</strong> – Business Analyst & Technical Writer</li>
                <li><strong>Карделен Мюмюн</strong> – Business Analyst & Technical Writer</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;