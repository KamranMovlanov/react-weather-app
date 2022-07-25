import React, { Component } from "react";
import style from "./AlternativeSearchResult/AlternativeSearchResult.module.css";
import AlternativeGlobalWeatherPage from "./AlternativeSearchResult/AlternativeGlobalWeatherPage";
import ErrorBoundaryNotFound from "./ErrorBoundaryNotFound/ErrorBoundaryNotFound";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false, errorInfo: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("componentDidCatch: ", error);
    console.log("componentDidCatch: ", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      console.log("state: ", this.state, this.props.children.props);
      const errСancellation = () => {
        return this.setState({ hasError: false });
      };

      return (
        <div className={style.AlternativeSearchResult}>
          <ErrorBoundaryNotFound>
            <button
              className={style.currentWeatherBtn}
              onClick={() => {
                this.props.children.props.setSearchWeatherData({});
                errСancellation();
              }}>
              На главную
            </button>

            <AlternativeGlobalWeatherPage
              searchResult={this.props.children.props.searchResult}
              setSearchWeatherData={this.props.children.props.setSearchWeatherData}
              exchangeRate={this.props.children.props.exchangeRate}
              ipData={this.props.children.props.ipData}
              twoDaysWeather={this.props.children.props.twoDaysWeather}
              setToggle={this.props.children.props.setToggle}
              setErrStatus={this.props.children.props.setErrStatus}
            />
          </ErrorBoundaryNotFound>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
