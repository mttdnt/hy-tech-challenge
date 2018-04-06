import React, { Component } from 'react';
import '../style/index.css';

const GOOGLE_KEY = 'AIzaSyDfLmJchI3Y7y8BE5mf7gTDz24xxIxd6b0';

class ItemInfo extends Component {
   constructor(props){
     super(props);

     this.state = {
       currentStore: ''
     }

     this.onStoreSelect=this.onStoreSelect.bind(this);
   }

   componentWillMount(){
     if(this.props.item.stores.length!==0){
       this.setState({currentStore: this.props.item.stores[0].address});
     }
   }

   onStoreSelect(e){
     for(let i=0; i<this.props.item.stores.length; i++){
       if(this.props.item.stores[i].name === e.target.value){
         this.setState({currentStore: this.props.item.stores[i].address});
       }
     }
   }

   renderStoreList(){
      return this.props.item.stores.map((store)=>{
        if(store.address === this.state.currentStore){
          return(
            <label>
              <input type='radio' name='store' value={store.name} onClick={this.onStoreSelect} defaultChecked={true}/>
              {store.name}
              <br/>
            </label>

          );
        }else{
          return(
            <label>
              <input type='radio' name='store' value={store.name} onClick={this.onStoreSelect}/>
              {store.name}
              <br/>
            </label>
          );
        }
      });

   }

   render(){
     //console.log(this.props);
     let dollarPrice = Number(this.props.item.price)/100;
     let address = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_KEY}&q=${this.state.currentStore}`;
     if(this.props.item.stores.length!==0){
       return(
         <div className='grid-container'>
          <div className='item-info-header'>{this.props.item.name}</div>
          <div className='beer-polaroid2'>
            <img className='item-info-img' src={this.props.item.image} alt='Something went wrong'/>
          </div>
          <button className='back-button' onClick={this.props.onBackClick}>Go back</button>
          <div className='item-style'>
            <h2>Style</h2>
            <p>{this.props.item.style}</p>
          </div>
          <div className='item-price'>
            <h2>Price</h2>
            <p>${dollarPrice}</p>
          </div>
          <div className='item-stores'>
            <h2>Available Stores</h2>
            <form>{this.renderStoreList()}</form>
          </div>
          <iframe className='google-map' width="300" height="225" frameBorder="0" src={address} allowFullScreen>
          </iframe>
         </div>
       );
     }else{
       return(
         <div className='grid-container'>
          <div className='item-info-header'>{this.props.item.name}</div>
          <div className='beer-polaroid2'>
            <img className='item-info-img' src={this.props.item.image} alt='Something went wrong'/>
          </div>
          <button className='back-button' onClick={this.props.onBackClick}>Go back</button>
          <div className='item-style'>
            <h2>Style</h2>
            <p>{this.props.item.style}</p>
          </div>
          <div className='item-price'>
            <h2>Price</h2>
            <p>${dollarPrice}</p>
          </div>
         </div>
       );
     }
   }

}

export default ItemInfo;
