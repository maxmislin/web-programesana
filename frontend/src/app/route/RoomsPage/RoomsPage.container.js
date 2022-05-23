import { PureComponent } from 'react';

import RoomsPage from './RoomsPage.component';
import { getRooms } from '../../util/API/endpoint/Sensor';


export class RoomsPageContainer extends PureComponent {
    state = {
        rooms: []
    };
    
    containerProps = () => {
        const { rooms } = this.state;

        return {
            rooms
        };
    }

    containerFunctions = {};

    componentDidMount() {
        getRooms().then(({ data: { rooms } = {} }) => this.setState({ rooms }));
    }

    render() {
        return (
            <RoomsPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default RoomsPageContainer;
 