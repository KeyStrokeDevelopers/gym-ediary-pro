/* eslint-disable */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import LandingCreative from './LandingCreative';
import ArticleNews from './ArticleNews';
import history from '../../utils/history';
import ThemeWrapper, { AppContext } from './ThemeWrapper';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends React.Component {
  componentDidMount() {
    if (window.localStorage.getItem('token')) {
      history.push('/app');
    } else {
      history.push('/login');
    }
  }

  render() {
    return (
      <ThemeWrapper>
        <AppContext.Consumer>
          {(changeMode) => (
            <Switch>
              <Route path="/" exact component={Auth} />
              <Route path="/landing-creative" exact component={LandingCreative} />
              <Route
                path="/app"
                render={(props) => <Application {...props} changeMode={changeMode} />}
              />
              <Route
                path="/blog"
                render={(props) => <ArticleNews {...props} changeMode={changeMode} />}
              />
              <Route component={Auth} />
              <Route component={NotFound} />
            </Switch>
          )}
        </AppContext.Consumer>
      </ThemeWrapper>
    );
  }
}

export default App;
