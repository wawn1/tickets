import React, {useState} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./index.scss";

const Account = ({price = 0, length}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="account">
      <div className={classnames("price", {show})} onClick={() => setShow(!show)}>
        <div className="money">{length * price}</div>
        <div className="amount">支付金额</div>
      </div>
      <div className="button">提交按钮</div>
      <div className={classnames("layer", {hidden: !show})} onClick={() => setShow(false)}></div>
      <div className={classnames("detail", {hidden: !show})}>
        <div className="title">金额详情</div>
        <ul>
          <li>
            <span>火车票</span>
            <span>￥{price}</span>
            <span>&#xD7;{length}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

Account.propTypes = {
  price: PropTypes.number,
  length: PropTypes.number.isRequired,
};

export default Account;
