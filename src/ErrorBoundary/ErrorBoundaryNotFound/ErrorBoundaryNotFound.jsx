import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "./ErrorBoundaryNotFound.module.css";

class ErrorBoundaryNotFound extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false, errorInfo: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      this.props.children[1].props.setErrStatus(true);
      return (
        <div className={style.AlternativeSearchResult}>
          <Link className={style.currentWeatherBtn} reloadDocument to={"/react-weather-app/"}>
            Назад
          </Link>
          <div className='backgroundWrapper'>
            <img className={style.background} src='./Laptop2.svg' alt='Not found'></img>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryNotFound;
