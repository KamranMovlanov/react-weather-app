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
      return (
        <div className={style.AlternativeSearchResult}>
          <Link className={style.currentWeatherBtn} reloadDocument to={"/current"}>
            Назад
          </Link>

          <h1>Не удалось найти</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryNotFound;
