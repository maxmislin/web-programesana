import {
    PureComponent,
    cloneElement,
    lazy
} from 'react';

import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';
import SensorPage from './SensorPage';
import SensorDetailPage from './SensorDetailPage';
import ComparePage from './ComparePage';
import RoomsPage from './RoomsPage';
import RoomDetailPage from './RoomDetailPage';
import Notifications from './Notifications';

// export const SensorPage = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ './SensorPage'));

export const BEFORE_ITEMS_TYPE = 'BEFORE_ITEMS_TYPE';
export const SWITCH_ITEMS_TYPE = 'SWITCH_ITEMS_TYPE';

export const history = createBrowserHistory({ basename: '/' });

export class AppRouter extends PureComponent {
    [SWITCH_ITEMS_TYPE] = [
        {
            component: <Route path='/' exact component={ SensorPage } />,
            position: 10
        },
        {
            component: <Route path='/sensor/:id' exact component={ SensorDetailPage } />,
            position: 20
        },
        {
            component: <Route path='/compare' exact component={ ComparePage } />,
            position: 30
        },
        {
            component: <Route path='/rooms' exact component={ RoomsPage } />,
            position: 40
        },
        {
            component: <Route path='/rooms/:id' exact component={ RoomDetailPage } />,
            position: 50
        },
        {
            component: <Route path='/notifications' exact component={ Notifications } />,
            position: 60
        }
    ];

    getSortedItems(type) {
        const items = this[type].reduce((acc, { component, position }) => {
            if (!component) {
                console.warn('There is an item without a component property declared in main router.');
                return acc;
            }

            if (acc[position]) {
                console.warn(`There is already an item with ${ position } declared in main router.`);
                return acc;
            }

            return { ...acc, [position]: component };
        }, {});

        return items;
    }

    renderItemsOfType(type) {
        return Object.entries(this.getSortedItems(type)).map(
            ([key, component]) => cloneElement(component, { key })
        );
    }

    renderRouterContent() {
        return (
            <Switch>
                { this.renderItemsOfType(SWITCH_ITEMS_TYPE) }
            </Switch>
        );
    }

    render() {
        return (
            <>
                <Router history={ history } location={ history.location }>
                    { this.renderRouterContent() }
                </Router>
            </>
        );
    }
}

export default AppRouter;
