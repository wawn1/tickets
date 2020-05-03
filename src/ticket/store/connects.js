import {connect} from "react-redux";
import actions from "./actions";

export const appConnect = connect((state) => state.main, {...actions});
