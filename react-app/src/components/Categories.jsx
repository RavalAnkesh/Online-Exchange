import { Link, useNavigate } from 'react-router-dom';
import './Header/Header.css';
import categories from './CategoriesList';

function Categories(props) {
    const navigate = useNavigate();

    return (
        <div className='cat-container'>
            <div className='category-wrapper'>
                <span className='category-label'>All Categories:</span>
                <div className='category-list'>
                    {categories && categories.length > 0 &&
                        categories.map((item, index) => (
                            <span key={index} className='category-item' onClick={() => navigate('/category/' + item)}>
                                {item}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Categories;
