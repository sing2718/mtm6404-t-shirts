
const { useState } = React

function TShirt({ tshirt, index, onBuy, onQuantity }) {
  const options = []

  for (let i = 1; i <= tshirt.stock; i++) {
    options.push(
      <option key={i} value={i}>{i}</option>
    )
  }

  return (
    <div className="tshirt">
      <img src={'images/' + tshirt.image} alt={tshirt.title} />

      <h2>{tshirt.title}</h2>
      <p>Price: ${tshirt.price.toFixed(2)}</p>

      {tshirt.stock === 0 ? (
        <p className="out">Out of Stock</p>
      ) : (
        <div>
          <p>Stock: {tshirt.stock}</p>

          <select
            value={tshirt.quantity}
            onChange={(e) => onQuantity(index, Number(e.target.value))}
          >
            {options}
          </select>

          <button onClick={() => onBuy(index)}>
            Buy
          </button>
        </div>
      )}
    </div>
  )
}

function App() {
  const [shirts, setShirts] = useState(tshirts)

  function onQuantityHandler(index, quantity) {
    const updatedShirts = shirts.map((shirt, i) => {
      if (i === index) {
        return {
          ...shirt,
          quantity: quantity
        }
      }
      return shirt
    })

    setShirts(updatedShirts)
  }

  function onBuyHandler(index) {
    const updatedShirts = shirts.map((shirt, i) => {
      if (i === index) {
        return {
          ...shirt,
          stock: shirt.stock - shirt.quantity,
          quantity: 1
        }
      }
      return shirt
    })

    setShirts(updatedShirts)
  }

  return (
    <div className="container">
      <h1>T-Shirts Store</h1>

      <div className="shirts">
        {shirts.map((shirt, index) => (
          <TShirt
            key={index}
            tshirt={shirt}
            index={index}
            onBuy={onBuyHandler}
            onQuantity={onQuantityHandler}
          />
        ))}
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
