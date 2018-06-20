import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "./../../hoc/Auxx/Auxx";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "./../../components/UI/Spinner/Spinner";
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "./../../store/actions";
import axios from "./../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false //Show or hide modal
  };
  componentDidMount() {}
  updatePurchaseState = ingredients => {
    //Toggles Order button
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((acc, next) => {
        return acc + next;
      }, 0);
    return sum > 0;
  };
  purchaseHandler = () => {
    //Toggle Modal
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    //Toggle Modal
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    Object.keys(disabledInfo).forEach(key => {
      disabledInfo[key] = disabledInfo[key] <= 0;
    });
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients cannot be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
