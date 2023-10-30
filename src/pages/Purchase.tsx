import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../services/cartFunctions';

interface FormData {
  fullName: string;
  email: string;
  cpf: string;
  phone: string;
  cep: string;
  paymentMethod: string;
}

function Purchase() {
  const navigate = useNavigate();
  const cart = getCart();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    paymentMethod: '',
  });
  const [fieldsInvalid, setFieldsInvalid] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { fullName, email, cpf, phone, cep, paymentMethod } = formData;

    if (!fullName || !email || !cpf || !phone || !cep || !paymentMethod) {
      setFieldsInvalid(true);
    } else {
      setFieldsInvalid(false);
      localStorage.removeItem('cart');
      navigate('/');
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <form action="" onSubmit={ (event) => handleSubmit(event) } className="formPurchase">
      <div>
        <h2>Revise seus Produtos</h2>
        {cart.map((product) => (
          <div key={ product.id }>
            <p data-testid="shopping-cart-product-name">{product.title}</p>
            <p data-testid="shopping-cart-product-quantity">
              Quantidade:
              {' '}
              {product.quantity}
            </p>
            <p>
              Preço: R$
              {' '}
              {product.price}
            </p>
          </div>
        ))}
      </div>
      <div className="personalContainer">
        <h2>Informações do Comprador</h2>
        <div>
          <label htmlFor="fullName">Nome Completo</label>
          <input
            required
            type="text"
            name="fullName"
            id="fullName"
            data-testid="checkout-fullname"
            value={ formData.fullName }
            onChange={ handleInputChange }
          />
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            data-testid="checkout-email"
            value={ formData.email }
            onChange={ handleInputChange }
          />
          <label htmlFor="cpf">CPF</label>
          <input
            required
            type="text"
            name="cpf"
            id="cpf"
            placeholder="Somente números"
            data-testid="checkout-cpf"
            value={ formData.cpf }
            onChange={ handleInputChange }
          />
          <label htmlFor="phone">Telefone</label>
          <input
            required
            type="text"
            name="phone"
            id="phone"
            placeholder="Somente números"
            data-testid="checkout-phone"
            value={ formData.phone }
            onChange={ handleInputChange }
          />
          <label htmlFor="cep">CEP</label>
          <input
            required
            type="text"
            name="cep"
            id="cep"
            placeholder="Somente números"
            data-testid="checkout-cep"
            value={ formData.cep }
            onChange={ handleInputChange }
          />
          <label htmlFor="adress">Endereço</label>
          <input type="text" name="" id="adress" data-testid="checkout-address" />
        </div>
      </div>
      <div>
        <h2>Método de Pagamento</h2>
        <div>
          <label htmlFor="boleto">Boleto</label>
          <input
            type="radio"
            name="paymentMethod"
            id="boleto"
            data-testid="ticket-payment"
            onChange={ handleInputChange }
          />
          <label htmlFor="visa">Visa</label>
          <input
            type="radio"
            name="paymentMethod"
            id="visa"
            data-testid="visa-payment"
            onChange={ handleInputChange }
          />
          <label htmlFor="masterCard">MasterCard</label>
          <input
            type="radio"
            name="paymentMethod"
            id="masterCard"
            data-testid="master-payment"
            onChange={ handleInputChange }
          />
          <label htmlFor="elo">Elo</label>
          <input
            type="radio"
            name="paymentMethod"
            id="elo"
            data-testid="elo-payment"
            onChange={ handleInputChange }
          />
        </div>
      </div>

      {fieldsInvalid && (
        <p data-testid="error-msg">Campos inválidos</p>
      )}
      <button data-testid="checkout-btn">Finalizar Compra</button>
    </form>
  );
}

export default Purchase;
