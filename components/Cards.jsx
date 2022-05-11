import styles from "../styles/Cards.module.css";
import Card from "./Card";

const Cards = ({ cards }) => {
  cards = cards.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <section className={styles.cards}>
      <div className={styles.container}>
        {cards?.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </div>
    </section>
  );
};

export default Cards;
