import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useCart} from '../Providers/cartProvider'
import {useEffect,useState} from 'react'

const style = {
    container:{
        display:'flex',
        justifyContent:'center'
    }
}

const ProductDetails = ({product}) => {
    const {cart,addToCart} = useCart()
    const [productQty,setProductQty] = useState(null)

    let len = cart.filter(item=>{
        return item.id === product.id
    }).length

    useEffect(() => {
        fetch(`http://localhost:3000/api/products/?id=${product.id}`).then(res=>res.json()).then(data=>{
            setProductQty(data.quantity)
        })
    }, []);


    function addToCartLocal (){
        let len = cart.filter(item=>{
            return item.id === product.id
        }).length
        if(!len && productQty!=null && productQty!=0){
            product.cart_qty = 1
            addToCart([...cart,product])
        }   
    }

    const btn_class = (!len && productQty!=0)? 'button' : 'button disabled'

    return (
        <div style={style.container}>
            <div className='card'>
                <img className='image'  src={product.image} alt="product image"/>
                <div>
                    <h2>{product.name}</h2>
                    <div>
                        <FontAwesomeIcon icon={faDollarSign} />
                        <span className='price'>{product.price}</span>
                    </div>
                    <p>{product.details}</p>
                    <span>In Stock: {(productQty==null)?'Loading...':productQty}</span>
                    <div className={btn_class} onClick={addToCartLocal}>Add to Cart</div>
               </div>
            </div>
            <style jsx>
            {
                `
                .card{
                    width: 800px;
                    box-shadow: #00000021 2px 2px 15px;
                    display: flex;
                    padding: 1rem 3rem;
                    margin:2rem 0;
                }
                .image{
                    width: 50%;
                    margin-right: 1rem;
                }
                .price{
                    margin-left: 3px;
                }
                


                @media (max-width: 850px){
                    .card{
                        width: 80%;
                        flex-direction: column;
                        align-items: center;

                    }
                } 
                `
            }
        </style>
        </div>

        
    );
};

export default ProductDetails;