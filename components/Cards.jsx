import styles from "../styles/Cards.module.css";
import Card from "./Card";

const Cards = ({ cards }) => {
  return (
    <section className={styles.cards}>
      <div className={styles.container}>
        {cards?.map((card, index) => (
          <Card key={card._id} card={card} />
        ))}
      </div>
    </section>
  );
};

export default Cards;
