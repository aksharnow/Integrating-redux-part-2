const defaultState = {
  cartFromRedux:[],
  searchStringFromRedux: ''
}

function productsReducer(previousState = defaultState,action){
  debugger
  if(action.type == 'ADD_TO_CART'){
      //let newCart = previousState.cartFromRedux
      //newCart.push(action.product)
      debugger
      let newState = Object.assign({},previousState,{cartFromRedux: [...previousState.cartFromRedux, action.product] })
      /*
        Object.assign({},previousState,{cartFromRedux: [action.product] })
          {}
          { cartFromRedux:[],searchStringFromRedux: ''},
          {cartFromRedux: [action.product] }
      */
      return newState
  }
  return previousState
}

module.exports = productsReducer
