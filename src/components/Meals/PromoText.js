import styles from './PromoText.module.css';

const PromoText = () => {
  return (
    <section className={styles['promo-text']}>
      <h2>Online Sushi Restaurant Japan Cuisine</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book
      </p>
      <p>
        It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged.
      </p>
    </section>
  );
};

export default PromoText;
