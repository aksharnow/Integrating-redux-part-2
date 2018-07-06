import React, { Component } from 'react'
import ProductContainer from './containers/ProductContainer'
import SearchBar from './SearchBar'
import { connect } from 'react-redux'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
        filteredDynamicProducts:[],
        dynamicProducts: [],
        searchString:"",
        //cart: []
    }
  }

  updateSearchString(searchStringAsAnInput){
    console.log(searchStringAsAnInput)

    this.setState({
      searchString: searchStringAsAnInput
    },()=>{

      if(searchStringAsAnInput != ""){
        let newFilteredDynamicProducts = this.state.dynamicProducts.filter((eachProduct)=>{
          return eachProduct.productName.indexOf(searchStringAsAnInput) > -1
        })

        this.setState({
          filteredDynamicProducts: newFilteredDynamicProducts
        })

      }else{
        this.setState({
            filteredDynamicProducts: this.state.dynamicProducts
        })
    }
    })
  }

  handleAddToCart(newProduct){
    if(this.state.cart.indexOf(newProduct.id)  ==  -1 ){
      let newCart = [...this.state.cart,newProduct]
      this.setState({
        cart: newCart
      })
    }
}

  render(){
    return(
      <div className='App'>
          <SearchBar searchString={this.state.searchString} cart={this.props.cartFromRedux} thisIsFunctionAsProp_updateSearchString={(searchStringInput)=>this.updateSearchString(searchStringInput)}/>
          <ProductContainer cart={this.props.cartFromRedux} products = {this.state.filteredDynamicProducts}  handleAddToCartInProductContainer = {(product)=>this.handleAddToCart(product)}/>
      </div>
    );
  }

  componentDidMount (){
    let self = this
    fetch('https://api.myjson.com/bins/19ht6u')
    .then(function(response){
        //console.log("This is the Data from the API", response)
        return response.json()
    })
    .then(function(jsonResponse){
      self.setState({
        filteredDynamicProducts: jsonResponse,
        dynamicProducts: jsonResponse
      })
        //console.log("This is the JSON response", jsonResponse)
    })
    .catch(function(error){
        console.log(error)
    })

  }
}

function mapStateToProps(appState){//its mapping all the state from redux to the component as props
  debugger
  return {
    cartFromRedux: appState.user.cartFromRedux
  }
}

export default connect(mapStateToProps)(App)

// export default App
