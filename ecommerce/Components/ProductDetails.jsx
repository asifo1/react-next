import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const style = {
    container:{
        display:'flex',
        justifyContent:'center'
    }
}

const ProductDetails = ({product}) => {
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
                    <span>In Stock: {product.quantity}</span>
                    <div className='button'>Add to Cart</div>
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