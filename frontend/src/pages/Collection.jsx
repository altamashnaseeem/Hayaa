import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from "../context/ShopContext"
import { assets } from '../assets/assets';
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"

const Collection = () => {
  const {products, search, showSearch, category, setCategory} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
  
  // Price filter states with new default values
  const [priceRange, setPriceRange] = useState({ min: 50, max: 1000 });
  const [maxPossiblePrice] = useState(1000);
  const [minPossiblePrice] = useState(50);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
        setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  // Handle minimum price slider change - with safeguards
  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    // Ensure min price doesn't exceed max price
    if (value <= priceRange.max) {
      setPriceRange(prev => ({
        ...prev,
        min: value
      }));
    }
  };

  // Handle maximum price slider change - with safeguards
  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    // Ensure max price isn't less than min price
    if (value >= priceRange.min) {
      setPriceRange(prev => ({
        ...prev,
        max: value
      }));
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products];
    
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    
    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    
    // Apply price filter
    productsCopy = productsCopy.filter(item => 
      item.price >= priceRange.min && item.price <= priceRange.max
    );
    
    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let filterProductsCopy = [...filterProducts];
    switch(sortType){
      case 'low-high':
        setFilterProducts(filterProductsCopy.sort((a,b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(filterProductsCopy.sort((a,b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;    
    }
  }

  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);

  // Apply filters and scroll to top when filter criteria change
  useEffect(() => {
    applyFilter();
    // Only scroll to top when category changes (not on initial mount)
    if (category.length > 0) {
      scrollToTop();
    }
  }, [category, subCategory, search, showSearch, products, priceRange]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter option */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
        </p>
        
        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input 
                type="checkbox" 
                className='w-3' 
                value={'Men'} 
                onChange={toggleCategory} 
                checked={category.includes('Men')}
              />Men
            </p>
            <p className='flex gap-2'>
              <input 
                type="checkbox" 
                className='w-3' 
                value={'Women'} 
                onChange={toggleCategory}  
                checked={category.includes('Women')}
              />Women
            </p>
            <p className='flex gap-2'>
              <input 
                type="checkbox" 
                className='w-3' 
                value={'Kids'} 
                onChange={toggleCategory}  
                checked={category.includes('Kids')}
              />Kids
            </p>
          </div>
        </div>
        
        {/* Subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input 
                type="checkbox" 
                className='w-3' 
                value={'Topwear'} 
                onChange={toggleSubCategory} 
                checked={subCategory.includes('Topwear')}
              />Topwear
            </p>
            <p className='flex gap-2'>
              <input 
                type="checkbox" 
                className='w-3' 
                value={'Bottomwear'} 
                onChange={toggleSubCategory}
                checked={subCategory.includes('Bottomwear')}
              />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input 
                type="checkbox" 
                className='w-3' 
                value={'Winterwear'} 
                onChange={toggleSubCategory}
                checked={subCategory.includes('Winterwear')}
              />Winterwear
            </p>
          </div>
        </div>
        
        {/* Fixed Price range filter */}
        <div className={`border border-gray-300 pl-5 pr-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>PRICE RANGE</p>
          <div className='flex flex-col gap-3 text-sm font-light text-gray-700'>
            {/* Price display */}
            <div className='flex justify-between'>
              <span>${priceRange.min}</span>
              <span>${priceRange.max}</span>
            </div>
            
            {/* Price slider container with increased height for better interaction */}
            <div className="relative h-8">
              {/* Base track (gray background) */}
              <div className="w-full h-1 bg-gray-200 rounded-full absolute top-4"></div>
              
              {/* Active range bar (black) */}
              <div 
                className="absolute h-1 bg-black rounded-full top-4" 
                style={{
                  left: `${((priceRange.min - minPossiblePrice) / (maxPossiblePrice - minPossiblePrice)) * 100}%`,
                  width: `${((priceRange.max - priceRange.min) / (maxPossiblePrice - minPossiblePrice)) * 100}%`
                }}
              ></div>
              
              {/* Minimum value range input */}
              <input
                type="range"
                min={minPossiblePrice}
                max={maxPossiblePrice}
                value={priceRange.min}
                onChange={handleMinPriceChange}
                className="range-input absolute w-full top-4 cursor-pointer"
              />
              
              {/* Maximum value range input */}
              <input
                type="range"
                min={minPossiblePrice}
                max={maxPossiblePrice}
                value={priceRange.max}
                onChange={handleMaxPriceChange}
                className="range-input absolute w-full top-4 cursor-pointer"
              />
            </div>
            
            {/* Price range labels */}
            <div className='flex justify-between text-xs text-gray-500 mt-2'>
              <span>Min</span>
              <span>Max</span>
            </div>
            
            {/* Custom styling for range inputs */}
            <style jsx>{`
              .range-input {
                -webkit-appearance: none;
                appearance: none;
                width: 100%;
                height: 1px;
                background: transparent;
                pointer-events: auto;
              }
              
              /* Thumb styling for Webkit browsers (Chrome, Safari) */
              .range-input::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: #000000;
                cursor: pointer;
                border: 2px solid white;
                box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
                position: relative;
                z-index: 2;
              }
              
              /* Thumb styling for Firefox */
              .range-input::-moz-range-thumb {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: #000000;
                cursor: pointer;
                border: 2px solid white;
                box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
                position: relative;
                z-index: 2;
              }
              
              /* Hide the track for both slider inputs in Firefox */
              .range-input::-moz-range-track {
                background: transparent;
              }
              
              /* Hide the track for both slider inputs in Webkit browsers */
              .range-input::-webkit-slider-runnable-track {
                background: transparent;
              }
            `}</style>
          </div>
        </div>
      </div>
      
      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'}/>
          {/* product sort */}
          <select 
            className='border-2 border-gray-300 text-sm px-2'  
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>
        
        {/* Results count */}
        <p className='text-sm text-gray-500 mb-4'>
          {filterProducts.length} product{filterProducts.length !== 1 ? 's' : ''} found
        </p>
        
        {/* map product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem 
              key={index} 
              name={item.name} 
              id={item._id} 
              price={item.price} 
              image={item.image}
            />
          ))}
        </div>
        
        {/* No products message */}
        {filterProducts.length === 0 && (
          <div className='text-center py-10'>
            <p className='text-gray-500'>No products match your filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection