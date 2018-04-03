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
            <input type='radio' name='store' value={store.name} onClick={this.onStoreSelect} checked='checked'/>
          );
        }else{
          return(
            <input type='radio' name='store' value={store.name} onClick={this.onStoreSelect}/>
          );
        }
      });

   }

   render(){
     //console.log(this.props);
     let address = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_KEY}&q=${this.state.currentStore}`;
     if(this.props.item.stores.length!==0){
       return(
         <div>
          <img src={this.props.item.image} alt='Something went wrong'/>
          <form>{this.renderStoreList()}</form>
          <button onClick={this.props.onBackClick}>Go back</button>
          <iframe width="600" height="450" frameBorder="0" src={address} allowFullScreen>
          </iframe>
         </div>
       );
     }else{
       return(
         <div>
          <img src={this.props.item.image} alt='Something went wrong'/>
          <button onClick={this.props.onBackClick}>Go back</button>
         </div>
       );
     }
   }

}

export default ItemInfo;
