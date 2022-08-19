
import React,{useState} from 'react'
import {BiPlus,BiMinus} from 'react-icons/bi'
import Slider from '@mui/material/Slider';
import {useSearchParams} from'react-router-dom'
  const FilterModal = ({hide,type}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters,setFilters] = useState({
      propertyType:'any',
      bedrooms:0,
      bathrooms:0,
      furnished:'',
      minprice:'',
      maxprice:'',
      minsize:'',
      maxsize:'',
      size:'',
      rentdate:'daily'
    }) 
const minDistance = 1000;
const minDistance2 = 10;
function valuetext(value) {
  return `${value}`;
}
  console.log(filters)
    let modelStyle = {
        display:'Block',
    }
    const handleChange2 = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }
  
      if (activeThumb === 0) {
        setFilters({...filters,['minsize']:Math.min(newValue[0], filters.maxsize - minDistance2)});
      } else {
        setFilters({...filters,['maxsize']:Math.max(newValue[1],filters.minsize + minDistance2)});
      }
    };
    const handleChange1 = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }
  
      if (activeThumb === 0) {
        setFilters({...filters,['minprice']:Math.min(newValue[0], filters.maxprice - minDistance)});
      } else {
        setFilters({...filters,['maxprice']:Math.max(newValue[1],filters.minprice + minDistance)});
      }
    };
    const handleParams=()=>{
      let tmp={};
      let location=searchParams.get('location');
      let city=searchParams.get('city');
      if(location){ tmp['location']=location};
      if(city) {tmp['city']=city};
      Object.keys(filters).map((filter)=>{
    if(filters[filter]!=''){
    tmp[filter]=filters[filter];
    }
      })
      setSearchParams(tmp)
     
       } 
  return (   
    
<div className="position-absolute top-0 end-0 modal  show fade" style={modelStyle} >
  <div className="  modal-dialog ">
    <div className="modal-content">      
    
      <div className="modal-body p-2 ">
          <form>
          <div className='container'>
              <div className='row'>
                  <div className='p-1 pb-2 col-6'>
                  <label className="form-check fw-bold p-0" forhtml="defaultCheck1">
    Property type
  </label>
  <div className ='checkboxs'>
<div className='d-flex  justify-content-between align-items-center '>
    <span className ='fs-6 fw-600'>Appartment</span>
    <input className="form-check-input" type="radio" name="propertyType"value="Appartment" id="defaultCheck1"  checked={filters.propertyType=='Appartment'} onChange={({target:{name,value}})=>setFilters({...filters,[name]:value})}></input>
</div>
<div className='d-flex mt-1 justify-content-between align-items-center'>
    <span className ='fs-6 fw-600'>land</span>
    <input className="form-check-input" type="radio" name="propertyType" value="Land" id="defaultCheck1" checked={filters.propertyType=='Land'} onChange={({target:{name,value}})=>setFilters({...filters,[name]:value})}></input>
</div>
<div className='d-flex mt-1 justify-content-between align-items-center'>
    <span className ='fs-6 fw-600'>any</span>
    <input className="form-check-input" type="radio" name="propertyType" value="any" id="defaultCheck1" checked={filters.propertyType=='any'}onChange={({target:{name,value}})=>setFilters({...filters,[name]:value})}></input>
</div>
  </div>
                  </div>
                  <div className='ps-3 col-6 p-1 pb-2'>
                  <label className="form-check fw-bold p-0" htmlfor="defaultCheck1">
    Rooms and baths
  </label>
  <div className = 'counter d-flex justify-content-between'>
      <span className='fs-6 fw-600'>Max. bedrooms</span>
      <div className='w-25 counter_buttons d-flex align-items-center '>
      <BiMinus className='me-1 rounded-circle bg-white border border-1 border-primary' onClick={()=>{filters.bedrooms==0?setFilters({...filters,['bedrooms']:0}):setFilters({...filters,['bedrooms']:(filters.bedrooms)-1})}}/>
      <span >{filters.bedrooms}</span>
    <BiPlus className='ms-1 rounded-circle bg-white border border-1 border-primary'  onClick={()=>{filters.propertyType=="Land"?setFilters({...filters,['bedrooms']:0}):setFilters({...filters,['bedrooms']:(filters.bedrooms)+1})}} />
  </div>
  </div>
  <div className = 'counter d-flex justify-content-between'>
      <span className='fs-6 fw-600'>Max. bathrooms</span> 
      <div className='w-25 counter_buttons d-flex align-items-center '>
      <BiMinus className='me-1 rounded-circle bg-white border border-1 border-primary'  onClick={()=>{filters.bathrooms==0?setFilters({...filters,['bathrooms']:0}):setFilters({...filters,['bathrooms']:filters.bathrooms-1})}}/>
      <span >{filters.bathrooms }</span>
      <BiPlus className='ms-1 rounded-circle bg-white border border-1 border-primary' onClick={()=>{filters.propertyType=="Land"?setFilters({...filters,['bathrooms']:0}):setFilters({...filters,['bathrooms']:filters.bathrooms+1})}}/>
  </div>
  </div>
  <div className='d-flex flex-column'>
      <span className=' fw-bold p-0'>fursnished</span>
      <div className="btn-group" role="group btn-group-sm">
  <button type="button" name='furnished' value='yes' className={`btn btn-outline-primary btn-sm ${filters.furnished=='yes'?'active':''}`} onClick={()=>setFilters({...filters,['furnished']:'yes'})}>yes</button>
  <button type="button" name='furnished' value='no' className={`btn btn-outline-primary btn-sm ${filters.furnished=='no'?'active':''}`} onClick={()=>setFilters({...filters,['furnished']:'no'})}>no</button>
  <button type="button" name='furnished' value='any' className={`btn btn-outline-primary btn-sm ${filters.furnished=='any'?'active':''}`} onClick={()=>setFilters({...filters,['furnished']:'any'})}>any</button>
</div>
  </div>
      </div>
      <div className='p-1 pb-2 col-6'>
      <label className="form-check fw-bold p-0" htmlfor="defaultCheck1">Size Range</label>
      <p className='mb-2'>{filters.minsize} m <sup>2</sup> To {filters.maxsize} m<sup>2</sup></p>
      <Slider
  getAriaLabel={() => 'Minimum distance'}
  value={[filters.minsize,filters.maxsize]}
  onChange={handleChange2}
  valueLabelDisplay="auto"
  max="10000"
  getAriaValueText={valuetext}
  disableSwap
/>
      </div>
      <div className='ps-3 pt-1 pb-2 col-6 '>
       <label className="form-check fw-bold  p-0" htmlfor="defaultCheck1">Price Range</label>
      <p className='mb-2'>{filters.minprice} USD To {filters.maxprice} USD</p>
    <Slider
  getAriaLabel={() => 'Minimum distance'}
  value={[filters.minprice,filters.maxprice]}
  onChange={handleChange1}

  valueLabelDisplay="auto"
  max="100000"
  getAriaValueText={valuetext}
  disableSwap
/>
      </div>
  </div>
  </div>
  {type=='rent'?
   <div className=' pt-1 pb-2 col-6 '>
       <label className="form-check fw-bold  p-0" htmlfor="defaultCheck1">rent date</label>
       <select className="form-select border-0 p-0" onChange={(e)=>setFilters({...filters,['rentdate']:e.target.value})}>
       <option value='choose rent date' disabled>choose rent date</option>
  <option value='daily'>daily</option>
  <option value="weekly">weekly</option>
  <option value="monthly">monthly</option>
  <option value="yearly">yearly</option>
</select>
   </div>:''
}
  </form>
                  </div>
                  <div className="modal-footer">
       
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={hide}>Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{handleParams();hide()}}>Apply Filters</button>
      </div>
              </div>
            
              </div>  
              
  
    
    </div>

  )
}

export default FilterModal