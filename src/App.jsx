import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Opportunity from './Opportunity';
import getPagedFromExpa from './ExpaEndpoint';

import { ACCESS_TOKEN } from './config';

const App = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      hasMoreItems: true,
      opps: [],
    };
  }

  loadItems(page) {
    return getPagedFromExpa('opportunities', {
      access_token: ACCESS_TOKEN,
      page,
    }).then(
      ({ paging, data }) => {
        const onClick = () => {
          alert('TO-DO: Modal for editing opps');
        };
        const newOpps = data.map((opp) => {
          const {
            id, title, location, duration, organisation, programmes,
          } = opp;
          const coverPhotoUrl = opp.cover_photo_urls;
          return (
            <Opportunity
              key={id}
              title={title}
              location={location}
              duration={duration}
              organisation={organisation}
              programmes={programmes}
              coverPhotoUrl={coverPhotoUrl}
              onClick={onClick}
            />
          );
        });

        this.setState(prevState => ({
          currentPage: page + 1,
          isLoaded: true,
          hasMoreItems: paging.current_page !== paging.total_pages,
          opps: prevState.opps.concat(newOpps),
        }));
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      },
    );
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;
    const { hasMoreItems, opps } = this.state;

    return (
      <InfiniteScroll
        pageStart={1}
        loadMore={page => this.loadItems(page)}
        hasMore={hasMoreItems}
        loader={loader}
      >
        <div className="Opps-wrapper">
          { opps }
        </div>
      </InfiniteScroll>
    );
  }
};

App.displayName = 'App';

export default App;
