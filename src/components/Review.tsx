import { ChangeEvent, FormEvent, useState, useEffect } from 'react';

interface FormData {
  email: string;
  message?: string;
  rating: number | null;
}

interface ReviewProps {
  productId: string;
}

function Review({ productId }: ReviewProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    message: '',
    rating: null,
  });
  const [fieldsInvalid, setFieldsInvalid] = useState(false);
  const [reviews, setReviews] = useState<FormData[]>([]);

  function handleRatingChange(event: ChangeEvent<HTMLInputElement>) {
    const rating = parseInt(event.target.value, 10);
    setFormData({
      ...formData,
      rating,
    });
  }

  function saveReviewsToLocalStorage(reviewrs: FormData[]) {
    localStorage.setItem(storageKey, JSON.stringify(reviewrs));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { email, rating } = formData;

    if (!email || rating === null) {
      setFieldsInvalid(true);
    } else {
      setFieldsInvalid(false);

      const newReview = {
        email: formData.email,
        message: formData.message || '',
        rating: formData.rating,
      };

      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      setFormData({ email: '', message: '', rating: null });

      saveReviewsToLocalStorage(updatedReviews);
    }
  }

  const storageKey = productId;

  useEffect(() => {
    const storedReviews = localStorage.getItem(storageKey);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, [productId, storageKey]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div>
      <form onSubmit={ (event) => handleSubmit(event) }>
        <h2>Avaliação</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            // required
            data-testid="product-detail-email"
            value={ formData.email }
            onChange={ handleInputChange }
          />
          <div>
            <label htmlFor="rating">Avaliação:</label>
            <input
              type="radio"
              name="rating"
              id="1-rating"
              value="1"
              data-testid="1-rating"
              onChange={ handleRatingChange }
            />
            <input
              type="radio"
              name="rating"
              id="2-rating"
              value="2"
              data-testid="2-rating"
              onChange={ handleRatingChange }
            />
            <input
              type="radio"
              name="rating"
              id="3-rating"
              value="3"
              data-testid="3-rating"
              onChange={ handleRatingChange }
            />
            <input
              type="radio"
              name="rating"
              id="4-rating"
              value="4"
              data-testid="4-rating"
              onChange={ handleRatingChange }
            />
            <input
              type="radio"
              name="rating"
              id="5-rating"
              value="5"
              data-testid="5-rating"
              onChange={ handleRatingChange }
            />
          </div>
          <textarea
            name="message"
            id="message"
            cols={ 30 }
            rows={ 10 }
            data-testid="product-detail-evaluation"
            placeholder="Mensagem (opcional)"
            value={ formData.message }
            onChange={ handleInputChange }
          />
          {fieldsInvalid && <p data-testid="error-msg">Campos inválidos</p>}
          <button data-testid="submit-review-btn">Enviar</button>
        </div>
      </form>
      <div>
        {reviews.map((review, index) => (
          <div key={ index }>
            <p data-testid="review-card-email">
              {/* Email:
              {' '} */}
              {review.email}
            </p>
            <p data-testid="review-card-rating">
              {/* Rating:
              {' '} */}
              {review.rating}
            </p>
            <p data-testid="review-card-evaluation">
              {/* Text:
              {' '} */}
              {review.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
