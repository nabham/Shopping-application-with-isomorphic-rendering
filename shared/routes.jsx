import React     from 'react';
import { Route, Router, IndexRoute  } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App';
import LoginUser from './components/LoginUser';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import ProductDes from './components/Productdes'
import Cart from './components/Cart';
import Signup from './components/signup';
import Recommendation from './components/recomm';
import Payment from './components/Payment.jsx';
import OrderHistory from './components/OrderHistory.jsx';
import SearchPage from './components/SearchPage.jsx';
import Searching from './components/searching.jsx';
import OpenOrders from './components/OpenOrders';
import ClosedOrders from './components/ClosedOrders';
import ReturnedOrders from './components/ReturnedOrders';
import CancelledOrders from './components/CancelledOrders';
import Wishlist from './components/Wishlist';
import Notify from './components/Notify';
import Rater from './components/Rater';

export default (

  <Route name="app" component={App} path="/">
    <IndexRoute name="landingPage" component={Dashboard} />
    <Route path="landingPage" component={Dashboard} />
    <Route name="login" component={LoginUser} path="login" />
    <Route component={Cart} path="cart"  />
    <Route name="recommedations" component={Recommendation} path="recommedation" />
    <Route name="makePayment" component={Payment} path="makePayment" />
    <Route name="wishlist" component={Wishlist} path="wishlist" />
    <Route component={UserProfile} path='profile' />
    <Route component={SearchPage} path='/searchPage/:searchtext' />
   <Route component={OrderHistory} path='historypage'>
      <Route component={OpenOrders} path='/openOrders' />
      <Route component={ClosedOrders} path='/closedOrders' />
      <Route component={ReturnedOrders} path='/returnedOrders' />
      <Route component={CancelledOrders} path='/cancelledOrders' />
    </Route>
    <Route component={Notify} path="notify"/>
    <Route component={ProductDes} path="/productdesc/:id" />
    <Route component={Signup} path="signup"  />
    <Route component={Searching} path='searching'/>
  </Route>

);
