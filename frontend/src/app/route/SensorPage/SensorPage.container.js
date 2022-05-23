import { PureComponent } from 'react';

import SensorPage from './SensorPage.component';
import { getSensors } from '../../util/API/endpoint/Sensor';


export class SensorPageContainer extends PureComponent {
    state = { 
        sensors: []
    };

    containerProps = () => {
        const { sensors } = this.state;

        return {
            sensors
        };
    }

    containerFunctions = {};

    componentDidMount() {
        getSensors().then(data => {
            const { data: { sensors = [] } = {} } = data;

            this.setState({ sensors });
        });
    }

    render() {
        return (
            <SensorPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default SensorPageContainer;
 