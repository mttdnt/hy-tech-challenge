import React, { Component } from 'react';
import '../style/index.css';
import axios from 'axios';

import ItemInfo from './itemInfo';

const APIKEY = 'MDo5OWIyNzlkOC0zM2MxLTExZTgtYmQ0Yi0xNzFjM2U5MDM0ZTM6bUFQOENRWDJPV3pSbmZ5d3F4bkEwSjNSQVFCZDM1Z2FiVTlJ';

class App extends Component {

  constructor(props){
    super(props);

    this.state= {
      itemList: [],
      currentView: 'default'
    }

    this.onItemClick = this.onItemClick.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
  }

  componentWillMount(){
      let static_url = 'https://lcboapi.com/';
      axios.get(static_url+`products?per_page=50&q=beau%27s&where=is_seasonal&access_key=${APIKEY}`).then((res)=> {
        //console.log(res.data.result);
        let searchResult = res.data.result;
        let beauList = [];

        for (let i = 0; i<searchResult.length; i++){
          if(searchResult[i].producer_name === 'Beau\'s All Natural Brewing'){
            if(searchResult[i].image_thumb_url !== null){
              beauList.push({id: searchResult[i].id, name: searchResult[i].name, style: searchResult[i].style, price: searchResult[i].price_in_cents, image: searchResult[i].image_thumb_url, stores:[], alcohol: searchResult[i].alcohol_content  });
            }else{
              beauList.push({id: searchResult[i].id, name: searchResult[i].name, style: searchResult[i].style, price: searchResult[i].price_in_cents, image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg', stores:[],  alcohol: searchResult[i].alcohol_content });
            }
          }
        }

        //console.log(beauList);

        for(let i = 0; i < beauList.length; i++){
          axios.get(static_url+`stores?per_page=50&product_id=${beauList[i].id}&access_key=${APIKEY}`).then((res)=> {
            let storeInfo = res.data.result;
            //console.log(storeInfo)
            if(storeInfo.length!==0){
              if (storeInfo.length >= 5){
                for(var j = 0; j < 5; j++){
                  beauList[i].stores.push({id: storeInfo[j].id, name: storeInfo[j].name, address: `${storeInfo[j].address_line_1} ${storeInfo[j].city}`});
                }
              }else{
                for(var j = 0; j < storeInfo.length; j++){
                  beauList[i].stores.push({id: storeInfo[j].id, name: storeInfo[j].name, address: `${storeInfo[j].address_line_1} ${storeInfo[j].city}`});
                }
              }
            }
          });
        }

        //console.log(beauList);

        this.setState({itemList: beauList.slice()});

      });
  }

  onItemClick(e){
    let itemView;
    for (let i = 0; i<this.state.itemList.length; i++){
      if (Number(e.target.id) ===this.state.itemList[i].id){
        itemView = this.state.itemList[i];
      }
    }

    this.setState({currentView: itemView});
  }

  onBackClick(){
    this.setState({currentView: 'default'});
  }

  renderList(){

    return this.state.itemList.map((item)=>{
      return (
        <div className='column'>
          <div className='beer-polaroid' id={item.id} onClick={this.onItemClick}>
            <h3 className='item-header' id={item.id}>{item.name}</h3>
            <img className='column-img' id={item.id} src={item.image} alt='Something went wrong' />
            <div className='overlay' id={item.id}>
              <div className='text' id={item.id}>More Info</div>
            </div>
          </div>
        </div>
      );
    });
  }

  renderView(){
    if(this.state.currentView === 'default'){
      return (
        <div className="row">
          {this.renderList()}
        </div>
      );
    } else{
      return (
        <div className="App">
          <ItemInfo item = {this.state.currentView} onBackClick={this.onBackClick}/>
        </div>
      );
    }
  }

  render() {
    return(
      <div>
        <h1 className='header'>Beau&#39;s Seasonal Selection</h1>
        {this.renderView()}
      </div>
    );
  }
}

export default App;
