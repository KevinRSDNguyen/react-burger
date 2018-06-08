import React, { Component } from "react";

import Order from "./../../components/Order/Order";
import axios from "./../../axios-orders";
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then(({ data }) => {
        const fetchedOrders = [];
        for (let key in data) {
          fetchedOrders.push({
            ...data[key],
            id: key
          });
        }
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return <Order key={order.id} {...order} />;
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
